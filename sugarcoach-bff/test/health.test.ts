import { describe, it, expect, beforeAll, afterAll } from "vitest";
import type { FastifyInstance } from "fastify";

// Variables de entorno mínimas para que env.ts no aborte el proceso al
// importar la app en el test -- no son credenciales reales.
process.env.FIREBASE_PROJECT_ID ??= "test-project";
process.env.FIREBASE_CLIENT_EMAIL ??= "test@test-project.iam.gserviceaccount.com";
process.env.FIREBASE_PRIVATE_KEY ??= "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDU6Kk+kQ08sIPH\nrv1GaYWj75Q7D5mwx/fdk5CmpnBu7l6jJZdBlQCcnHe1gC2T5MSWVnogfiviwSio\nO8IkZf5sy6BXNFFacKelVPXGemmLb0jF2XqKK3qKbLiK7RPS5dLmxZxvu9SI3e75\nk6bDuAPH51YRyuxwu8mquu1/9tAxYF45DlZ3scpf93g5nOaeLW0AP4C/AurAvAfa\nCvAmxo1sjJ2pjbr74ih45Vzud6rSXOkdHoe9jCSkCVl18yS2epDaxJykylqboKhQ\nLxxfhIZfso5R3Z2vJWUGNy8p3xgOXjplC6Ut9nmFohvk1p4v/zes7uHaEwTIcqRd\nqiTo9+tjAgMBAAECggEAI1MU3YIggZzByIwyjo+sciYqYGA2vjt3VwaIPfYoemdH\nQWdXwLRRnSpivDTvmvWeXlkrux9j9aPZtIvxqqtXesKQMFfIVaqSTh6aBpvBzjYh\nC16Jc8pB8xyVw8sQ+nFSPCK2UV2HJkw4PaVvSlLKIc0ynRIfh5bIn3CTPiN7qG1I\nn28/orBLlYfC1u4hBRY1TVz8XrUXUUPd+nlm4d0/4W8nLgfpLQijBUsV2amZHljD\nbtii7rE7Fezrff4QQDxjPB5DD4SBPJKfsw2yXtB0XlcW6ot/zEYB87w4iPc3Qmx3\n0CeeqOrRvSmdPqNy7YFDuwszOBF6WtYdHNxhfl4O4QKBgQD5toNAlKsXuJ0pFlQd\nnreT/OZfo/tpMjRHks1zNG12v3XhdzYpIhj6W/bXAEn4Ve5kiV+bqHZDCGksX1O8\nmtZSkQ27ucZAgj9Fg56GQ4/O8+MxHV+tSpO6KuQOdMi4Gbaq4DpNjJHttIOmZMtK\n1ip6QzAmtxbfMN39EX2Z3cBloQKBgQDaRO7ccTT0UhH2jQ3bZFzAwvk4L3dKOKCn\ng6fTWE/Lf1rU+80tIg6Vw8srVEmsCVSXBVdoIA2KVBy8HfeJM/t199eNfzV6ePhg\nKHUZ5MAmwFUDrYTpXtc7qr0aNHmqBSo4qf6V4ObbCoV8x+r8sD4pe22F+x8HP7qb\nVouIYKeqgwKBgQCwEXkwEuMkAZ6GduDuVZe496tzqgq9nJFyGddUsJWyEcNLKyP8\nErer5yX/aIu/Vs+VAatw9HIWR5rol3pSVJZjdzVItO9NUsjL+cbPglmmoR4C5mQs\nqpXIwS815jAUZsT+bMWPIltOUGY274DLjoA63p7X3WZ6DlmncyqtT8a1oQKBgBz8\nMHgntG+JgocqPh/XWRXkDnJuoznBAVydeCjxvk74z5gfBCUtM6ChypYrcEkfSBNy\nCyRxtTqcZuB4XknjFE6bJg3NSc3EyL8EQGC65uV+fwuo/FB9Xrm2t7wGIe35F51E\nveErZ5zI7ecfKU57HRYnJOk46urshJxiRs9Kfpl/AoGAJf18exvANKGR4GyLAu0W\n07hgBlviFvzjAuw43CfNFy2/ZYspi9cJCAJQYvak8jTbVYt+2o2jAAY8FP7/1quS\nYRQCKF/M6SnPupoE2knCoWabCMXu1+bhnpGKNr3cZrnLqXxQBhZeYpVmnPs+P7sR\nbSUuW/BCS9Ui5F0zpEuasjQ=\n-----END PRIVATE KEY-----";
process.env.STRAPI_GRAPHQL_URL ??= "http://localhost:1337/graphql";
process.env.STRAPI_API_TOKEN ??= "test-token";
process.env.N8N_CHAT_WEBHOOK_URL ??= "http://localhost:5678/webhook/chat";
process.env.N8N_WEBHOOK_SECRET ??= "test-secret";

const { buildApp } = await import("../src/app.js");

describe("GET /health", () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = await buildApp();
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("responde 200 con status ok", async () => {
    const res = await app.inject({ method: "GET", url: "/health" });
    expect(res.statusCode).toBe(200);
    expect(res.json()).toMatchObject({ status: "ok" });
  });
});

describe("POST /api/chat", () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = await buildApp();
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("rechaza un mensaje vacío con 400", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/api/chat",
      payload: { message: "", sessionId: "abc", lang: "es" },
    });
    expect(res.statusCode).toBe(400);
  });
});

describe("GET /api/dashboard/stream", () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = await buildApp();
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("rechaza sin token con 401", async () => {
    const res = await app.inject({ method: "GET", url: "/api/dashboard/stream" });
    expect(res.statusCode).toBe(401);
  });
});
