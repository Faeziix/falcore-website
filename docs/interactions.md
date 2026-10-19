# Interactions & Motion

## Interactive hero background

`components/ui/interactive-dithering/` renders the homepage hero background (used by `app/_components/hero/hero-section.tsx`) and the wave behind the closing CTA and footer (`WaveCTABackground` in `components/ui/wave-cta.tsx`). It's a raw WebGL2 Bayer dithering shader plus a small smoke/fluid simulation.

Presets (`ditheringPresets` in `dithering-tuning.ts`) set the pattern, Bayer matrix, cell size, speed and colour tokens:

| Preset | Pattern | Look | Where |
|---|---|---|---|
| `hero` (default) | `warp` | Flowing warp lines, 4x4 Bayer, 2px cells, time 0.2 → 0.6 | Hero, 25% opacity, `mix-blend-screen`, bottom fade mask |
| `waveCta` | `wave` | Sine swell that fills the lower half, 8x8 Bayer, 3px cells, time 0.6 → 1.1. Same maths as the old `DitheringShader` wave, so it looks unchanged | Behind the closing CTA and footer, 30% opacity, `mix-blend-screen` |

Each pattern is a GLSL `patternField(cssPoint, cssResolution, t)` in `dithering-shader-sources.ts`, tuned by `warpPatternTuning` / `wavePatternTuning`. Add a pattern there and a preset in the tuning file rather than a second engine. Smoke and wave displacement work the same for every pattern. Over the CTA and footer, the cursor drags the wave surface up and smoke curls off it.

The site is dark-only, so don't use `dark:` variants on these layers. Tailwind v4's `dark:` follows the OS colour scheme, and the old `mix-blend-multiply` light fallback made the wave almost invisible for light-mode visitors.

Behaviour:
- **Base**: the red warp pattern, dithered in 2px cells. Time runs at 0.2 when idle and eases to 0.6 while the pointer is in the hero.
- **Cursor smoke**: moving the cursor drags a fluid wake. The warp lines bend around it like a wave, and wispy dithered smoke curls off the path and fades within about a second. A still cursor emits nothing. Emission scales with cursor speed.
- Everything renders through the same dither cells and ink colour as the base, so the effect stays on-style. No magnified cells, rings or glow. The user rejected the earlier stepped-lens and click-shockwave version as not matching the site's style.

How the smoke works:
- A low-res flow texture (1 texel per 6 CSS px, RGBA16F, ping-ponged) stores velocity (xy) and smoke density (z).
- Each frame the flow pass advects itself, curls the velocity direction with noise (it only rotates, never speeds up), diffuses density, splats the cursor stroke segment in, then decays.
- The display pass samples the flow per dither cell. Velocity displaces the warp lookup (soft-capped), and density times noise wisps adds ink.
- If half-float render targets aren't supported, the flow stays empty and the base pattern renders unchanged.

Files:
| File | Role |
|---|---|
| `dithering-tuning.ts` | Every tunable number (`ditheringTuning`, `warpPatternTuning`, `wavePatternTuning`, `smokeFlowTuning`) plus `ditheringPresets` (pattern + colour token names). Tune here, not in the shaders |
| `dithering-shader-sources.ts` | GLSL for the flow pass and the dithering display pass. Constants are injected from the tuning file |
| `webgl-program.ts` | Compile/link, uniform lookup, fullscreen triangle |
| `create-smoke-flow-pass.ts` | Ping-pong flow textures and framebuffers, flow step |
| `create-dithering-renderer.ts` | Display program, resize, runs the flow step and then draws |
| `create-pointer-field.ts` | Window pointer listeners, smoothing, stroke segment and velocity in canvas UV. Scrolling doesn't emit smoke |
| `use-interactive-dithering.ts` | Wires everything, runs the rAF loop, pauses offscreen (IntersectionObserver) |
| `index.tsx` | `<InteractiveDitheringBackground preset? />` |

Rules:
- Pointer state lives in plain objects updated per frame, not React state.
- `prefers-reduced-motion` renders a single static frame with no smoke.
- The canvas wrapper is `pointer-events-none`. Listeners sit on `window`, so smoke follows the cursor over the hero text and panels.
- Device pixel ratio is capped at 2.

Verify visually with a Playwright script on the real GPU. Use `--use-gl=angle --use-angle=vulkan --enable-features=Vulkan --ignore-gpu-blocklist` for screenshots: with `--use-angle=gl` the contexts run but screenshots show grey placeholder canvases. SwiftShader's low frame rate makes fluid effects look wrong. Sweep the mouse, then screenshot during the sweep and at +400ms and +1200ms.

## General motion

- Motion (`framer-motion`) for React animation. Shared variants are in `lib/motion.ts`.
- Animate only transform and opacity on DOM elements.
- Never add ambient glow for decoration.
