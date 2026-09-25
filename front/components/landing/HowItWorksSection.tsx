"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { PHONES } from "@/lib/images";
import { useLanguage } from "@/lib/i18n";
import { Check, ChevronRight, Sparkles, Zap, Utensils, Clock, Target, FileText, BarChart3, type LucideIcon } from "lucide-react";

interface FloatingChip {
  label: string;
  icon: LucideIcon;
}

interface StepItem {
  id: string;
  n: string;
  tag: string;
  title: string;
  headline: string;
  desc: string;
  image: string;
  alt: string;
  accentBg: string;
  activeBorder: string;
  glow: string;
  accentColor: string;
  barColor: string;
  chips: {
    topRight: FloatingChip;
    bottomLeft: FloatingChip;
  };
  features: string[];
}

function buildSteps(t: (key: string) => string): StepItem[] {
  return [
    {
      id: "step-1",
      n: "01",
      tag: t("howShowcase.step1.tag"),
      title: t("howShowcase.step1.title"),
      headline: t("howShowcase.step1.headline"),
      desc: t("howShowcase.step1.desc"),
      image: PHONES.registro,
      alt: t("howShowcase.step1.alt"),
      accentBg: "bg-[#C45CFF]/15 text-[#7100A5] dark:text-[#C45CFF] border-[#C45CFF]/30",
      activeBorder: "border-[#C45CFF]/60 shadow-[0_0_24px_rgba(196,92,255,0.18)] dark:border-[#C45CFF]/70",
      glow: "from-[#C45CFF]/20 via-[#DA44AF]/10 to-transparent",
      accentColor: "text-[#7100A5] dark:text-[#C45CFF]",
      barColor: "bg-gradient-to-r from-[#C45CFF] to-[#DA44AF]",
      chips: {
        topRight: {
          label: t("howShowcase.step1.chipTopRight"),
          icon: Zap,
        },
        bottomLeft: {
          label: t("howShowcase.step1.chipBottomLeft"),
          icon: Utensils,
        },
      },
      features: [
        t("howShowcase.step1.feature1"),
        t("howShowcase.step1.feature2"),
        t("howShowcase.step1.feature3"),
      ],
    },
    {
      id: "step-2",
      n: "02",
      tag: t("howShowcase.step2.tag"),
      title: t("howShowcase.step2.title"),
      headline: t("howShowcase.step2.headline"),
      desc: t("howShowcase.step2.desc"),
      image: PHONES.dailyLog,
      alt: t("howShowcase.step2.alt"),
      accentBg: "bg-[#2BC5C7]/15 text-[#006064] dark:text-[#2BC5C7] border-[#2BC5C7]/30",
      activeBorder: "border-[#2BC5C7]/60 shadow-[0_0_24px_rgba(43,197,199,0.18)] dark:border-[#2BC5C7]/70",
      glow: "from-[#2BC5C7]/20 via-teal-500/10 to-transparent",
      accentColor: "text-[#006064] dark:text-[#2BC5C7]",
      barColor: "bg-gradient-to-r from-[#2BC5C7] to-teal-400",
      chips: {
        topRight: {
          label: t("howShowcase.step2.chipTopRight"),
          icon: Clock,
        },
        bottomLeft: {
          label: t("howShowcase.step2.chipBottomLeft"),
          icon: Target,
        },
      },
      features: [
        t("howShowcase.step2.feature1"),
        t("howShowcase.step2.feature2"),
        t("howShowcase.step2.feature3"),
      ],
    },
    {
      id: "step-3",
      n: "03",
      tag: t("howShowcase.step3.tag"),
      title: t("howShowcase.step3.title"),
      headline: t("howShowcase.step3.headline"),
      desc: t("howShowcase.step3.desc"),
      image: PHONES.treatmentSteps,
      alt: t("howShowcase.step3.alt"),
      accentBg: "bg-[#FF3FB4]/15 text-[#9E1679] dark:text-[#FF3FB4] border-[#FF3FB4]/30",
      activeBorder: "border-[#FF3FB4]/60 shadow-[0_0_24px_rgba(255,63,180,0.18)] dark:border-[#FF3FB4]/70",
      glow: "from-[#FF3FB4]/20 via-[#DA44AF]/10 to-transparent",
      accentColor: "text-[#9E1679] dark:text-[#FF3FB4]",
      barColor: "bg-gradient-to-r from-[#FF3FB4] to-pink-400",
      chips: {
        topRight: {
          label: t("howShowcase.step3.chipTopRight"),
          icon: FileText,
        },
        bottomLeft: {
          label: t("howShowcase.step3.chipBottomLeft"),
          icon: BarChart3,
        },
      },
      features: [
        t("howShowcase.step3.feature1"),
        t("howShowcase.step3.feature2"),
        t("howShowcase.step3.feature3"),
      ],
    },
  ];
}

const AUTO_ROTATE_INTERVAL = 6000;

export function HowItWorksSection() {
  const { t } = useLanguage();
  const STEPS = useMemo(() => buildSteps(t), [t]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const activeStep = STEPS[activeIdx];

  // Auto-rotación sutil estilo showcase
  useEffect(() => {
    if (isPaused || reduceMotion) return;

    timerRef.current = setTimeout(() => {
      setActiveIdx((prev) => (prev + 1) % STEPS.length);
    }, AUTO_ROTATE_INTERVAL);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeIdx, isPaused, reduceMotion]);

  const handleSelectStep = (idx: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setActiveIdx(idx);
    setIsPaused(true);
  };

  return (
    <section
      id="como-funciona"
      className="relative mx-auto max-w-[1440px] px-4 py-20 sm:px-6 lg:px-8"
      aria-labelledby="how-it-works-title"
    >
      {/* Encabezado */}
      <Reveal className="mx-auto mb-12 flex max-w-2xl flex-col items-center text-center">
        <span className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-[#006064]/20 bg-[#006064]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#006064] dark:border-[#2BC5C7]/30 dark:bg-[#2BC5C7]/15 dark:text-[#2BC5C7]">
          <Sparkles className="h-3.5 w-3.5" />
          {t("howShowcase.eyebrowBadge")}
        </span>
        <h2 id="how-it-works-title" className="text-3xl font-extrabold tracking-tight text-ink md:text-4xl">
          {t("howShowcase.title")}
        </h2>
        <p className="mt-3 max-w-xl text-sm sm:text-base leading-relaxed text-text-secondary">
          {t("howShowcase.description")}
        </p>
      </Reveal>

      {/* Selector rápido móvil */}
      <div className="mb-8 flex lg:hidden items-center justify-center gap-2" role="tablist">
        {STEPS.map((s, idx) => {
          const isActive = idx === activeIdx;
          return (
            <button
              key={s.id}
              role="tab"
              aria-selected={isActive}
              aria-label={`${t("howShowcase.stepWord")} ${s.n}: ${s.title}`}
              onClick={() => handleSelectStep(idx)}
              className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
                isActive
                  ? `${s.accentBg} shadow-sm ring-1 ring-black/10 dark:ring-white/15`
                  : "bg-base/60 text-muted hover:text-ink border border-line/10 dark:bg-white/[0.04]"
              }`}
            >
              <span>{s.n}</span>
              <span className="hidden sm:inline">{s.tag}</span>
            </button>
          );
        })}
      </div>

      {/* Grid Showcase Desktop */}
      <div
        className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Columna Izquierda: Stepper interactivo */}
        <div className="flex flex-col gap-3.5 lg:col-span-7 xl:col-span-7" role="tablist" aria-orientation="vertical">
          {STEPS.map((s, idx) => {
            const isActive = idx === activeIdx;

            return (
              <div
                key={s.id}
                role="tab"
                tabIndex={0}
                aria-selected={isActive}
                id={`tab-${s.id}`}
                aria-controls={`panel-${s.id}`}
                onClick={() => handleSelectStep(idx)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleSelectStep(idx);
                  }
                }}
                className={`sc-hover-card group relative cursor-pointer overflow-hidden rounded-3xl border p-5 sm:p-6 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DA44AF] sc-card-glass ${
                  isActive
                    ? s.activeBorder
                    : "border-line/10 hover:border-line/25 opacity-80 hover:opacity-100"
                }`}
              >
                {/* Halo decorativo sutil en la tarjeta activa */}
                {isActive && (
                  <div
                    aria-hidden
                    className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br ${s.glow} blur-2xl`}
                  />
                )}

                {/* Cabecera del paso */}
                <div className="relative z-10 flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-black transition-colors ${
                        isActive
                          ? s.accentBg
                          : "border-line/15 bg-base text-muted dark:border-white/10 dark:text-[#747F9B]"
                      }`}
                    >
                      {s.n}
                    </span>
                    <div>
                      <span className={`block text-[11px] font-black uppercase tracking-wider ${s.accentColor}`}>
                        {s.tag}
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold tracking-tight text-ink leading-snug">
                        {s.title}
                      </h3>
                    </div>
                  </div>

                  <ChevronRight
                    className={`h-5 w-5 shrink-0 transition-transform duration-300 ${
                      isActive ? `rotate-90 ${s.accentColor}` : "text-muted group-hover:translate-x-0.5"
                    }`}
                  />
                </div>

                {/* Contenido expandible del paso activo */}
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      id={`panel-${s.id}`}
                      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                      animate={reduceMotion ? { opacity: 1 } : { opacity: 1, height: "auto" }}
                      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="relative z-10 mt-3.5 space-y-3 overflow-hidden border-t border-line/10 pt-3 dark:border-white/[0.06]"
                    >
                      <p className="text-xs sm:text-sm font-semibold text-ink leading-relaxed">
                        {s.headline}
                      </p>
                      <p className="text-xs sm:text-sm leading-relaxed text-text-secondary">
                        {s.desc}
                      </p>

                      {/* Lista de características clave */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        {s.features.map((feat, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs font-medium text-ink/90 dark:text-[#CAD3E8]">
                            <div className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${s.accentBg}`}>
                              <Check className="h-2.5 w-2.5" />
                            </div>
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>

                      {/* Barra de progreso de auto-play cuando no está en pausa */}
                      {!isPaused && !reduceMotion && (
                        <div className="relative mt-2 h-1 w-full overflow-hidden rounded-full bg-base dark:bg-white/5">
                          <motion.div
                            key={`progress-${idx}`}
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: AUTO_ROTATE_INTERVAL / 1000, ease: "linear" }}
                            className={`h-full ${s.barColor}`}
                          />
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Columna Derecha: Mockup del celular en gran formato */}
        <div className="relative flex justify-center lg:col-span-5 xl:col-span-5">
          {/* Halo ambiental dinámico detrás del dispositivo */}
          <div
            aria-hidden
            className={`pointer-events-none absolute -inset-8 rounded-full bg-gradient-to-tr ${activeStep.glow} blur-3xl opacity-70 transition-all duration-700`}
          />

          {/* Chip flotante superior */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`chip-tr-${activeStep.id}`}
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="absolute -right-2 sm:-right-6 top-8 z-30 hidden sm:flex items-center gap-2.5 rounded-2xl border border-line/15 bg-card/95 px-3.5 py-2 shadow-2xl backdrop-blur-md dark:border-white/10 dark:bg-[#0E1A38]/95"
            >
              <div
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border ${activeStep.accentBg}`}
              >
                <activeStep.chips.topRight.icon className="h-3.5 w-3.5" />
              </div>
              <span className="text-xs font-bold text-ink drop-shadow-sm">
                {activeStep.chips.topRight.label}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Chip flotante inferior */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`chip-bl-${activeStep.id}`}
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="absolute -left-2 sm:-left-6 bottom-12 z-30 hidden sm:flex items-center gap-2.5 rounded-2xl border border-line/15 bg-card/95 px-3.5 py-2 shadow-2xl backdrop-blur-md dark:border-white/10 dark:bg-[#0E1A38]/95"
            >
              <div
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border ${activeStep.accentBg}`}
              >
                <activeStep.chips.bottomLeft.icon className="h-3.5 w-3.5" />
              </div>
              <span className="text-xs font-bold text-ink drop-shadow-sm">
                {activeStep.chips.bottomLeft.label}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Chasis de celular premium en alta resolución */}
          <div className="relative z-20 w-[270px] sm:w-[310px] rounded-[46px] border-[6px] sm:border-[8px] border-slate-800/80 bg-slate-950 p-2 sm:p-2.5 shadow-2xl ring-1 ring-black/20 dark:border-slate-800 dark:ring-white/10">
            {/* Altavoz y notch frontal estilizado */}
            <div className="relative mb-2 flex items-center justify-center">
              <div className="h-3.5 w-24 sm:w-28 rounded-full bg-slate-900 shadow-inner" />
            </div>

            {/* Pantalla del dispositivo con transición animada */}
            <div className="relative aspect-[9/18.5] w-full overflow-hidden rounded-[34px] bg-black">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="relative h-full w-full"
                >
                  <Image
                    src={activeStep.image}
                    alt={activeStep.alt}
                    fill
                    sizes="(max-width: 640px) 270px, 310px"
                    priority={activeIdx === 0}
                    className="h-full w-full object-cover object-top select-none"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
