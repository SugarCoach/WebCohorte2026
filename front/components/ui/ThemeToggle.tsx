"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme, type Theme } from "@/lib/theme";
import { useLanguage } from "@/lib/i18n";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

const ITEMS: { value: Theme; icon: string }[] = [
  { value: "dark", icon: "dark_mode" },
  { value: "light", icon: "light_mode" },
];

/**
 * Selector de modo de color (Oscuro / Claro), calcado del
 * `#themeMenuBtn` / `#themeMenu` de index.html: botón redondo `.theme-toggle`
 * con menú `.theme-menu`, `aria-current`, cierre con Escape y clic afuera.
 */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();
  const LABELS: Record<Theme, string> = { light: t("theme.light"), dark: t("theme.dark"), a11y: t("theme.light") };
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={btnRef}
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="themeMenu"
        aria-label={`Modo de color: ${LABELS[theme]}. Cambiar modo`}
        onClick={() => setOpen((v) => !v)}
        className="theme-toggle"
      >
        <MaterialIcon name="contrast" style={{ fontSize: 20 }} />
      </button>
      {open && (
        <div id="themeMenu" role="menu" aria-label="Modo de color" className="theme-menu">
          {ITEMS.map(({ value, icon }) => {
            const active = theme === value;
            return (
              <button
                key={value}
                type="button"
                role="menuitemradio"
                aria-checked={active}
                aria-current={active}
                onClick={() => {
                  setTheme(value);
                  setOpen(false);
                  btnRef.current?.focus();
                }}
                className="theme-menu-item"
              >
                <MaterialIcon name={icon} style={{ fontSize: 18 }} />
                {LABELS[value]}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
