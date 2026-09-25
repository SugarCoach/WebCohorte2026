"use client";

import Image from "next/image";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { PHONES } from "@/lib/images";
import { useLanguage } from "@/lib/i18n";

/** Estadísticas, calcada 1:1 de index.html (sección 6, id `profesionales`). */
export function StatsSection() {
  const { t } = useLanguage();
  return (
    <section className="relative w-full py-space-3xl" id="profesionales">
      <div className="pointer-events-none absolute right-0 top-1/3 h-96 w-96 rounded-full bg-secondary/10 blur-[140px]" />
      <div className="relative z-10 mx-auto max-w-[1200px] px-gutter-mobile md:px-gutter-tablet lg:px-gutter-desktop">
        <div className="grid grid-cols-1 items-center gap-space-2xl lg:grid-cols-12">
          <div className="order-2 flex justify-center lg:col-span-6 lg:order-2">
            <div className="relative w-[280px] rounded-[42px] border-2 border-white/[0.16] bg-[#070D1F] p-3 phone-mockup-glow transition-transform hover:scale-[1.01] sm:w-[310px]">
              <div className="mx-auto mb-2 h-3.5 w-20 rounded-full border border-white/[0.05] bg-black opacity-70" />
              <div className="aspect-[9/19.5] overflow-hidden rounded-[30px] bg-black">
                <Image
                  src={PHONES.stats}
                  alt="Pantalla de estadísticas Glucose vs Insulin SugarCoach"
                  width={310}
                  height={618}
                  loading="lazy"
                  sizes="(max-width: 640px) 280px, 310px"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
          <div className="order-1 flex flex-col gap-space-md lg:col-span-6 lg:order-1">
            <div className="inline-flex w-fit items-center gap-space-xs rounded-full border border-border-subtle bg-surface-tier-1 px-3.5 py-1.5 font-label-md text-label-md font-bold text-primary shadow-md">
              <MaterialIcon name="stethoscope" style={{ fontSize: 18 }} /> <span>{t("stats.badge")}</span>
            </div>
            <h2 className="font-headline-lg text-headline-lg font-extrabold tracking-tight text-text-primary">{t("stats.title")}</h2>
            <p className="font-body-lg text-body-lg text-text-secondary">{t("stats.description")}</p>
            <div className="flex flex-col gap-space-sm pt-2">
              <div className="sc-hover-card overflow-hidden flex items-start gap-3 rounded-2xl border border-border-subtle bg-surface-tier-1 p-space-sm">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-secondary/30 bg-secondary/20 font-bold text-secondary">
                  <MaterialIcon name="donut_large" style={{ fontSize: 18 }} />
                </div>
                <div>
                  <span className="font-label-md text-label-md font-bold text-text-primary">{t("stats.tir.title")}</span>{" "}
                  <span className="block font-body-sm text-body-sm text-text-secondary">{t("stats.tir.description")}</span>
                </div>
              </div>
              <div className="sc-hover-card overflow-hidden flex items-start gap-3 rounded-2xl border border-border-subtle bg-surface-tier-1 p-space-sm">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/20 font-bold text-primary">
                  <MaterialIcon name="bar_chart" style={{ fontSize: 18 }} />
                </div>
                <div>
                  <span className="font-label-md text-label-md font-bold text-text-primary">{t("stats.curves.title")}</span>{" "}
                  <span className="block font-body-sm text-body-sm text-text-secondary">{t("stats.curves.description")}</span>
                </div>
              </div>
            </div>
            <div className="pt-space-xs">
              <a
                className="inline-flex items-center gap-space-xs rounded-full btn-gradient border border-white/20 px-space-xl py-space-sm font-label-lg text-label-lg text-white transition-all"
                href="#descargar"
              >
                <span>{t("stats.button")}</span>
                <MaterialIcon name="arrow_forward" style={{ fontSize: 18 }} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
