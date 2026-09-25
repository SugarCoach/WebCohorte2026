"use client";

import { useState, useRef, useMemo } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  Heart,
  Users,
  Stethoscope,
  Zap,
  Sparkles,
  ShieldCheck,
  Cloud,
  Bell,
  BarChart3,
  Activity,
  FileText,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { useLanguage } from "@/lib/i18n";

type AudienceId = "pacientes" | "familias" | "profesionales";

interface UseCase {
  title: string;
  desc: string;
  icon: LucideIcon;
}

interface AudiencePillar {
  id: AudienceId;
  name: string;
  roleSubtitle: string;
  badge: string;
  icon: LucideIcon;
  purposePrompt: string;
  purposeSummary: string;
  headline: string;
  description: string;
  accentColor: string;
  accentBorder: string;
  activeBorder: string;
  accentBg: string;
  iconBoxBg: string;
  glowGradient: string;
  useCases: UseCase[];
  metrics: string[];
  ctaLink: string;
  ctaLabel: string;
  previewImage: string;
  previewBadge: string;
}

function buildPillars(t: (key: string) => string): AudiencePillar[] {
  const purposePrompt = t("userTypes.purposePrompt");
  return [
    {
      id: "pacientes",
      name: t("userTypes.pacientes.name"),
      roleSubtitle: t("userTypes.pacientes.roleSubtitle"),
      badge: t("userTypes.pacientes.badge"),
      icon: Heart,
      purposePrompt,
      purposeSummary: t("userTypes.pacientes.purposeSummary"),
      headline: t("userTypes.pacientes.headline"),
      description: t("userTypes.pacientes.description"),
      accentColor: "text-[#9E1679] dark:text-[#DA44AF] [.a11y_&]:text-[#7100A5]",
      accentBorder: "border-[#DA44AF]/15 dark:border-[#DA44AF]/20",
      activeBorder: "border-[#DA44AF]/60 shadow-[0_0_24px_rgba(218,68,175,0.18)] dark:border-[#DA44AF]/70",
      accentBg: "bg-[#DA44AF]/10 dark:bg-[#DA44AF]/15",
      iconBoxBg: "bg-gradient-to-br from-[#DA44AF]/25 to-[#C747CA]/25 text-[#9E1679] dark:text-[#DA44AF] [.a11y_&]:text-[#7100A5]",
      glowGradient: "from-[#DA44AF]/10 via-[#DA44AF]/5 to-transparent",
      useCases: [
        {
          title: t("userTypes.pacientes.useCase1.title"),
          desc: t("userTypes.pacientes.useCase1.desc"),
          icon: Zap,
        },
        {
          title: t("userTypes.pacientes.useCase2.title"),
          desc: t("userTypes.pacientes.useCase2.desc"),
          icon: Sparkles,
        },
        {
          title: t("userTypes.pacientes.useCase3.title"),
          desc: t("userTypes.pacientes.useCase3.desc"),
          icon: ShieldCheck,
        },
      ],
      metrics: [
        t("userTypes.pacientes.metric1"),
        t("userTypes.pacientes.metric2"),
        t("userTypes.pacientes.metric3"),
      ],
      ctaLink: "#como-funciona",
      ctaLabel: t("userTypes.pacientes.ctaLabel"),
      previewImage: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
      previewBadge: t("userTypes.pacientes.previewBadge"),
    },
    {
      id: "familias",
      name: t("userTypes.familias.name"),
      roleSubtitle: t("userTypes.familias.roleSubtitle"),
      badge: t("userTypes.familias.badge"),
      icon: Users,
      purposePrompt,
      purposeSummary: t("userTypes.familias.purposeSummary"),
      headline: t("userTypes.familias.headline"),
      description: t("userTypes.familias.description"),
      accentColor: "text-[#006064] dark:text-[#2BC5C7] [.a11y_&]:text-[#004d40]",
      accentBorder: "border-[#2BC5C7]/15 dark:border-[#2BC5C7]/20",
      activeBorder: "border-[#2BC5C7]/60 shadow-[0_0_24px_rgba(43,197,199,0.18)] dark:border-[#2BC5C7]/70",
      accentBg: "bg-[#2BC5C7]/10 dark:bg-[#2BC5C7]/15",
      iconBoxBg: "bg-gradient-to-br from-[#2BC5C7]/25 to-teal-500/25 text-[#006064] dark:text-[#2BC5C7] [.a11y_&]:text-[#004d40]",
      glowGradient: "from-[#2BC5C7]/10 via-[#2BC5C7]/5 to-transparent",
      useCases: [
        {
          title: t("userTypes.familias.useCase1.title"),
          desc: t("userTypes.familias.useCase1.desc"),
          icon: Cloud,
        },
        {
          title: t("userTypes.familias.useCase2.title"),
          desc: t("userTypes.familias.useCase2.desc"),
          icon: Bell,
        },
        {
          title: t("userTypes.familias.useCase3.title"),
          desc: t("userTypes.familias.useCase3.desc"),
          icon: ShieldCheck,
        },
      ],
      metrics: [
        t("userTypes.familias.metric1"),
        t("userTypes.familias.metric2"),
        t("userTypes.familias.metric3"),
      ],
      ctaLink: "#descargar",
      ctaLabel: t("userTypes.familias.ctaLabel"),
      previewImage: "https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?auto=format&fit=crop&w=600&q=80",
      previewBadge: t("userTypes.familias.previewBadge"),
    },
    {
      id: "profesionales",
      name: t("userTypes.profesionales.name"),
      roleSubtitle: t("userTypes.profesionales.roleSubtitle"),
      badge: t("userTypes.profesionales.badge"),
      icon: Stethoscope,
      purposePrompt,
      purposeSummary: t("userTypes.profesionales.purposeSummary"),
      headline: t("userTypes.profesionales.headline"),
      description: t("userTypes.profesionales.description"),
      accentColor: "text-[#7100A5] dark:text-[#C45CFF] [.a11y_&]:text-[#2f1f9e]",
      accentBorder: "border-[#C45CFF]/15 dark:border-[#C45CFF]/20",
      activeBorder: "border-[#C45CFF]/60 shadow-[0_0_24px_rgba(196,92,255,0.18)] dark:border-[#C45CFF]/70",
      accentBg: "bg-[#C45CFF]/10 dark:bg-[#C45CFF]/15",
      iconBoxBg: "bg-gradient-to-br from-[#C45CFF]/25 to-indigo-500/25 text-[#7100A5] dark:text-[#C45CFF] [.a11y_&]:text-[#2f1f9e]",
      glowGradient: "from-[#C45CFF]/10 via-[#C45CFF]/5 to-transparent",
      useCases: [
        {
          title: t("userTypes.profesionales.useCase1.title"),
          desc: t("userTypes.profesionales.useCase1.desc"),
          icon: BarChart3,
        },
        {
          title: t("userTypes.profesionales.useCase2.title"),
          desc: t("userTypes.profesionales.useCase2.desc"),
          icon: Activity,
        },
        {
          title: t("userTypes.profesionales.useCase3.title"),
          desc: t("userTypes.profesionales.useCase3.desc"),
          icon: FileText,
        },
      ],
      metrics: [
        t("userTypes.profesionales.metric1"),
        t("userTypes.profesionales.metric2"),
        t("userTypes.profesionales.metric3"),
      ],
      ctaLink: "#tratamiento",
      ctaLabel: t("userTypes.profesionales.ctaLabel"),
      previewImage: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80",
      previewBadge: t("userTypes.profesionales.previewBadge"),
    },
  ];
}

const smoothPillarTransition = {
  duration: 0.65,
  ease: [0.22, 1, 0.36, 1], // Curva cúbica suave estilo Apple / sin tirones
};

export function UserTypesSection() {
  const { t } = useLanguage();
  const PILLARS = useMemo(() => buildPillars(t), [t]);
  const [activeId, setActiveId] = useState<AudienceId>("pacientes");
  const reduceMotion = useReducedMotion();
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handlePillarHover = (id: AudienceId) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveId(id);
    }, 70); // Pequeño margen para que el barrido del mouse sea intencional y calmo
  };

  const handlePillarLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
  };

  return (
    <section
      id="familias"
      className="relative w-full pb-20 pt-12 md:pt-16"
      aria-labelledby="user-types-heading"
    >
      {/* Light-mode tinted band that fades in and out (replaces bg-alt/40) */}
      <div
        aria-hidden
        className="section-tint-fade pointer-events-none absolute inset-0 -z-10 bg-alt/40 dark:hidden"
      />
      
      {/* Halos decorativos de fondo */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-1/3 h-96 w-96 rounded-full bg-[#DA44AF]/10 blur-[120px] dark:bg-[#DA44AF]/15"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-1/2 h-96 w-96 rounded-full bg-[#2BC5C7]/10 blur-[120px] dark:bg-[#2BC5C7]/15"
      />

      <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* Encabezado principal de la sección */}
        <Reveal className="mx-auto mb-12 flex max-w-2xl flex-col items-center text-center">
          <span className="mb-2.5 inline-flex items-center gap-1.5 rounded-full border border-line/15 bg-tint/[0.04] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-from dark:border-white/10 dark:text-[#C45CFF]">
            {t("userTypes.eyebrow")}
          </span>
          <h2 id="user-types-heading" className="text-3xl font-extrabold tracking-tight text-ink md:text-4xl">
            {t("userTypes.title")}
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-text-secondary sm:text-base">
            {t("userTypes.description")}
          </p>
        </Reveal>

        {/* Pilares cinéticos interactivos (Desktop: altura fija bloqueada para eliminar saltos de página / Mobile: acordeón) */}
        <div
          role="tablist"
          aria-label={t("userTypes.ariaProfiles")}
          className="flex flex-col gap-4 lg:h-[580px] lg:max-h-[580px] lg:flex-row lg:items-stretch"
        >
          {PILLARS.map((pillar) => {
            const isActive = activeId === pillar.id;
            const Icon = pillar.icon;

            return (
              <motion.div
                key={pillar.id}
                data-kinetic-pillar="true"
                layout={!reduceMotion}
                transition={smoothPillarTransition}
                onClick={() => {
                  if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
                  setActiveId(pillar.id);
                }}
                onMouseEnter={() => handlePillarHover(pillar.id)}
                onMouseLeave={handlePillarLeave}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveId(pillar.id);
                  }
                }}
                tabIndex={0}
                role="tab"
                id={`tab-pillar-${pillar.id}`}
                aria-selected={isActive}
                aria-controls={`panel-pillar-${pillar.id}`}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border bg-card p-6 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DA44AF] dark:bg-[#09122C] lg:h-full lg:max-h-[580px] min-h-0 ${
                  isActive
                    ? `lg:flex-[2.35] ${pillar.activeBorder}`
                    : `lg:flex-1 ${pillar.accentBorder} hover:border-ink/20 dark:hover:border-white/20 opacity-90 hover:opacity-100`
                }`}
              >
                {/* Halo interior suave en la tarjeta activa */}
                {isActive && (
                  <div
                    aria-hidden
                    className={`pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br ${pillar.glowGradient} blur-2xl`}
                  />
                )}

                {/* Contenido Superior / Identidad del Pilar */}
                <div className="relative z-10 flex flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${pillar.accentBg} ${pillar.accentColor} ${pillar.accentBorder}`}
                    >
                      {pillar.badge}
                    </span>
                    {/* Indicador visual de expansión en mobile */}
                    <div className="lg:hidden shrink-0 pt-0.5">
                      <ChevronDown
                        className={`h-5 w-5 text-muted transition-transform duration-300 ${
                          isActive ? "rotate-180 text-ink" : ""
                        }`}
                      />
                    </div>
                  </div>

                  <h3 className="mt-2 text-2xl xl:text-3xl font-black tracking-tight text-ink">
                    {pillar.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-muted dark:text-[#747F9B]">
                    {pillar.roleSubtitle}
                  </p>

                  {/* Bloque central: ¿Para qué la usás? */}
                  <div
                    className={`sc-hover-card overflow-hidden mt-3 rounded-2xl border p-3 transition-colors duration-200 ${
                      isActive
                        ? `${pillar.accentBg} ${pillar.accentBorder}`
                        : "bg-base/40 border-line/10 dark:bg-white/[0.02] dark:border-white/[0.06]"
                    }`}
                  >
                    <span className="block text-[10px] font-black uppercase tracking-wider text-muted dark:text-[#747F9B]">
                      {pillar.purposePrompt}
                    </span>
                    <p className="mt-0.5 text-xs sm:text-sm font-semibold text-ink leading-snug">
                      {pillar.purposeSummary}
                    </p>
                  </div>

                  {/* Detalle extendido cuando la tarjeta está activa */}
                  {isActive && (
                    <motion.div
                      key={`content-${pillar.id}`}
                      id={`panel-pillar-${pillar.id}`}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="mt-3 space-y-2.5"
                    >
                      <div>
                        <h4 className="text-sm font-bold text-ink leading-snug">
                          {pillar.headline}
                        </h4>
                        <p className="mt-0.5 text-xs leading-relaxed text-text-secondary line-clamp-2">
                          {pillar.description}
                        </p>
                      </div>

                      {/* Los 3 Casos de Uso Concretos en grilla de 3 columnas */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-0.5">
                        {pillar.useCases.map((uc, idx) => {
                          const UcIcon = uc.icon;
                          return (
                            <div
                              key={idx}
                              className="sc-hover-card overflow-hidden flex flex-col justify-between gap-1 rounded-xl border border-line/10 bg-base/70 p-2.5 transition-colors dark:border-white/[0.06] dark:bg-[#050C22]"
                            >
                              <div className="flex items-center gap-1.5">
                                <div
                                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md ${pillar.accentBg} ${pillar.accentColor}`}
                                >
                                  <UcIcon className="h-3 w-3" />
                                </div>
                                <h5 className="text-[11px] font-bold text-ink leading-tight line-clamp-1">
                                  {uc.title}
                                </h5>
                              </div>
                              <p className="text-[10.5px] leading-snug text-text-secondary line-clamp-2">
                                {uc.desc}
                              </p>
                            </div>
                          );
                        })}
                      </div>

                      {/* Badges de métricas / valor concreto */}
                      <div className="flex flex-wrap gap-1.5 pt-0.5">
                        {pillar.metrics.map((metric, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center rounded-lg border border-line/10 bg-base/80 px-2 py-0.5 text-[10px] font-bold text-ink dark:border-white/[0.08] dark:bg-[#0A1433]"
                          >
                            {metric}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Pie de la tarjeta: Imagen en reposo o Enlace CTA cuando está activa */}
                {!isActive ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.25 }}
                    className="relative mt-auto h-[270px] sm:h-[285px] w-[calc(100%+3rem)] -mx-6 -mb-6 shrink-0 overflow-hidden"
                  >
                    <Image
                      src={pillar.previewImage}
                      alt={`${t("userTypes.previewAlt")} ${pillar.name}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 420px"
                      className="object-cover object-top select-none transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Degradado inferior para contraste del texto */}
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none"
                    />

                    {/* Cartel "Ver detalles" superpuesto al pie de la imagen */}
                    <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4 text-white">
                      <div className="flex w-full items-center justify-between text-xs font-bold text-white/90">
                        <span className="drop-shadow-sm">{t("userTypes.viewDetails")}</span>
                        <ChevronRight className="h-4 w-4 text-white/80 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="relative z-10 mt-auto shrink-0 border-t border-line/10 pt-3.5 dark:border-white/[0.08]">
                    <a
                      href={pillar.ctaLink}
                      onClick={(e) => e.stopPropagation()}
                      className={`inline-flex items-center gap-2 text-xs sm:text-sm font-bold ${pillar.accentColor} transition-colors hover:underline`}
                    >
                      <span>{pillar.ctaLabel}</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
