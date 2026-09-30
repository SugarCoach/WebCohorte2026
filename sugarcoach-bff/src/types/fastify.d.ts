import "fastify";
import type { AuthenticatedUser } from "../lib/firebase.js";

declare module "fastify" {
  interface FastifyRequest {
    user?: AuthenticatedUser;
  }
}
