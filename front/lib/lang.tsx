"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

/**
 * Idioma del sitio -- mismo patrón que ThemeProvider (`lib/theme.tsx`):
 * SSR-safe, persistido en localStorage, sincronizado en un efecto tras
 * montar. El chat (`components/chat/chat-widget.tsx`) es lo único que
 * lo consume por ahora.
 */

export type Lang = "es" | "en";

export const LANG_STORAGE_KEY = "sugarcoach-lang";

function deviceLanguage(): Lang {
  if (typeof navigator === "undefined") return "es";
  const language = (navigator.languages && navigator.languages[0]) || navigator.language || "";
  return /^es(?:-|$)/i.test(language) ? "es" : "en";
}

function readInitialLang(): Lang {
  if (typeof window === "undefined" || typeof document === "undefined") return "es";
  try {
    const stored = window.localStorage.getItem(LANG_STORAGE_KEY);
    if (stored === "es" || stored === "en") return stored;
  } catch {
    // localStorage no disponible (SSR/privado): seguimos a la siguiente fuente.
  }
  const attr = document.documentElement.getAttribute("lang");
  if (attr === "en" || attr === "es") return attr;
  return deviceLanguage();
}

export function applyLangAttribute(lang: Lang): void {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("lang", lang);
}

interface LangContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

const LangContext = createContext<LangContextValue>({
  lang: "es",
  setLang: () => {},
});

export function LangProvider({ children }: { children: ReactNode }) {
  // SSR-safe: el primer render del cliente debe coincidir con el servidor
  // ("es", igual que <html lang="es"> en app/layout.tsx). El idioma real
  // se sincroniza en un efecto tras montar, para no provocar hydration
  // mismatch cuando hay un idioma guardado o detectado distinto.
  const [lang, setLangState] = useState<Lang>("es");

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    applyLangAttribute(next);
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, next);
    } catch {
      // localStorage no disponible (SSR/privado): el idioma igual aplica en memoria.
    }
  }, []);

  useEffect(() => {
    const initial = readInitialLang();
    setLangState(initial);
    applyLangAttribute(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export function useLang(): LangContextValue {
  return useContext(LangContext);
}
