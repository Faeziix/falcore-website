# UI Conventions

How pages on this site are put together. Read this along with `design-tokens.md` before building a section.

## Direction: "show the machinery"

Falcore sells the systems that run a business behind the scenes. Graphics show one of those systems doing real work, such as the service loops or the current XMA Launchpad screenshots, rather than abstract decoration. The audience is non-technical US business owners, so copy is plain and outcome-led with no stack names.

## Restraint (the first rule)

The user rejected a dense version of this page as messy and overwhelming. One idea per section. A heading, at most a sentence or two, and one strong visual. No bullet lists, figure rows, side notes or second columns of copy on the homepage. When in doubt, cut it and link to the detail page instead.

## Layout

- Wrap content in `page-container`, and space sections with `section-spacing`.
- Sections are **left-aligned**. Start each one with `SectionHeading`: hairline rule, title, then a one-sentence intro directly under the title. Every section has an intro (the prop is required). Don't split title and intro into side-by-side columns; the user rejected that. Don't centre section headers. The closing `WaveCTA` is the one deliberate exception.
- Structure comes from hairlines (`border-border`) and the 12-column grid, not cards with shadows. Square corners everywhere (`--radius: 0`).
- Homepage media sits bare on `bg-surface` (or with a hairline border for UI screenshots). The service-page hero video uses a `ViewfinderFrame`.
- Never put `overflow: hidden` on an ancestor of a sticky element (the services stage on desktop is sticky). Use `overflow-clip` when you need to clip.

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

- The bar sits on the 12-column grid: the logo in columns 1–3, links and the CTA in columns 8–12, so "Services" lines up with the hero buttons. It is `--nav-height` tall.
- It's transparent at the top of the page, blurred `bg-background/85` with a hairline once scrolled, and solid while a menu is open.
- The current page, or the homepage section in view (scroll-spy on `#services`, `#launchpad`, `#work`), gets a 2px steel underline about 2px under the label, not down on the bar's edge (the user found that gap too big). The underline slides between links with `layoutId`. Current routes use `aria-current="page"` and homepage sections use `"location"`.
- "Services" is a button that opens a full-width panel with the four service-loop posters, titles and one-liners (data from `lib/data/services.ts`). It opens on hover, which the user asked for: after 90ms of hover intent, and it closes 220ms after the pointer leaves the header, or right away when another link is hovered (`use-services-menu-hover.ts`). A mouse click only ever opens it, so hovering and then clicking can't close it. On touch and keyboard the button toggles. Escape, an outside click or navigating also closes it, and Escape returns focus to the trigger.
- Mobile uses a full-height sheet under the bar with Oxanium rows separated by hairlines. "Services" is a disclosure. The sheet ends with a full-width "Book a free call" and the contact email, and page scroll is locked while it's open.
- The CTA is always "Book a free call" to `BOOKING_URL` (new tab, `ArrowUpRight`). It never goes to `/contact`.
- Motion. Shared variants are in `navigation-motion.ts`, and every effect was checked with the find-animation-opportunities and emil-design-eng skills:
  - The services panel and the mobile sheet unroll from the bar with `clip-path` (240ms and 300ms, `ease-out-expo`). Their tiles and rows settle in 40ms apart (`translateY(8px)` plus opacity), and both close with a quicker fade (150ms and 180ms).
  - Hovering or focusing a service tile plays that service's loop over its poster. The video mounts on first hover only.
  - Hover: a 1px `foreground-soft` underline, in the same spot as the active one, draws in from the left (`scaleX`, 300ms, `ease-out-expo`) and retracts to the right on leave. It stays drawn under "Services" while its panel is open. Press: links and the Services trigger scale to 0.97. That's all: the user wants simple, satisfying micro-interactions and "vehemently" rejected a dithered hover band as overdesigned.
  - The bar slides away when you scroll down (after 320px) and comes back on any upward scroll. It stays put while a menu is open or while it has keyboard focus (`:focus-visible`).
  - The mobile Services list expands with height and opacity (250ms, closing in 180ms).
  - Under reduced motion, clip and translate effects become plain fades, and the bar hides and returns without sliding.
  - Rejected on purpose: a nav entrance on page load (the hero owns the load moment), a magnetic CTA, and a scroll-progress bar.
- Don't add numbered markers, "→" arrows or magnetic or spring gimmicks to the nav. The old `components/nav.tsx` had all three and was replaced.

## Motion

- One orchestrated load moment: the hero headline lines rise from a mask, then the intro and buttons. Sections do not fade up on scroll.
- Motion answers a person's action or shows a state change: the Launchpad screenshot crossfading when a feature is picked, the process line drawing.
- Service pages. Text never fades in on scroll; only hairlines draw.
  - Load: "All services" rises in, the title's words rise from a mask (70ms apart), then the intro and the booking button. The `ViewfinderFrame` corners close in from 14px outside the frame and lock on, then the film wipes in from the left while settling from 1.12 scale (`reveal="onLoad"`). It's all CSS keyframes (`animate-rise-in`, `animate-mask-rise`, `animate-viewfinder-lock`, `animate-film-wipe`, `animate-film-settle`) behind `motion-safe:`, so the hero stays a server component and reduced motion shows everything at once. The delays live in `heroRevealDelayMilliseconds` and the `--viewfinder-*` variables.
  - Scroll: the "What's included" grid and "How businesses use this" rows are plotted like a blueprint. Each hairline draws once from the left or top as the list enters view (`PlottedLine`), staggered cell by cell. Each inclusion's icon then draws its outline and, 0.35s later, its red signal stroke (`pathLength`).
  - Hover: the viewfinder corners tighten 3px and brighten, like a camera focusing. An inclusion cell tints to `surface/60`, its text brightens and its icon redraws (outline, then signal). The redraw is one-shot: it starts on pointer enter and always plays to the end, however briefly the pointer stays, and it won't restart until it has finished (`useIconRedraw` in `app/services/_components/`). Never tie a draw animation to hover state, because leaving early would freeze it half drawn. A use-case row draws a steel line along its top edge from the left (it retracts to the right), the same gesture as the nav underline, and its description brightens.
  - Icons: the service inclusion icons follow the section-icon rules (40×40, 1.25 stroke, square caps, mitred joins, one `stroke-primary` signal). They're stroke data (`tone`: `outline`, `detail` at 60% or `signal`) in `app/services/_lib/inclusion-icon-strokes.ts`. Add a new inclusion's icon there and its name to `InclusionIconName`.
- Every animation respects `prefers-reduced-motion` (`useReducedMotion`; videos show their poster).
- Animate transform and opacity only. Reach for `ease-out-expo`.

## Calls to action

The only conversion goal is a booking. Every CTA is "Book a free call" via `BookCallButton`, never a competing action like "Contact us" or "Get a quote". The only secondary button is the hero's outline "See my work", which jumps down the page.

- Homepage placement: the hero, the end of the operating-system section ("Want a system like this running your business?"), the end of the process section ("Step one is a free 30-minute call."), under the founder bio, and the closing `WaveCTA`. The nav button is always there too.
- A mid-page CTA is a `SectionCallToAction`: one short question or statement and the button, no extra copy, no hairline. It goes after the section's visual, never inside the heading.
- Don't put CTAs in two sections in a row unless one is the founder bio's button. Services tiles already link to their pages, and the FAQ leads straight into the closing CTA, so neither gets its own.

## Primitives

Use `Button` / `buttonVariants` and `TextLink` / `textLinkVariants` (CVA, shadcn-style `asChild`). The booking URL and external-link props live in `lib/site-config.ts`. Never hardcode the Calendly URL.

## Code organisation

- Homepage-only sections: `app/_components/<section>/`, with their data in `app/_lib/`.
- Service-page parts: `app/services/_components/`.
- Shared design-system pieces: `components/ui/`. Shared data: `lib/data/`.
- `cn()` in `lib/utils.ts` uses a `tailwind-merge` instance that knows the custom `text-display-*`/`text-lead` sizes. Register any new custom font size there.
