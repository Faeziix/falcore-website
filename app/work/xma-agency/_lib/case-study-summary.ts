import type { CaseStudySummary } from "@/app/work/_lib/case-study-types";

export const xmaAgencyCaseStudySummary: CaseStudySummary = {
  slug: "xma-agency",
  clientName: "XMA Media",
  headline:
    "I built XMA Media's website, now the agency's main site, around its ad films and a booking calendar.",
  summary: "AI video and ad production, Dubai",
  year: "2026",
  services: ["Web design", "Development", "Content studio", "Analytics"],
  liveUrl: "https://www.xmamedia.ai",
  team: "Me and one other developer",
  coverImage: {
    src: "/work/xma-agency/thumbnail-v2.webp",
    alt: "The XMA Media website on a laptop and a phone beside a cinema camera, against a violet backdrop",
    width: 2752,
    height: 1536,
  },
};
