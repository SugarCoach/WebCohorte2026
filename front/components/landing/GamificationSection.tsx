"use client";

import Image from "next/image";
import { PHONES } from "@/lib/images";
import { useLanguage } from "@/lib/i18n";

/** Gamificación, calcada 1:1 de index.html (sección 4, id `gamificacion`). */
export function GamificationSection() {
  const { t } = useLanguage();
  return (
    <section className="mx-auto max-w-[1200px] px-gutter-mobile py-space-2xl md:px-gutter-tablet lg:px-gutter-desktop" id="gamificacion">
      <div className="theme-panel-gamification relative overflow-hidden rounded-3xl border border-border-subtle p-space-xl shadow-2xl md:p-space-3xl">
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="pointer-events-none absolute left-1/3 top-0 h-64 w-64 rounded-full bg-neon-magenta/15 blur-3xl" />
        <div className="relative z-10 grid grid-cols-1 items-center gap-space-2xl lg:grid-cols-12">
          <div className="flex flex-col gap-space-md lg:col-span-6">
            <div className="theme-panel-chip inline-flex w-fit items-center gap-space-xs rounded-full border px-3.5 py-1.5 font-label-md text-label-md font-bold backdrop-blur-md">
              <span>🎮</span> <span>{t("gamif.badge")}</span>
            </div>
            <h2 className="theme-panel-text font-display-lg text-display-lg-mobile font-extrabold leading-tight tracking-tight md:text-headline-lg">
              <span>{t("gamif.titlePrefix")}</span>
              <span className="gradient-text">{t("gamif.titleHighlight")}</span>
            </h2>
            <p className="theme-panel-muted font-body-lg text-body-lg">
              {t("gamif.description")}
            </p>
            <div className="grid grid-cols-2 gap-space-sm pt-2">
              <div className="sc-hover-card overflow-hidden theme-panel-card flex items-center gap-3 rounded-2xl border p-space-md">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-amber-400/30 bg-amber-400/20 text-xl font-bold text-accent-yellow">⭐</div>
                <div>
                  <h4 className="theme-panel-text font-headline-sm text-[16px] font-bold">{t("gamif.points")}</h4>
                  <p className="theme-panel-muted font-body-sm text-[12px]">{t("gamif.pointsDescription")}</p>
                </div>
              </div>
              <div className="sc-hover-card overflow-hidden theme-panel-card flex items-center gap-3 rounded-2xl border p-space-md">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-400/30 bg-emerald-400/20 text-xl font-bold text-emerald-300">🚀</div>
                <div>
                  <h4 className="theme-panel-text font-headline-sm text-[16px] font-bold">{t("gamif.level")}</h4>
                  <p className="theme-panel-muted font-body-sm text-[12px]">{t("gamif.levelDescription")}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center lg:col-span-6">
            <div className="relative w-[270px] rounded-[42px] border-2 border-white/[0.16] bg-[#070D1F] p-3 phone-mockup-glow transition-transform hover:scale-[1.02] sm:w-[300px]">
              <div className="mx-auto mb-2 h-3.5 w-20 rounded-full border border-white/[0.05] bg-black opacity-70" />
              <div className="aspect-[9/19.5] overflow-hidden rounded-[30px] bg-black shadow-inner">
                <Image
                  src={PHONES.gamification}
                  alt="Pantalla de logros SugarCoach"
                  width={300}
                  height={598}
                  loading="lazy"
                  sizes="(max-width: 640px) 270px, 300px"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
