import type { Config } from "tailwindcss";

/**
 * Colores semánticos como canales RGB + `<alpha-value>`, para que los
 * modificadores de opacidad (`bg-base/70`, `border-line/10`, …) funcionen.
 * Los valores viven en `app/globals.css`: `:root` = claro, `.dark` = oscuro
 * (identidad #01081F + gradiente #DA44AF → #C747CA), `.a11y` = alto contraste.
 * Paletas tomadas de `sugarcoach-app-landing-3-modos (2).html`.
 */
const withAlpha = (name: string) => `rgb(var(${name}) / <alpha-value>)`;

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "brand-gradient": "linear-gradient(90deg, #DA44AF 0%, #C747CA 100%)",
      },
      boxShadow: {
        "brand-glow": "0 0 20px rgba(218,68,175,0.5)",
        "brand-lg": "0 10px 25px -5px rgba(218,68,175,0.4)",
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        // Réplica exacta de index.html: todas las escalas tipográficas usan la misma familia.
        "display-lg": ["Plus Jakarta Sans"],
        "headline-lg": ["Plus Jakarta Sans"],
        "headline-md": ["Plus Jakarta Sans"],
        "headline-sm": ["Plus Jakarta Sans"],
        "label-lg": ["Plus Jakarta Sans"],
        "label-md": ["Plus Jakarta Sans"],
        "label-sm": ["Plus Jakarta Sans"],
        "body-md": ["Plus Jakarta Sans"],
        "body-sm": ["Plus Jakarta Sans"],
        "body-lg": ["Plus Jakarta Sans"],
        "display-lg-mobile": ["Plus Jakarta Sans"],
        "headline-lg-mobile": ["Plus Jakarta Sans"],
      },
      // ------------------------------------------------------------------
      // Tokens 1:1 de `index.html` (variables `--c-*` en globals.css).
      // Se agregan sin tocar los `sc-*` existentes (usados por /login,
      // /register, /dashboard) para no romper esas páginas.
      // ------------------------------------------------------------------
      backgroundColor: {
        base: withAlpha("--sc-base"),
      },
      borderColor: {
        base: withAlpha("--sc-base"),
      },
      colors: {
        alt: withAlpha("--sc-alt"),
        footer: withAlpha("--sc-footer"),
        card: withAlpha("--sc-card"),
        body: withAlpha("--sc-body"),
        muted: withAlpha("--sc-muted"),
        ink: withAlpha("--sc-ink"), // texto principal (reemplaza text-white)
        line: withAlpha("--sc-line"), // bordes sutiles (reemplaza border-white/*)
        tint: withAlpha("--sc-tint"), // superficies tenues (reemplaza bg-white/*)
        brand: {
          DEFAULT: "#DA44AF",
          from: "#DA44AF",
          to: "#C747CA",
        },
        glow: {
          purple: "#732995",
          blue: "#155EB2",
        },
        // ---- Tokens 1:1 de `index.html` (variables `--c-*` en globals.css) ----
        "accent-yellow": withAlpha("--c-accent-yellow-rgb"),
        background: "var(--c-background)",
        "bg-canvas": "var(--c-bg-canvas)",
        "bg-deep": "var(--c-bg-deep)",
        "border-glow": "var(--c-border-glow)",
        "border-subtle": "var(--c-border-subtle)",
        error: "var(--c-error)",
        "error-container": "var(--c-error-container)",
        "inverse-on-surface": "var(--c-inverse-on-surface)",
        "inverse-primary": "var(--c-inverse-primary)",
        "inverse-surface": "var(--c-inverse-surface)",
        "neon-cyan": withAlpha("--c-neon-cyan-rgb"),
        "neon-magenta": withAlpha("--c-neon-magenta-rgb"),
        "neon-magenta-alt": "var(--c-neon-magenta-alt)",
        "on-background": "var(--c-on-background)",
        "on-error": "var(--c-on-error)",
        "on-error-container": "var(--c-on-error-container)",
        "on-primary": "var(--c-on-primary)",
        "on-primary-container": "var(--c-on-primary-container)",
        "on-primary-fixed": "var(--c-on-primary-fixed)",
        "on-primary-fixed-variant": "var(--c-on-primary-fixed-variant)",
        "on-secondary": "var(--c-on-secondary)",
        "on-secondary-container": "var(--c-on-secondary-container)",
        "on-secondary-fixed": "var(--c-on-secondary-fixed)",
        "on-secondary-fixed-variant": "var(--c-on-secondary-fixed-variant)",
        "on-surface": "var(--c-on-surface)",
        "on-surface-variant": "var(--c-on-surface-variant)",
        "on-tertiary": "var(--c-on-tertiary)",
        "on-tertiary-container": "var(--c-on-tertiary-container)",
        "on-tertiary-fixed": "var(--c-on-tertiary-fixed)",
        "on-tertiary-fixed-variant": "var(--c-on-tertiary-fixed-variant)",
        outline: "var(--c-outline)",
        "outline-variant": "var(--c-outline-variant)",
        primary: withAlpha("--c-primary-rgb"),
        "primary-container": "var(--c-primary-container)",
        "primary-fixed": "var(--c-primary-fixed)",
        "primary-fixed-dim": "var(--c-primary-fixed-dim)",
        secondary: withAlpha("--c-secondary-rgb"),
        "secondary-container": "var(--c-secondary-container)",
        "secondary-fixed": "var(--c-secondary-fixed)",
        "secondary-fixed-dim": "var(--c-secondary-fixed-dim)",
        surface: "var(--c-surface)",
        "surface-bright": "var(--c-surface-bright)",
        "surface-container": withAlpha("--c-surface-container-rgb"),
        "surface-container-high": "var(--c-surface-container-high)",
        "surface-container-highest": "var(--c-surface-container-highest)",
        "surface-container-low": "var(--c-surface-container-low)",
        "surface-container-lowest": "var(--c-surface-container-lowest)",
        "surface-dim": "var(--c-surface-dim)",
        "surface-tier-1": "var(--c-surface-tier-1)",
        "surface-tier-2": "var(--c-surface-tier-2)",
        "surface-tier-3": "var(--c-surface-tier-3)",
        "surface-tint": "var(--c-surface-tint)",
        "surface-variant": "var(--c-surface-variant)",
        tertiary: withAlpha("--c-tertiary-rgb"),
        "tertiary-container": withAlpha("--c-tertiary-container-rgb"),
        "tertiary-fixed": "var(--c-tertiary-fixed)",
        "tertiary-fixed-dim": "var(--c-tertiary-fixed-dim)",
        "text-primary": "var(--c-text-primary)",
        "text-secondary": "var(--c-text-secondary)",
        "text-tertiary": "var(--c-text-tertiary)",
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        lg: "1rem",
        xl: "1.5rem",
        "2xl": "1.75rem",
        "3xl": "2.25rem",
        full: "9999px",
      },
      spacing: {
        "gutter-desktop": "2rem",
        "space-md": "1rem",
        "gutter-tablet": "1.5rem",
        "space-2xs": "0.25rem",
        "gutter-mobile": "1rem",
        "space-lg": "1.5rem",
        "margin-tablet": "2rem",
        "margin-desktop": "3rem",
        "margin-mobile": "1.25rem",
        "space-xl": "2rem",
        "space-xs": "0.5rem",
        "space-2xl": "3rem",
        "space-3xl": "4.5rem",
        "space-sm": "0.75rem",
      },
      fontSize: {
        "display-lg": ["48px", { lineHeight: "56px", letterSpacing: "-0.02em", fontWeight: "800" }],
        "headline-lg": ["32px", { lineHeight: "40px", letterSpacing: "-0.015em", fontWeight: "700" }],
        "headline-md": ["22px", { lineHeight: "30px", letterSpacing: "-0.01em", fontWeight: "700" }],
        "headline-sm": ["18px", { lineHeight: "26px", fontWeight: "600" }],
        "label-lg": ["14px", { lineHeight: "20px", letterSpacing: "0.01em", fontWeight: "600" }],
        "label-md": ["12px", { lineHeight: "16px", letterSpacing: "0.03em", fontWeight: "700" }],
        "label-sm": ["11px", { lineHeight: "14px", letterSpacing: "0.04em", fontWeight: "600" }],
        "body-md": ["15px", { lineHeight: "24px", fontWeight: "400" }],
        "body-sm": ["13px", { lineHeight: "20px", fontWeight: "500" }],
        "body-lg": ["17px", { lineHeight: "26px", fontWeight: "500" }],
        "display-lg-mobile": ["36px", { lineHeight: "44px", letterSpacing: "-0.02em", fontWeight: "800" }],
        "headline-lg-mobile": ["26px", { lineHeight: "34px", letterSpacing: "-0.015em", fontWeight: "700" }],
      },
    },
  },
  plugins: [],
};

export default config;
