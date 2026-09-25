"use client";

import Image from "next/image";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { PHONES } from "@/lib/images";
import { useLanguage } from "@/lib/i18n";

// Clases completas y literales (Tailwind no genera CSS para clases armadas con template strings).
const ITEM_STYLES = [
  { iconWrap: "border-amber-400/30 bg-amber-400/15 text-accent-yellow", cardHover: "hover:border-primary/40", badge: "border-amber-400/30 bg-amber-400/15 text-accent-yellow" },
  { iconWrap: "border-emerald-500/30 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400", cardHover: "hover:border-secondary/40", badge: "border-emerald-500/30 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" },
  { iconWrap: "border-teal-500/30 bg-teal-500/15 text-secondary", cardHover: "hover:border-primary/40", badge: "border-teal-500/30 bg-teal-500/15 text-secondary" },
  { iconWrap: "border-indigo-500/30 bg-indigo-500/15 text-primary dark:text-primary-fixed-dim", cardHover: "hover:border-primary/40", badge: "border-indigo-500/30 bg-indigo-500/15 text-primary dark:text-primary-fixed-dim" },
];
const ICONS = ["wb_sunny", "restaurant", "public", "bedtime"];

/** "Un día con SugarCoach", calcada 1:1 de index.html (sección 5). */
export function DayInLifeSection() {
  const { t } = useLanguage();
  const items = [
    { title: t("day.morning.title"), badge: t("day.morning.badge"), desc: t("day.morning.description") },
    { title: t("day.lunch.title"), badge: t("day.lunch.badge"), desc: t("day.lunch.description") },
    { title: t("day.activity.title"), badge: t("day.activity.badge"), desc: t("day.activity.description") },
    { title: t("day.night.title"), badge: t("day.night.badge"), desc: t("day.night.description") },
  ];
  return (
    <section className="mx-auto max-w-[1200px] px-gutter-mobile py-space-3xl md:px-gutter-tablet lg:px-gutter-desktop">
      <div className="mx-auto mb-space-2xl flex max-w-2xl flex-col items-center text-center">
        <span className="mb-2 font-label-md text-label-md font-bold uppercase tracking-wider text-primary">{t("day.eyebrow")}</span>
        <h2 className="font-headline-lg text-headline-lg font-extrabold tracking-tight text-text-primary">{t("day.title")}</h2>
        <p className="mt-space-xs font-body-md text-body-md text-text-secondary">{t("day.description")}</p>
      </div>
      <div className="grid grid-cols-1 items-center gap-space-2xl lg:grid-cols-12">
        <div className="order-2 flex justify-center lg:order-1 lg:col-span-5">
          <div className="relative w-[260px] rounded-[40px] border-2 border-emerald-500/30 bg-[#070D1F] p-3 phone-mockup-glow transition-transform hover:scale-[1.02] sm:w-[290px]">
            <div className="mx-auto mb-2 h-3.5 w-20 rounded-full border border-white/[0.05] bg-black opacity-70" />
            <div className="aspect-[9/19.5] overflow-hidden rounded-[28px] bg-[#3e683b]">
              <Image
                src={PHONES.activity}
                alt="Pantalla de actividad con planeta 3D"
                width={290}
                height={578}
                loading="lazy"
                sizes="(max-width: 640px) 260px, 290px"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
        <div className="order-1 flex flex-col gap-space-md lg:order-2 lg:col-span-7">
          {items.map((item, i) => {
            const style = ITEM_STYLES[i];
            return (
              <div
                key={item.title}
                className={`sc-hover-card flex items-start gap-4 overflow-hidden rounded-2xl border border-border-subtle bg-surface-tier-1 p-space-md transition-all hover:bg-surface-tier-2 ${style.cardHover}`}
              >
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${style.iconWrap}`}>
                  <MaterialIcon name={ICONS[i]} style={{ fontSize: 24 }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-headline-sm text-headline-sm font-bold text-text-primary">{item.title}</h4>
                    <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${style.badge}`}>{item.badge}</span>
                  </div>
                  <p className="mt-1 font-body-sm text-body-sm text-text-secondary">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
