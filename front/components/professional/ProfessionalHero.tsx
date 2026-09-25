"use client";

import Image from "next/image";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { useLanguage } from "@/lib/i18n";

/** Hero de /profesionales, calcado 1:1 de profesionales.html (sección 1). */
export function ProfessionalHero() {
  const { t } = useLanguage();
  return (
    <div className="relative w-full overflow-hidden bg-bg-deep">
      <div className="pointer-events-none absolute -top-24 left-1/4 h-[520px] w-[520px] rounded-full bg-primary/15 blur-[140px]" />
      <div className="pointer-events-none absolute right-10 top-48 h-[460px] w-[460px] rounded-full bg-neon-magenta/15 blur-[150px]" />
      <div className="pointer-events-none absolute left-[-100px] top-72 h-[400px] w-[400px] rounded-full bg-secondary/10 blur-[130px]" />
      <section className="relative z-10 mx-auto max-w-[1200px] px-gutter-mobile pb-space-3xl pt-space-xl md:px-gutter-tablet md:pt-space-2xl lg:px-gutter-desktop">
        <div className="grid grid-cols-1 items-center gap-space-2xl lg:grid-cols-12">
          <div className="flex flex-col gap-space-lg lg:col-span-6">
            <div className="inline-flex w-fit items-center gap-space-xs rounded-full border border-border-subtle bg-surface-tier-1 px-3.5 py-1.5 text-primary shadow-md backdrop-blur-md">
              <MaterialIcon name="verified" filled className="text-accent-yellow" style={{ fontSize: 18 }} />
              <span className="font-label-md text-label-md font-bold tracking-tight text-text-primary">{t("pro.hero.badge")}</span>
            </div>
            <h1 className="font-display-lg text-display-lg-mobile font-extrabold tracking-tight text-on-surface md:text-display-lg">
              <span>{t("pro.hero.titlePrefix")}</span>
              <span className="text-primary underline decoration-secondary decoration-2 underline-offset-8">{t("pro.hero.titleHighlight")}</span>
              <span>{t("pro.hero.titleSuffix")}</span>
            </h1>
            <p className="max-w-xl font-body-lg text-body-lg text-on-surface-variant">{t("pro.hero.description")}</p>
            <div className="flex flex-col items-stretch gap-space-md pt-space-xs sm:flex-row sm:items-center">
              <a
                className="inline-flex items-center justify-center gap-space-xs rounded-full bg-primary px-space-xl py-4 font-label-lg text-label-lg text-on-primary shadow-xl transition-all hover:bg-[#3A2BA8] active:scale-[0.98]"
                href="#acceso-profesional"
              >
                <MaterialIcon name="stethoscope" style={{ fontSize: 20 }} />
                <span>{t("pro.hero.ctaPrimary")}</span>
              </a>
              <a
                className="inline-flex items-center justify-center gap-space-xs rounded-full border border-outline-variant bg-surface-container px-space-xl py-4 font-label-lg text-label-lg text-on-surface transition-all hover:bg-surface-container-high active:scale-[0.98]"
                href="#dashboard-medico"
              >
                <MaterialIcon name="play_circle" className="text-primary" style={{ fontSize: 20 }} />
                <span>{t("pro.hero.ctaSecondary")}</span>
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-space-md pt-space-md">
              <div className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant">
                <MaterialIcon name="lock" className="text-primary" style={{ fontSize: 18 }} /> {t("pro.hero.badge1")}
              </div>
              <div className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant">
                <MaterialIcon name="bar_chart" className="text-primary" style={{ fontSize: 18 }} /> {t("pro.hero.badge2")}
              </div>
              <div className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant">
                <MaterialIcon name="sentiment_satisfied" className="text-primary" style={{ fontSize: 18 }} /> {t("pro.hero.badge3")}
              </div>
            </div>
          </div>
          <div className="relative flex items-center justify-center pt-8 lg:col-span-6 lg:pt-0">
            <div className="absolute h-80 w-80 rounded-full bg-gradient-to-tr from-primary/25 via-neon-magenta/20 to-secondary/15 blur-3xl md:h-96 md:w-96" />
            <figure className="shot-frame relative z-20 w-full max-w-[560px] shadow-2xl">
              <div className="shot-frame-top">
                <span className="inline-flex items-center gap-3">
                  <span className="shot-dots" aria-hidden="true">
                    <span /> <span /> <span />
                  </span>
                  {t("pro.hero.shotLabel")}
                </span>
                <a href="#dashboard-medico" className="shot-expand">
                  <MaterialIcon name="visibility" style={{ fontSize: 18 }} /> {t("pro.hero.shotCta")}
                </a>
              </div>
              <Image
                src="/contenido/lovable-pictures/1.png"
                alt={t("pro.hero.shotAlt")}
                width={1327}
                height={651}
                priority
              />
              <figcaption className="border-t border-border-subtle px-5 py-3 font-body-sm text-body-sm text-on-surface-variant">
                {t("pro.hero.shotCaption")}
              </figcaption>
            </figure>
          </div>
        </div>
      </section>
    </div>
  );
}
