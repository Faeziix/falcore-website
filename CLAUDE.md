@AGENTS.md

# Project: Falcore Website

## Overview
- **Type**: Next.js marketing website (App Router)
- **Stack**: Next.js 16, React 19, Tailwind v4, TypeScript, Motion
- **Package Manager**: bun

## Architecture Decisions
- Homepage sections live in `app/_components/`, with data in `app/_lib/`. Service-page parts live in `app/services/_components/`. Shared primitives (`Button`, `TextLink`, `SectionHeading`, `LoopingVideo`, `ViewfinderFrame`) are CVA/shadcn-style in `components/ui/`.
- The site header is `SiteNavigation` (`components/site-navigation/`), used on every page. Its rules are in `docs/ui-conventions.md` → Navigation.
- Dark-only token system: `--palette-*` primitives map to semantic tokens (`docs/design-tokens.md`).
- The hero background is a custom WebGL2 shader (`components/ui/interactive-dithering/`), not `@paper-design/shaders-react`, because paper's shaders can't take pointer input. See `docs/interactions.md`.

## Preferences & Rules
- Never use HyperFrames. Generate video with Kling at 720p (`scripts/generate-service-loops.ts`, see `docs/service-loops.md`).
- Never name "XMA Launchpad" (or "Launchpad") anywhere on the site: copy, alt text, anchors, image paths or text inside screenshots. Describe it as a company operating system: CRM, project management, an AI studio and finance, on an AI knowledge base that agents act on.
- Copy speaks to non-technical business owners: plain language, outcomes first, "I" not "we" (solo practitioner). Results may cite portfolio outcomes, anonymised.
- Follow `docs/ui-conventions.md` for layout, type, colour roles and motion.
- Read `docs/` before changing anything, and update it afterwards.
- Colours come from tokens in `app/globals.css`, including shader colours, which are read with `readCssColorToken()`.

## Learnings & Corrections
- ❌ Product screenshots exported at 1600px / q82 and served at next/image's default q75; the user said the quality was low → ✅ Export large UI screenshots at their full 2× capture size (q90) and pass `quality={90}` (allowed in `next.config.ts` `images.qualities`). Size the source for the displayed width × 2.
- ❌ Homepage redesign (2026-10-19) packed every section with copy, figures, bullets, tabs and side notes; the user called it "messy, super unprofessional… so much content… very overwhelming" → ✅ One idea per section, at most a sentence or two of copy, big quiet imagery, generous whitespace. Cut before adding. Never use stale product screenshots; XMA Launchpad changes fast, so recapture from the current system.
- ❌ Rewrote `app/globals.css` wholesale and wiped tokens another session had just added → ✅ Edit shared files (`globals.css`, `page.tsx`, `docs/`) with targeted edits only, and re-read them right before editing.
- ❌ `cn()` silently dropped custom `text-display-*` sizes next to a text colour → ✅ Register custom font sizes in the `extendTailwindMerge` config in `lib/utils.ts`.
- ❌ Overwrote images in place and `next/image` kept serving cached old versions → ✅ Give replaced assets a new path.
- ❌ A logo request based on a stale screenshot nearly triggered a needless AI regeneration → ✅ Check what the live server actually renders before redoing assets.
- ❌ The hero cursor effect used stepped magnified dither cells and click shockwave rings, and the user said it didn't match the style → ✅ Cursor interaction is a soft smoke/wave trail rendered through the same fine dither as the base pattern. Keep interactive effects organic and on-style, never chunky or gimmicky.
- ❌ Judging WebGL fluid effects in SwiftShader (low fps) → ✅ Run headless Chromium on the real GPU with `--use-gl=angle --use-angle=gl --ignore-gpu-blocklist`.
- ❌ Screenshotting WebGL with `--use-angle=gl` (2026-10-19): contexts ran but every canvas captured as a grey placeholder → ✅ Use `--use-gl=angle --use-angle=vulkan --enable-features=Vulkan --ignore-gpu-blocklist` for screenshots.
- ❌ Building a second shader engine for a new surface → ✅ The interactive dithering engine takes presets (`hero` warp, `waveCta` wave). Add a pattern + preset in `components/ui/interactive-dithering/`.
- ❌ Asked to make the footer interactive, I added a second wave layer inside `Footer`; the user said there was already a background → ✅ The CTA + footer share `WaveCTABackground`. Make existing backgrounds interactive in place, don't stack new ones.
- ❌ Assuming the shared dev server reflects only your own change → ✅ Other sessions edit this repo at the same time. If an unrelated module breaks the Turbopack build, test the component in isolation (`bun build` a small entry, then drive it with Playwright) and don't touch the other work.

- ❌ Fetching portfolio screenshots live from a screenshot API (microlink) → ✅ Capture them once with `scripts/capture-showcase-screenshots.ts` and serve them from `public/showcase/`.
- ❌ Bun-only APIs (`import.meta.dir`, `Bun.*`) in `scripts/*.ts` → ✅ `tsc` type-checks `scripts/` too. `@types/bun` is now a dev dependency (added 2026-10-19 for `generate-service-loops.ts`), so Bun APIs type-check. Keep it installed if a script uses `Bun.*`/`import.meta.dir`.
- ❌ Hero system-graph illustration (`LiveOperationsPanel`); the user said "it's really bad" → ✅ The hero is typography over the dithering background with no illustration. Don't add diagram or illustration panels to the hero again without asking.
- ❌ Service loops built from invented abstract objects (glass slab, toy conveyor, fake tablet and console screens); the user called them "buggy and meaningless" → ✅ Service films show real places where a system does the work on its own (aviation and operations scenes), shot like a documentary brand film. Never put screens or UI in AI video, because it wobbles and morphs them. Let the user approve concept stills before paying for video.
- ❌ Section headings with the intro in a separate column to the right of the title, and some sections with no intro; the user said "I hate that the description is not under the title" → ✅ `SectionHeading` stacks the intro directly under the title, and `intro` is a required prop. Keep intros to one short sentence.
- ❌ Mobile "Selected websites" as a sticky section that hijacked vertical scroll to move cards sideways; the user called it buggy → ✅ Plain swipe carousel (`MobileShowcaseCarousel`): native horizontal scroll with snap, the next card peeking, a counter and prev/next buttons. Don't drive horizontal movement from page scroll.
- ❌ Mobile carousel with arrows in a bar under the cards, strict `snap-mandatory` snapping, and flex cards that came out uneven in Firefox; the user hated all three → ✅ Arrows go top right, beside the section intro (`SectionHeading` `actions`); carousels are JS-driven via the `Carousel` primitive (Embla), not CSS scroll-snap: the user asked for that explicitly. Keep one card per swipe (`skipSnaps: false`) with a drag threshold so small drags spring back. Test carousels in Firefox too (`bunx playwright install firefox`), since the user tests in Firefox. Firefox has no `text-wrap: pretty`, so use `text-balance` to avoid a lone last word in short intros.
- ❌ Making client logos legible on dark with a global CSS filter → ✅ Logos keep their brand colours. Fix each unreadable logo in its asset (see `docs/portfolio-and-logos.md`).

- ❌ Nav underline sat on the bar's bottom edge, far below the label ("the gap… is too much") → ✅ Keep indicators about 2px under the label.
- ❌ Replaced the plain hover line with a dithered "contrail" band; the user hated it "vehemently… too overdesigned" → ✅ Nav hover and press are simple micro-interactions: an underline that draws from the left and a 0.97 press scale. Don't bring the hero's dither texture or other decoration into UI chrome. When the user says something is "simplistic", improve the feel (timing, direction, press feedback) before adding visual texture.
- ❌ The services menu opened on click only → ✅ The user wants nav menus to open on hover, with hover intent and a close delay. Click stays as the fallback for touch and keyboard.
- ❌ Turbopack's watcher sometimes misses a `globals.css` written by a script, and keeps serving the old CSS chunk → ✅ After scripted CSS edits, check the served chunk (`curl` the page's CSS link). If it's stale, make a real edit with the Edit tool. Don't restart the shared dev server.

## Component Registry
See `docs/components.md`.
