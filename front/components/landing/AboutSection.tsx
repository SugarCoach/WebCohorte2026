"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/badge";
import { mockTeam } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n";

const TEAM_I18N_KEY: Record<string, string> = {
  "isabel-berizzo": "isabel",
  "veronica-avendano": "veronica",
  "debora-biain": "debora",
  "agustina-olivo": "agustina",
  "karin-chmiel": "karin",
};

export function AboutSection() {
  const { t } = useLanguage();
  const [teamIndex, setTeamIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const total = mockTeam.length;

  const nextTeam = useCallback(() => {
    setTeamIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevTeam = useCallback(() => {
    setTeamIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto-play timer (cycles gently only when not hovered/interacting)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextTeam();
    }, 5200);
    return () => clearInterval(timer);
  }, [isPaused, nextTeam]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX > 40) {
      prevTeam();
    } else if (deltaX < -40) {
      nextTeam();
    }
    touchStartX.current = null;
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prevTeam();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      nextTeam();
    }
  };

  // Determine card deck positioning class
  const getCardClass = (i: number) => {
    const forward = (i - teamIndex + total) % total;
    const backward = (teamIndex - i + total) % total;

    if (forward === 0) return "sc-team-active";
    if (forward <= 2) return `sc-team-next-${forward}`;
    if (backward <= 2) return `sc-team-prev-${backward}`;
    if (forward <= 4) return `sc-team-next-${forward}`;
    return `sc-team-prev-${Math.min(4, backward)}`;
  };

  return (
    <section
      id="quienes-somos"
      aria-labelledby="about-heading"
      className="relative py-16 sm:py-20 lg:py-24"
    >
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute -top-28 -right-28 h-[460px] w-[460px] rounded-full bg-[#FF3FB4]/12 blur-3xl dark:bg-[#FF3FB4]/18 [.a11y_&]:hidden"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-28 -left-28 h-[420px] w-[420px] rounded-full bg-primary/12 blur-3xl dark:bg-[#512CFF]/15 [.a11y_&]:hidden"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <Reveal className="mx-auto mb-10 flex max-w-3xl flex-col items-center text-center">
          <Badge variant="brand" className="mb-3 uppercase tracking-wider text-xs">
            {t("teamShowcase.eyebrow")}
          </Badge>
          <h2
            id="about-heading"
            className="text-3xl font-extrabold tracking-tight sm:text-4xl text-headings text-ink"
          >
            {t("teamShowcase.title")}
          </h2>
          <p className="section-subtitle mt-3 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
            {t("teamShowcase.description")}
          </p>
        </Reveal>

        {/* 3D Fan Carousel Deck — Without repetitive arrow buttons */}
        <Reveal delay={0.15}>
          <div
            tabIndex={0}
            role="region"
            aria-label={t("teamShowcase.carouselAriaLabel")}
            onKeyDown={handleKeyDown}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
            className="relative outline-none select-none"
          >
            <div
              className="sc-team-viewport"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div className="sc-team-track">
                {mockTeam.map((member, i) => {
                  const stateClass = getCardClass(i);
                  const isActive = stateClass === "sc-team-active";
                  const i18nKey = TEAM_I18N_KEY[member.id];
                  const area = i18nKey ? t(`teamShowcase.${i18nKey}.area`) : member.area || member.role;
                  const roleLine = member.role === member.area ? area : member.role;
                  const bio = i18nKey ? t(`teamShowcase.${i18nKey}.bio`) : member.bio;
                  const tags = i18nKey
                    ? [t(`teamShowcase.${i18nKey}.tag1`), t(`teamShowcase.${i18nKey}.tag2`)]
                    : member.tags ?? [];

                  return (
                    <article
                      key={member.id}
                      onClick={() => setTeamIndex(i)}
                      className={cn(
                        "sc-team-card cursor-pointer",
                        stateClass,
                        isActive && "ring-1 ring-[#FF3FB4]/30 dark:ring-[#FF3FB4]/50"
                      )}
                      aria-current={isActive ? "true" : "false"}
                    >
                      {/* Photo Container with circular framing */}
                      <div className="relative mx-auto h-40 w-40 sm:h-44 sm:w-44 shrink-0 overflow-hidden rounded-full border-4 border-card dark:border-[#09122C] shadow-md ring-2 ring-primary/30 dark:ring-[#FF3FB4]/45 bg-[#E9E5EF] dark:bg-[#121A3B] mb-3">
                        <Image
                          src={member.photo}
                          alt={member.name}
                          fill
                          sizes="(max-width: 768px) 160px, 176px"
                          priority={i === 0}
                          className="object-cover object-top transition-transform duration-500 hover:scale-105"
                        />
                      </div>

                      {/* Header info */}
                      <div className="text-center">
                        <span className="text-xs font-bold uppercase tracking-wider text-primary dark:text-[#FF3FB4] block">
                          {area}
                        </span>

                        <h3 className="mt-1 text-2xl font-black text-ink tracking-tight">
                          {member.name}
                        </h3>

                        <strong className="text-xs font-semibold text-muted block mt-0.5">
                          {roleLine}
                        </strong>
                      </div>

                      {/* Bio */}
                      <p className="mt-2.5 text-xs sm:text-[13px] leading-relaxed text-body dark:text-[#CBD5E1] line-clamp-4 flex-1 text-center">
                        {bio}
                      </p>

                      {/* Tags */}
                      <div className="mt-3.5 flex flex-wrap justify-center gap-1.5 pt-1">
                        {tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-line/20 dark:border-white/10 bg-tint/[0.04] dark:bg-white/[0.06] px-2.5 py-1 text-[11px] font-semibold text-body dark:text-[#E2E8F0]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            {/* Interactive Dots Navigation */}
            <div
              className="mt-8 flex items-center justify-center gap-2.5"
              aria-label={t("teamShowcase.dotsAriaLabel")}
            >
              {mockTeam.map((member, i) => (
                <button
                  key={member.id}
                  type="button"
                  onClick={() => setTeamIndex(i)}
                  aria-label={`${t("teamShowcase.viewMemberPrefix")} ${member.name}`}
                  aria-current={i === teamIndex ? "true" : "false"}
                  className={cn(
                    "h-2.5 rounded-full transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                    i === teamIndex
                      ? "w-8 bg-gradient-to-r from-[#C45CFF] to-[#FF3FB4] shadow-[0_0_12px_rgba(255,63,180,0.5)]"
                      : "w-2.5 bg-line/25 dark:bg-white/20 hover:bg-line/45 dark:hover:bg-white/40"
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
