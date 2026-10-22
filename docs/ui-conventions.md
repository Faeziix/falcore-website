# UI Conventions

How pages on this site are put together. Read this along with `design-tokens.md` before building a section.

## Direction: "show the machinery"

Falcore sells the systems that run a business behind the scenes. Graphics show one of those systems doing real work, such as the service scenes or the current XMA Launchpad screenshots, rather than abstract decoration. The audience is non-technical business owners in the UAE and US, so copy is plain and outcome-led with no stack names. Name both markets where it's natural ("Based in Dubai, working with clients in the UAE and US"); see `seo.md` → Markets.

## Restraint (the first rule)

The user rejected a dense version of this page as messy and overwhelming. One idea per section. A heading, at most a sentence or two, and one strong visual. No bullet lists, figure rows, side notes or second columns of copy on the homepage. When in doubt, cut it and link to the detail page instead.

## Layout

- Wrap content in `page-container`, and space sections with `section-spacing`.
- Sections are **left-aligned**. Start each one with `SectionHeading`: hairline rule, title, then a one-sentence intro directly under the title. Every section has an intro (the prop is required). Don't split title and intro into side-by-side columns; the user rejected that. Don't centre section headers. The closing `WaveCTA` is the one deliberate exception.
- Structure comes from hairlines (`border-border`) and the 12-column grid, not cards with shadows. Square corners everywhere (`--radius: 0`).
- Homepage media sits bare on `bg-surface` (or with a hairline border for UI screenshots). The service-page hero scene sits in a `ViewfinderFrame`.
- Never put `overflow: hidden` on an ancestor of a sticky element (the services stage on desktop is sticky). Use `overflow-clip` when you need to clip.
- `html` and `body` have `overflow-x: clip` (`globals.css`). Scroll reveals start elements outside their frame (lock-on brackets 20px out, film settling from 1.12 scale, parallax), and without the clip each one widened the page mid-animation, so phones panned sideways. Keep it `clip`, never `hidden`, because `clip` makes no scroll container and sticky keeps working. `bun run overflow:check [baseUrl] [paths…]` samples every frame while it scrolls each page at 360–1440px and lists anything that sticks out (`OVERFLOW_WIDTHS=390`, `OVERFLOW_BROWSER=firefox` to narrow it).

## Typography

- Headings use Oxanium through the base layer. Use the fluid `text-display-*` scale, not ad-hoc `text-5xl` sizes.
- Body text is Instrument Sans. Intro paragraphs use `text-lead text-foreground-soft`.
- Monospace is only for real data (timestamps, step numbers).
- Avoid the generated-page tells: no tracked all-caps eyebrow labels above headings, no single accented word in a headline, no "→" appended to button text. Use `ArrowUpRight` only to mark links that open a new tab.

## Colour roles

- Falcon red (`primary`) means **action or live signal**: primary buttons, the active Launchpad feature.
- Steel (`accent`) means **information or visited**: bullet ticks, link hover, focus ring.
- No ambient glow for decoration.

## Navigation

`SiteNavigation` (`components/site-navigation/`) is the one header for every page. Links and route matching live in `navigation-links.ts`.

- The bar sits on the 12-column grid: the logo in columns 1–3, links and the CTA right-aligned in columns 6–12. They used to start at column 8 to line up with the hero buttons, but the "Book a consultation call" label doesn't fit there at any width (the container caps at 1400px). Re-measure the bar at 1024–1440px whenever the CTA label changes. It is `--nav-height` tall. The desktop links and CTA show from `lg`; below that (tablets included) the bar is the logo and the menu toggle, because at 768px the logo ran into "Services".
- It's transparent at the top of the page, blurred `bg-background/85` with a hairline once scrolled, and solid while a menu is open. Case studies pass `surface="solid"` (via `CaseStudyLayout`): over a client's light paper the transparent bar's light text fell to about 1.2:1 contrast.
- The current page, or the homepage section in view (scroll-spy on `#services`, `#launchpad`, `#work`), gets a 2px steel underline about 2px under the label, not down on the bar's edge (the user found that gap too big). The underline slides between links with `layoutId`. Current routes use `aria-current="page"` and homepage sections use `"location"`.
- "Services" is a button that opens a full-width panel with the four service scenes, titles and one-liners (data from `lib/data/services.ts`). It opens on hover, which the user asked for: after 90ms of hover intent, and it closes 220ms after the pointer leaves the header, or right away when another link is hovered (`use-menu-hover.ts`, one instance per menu; hovering one trigger cancels the other's pending open). A mouse click only ever opens it, so hovering and then clicking can't close it. On touch and keyboard the button toggles. Escape, an outside click or navigating also closes it, and Escape returns focus to the trigger.
- "Work" is the second menu, with the same hover, click and dismiss behaviour (`work-menu-panel.tsx`). Left: the case studies from `CASE_STUDIES` as Oxanium rows between hairlines, then an "All work" link. Right: a 16:9 preview of the hovered or focused study's cover, crossfading between studies, with its one-sentence headline under it. The previewed row turns `foreground` and shows its year; the study you're on is `accent`. It opens on the current study, or the first one.
- "Blog" appears between Work and About only once a post is published (`hasPublishedBlogPosts()` in `navigation-links.ts`), and the footer follows the same rule. Re-measure the bar at 1024–1440px when it first appears.
- Mobile uses a full-height sheet under the bar with Oxanium rows separated by hairlines. "Services" and "Work" are disclosures (`MobileMenuDisclosure`); Work lists every study plus "All work", and either one starts expanded when you're on one of its pages. The sheet ends with a full-width "Book a consultation call" and the contact email, and page scroll is locked while it's open.
- The CTA is always "Book a consultation call" to `BOOKING_URL` (new tab, `ArrowUpRight`). It never goes to `/contact`.
- Motion. Shared variants are in `navigation-motion.ts`, and every effect was checked with the find-animation-opportunities and emil-design-eng skills:
  - The services panel and the mobile sheet unroll from the bar with `clip-path` (240ms and 300ms, `ease-out-expo`). Their tiles and rows settle in 40ms apart (`translateY(8px)` plus opacity), and both close with a quicker fade (150ms and 180ms).
  - Hovering or focusing a service tile plays that service's scene animation. At rest it shows the static scene.
  - Hover: a 1px `foreground-soft` underline, in the same spot as the active one, draws in from the left (`scaleX`, 300ms, `ease-out-expo`) and retracts to the right on leave. It stays drawn under "Services" while its panel is open. Press: links and the Services trigger scale to 0.97. That's all: the user wants simple, satisfying micro-interactions and "vehemently" rejected a dithered hover band as overdesigned.
  - The bar is fixed to the top and always visible. It never hides on scroll: the user asked for it to stay put.
  - The mobile Services list expands with height and opacity (250ms, closing in 180ms).
  - Rejected on purpose: a nav entrance on page load (the hero owns the load moment), a magnetic CTA, and a scroll-progress bar.
- Don't add numbered markers, "→" arrows or magnetic or spring gimmicks to the nav. The old `components/nav.tsx` had all three and was replaced.

## Motion

- One orchestrated load moment: the hero headline lines rise from a mask, then the intro and buttons.
- Homepage scroll reveals ("acquisition", the user's request on 2026-10-20, replacing the old "sections don't animate on scroll" rule): every section after the hero is picked up as it enters view, like a falcon's eye or a camera locking on. Never a generic fade-up.
  - Plot: the section's top hairline draws in from the left (`PlotterHairline`), with a short red signal tip at the pen point that fades once the line lands. FAQ rows plot their own lines, without the tip.
  - Type: heading words rise from a mask one after another (`MaskedWords`, 70ms apart); single-line titles rise as one line (`MaskedLine`). Intros, actions and buttons rise in after the title (`reveal-rise`).
  - Media: four brackets close in from outside the frame, lock on and dissolve, then the film wipes in from the left and settles from 1.12 scale (`AcquireFrame`). Used on the service scenes, the desktop browser showcase, the operating-system screenshot and the founder portrait.
  - Lists: feature buttons, process steps and carousel cards rise one after another; the logo marquee opens like an aperture from the centre.
  - Scroll-linked: only the founder portrait drifts inside its frame (`reveal-parallax`, CSS `animation-timeline: view()`, no JS; browsers without scroll timelines show it still).
  - How it works: `ScrollRevealScope` (homepage only, wraps `main` and `PageClosing`) runs one IntersectionObserver that sets `data-revealed` on each `[data-reveal]` trigger, once. Every animation is a CSS keyframe in `app/scroll-reveal.css`, paused until its trigger is revealed and staggered by `--reveal-order` × `--reveal-stagger`. Outside the scope (service pages, `/services`) the same shared components render static. Don't nest `[data-reveal]` triggers: an outer trigger would start the inner one's animations early.
- Motion answers a person's action or shows a state change: the Launchpad screenshot crossfading when a feature is picked, the process line drawing, each process icon's red signal stroke drawing in as the line reaches it, and a process icon redrawing itself on hover.
- Service pages. Text never fades in on scroll; only hairlines draw.
  - Load: "All services" rises in, the title's words rise from a mask (70ms apart), then the intro and the booking button. The `ViewfinderFrame` corners close in from 14px outside the frame and lock on, then the film wipes in from the left while settling from 1.12 scale (`reveal="onLoad"`). It's all CSS keyframes (`animate-rise-in`, `animate-mask-rise`, `animate-viewfinder-lock`, `animate-film-wipe`, `animate-film-settle`), so the hero stays a server component. The delays live in `heroRevealDelayMilliseconds` and the `--viewfinder-*` variables.
  - Scroll: the "What's included" grid and "How businesses use this" rows are plotted like a blueprint. Each hairline draws once from the left or top as the list enters view (`PlottedLine`), staggered cell by cell. Each inclusion's icon then draws its outline and, 0.35s later, its red signal stroke (`pathLength`).
  - Hover: the viewfinder corners tighten 3px and brighten, like a camera focusing. An inclusion cell tints to `surface/60`, its text brightens and its icon redraws (outline, then signal). The redraw is one-shot: it starts on pointer enter and always plays to the end, however briefly the pointer stays, and it won't restart until it has finished (`useIconRedraw` in `app/services/_components/`). Never tie a draw animation to hover state, because leaving early would freeze it half drawn. An example row draws a steel line along its top edge from the left (it retracts to the right), the same gesture as the nav underline, and its description brightens.

## Icons

- Section icons are drawn for this site, not taken from an icon library: a 40×40 viewBox, a 1.25 stroke, square caps and mitred joins (to match the square corners), and no fills. Base strokes use `currentColor` (`text-foreground-soft`), with secondary detail at 60% opacity. Each icon has exactly one `stroke-primary` "signal" detail, the part that carries the meaning. See `components/process/process-step-icons.tsx`. The service inclusion icons follow the same rules, written as stroke data (`tone`: `outline`, `detail` at 60% or `signal`) in `app/services/_lib/inclusion-icon-strokes.ts`. Add a new inclusion's icon there and its name to `InclusionIconName`.
- Drawn icons render through `PlottedStrokeIcon` (`components/plotted-icon/`); a new set only adds stroke data next to its route, like `app/about/_lib/working-principle-icon-strokes.ts`.
- Icon libraries (lucide, phosphor, hugeicons) are for UI chrome only, such as arrows, menu and close, and the small inline glyphs beside a fact line (`AboutFactList` in the About hero).
- Third-party tool logos come from `simple-icons` (real marks, one path each), drawn monochrome in `currentColor` (`text-muted-foreground`, brightening on hover). Only list tools actually used in shipped work.
- The site does not honour `prefers-reduced-motion` (the user's decision, 2026-10-19): every visitor gets the full motion. Don't add `useReducedMotion`, `motion-safe:`/`motion-reduce:` variants or reduced-motion media queries.
- Entrances never start at `opacity: 0` on text or images that can be the largest thing above the fold: Chrome only records LCP once they're visible, which made the homepage's LCP 7.6 s. `rise-in` and the homepage hero start at `--entrance-start-opacity` (0.1). Headings can rise from a clipping mask (`mask-rise`). See `seo.md` → Speed.
- Anything that starts hidden in `initial` must always have an `animate` that reveals it. The server HTML carries the hidden state, and nothing else will undo it.
- Animate transform and opacity only. Reach for `ease-out-expo`.

## Calls to action

The only conversion goal is a booking. Every CTA is "Book a consultation call" via `BookCallButton`, never a competing action like "Contact us" or "Get a quote". The only secondary button is the hero's outline "See my work", which jumps down the page.

- Homepage placement: the hero, the end of the operating-system section ("Want a system like this running your business?"), the end of the process section ("Step one is a free 30-minute call."), under the founder bio, and the closing `WaveCTA`. The nav button is always there too.
- A mid-page CTA is a `SectionCallToAction`: one short question or statement and the button, no extra copy, no hairline. It goes after the section's visual, never inside the heading.
- About and Contact: the hero button and the closing `WaveCTA` only. The footer has no booking link, because it sits right under the `WaveCTA`.
- Service-page placement: the hero, the end of "Built and running" ("Want something like this in your business?") and the closing `WaveCTA`. "What happens next" has no CTA there, because it follows the examples' CTA.
- Don't put CTAs in two sections in a row unless one is the founder bio's button. Services tiles already link to their pages, and the FAQ leads straight into the closing CTA, so neither gets its own.

## Primitives

Use `Button` / `buttonVariants` and `TextLink` / `textLinkVariants` (CVA, shadcn-style `asChild`). The booking URL and external-link props live in `lib/site-config.ts`. Never hardcode the Calendly URL.

## Code organisation

- Homepage-only sections: `app/_components/<section>/`, with their data in `app/_lib/`.
- Service-page parts: `app/services/_components/`.

## Service pages

- One idea per section, in this order: hero, What's included, (website showcase on Web Design), Built and running, What happens next, Other services, Common questions, closing CTA. Details in `components.md` → Service pages.
- "Built and running" lists real work only: 3 to 5 rows of a short title and one plain sentence of about 10 to 14 words, linking to a case study where one exists. Never generic "how businesses use this" copy.
- Examples from the company operating system claim only my own share: the knowledge base and its cited assistant, meeting recording and transcript sync, meetings linked to clients, tasks from meetings, the assistant that acts behind approve buttons, WhatsApp reply handling, and Meta conversion feedback. The other developer led sequences, campaigns, lead scoring, proposal timers, lead research, sales scripts and meeting notes, so those never appear as examples. Never name the product or the developer.
- Numbers come from evidence (case-study outcome files, the system's own test notes, the portfolio notes), never from estimates. No client money or ad spend.
- FAQs answer the objections a buyer has before booking (approval, ownership, tools, what happens after launch), in "I" voice, with no invented timelines or prices.
- Shared design-system pieces: `components/ui/`. Shared data: `lib/data/`.
- `cn()` in `lib/utils.ts` uses a `tailwind-merge` instance that knows the custom `text-display-*`/`text-lead` sizes. Register any new custom font size there.
