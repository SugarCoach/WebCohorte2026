"use client";

import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";

import { ChevronLeft, ChevronRight, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n";

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  rating: number;
  quote: string;
}

function buildTestimonials(t: (key: string) => string): TestimonialItem[] {
  return [
    {
      id: "mariana-lopez",
      name: "Mariana López",
      role: t("testimonialsShowcase.mariana.role"),
      rating: 5,
      quote: t("testimonialsShowcase.mariana.quote"),
    },
    {
      id: "diego-fernandez",
      name: "Diego Fernández",
      role: t("testimonialsShowcase.diego.role"),
      rating: 5,
      quote: t("testimonialsShowcase.diego.quote"),
    },
    {
      id: "valentina-rojas",
      name: "Valentina Rojas",
      role: t("testimonialsShowcase.valentina.role"),
      rating: 5,
      quote: t("testimonialsShowcase.valentina.quote"),
    },
    {
      id: "sofia-acosta",
      name: "Sofía Acosta",
      role: t("testimonialsShowcase.sofia.role"),
      rating: 5,
      quote: t("testimonialsShowcase.sofia.quote"),
    },
    {
      id: "julian-mendez",
      name: "Julián Méndez",
      role: t("testimonialsShowcase.julian.role"),
      rating: 5,
      quote: t("testimonialsShowcase.julian.quote"),
    },
  ];
}

export function TestimonialsSection() {
  const { t } = useLanguage();

  const TESTIMONIALS = useMemo(() => buildTestimonials(t), [t]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [perView, setPerView] = useState(3);
  const [isPaused, setIsPaused] = useState(false);

  const touchStartX = useRef<number | null>(null);

  // Responsive items per view
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 640) {
        setPerView(1);
      } else if (width < 1024) {
        setPerView(2);
      } else {
        setPerView(3);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Keep active index valid when testimonials change
  useEffect(() => {
    setActiveIndex((prev) => Math.min(prev, TESTIMONIALS.length - 1));
  }, [TESTIMONIALS.length]);

  const totalCards = TESTIMONIALS.length;

  const maxTrackOffset = Math.max(0, totalCards - perView);

  // Keep the active card visible without moving it vertically
  const trackOffset = Math.min(
    Math.max(0, activeIndex - Math.floor(perView / 2)),
    maxTrackOffset,
  );

  const isAtStart = activeIndex === 0;
  const isAtEnd = activeIndex === totalCards - 1;

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => Math.min(totalCards - 1, prev + 1));
  }, [totalCards]);

  const handleDotClick = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const handleCardClick = useCallback((cardIndex: number) => {
    setActiveIndex(cardIndex);
  }, []);

  // Autoplay
  useEffect(() => {
    if (isPaused || totalCards <= 1) return;

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev >= totalCards - 1 ? 0 : prev + 1));
    }, 6000);

    return () => window.clearInterval(timer);
  }, [isPaused, totalCards]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;

    const deltaX = e.changedTouches[0].clientX - touchStartX.current;

    if (deltaX > 40) {
      handlePrev();
    } else if (deltaX < -40) {
      handleNext();
    }

    touchStartX.current = null;
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev();
    }

    if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNext();
    }
  };

  // Track translation
  const offsetPercentage = trackOffset * (100 / perView);

  return (
    <section
      id="testimonios"
      aria-labelledby="testimonials-heading"
      className="relative py-14 sm:py-18 lg:py-20"
    >
      {/* Ambient background lighting */}
      <div
        className="pointer-events-none absolute -top-28 -right-28 h-[450px] w-[450px] rounded-full bg-primary/10 blur-3xl dark:bg-[#FF3FB4]/15 [.a11y_&]:hidden"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -bottom-28 -left-28 h-[420px] w-[420px] rounded-full bg-brand/10 blur-3xl dark:bg-[#732995]/20 [.a11y_&]:hidden"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Reveal className="mx-auto mb-10 flex max-w-3xl flex-col items-center text-center">
          <Badge
            variant="brand"
            className="mb-3 text-xs uppercase tracking-wider"
          >
            {t("testimonialsShowcase.eyebrow")}
          </Badge>

          <h2
            id="testimonials-heading"
            className="text-3xl font-extrabold tracking-tight text-headings text-ink sm:text-4xl"
          >
            {t("testimonialsShowcase.titlePrefix")}{" "}
            <span className="bg-gradient-to-r from-[#C45CFF] to-[#FF3FB4] bg-clip-text text-transparent">
              {t("testimonialsShowcase.titleHighlight")}
            </span>
          </h2>

          <p className="section-subtitle mt-3 max-w-2xl text-base leading-relaxed text-body sm:text-lg">
            {t("testimonialsShowcase.description")}
          </p>
        </Reveal>

        {/* Carousel */}
        <Reveal delay={0.15}>
          <div
            tabIndex={0}
            role="region"
            aria-label={t("testimonialsShowcase.carouselAriaLabel")}
            onKeyDown={handleKeyDown}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                setIsPaused(false);
              }
            }}
            className="relative w-full min-w-0 outline-none"
          >
            <div className="flex w-full min-w-0 items-center gap-2 sm:gap-4 lg:gap-6">
              {/* Previous button */}
              <button
                type="button"
                onClick={handlePrev}
                disabled={isAtStart}
                aria-label={t("testimonialsShowcase.prevAriaLabel")}
                className={cn(
                  "group hidden shrink-0 items-center justify-center rounded-lg border-0 bg-transparent p-1 sm:flex",
                  "text-ink/75 transition-colors duration-200 dark:text-white/85",
                  isAtStart
                    ? "cursor-not-allowed opacity-25"
                    : "cursor-pointer hover:text-primary dark:hover:text-[#FF3FB4]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                  "[.a11y_&]:text-black",
                )}
              >
                <ChevronLeft className="h-10 w-10 stroke-[2] transition-transform duration-200 group-hover:-translate-x-0.5 lg:h-12 lg:w-12" />
              </button>

              {/* Viewport */}
              <div
                className="relative w-full min-w-0 overflow-hidden px-1 py-3"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                {/* Track */}
                <div
                  className="flex w-full min-w-0 transition-transform duration-500 ease-out"
                  style={{
                    transform: `translateX(-${offsetPercentage}%)`,
                  }}
                >
                  {TESTIMONIALS.map((item, index) => {
                    const isActive = index === activeIndex;

                    const isVisible =
                      index >= trackOffset && index < trackOffset + perView;

                    return (
                      <div
                        key={item.id}
                        className="min-w-0 shrink-0 px-2"
                        style={{
                          width: `${100 / perView}%`,
                        }}
                      >
                        <article
                          onClick={() => handleCardClick(index)}
                          style={{
                            border: "none",
                          }}
                          className={cn(
                            // Card structure
                            "sc-hover-card overflow-hidden",
                            "relative flex h-full min-h-[280px] flex-col justify-between",
                            "rounded-2xl p-5 sm:p-6",
                            "cursor-pointer select-none",

                            // No borders or outlines
                            "border-0 outline-none ring-0",

                            // Light theme
                            "bg-white",
                            "shadow-sm",
                            "hover:shadow-md",

                            // Dark theme
                            "dark:bg-gradient-to-b",
                            "dark:from-[#0D1535]/95",
                            "dark:to-[#080E25]/95",
                            "dark:shadow-[0_0_20px_rgba(255,63,180,0.08)]",

                            // Smooth transitions (incluye zoom via .sc-hover-card)
                            "transition-[box-shadow,opacity,transform] duration-300 ease-out",

                            // Active card
                            isActive
                              ? [
                                  "opacity-100",
                                  "shadow-md",
                                  "dark:shadow-[0_0_24px_rgba(255,63,180,0.18)]",
                                ].join(" ")
                              : isVisible
                                ? "opacity-85 hover:opacity-100"
                                : "pointer-events-none opacity-40",

                            // Accessibility
                            "[.a11y_&]:opacity-100",
                            "[.a11y_&]:border-0",
                            "[.a11y_&]:shadow-none",
                            "[.a11y_&]:bg-white",
                          )}
                        >
                          {/* Card header */}
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <h3 className="text-base font-extrabold leading-snug text-ink sm:text-lg">
                                {item.name}
                              </h3>

                              <span className="mt-0.5 block text-xs font-semibold tracking-wide text-muted">
                                {item.role}
                              </span>
                            </div>

                            {/* Rating */}
                            <div
                              className="flex shrink-0 items-center gap-1 pt-0.5"
                              aria-label={`${item.rating} ${t(
                                "testimonialsShowcase.ratingAriaLabel",
                              )}`}
                            >
                              {Array.from(
                                { length: item.rating },
                                (_, starIdx) => (
                                  <Star
                                    key={starIdx}
                                    className="h-3.5 w-3.5 fill-amber-400 text-amber-400 dark:fill-[#FF3FB4] dark:text-[#FF3FB4] sm:h-4 sm:w-4"
                                  />
                                ),
                              )}
                            </div>
                          </div>

                          {/* Quote */}
                          <p className="mt-4 text-sm leading-relaxed text-body dark:text-[#E5E8F5] sm:text-[15px]">
                            “{item.quote}”
                          </p>
                        </article>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Next button */}
              <button
                type="button"
                onClick={handleNext}
                disabled={isAtEnd}
                aria-label={t("testimonialsShowcase.nextAriaLabel")}
                className={cn(
                  "group hidden shrink-0 items-center justify-center rounded-lg border-0 bg-transparent p-1 sm:flex",
                  "text-ink/75 transition-colors duration-200 dark:text-white/85",
                  isAtEnd
                    ? "cursor-not-allowed opacity-25"
                    : "cursor-pointer hover:text-primary dark:hover:text-[#FF3FB4]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                  "[.a11y_&]:text-black",
                )}
              >
                <ChevronRight className="h-10 w-10 stroke-[2] transition-transform duration-200 group-hover:translate-x-0.5 lg:h-12 lg:w-12" />
              </button>
            </div>

            {/* Mobile controls */}
            <div className="mt-5 flex items-center justify-between px-3 sm:hidden">
              <button
                type="button"
                onClick={handlePrev}
                disabled={isAtStart}
                aria-label={t("testimonialsShowcase.prevAriaLabel")}
                className={cn(
                  "flex items-center justify-center border-0 bg-transparent p-1 text-ink transition-colors dark:text-white",
                  isAtStart
                    ? "cursor-not-allowed opacity-25"
                    : "cursor-pointer hover:text-primary dark:hover:text-[#FF3FB4]",
                  "[.a11y_&]:text-black",
                )}
              >
                <ChevronLeft className="h-9 w-9 stroke-[2.2]" />
              </button>

              {/* Mobile dots */}
              <div className="flex items-center gap-2">
                {TESTIMONIALS.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    type="button"
                    onClick={() => handleDotClick(dotIdx)}
                    aria-label={`${t(
                      "testimonialsShowcase.dotAriaLabelPrefix",
                    )} ${dotIdx + 1}`}
                    className={cn(
                      "h-2.5 rounded-full border-0 transition-all duration-300",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                      dotIdx === activeIndex
                        ? "w-7 bg-gradient-to-r from-[#C45CFF] to-[#FF3FB4] shadow-[0_0_10px_rgba(255,63,180,0.3)]"
                        : "w-2.5 bg-line/25 dark:bg-white/20 hover:bg-line/45 dark:hover:bg-white/40",
                    )}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={handleNext}
                disabled={isAtEnd}
                aria-label={t("testimonialsShowcase.nextAriaLabel")}
                className={cn(
                  "flex items-center justify-center border-0 bg-transparent p-1 text-ink transition-colors dark:text-white",
                  isAtEnd
                    ? "cursor-not-allowed opacity-25"
                    : "cursor-pointer hover:text-primary dark:hover:text-[#FF3FB4]",
                  "[.a11y_&]:text-black",
                )}
              >
                <ChevronRight className="h-9 w-9 stroke-[2.2]" />
              </button>
            </div>

            {/* Desktop pagination */}
            <div
              className="mt-6 hidden items-center justify-center gap-2.5 sm:flex"
              aria-label={t("testimonialsShowcase.paginationAriaLabel")}
            >
              {TESTIMONIALS.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => handleDotClick(dotIdx)}
                  aria-label={`${t(
                    "testimonialsShowcase.dotOfAriaLabelPrefix",
                  )} ${TESTIMONIALS[dotIdx].name}`}
                  className={cn(
                    "h-2.5 rounded-full border-0 transition-all duration-300",
                    "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                    dotIdx === activeIndex
                      ? "w-8 bg-gradient-to-r from-[#C45CFF] to-[#FF3FB4] shadow-[0_0_12px_rgba(255,63,180,0.3)]"
                      : "w-2.5 bg-line/25 dark:bg-white/20 hover:bg-line/45 dark:hover:bg-white/40",
                  )}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
