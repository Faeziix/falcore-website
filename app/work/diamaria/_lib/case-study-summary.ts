import type { CaseStudySummary } from "@/app/work/_lib/case-study-types";

export const diaMariaCaseStudySummary: CaseStudySummary = {
  slug: "diamaria",
  clientName: "DiaMaria",
  seoTitle: "DiaMaria: Jewellery Website Redesign",
  headline:
    "I redesigned DiaMaria's website and turned one raw studio shoot into a matched set of product images.",
  summary: "High jewellery house, Dubai",
  year: "2026",
  services: ["Web design", "Development", "Product imagery"],
  serviceSlugs: ["web-design"],
  dates: { publishedOn: "2026-10-19", updatedOn: "2026-10-19" },
  liveUrl: "https://www.diamaria.com",
  coverImage: {
    src: "/work/diamaria/thumbnail-v1.webp",
    alt: "The DiaMaria website on a laptop and a phone, resting on ivory travertine beside a fold of ivory silk",
    width: 2752,
    height: 1536,
  },
};
