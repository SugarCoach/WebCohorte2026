"use client";

import Image from "next/image";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { PHONES } from "@/lib/images";
import { useLanguage } from "@/lib/i18n";

/** Tratamiento, calcada 1:1 de index.html (sección 7, id `tratamiento`). */
export function TreatmentSection() {
  const { t } = useLanguage();
  return (
    <section className="mx-auto max-w-[1200px] px-gutter-mobile py-space-3xl md:px-gutter-tablet lg:px-gutter-desktop" id="tratamiento">
      <div className="grid grid-cols-1 items-center gap-space-2xl lg:grid-cols-12">
        <div className="flex justify-center lg:col-span-6">
          <div className="relative w-[280px] rounded-[42px] border-2 border-white/[0.16] bg-[#070D1F] p-3 phone-mockup-glow transition-transform hover:scale-[1.01] sm:w-[310px]">
            <div className="mx-auto mb-2 h-3.5 w-20 rounded-full border border-white/[0.05] bg-black opacity-70" />
            <div className="aspect-[9/19.5] overflow-hidden rounded-[30px] bg-black">
              <Image
                src={PHONES.treatment}
                alt="Pantalla de configuración de tratamiento e insulina SugarCoach"
                width={310}
                height={618}
                loading="lazy"
                sizes="(max-width: 640px) 280px, 310px"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-space-md lg:col-span-6">
          <div className="inline-flex w-fit items-center gap-space-xs rounded-full border border-border-subtle bg-surface-tier-1 px-3.5 py-1.5 font-label-md text-label-md font-bold text-secondary shadow-md">
            <MaterialIcon name="tune" style={{ fontSize: 18 }} /> <span>{t("treatment.badge")}</span>
          </div>
          <h2 className="font-headline-lg text-headline-lg font-extrabold tracking-tight text-text-primary">{t("treatment.title")}</h2>
          <p className="font-body-lg text-body-lg text-text-secondary">{t("treatment.description")}</p>
          <div className="grid grid-cols-3 gap-space-sm pt-space-xs text-center">
            <div className="sc-hover-card overflow-hidden rounded-2xl border border-cyan-500/20 bg-surface-tier-1 p-space-sm">
              <span className="block font-label-sm font-bold text-secondary">{t("treatment.hypo")}</span>
              <span className="font-headline-sm text-headline-sm font-extrabold text-text-primary">70</span>
              <span className="font-label-sm text-[10px] text-text-tertiary">mg/dL</span>
            </div>
            <div className="sc-hover-card overflow-hidden rounded-2xl border border-emerald-500/20 bg-surface-tier-1 p-space-sm">
              <span className="block font-label-sm font-bold text-emerald-600 dark:text-emerald-400">{t("treatment.target")}</span>
              <span className="font-headline-sm text-headline-sm font-extrabold text-emerald-700 dark:text-emerald-300">100</span>
              <span className="font-label-sm text-[10px] text-text-tertiary">mg/dL</span>
            </div>
            <div className="sc-hover-card overflow-hidden rounded-2xl border border-rose-500/20 bg-surface-tier-1 p-space-sm">
              <span className="block font-label-sm font-bold text-rose-600 dark:text-rose-400">{t("treatment.hyper")}</span>
              <span className="font-headline-sm text-headline-sm font-extrabold text-rose-600 dark:text-rose-400">180</span>
              <span className="font-label-sm text-[10px] text-text-tertiary">mg/dL</span>
            </div>
          </div>
          <p className="font-body-sm text-body-sm text-text-secondary">{t("treatment.compatibility")}</p>
        </div>
      </div>
    </section>
  );
}

