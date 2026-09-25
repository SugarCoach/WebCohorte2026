"use client";

import React from "react";
import Image from "next/image";

import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/i18n";

export interface AwardItem {
  id: string;
  name: string;
  imageSrc: string;
}

export const AWARDS: AwardItem[] = [
  {
    id: "endeavor",
    name: "Endeavor",
    imageSrc: "/images/marcas/endeavor.png",
  },
  {
    id: "aws",
    name: "AWS",
    imageSrc: "/images/marcas/AWS.png",
  },
  {
    id: "hit-cowork",
    name: "HIT Cowork",
    imageSrc: "/images/marcas/hit_cowork.png",
  },
  {
    id: "wise",
    name: "WISE",
    imageSrc: "/images/marcas/wiseNew.png",
  },
  {
    id: "bid",
    name: "BID",
    imageSrc: "/images/marcas/bid.png",
  },
  {
    id: "naves",
    name: "Naves IAE",
    imageSrc: "/images/marcas/NAVES.png",
  },
  {
    id: "google-startups",
    name: "Google for Startups",
    imageSrc: "/images/marcas/googleforstartups.png",
  },
  {
    id: "huawei",
    name: "Huawei",
    imageSrc: "/images/marcas/huawei.png",
  },
  {
    id: "samsung",
    name: "Samsung",
    imageSrc: "/images/marcas/samsung.png",
  },
  {
    id: "globant",
    name: "Globant",
    imageSrc: "/images/marcas/globant.png",
  },
  {
    id: "ewc",
    name: "Entrepreneurship World Cup",
    imageSrc: "/images/marcas/entrepreneurship.png",
  },
];

// Duplicate items for an uninterrupted marquee loop.
const MARQUEE_ITEMS = [...AWARDS, ...AWARDS];

export function AwardsSection() {
  const { t } = useLanguage();

  return (
    <section
      id="premios"
      aria-labelledby="awards-heading"
      className="sc-awards-section relative py-12 sm:py-16 lg:py-20"
    >
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute -top-24 -left-24 h-[440px] w-[440px] rounded-full bg-[#C45CFF]/10 blur-3xl dark:bg-[#C45CFF]/12 [.a11y_&]:hidden"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -bottom-24 -right-24 h-[420px] w-[420px] rounded-full bg-[#FF3FB4]/10 blur-3xl dark:bg-[#FF3FB4]/12 [.a11y_&]:hidden"
        aria-hidden="true"
      />

      {/* Main container */}
      <div className="relative z-10 mx-auto w-full max-w-[1480px] px-3 sm:px-6 lg:px-8 2xl:max-w-[1600px]">
        <div
          className="
            sc-awards-shell
            relative w-full overflow-hidden
            rounded-[28px]
            border-0 dark:border dark:border-white/10
            pt-6 pb-6 shadow-sm
            sm:pt-8 sm:pb-8
            lg:pt-10 lg:pb-10
          "
        >
          {/* Section Header */}
          <Reveal className="mx-auto max-w-3xl px-6 text-center sm:px-8 lg:px-10">
            <Badge
              variant="brand"
              className="mb-3 text-xs font-bold uppercase tracking-wider"
            >
              {t("awardsShowcase.eyebrow")}
            </Badge>

            <h2
              id="awards-heading"
              className="text-3xl font-extrabold tracking-tight text-headings text-ink sm:text-4xl"
            >
              {t("awardsShowcase.title")}
            </h2>

            <p className="section-subtitle mx-auto mt-3 max-w-2xl text-base leading-relaxed text-body sm:text-lg">
              {t("awardsShowcase.description")}
            </p>
          </Reveal>

          {/* Marquee Wrapper */}
          <Reveal delay={0.15}>
            <div
              tabIndex={0}
              role="region"
              aria-label={t("awardsShowcase.carouselAriaLabel")}
              className="sc-awards-marquee-wrap group relative mt-6 w-full overflow-hidden py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:mt-8"
            >
              {/* Left gradient fade */}
              <div
                className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-6 bg-gradient-to-r from-card/35 via-card/15 to-transparent dark:from-[#0d1230]/35 dark:via-[#0d1230]/15 dark:to-transparent sm:w-10 [.a11y_&]:hidden"
                aria-hidden="true"
              />

              {/* Right gradient fade */}
              <div
                className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-4 bg-gradient-to-l from-card/20 to-transparent dark:from-[#0d1230]/20 dark:to-transparent sm:w-7 [.a11y_&]:hidden"
                aria-hidden="true"
              />

              {/* Seamless Animated Track */}
              <div className="sc-awards-track">
                {MARQUEE_ITEMS.map((award, index) => (
                  <div
                    key={`${award.id}-${index}`}
                    className="sc-award-item group/card"
                    role="group"
                    aria-label={award.name}
                  >
                    <div className="sc-award-logo flex items-center justify-center">
                      <div className="relative flex h-16 w-40 sm:h-[72px] sm:w-44 items-center justify-center bg-transparent">
                        <Image
                          src={award.imageSrc}
                          alt={award.name}
                          width={176}
                          height={68}
                          className="max-h-16 w-auto max-w-[160px] sm:max-w-[176px] object-contain drop-shadow-sm select-none transition-transform duration-300 group-hover/card:scale-105"
                        />
                      </div>
                    </div>

                    <span className="sc-award-name">{award.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
