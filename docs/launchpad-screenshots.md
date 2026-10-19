# XMA Launchpad Screenshots

The homepage Launchpad section (`app/_components/launchpad/`) shows four screenshots from `public/work/company-os/`: `knowledge-assistant.webp` (a seeded Assistant conversation at `/assistant/<id>`, citing a meeting, a production room, onboarding answers, the Brain, a WhatsApp digest and a PDF; no live AI call), `v2/studio-director.webp` (a seeded Studio brief with the AI director's three-shot edit), `pipeline.webp` and `meetings.webp`. All four use **invented demo data only** (captured 2026-10-19). The old `generate.webp` was removed: it showed a real client's logo, products and AI spend. More demo captures for the case study live in `public/work/company-os/v2/`.

Launchpad changes fast. Re-shoot when the screens drift. Never capture from a running Launchpad dev server (:3000, :3100): those point at production copies with real client data.

## Demo environment (kept for re-shoots)

| Piece | Where |
|---|---|
| Neon branch | `demo-screens-2026-10-19` (project `calm-field-45391280`). Created with `--schema-only`, so no production rows were ever copied |
| Worktree | `XMA-launchpad/.claude/worktrees/demo-screens`, local branch `demo-screens` (not pushed) |
| Seed | `<worktree>/scripts/dev-database/seed-marketing-demo.ts --reset-demo-branch`. Invented user "Rowan Ellery", 32 leads in USD, 5 fictional clients, one meeting with notes, a Brain record and a 12-shot studio brief |
| Run | From the worktree, on `PORT=3200`, with `DATABASE_URL=<demo branch>`, `XMA_AUTH_BYPASS=1`, and **always** `XMA_AUTH_BYPASS_EMAIL=dev@example.invalid` (without it the bypass falls back to a real admin) |

The capture script hides the hard-coded XMA wordmark and logo, and checks every shot for "XMA" and internal domains. Capture at 1600×1000 with device scale 2, dark theme. Then convert with `magick <png> -resize 1600x1000 -quality 82 <name>.webp`.

## Rules

- Never screenshot Vault, finance/admin or staff-usage pages.
- Before publishing, check every image for real client, staff or money data.
- Save replacements under a new file name or folder, not over the old files, because `next/image` caches by URL.
- **Quality:** export at full 2× capture resolution, pre-cropped to the 16:9 frame (`magick in.png -gravity north -crop 3200x1800+0+0 +repage -quality 90 out.webp`). The component passes `quality={90}`, which `next.config.ts` allows via `images.qualities: [75, 90]`. A 1600px export looked soft on retina screens, because the frame is about 920 CSS px wide (1,840 device px).
