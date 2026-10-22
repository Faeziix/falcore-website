# Portfolio showcase and client logos

## Selected work (`BrowserShowcaseSection`)

- Data: `lib/data/showcase-websites.ts` (`SHOWCASE_WEBSITES`). The order there is the order on the site.
- Current order: DiaMaria, XMA Media (xmamedia.ai, the agency's main site since October 2026; it replaced the xma.ae entry), ConvoFlow, Timeless Touch Ceramics, Sanaa Ouahmane, Corpofino.
- Cards open the site's case study (`/work/<slug>`); the live URL lives on the case study's facts row and in the desktop address bar.
- Removed on request: XMA Car Rental, eBox Pro, Uptown Car Rental. Don't add them back.
- Screenshots are static files in `public/showcase/<id>-v<screenshotVersion>-desktop.jpg` (1280×800 viewport) and `-mobile.jpg` (414×736 viewport, 9:16), both captured at 2x. The mobile carousel cards are 9:16 too (`aspect-9/16`), so the whole phone screenshot shows uncropped. Nothing is fetched live (the old microlink.io URLs are gone, along with their `next.config.ts` remote pattern).

### Refreshing screenshots

```bash
bun run scripts/capture-showcase-screenshots.ts          # every site
bun run scripts/capture-showcase-screenshots.ts xma sanaa  # only these ids
bun run scripts/capture-showcase-screenshots.ts --mobile-only  # phone shots only, desktop untouched
```

The script opens each URL in headless Chromium (Playwright) and waits 6s for intro animations. It clicks away cookie banners (Decline/Accept/…) before shooting. Check the output visually afterwards; some sites fade their header in late.

### Adding a site

1. Add an entry `{ id, title, summary, externalUrl, caseStudySlug }` to `showcaseEntries` in `lib/data/showcase-websites.ts`. `summary` is one short line saying what the business is (taken from the site's own title or meta description). Cards link to `/work/<caseStudySlug>`, so the site needs a case study first (see `case-studies.md`).
2. Run the capture script with that id.

### Replacing a site's screenshot

Bump that entry's `screenshotVersion` (it defaults to 1), run the capture script with its id, and delete the old `-v<n>` files. To replace only the phone shot, bump `mobileScreenshotVersion` instead (it defaults to `screenshotVersion`) and run with `--mobile-only`. Don't overwrite a screenshot in place: `next/image` caches by URL and would keep serving the old image.

Live URLs: Sanaa is on `www.sanaaouahmane.com`. Corpofino has no custom domain yet, so it uses its Vercel URL (`corpofino-web.vercel.app/en`). Swap it when the domain goes live, then re-capture.

## Client logos (`ClientLogoSection`)

- Data: `lib/data/client-logos.ts` (`CLIENT_LOGOS`). Files are in `public/client-logos/on-dark/`. When you replace a logo, give the new file a new path (folder or name), don't overwrite it in place. `next/image` caches optimized images by URL, so overwriting a file keeps serving the old version (this happened on 2026-10-19: recoloured logos still showed dark until the folder was renamed).
- Covers brands we built websites for, from `~/Work/projects/XMA Projects/clients`, the internal XMA website and `~/Work/XMA`. Excluded: eBox, Uptown, XMA Car Rental, Apollo (icon only, parked domain), KHH (not a website), Luxury Supercars Dubai, Autonation, Packman, BaggageTAXI (removed 2026-10-22 at the user's request).
- Rendering: logos show in their original brand colours. There is no global CSS filter. Each file is a dark-background variant (the site is dark-only, `--background` #15171a): near-black or neutral pixels are recoloured to off-white, dark brand colours keep their hue but are lightened, and vivid colours stay as they are. A logo that would disappear on #15171a needs a fixed asset, not a CSS filter.
- Marquee (`components/ClientLogoSection/LogoMarquee.tsx`) is ported from `LogoBand` in `xma-ai-video-creator/app/_ui/logos.tsx`: two rows scrolling in opposite directions, CSS-only, paused on hover/focus. Styles and tokens (`--logo-mark-opacity`, `--logo-mark-hover-opacity`, `--logo-marquee-duration`) are in the logo block at the end of `app/globals.css`.
- Sizing: each mark is sized to roughly the same visual area (`TARGET_LOGO_AREA_PX`), capped by `MAXIMUM_LOGO_HEIGHT_PX`/`MAXIMUM_LOGO_WIDTH_PX`, then scaled to 75% on mobile. So `width`/`height` in the data are only the intrinsic file size, used for the aspect ratio.

## Founder portrait

`public/founder-portrait.jpg` is resized from `~/Pictures/profile/studio-final-orange.jpg` (1200×1490). Used in `components/about-founder.tsx` and `app/about/page.tsx`.
