import Image from "next/image";
import { LOGO_SRC } from "@/lib/images";
import { cn } from "@/lib/utils";

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

/**
 * Logo oficial. Hoy apunta al remoto de la landing (`LOGO_SRC` en
 * `lib/images.ts`); cuando el archivo esté en `public/images/logo/`,
 * basta cambiar esa constante a la ruta local.
 */
export function Logo({ width = 140, height = 40, className, priority = false }: LogoProps) {
  return (
    <Image
      src={LOGO_SRC}
      alt="SugarCoach Logo Oficial"
      width={width}
      height={height}
      priority={priority}
      className={cn("h-9 w-auto object-contain md:h-10", className)}
    />
  );
}
