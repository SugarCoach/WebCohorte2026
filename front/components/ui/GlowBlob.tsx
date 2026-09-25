import { cn } from "@/lib/utils";

interface GlowBlobProps {
  color: "purple" | "blue" | "pink";
  size?: number;
  className?: string;
  opacity?: number;
  style?: React.CSSProperties;
}

/**
 * Círculo decorativo con blur-3xl y opacidad baja (0.2-0.35).
 * Colores de marca: morado #732995, azul #155EB2, rosa #DA44AF.
 */
const COLOR_MAP: Record<GlowBlobProps["color"], string> = {
  purple: "#732995",
  blue: "#155EB2",
  pink: "#DA44AF",
};

export function GlowBlob({ color, size = 420, className, opacity = 0.28, style }: GlowBlobProps) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute rounded-full blur-3xl", className)}
      style={{
        width: size,
        height: size,
        background: COLOR_MAP[color],
        opacity,
        filter: "blur(120px)",
        ...style,
      }}
    />
  );
}
