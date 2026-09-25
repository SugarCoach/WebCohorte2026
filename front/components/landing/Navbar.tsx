"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Crown } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { LOGO_SRC } from "@/lib/images";
import { useLanguage } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/** Header + menú móvil deslizante, calcado 1:1 de index.html. */
export function Navbar() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Anclas con prefijo "/" para que funcionen igual desde la home y desde
  // páginas propias como /profesionales (calcado del patrón de
  // profesionales.html, que usaba `index.html#ancla` fuera de la home).
  const NAV_LINKS = [
    { href: "/#como-funciona", label: t("nav.comoFunciona") },
    { href: "/#familias", label: t("nav.familias") },
    { href: "/#doctor-preview", label: t("nav.profesionales") },
    { href: "/#preguntas-frecuentes", label: t("nav.faq") },
  ];

  return (
    <>
      <header className="fixed left-0 top-0 z-50 w-full border-b border-border-subtle bg-bg-deep/85 shadow-[0_10px_35px_-10px_rgba(0,0,0,0.6)] backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-[1200px] items-center justify-between gap-space-md px-gutter-mobile md:px-gutter-tablet lg:px-gutter-desktop">
          <a className="group flex shrink-0 items-center gap-2" href="/">
            <Image
              src={LOGO_SRC}
              alt="SugarCoach Logo Oficial"
              width={140}
              height={40}
              priority
              className="h-8 w-auto object-contain drop-shadow-[0_2px_8px_rgba(196,92,255,0.3)] transition-transform group-hover:scale-105 md:h-9"
            />
          </a>
          <nav className="hidden items-center justify-center gap-space-md lg:flex xl:gap-space-lg">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                className={cn(
                  "nav-link inline-block whitespace-nowrap font-label-lg text-label-lg text-text-secondary transition-colors hover:text-primary",
                  pathname === l.href && "nav-link-active",
                )}
                href={l.href}
                aria-current={pathname === l.href ? "page" : undefined}
              >
                {l.label}
              </a>
            ))}
            <a
              className="inline-flex flex-row items-center gap-1.5 whitespace-nowrap rounded-full bg-amber-400/20 px-3.5 py-1.5 text-sm font-bold text-amber-800 transition-all hover:scale-105 hover:bg-amber-400/35 dark:bg-amber-400/15 dark:text-amber-300 dark:hover:bg-amber-400/25"
              href="/premium"
            >
              <Crown className="inline-block h-4 w-4 shrink-0 fill-amber-500 text-amber-600 dark:fill-amber-300 dark:text-amber-300" />
              <span>{t("nav.premium")}</span>
            </a>
          </nav>
          <div className="flex shrink-0 items-center justify-end gap-space-sm md:gap-space-md lg:min-w-[370px]">
            <LanguageToggle />
            <ThemeToggle />
            <a
              className="hidden min-h-[44px] min-w-[160px] items-center justify-center gap-2 whitespace-nowrap rounded-full btn-gradient border border-white/20 px-3.5 py-space-xs font-label-lg text-label-lg text-white transition-all active:scale-95 sm:inline-flex sm:px-space-lg"
              href="/#descargar"
            >
              <MaterialIcon name="download" className="text-[18px]" />
              <span>{t("btn.shortDownload")}</span>
            </a>
            <a
              className="nav-link hidden min-w-[105px] items-center justify-center whitespace-nowrap text-center font-label-lg text-label-lg text-text-secondary transition-colors hover:text-primary lg:inline-flex"
              href="/login"
            >
              {t("nav.login")}
            </a>
            <button
              aria-expanded={mobileOpen}
              aria-controls="mobileMenu"
              aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
              className="theme-toggle lg:hidden"
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
            >
              <MaterialIcon name={mobileOpen ? "close" : "menu"} style={{ fontSize: 22 }} />
            </button>
          </div>
        </div>
      </header>

      {/* Backdrop + panel lateral deslizante (fiel a `#mobileMenuBackdrop`/`#mobileMenu`) */}
      <div
        onClick={() => setMobileOpen(false)}
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden="true"
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        className={`fixed right-0 top-0 z-50 h-full w-[85%] max-w-sm overflow-y-auto border-l border-border-subtle bg-bg-deep shadow-2xl transition-transform duration-300 lg:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          id="mobileMenuCloseBtn"
          aria-label="Cerrar menú"
          className="theme-toggle !absolute right-4 top-4 z-10"
          type="button"
          onClick={() => setMobileOpen(false)}
        >
          <MaterialIcon name="close" style={{ fontSize: 22 }} />
        </button>
        <nav className="flex flex-col gap-1 px-gutter-mobile pb-space-lg pt-20">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-xl px-3 py-3 font-label-lg text-text-secondary transition-all hover:bg-surface-container hover:text-primary"
              href={l.href}
            >
              {l.label}
            </a>
          ))}
          <a
            onClick={() => setMobileOpen(false)}
            className="mt-1 flex flex-row items-center justify-center gap-2 rounded-xl bg-amber-400/20 px-3 py-3 font-label-lg font-bold text-amber-800 transition-colors hover:bg-amber-400/30 dark:bg-amber-400/15 dark:text-amber-300 dark:hover:bg-amber-400/25"
            href="/premium"
          >
            <Crown className="inline-block h-[18px] w-[18px] shrink-0 fill-amber-500 text-amber-600 dark:fill-amber-300 dark:text-amber-300" />
            <span>{t("nav.premium")}</span>
          </a>
          <div className="mt-4 flex flex-col gap-3">
            <a
              onClick={() => setMobileOpen(false)}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full btn-gradient border border-white/20 px-space-lg py-space-sm font-label-lg text-label-lg text-white"
              href="/#descargar"
            >
              <MaterialIcon name="download" className="text-[18px]" />
              <span>{t("btn.shortDownload")}</span>
            </a>
            <a
              onClick={() => setMobileOpen(false)}
              className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-outline-variant px-space-lg py-space-sm font-label-lg text-label-lg text-on-surface transition-colors hover:bg-surface-container"
              href="/login"
            >
              {t("nav.login")}
            </a>
          </div>
        </nav>
      </aside>
    </>
  );
}

