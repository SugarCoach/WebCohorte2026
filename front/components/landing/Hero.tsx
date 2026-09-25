"use client";

import Image from "next/image";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { PHONES } from "@/lib/images";
import { useLanguage } from "@/lib/i18n";

/** Sección Hero, calcada 1:1 de index.html (sección 1). */
export function Hero() {
  const { t } = useLanguage();
  return (
    <div className="relative w-full">
      <div className="pointer-events-none absolute -top-24 left-1/4 h-[520px] w-[520px] rounded-full bg-primary/15 blur-[140px]" />
      <div className="pointer-events-none absolute right-10 top-48 h-[460px] w-[460px] rounded-full bg-neon-magenta/15 blur-[150px]" />
      <div className="pointer-events-none absolute left-[-100px] top-72 h-[400px] w-[400px] rounded-full bg-secondary/10 blur-[130px]" />
      <section className="relative z-10 mx-auto max-w-[1200px] px-gutter-mobile pb-space-xl pt-space-xl md:px-gutter-tablet lg:px-gutter-desktop">
        <div className="grid grid-cols-1 items-center gap-space-2xl lg:grid-cols-12">
          <div className="flex flex-col gap-space-lg lg:col-span-6">
            <div className="inline-flex w-fit items-center gap-space-xs rounded-full border border-border-subtle bg-surface-tier-1 px-3.5 py-1.5 text-primary shadow-md backdrop-blur-md">
              <MaterialIcon name="star" filled className="text-accent-yellow" style={{ fontSize: 18 }} />
              <span className="font-label-md text-label-md font-bold tracking-tight text-text-primary">{t("hero.badge")}</span>
            </div>
            <h1 className="font-display-lg text-display-lg-mobile font-extrabold tracking-tight text-text-primary md:text-display-lg">
              <span>{t("hero.titlePrefix")}</span>
              <span className="gradient-text underline decoration-secondary decoration-wavy underline-offset-8">{t("hero.titleHighlight")}</span>
              <span>{t("hero.titleSuffix")}</span>
            </h1>
            <p className="font-body-lg max-w-xl text-body-lg text-text-secondary">{t("hero.description")}</p>
            <div className="flex flex-col items-stretch gap-space-md pt-space-xs sm:flex-row sm:items-center">
              <a
                className="inline-flex items-center justify-center gap-space-xs rounded-full btn-gradient border border-white/20 px-space-xl py-4 font-label-lg text-label-lg text-white transition-all active:scale-[0.98]"
                href="#descargar"
              >
                <MaterialIcon name="download" style={{ fontSize: 20 }} />
                <span>{t("btn.downloadFree")}</span>
              </a>
              <a
                className="inline-flex items-center justify-center gap-space-xs rounded-full border border-outline-variant bg-surface-container px-space-xl py-4 font-label-lg text-label-lg text-on-surface transition-all hover:border-outline hover:bg-surface-container-high active:scale-[0.98]"
                href="#como-funciona"
              >
                <MaterialIcon name="play_circle" className="text-primary" style={{ fontSize: 20 }} />
                <span>{t("btn.seeHow")}</span>
              </a>
            </div>
            <div className="flex items-center gap-space-lg pt-space-md">
              <div className="flex -space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-bg-deep bg-secondary-fixed font-label-md font-bold text-on-secondary-fixed shadow-sm">LF</div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-bg-deep bg-primary-fixed font-label-md font-bold text-on-primary-fixed shadow-sm">MA</div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-bg-deep bg-tertiary-fixed font-label-md font-bold text-on-tertiary-fixed shadow-sm">SR</div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-bg-deep bg-surface-container-highest font-label-md font-bold text-primary shadow-sm">+8k</div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-accent-yellow">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <MaterialIcon key={i} name="star" filled style={{ fontSize: 16 }} />
                  ))}
                  <span className="ml-1 font-label-md text-label-md font-bold text-text-primary">4.9 / 5</span>
                </div>
                <span className="font-body-sm text-body-sm text-text-secondary">{t("hero.socialProof")}</span>
              </div>
            </div>
          </div>

          <div className="relative flex items-center justify-center pt-8 lg:col-span-6 lg:pt-0">
            <div className="absolute h-80 w-80 rounded-full bg-gradient-to-tr from-primary/25 via-neon-magenta/20 to-secondary/15 blur-3xl md:h-96 md:w-96" />
            <div
              className="absolute -top-6 left-2 z-30 flex animate-bounce items-center gap-3 rounded-2xl border border-border-subtle bg-surface-container-lowest px-4 py-3 shadow-xl sm:-left-4"
              style={{ animationDuration: "5s" }}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                <MaterialIcon name="trending_down" style={{ fontSize: 20 }} />
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-[11px] text-text-tertiary">{t("hero.lastReading")}</span>
                <span className="font-label-md text-[15px] font-extrabold text-text-primary">{t("hero.readingStatus")}</span>
              </div>
            </div>
            <div className="absolute -left-6 bottom-10 z-30 flex items-center gap-3 rounded-2xl border border-border-subtle bg-surface-container-lowest px-4 py-3 shadow-xl sm:-left-8">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-amber-400/30 bg-amber-400/20 font-bold text-accent-yellow">
                <MaterialIcon name="star" filled style={{ fontSize: 20 }} />
              </div>
              <div className="flex flex-col">
                <span className="font-label-md font-bold text-text-primary">{t("hero.points")}</span>
                <span className="font-label-sm text-[11px] text-text-tertiary">{t("hero.streak")}</span>
              </div>
            </div>
            <div className="absolute -right-6 top-1/3 z-30 hidden items-center gap-3 rounded-2xl border border-border-subtle bg-surface-container-lowest px-4 py-3 shadow-xl sm:flex">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-secondary/30 bg-secondary/20 text-secondary">
                <MaterialIcon name="family_restroom" style={{ fontSize: 20 }} />
              </div>
              <div className="flex flex-col">
                <span className="font-label-md font-bold text-text-primary">{t("hero.familyConnected")}</span>
                <span className="font-label-sm text-[11px] text-text-tertiary">{t("hero.sync")}</span>
              </div>
            </div>
            <div className="absolute -right-6 top-8 z-10 hidden w-[240px] rotate-6 rounded-[36px] border-2 border-border-subtle bg-[#070D1F] p-2.5 opacity-85 shadow-2xl transition-transform duration-300 hover:rotate-2 sm:block">
              <div className="aspect-[9/19.5] overflow-hidden rounded-[28px] bg-black">
                <Image
                  src={PHONES.heroDailyLog}
                  alt="Pantalla real SugarCoach Daily Log"
                  width={240}
                  height={480}
                  sizes="240px"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="relative z-20 w-[280px] rounded-[44px] border-2 border-white/[0.16] bg-[#0A1024] p-3 phone-mockup-glow transition-transform hover:scale-[1.01] sm:w-[310px]">
              <div className="mx-auto mb-2 h-4 w-24 rounded-full border border-white/[0.05] bg-black/80" />
              <div className="aspect-[9/19.5] overflow-hidden rounded-[32px] bg-black shadow-inner">
                <Image
                  src={PHONES.home}
                  alt="Pantalla real SugarCoach Home"
                  width={310}
                  height={620}
                  priority
                  sizes="(max-width: 640px) 280px, 310px"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
