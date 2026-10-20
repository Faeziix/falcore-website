# SEO

How the site is set up for search engines and AI answer engines (GEO/AEO), and the rules for keeping it that way. Researched and implemented on 2026-10-20 (sources: Google Search Central, schema.org, web.dev, the Next.js 16 docs in `node_modules/next/dist/docs/`).

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
| Every page (root layout `<head>`) | `Organization` (`#organization`, with `hasOfferCatalog` → the services), `Person` (`#founder`) | `lib/structured-data/site-entities.ts` |
| Home | `WebSite`, `WebPage`, `FAQPage` | `app/page.tsx` |
| About | `ProfilePage` → founder, `BreadcrumbList` | `app/about/_lib/about-structured-data.ts` |
| Contact | `ContactPage`, `BreadcrumbList` | `app/contact/_lib/contact-structured-data.ts` |
| `/services`, `/work`, `/blog` | `CollectionPage` + `ItemList`, `BreadcrumbList` | each index page / `app/blog/_lib/blog-structured-data.ts` |
| Service page | `WebPage` (`mainEntity` → the Service), `Service` (`<page>#service`), `BreadcrumbList`, `FAQPage` | `app/services/_lib/service-structured-data.ts` |
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

## AI answer engines (GEO / AEO)

Researched 2026-10-20 from Google's AI features guide (updated 2026-07-10), the robots meta docs, OpenAI's, Anthropic's and Perplexity's crawler docs, Microsoft's October 2025 guidance on inclusion in AI answers, llmstxt.org, the GEO paper (Aggarwal et al., KDD 2024) and the 2026 GEO survey (arXiv 2607.14035). The short version: every engine cites from a normal search index, so GEO is SEO plus a few rules. No special file or markup earns citations.

### Where each engine gets its pages

| Engine | Retrieves from | What the site needs |
|---|---|---|
| Google AI Overviews and AI Mode | Google's index | Indexed and eligible for a snippet. No `nosnippet` or `max-snippet` limits (`nosnippet` also keeps a page out of AI Overviews). |
| Microsoft Copilot, Bing AI answers | Bing's index | Bing Webmaster Tools and the sitemap; IndexNow speeds up recrawls. |
| ChatGPT search | OpenAI's index plus partner indexes | Allow `OAI-SearchBot` (and `ChatGPT-User` for live fetches). |
| Claude web search | Appears to use Brave's index | Allow `Claude-SearchBot` and `Claude-User`. Brave has no webmaster tools; it finds pages through links and visits. |
| Perplexity | Its own index | Allow `PerplexityBot` and `Perplexity-User`. |

### Rules

- **Every answer must be in the server HTML.** GPTBot, ClaudeBot and PerplexityBot don't run JavaScript. Accordions, tabs and carousels must render all their text on the server and only hide it with CSS. The FAQ accordion did not (closed answers were mounted only on click) until 2026-10-20; it now renders every answer collapsed, with `inert` and `aria-hidden` while closed. `bun run seo:check` fails if a JSON-LD FAQ answer is missing from the HTML.
- **Never block an answer-engine crawler.** The crawler lists live in `lib/ai-crawlers.ts`, used by `app/robots.ts` and by `seo:check`, which also requests the homepage with each crawler's user agent. Vercel's firewall and bot protection must keep letting verified bots through.
- **No snippet limits.** The root layout sets `max-snippet: -1` and `max-image-preview: large`; `seo:check` fails on `noindex`, `nosnippet` or `max-snippet:N` in a robots meta tag.
- **Decorative scene text is `data-nosnippet`.** The service scenes contain made-up interface numbers ("REVENUE $48k", "Score 82"). `ServiceScene` wraps them in a `data-nosnippet` `display: contents` element so Google doesn't quote them as facts.
- **Visible dates match the structured data.** Service pages and case studies show "Last updated" (`ContentUpdatedNote`) from the same `ContentDates` as `dateModified`. Blog posts show it in `PostByline`. Bump dates only for real edits; engines favour fresh pages, but faked freshness is what made Google ignore sitemap dates.
- **Specific claims over adjectives.** Numbers and named outcomes ("filed 34 of 43 meetings with none wrong") are what answer engines quote. In the GEO paper, adding statistics, quotations and cited sources helped the most, and keyword stuffing did worse than nothing. Later benchmarks found smaller gains, so this is good writing, not a trick.
- **One idea per section with a descriptive heading** is the guidance from both Google and Microsoft; don't split pages into tiny chunks for AI.
- **First-hand content is the main on-site lever.** Case studies and blog posts drawn from shipped work, with real numbers, are what no other site can say (see `blog.md`).

### Structured data for entities

AI search needs no special schema (Google says so explicitly), but consistent entities help engines tie Falcore, Faez Ansari and the services together:

- The Organization lists the four services in `hasOfferCatalog` (by `@id`, `serviceId()` in `entity-ids.ts`), and `knowsAbout`.
- Each service page has a `WebPage` (dates, breadcrumb, `mainEntity` → the Service), the `Service` and its `FAQPage`.
- Case studies are `Article`s `about` the service `@id`s.
- Skip `speakable` (news only), and never add a self-made Wikidata item (it won't meet notability and gets deleted).

### robots.txt and llms.txt

`app/robots.ts` allows everything, explicitly lists the answer-engine crawlers (OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User, Applebot, Bingbot) and the training crawlers the site allows (GPTBot, ClaudeBot, Google-Extended, Applebot-Extended), and blocks CCBot. Google-Extended doesn't affect AI Overviews; it only covers Gemini training and grounding outside Search. Cloudflare's `Content-Signal` robots.txt extension was considered and left out: no engine has committed to honouring it.

`/llms.txt` is generated from the site's data (services, case studies, posts, process, the homepage FAQs, contact). Google ignores llms.txt and no AI search engine documents reading it; it's kept as a cheap aid for agents. `llms-full.txt` and per-page Markdown copies were considered and skipped for the same reason.

### Measuring AI visibility

- **Google Search Console → Generative AI performance** (all sites since 2026-08-31): AI Overviews and AI Mode impressions by page and country.
- **Bing Webmaster Tools → AI Performance**: citations in Copilot and Bing AI answers. Needs the Bing import (off-site checklist).
- **Vercel Web Analytics → Referrers**: visits from `chatgpt.com`, `perplexity.ai`, `copilot.microsoft.com`, `claude.ai` and `gemini.google.com`. ChatGPT also adds `utm_source=chatgpt.com`, but UTM reports need Web Analytics Plus.
- **A monthly prompt panel**: ask ChatGPT, Perplexity, Claude, Copilot and Google AI Mode the same questions (e.g. "who builds AI automation for small businesses in Dubai", "n8n and CRM automation developer UAE", "custom web app developer for a US small business", "bilingual English Arabic website developer Dubai") and note whether Falcore is named or linked. Run each a few times; answers vary from run to run.

### Index state (2026-10-20)

- Brave (Claude's likely source) had only the homepage, under an older title, plus spam pages from the domain's previous owner. The Wayback Machine shows about 280 URLs from a 2017–2018 WordPress news site and later spam on `falcoretech.com`. They all return 404 now, so engines drop them as they recrawl; nothing else to do.
- A quick Bing `site:` search returned no pages, so Copilot (and the part of ChatGPT that uses Bing) can't cite the site yet. The Bing Webmaster Tools import is the most valuable open step.

## Speed (Core Web Vitals)

Targets at the 75th percentile: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1.

- **Never start the LCP text or image at `opacity: 0`.** Chrome ignores invisible paints, so a hero that fades in from 0 records LCP only when the fade ends (the homepage measured 7.6 s in the lab before the fix). Entrances start at `--entrance-start-opacity` (0.1) in CSS (`rise-in`) and `entranceStartOpacity` in the homepage hero, so LCP lands on the first paint (measured at first paint, about 2.0 s with DevTools throttling, on 2026-10-20). Masks that slide text up from a clip (`mask-rise`) are fine for headings.
- `next/image`: `priority` is deprecated in Next 16. Use `preload` only for the image that is above the fold; below-the-fold images stay lazy.
- Third-party scripts go through `next/script` (`afterInteractive`), never a raw `<script>` in `<head>`.
- `experimental.inlineCss` was tested on 2026-10-20 and left off: it removed the render-blocking CSS request (LCP 2.0 → 1.2 s with DevTools throttling) but added about 55 KB of compressed HTML to every page and client-side navigation, and the simulated Lighthouse run got worse. Revisit if the CSS grows or field data shows slow first paints.
- Cloudflare's Email Obfuscation injects a render-blocking `email-decode.min.js`. Keep it turned off.

## Traffic numbers

- Real visitor counts come from **Vercel Web Analytics** (`<Analytics />` from `@vercel/analytics/next` in the root layout, added 2026-10-20). It counts page views from real browsers only, with no cookies, and the privacy page says so.
- Cloudflare's dashboard is not a visitor count. "Requests" counts every asset and prefetch, and "Unique Visitors" counts distinct IPs per day, bots included. On 2026-10-20 about 54% of a day's requests came from the owner's own IP, about 10% from Anthropic's crawler (`216.73.216.x`) and about 4% from Googlebot (`66.249.64.x`). The steady ~200 "unique visitors" a day is mostly crawlers and scanners.
- **Leadsy** (Instantly's visitor-identification tag) was removed on 2026-10-20 at the user's request. It had never collected anything, because `falcoretech.com` was never added to the Instantly account, whose script runs only on allowlisted domains. The cookie consent banner built for it went with it. If identifying tracking comes back, it needs a consent banner (Decline as easy as Accept) and a `/privacy` update in the same change.

## Tools

- `bun run seo:check [baseUrl]` (`scripts/seo-check.ts`): crawls the sitemap and checks status codes, FAQ answers present in the server HTML, robots.txt and robots meta letting answer engines in (and the homepage answering each crawler's user agent), one self-referencing canonical on the www host, title and description presence, length and uniqueness, one `<h1>`, `og:image` responses, images without `alt`, broken internal links, orphan pages, sitemap dates, and that each page type carries its JSON-LD types without conflicting `@id`s. Defaults to the live site; pass `http://localhost:<port>` to check a local server. Exits non-zero on errors.
- `bun run indexnow [paths…]` (`scripts/submit-indexnow.ts`): tells Bing, Yandex and other IndexNow engines about changed URLs (or the whole sitemap with no arguments). The key is the name of the 32-character `.txt` file in `public/` (the script reads it from there; keep exactly one). Run after a deploy, only for URLs that changed. Google doesn't use IndexNow.

## Off-site checklist (owner actions)

1. ✅ (2026-10-20) Vercel → Domains (personal account `faeziixs-projects`, project `falcore-website`): the apex → www redirect is a permanent 308. `falcore-website.vercel.app` also redirects 308 to www, so no copy of the site is served on another host.
2. ✅ (2026-10-20) Cloudflare DNS: the `falcoretech.com` A record and the `www` CNAME are "DNS only" (grey cloud), set with the `cf` CLI. Cloudflare's proxy in front of Vercel blocked Vercel's DDoS and bot protection and injected the render-blocking Email Obfuscation script; Vercel already holds Let's Encrypt certificates for both names. Keep these records unproxied. Cloudflare stays the DNS host only (mail, Vercel verification and Google records live there too).
3. ✅ (2026-10-20) Google Search Console: the `falcoretech.com` Domain property was already verified (the owner's Falcore Google account, not admin@xmaagency.com). Submitted `https://www.falcoretech.com/sitemap.xml` and requested indexing for home, the four service pages, About and Work. Before the fix, Google's crawl had marked www as "alternate page with proper canonical" because the old canonical pointed at the apex. Two 2018 sitemaps from the domain's previous owner are still listed there; they can be removed. Still open: import the site into Bing Webmaster Tools (sign in with the same Google account, then "Import from Google Search Console").
4. Profiles with the same name (Falcore), URL (www) and city (Dubai): LinkedIn company page, the founder's LinkedIn and Upwork (linking to the site), Clutch, GoodFirms. These are also the `sameAs` links in the structured data; add new ones to `SOCIAL_PROFILES`. Mentions of Falcore on other sites (client-site credits, directories, podcasts, genuine answers on Reddit or Indie Hackers) correlate with AI visibility more than anything left on the site. Never seed fake mentions or reviews.
5. After each deploy that changes structured data: Rich Results Test and the Schema Markup Validator on home, one service page and one case study. Last run 2026-10-20: the validator found no errors on home, about, contact, /services, a service page and a case study, and IndexNow accepted all 17 URLs (HTTP 202).
6. Check Search Console's Generative AI performance report and Bing's AI Performance report monthly, and run the prompt panel (see "Measuring AI visibility").

## Content

The fastest long-term gains are first-hand content: more case studies and blog posts drawn from shipped work (see `blog.md`). No word-count targets; restraint still rules the design, so depth goes in case studies, posts and FAQ answers rather than longer service pages.
