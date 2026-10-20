import type { Metadata } from "next";
import { buildSocialShareMetadata } from "@/lib/social-share-metadata";
import { caseStudyPath } from "./case-study-index";
import type { CaseStudySummary } from "./case-study-types";

export function buildCaseStudyMetadata(caseStudy: CaseStudySummary): Metadata {
  const title = `${caseStudy.clientName} case study`;
  const path = caseStudyPath(caseStudy.slug);
  const { src, alt, width, height } = caseStudy.coverImage;
  return {
    title,
    description: caseStudy.headline,
    alternates: { canonical: path },
    ...buildSocialShareMetadata({
      title: `${title} | Falcore`,
      description: caseStudy.headline,
      path,
      image: { url: src, alt, width, height },
    }),
  };
}
