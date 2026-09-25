/**
 * Cliente API centralizado.
 * Lee NEXT_PUBLIC_API_URL desde env. Cuando el backend esté listo,
 * basta reemplazar las funciones mock de los hooks por llamadas a apiFetch,
 * sin tocar los componentes.
 */
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

export interface ApiOptions extends RequestInit {
  // Permite pasar body tipado como objeto; se serializa a JSON.
  json?: unknown;
}

export async function apiFetch<T>(
  endpoint: string,
  options: ApiOptions = {},
): Promise<T> {
  const { json, headers, ...rest } = options;
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(headers ?? {}),
    },
    body: json !== undefined ? JSON.stringify(json) : undefined,
    ...rest,
  });

  if (!res.ok) {
    const message = await res.text().catch(() => res.statusText);
    throw new Error(message || `Error ${res.status}`);
  }
  return (await res.json()) as T;
}

/** Simula latencia de red mientras el backend no existe. */
export function mockDelay(ms = 900): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export { API_BASE_URL };
