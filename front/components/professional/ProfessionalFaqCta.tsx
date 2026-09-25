"use client";

import { useEffect, useRef, useState } from "react";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { useLanguage } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const FAQ_IDS = [1, 2, 3] as const;

/** FAQ + CTA de acceso profesional + sticky CTA, calcado 1:1 de profesionales.html (sección 4). */
export function ProfessionalFaqCta() {
  const { t } = useLanguage();
  const [open, setOpen] = useState<number>(1);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [stickyVisible, setStickyVisible] = useState(false);
  const finalCtaRef = useRef<HTMLDivElement | null>(null);
  const finalVisibleRef = useRef(false);

  useEffect(() => {
    const toggleSticky = () => {
      setStickyVisible(window.scrollY > 650 && !finalVisibleRef.current);
    };
    let observer: IntersectionObserver | undefined;
    if (finalCtaRef.current && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          finalVisibleRef.current = entries[0].isIntersecting;
          toggleSticky();
        },
        { threshold: 0.15 },
      );
      observer.observe(finalCtaRef.current);
    }
    window.addEventListener("scroll", toggleSticky, { passive: true });
    toggleSticky();
    return () => {
      window.removeEventListener("scroll", toggleSticky);
      observer?.disconnect();
    };
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem("email") as HTMLInputElement | null;
    if (input && !input.checkValidity()) {
      input.reportValidity();
      return;
    }
    setSubmitted(true);
  };

  return (
    <>
      <section className="mx-auto max-w-[860px] px-gutter-mobile pb-space-3xl md:px-gutter-tablet lg:px-gutter-desktop" id="faq-pro">
        <div className="mb-space-2xl flex flex-col items-center text-center">
          <span className="mb-2 font-label-md text-label-md font-bold uppercase tracking-wider text-primary">{t("pro.faq.eyebrow")}</span>
          <h2 className="font-headline-lg text-headline-lg font-extrabold tracking-tight text-on-surface">{t("pro.faq.title")}</h2>
        </div>
        <div className="flex flex-col gap-space-sm" id="faq-container">
          {FAQ_IDS.map((n) => {
            const isOpen = open === n;
            return (
              <div
                key={n}
                className={cn(
                  "faq-item overflow-hidden rounded-2xl border border-border-subtle bg-surface-tier-1 shadow-sm transition-colors",
                  isOpen && "open",
                )}
              >
                <button
                  className="faq-btn flex w-full items-center justify-between px-space-lg py-space-lg text-left focus:outline-none"
                  type="button"
                  onClick={() => setOpen(isOpen ? 0 : n)}
                >
                  <span className="font-headline-sm text-headline-sm font-bold text-text-primary">{t(`pro.faq.q${n}`)}</span>
                  <MaterialIcon name="expand_more" className="faq-icon text-text-tertiary" />
                </button>
                <div className="faq-answer">
                  <div className="faq-answer-inner">
                    <div className="faq-content border-t border-border-subtle px-space-lg pb-space-lg pt-0 font-body-md text-text-secondary">
                      {t(`pro.faq.a${n}`)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div
          ref={finalCtaRef}
          id="acceso-profesional"
          className="theme-panel-download relative mt-space-2xl overflow-hidden rounded-[32px] border border-border-subtle p-space-xl shadow-2xl md:p-space-3xl"
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
          <div className="relative z-10 flex flex-col gap-space-xl lg:flex-row lg:items-center">
            <div className="flex flex-1 flex-col gap-space-md">
              <h2 className="theme-panel-text font-headline-lg text-headline-lg-mobile font-extrabold md:text-headline-lg">{t("pro.cta.title")}</h2>
              <p className="theme-panel-muted font-body-lg text-body-lg">{t("pro.cta.description")}</p>
            </div>
            <form className="flex w-full flex-1 flex-col gap-space-xs" onSubmit={handleSubmit} noValidate>
              <label htmlFor="pro-email" className="theme-panel-text font-label-md text-label-md font-bold">
                {t("pro.cta.emailLabel")}
              </label>
              <div className="flex w-full flex-col gap-space-sm sm:flex-row">
                <input
                  id="pro-email"
                  name="email"
                  required
                  type="email"
                  autoComplete="email"
                  placeholder={t("pro.cta.emailPlaceholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 rounded-full border border-outline-variant bg-surface-container-lowest px-5 py-4 text-on-surface placeholder:text-text-secondary focus:border-primary focus:outline-none"
                />
                <button
                  className="whitespace-nowrap rounded-full bg-primary px-space-xl py-4 font-label-lg font-bold text-on-primary transition-all hover:bg-[#3A2BA8]"
                  type="submit"
                >
                  {submitted ? t("pro.cta.submitted") : t("pro.cta.submit")}
                </button>
              </div>
              <p className="theme-panel-muted font-body-sm text-body-sm">{t("pro.cta.note")}</p>
              {submitted && (
                <p className="theme-panel-text font-body-md text-body-md font-bold" role="status">
                  {t("pro.cta.success")}
                </p>
              )}
            </form>
          </div>
          <p className="theme-panel-muted relative z-10 mt-4 font-body-md text-body-md">
            {t("pro.cta.altPrefix")}
            <a className="theme-panel-text font-bold underline" href="/profesionales/dashboard.html">
              {t("pro.cta.altLink")}
            </a>
          </p>
        </div>
      </section>

      <div
        className={cn(
          "fixed bottom-4 left-1/2 z-40 max-w-[calc(100vw-2rem)] -translate-x-1/2 items-center rounded-full border border-border-subtle bg-surface-container-lowest px-2 py-2 shadow-2xl",
          stickyVisible ? "flex" : "hidden",
        )}
      >
        <a href="#acceso-profesional" className="inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-primary px-5 py-3 font-label-lg font-bold text-on-primary hover:bg-[#3A2BA8]">
          {t("pro.stickyCta")}
        </a>
      </div>
    </>
  );
}
