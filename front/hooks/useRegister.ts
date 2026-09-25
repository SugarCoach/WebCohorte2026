"use client";

import { useMutation } from "@tanstack/react-query";
import { mockDelay } from "@/lib/api";
import type { AuthResponse, RegisterInput } from "@/types";

/**
 * Registro simulado. Integración real futura:
 *   apiFetch<AuthResponse>("/auth/register", { method: "POST", json: input })
 */
async function mockRegister(input: RegisterInput): Promise<AuthResponse> {
  await mockDelay(1100);
  return {
    user: { id: "u_new", name: input.name, email: input.email },
    token: "mock-token",
  };
}

export function useRegister() {
  return useMutation({
    mutationFn: mockRegister,
    mutationKey: ["auth", "register"],
  });
}
