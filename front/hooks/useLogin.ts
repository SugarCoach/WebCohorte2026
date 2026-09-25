"use client";

import { useMutation } from "@tanstack/react-query";
import { mockDelay } from "@/lib/api";
import type { AuthResponse, LoginInput } from "@/types";

/**
 * Login simulado. Cuando el backend exista, reemplazar el body por:
 *   apiFetch<AuthResponse>("/auth/login", { method: "POST", json: input })
 */
async function mockLogin(input: LoginInput): Promise<AuthResponse> {
  await mockDelay(900);
  if (input.email === "error@sugarcoach.app") {
    throw new Error("Credenciales inválidas. Probá de nuevo.");
  }
  return {
    user: { id: "u_1", name: "Familia Demo", email: input.email },
    token: "mock-token",
  };
}

export function useLogin() {
  return useMutation({
    mutationFn: mockLogin,
    mutationKey: ["auth", "login"],
  });
}
