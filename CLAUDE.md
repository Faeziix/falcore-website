@AGENTS.md

# Project: Falcore Website

## Overview
- **Type**: Next.js marketing website (App Router)
- **Stack**: Next.js 16, React 19, Tailwind v4, TypeScript, Motion
- **Package Manager**: bun

## Architecture Decisions
- Homepage sections live in `app/_components/`, with data in `app/_lib/`. Service-page parts live in `app/services/_components/`. Shared primitives (`Button`, `TextLink`, `SectionHeading`, `ViewfinderFrame`) are CVA/shadcn-style in `components/ui/`. Service illustrations are animated Clerk/Linear-style object scenes in `components/service-scenes/` (see `docs/service-scenes.md`); the blueprint sheets and video loops are retired.
- The site header is `SiteNavigation` (`components/site-navigation/`), used on every page. Its rules are in `docs/ui-conventions.md` → Navigation.
- Dark-only token system: `--palette-*` primitives map to semantic tokens (`docs/design-tokens.md`).
- The hero background is a custom WebGL2 shader (`components/ui/interactive-dithering/`), not `@paper-design/shaders-react`, because paper's shaders can't take pointer input. See `docs/interactions.md`.

## Preferences & Rules
- Never use HyperFrames. Generate video with Kling at 720p (`scripts/generate-service-loops.ts`, see `docs/service-loops.md`).
- Never name "XMA Launchpad" (or "Launchpad") anywhere on the site: copy, alt text, anchors, image paths or text inside screenshots. Describe it as a company operating system: CRM, project management, an AI studio and finance, on an AI knowledge base that agents act on.
- Copy speaks to non-technical business owners: plain language, outcomes first, "I" not "we" (solo practitioner). Results may cite portfolio outcomes, anonymised.
- Follow `docs/ui-conventions.md` for layout, type, colour roles and motion.
- Every booking CTA reads "Book a consultation call" (the user's wording, 2026-10-19), not "Book a free call". Change it in `BookCallButton` only, and render every booking button through that component.
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
- ❌ Round 2 of service visuals (2026-10-19): documentary realism ("too far from the concepts"), dithered abstractions ("vague and meaningless"), physical-object blueprints, and real portfolio screenshots were all rejected → ✅ Direction is now **blueprint line style, conceptual and abstract**: each service shows its own subject as an idealised blueprint (custom apps → a dashboard, web design → an Awwwards-grade layout, automations → a workflow, AI → an abstract agent at work), not physical metaphors and not real client work.
- ❌ Blueprint sheets shipped with CSS 3D tilted planes, cropped "focus" framing in tiles, and one small looping detail each; the user said they should be flat, they were "being cut out", and the animations were "really narrow" → ✅ Blueprints are flat 2D (no perspective/tilt), always show the whole sheet uncropped in every placement, and animate every part of the sheet as one choreographed story, not a single moving detail.
- ❌ Code-drawn blueprint sheets packed with labels, timings, traces and panels; the user said "so much detail that makes it busy" → ✅ Service illustrations give the big picture: a few large shapes, one idea, no small text. The user chose to generate them with Nano Banana 2.1 (flat blueprint line style, one red accent) instead of drawing them in code.
- ❌ Big-picture flat blueprint icons from Nano Banana; the user said "now it's too simple… I completely hate this" → ✅ (2026-10-19) Direction is documentary-realism style (cinematic, photographic, real light and materials) but abstract, not concrete objects or places. The user picks Pinterest references per service before anything is generated.
- ❌ Pinterest abstract light/sculpture/architecture photography as references; the user said "they are outside of my industry" → ✅ Take visual inspiration from top-of-class websites in Falcore's own world (dev tools, AI/automation products, award-winning digital studios), captured live, not from generic mood imagery.
- ✅ (2026-10-19) The user loves clerk.com and linear.app. Service visuals are built in that language (`components/service-scenes/`): one crafted object scene per service, Linear-level restraint, built in code.
- ❌ The Clerk-style prototype used rounded objects and only partly animated; the user said "My website is not rounded. The illustrations are" and "animations are not fully done" → ✅ Scenes are fully square (tiles, chips, LEDs, loaders, sharp wire elbows) and every part takes part in one ~10 s story loop.
- ❌ Scene wires used fixed SVG stroke widths (and AI Enablement `crispEdges`), so on small tiles and the nav panel the lines vanished; the user said "ai enablement lines are not visible on smaller screens" → ✅ Set scene line widths with `sceneStroke()`, which thickens them on small stages, Base wires use `stroke-border-strong`, since `stroke-border` was still "hidden" at nav size. Check scenes at 390px and in the nav panel.
- ✅ (2026-10-19) The user wants the AI Enablement agent to show the familiar AI sparkle icon, animated while it works.
- ❌ AI Enablement sheet showing "messy input → model → filled form"; the user said the input was "simplistic and beginner looking" and it lacked agentic behaviour → ✅ AI Enablement visuals show an agent doing real tasks: a goal, a plan with progress, a plan/act/observe/check loop, the tools it calls, an action trace, finished output, and a human approval step.
- ❌ Section headings with the intro in a separate column to the right of the title, and some sections with no intro; the user said "I hate that the description is not under the title" → ✅ `SectionHeading` stacks the intro directly under the title, and `intro` is a required prop. Keep intros to one short sentence.
- ❌ Mobile "Selected websites" as a sticky section that hijacked vertical scroll to move cards sideways; the user called it buggy → ✅ Plain swipe carousel (`MobileShowcaseCarousel`): native horizontal scroll with snap, the next card peeking, a counter and prev/next buttons. Don't drive horizontal movement from page scroll.
- ❌ Mobile carousel with arrows in a bar under the cards, strict `snap-mandatory` snapping, and flex cards that came out uneven in Firefox; the user hated all three → ✅ Arrows go top right, beside the section intro (`SectionHeading` `actions`); carousels are JS-driven via the `Carousel` primitive (Embla), not CSS scroll-snap: the user asked for that explicitly. Keep one card per swipe (`skipSnaps: false`) with a drag threshold so small drags spring back. Test carousels in Firefox too (`bunx playwright install firefox`), since the user tests in Firefox. Firefox has no `text-wrap: pretty`, so use `text-balance` to avoid a lone last word in short intros.
- ❌ Making client logos legible on dark with a global CSS filter → ✅ Logos keep their brand colours. Fix each unreadable logo in its asset (see `docs/portfolio-and-logos.md`).

- ❌ Nav underline sat on the bar's bottom edge, far below the label ("the gap… is too much") → ✅ Keep indicators about 2px under the label.
- ❌ Replaced the plain hover line with a dithered "contrail" band; the user hated it "vehemently… too overdesigned" → ✅ Nav hover and press are simple micro-interactions: an underline that draws from the left and a 0.97 press scale. Don't bring the hero's dither texture or other decoration into UI chrome. When the user says something is "simplistic", improve the feel (timing, direction, press feedback) before adding visual texture.
- ❌ The header slid away on downward scroll and returned on upward scroll → ✅ The header is fixed to the top and always visible. Never hide it on scroll.
- ❌ The services menu opened on click only → ✅ The user wants nav menus to open on hover, with hover intent and a close delay. Click stays as the fallback for touch and keyboard.
- ❌ Turbopack's watcher sometimes misses a `globals.css` written by a script, and keeps serving the old CSS chunk → ✅ After scripted CSS edits, check the served chunk (`curl` the page's CSS link). If it's stale, make a real edit with the Edit tool. Don't restart the shared dev server.
- ❌ Service inclusion icons redrew via `whileHover`, so leaving the cell early froze the icon half drawn; the user said the animation shouldn't depend on how long they hover → ✅ Hover-triggered draw animations are one-shot: start on pointer enter, always play to the end, and ignore re-entry until finished (`useIconRedraw` in `app/services/_components/`).
- ❌ The calm homepage had booking buttons only in the hero and the closing CTA; the user said it "lacks in CTAs" → ✅ Restraint applies to copy, not to the path to booking. Close key sections with a `SectionCallToAction` (one short line + `BookCallButton`) and put a button under the founder bio. Placement rules are in `docs/ui-conventions.md` → Calls to action.

## Component Registry
See `docs/components.md`.
