# Component Registry

| Component | Path | Purpose |
|---|---|---|
| `InteractiveDitheringBackground` | `components/ui/interactive-dithering/` | WebGL dithering with a cursor smoke/wave trail. `preset="hero"` (warp pattern, default) or `preset="waveCta"` (the wave behind the closing CTA and footer). See `interactions.md` |
| `DitheringShader` | `components/ui/dithering-shader.tsx` | **Unused.** Old non-interactive WebGL dithering. `WaveCTABackground` now uses `InteractiveDitheringBackground preset="waveCta"` |
| `WaveCTA`, `WaveCTABackground` | `components/ui/wave-cta.tsx` | Closing CTA. `WaveCTABackground` is the interactive dithered wave behind the CTA and footer (homepage wraps both in one `relative overflow-clip` div) |
| `PageClosing` | `components/page-closing.tsx` | The closing block of a page: `WaveCTABackground` behind `WaveCTA` and `Footer` in one `relative overflow-clip` div. Used by the homepage and every service page. Use it instead of a bare `Footer` when a page should end on the CTA |
| `BrowserShowcaseSection` | `components/BrowserShowcaseSection/` | Work showcase: tabbed browser chrome on desktop, `MobileShowcaseCarousel` on phones, built on the `Carousel` primitive (JS/Embla, transform-driven). The next card peeks. Card focus is tweened from the drag position every frame (`useCarouselScrollTween`): cards fade from 100% to 45% opacity with distance, and each phone screenshot drifts up to 4.5% against the drag inside its frame (parallax). Every card and the desktop browser frame open that site's case study (`caseStudyPath`, `/work/<slug>`), not the live site; the desktop `SectionHeading` actions slot carries "Read the <site> case study" for the active tab. On hover, focus or press, the border firms to `border-strong` and the → nudges right. prev/next arrows sit in the `SectionHeading` actions slot (top right), and thin position segments below the cards jump to a card. No scroll-jacking. Each card shows a 9:16 phone screenshot, then the site's name and a one-line `summary` from `lib/data/showcase-websites.ts`. Data + local screenshots: see `portfolio-and-logos.md`. CVA `spacing`: `standalone` (default, homepage) or `followsSection` (bottom section space only, used under another section on the Web Design page) |
| `ClientLogoSection` | `components/ClientLogoSection/` | Client logo marquee (two rows, original colours). See `portfolio-and-logos.md` |
| `SiteNavigation` | `components/site-navigation/` | Fixed top bar on every page: Services panel, Work panel (case studies with a cover preview: `work-menu-panel.tsx`, `work-menu-study-link.tsx`, `work-menu-preview.tsx`), active-link tick, mobile sheet. `surface="solid"` on case studies. See `ui-conventions.md` → Navigation |
| `MagneticButton` | `components/magnetic-button.tsx` | **Legacy**, only used by the unused `hero.tsx`/`cta.tsx`. Don't use in new work |
| `Footer`, `FAQ`, `AboutFounder` | `components/` | Page chrome and sections. `AboutFounder` ends with a `BookCallButton` under the bio |
| `BookCallButton` | `components/book-call-button.tsx` | The one "Book a consultation call" button: `Button` + `BOOKING_URL` (new tab, `ArrowUpRight`). Takes `variant`, `size`, `width`, `className`. Used by the nav, hero, mid-page CTAs and `WaveCTA`. Use it for every booking button instead of rebuilding the anchor |
| `SectionCallToAction` | `components/section-call-to-action.tsx` | A section's closing booking row: one short `prompt` line on the left, `BookCallButton` on the right (stacked, full-width button on phones). Used at the end of the homepage's operating-system and process sections |

## Case studies (`app/work/`)

See `case-studies.md`. Shared frame in `app/work/_components/`: `CaseStudyLayout` (nav, `<main data-case-study>` with the study's font class, `NextCaseStudy`, `PageClosing`), `CaseStudyHero` (client name in its own face, headline, facts row incl. optional Team, hero media), `CaseStudyChapter` (title, intro under it, one visual; tones paper/raised/hangar), `CaseStudyFigure` (next/image at q90, optional viewfinder), `CaseStudyOutcomes`, `NextCaseStudy`, `CaseStudyIndexList` (the `/work` list). Each study's bespoke sections and signature moment live in `app/work/<slug>/_components/`.

## Primitives (shared, `components/ui/`)

Built with `class-variance-authority`, shadcn-style (`asChild` via `radix-ui` Slot). Use these instead of hand-styled anchors/buttons.

| Component | Path | Purpose |
|---|---|---|
| `Button`, `buttonVariants` | `components/ui/button.tsx` | `variant`: primary / outline / ghost / inverse. `size`: sm / md / lg. `width`: auto / full / fullOnMobile |
| `TextLink`, `textLinkVariants` | `components/ui/text-link.tsx` | Inline links. `tone`, `underline`, `size` |
| `SectionHeading` | `components/ui/section-heading.tsx` | Left-aligned heading: top rule, title, then a required one-sentence intro directly under it. Optional `actions` (e.g. carousel arrows) share the intro's row, on the right. Used by every section, including the mobile showcase carousel |
| `Carousel`, `CarouselContent`, `CarouselItem`, `CarouselPrevious`, `CarouselNext`, `useCarousel` | `components/ui/carousel.tsx` | shadcn-style API on `embla-carousel-react` 8.6 (JS drag and transforms, not CSS scroll-snap). Calm defaults: `align: start`, `trimSnaps`, `skipSnaps: false` (one card per swipe), `dragThreshold: 12`, `duration: 25`. Arrow keys work inside it. `CarouselContent` takes `viewportClassName` (put page-gutter padding there so cards align to the margin). `useCarouselScrollTween((api, slideDistancesInCards) => …)` runs on every scroll frame with each slide's signed distance from the current position in cards (0 = in focus, ±1 = one card away); write styles straight to `api.slideNodes()` there, not React state |
| `LoopingVideo` | `components/ui/looping-video.tsx` | **Unused** since the service videos were replaced by service scenes. Muted looping video that plays only near the viewport and when `isActive` |
| `ViewfinderFrame` | `components/ui/viewfinder-frame.tsx` | Corner-bracket frame for media (videos, screenshots). CVA `reveal`: `none` (default) or `onLoad` (corners lock on, film wipes in). Corners tighten on hover. See `ui-conventions.md` → Motion |
| `PlottedLine` | `components/ui/plotted-line.tsx` | A 1px hairline that draws in (`scaleX`/`scaleY`) when its parent `motion` list enters view. Spread `plotOnViewProps` on the parent and position each line with `className`. Use it in place of `border-*` when a list's lines should be plotted |

## Homepage sections (`app/_components/`, data in `app/_lib/`)

Order in `app/page.tsx`: hero, client logos, services, Selected websites (`BrowserShowcaseSection`), the company operating system (`LaunchpadSection`), process, founder, FAQ, then `PageClosing`.

| Component | Path | Purpose |
|---|---|---|
| `HeroSection` | `app/_components/hero/hero-section.tsx` | Headline, then intro (left) and CTAs + trust line (right), over `InteractiveDitheringBackground`. No illustration; the system-graph panel was removed at the user's request |
| `LiveOperationsPanel` | `app/_components/hero/live-operations-panel.tsx` | **Unused** since the hero illustration was removed. Kept until the user decides whether to delete it. Scenarios in `app/_lib/operation-scenarios.ts` |
| `SystemGraph`, `SystemNodeChip`, `OperationsLog` | `app/_components/hero/` | **Unused**, pieces of the removed panel. Playback timing in `use-scenario-playback.ts` |
| `ServicesSection`, `ServiceTile` | `app/_components/services/` | 2×2 grid of service tiles; each tile (`ServiceScene`, title, one line) links to its service page |
| `LaunchpadSection`, `LaunchpadShowcase`, `LaunchpadFeatureButton` | `app/_components/launchpad/` | Flagship case study: one large current screenshot with four feature buttons beside it (knowledge base first) that swap it. Data in `app/_lib/launchpad-showcase.ts`, screenshots in `public/work/company-os/` (demo data only; the AI studio shot is `v2/studio-director.webp` since the old Generate shot showed a real client's logo and spend). "Read the case study" in the heading's actions slot links to `/work/company-operating-system`. Never shows the product name |
| `ProcessSection`, `ProcessTimeline`, `ProcessTimelineStep`, `ProcessStepIcon` | `app/_components/process/` | 5-step timeline drawn on scroll, one short line per step. Each step has a custom 40×40 blueprint line icon (`process-step-icons.tsx`): steel-grey `foreground-soft` strokes plus one red `primary` signal stroke that draws in (`pathLength`) as the progress line reaches that step. Hovering an icon redraws it (`use-icon-redraw.ts`): the outline draws in over 600ms, then the signal stroke follows 300ms later (500ms, `ease-out-expo`). A hover during a redraw is ignored. Strokes stay hidden at zero length so their caps don't leave dots. Data, including each step's `iconName`, is in `app/_lib/process-steps.ts` |

## Service pages (`app/services/_components/`)

`ServicePage` composes `ServiceHero` (title via `ServiceTitleReveal`, copy, the `ServiceScene` in a `ViewfinderFrame`), `ServiceInclusions` (`InclusionsGrid`), an optional `examples` slot and `ServiceUseCases` (`UseCasesList`). The `examples` slot sits outside `page-container` so full-bleed sections keep their own gutters. Web Design passes `<BrowserShowcaseSection spacing="followsSection" />`, the homepage's "Selected websites" section. Each inclusion is `{ label, icon }` in `lib/data/services.ts`, `InclusionCell` renders one grid cell, and `InclusionIcon` draws its custom icon from the stroke data in `app/services/_lib/inclusion-icon-strokes.ts` (20 icons, one per inclusion). The two lists are the client components; the hero and sections stay server components. Each service route renders `PageClosing` after `<main>`, so the CTA and footer share the dithered wave. Service data, including each scene's accessible label (`sceneLabel`): `lib/data/services.ts`.

## Service scenes (`components/service-scenes/`)

Shared because the homepage tiles, the service-page hero and the nav services panel all use them. See `service-scenes.md`.

| Component | Path | Purpose |
|---|---|---|
| `ServiceScene` | `service-scene.tsx` | Picks the scene by service slug. `isActive` pauses playback |
| `SceneStage` | `scene-stage.tsx` | Stage with FIG label, backdrop and a 640×360-unit plane for children |
| `SceneObject`, `SceneChip`, `SceneLabel`, `SceneLed`, `SceneBar`, `raisedObjectStyle` | `scene-parts.tsx` | Square raised objects, status chips, mono labels, LEDs and text bars |
| `SceneLoader` | `scene-loader.tsx` | Square 2×2 loader |
| `AiEnablementScene` | `ai-enablement/` | Agent tile wired to Email, Calendar, Records and Documents, running one task with an approval step |
| `SystemsAutomationsScene` | `systems-automations/` | Enquiry form → router → CRM, Calendar and Email cards, with a run counter |
| `WebDesignScene` | `web-design/` | Browser window that designs itself, with a type/colour card and a go-live chip |
| `CustomWebApplicationsScene` | `custom-web-applications/` | Live dashboard with KPIs, chart, booking toast and role-based views |
