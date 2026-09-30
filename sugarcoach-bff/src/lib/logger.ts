import type { FastifyBaseLogger } from "fastify";
import { env } from "../config/env.js";

/**
 * Opciones de logger para pasarle directo a Fastify({ logger: ... }) --
 * pasar una instancia de pino ya armada choca de tipos con Fastify 5
 * (usan versiones de @types/pino ligeramente distintas), así que dejamos
 * que Fastify construya el logger internamente con esta config.
 */
export const loggerOptions = {
  level: env.NODE_ENV === "production" ? "info" : "debug",
  transport:
    env.NODE_ENV === "development"
      ? { target: "pino-pretty", options: { colorize: true, translateTime: "HH:MM:ss" } }
      : undefined,
  // Nunca loguear datos de salud ni tokens -- ampliar esta lista si el BFF crece.
  redact: ["req.headers.authorization", "*.password", "*.idToken"],
} satisfies Record<string, unknown>;

export type Logger = FastifyBaseLogger;
