"use client";

import { useLanguage } from "@/lib/i18n";

/** Selector ES/EN, calcado del `#langToggleBtn` de index.html. */
export function LanguageToggle() {
  const { lang, toggleLang } = useLanguage();
  return (
    <button
      id="langToggleBtn"
      type="button"
      onClick={toggleLang}
      aria-label={lang === "es" ? "Switch to English" : "Cambiar a español"}
      className="theme-toggle"
    >
      <span id="langToggleLabel">{lang.toUpperCase()}</span>
    </button>
  );
}
