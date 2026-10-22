import type { Metadata } from "next";
import { SiteNavigation } from "@/components/site-navigation";
import { PageClosing } from "@/components/page-closing";
import { CaseStudyIndexList } from "./_components/case-study-index-list";
import { CASE_STUDIES, CASE_STUDY_INDEX_PATH, caseStudyPath } from "./_lib/case-study-index";
import { buildSocialShareMetadata, generatedShareCard } from "@/lib/social-share-metadata";
import { STATIC_PAGE_DATES } from "@/lib/data/page-dates";
import { JsonLd } from "@/lib/structured-data/json-ld";
import { breadcrumbNode, collectionPageNode } from "@/lib/structured-data/page-nodes";

const WORK_INDEX_TITLE = "Work: Websites, Apps & AI Systems I've Built";

const WORK_INDEX_DESCRIPTION =
  "Case studies: the websites, apps and AI systems I designed and built for businesses in Dubai, Abu Dhabi and beyond, and what each one changed.";

export const metadata: Metadata = {
  title: WORK_INDEX_TITLE,
  description: WORK_INDEX_DESCRIPTION,
  alternates: { canonical: CASE_STUDY_INDEX_PATH },
  ...buildSocialShareMetadata({
    title: `${WORK_INDEX_TITLE} | Falcore`,
    description: WORK_INDEX_DESCRIPTION,
    path: CASE_STUDY_INDEX_PATH,
    image: generatedShareCard("work", "Falcore case studies: websites, apps and AI systems, and what they changed"),
  }),
};

const workIndexStructuredData = [
  collectionPageNode(
    {
      path: CASE_STUDY_INDEX_PATH,
      name: WORK_INDEX_TITLE,
      description: WORK_INDEX_DESCRIPTION,
      dates: STATIC_PAGE_DATES.work,
    },
    CASE_STUDIES.map((caseStudy) => ({ name: caseStudy.seoTitle, path: caseStudyPath(caseStudy.slug) }))
  ),
  breadcrumbNode(CASE_STUDY_INDEX_PATH, [{ name: "Work", path: CASE_STUDY_INDEX_PATH }]),
];

export default function WorkIndexPage() {
  return (
    <>
      <JsonLd nodes={workIndexStructuredData} />
      <SiteNavigation />
      <main className="pt-28 md:pt-32">
        <div className="page-container pb-(--section-space)">
          <h1 className="max-w-5xl text-display-xl font-medium text-foreground animate-rise-in">
            Work
          </h1>
          <p className="mt-5 max-w-2xl text-balance text-lead text-foreground-soft animate-rise-in [animation-delay:120ms]">
            Websites, apps and AI systems I designed and built, and what they changed for each business.
          </p>
          <CaseStudyIndexList />
        </div>
      </main>
      <PageClosing />
    </>
  );
}
