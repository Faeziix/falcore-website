export type CaseStudyImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type CaseStudySummary = {
  slug: string;
  clientName: string;
  headline: string;
  summary: string;
  year: string;
  services: string[];
  liveUrl?: string;
  team?: string;
  coverImage: CaseStudyImage;
};

export type CaseStudyOutcome = {
  statement: string;
  detail: string;
};
