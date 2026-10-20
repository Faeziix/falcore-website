# Case Studies

Every project shown on the site has a case study at `/work/<slug>`, listed on `/work`. Read this and `ui-conventions.md` before changing one.

## Concept: Falcore is the frame, the client is the film

The site chrome stays Falcore's (dark hangar background, Oxanium, hairlines, the nav, `PageClosing`). Inside `<main data-case-study="<slug>">` the page switches to the client's own world: its paper colour, ink, accent and display typeface, through scoped `--case-*` tokens. So each case study looks like the client while still reading as Falcore's work. Each one also has **one signature moment**, a bespoke visual or interaction that only that project could have. Everything around it stays quiet.

## Routes and files

| Path | What |
|---|---|
| `app/work/page.tsx` | Index of all case studies (`CaseStudyIndexList`) |
| `app/work/_lib/case-study-index.ts` | `CASE_STUDIES` (order on the site), `caseStudyPath`, `findCaseStudy`, `findNextCaseStudy` |
| `app/work/_lib/case-study-types.ts` | `CaseStudySummary`, `CaseStudyImage`, `CaseStudyOutcome` |
| `app/work/_lib/case-study-metadata.ts` | `buildCaseStudyMetadata(summary)` for each page's `metadata` |
| `app/work/_components/` | Shared frame: `CaseStudyLayout`, `CaseStudyHero`, `CaseStudyChapter`, `CaseStudyFigure`, `CaseStudyOutcomes`, `NextCaseStudy`, `CaseStudyIndexList` |
| `app/work/<slug>/page.tsx` | The case study. Short: it composes sections only |
| `app/work/<slug>/_lib/case-study-summary.ts` | The summary used by the index, the hero and the next-study link |
| `app/work/<slug>/_lib/*.ts` | That study's content data (chapters, outcomes, image lists) |
| `app/work/<slug>/_components/` | That study's bespoke sections, including its signature moment |
| `app/work/<slug>/case-study-theme.css` | That study's `--case-*` token values, scoped to `[data-case-study="<slug>"]`, imported by its `page.tsx` |
| `public/work/<slug>/` | Its images. Never overwrite a file; add a new name (`next/image` caches by URL) |

Slugs: `company-operating-system`, `diamaria`, `xma-agency`, `convoflow`, `timeless-touch-ceramics`, `sanaa-ouahmane`, `corpofino`.

## Theme tokens

Defaults in `app/globals.css` map to Falcore's own tokens, so an unthemed study looks like the rest of the site. Tailwind utilities: `bg-case-paper`, `bg-case-paper-raised`, `text-case-ink`, `text-case-ink-soft`, `border-case-rule`, `text-case-accent`/`bg-case-accent`, `font-case-display`.

| Token | Role |
|---|---|
| `--case-paper` | Page background inside the case study |
| `--case-paper-raised` | Alternate chapter background (`tone="raised"`) |
| `--case-ink` / `--case-ink-soft` | Text and secondary text on paper |
| `--case-rule` | Hairlines on paper |
| `--case-accent` | The client's accent. Use sparingly, like Falcore's red |
| `--case-display-family` | The client's display typeface. Load it with `next/font/google` in `_lib/fonts.ts` (`variable: "--font-<slug>-display"`), pass `font.variable` to `CaseStudyLayout`'s `fontClassName`, and point the token at that variable in the theme file |

A theme file defines its palette primitives first (`--diamaria-palette-*`) and maps the `--case-*` tokens to them. Components never use hex values.

## Page anatomy

1. `CaseStudyHero`: "All work" back link, the client's name in its own display face, one headline sentence, a facts row (year, what I did, client, live site), then one large hero visual.
2. Three to five chapters (`CaseStudyChapter`): title, one or two sentences directly under it, one big visual. `tone` `paper` (default), `raised` or `hangar` (Falcore's dark, for system/technical moments).
3. The signature moment, as its own chapter.
4. `CaseStudyOutcomes`: only claims with evidence. No invented numbers.
5. `NextCaseStudy` (added by `CaseStudyLayout`), then `PageClosing`.

## Rules

- Restraint still applies (see the root `CLAUDE.md` learnings): one idea per chapter, at most two sentences of copy, big imagery. A case study is visual-heavy, not text-heavy.
- Copy: plain words for non-technical owners, outcomes first, "I" not "we", no stack names in headings.
- Never name "XMA Launchpad" or "Launchpad". The operating system study is "A company operating system".
- Honest authorship: when another developer built part of a project, the summary sets `team` (shown as a "Team" fact in the hero) and the copy leads with my own share. Never name collaborators or client staff.
- Every claim needs evidence (client repo, git history, or the research fact-check). No prices, invoices, AI credit balances, private contacts, Studio/CMS URLs or IDs, in copy or inside images. Crop into a new file when a capture shows any of these.
- Real people: only use real photography the client published. Never feature AI-extended or composited images of a real person without their sign-off.
- Third-party assets (licensed app UI, preset libraries) are never shown or claimed.
- Screenshots: `CaseStudyFigure` passes `quality={90}`. Size sources for displayed width × 2.
- Motion: the hero owns the load moment. Chapters don't fade in on scroll. The signature moment may animate or respond to the visitor.
- No `overflow: hidden` on ancestors of sticky elements; use `overflow-clip`.

## Phones and tablets

The shared frame is tuned for 320px phones up to 1024px tablets (checked in Chromium with touch emulation and in Firefox at 320, 375, 390, 414, 667×375, 768 and 1024):

- Spacing. Chapters and the next-study card use `py-16 sm:py-20 md:section-spacing` (64px, then 80px, then the site's `--section-space` from 768px), not `section-spacing` alone, which left about 190px of empty paper between chapters on a phone. Heading-to-media is `mt-10 md:mt-14 lg:mt-20`; intros sit `mt-4` under the title on phones. `<main>` starts at `pt-28 md:pt-32`.
- Facts row. Below `sm` each fact is a hairline row with the label in a 5.5rem column and the value beside it, closed by a bottom rule. From `sm` it is two columns; from `md` one row when there are four facts, or three columns (then one row from `lg`) when a study has five (Team and Live site).
- Live site hostnames break only before the domain (`LiveSiteLink`), never at a hyphen or mid-word. The link has a 44px tap area (`-my-3 py-3`, so the row height doesn't change).
- `/work` rows show the cover first on phones and tablets, then the name, headline and services; from `lg` the text sits left of the cover.
- The "All work" back link has a 44px tap area (`min-h-11 -my-3`, so the layout doesn't move).
- Short headings (chapter titles, client names, outcome statements, next-study name) use `text-balance`, because Firefox has no `text-wrap: pretty`.
- The nav's Work panel splits 6/6 columns below `lg` (5 + 6 from `lg`), so study names don't wrap at 768px. The mobile sheet's study links are 48px tall.
- The site header shows its desktop links only from `lg`. At 768px the logo ran into "Services", so tablets get the menu sheet.

## The seven studies

| Study | Theme | Signature moment (component) |
|---|---|---|
| `company-operating-system` | Product black, magenta, Geist | "One question, every source": the assistant reading six sources into a cited answer, one confidential source kept out (`_components/source-trace/`). A Timeline/Gantt/Board switcher (`project-views/`). Team fact credits a second developer |
| `diamaria` | Warm white, ink, Jost light, centred Graff-quiet rhythm | "The Loupe": a jeweller's loupe over the raw shoot frame reveals the finished packshot (`jewellers-loupe.tsx`, drag on touch, arrow keys) |
| `xma-agency` | XMA Media: cream, ink, electric violet, Manrope 800 caps (the agency's main site since the October 2026 rebuild; slug kept) | "Three companies, one kit": tabs switch one browser frame between xmamedia.ai, xma.ae and xmaboost.com, which share one kit (`_components/one-kit/`). Closes with "Where it started", the earlier xma.ae I built. Team fact credits a second developer |
| `convoflow` | Off-white, ConvoFlow pink, Geist | "Send a lead through": one lead travels ad → follow-up → call/WhatsApp/email → qualified → booked on a button press (`lead-flow-signature/`) |
| `timeless-touch-ceramics` | Stone, gold, Geist light | "Bookmatch": two mirrored halves of a stone scan open like slab doors onto the live site (`bookmatch-reveal.tsx`). Team fact credits a second developer |
| `sanaa-ouahmane` | White, crimson, display serif stand-in (IvyOra isn't web-licensed) | "A passage that sharpens as you read": her words resolve from blur line by line (`sharpening-excerpt.tsx`). The reveal window is measured in the area below the fixed nav (`--nav-height`), so in 667×375 landscape the whole passage is visible when the last word sharpens. The last two words share a `whitespace-nowrap` group, so Firefox (no `text-wrap: pretty`) never leaves one word alone on the last line. Palette swatch labels are 13px and show from `xl`, where 'Crimson' fits its 10% band. Only her real photography, never AI-extended portraits |
| `corpofino` | Cream, five skin-tone bands, Manrope 300 | "Five skins": department bands widen to show their treatment imagery, and a toggle flips the strip to Arabic RTL (`department-swatch-strip.tsx`) |

Studies with wide UI screenshots show a phone-specific crop below `md` (local `ArtDirectedFigure`/`ScreenPairFigure`/`ResponsiveScreenshot` components), because a 3200px desktop capture is unreadable at 414px. If a new study needs this, promote one of them into `CaseStudyFigure` as a `narrowImage` prop instead of writing another copy. There are now six local versions; XMA's `ResponsiveCapture` (phone, optional tablet and desktop images, CVA `phoneFit` handset/crop) is the most complete starting point.

Per-study phone notes:

- DiaMaria: the loupe moves on a tap (pointerup within 10px), never on a scroll swipe. Below `md` its frame is `aspect-[4/5]`, capped at `min(72svh,44rem)`. Below `sm` the catalogue chapter shows a real phone capture of the Olympic grid.
- XMA Media: every screenshot chapter has a real 414px phone capture below `md`; "Where it started" also has a tablet crop (`md` to `xl`). The three-site frame switches to the desktop browser from `sm`, and the phone frame width (`--xma-agency-phone-frame-width`) is sized from `100svh` so tabs and phone fit one screen.
- ConvoFlow: the signature has four layouts: `wide` from `xl`, `compact` from `lg`, `landscape` below `lg` on screens at most 32rem tall, and `upright` otherwise. Channel cards are sized in `cqw` inside an `@container` frame.
- Timeless Touch: real phone captures below `md`/`lg` (`ResponsiveScreenshot` `desktopFrom`). The bookmatch uses the wide crop from `sm` with a height cap up to `md`, so it opens in phone landscape.
- Sanaa Ouahmane: `ArtDirectedFigure` switches to the wide capture at `sm`, since portrait crops were several screens tall in landscape. Editor sheets stack below `lg`.
- Corpofino: the department strip is a vertical accordion below `lg` and five bands from `lg`. The RTL chapter shows the phone pair up to `lg`.

The operating-system study does this in three steps (`_lib/art-direction.ts`): the phone crop below `md`, the tablet crop from `md` to `lg`, the desktop capture from `lg`. Portrait phone crops are capped at `sm:max-w-md` so phone landscape doesn't stretch them. Its citation numbers (source markers and inline chips) are 13px like the captions.

Light-weight or bold client faces override the shared `font-medium` titles with a scoped rule in their theme file (`[data-case-study="<slug>"] article :is(h1,h2) { font-weight: … }`).

## Thumbnails

Each study's `coverImage` (used on `/work`, the next-study card, the nav's Work preview, and cropped to `public/og/work/<slug>.jpg` for the Open Graph image, see `share-cards.md`) is `public/work/<slug>/thumbnail-v<n>.webp`: the real site on a laptop (and phone) in a scene built from the client's own materials and palette, 2752×1536, q90. They are generated with the `gen` CLI (Nano Banana 2.1) from the real desktop and mobile captures, then picked by eye for screen fidelity:

```bash
gen -m banana21 -s 2K -a 16:9 -n 2 -o <dir>/v1 -i public/showcase/<id>-vN-desktop.jpg -i public/showcase/<id>-vN-mobile.jpg "<scene prompt>"
```

Covers are centred compositions, so the frame crops them centred (no `object-top`). XMA's thumbnail (`thumbnail-v2.webp`) shows XMA Media, the agency's main site since October 2026.

## Capturing frames of live sites

```bash
bun run scripts/capture-case-study-frames.ts --url https://www.example.com --out public/work/<slug> --name home --stops 0,900,1800 [--device mobile] [--full-page]
```

It sends a normal browser user agent, because Vercel's bot checkpoint blocks the default headless one. Add `--system-chromium` when the page plays MP4/H.264 video: Playwright's bundled Chromium can't decode it and captures a black box, so the flag launches `/usr/bin/chromium` instead.
