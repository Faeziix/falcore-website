import type { ReactNode } from "react";
import { SiteNavigation } from "@/components/site-navigation";
import { PageClosing } from "@/components/page-closing";
import { JsonLd } from "@/lib/structured-data/json-ld";
import { cn } from "@/lib/utils";
import { findCaseStudy } from "../_lib/case-study-index";
import { caseStudyStructuredDataNodes } from "../_lib/case-study-structured-data";
import { CaseStudyServiceLinks } from "./case-study-service-links";
import { NextCaseStudy } from "./next-case-study";

export function CaseStudyLayout({
  slug,
  fontClassName,
  children,
}: {
  slug: string;
  fontClassName?: string;
  children: ReactNode;
}) {
  const caseStudy = findCaseStudy(slug);

  return (
    <>
      {caseStudy ? <JsonLd nodes={caseStudyStructuredDataNodes(caseStudy)} /> : null}
      <SiteNavigation surface="solid" />
      <main data-case-study={slug} className={cn("bg-case-paper pt-28 text-case-ink md:pt-32", fontClassName)}>
        <article>{children}</article>
        {caseStudy ? <CaseStudyServiceLinks serviceSlugs={caseStudy.serviceSlugs} /> : null}
        <NextCaseStudy currentSlug={slug} />
      </main>
      <PageClosing />
    </>
  );
}
