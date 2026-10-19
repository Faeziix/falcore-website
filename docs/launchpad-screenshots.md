# XMA Launchpad Screenshots

The homepage Launchpad section (`app/_components/launchpad/`) shows four screenshots from `public/work/launchpad/v2/`: `studio.webp`, `pipeline.webp`, `meetings.webp` and `brain.webp`. They were captured on 2026-10-19 from the current app, with **invented demo data only**.

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
- Save replacements to a new folder (`v3/`), not over the old files, because `next/image` caches by URL.
