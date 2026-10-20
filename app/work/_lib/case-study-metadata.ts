import type { Metadata } from "next";
import { buildSocialShareMetadata, generatedShareCard } from "@/lib/social-share-metadata";
import { caseStudyPath } from "./case-study-index";
import type { CaseStudySummary } from "./case-study-types";

export function buildCaseStudyMetadata(caseStudy: CaseStudySummary): Metadata {
  const path = caseStudyPath(caseStudy.slug);
  return {
    title: caseStudy.seoTitle,
    description: caseStudy.headline,
    alternates: { canonical: path },
    ...buildSocialShareMetadata({
      title: `${caseStudy.seoTitle} | Falcore`,
      description: caseStudy.headline,
      path,
      image: generatedShareCard(`work/${caseStudy.slug}`, caseStudy.coverImage.alt),
      articleDates: caseStudy.dates,
    }),
  };
}
