"use client";

import { useQuery } from "@tanstack/react-query";
import { mockDelay } from "@/lib/api";
import { mockPlans } from "@/lib/mock-data";
import type { Plan } from "@/types";

/**
 * Fetch de planes. Hoy sirve mock-data con latencia simulada;
 * mañana será: apiFetch<Plan[]>("/plans")
 */
async function fetchPlans(): Promise<Plan[]> {
  await mockDelay(700);
  return mockPlans;
}

export function usePlans() {
  return useQuery({
    queryKey: ["plans"],
    queryFn: fetchPlans,
    staleTime: 60_000,
  });
}
