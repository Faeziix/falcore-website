# Share cards (Open Graph / Twitter images)

The images that show up when someone pastes a Falcore link into Discord, Slack, WhatsApp, LinkedIn or X.

## How they're built

The cards are HTML, so the copy can be changed without regenerating anything:

- `scripts/share-cards/share-cards.html`: every card, 1200×630, with the copy in the `SHARE_CARDS` array at the bottom. Open it in a browser to preview them all. The text is also editable in place for a quick look, but those edits aren't saved.
- `scripts/share-cards/backgrounds/<name>.jpg`: one AI-generated background plate per card (2400×1260, no text). A card uses the plate with its own name unless it sets `background: "<other plate>"`.
- `scripts/share-cards/falcon-mark.png`: the real logo mark (blue eye included), trimmed from `public/logo-transparent.png`. Never let AI redraw the logo: it drops the eye.
- `bun run share-cards` (`scripts/render-share-cards.ts`) screenshots each card with Playwright into `public/og/<name>.png` (lossless master, about 650 KB) and `public/og/<name>.jpg` (q90, about 130 KB). The site serves the JPG, since some apps (WhatsApp) skip large preview images. `bun run share-cards about contact` re-renders just those cards.

Card fields: `name` (output file and default plate), `eyebrow` (optional small uppercase label), `headline`, `headlineSize` (`"large"` for the homepage card, otherwise regular), `background` (optional plate name). Hyphenated words never break across lines.

Layout: falcon mark and the FALCORE wordmark (Oxanium 700) top left; the eyebrow in Source Code Pro, uppercase, brick red; the headline in Oxanium 500, at most 800px wide so it stays off the smoke; "Websites · Custom apps · AI systems" and "falcoretech.com" along the bottom in Instrument Sans. Colours are tokens on the page's `:root`. The `--palette-*` values are copied from `app/globals.css`, so update both if the palette changes.

## Cards

| Card | Used by | Eyebrow / headline |
|---|---|---|
| `default` | Root layout: homepage and any page without its own card (e.g. `/privacy`) | The technical arm your business is missing. |
| `services` | `/services` | Services / Four ways I take manual work off your team. |
| `ai-enablement`, `systems-automations`, `web-design`, `custom-web-applications` | `/services/<slug>` (card name = service slug) | Service name / the service lead, shortened |
| `work` | `/work` | Work / Websites, apps and AI systems, and what they changed. |
| `about` | `/about` | About / You talk directly to the person who builds it. |
| `contact` | `/contact` | Contact / Let's talk about your project. |

Case studies use their own `coverImage` (`/work/<slug>/thumbnail-*.webp`) as the share image.

## Code

`lib/social-share-metadata.ts`:

- `generatedShareCard(cardName, alt)` returns `/og/<cardName>.jpg?v=<revision>` at 1200×630.
- `buildSocialShareMetadata({ title, description, path, image })` returns matching `openGraph` and `twitter` blocks. Spread it into a page's `metadata`.

Rules:

- Next.js merges metadata **shallowly**. A page that sets `openGraph` replaces the root's whole `openGraph`, image included. A page that sets nothing inherits the homepage's title. So every page with its own title sets its own share metadata through the helper.
- The `%s | Falcore` title template does **not** apply to `og:title`/`twitter:title`. Pass the full share title (`"Services | Falcore"`).
- After re-rendering cards, bump `GENERATED_SHARE_CARD_REVISION`. Social platforms cache share images by URL, so the same URL keeps showing the old card.
- New page or service: add an entry to `SHARE_CARDS` (and a plate, or point `background` at an existing one), run `bun run share-cards`, then call `generatedShareCard("<name>", alt)` in the page's metadata.

## Making a new background plate

Plates were made on 2026-10-20 with `gen -m pro -a 16:9 -s 2K`. First a full card was generated from a live-hero screenshot. Then `gen` was asked to "remove every piece of text, the logo mark and the wordmark; keep the background exactly". The result was centre-cropped to 1.91:1 and resized to 2400×1260:

```bash
magick plate.png -gravity center -crop 2752x1445+0+0 +repage -resize 2400x1260! -strip -quality 86 scripts/share-cards/backgrounds/<name>.jpg
```

Check every plate at full size. Text removal sometimes leaves a letter or two behind, and asking again shifts the colours toward purple. Paint leftovers in the plain dark area out with the sampled background colour (`magick … -fill "rgb(r,g,b)" -draw "rectangle …"`) instead.
