# Blog

`/blog` holds first-hand articles from shipped work. The user chose the name "Blog" (plainer for non-technical owners than "Notes") and writes the posts; Claude only drafts one when asked.

While no post is published, `/blog` returns 404 and nothing links to it: the nav, footer, sitemap and llms.txt add Blog automatically once the first post has `isPublished: true` (`hasPublishedBlogPosts()`). Adding "Blog" to the desktop nav makes the bar longer, so re-check it at 1024–1440px when the first post goes live.

## Adding a post

1. Write the body in `app/blog/_posts/<slug>.mdx`. Start with the first paragraph; the page renders the title, description and byline itself, so don't repeat them. Use `##` and `###` for headings (the page owns the `<h1>`).
2. Register it in `BLOG_POSTS` in `app/blog/_lib/blog-posts.ts`:

```ts
{
  slug: "whatsapp-crm-for-a-dubai-business",
  title: "What a WhatsApp and CRM setup looks like for a Dubai business",
  description: "One or two sentences, 70–160 characters, in my voice.",
  dates: { publishedOn: "2026-11-02", updatedOn: "2026-11-02" },
  serviceSlugs: ["systems-automations"],
  caseStudySlugs: ["convoflow"],
  isPublished: false,
  loadContent: () => import("../_posts/whatsapp-crm-for-a-dubai-business.mdx"),
},
```

3. Preview it with `isPublished: true` on a local server, run `bun run seo:check http://localhost:<port>`, then publish.
4. After deploying, run `bun run indexnow /blog /blog/<slug>`.

Titles go into `<title>` as "Title | Falcore", so keep the title to about 50 characters.

## What the page includes

- `app/blog/[slug]/page.tsx`: "All posts", the title, the description as the lead, a byline ("By Faez Ansari · Published … · Updated …", with `<time>` elements; "Updated" shows only when it differs), the body, then "Related" links to the post's services and case studies, then `PageClosing`.
- Metadata: canonical, `og:type=article` with published and modified times, the shared `blog` share card (`public/og/blog.jpg`).
- Structured data: `BlogPosting` with the founder as author, plus a breadcrumb (see `seo.md`).
- Body styles: `mdx-components.tsx` maps Markdown elements to `articleElements` in `app/blog/_components/article-elements.tsx` (site tokens and type scale, GitHub-flavoured tables via `remark-gfm`). Internal links use `next/link`; external links open in a new tab with `nofollow`. For images, use `<ArticleImage src alt width height caption />` with a file in `public/blog/<slug>/`.

## Writing rules

- First-hand only: something I built, measured or decided on a real project. Google rewards experience it can't find elsewhere, and its scaled-content policy targets generic AI-written pages.
- Numbers only from evidence: case-study outcome files, the system's own logs, real quotes. No invented prices, timelines or results.
- The same voice and restraint as the rest of the site: "I", plain words, no stack names in headings, short paragraphs.
- Link at least one service page and one case study (`serviceSlugs`, `caseStudySlugs`), plus inline links where they help.
- Respect the case-study rules: never name "Launchpad", claim only my own share of team projects, show only demo data in images.
- Bump `updatedOn` only for a real content change.

Topic ideas from the 2026-10-20 research, each only if I have the first-hand material: what a website really costs in the UAE (with AED and USD ranges from my own quotes), n8n vs Zapier from my own builds, setting up the WhatsApp Business API in the UAE, and when an AI agent isn't worth it.
