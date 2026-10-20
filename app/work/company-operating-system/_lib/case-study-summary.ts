import type { CaseStudySummary } from "@/app/work/_lib/case-study-types";

export const companyOperatingSystemCaseStudySummary: CaseStudySummary = {
  slug: "company-operating-system",
  clientName: "A company operating system",
  seoTitle: "Company Operating System with AI Agents",
  headline:
    "One login where a Dubai agency's team gets sourced answers about any client, runs every project and has AI do the work they approve.",
  summary: "A Dubai creative and growth agency",
  year: "2026",
  services: ["Product design", "Development", "AI agents"],
  serviceSlugs: ["custom-web-applications", "ai-enablement", "systems-automations"],
  dates: { publishedOn: "2026-10-19", updatedOn: "2026-10-19" },
  team: "Me and one other developer",
  coverImage: {
    src: "/work/company-operating-system/thumbnail-v1.webp",
    alt: "A laptop on a dark desk showing the company system's AI assistant answering a question about a client campaign, with six cited sources",
    width: 2752,
    height: 1536,
  },
};
