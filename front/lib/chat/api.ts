import type { Lang } from "@/lib/translations";
import { classify, CHAT_CHROME, type ClassifyResult } from "@/lib/chat/data";

// =====================================================================
// CONFIG — hoy corre en modo MOCK (simulado en el navegador, sin backend).
// Cuando el flujo de n8n esté publicado, cambiar USE_MOCK a false y
// completar CHAT_ENDPOINT con la URL del endpoint del BFF que reenvía
// al webhook de n8n (nunca apuntar el widget directo a n8n en producción).
// =====================================================================
export const USE_MOCK = true;
export const CHAT_ENDPOINT = "https://TU-BACKEND/api/chat";

function mockResponse(text: string, lang: Lang): Promise<ClassifyResult> {
  const trimmed = text.trim();
  if (!trimmed) return Promise.resolve({ reply: CHAT_CHROME[lang].emptyMsg, options: [] });
  if (trimmed.length > 400) return Promise.resolve({ reply: CHAT_CHROME[lang].tooLongMsg, options: [] });
  return new Promise((resolve) =>
    setTimeout(() => resolve(classify(trimmed, lang)), 500 + Math.random() * 400)
  );
}

export async function getBotReply(text: string, lang: Lang, sessionId: string): Promise<ClassifyResult> {
  if (USE_MOCK) return mockResponse(text, lang);

  const res = await fetch(CHAT_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: text, sessionId, lang }),
  });
  if (!res.ok) return { reply: CHAT_CHROME[lang].connectionErrorMsg, options: [] };
  return res.json();
}
