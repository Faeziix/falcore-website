# Falcore Website Docs

Read these before changing the site, and update them after.

- [design-tokens.md](design-tokens.md) — color and theme tokens in `app/globals.css`
- [interactions.md](interactions.md) — motion and interactive effects, including the hero background
- [components.md](components.md) — component registry
- [case-studies.md](case-studies.md) — the `/work` case study pages: frame, per-client theme tokens, page anatomy, capture tool
- [portfolio-and-logos.md](portfolio-and-logos.md) — selected-work screenshots, client logo marquee, founder portrait
- [ui-conventions.md](ui-conventions.md) — layout, typography, colour roles, motion and code organisation
- [service-scenes.md](service-scenes.md) — the animated Clerk/Linear-style object scenes that illustrate each service (current)
- [service-loops.md](service-loops.md) — the retired Kling video loops, kept for reference
- [share-cards.md](share-cards.md) — Open Graph / Twitter images: the HTML template in `scripts/share-cards/`, `bun run share-cards`, and the `buildSocialShareMetadata` helper
- [seo.md](seo.md) — search and AI-engine setup: markets (UAE + US), titles, structured data map, dates and sitemap, robots and llms.txt, speed rules, `bun run seo:check` and `bun run indexnow`, the off-site checklist
- [blog.md](blog.md) — the `/blog` MDX setup, how to add a post, and the writing rules
- [launchpad-screenshots.md](launchpad-screenshots.md) — how the XMA Launchpad screenshots were captured with demo data, and how to re-shoot them

## Testing on a phone

The dev server only serves its client scripts to origins listed in `allowedDevOrigins` (`next.config.ts`). Private LAN ranges (`10.*`, `172.*`, `192.168.*`) and `*.local` are allowed, so open `http://<laptop LAN IP>:<port>` on the phone. If a page shows only static text there (no dither, no descriptions, no marquee), the page hasn't hydrated: check that the address matches one of those patterns.
