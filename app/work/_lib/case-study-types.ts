import type { ContentDates } from "@/lib/data/page-dates";

export type CaseStudyImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type CaseStudySummary = {
  slug: string;
  clientName: string;
  seoTitle: string;
  headline: string;
  summary: string;
  year: string;
  services: string[];
  serviceSlugs: string[];
  dates: ContentDates;
  liveUrl?: string;
  team?: string;
  coverImage: CaseStudyImage;
};

export type CaseStudyOutcome = {
  statement: string;
  detail: string;
};
