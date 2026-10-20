import type { MDXContent } from "mdx/types";
import type { ContentDates } from "@/lib/data/page-dates";

export type BlogPostSummary = {
  slug: string;
  title: string;
  description: string;
  dates: ContentDates;
  serviceSlugs: string[];
  caseStudySlugs: string[];
  isPublished: boolean;
  loadContent: () => Promise<{ default: MDXContent }>;
};
