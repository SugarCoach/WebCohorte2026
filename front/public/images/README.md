# Imágenes (`public/images/`)

Estructura creada para los assets del sitio:

```
public/images/
  logo/     → SOLO el logo (lo aporta la usuaria)
  phones/   → reservada (hoy las capturas son remotas, ver `lib/images.ts`)
  team/     → reservada (hoy las fotos son remotas, ver `lib/images.ts`)
  mascot/   → reservada (hoy remota, ver `lib/images.ts`)
  awards/   → reservada para foto de premios / equipo grupal
```

## Formatos recomendados

| Tipo | Formato | Por qué |
|---|---|---|
| Logo | **SVG** (ideal) o PNG con transparencia | Nítido a cualquier tamaño, pesa poco |
| Fotos equipo | **WebP** (~800px lado mayor) | ~70% menos peso que JPG con igual calidad |
| Capturas app | **WebP** | Igual que arriba |
| Mascota / ilustraciones | SVG si es vector, si no WebP/PNG | — |

## Logo: cómo ponerlo

1. Copiá tu archivo a `public/images/logo/` con el nombre `sugarcoach-logo.png`
   (también vale `.webp` o `.svg`).
2. Avisame y cambio `LOGO_SRC` en `lib/images.ts` a la ruta local
   (`/images/logo/sugarcoach-logo.png`). Es un cambio de 1 línea:
   todos los lugares (Navbar, Footer, login/register, CTA) usan el
   componente `components/ui/Logo.tsx`.
