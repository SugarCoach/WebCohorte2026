import type { FastifyInstance } from "fastify";
import { requireAuth } from "../plugins/auth.js";
import { subscribeToPatientUpdates, type PatientUpdateEvent } from "../lib/pubsub.js";

function writeSseEvent(raw: NodeJS.WritableStream, event: string, data: unknown) {
  raw.write(`event: ${event}\n`);
  raw.write(`data: ${JSON.stringify(data)}\n\n`);
}

/**
 * Stream de actualizaciones en vivo para el dashboard médico (SSE, ida
 * única: el paciente registra algo -> el dashboard se entera solo).
 * Escrito a mano sobre la respuesta cruda de Fastify -- fastify-sse-v2 no
 * tiene tipos al día para Fastify 5, y esto es poco código de todos modos.
 * El navegador reconecta solo (EventSource nativo), no hace falta lógica
 * de reconexión de nuestro lado.
 */
export async function dashboardRoutes(app: FastifyInstance) {
  app.get("/api/dashboard/stream", { preHandler: requireAuth }, (request, reply) => {
    reply.raw.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });

    // Primer byte inmediato: algunos proxies/balanceadores cortan conexiones
    // que no mandan nada por un rato.
    writeSseEvent(reply.raw, "connected", { uid: request.user?.uid });

    const unsubscribe = subscribeToPatientUpdates((event: PatientUpdateEvent) => {
      writeSseEvent(reply.raw, "patient-update", event);
    });

    // Ping cada 20s para mantener viva la conexión a través de proxies.
    const keepAlive = setInterval(() => {
      reply.raw.write(": ping\n\n");
    }, 20_000);

    request.raw.on("close", () => {
      clearInterval(keepAlive);
      unsubscribe();
    });
  });
}
