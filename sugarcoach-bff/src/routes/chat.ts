import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { env } from "../config/env.js";

const chatRequestSchema = z.object({
  message: z.string().trim().min(1).max(400),
  sessionId: z.string().min(1),
  lang: z.enum(["es", "en"]).default("es"),
});

const n8nResponseSchema = z.object({
  reply: z.string(),
  options: z.array(z.string()).default([]),
});

/**
 * Proxy hacia el webhook de n8n del chatbot. El widget del sitio le
 * habla solo a este endpoint -- la URL de n8n nunca se expone al browser.
 * Mismo contrato que ya usa el widget: { message, sessionId, lang } -> { reply, options }.
 */
export async function chatRoutes(app: FastifyInstance) {
  app.post("/api/chat", async (request, reply) => {
    const parsed = chatRequestSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.code(400).send({ error: "Solicitud inválida", issues: parsed.error.issues });
    }

    try {
      const n8nResponse = await fetch(env.N8N_CHAT_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Webhook-Secret": env.N8N_WEBHOOK_SECRET,
        },
        body: JSON.stringify(parsed.data),
        signal: AbortSignal.timeout(10_000),
      });

      if (!n8nResponse.ok) {
        request.log.error({ status: n8nResponse.status }, "n8n respondió con error");
        return reply.code(502).send({ error: "El asistente no está disponible en este momento" });
      }

      const body = n8nResponseSchema.safeParse(await n8nResponse.json());
      if (!body.success) {
        request.log.error({ issues: body.error.issues }, "Respuesta de n8n con forma inesperada");
        return reply.code(502).send({ error: "El asistente no está disponible en este momento" });
      }

      return reply.send(body.data);
    } catch (err) {
      request.log.error({ err }, "Fallo llamando a n8n");
      return reply.code(502).send({ error: "El asistente no está disponible en este momento" });
    }
  });
}
