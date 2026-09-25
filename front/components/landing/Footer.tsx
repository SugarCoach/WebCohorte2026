"use client";

import Image from "next/image";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { LOGO_SRC } from "@/lib/images";
import { useLanguage } from "@/lib/i18n";
import { GooglePlayIcon } from "../ui/GooglePlayIcon";

/** Footer, calcado 1:1 de index.html. */
export function Footer() {
  const { t } = useLanguage();
  // Anclas con prefijo "/" para que funcionen igual desde la home y desde
  // páginas propias como /profesionales.
  const product = [
    ["/#como-funciona", t("footer.how")],
    ["/#familias", t("footer.families")],
    ["/profesionales", t("footer.professionals")],
    ["/#gamificacion", t("footer.achievements")],
    ["/#tratamiento", t("footer.treatment")],
  ];
  const community = [
    ["/#quienes-somos", t("footer.whoWeAre")],
    ["/#reconocimientos", t("footer.awards")],
    ["/#testimonios", t("footer.testimonials")],
  ];
  const legal = [
    ["/#preguntas-frecuentes", t("footer.faq")],
    ["#", t("footer.privacy")],
    ["#", t("footer.terms")],
  ];
  return (
    <footer className="w-full border-t border-border-subtle bg-surface-container-lowest pb-space-xl pt-space-3xl">
      <div className="mx-auto max-w-[1200px] px-gutter-mobile md:px-gutter-tablet lg:px-gutter-desktop">
        <div className="grid grid-cols-1 gap-space-2xl pb-space-2xl md:grid-cols-2 lg:grid-cols-5">
          <div className="flex flex-col gap-space-md lg:col-span-2">
            <a className="flex items-center gap-2" href="/">
              <div className="w-fit rounded-xl border border-border-subtle bg-surface-container-high p-1.5">
                <Image
                  src={LOGO_SRC}
                  alt="SugarCoach Logo Oficial"
                  width={140}
                  height={40}
                  className="h-9 w-auto object-contain drop-shadow-[0_2px_8px_rgba(196,92,255,0.3)]"
                />
              </div>
            </a>
            <p className="max-w-sm font-body-md text-body-md text-text-secondary">{t("footer.description")}</p>
                        <div className="flex flex-wrap gap-space-sm pt-space-xs">
              <a className="inline-flex items-center gap-space-xs rounded-full border border-border-subtle bg-surface-container px-space-md py-space-xs text-text-primary transition-colors hover:bg-surface-container-high"
                href="#">
                <GooglePlayIcon className="h-6 w-6 flex-shrink-0" />
                <div className="flex flex-col text-left">
                  <span className="font-label-sm text-[10px] leading-tight text-text-secondary">{t("footer.available")}</span>
                  <span className="font-label-md text-label-md font-bold leading-tight text-text-primary">{t("footer.googlePlay")}</span>
                </div>
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-space-sm">
            <span className="font-label-lg text-label-lg font-bold tracking-tight text-text-primary">{t("footer.product")}</span>
            <nav className="flex flex-col gap-space-xs">
              {product.map(([href, label]) => (
                <a key={href} className="font-body-sm text-body-sm text-text-secondary transition-colors hover:text-primary" href={href}>
                  {label}
                </a>
              ))}
            </nav>
          </div>
          <div className="flex flex-col gap-space-sm">
            <span className="font-label-lg text-label-lg font-bold tracking-tight text-text-primary">{t("footer.community")}</span>
            <nav className="flex flex-col gap-space-xs">
              {community.map(([href, label]) => (
                <a key={href} className="font-body-sm text-body-sm text-text-secondary transition-colors hover:text-primary" href={href}>
                  {label}
                </a>
              ))}
            </nav>
          </div>
          <div className="flex flex-col gap-space-sm">
            <span className="font-label-lg text-label-lg font-bold tracking-tight text-text-primary">{t("footer.legal")}</span>
            <nav className="flex flex-col gap-space-xs">
              {legal.map(([href, label], i) => (
                <a key={i} className="font-body-sm text-body-sm text-text-secondary transition-colors hover:text-primary" href={href}>
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-space-md border-t border-border-subtle pt-space-lg md:flex-row">
          <div className="flex flex-col items-center gap-space-xs text-center sm:flex-row sm:gap-space-md sm:text-left">
            <p className="font-body-sm text-body-sm text-text-tertiary">{t("footer.rights")}</p>
            <span className="hidden text-outline-variant sm:inline">•</span>
            <p className="font-body-sm text-body-sm text-text-tertiary">{t("footer.tagline")}</p>
          </div>
          <div className="flex items-center gap-space-md">
            <a aria-label="Comunidad" className="flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle bg-surface-container text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-primary" href="#">
              <MaterialIcon name="forum" style={{ fontSize: 20 }} />
            </a>
            <a aria-label="Novedades" className="flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle bg-surface-container text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-primary" href="#">
              <MaterialIcon name="campaign" style={{ fontSize: 20 }} />
            </a>
            <a aria-label="Contacto" className="flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle bg-surface-container text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-primary" href="#">
              <MaterialIcon name="mail" style={{ fontSize: 20 }} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
