import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(8080),
  HOST: z.string().default("0.0.0.0"),

  // CORS: orígenes permitidos, separados por coma (el Portal y el sitio Next.js).
  CORS_ORIGINS: z
    .string()
    .default("http://localhost:5173,http://localhost:3000")
    .transform((v) => v.split(",").map((s) => s.trim())),

  // Firebase Admin (verificación de tokens del Portal / mobile Kotlin)
  FIREBASE_PROJECT_ID: z.string().min(1),
  FIREBASE_CLIENT_EMAIL: z.string().email(),
  // La clave privada suele venir con \n escapados en el .env -- se desescapan al usarla.
  FIREBASE_PRIVATE_KEY: z.string().min(1),

  // Strapi (CMS existente, vía GraphQL)
  STRAPI_GRAPHQL_URL: z.string().url(),
  STRAPI_API_TOKEN: z.string().min(1),

  // n8n (chatbot) -- nunca expuesto directo al browser, solo el BFF le habla.
  N8N_CHAT_WEBHOOK_URL: z.string().url(),
  N8N_WEBHOOK_SECRET: z.string().min(1),
});

export type Env = z.infer<typeof envSchema>;

function loadEnv(): Env {
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    console.error("❌ Variables de entorno inválidas o faltantes:");
    for (const issue of parsed.error.issues) {
      console.error(`   - ${issue.path.join(".")}: ${issue.message}`);
    }
    process.exit(1);
  }
  return parsed.data;
}

export const env = loadEnv();
