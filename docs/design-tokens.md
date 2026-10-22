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
| `--palette-tarmac` | `#0f1012` | Inset surfaces inside service scenes (`--scene-inset`) |

2. **Semantic tokens** that components use through Tailwind (`bg-background`, `bg-surface`, `bg-surface-raised`, `text-foreground`, `text-foreground-soft`, `text-muted-foreground`, `border-border`, `border-border-strong`, `bg-primary`, `hover:bg-primary-hover`, `text-accent`, …).

## Typography

| Role | Family | Token |
|---|---|---|
| Display (h1–h4) | Oxanium | `font-display` (applied to headings in the base layer) |
| Body and UI | Instrument Sans | `font-sans` |
| Data (timestamps, step numbers) | Source Code Pro | `font-mono`: only where the content really is data |

Fluid display scale: `text-display-xl` (hero), `text-display-lg` (section titles), `text-display-md` (sub-features), `text-display-sm`, plus `text-lead` for intro paragraphs. Below `sm` the homepage hero headline uses `text-display-hero-mobile` (`clamp(2.125rem, 11vw, 3.25rem)`), sized so its longest line, "The technical arm" (about 7.85em wide), nearly fills a phone's width; it meets `text-display-xl` at 640px, so there is no jump at the breakpoint. These are registered with `tailwind-merge` in `lib/utils.ts`; add any new custom size there too, or `cn()` will drop it.

## Layout and motion tokens

- `page-container` utility: max width `--page-max-width` (1400px) with `--page-gutter`.
- `section-spacing` utility: vertical `--section-space`. The token steps with the viewport: 4rem (64px) on phones, 5rem from `sm` (640px), then `clamp(6rem, 12vw, 10rem)` from `md` (768px). Two stacked sections meet with twice that, so phones get 128px between sections (it was 192px, which the user said was too much, 2026-10-22). Use the token as is; don't add per-breakpoint `py-*` overrides on top of it.
- `hairline-grid` utility: 64px line grid in `--border` (structural, not decorative).
- Easing: `ease-out-expo`, `ease-in-out-quart` (in TS: `easeOutExpo` from `lib/motion.ts`). Keyframes: `animate-signal-pulse` (live indicators only); `animate-rise-in`, `animate-mask-rise`, `animate-viewfinder-lock`, `animate-film-wipe` and `animate-film-settle` (service hero load).
- Viewfinder: `--viewfinder-reveal-delay` (200ms), `--viewfinder-film-lag` (160ms), `--viewfinder-lock-travel` (14px, how far out the corners start), `--viewfinder-focus-travel` (3px, how far they tighten on hover).

## Effect tokens

| Token | Value | Used by |
|---|---|---|
| `--hero-dither-ink` | `var(--primary)` | Ink colour of the interactive hero dithering |
| `--scene-backdrop-top` / `-bottom` | fuselage / hangar | Service scene stage gradient |
| `--scene-object-top` / `-bottom` / `-edge` | cockpit / fuselage / rivet | Raised square objects in service scenes |
| `--scene-object-highlight`, `--scene-object-shadow` | 7% white / 55% black | Top inner highlight and drop shadow of scene objects |
| `--scene-inset` (`bg-scene-inset`) | `var(--palette-tarmac)` | Status chips and inset wells in service scenes |
| `--hero-dither-backdrop` | `var(--palette-black)` | Backdrop of the hero dithering (blended with `mix-blend-screen`) |
| `--wave-cta-dither-ink` | `var(--primary)` | Ink colour of the interactive wave behind the closing CTA and footer |
| `--wave-cta-dither-backdrop` | `transparent` | Backdrop of that wave, transparent so the page background shows through |
| `--logo-mark-opacity`, `--logo-mark-hover-opacity`, `--logo-marquee-duration` | 0.85, 1, 48s | Client logo marquee (no colour filter; logos keep brand colours) |

Never hardcode colours in components or shaders. Add a token, then read it. WebGL code reads tokens with `readCssColorToken()` from `components/ui/interactive-dithering/read-css-color-token.ts`.
