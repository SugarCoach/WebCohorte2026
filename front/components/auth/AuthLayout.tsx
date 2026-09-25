"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { GlowBlob } from "@/components/ui/GlowBlob";
import { Logo } from "@/components/ui/Logo";
import { MASCOT_SRC } from "@/lib/images";

export function AuthLayout({ children, title, subtitle }: { children: ReactNode; title: string; subtitle: string }) {
  return (
    <div className="grid min-h-screen grid-cols-1 bg-base lg:grid-cols-2">
      <div className="flex items-center justify-center px-4 py-12 md:px-8">
        <div className="w-full max-w-md">
          <a href="/" className="mb-8 inline-flex" aria-label="SugarCoach inicio">
            <Logo />
          </a>
          <h1 className="text-3xl font-extrabold tracking-tight">{title}</h1>
          <p className="mt-2 text-body">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </div>
      <div className="relative hidden items-center justify-center overflow-hidden bg-alt lg:flex">
        <GlowBlob color="purple" size={480} className="left-[-120px] top-[-100px]" opacity={0.3} />
        <GlowBlob color="blue" size={420} className="bottom-[-120px] right-[-100px]" opacity={0.28} />
        <div className="relative z-10 mx-12 rounded-3xl border border-line/10 bg-tint/[0.04] p-8 backdrop-blur">
          <Image
            src={MASCOT_SRC}
            alt="Mascota Sugar, tu compañero diario"
            width={96}
            height={96}
            loading="lazy"
            className="h-24 w-24 rounded-2xl object-cover"
          />
          <p className="mt-4 text-2xl font-extrabold text-ink">Cuidarte puede sentirse más simple.</p>
          <p className="mt-2 max-w-sm text-body">Registrá, sumá puntos y compartí reportes claros con tu familia y tu equipo médico.</p>
          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-line/10 bg-base/60 p-4">
            <span className="text-2xl">⭐</span>
            <p className="text-sm text-ink"><strong>+100 puntos</strong> por cada registro completo. <span className="text-body">Nunca juzgamos valores.</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
