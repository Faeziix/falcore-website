import type { Article } from "schema-dts";
import { serviceId } from "@/lib/structured-data/entity-ids";
import { breadcrumbNode } from "@/lib/structured-data/page-nodes";
import { founderAuthor, organizationReference } from "@/lib/structured-data/site-entities";
import { absoluteUrl } from "@/lib/site-config";
import { CASE_STUDY_INDEX_PATH, caseStudyPath } from "./case-study-index";
import type { CaseStudySummary } from "./case-study-types";

function caseStudyArticleNode(caseStudy: CaseStudySummary): Article {
  const pageUrl = absoluteUrl(caseStudyPath(caseStudy.slug));
  return {
    "@type": "Article",
    "@id": `${pageUrl}#article`,
    headline: caseStudy.seoTitle,
    description: caseStudy.headline,
    url: pageUrl,
    mainEntityOfPage: pageUrl,
    image: {
      "@type": "ImageObject",
      url: absoluteUrl(caseStudy.coverImage.src),
      width: String(caseStudy.coverImage.width),
      height: String(caseStudy.coverImage.height),
      caption: caseStudy.coverImage.alt,
    },
    datePublished: caseStudy.dates.publishedOn,
    dateModified: caseStudy.dates.updatedOn,
    author: founderAuthor,
    publisher: organizationReference,
    inLanguage: "en",
    about: caseStudy.serviceSlugs.map((slug) => ({ "@id": serviceId(slug) })),
    keywords: caseStudy.services.join(", "),
    articleSection: "Case studies",
  };
}

export function caseStudyStructuredDataNodes(caseStudy: CaseStudySummary) {
  const path = caseStudyPath(caseStudy.slug);
  return [
    caseStudyArticleNode(caseStudy),
    breadcrumbNode(path, [
      { name: "Work", path: CASE_STUDY_INDEX_PATH },
      { name: caseStudy.clientName, path },
    ]),
  ];
}
