"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { usePlans } from "@/hooks/usePlans";
import { formatPrice } from "@/lib/mock-data";
import type { BillingPeriod } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function PricingSection() {
  const [period, setPeriod] = useState<BillingPeriod>("monthly");
  const { data: plans, isLoading, isError } = usePlans();

  return (
    <section id="planes" className="relative mx-auto max-w-[1200px] px-4 py-14 md:px-6 lg:px-8">
      <Reveal className="mx-auto mb-8 flex max-w-2xl flex-col items-center text-center">
        <Badge variant="brand" className="mb-2">Planes</Badge>
        <h2 className="text-3xl font-extrabold tracking-tight">Elegí el acompañamiento ideal</h2>
        <p className="mt-2 text-text-secondary">Empezá gratis. Cambiá o cancelá cuando quieras.</p>
        <Tabs value={period} onValueChange={(v) => setPeriod(v as BillingPeriod)} className="mt-6">
          <TabsList aria-label="Periodo de facturación">
            <TabsTrigger value="monthly">Mensual</TabsTrigger>
            <TabsTrigger value="yearly">Anual −17%</TabsTrigger>
          </TabsList>
        </Tabs>
      </Reveal>

      {isLoading && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3" aria-label="Cargando planes">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-3xl border border-line/[0.08] bg-tint/[0.03] p-6">
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="mt-3 h-10 w-2/3" />
              <Skeleton className="mt-4 h-24 w-full" />
            </div>
          ))}
        </div>
      )}

      {isError && (
        <p className="text-center text-sm text-red-600 dark:text-red-300">No pudimos cargar los planes. Intentá de nuevo más tarde.</p>
      )}

      {plans && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {plans.map((plan, i) => {
            const price = period === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
            return (
              <Reveal key={plan.id} delay={i * 0.07}>
                <Card className={cn("flex h-full flex-col p-6", plan.highlighted && "border-pink-400/50 shadow-brand-glow")}>
                  <CardHeader className="p-0">
                    <div className="flex items-center justify-between">
                      <CardTitle>{plan.name}</CardTitle>
                      {plan.highlighted && <Badge variant="brand">Recomendado</Badge>}
                    </div>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col gap-4 p-0 pt-4">
                    <p className="text-4xl font-extrabold text-ink">
                      {formatPrice(price, plan.currency)}
                      {price > 0 && (
                        <span className="ml-1 text-sm font-medium text-muted">
                          /{period === "monthly" ? "mes" : "año"}
                        </span>
                      )}
                    </p>
                    <ul className="flex flex-col gap-2">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-body">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" /> {f}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="p-0 pt-6">
                    <Button variant={plan.highlighted ? "gradient" : "outline"} className="w-full">
                      {plan.cta}
                    </Button>
                  </CardFooter>
                </Card>
              </Reveal>
            );
          })}
        </div>
      )}
    </section>
  );
}
