# Design Tokens

All tokens live in `app/globals.css`. The site is dark-only, so there is one theme in `:root` (the `.dark` class on `<html>` is kept but carries no overrides).

Two layers:

1. **Palette primitives** (`--palette-*`), named after the brand's aviation vocabulary. Never use these in components.

| Token | Value | Role |
|---|---|---|
| `--palette-hangar` | `#15171a` | Page background |
| `--palette-fuselage` | `#1c1f23` | Surface |
| `--palette-cockpit` | `#24282d` | Raised surface |
| `--palette-rivet` | `#33383f` | Hairlines |
| `--palette-gauge` | `#4a5058` | Strong lines, inputs |
| `--palette-haze` | `#8d949c` | Muted text |
| `--palette-mist` | `#b9bec4` | Soft text |
| `--palette-contrail` | `#e8eaec` | Text |
| `--palette-falcon` / `-deep` | `#e53935` / `#c62828` | Brand red: actions and "live" signals only |
| `--palette-steel` / `-bright` | `#7fa6c8` / `#a9c6df` | Information, visited states, focus ring |

2. **Semantic tokens** that components use through Tailwind (`bg-background`, `bg-surface`, `bg-surface-raised`, `text-foreground`, `text-foreground-soft`, `text-muted-foreground`, `border-border`, `border-border-strong`, `bg-primary`, `hover:bg-primary-hover`, `text-accent`, …).

## Typography

| Role | Family | Token |
|---|---|---|
| Display (h1–h4) | Oxanium | `font-display` (applied to headings in the base layer) |
| Body and UI | Instrument Sans | `font-sans` |
| Data (timestamps, step numbers) | Source Code Pro | `font-mono`: only where the content really is data |

Fluid display scale: `text-display-xl` (hero), `text-display-lg` (section titles), `text-display-md` (sub-features), `text-display-sm`, plus `text-lead` for intro paragraphs. These are registered with `tailwind-merge` in `lib/utils.ts`; add any new custom size there too, or `cn()` will drop it.

## Layout and motion tokens

- `page-container` utility: max width `--page-max-width` (1400px) with `--page-gutter`.
- `section-spacing` utility: vertical `--section-space`.
- `hairline-grid` utility: 64px line grid in `--border` (structural, not decorative).
- Easing: `ease-out-expo`, `ease-in-out-quart`. Keyframe: `animate-signal-pulse` (live indicators only).

## Effect tokens

| Token | Value | Used by |
|---|---|---|
| `--hero-dither-ink` | `var(--primary)` | Ink colour of the interactive hero dithering |
| `--hero-dither-backdrop` | `var(--palette-black)` | Backdrop of the hero dithering (blended with `mix-blend-screen`) |
| `--wave-cta-dither-ink` | `var(--primary)` | Ink colour of the interactive wave behind the closing CTA and footer |
| `--wave-cta-dither-backdrop` | `transparent` | Backdrop of that wave, transparent so the page background shows through |
| `--logo-mark-opacity`, `--logo-mark-hover-opacity`, `--logo-marquee-duration` | 0.85, 1, 48s | Client logo marquee (no colour filter; logos keep brand colours) |

Never hardcode colours in components or shaders. Add a token, then read it. WebGL code reads tokens with `readCssColorToken()` from `components/ui/interactive-dithering/read-css-color-token.ts`.
