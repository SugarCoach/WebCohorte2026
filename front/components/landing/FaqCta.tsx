"use client";

import { useState } from "react";
import Image from "next/image";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { CTA_LOGO } from "@/lib/images";
import { useLanguage } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { GooglePlayIcon } from "../ui/GooglePlayIcon";

const FAQ_IDS = [1, 2, 3, 4] as const;

/** Preguntas frecuentes, calcada 1:1 de index.html (sección 13, id `preguntas-frecuentes`). */
export function FaqSection() {
  const { t } = useLanguage();
  // Acordeón fiel a index.html: single-open, primer item abierto, animación
  // de `grid-template-rows` (siempre montado, se abre/cierra con `.open`).
  const [open, setOpen] = useState<number>(1);
  return (
    <section className="mx-auto max-w-[860px] px-gutter-mobile py-space-3xl md:px-gutter-tablet lg:px-gutter-desktop" id="preguntas-frecuentes">
      <div className="mb-space-2xl flex flex-col items-center text-center">
        <span className="mb-2 font-label-md text-label-md font-bold uppercase tracking-wider text-primary">{t("faq.eyebrow")}</span>
        <h2 className="font-headline-lg text-headline-lg font-extrabold tracking-tight text-text-primary">{t("faq.title")}</h2>
        <p className="mt-space-xs font-body-md text-body-md text-text-secondary">{t("faq.description")}</p>
      </div>
      <div className="flex flex-col gap-space-sm" id="faq-container">
        {FAQ_IDS.map((n) => {
          const isOpen = open === n;
          return (
            <div
              key={n}
              className={cn(
                "sc-hover-card faq-item overflow-hidden rounded-2xl border border-border-subtle bg-surface-tier-1 shadow-sm transition-colors",
                isOpen && "open",
              )}
            >
              <button
                className="faq-btn flex w-full items-center justify-between px-space-lg py-space-lg text-left focus:outline-none"
                type="button"
                onClick={() => setOpen(isOpen ? 0 : n)}
              >
                <span className="font-headline-sm text-headline-sm font-bold text-text-primary">{t(`faq.q${n}`)}</span>
                <MaterialIcon name="expand_more" className="faq-icon text-text-tertiary" />
              </button>
              <div className="faq-answer">
                <div className="faq-answer-inner">
                  <div className="faq-content border-t border-border-subtle px-space-lg pb-space-lg pt-0 font-body-md text-text-secondary">
                    {t(`faq.a${n}`)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/** CTA final, calcada 1:1 de index.html (sección 12, id `descargar`). */
export function CtaSection() {
  const { t } = useLanguage();
  return (
    <section className="mx-auto max-w-[1200px] px-gutter-mobile py-space-3xl md:px-gutter-tablet lg:px-gutter-desktop" id="descargar">
      <div className="theme-panel-download relative overflow-hidden rounded-[40px] border border-border-subtle p-space-xl shadow-2xl md:p-space-3xl">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-primary/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-1/3 h-80 w-80 rounded-full bg-neon-magenta/20 blur-3xl" />
        <div className="relative z-10 grid grid-cols-1 items-center gap-space-2xl lg:grid-cols-12">
          <div className="flex flex-col gap-space-md lg:col-span-8">
            <div className="theme-panel-chip inline-flex w-fit items-center gap-space-xs rounded-full border px-3.5 py-1.5 font-label-md text-label-md font-bold backdrop-blur-sm">
              <span>✨</span> <span>{t("cta.badge")}</span>
            </div>
            <h2 className="theme-panel-text font-display-lg text-display-lg-mobile font-extrabold leading-tight tracking-tight md:text-display-lg">
              <span>{t("cta.titlePrefix")}</span>
              <span className="gradient-text">{t("cta.titleHighlight")}</span>
              <span>{t("cta.titleSuffix")}</span>
            </h2>
            <p className="theme-panel-muted max-w-2xl font-body-lg text-body-lg">{t("cta.description")}</p>
            <div className="flex flex-col items-stretch gap-space-md pt-space-md sm:flex-row sm:items-center">
              <a
                className="inline-flex items-center justify-center gap-space-xs rounded-full btn-gradient border border-white/20 px-space-2xl py-4 font-headline-sm text-headline-sm font-bold shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                href="#"
              >
                <MaterialIcon name="download" style={{ fontSize: 24 }} />
                <span>{t("cta.download")}</span>
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-space-sm pt-space-xs">
              <a className="theme-panel-card inline-flex items-center gap-space-xs rounded-xl border px-space-md py-space-xs backdrop-blur-md transition-all hover:scale-[1.02]" href="#">
                <GooglePlayIcon className="h-6 w-6 flex-shrink-0" />
                <div className="flex flex-col text-left">
                  <span className="theme-panel-muted font-label-sm text-[10px] leading-tight">{t("footer.available")}</span>
                  <span className="theme-panel-text font-label-md text-label-md font-bold leading-tight">{t("footer.googlePlay")}</span>
                </div>
              </a>
            </div>
          </div>
          <div className="flex items-center justify-center lg:col-span-4">
            <div className="group relative flex h-52 w-52 items-center justify-center rounded-3xl border border-white/20 bg-white/[0.08] p-6 shadow-[0_20px_50px_rgba(196,92,255,0.25)] backdrop-blur-xl transition-transform hover:scale-105 md:h-64 md:w-64">
              <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-tr from-primary/20 to-neon-magenta/20 blur-xl" />
              <Image
                src={CTA_LOGO}
                alt="SugarCoach Logo Oficial"
                width={256}
                height={256}
                loading="lazy"
                className="relative z-10 h-full w-full object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
