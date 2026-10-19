# Service Blueprints

Each service is illustrated by an animated blueprint sheet: a hairline technical drawing on graphite, drawn in code (SVG, plus CSS 3D for two sheets). These replaced the Kling video loops on 2026-10-19 after the user rejected the videos as "buggy and meaningless" and turned down documentary, dithered and product-screenshot directions.

## Direction (user-approved)

- Conceptual and abstract, but each sheet shows its service's own subject: an agent at work, a workflow, a landing page, a dashboard. No physical metaphors (machines, aircraft) and no real client work.
- One visual language: 40px drafting grid, sheet frame with a title block (`FALCORE / <SERVICE>`, `SHEET 0n / 04`), mono labels naming the parts, plain-English titles a business owner can read. Falcon red marks the one live thing. Steel blue is only for human/safety information (the approval badge, the retry path).
- More sophistication comes from real operational detail (timings, branches, retries, run stats, traces), not more decoration.

| Service | Sheet | What moves |
|---|---|---|
| AI Enablement | Agent run: goal + plan with progress, a PLAN → ACT → OBSERVE → CHECK loop, six tools, a trace log, a stack of finished quotes, a "needs your OK" approval step | The loop's active stage cycles every 1.1s; each full loop writes one more quote (9 → 14, then repeats), which updates the progress bar, the Documents tool, the trace and the output stack |
| Systems & Automations | Swimlanes per tool (forms, CRM, calendar, email, accounting, team chat) on a tilted plane, two workflows (enquiry → booked call, Monday invoice chase), skipped branch, retry path, live payload panel, run stats | A red packet travels the live edge every 1.8s; each trip bumps the run counter and the elapsed time |
| Web Design | Awwwards-style hero ("FORM / follows feeling", wireframe sphere) with a red construction layer: 12-column grid, cap/base lines, spacing dimensions, φ circle | The sphere turns (meridian widths animate) with a red marker orbiting; the dashed type guides march |
| Custom Web Applications | A dashboard exploded into INTERFACE / LOGIC / DATA layers in CSS 3D | Layers breathe apart and back; the red revenue line redraws |

## Code

`components/service-blueprints/` (shared: used by the homepage tiles, the service-page hero and the nav services panel).

| File | Role |
|---|---|
| `service-blueprint.tsx` | `<ServiceBlueprint slug label framing="sheet" \| "focus" isActive />`: picks the scene by slug. `sheet` shows the whole sheet (service hero), `focus` crops to the action (homepage tiles, nav) |
| `blueprint-sheet.tsx` | Draws the 1600×900 canvas, scales it to its container (`useElementWidth`) and applies the framing crop. Takes `drawing` (SVG), optional `spatialLayer` (HTML in a 2600px perspective, for CSS 3D planes) and `foreground` (SVG above the 3D layer) |
| `blueprint-sheet-chrome.tsx` | Background, drafting grid, sheet frame and title block |
| `blueprint-label.tsx` | `BlueprintLabel` (mono, tracked) and `BlueprintText` (Instrument Sans) for SVG text |
| `blueprint-canvas.ts` | Canvas size, framing type, tone → `stroke-*`/`fill-*` class maps, `roundForSvg()` |
| `use-blueprint-playback.ts` | `useBlueprintPlayback` (plays only near the viewport, when `isActive` and without reduced motion) and `useStepCounter` |
| `ai-enablement/`, `systems-automations/`, `web-design/`, `custom-web-applications/` | One folder per scene: a data/layout file plus small part components |

Rules:
- Colours are token classes only (`stroke-foreground`, `stroke-muted-foreground`, `stroke-border-strong`, `stroke-border`, `stroke-primary`, `stroke-accent`, `fill-blueprint-paper`, `fill-background`). No hex values.
- Every sheet is complete at rest. Under reduced motion, or off screen, it shows the approved still (AI loop on ACT, quote 9 of 14; packet mid-edge; sphere at rest).
- Continuous motion (packet, sphere) writes SVG attributes from `useAnimationFrame` through refs, so React doesn't re-render every frame. Discrete steps use `useStepCounter`.
- Round any `Math.sin`/`Math.cos` value that ends up in server-rendered markup with `roundForSvg()`. The last digits differ between Node and the browser and cause a hydration mismatch.
- Give Motion elements an `initial` value when they animate keyframes on SVG attributes, or Motion warns that it is animating from `undefined`.
- Fonts in the sheets: `font-mono` (labels), `font-sans` (titles), `font-display` (KPI numbers, the "FORM" headline) and `font-serif-display` (Instrument Serif italic, only for the web design headline).

The design was prototyped as static scripts before porting (session scratchpad, not in the repo). Tune positions in the scene's data/layout file, not inline.

## Retired: video loops

`components/ui/looping-video.tsx`, `scripts/generate-service-loops.ts`, `scripts/service-loop-prompts.ts` and `public/services/loops/` are no longer used by any page. They are kept until the user decides whether to delete them. See `service-loops.md` for how they were made.
