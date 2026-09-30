import Fastify, { type FastifyInstance } from "fastify";
import { loggerOptions } from "./lib/logger.js";
import { registerSecurity } from "./plugins/security.js";
import { healthRoutes } from "./routes/health.js";
import { chatRoutes } from "./routes/chat.js";
import { premiumRoutes } from "./routes/premium.js";
import { dashboardRoutes } from "./routes/dashboard.js";

export async function buildApp(): Promise<FastifyInstance> {
  const app = Fastify({ logger: loggerOptions });

  await registerSecurity(app);

  await app.register(healthRoutes);
  await app.register(chatRoutes);
  await app.register(premiumRoutes);
  await app.register(dashboardRoutes);

  return app;
}
