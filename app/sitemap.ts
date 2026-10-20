import type { MetadataRoute } from "next";
import { SERVICES } from "@/lib/data/services";
import { CASE_STUDIES, CASE_STUDY_INDEX_PATH, caseStudyPath } from "@/app/work/_lib/case-study-index";
import { SITE_URL } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: SITE_URL,
      lastModified: now,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: now,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: now,
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: now,
    },
    ...SERVICES.map((service) => ({
      url: `${SITE_URL}/services/${service.slug}`,
      lastModified: now,
    })),
    {
      url: `${SITE_URL}${CASE_STUDY_INDEX_PATH}`,
      lastModified: now,
    },
    ...CASE_STUDIES.map((caseStudy) => ({
      url: `${SITE_URL}${caseStudyPath(caseStudy.slug)}`,
      lastModified: now,
    })),
    {
      url: `${SITE_URL}/privacy`,
      lastModified: new Date("2026-10-20"),
    },
  ];
}
