import type { MetadataRoute } from "next";
import { SERVICES } from "@/lib/data/services";
import { CASE_STUDIES, CASE_STUDY_INDEX_PATH, caseStudyPath } from "@/app/work/_lib/case-study-index";

const SITE_ORIGIN = "https://falcoretech.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: "https://falcoretech.com",
      lastModified: now,
    },
    {
      url: "https://falcoretech.com/about",
      lastModified: now,
    },
    {
      url: "https://falcoretech.com/contact",
      lastModified: now,
    },
    {
      url: `${SITE_ORIGIN}/services`,
      lastModified: now,
    },
    ...SERVICES.map((service) => ({
      url: `${SITE_ORIGIN}/services/${service.slug}`,
      lastModified: now,
    })),
    {
      url: `${SITE_ORIGIN}${CASE_STUDY_INDEX_PATH}`,
      lastModified: now,
    },
    ...CASE_STUDIES.map((caseStudy) => ({
      url: `${SITE_ORIGIN}${caseStudyPath(caseStudy.slug)}`,
      lastModified: now,
    })),
    {
      url: "https://falcoretech.com/privacy",
      lastModified: new Date("2026-04-03"),
    },
  ];
}
