"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface TeamPhotoProps {
  name: string;
  photo: string;
  initials: string;
  className?: string;
}

/**
 * Foto del integrante con fallback a iniciales si la remota falla.
 * (Las URLs `aida` de la landing de ejemplo pueden caducar.)
 */
export function TeamPhoto({ name, photo, initials, className }: TeamPhotoProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-2xl bg-base text-2xl font-extrabold text-ink",
          className,
        )}
        aria-label={name}
      >
        {initials}
      </div>
    );
  }

  return (
    <Image
      src={photo}
      alt={name}
      width={288}
      height={352}
      loading="lazy"
      sizes="(max-width: 640px) 100vw, 288px"
      onError={() => setFailed(true)}
      className={cn(
        "rounded-2xl border border-line/15 bg-base object-cover object-top shadow-md transition-transform duration-300 group-hover:scale-105",
        className,
      )}
    />
  );
}
