# Service Scenes

Each service is illustrated by an animated object scene, built in code. They appear in the homepage "What I build" tiles, the service-page hero (inside a `ViewfinderFrame`) and the nav services panel.

## Direction (user-approved, 2026-10-19)

- Modelled on clerk.com's feature cards with linear.app's restraint. The user picked these two sites after rejecting video loops, documentary realism, dithered abstractions, blueprint sheets (too busy) and flat AI icons (too simple).
- One crafted scene per service, made of a few real-looking parts: raised, softly shaded objects, thin connector wires with small nodes, a mono status chip with a loader, and one falcon-red live signal. Steel blue (`accent`) appears only for a human approval moment.
- **Square, never rounded.** The site has no rounded corners, so the scenes have none either: square tiles, chips, LEDs, avatars and swatches, a square 2×2 loader, sharp orthogonal wire elbows, straight-segment chart lines, square line caps.
- **Fully animated.** Every part of a scene takes part in one choreographed story loop of about 10 s. A single moving detail is not enough.
- Complete at rest: the server render and reduced motion show a full, representative frame.

| Service | Story |
|---|---|
| AI Enablement (`FIG 01 · AGENT`) | A task arrives at the agent. It reads Records, drafts 14 quotes in Documents (counter and growing sheet stack), waits in steel blue for the owner's OK on Email, then books calls in Calendar. Ends on "Goal met · 14 renewals" |
| Systems & Automations (`FIG 02 · WORKFLOW`) | A "New enquiry" form fills itself and submits. The router scores it ("Score 82 · high intent"), then the lead flows to CRM ("Contact added"), Calendar ("Slot held") and Email ("Welcome sent"). A run counter increments each loop |
| Web Design (`FIG 03 · SITE`) | Layout guides flash in, the headline types, media wipes in, the cursor picks a typeface and a colour, clicks the button, and the chip goes from "Building" to "Live · loads in 0.8s · perf 100" |
| Custom Web Applications (`FIG 04 · APP`) | KPIs count up, the chart draws point by point, a "New booking" toast slides in, team avatars appear and the view switches Admin → Staff → Client while the dashboard adapts, and the chip goes from "Syncing" to "Synced" |

## Code

`components/service-scenes/` (shared, because three placements use it).

| File | Role |
|---|---|
| `service-scene.tsx` | `<ServiceScene slug label isActive />` picks the scene by slug. `isActive` pauses playback (the nav plays a scene only while hovered) |
| `scene-stage.tsx` | `SceneStage`: the stage (`role="img"`, `aria-label`, FIG label, backdrop gradient). Its children sit on a 640×360-unit plane, vertically centred, so HTML parts and `viewBox="0 0 640 360"` SVG wires share one coordinate system even when the container is not exactly 16:9 |
| `scene-units.ts` | `SCENE_WIDTH`/`SCENE_HEIGHT` and `sceneUnits(n)` (`calc(n * var(--scene-unit))`, where the unit is 1/640 of the stage width), so scenes scale with their tile |
| `scene-parts.tsx` | `SceneObject` (square raised object, `isLive` gives a red edge), `raisedObjectStyle()`, `SceneChip`, `SceneLabel`, `SceneLed`, `SceneBar` |
| `scene-loader.tsx` | `SceneLoader`: square 2×2 loader |
| `use-scene-playback.ts` | `useScenePlayback(isActive)` (plays only near the viewport, when active and without reduced motion) and `useSceneBeat()` (story step index; resets to the start when playback stops) |
| `ai-enablement/`, `systems-automations/`, `web-design/`, `custom-web-applications/` | One folder per scene: a story/layout data file, small part components and scene-local hooks |

Rules:
- Colours come from tokens only: token classes or the `--scene-*` variables in `app/globals.css` (`--scene-backdrop-*`, `--scene-object-top/bottom/edge/highlight/shadow`, `--scene-inset`). No hex values.
- No ambient glow or coloured halos. The shared drop shadow under raised objects is the only shadow.
- Discrete story steps use beats; continuous movement (pulses along wires, typing, counters) writes to refs or motion values, not React state every frame.
- Markup must be deterministic (no `Math.random`/`Date` in render, rounded trig) to avoid hydration mismatches.
- Each scene folder was built by its own agent and passed an independent visual and code review. Known minor follow-ups: small labels are hard to read on the phone tile (about 5 px), and colour cross-fades at hand-offs can briefly show two red elements.

## History

- Code-drawn blueprint sheets (`components/service-blueprints/`, removed 2026-10-19; see git history) replaced the Kling video loops and were then replaced by these scenes.
- The Kling video loops are retired (see `service-loops.md`).
