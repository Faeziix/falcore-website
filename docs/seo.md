# SEO

How the site is set up for search engines and AI answer engines, and the rules for keeping it that way. Researched and implemented on 2026-10-20 (sources: Google Search Central, schema.org, web.dev, the Next.js 16 docs in `node_modules/next/dist/docs/`).

## Markets

One English site serves **both the UAE and the US**. There are no country or city landing pages (`/web-design-dubai`, `/us`): Google's spam policy treats near-identical pages aimed at regions as doorway pages, and hreflang does nothing for a single English version. Instead, both markets are named where it's natural:

- `SERVED_MARKETS_SENTENCE` in `lib/site-config.ts` ("Based in Dubai, working with clients in the UAE and US.") in the footer, contact page and llms.txt.
- The homepage title and description, the hero trust line, the founder bio and the About page.
- `areaServed` (United Arab Emirates, United States) on the Organization and every Service in the structured data.
- A market goes in a page title only when that page has substance for it (the web-design page names both because its examples are UAE sites and the offer is the same for US clients).

No Google Business Profile: the work is fully remote, and Google suspends online-only businesses. Local presence comes from consistent profiles elsewhere (see the off-site checklist).

## Canonical host and URLs

- The canonical host is `https://www.falcoretech.com` (`SITE_URL`). Build absolute URLs with `absoluteUrl(path)` from `lib/site-config.ts`; never hardcode the domain.
- Every page sets its own `alternates.canonical`. The root layout never does, or every page without one would claim to be the homepage.
- The apex domain redirects to www in Vercel. It must be a permanent redirect (308), not 307.

## Titles and descriptions

- The root layout's template is `%s | Falcore`; pages set only their own part. Keep the full title at 60 characters or less.
- Patterns:
  - Home: `HOMEPAGE_TITLE` ("Falcore | Web Design, Custom Apps & AI in the UAE & US").
  - Service: `metaTitle` in `lib/data/services.ts`, named for what people search ("Business Automation, CRM & WhatsApp Integration"), not the internal service name.
  - Case study: `seoTitle` on the summary, `Client: what was built` ("Corpofino: Bilingual Spa Website, English & Arabic").
  - About: the person and the role. Contact: the action.
- Descriptions: one honest sentence or two, 70–160 characters, first person, unique per page.
- Share metadata always goes through `buildSocialShareMetadata` (see `share-cards.md`). Pass `articleDates` for case studies and blog posts, so they get `og:type=article` with published and modified times.

## Structured data

All JSON-LD goes through `JsonLd` in `lib/structured-data/json-ld.tsx`, which renders one `@graph` per script tag and escapes `<` (the Next.js-recommended pattern). Nodes are typed with `schema-dts`.

| Where | Nodes | Built in |
|---|---|---|
| Every page (root layout `<head>`) | `Organization` (`#organization`), `Person` (`#founder`) | `lib/structured-data/site-entities.ts` |
| Home | `WebSite`, `WebPage`, `FAQPage` | `app/page.tsx` |
| About | `ProfilePage` → founder, `BreadcrumbList` | `app/about/_lib/about-structured-data.ts` |
| Contact | `ContactPage`, `BreadcrumbList` | `app/contact/_lib/contact-structured-data.ts` |
| `/services`, `/work`, `/blog` | `CollectionPage` + `ItemList`, `BreadcrumbList` | each index page / `app/blog/_lib/blog-structured-data.ts` |
| Service page | `Service` (`<page>#service`), `BreadcrumbList`, `FAQPage` | `app/services/_lib/service-structured-data.ts` |
| Case study | `Article` (author → `#founder`), `BreadcrumbList` | `app/work/_lib/case-study-structured-data.ts`, rendered by `CaseStudyLayout` |
| Blog post | `BlogPosting`, `BreadcrumbList` | `app/blog/_lib/blog-structured-data.ts` |

Rules:

- `Organization`, not `ProfessionalService` (schema.org deprecated it) and not `LocalBusiness` (Google requires a public street address for that).
- Each entity has one stable `@id`. Pages refer to the Organization and founder by `@id` instead of repeating them, so no `@id` is ever declared twice with different data.
- Markup must match what's visible on the page. No `Review` or `AggregateRating` unless real clients agreed to be quoted, and even then Google doesn't show stars for reviews a business hosts about itself.
- `FAQPage` stays because it mirrors visible FAQs and Bing and AI answer engines read it, but Google stopped showing FAQ rich results on 2026-05-07, so don't add FAQs for search.

## Dates and the sitemap

- Every indexable page has real `publishedOn` / `updatedOn` dates (`ContentDates`): services in `lib/data/services.ts`, case studies in their summaries, blog posts in the registry, everything else in `lib/data/page-dates.ts`.
- Bump `updatedOn` only when the main content, structured data or links change meaningfully. Google ignores `lastmod` from sites whose dates aren't consistently accurate, which is why the sitemap no longer stamps every page with the build time.
- `lib/indexable-pages.ts` is the single list of indexable pages. `app/sitemap.ts` and `app/llms.txt/route.ts` both read it, so a new page or post appears in both.

## robots.txt and AI crawlers

`app/robots.ts` allows everything, explicitly lists the answer-engine crawlers (OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User, Applebot) and the training crawlers the site allows (GPTBot, ClaudeBot, Google-Extended, Applebot-Extended), and blocks CCBot. Blocking an answer-engine crawler removes the site from that engine's answers, so never block those.

`/llms.txt` is generated from the site's data (services, case studies, posts, process, contact). Google ignores llms.txt and few crawlers fetch it, so it's a cheap extra, not a ranking lever.

## Speed (Core Web Vitals)

Targets at the 75th percentile: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1.

- **Never start the LCP text or image at `opacity: 0`.** Chrome ignores invisible paints, so a hero that fades in from 0 records LCP only when the fade ends (the homepage measured 7.6 s in the lab before the fix). Entrances start at `--entrance-start-opacity` (0.1) in CSS (`rise-in`) and `entranceStartOpacity` in the homepage hero, so LCP lands on the first paint (measured at first paint, about 2.0 s with DevTools throttling, on 2026-10-20). Masks that slide text up from a clip (`mask-rise`) are fine for headings.
- `next/image`: `priority` is deprecated in Next 16. Use `preload` only for the image that is above the fold; below-the-fold images stay lazy.
- Third-party scripts go through `next/script` (`afterInteractive` for the Leadsy tag), never a raw `<script>` in `<head>`.
- `experimental.inlineCss` was tested on 2026-10-20 and left off: it removed the render-blocking CSS request (LCP 2.0 → 1.2 s with DevTools throttling) but added about 55 KB of compressed HTML to every page and client-side navigation, and the simulated Lighthouse run got worse. Revisit if the CSS grows or field data shows slow first paints.
- Cloudflare's Email Obfuscation injects a render-blocking `email-decode.min.js`. Keep it turned off.

## Traffic numbers

- Real visitor counts come from **Vercel Web Analytics** (`<Analytics />` from `@vercel/analytics/next` in the root layout, added 2026-10-20). It counts page views from real browsers only, with no cookies, and the privacy page says so.
- Cloudflare's dashboard is not a visitor count. "Requests" counts every asset and prefetch, and "Unique Visitors" counts distinct IPs per day, bots included. On 2026-10-20 about 54% of a day's requests came from the owner's own IP, about 10% from Anthropic's crawler (`216.73.216.x`) and about 4% from Googlebot (`66.249.64.x`). The steady ~200 "unique visitors" a day is mostly crawlers and scanners.
- **Leadsy** (now Instantly's website visitor tool, built on RB2B) identifies the businesses behind visits (`VisitorIdentificationTag`). Its RB2B script carries an allowlist of customer domains and does nothing on a domain that isn't listed. On 2026-10-20 `falcoretech.com` was not on it, so the tag loaded but collected nothing; the domain has to be added and verified in the Instantly dashboard (open the site with `?testvtag=true` to verify). On a listed domain it sets `_reb2buid` (360 days), `_reb2bsessionID` (session) and `_reb2bgeo` (20 days) and looks up the IP's location through ip-api. `/privacy` lists all of this; update it if the tool or its cookies change.
- To check whether the tag is live, load the site in Playwright and look for the `_reb2b*` cookies and a request to `pro.ip-api.com`. No cookies means the domain still isn't allowlisted.

## Tools

- `bun run seo:check [baseUrl]` (`scripts/seo-check.ts`): crawls the sitemap and checks status codes, one self-referencing canonical on the www host, title and description presence, length and uniqueness, one `<h1>`, `og:image` responses, images without `alt`, broken internal links, orphan pages, sitemap dates, and that each page type carries its JSON-LD types without conflicting `@id`s. Defaults to the live site; pass `http://localhost:<port>` to check a local server. Exits non-zero on errors.
- `bun run indexnow [paths…]` (`scripts/submit-indexnow.ts`): tells Bing, Yandex and other IndexNow engines about changed URLs (or the whole sitemap with no arguments). The key is the name of the 32-character `.txt` file in `public/` (the script reads it from there; keep exactly one). Run after a deploy, only for URLs that changed. Google doesn't use IndexNow.

## Off-site checklist (owner actions)

1. ✅ (2026-10-20) Vercel → Domains (personal account `faeziixs-projects`, project `falcore-website`): the apex → www redirect is a permanent 308. `falcore-website.vercel.app` also redirects 308 to www, so no copy of the site is served on another host.
2. ✅ (2026-10-20) Cloudflare DNS: the `falcoretech.com` A record and the `www` CNAME are "DNS only" (grey cloud), set with the `cf` CLI. Cloudflare's proxy in front of Vercel blocked Vercel's DDoS and bot protection and injected the render-blocking Email Obfuscation script; Vercel already holds Let's Encrypt certificates for both names. Keep these records unproxied. Cloudflare stays the DNS host only (mail, Vercel verification and Google records live there too).
3. Google Search Console: a Domain property (DNS verification), submit `https://www.falcoretech.com/sitemap.xml`. Then import the site into Bing Webmaster Tools.
4. Profiles with the same name (Falcore), URL (www) and city (Dubai): LinkedIn company page, the founder's LinkedIn and Upwork (linking to the site), Clutch, GoodFirms. These are also the `sameAs` links in the structured data; add new ones to `SOCIAL_PROFILES`.
5. After each deploy that changes structured data: Rich Results Test and the Schema Markup Validator on home, one service page and one case study. Last run 2026-10-20: the validator found no errors on home, about, contact, /services, a service page and a case study, and IndexNow accepted all 17 URLs (HTTP 202).

## Content

The fastest long-term gains are first-hand content: more case studies and blog posts drawn from shipped work (see `blog.md`). No word-count targets; restraint still rules the design, so depth goes in case studies, posts and FAQ answers rather than longer service pages.
