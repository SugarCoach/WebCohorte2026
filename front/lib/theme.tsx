"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

/**
 * Tres modos de color, como en `sugarcoach-app-landing-3-modos (2).html`:
 * - light: paleta clara (por defecto, sin clase en <html>)
 * - dark: clase `dark` en <html>
 * - a11y: clase `a11y` en <html> (alto contraste + zoom + focos visibles)
 */

export type Theme = "light" | "dark" | "a11y";

export const THEME_STORAGE_KEY = "sugarcoach-theme";

export const THEME_LABELS: Record<Theme, string> = {
  light: "Claro",
  dark: "Oscuro",
  a11y: "Accesible",
};

function readInitialTheme(): Theme {
  if (typeof window === "undefined" || typeof document === "undefined") return "light";
  // El script pre-hidratación de `app/layout.tsx` ya dejó la clase correcta.
  if (document.documentElement.classList.contains("dark")) return "dark";
  if (document.documentElement.classList.contains("a11y")) return "a11y";
  return "light";
}

export function applyThemeClass(mode: Theme): void {
  if (typeof document === "undefined") return;
  document.documentElement.classList.remove("dark", "a11y");
  if (mode === "dark") document.documentElement.classList.add("dark");
  if (mode === "a11y") document.documentElement.classList.add("a11y");
}

interface ThemeContextValue {
  theme: Theme;
  setTheme: (mode: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  // SSR-safe: el primer render del cliente debe coincidir con el servidor
  // ("light", el default). El tema real se sincroniza en un efecto tras
  // montar, para no provocar hydration mismatch si el usuario cambió de tema.
  const [theme, setThemeState] = useState<Theme>("light");

  const setTheme = useCallback((mode: Theme) => {
    setThemeState(mode);
    applyThemeClass(mode);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, mode);
    } catch {
      // localStorage no disponible (SSR/privado): el tema igual aplica en memoria.
    }
  }, []);

  // Reafirma la clase al montar (por si el script pre-hidratación no corrió)
  // y sincroniza el estado con el tema real (clase/localStorage).
  useEffect(() => {
    const initial = readInitialTheme();
    setThemeState(initial);
    applyThemeClass(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}
