import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface MaterialIconProps {
  name: string;
  filled?: boolean;
  className?: string;
  style?: CSSProperties;
}

/** Ícono de Material Symbols Outlined, igual que `index.html` (sin sustituir por otra librería). */
export function MaterialIcon({ name, filled, className, style }: MaterialIconProps) {
  return (
    <span
      className={cn("material-symbols-outlined", className)}
      style={{ ...(filled ? { fontVariationSettings: "'FILL' 1" } : {}), ...style }}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}
