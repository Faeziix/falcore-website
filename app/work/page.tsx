import type { Metadata } from "next";
import { SiteNavigation } from "@/components/site-navigation";
import { PageClosing } from "@/components/page-closing";
import { CaseStudyIndexList } from "./_components/case-study-index-list";
import { CASE_STUDY_INDEX_PATH } from "./_lib/case-study-index";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies: the websites, apps and AI systems I designed and built for businesses in Dubai and beyond.",
  alternates: { canonical: CASE_STUDY_INDEX_PATH },
};

export default function WorkIndexPage() {
  return (
    <>
      <SiteNavigation />
      <main className="pt-32">
        <div className="page-container pb-[var(--section-space)]">
          <h1 className="max-w-5xl text-display-xl font-medium text-foreground animate-rise-in">
            Work
          </h1>
          <p className="mt-6 max-w-2xl text-balance text-lead text-foreground-soft animate-rise-in [animation-delay:120ms]">
            Websites, apps and AI systems I designed and built, and what they changed for each business.
          </p>
          <CaseStudyIndexList />
        </div>
      </main>
      <PageClosing />
    </>
  );
}
