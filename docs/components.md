# Component Registry

| Component | Path | Purpose |
|---|---|---|
| `InteractiveDitheringBackground` | `components/ui/interactive-dithering/` | WebGL dithering with a cursor smoke/wave trail. `preset="hero"` (warp pattern, default) or `preset="waveCta"` (the wave behind the closing CTA and footer). See `interactions.md` |
| `DitheringShader` | `components/ui/dithering-shader.tsx` | **Unused.** Old non-interactive WebGL dithering. `WaveCTABackground` now uses `InteractiveDitheringBackground preset="waveCta"` |
| `WaveCTA`, `WaveCTABackground` | `components/ui/wave-cta.tsx` | Closing CTA. `WaveCTABackground` is the interactive dithered wave behind the CTA and footer (homepage wraps both in one `relative overflow-clip` div) |
| `BrowserShowcaseSection` | `components/BrowserShowcaseSection/` | Work showcase: tabbed browser chrome on desktop, `MobileShowcaseCarousel` on phones: CSS-grid track (equal card heights in every browser) with gentle `snap-proximity` snapping, so small drags spring back and a deliberate swipe moves one card. The next card peeks, off-centre cards are dimmed to 45%, prev/next arrows sit in the `SectionHeading` actions slot (top right), and thin position segments below the cards jump to a card. No scroll-jacking. Each card shows the site's name and a one-line `summary` from `lib/data/showcase-websites.ts`. Data + local screenshots: see `portfolio-and-logos.md` |
| `ClientLogoSection` | `components/ClientLogoSection/` | Client logo marquee (two rows, original colours). See `portfolio-and-logos.md` |
| `SiteNavigation` | `components/site-navigation/` | Fixed top bar on every page: services panel, active-link tick, mobile sheet. See `ui-conventions.md` → Navigation |
| `MagneticButton` | `components/magnetic-button.tsx` | **Legacy**, only used by the unused `hero.tsx`/`cta.tsx`. Don't use in new work |
| `Footer`, `FAQ`, `AboutFounder` | `components/` | Page chrome and sections. |

## Primitives (shared, `components/ui/`)

Built with `class-variance-authority`, shadcn-style (`asChild` via `radix-ui` Slot). Use these instead of hand-styled anchors/buttons.

| Component | Path | Purpose |
|---|---|---|
| `Button`, `buttonVariants` | `components/ui/button.tsx` | `variant`: primary / outline / ghost / inverse. `size`: sm / md / lg. `width`: auto / full / fullOnMobile |
| `TextLink`, `textLinkVariants` | `components/ui/text-link.tsx` | Inline links. `tone`, `underline`, `size` |
| `SectionHeading` | `components/ui/section-heading.tsx` | Left-aligned heading: top rule, title, then a required one-sentence intro directly under it. Optional `actions` (e.g. carousel arrows) share the intro's row, on the right. Used by every section, including the mobile showcase carousel |
| `LoopingVideo` | `components/ui/looping-video.tsx` | Muted looping video. Plays only when near the viewport and `isActive`; poster only under reduced motion |
| `ViewfinderFrame` | `components/ui/viewfinder-frame.tsx` | Corner-bracket frame for media (videos, screenshots) |

## Homepage sections (`app/_components/`, data in `app/_lib/`)

| Component | Path | Purpose |
|---|---|---|
| `HeroSection` | `app/_components/hero/hero-section.tsx` | Headline, then intro (left) and CTAs + trust line (right), over `InteractiveDitheringBackground`. No illustration; the system-graph panel was removed at the user's request |
| `LiveOperationsPanel` | `app/_components/hero/live-operations-panel.tsx` | **Unused** since the hero illustration was removed. Kept until the user decides whether to delete it. Scenarios in `app/_lib/operation-scenarios.ts` |
| `SystemGraph`, `SystemNodeChip`, `OperationsLog` | `app/_components/hero/` | **Unused**, pieces of the removed panel. Playback timing in `use-scenario-playback.ts` |
| `ServicesSection`, `ServiceTile` | `app/_components/services/` | 2×2 grid of service video loops; each tile (loop, title, one line) links to its service page |
| `LaunchpadSection`, `LaunchpadShowcase`, `LaunchpadFeatureButton` | `app/_components/launchpad/` | Flagship case study: one large current screenshot plus four feature buttons that swap it. Data in `app/_lib/launchpad-showcase.ts`, screenshots in `public/work/launchpad/v2/` (demo data only) |
| `ProcessSection` | `app/_components/process/` | 5-step timeline drawn on scroll, one short line per step. Data in `app/_lib/process-steps.ts` |

## Service pages (`app/services/_components/`)

`ServicePage` composes `ServiceHero` (title, copy, looping video), `ServiceInclusions`, `ServiceUseCases` and `WaveCTA`. Service data and loop sources: `lib/data/services.ts`.
