import type { ReactNode } from "react";
import { SiteNavigation } from "@/components/site-navigation";
import { PageClosing } from "@/components/page-closing";
import { cn } from "@/lib/utils";
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
  return (
    <>
      <SiteNavigation surface="solid" />
      <main data-case-study={slug} className={cn("bg-case-paper pt-32 text-case-ink", fontClassName)}>
        <article>{children}</article>
        <NextCaseStudy currentSlug={slug} />
      </main>
      <PageClosing />
    </>
  );
}
