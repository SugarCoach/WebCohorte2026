"use client";

import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { useLanguage } from "@/lib/i18n";

const CARD_STYLES = [
  { hover: "hover:border-secondary/30", iconWrap: "border-secondary/30 bg-secondary/15 text-secondary", icon: "shield" },
  { hover: "hover:border-primary/30", iconWrap: "border-primary/30 bg-primary/15 text-primary", icon: "lock" },
  { hover: "hover:border-tertiary-container/30", iconWrap: "border-tertiary-container/30 bg-tertiary-container/15 text-neon-magenta", icon: "person_off" },
];

/** Seguridad y privacidad, calcada 1:1 de index.html (sección 8). */
export function PrivacySection() {
  const { t } = useLanguage();
  const items = [
    { title: t("privacy.design.title"), desc: t("privacy.design.description") },
    { title: t("privacy.access.title"), desc: t("privacy.access.description") },
    { title: t("privacy.noSelling.title"), desc: t("privacy.noSelling.description") },
  ];
  return (
    <section className="mx-auto max-w-[1200px] px-gutter-mobile py-space-3xl md:px-gutter-tablet lg:px-gutter-desktop">
      <div className="mx-auto mb-space-2xl flex max-w-2xl flex-col items-center text-center">
        <span className="mb-2 font-label-md text-label-md font-bold uppercase tracking-wider text-primary">{t("privacy.eyebrow")}</span>
        <h2 className="font-headline-lg text-headline-lg font-extrabold tracking-tight text-text-primary">{t("privacy.title")}</h2>
        <p className="mt-space-xs font-body-md text-body-md text-text-secondary">{t("privacy.description")}</p>
      </div>
      <div className="grid grid-cols-1 gap-space-lg md:grid-cols-3">
        {items.map((item, i) => {
          const style = CARD_STYLES[i];
          return (
            <div
              key={item.title}
              className={`sc-hover-card overflow-hidden flex flex-col gap-space-sm rounded-3xl border border-border-subtle bg-surface-tier-1 p-space-xl transition-colors ${style.hover}`}
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${style.iconWrap}`}>
                <MaterialIcon name={style.icon} style={{ fontSize: 28 }} />
              </div>
              <h3 className="font-headline-sm text-headline-sm font-bold text-text-primary">{item.title}</h3>
              <p className="font-body-md text-body-md text-text-secondary">{item.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
