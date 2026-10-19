import type { Metadata } from "next";
import { caseStudyPath } from "./case-study-index";
import type { CaseStudySummary } from "./case-study-types";

export function buildCaseStudyMetadata(caseStudy: CaseStudySummary): Metadata {
  const title = `${caseStudy.clientName} case study`;
  return {
    title,
    description: caseStudy.headline,
    alternates: { canonical: caseStudyPath(caseStudy.slug) },
    openGraph: {
      title,
      description: caseStudy.headline,
      images: [{ url: caseStudy.coverImage.src, alt: caseStudy.coverImage.alt }],
    },
  };
}
