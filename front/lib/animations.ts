/**
 * Animaciones tomadas de code.html y migradas a Motion + Tailwind.
 *
 * code.html usa solo utilidades CSS:
 * - logo: `transition-transform group-hover:scale-105`
 * - CTAs: `transition-all active:scale-95`, `active:scale-[0.98]`
 * - tarjeta flotante hero: `animate-bounce` con `animation-duration: 5s`
 * - teléfono apoyo: `rotate-6 hover:rotate-2 transition-transform duration-300`
 * - teléfonos: `hover:scale-[1.01] / hover:scale-[1.02] transition-transform`
 * - cards: `hover:shadow-xl transition-all`, `group hover:-translate-y-1`
 * - FAQ: acordeón single-open, primero abierto, icono con `transition-transform` rotate(180deg)
 * - footer badges: `hover:opacity-90 transition-opacity`, sociales `transition-colors`
 *
 * Aquí se centralizan los equivalentes en Motion (respetando
 * prefers-reduced-motion vía `Reveal` / `useReducedMotion`).
 */
import type { Variants } from "framer-motion";

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" },
  }),
};

export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

/** Flotación suave equivalente al `animate-bounce` de 5s de code.html. */
export const floatY: Variants = {
  animate: {
    y: [0, -10, 0],
    transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
  },
};

/** Micro-interacción de teléfono: `hover:scale-[1.01]` */
export const phoneHover = {
  whileHover: { scale: 1.01 },
  transition: { duration: 0.3 },
} as const;

/** Teléfono de apoyo inclinado: `rotate-6 hover:rotate-2` */
export const tiltedPhone = {
  initial: { rotate: 6 },
  whileHover: { rotate: 2, scale: 1.01 },
  transition: { duration: 0.3 },
} as const;
