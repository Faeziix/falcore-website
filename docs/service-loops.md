# Service Video Loops

Each service has a 5-second seamless loop. It shows on the homepage services stage and in the service-page hero.

- Output: `public/services/loops/<slug>.mp4` (H.264, faststart), `<slug>.webm` (VP9), `<slug>-poster.jpg`. All are 1280×720, muted.
- Wiring: `lib/data/services.ts` derives `service.loop` from the slug. `LoopingVideo` plays a loop only when it is near the viewport and active.

## Generating

Video is made with **Kling at 720p** (user preference: never HyperFrames).

```bash
bun scripts/generate-service-loops.ts --stage=keyframe [slug…]  # Nano Banana 2.1 still, review first
bun scripts/generate-service-loops.ts --stage=video [slug…]     # Kling 3.0 std (720p) + ffmpeg encode
bun scripts/generate-service-loops.ts --fresh [slug…]           # ignore cached results and regenerate
```

- Prompts and art direction are in `scripts/service-loop-prompts.ts`. The look is a cinematic product still: graphite materials, red and steel used only as small accents, no text or people.
- The loop is seamless because the keyframe is passed as both the first and the last frame (`image_urls: [keyframe, keyframe]`).
- Needs `KIE_API_KEY`. Costs about $0.35 per 5s clip plus about $0.05 per keyframe.
- Results are cached in `scripts/.service-loops/manifest.json` (gitignored). Without `--fresh`, the tool re-downloads and re-encodes instead of paying for a new generation.
- Network gotcha: `tempfile.aiquickdraw.com` (kie's result host) resets connections from this network. The tool converts every result URL with `POST /api/v1/common/download-url` into a Cloudflare R2 link that downloads fine.
