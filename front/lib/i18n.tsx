"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { translations, type Lang } from "@/lib/translations";

export const LANG_STORAGE_KEY = "sugarcoach-lang";

/** Igual que `deviceLanguage()` en index.html: es-* -> es, cualquier otro -> en. */
function deviceLanguage(): Lang {
  const language = (navigator.languages && navigator.languages[0]) || navigator.language || "";
  return /^es(?:-|$)/i.test(language) ? "es" : "en";
}

function readInitialLang(): Lang {
  if (typeof window === "undefined") return "es";
  try {
    const stored = window.localStorage.getItem(LANG_STORAGE_KEY);
    if (stored === "es" || stored === "en") return stored;
  } catch {
    // localStorage no disponible (SSR/privado): seguimos al idioma del dispositivo.
  }
  return deviceLanguage();
}

interface LanguageContextValue {
  lang: Lang;
  /** Traduce una clave plana, igual que `data-i18n="clave"` en index.html. */
  t: (key: string) => string;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "es",
  t: (key: string) => translations.es[key] ?? key,
  setLang: () => {},
  toggleLang: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  // SSR-safe: el primer render coincide con el servidor ("es"); el idioma
  // guardado se sincroniza tras montar, igual que el ThemeProvider.
  const [lang, setLangState] = useState<Lang>("es");

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, next);
    } catch {
      // noop
    }
  }, []);

  const toggleLang = useCallback(() => {
    setLangState((prev) => {
      const next: Lang = prev === "es" ? "en" : "es";
      try {
        window.localStorage.setItem(LANG_STORAGE_KEY, next);
      } catch {
        // noop
      }
      return next;
    });
  }, []);

  useEffect(() => {
    setLangState(readInitialLang());
  }, []);

  const t = useCallback((key: string) => translations[lang][key] ?? key, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, t, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  return useContext(LanguageContext);
}
