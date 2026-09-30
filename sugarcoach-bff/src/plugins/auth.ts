import type { FastifyReply, FastifyRequest } from "fastify";
import { verifyFirebaseToken } from "../lib/firebase.js";

/**
 * preHandler para rutas protegidas: exige "Authorization: Bearer <idToken>"
 * y deja al usuario verificado en request.user. Usarlo como:
 *   app.get("/algo", { preHandler: requireAuth }, handler)
 */
export async function requireAuth(request: FastifyRequest, reply: FastifyReply) {
  const header = request.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return reply.code(401).send({ error: "Falta el token de autenticación" });
  }
  const idToken = header.slice("Bearer ".length);
  try {
    request.user = await verifyFirebaseToken(idToken);
  } catch (err) {
    request.log.warn({ err }, "Token de Firebase inválido");
    return reply.code(401).send({ error: "Token inválido o expirado" });
  }
}
