"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { useLanguage } from "@/lib/i18n";

interface Shot {
  index: number;
  src: string;
  title: string;
  alt: string;
  caption: string;
  heading: string;
  description: string;
  bullets: [string, string];
  lightboxDesc: string;
  reverse: boolean;
  icon: string;
}

/** Recorrido visual del dashboard médico + flujo típico, calcado 1:1 de profesionales.html (sección 2). */
export function DashboardTourSection() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const lastFocused = useRef<HTMLElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const shots: Shot[] = useMemo(
    () => [
      {
        index: 0,
        src: "/contenido/lovable-pictures/1.png",
        title: t("pro.shot1.title"),
        alt: t("pro.shot1.alt"),
        caption: t("pro.shot1.caption"),
        heading: t("pro.shot1.heading"),
        description: t("pro.shot1.description"),
        bullets: [t("pro.shot1.bullet1"), t("pro.shot1.bullet2")],
        lightboxDesc: t("pro.shot1.lightboxDesc"),
        reverse: false,
        icon: "dashboard",
      },
      {
        index: 1,
        src: "/contenido/lovable-pictures/2.png",
        title: t("pro.shot2.title"),
        alt: t("pro.shot2.alt"),
        caption: t("pro.shot2.caption"),
        heading: t("pro.shot2.heading"),
        description: t("pro.shot2.description"),
        bullets: [t("pro.shot2.bullet1"), t("pro.shot2.bullet2")],
        lightboxDesc: t("pro.shot2.lightboxDesc"),
        reverse: true,
        icon: "history",
      },
      {
        index: 2,
        src: "/contenido/lovable-pictures/3.png",
        title: t("pro.shot3.title"),
        alt: t("pro.shot3.alt"),
        caption: t("pro.shot3.caption"),
        heading: t("pro.shot3.heading"),
        description: t("pro.shot3.description"),
        bullets: [t("pro.shot3.bullet1"), t("pro.shot3.bullet2")],
        lightboxDesc: t("pro.shot3.lightboxDesc"),
        reverse: false,
        icon: "bar_chart",
      },
      {
        index: 3,
        src: "/contenido/lovable-pictures/4.png",
        title: t("pro.shot4.title"),
        alt: t("pro.shot4.alt"),
        caption: t("pro.shot4.caption"),
        heading: t("pro.shot4.heading"),
        description: t("pro.shot4.description"),
        bullets: [t("pro.shot4.bullet1"), t("pro.shot4.bullet2")],
        lightboxDesc: t("pro.shot4.lightboxDesc"),
        reverse: true,
        icon: "medication",
      },
      {
        index: 4,
        src: "/contenido/lovable-pictures/5.png",
        title: t("pro.shot5.title"),
        alt: t("pro.shot5.alt"),
        caption: t("pro.shot5.caption"),
        heading: t("pro.shot5.heading"),
        description: t("pro.shot5.description"),
        bullets: [t("pro.shot5.bullet1"), t("pro.shot5.bullet2")],
        lightboxDesc: t("pro.shot5.lightboxDesc"),
        reverse: false,
        icon: "person",
      },
    ],
    [t],
  );

  const openShot = (i: number, trigger: HTMLElement) => {
    lastFocused.current = trigger;
    setOpenIndex((i + shots.length) % shots.length);
  };
  const closeShot = () => {
    setOpenIndex(null);
    lastFocused.current?.focus?.();
  };

  useEffect(() => {
    if (openIndex === null) return;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeShot();
      if (e.key === "ArrowLeft") setOpenIndex((i) => (i === null ? i : (i - 1 + shots.length) % shots.length));
      if (e.key === "ArrowRight") setOpenIndex((i) => (i === null ? i : (i + 1) % shots.length));
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openIndex, shots.length]);

  const active = openIndex !== null ? shots[openIndex] : null;

  return (
    <section className="relative w-full overflow-hidden bg-surface py-space-3xl" id="dashboard-medico">
      <div className="pointer-events-none absolute right-0 top-24 h-96 w-96 rounded-full bg-primary/10 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-24 left-0 h-96 w-96 rounded-full bg-secondary/10 blur-[140px]" />
      <div className="relative z-10 mx-auto max-w-[1200px] px-gutter-mobile md:px-gutter-tablet lg:px-gutter-desktop">
        <div className="mx-auto mb-space-3xl flex max-w-3xl flex-col items-center gap-space-sm text-center">
          <span className="mb-2 font-label-md text-label-md font-bold uppercase tracking-wider text-primary">{t("pro.dashboard.eyebrow")}</span>
          <h2 className="font-headline-lg text-headline-lg font-extrabold tracking-tight text-on-surface">{t("pro.dashboard.title")}</h2>
          <p className="mt-space-xs font-body-md text-body-md text-on-surface-variant">{t("pro.dashboard.description")}</p>
          <p className="font-body-md text-body-md text-on-surface-variant">
            <strong className="text-on-surface">{t("pro.dashboard.description2")}</strong>
          </p>
          <button
            type="button"
            className="mt-space-xs inline-flex w-fit items-center gap-2 whitespace-nowrap rounded-full border border-outline-variant bg-surface-container px-space-lg py-3 font-label-lg text-on-surface transition-all hover:bg-surface-container-high"
          >
            <MaterialIcon name="play_circle" className="text-primary" style={{ fontSize: 18 }} /> {t("pro.dashboard.ctaDemo")}
          </button>
        </div>

        <div className="mb-space-2xl flex flex-col gap-space-3xl">
          {shots.map((shot) => (
            <article key={shot.index} className="shot-card">
              <div className="grid grid-cols-1 items-center gap-space-xl lg:grid-cols-2">
                <figure className={`shot-frame shadow-xl ${shot.reverse ? "lg:order-2" : ""}`}>
                  <div className="shot-frame-top">
                    <span className="inline-flex items-center gap-3">
                      <span className="shot-dots" aria-hidden="true">
                        <span /> <span /> <span />
                      </span>
                      {shot.title}
                    </span>
                    <button
                      type="button"
                      className="shot-expand"
                      aria-label={`${t("pro.shot.expand")} ${shot.title}`}
                      onClick={(e) => openShot(shot.index, e.currentTarget)}
                    >
                      <MaterialIcon name="zoom_in" style={{ fontSize: 18 }} /> {t("pro.shot.expand")}
                    </button>
                  </div>
                  <button
                    type="button"
                    className="shot-img-btn"
                    aria-label={`${t("pro.shot.expand")} ${shot.title}`}
                    onClick={(e) => openShot(shot.index, e.currentTarget)}
                  >
                    <Image src={shot.src} alt={shot.alt} width={1327} height={651} loading="lazy" />
                  </button>
                  <figcaption className="border-t border-border-subtle px-5 py-3 font-body-sm text-body-sm text-on-surface-variant">
                    {shot.caption}{" "}
                    <a href="/profesionales/dashboard.html" className="font-bold text-primary underline">
                      {t("pro.shot.openInDemo")}
                    </a>
                  </figcaption>
                </figure>
                <div className={`flex flex-col gap-space-sm ${shot.reverse ? "lg:order-1" : ""}`}>
                  <div className="inline-flex w-fit items-center gap-1.5 rounded-full border border-border-subtle bg-surface-tier-1 px-3 py-1 font-label-sm text-label-sm font-bold text-primary">
                    <MaterialIcon name={shot.icon} style={{ fontSize: 18 }} /> {shot.title}
                  </div>
                  <h3 className="font-headline-md text-headline-md font-bold text-on-surface">{shot.heading}</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">{shot.description}</p>
                  <ul className="flex flex-col gap-2 font-body-md text-body-md text-on-surface-variant">
                    {shot.bullets.map((b) => (
                      <li key={b} className="flex gap-2">
                        <MaterialIcon name="check" className="text-primary" /> {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="rounded-3xl border border-border-subtle bg-surface-tier-1 p-space-xl shadow-xl md:p-space-2xl">
          <div className="mb-space-xl flex flex-col items-start gap-space-xs">
            <span className="font-label-md text-label-md font-bold uppercase tracking-wider text-primary">{t("pro.flow.eyebrow")}</span>
            <h3 className="font-headline-md text-headline-md font-bold text-on-surface">{t("pro.flow.title")}</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">{t("pro.flow.description")}</p>
          </div>
          <div className="grid grid-cols-1 gap-space-lg md:grid-cols-2 lg:grid-cols-4">
            {(["1", "2", "3", "4"] as const).map((n) => (
              <div key={n} className="flex flex-col gap-space-sm">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary font-headline-sm font-extrabold text-on-primary">
                  {n}
                </span>
                <h4 className="font-headline-sm text-headline-sm font-bold text-on-surface">{t(`pro.flow.step${n}.title`)}</h4>
                <p className="font-body-md text-body-md text-on-surface-variant">{t(`pro.flow.step${n}.desc`)}</p>
              </div>
            ))}
          </div>
          <div className="mt-space-xl flex items-start gap-3 rounded-2xl border border-border-subtle bg-surface-tier-2/70 p-space-md">
            <MaterialIcon name="lock" className="shrink-0 text-primary" style={{ fontSize: 22 }} />
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              <strong className="text-on-surface">{t("pro.flow.privacyTitle")}</strong> {t("pro.flow.privacyDesc")}
            </p>
          </div>
        </div>
      </div>

      {active && (
        <div id="shot-lightbox">
          <div className="shot-lightbox-backdrop" onClick={closeShot} />
          <div className="shot-lightbox-card" role="dialog" aria-modal="true" aria-labelledby="shot-lightbox-title">
            <div className="shot-lightbox-head flex items-center justify-between gap-3 border-b border-border-subtle px-5 py-4">
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm font-bold text-primary" aria-live="polite">
                  {active.index + 1} / {shots.length}
                </span>
                <h3 id="shot-lightbox-title" className="font-headline-sm text-headline-sm font-bold text-on-surface">
                  {active.title}
                </h3>
              </div>
              <button ref={closeBtnRef} type="button" className="shot-nav-btn" aria-label="Cerrar vista ampliada" onClick={closeShot}>
                <MaterialIcon name="close" style={{ fontSize: 22 }} />
              </button>
            </div>
            <div className="shot-lightbox-body p-4 md:p-6">
              <Image src={active.src} alt={active.alt} width={1327} height={651} />
              <p className="mt-4 font-body-md text-body-md text-on-surface-variant">{active.lightboxDesc}</p>
            </div>
            <div className="shot-lightbox-foot flex items-center justify-between gap-3 border-t border-border-subtle px-5 py-4">
              <button
                type="button"
                className="shot-nav-btn"
                aria-label="Ver captura anterior"
                onClick={() => setOpenIndex((i) => (i === null ? i : (i - 1 + shots.length) % shots.length))}
              >
                <MaterialIcon name="arrow_back" style={{ fontSize: 22 }} />
              </button>
              <a href="/profesionales/dashboard.html" className="font-label-lg text-label-lg font-bold text-primary underline">
                {t("pro.shot.openInDemo")}
              </a>
              <button
                type="button"
                className="shot-nav-btn"
                aria-label="Ver captura siguiente"
                onClick={() => setOpenIndex((i) => (i === null ? i : (i + 1) % shots.length))}
              >
                <MaterialIcon name="arrow_forward" style={{ fontSize: 22 }} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
