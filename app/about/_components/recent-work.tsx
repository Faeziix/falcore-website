import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { PlottedRowList } from "@/components/plotted-row-list";
import { textLinkVariants } from "@/components/ui/text-link";
import { CASE_STUDIES, CASE_STUDY_INDEX_PATH, caseStudyPath } from "@/app/work/_lib/case-study-index";
import { RECENT_WORK_COUNT } from "../_lib/about-content";

const recentWorkRows = CASE_STUDIES.slice(0, RECENT_WORK_COUNT).map((caseStudy) => ({
  title: caseStudy.clientName,
  description: caseStudy.headline,
  link: { href: caseStudyPath(caseStudy.slug), label: "Read the case study" },
}));

export function RecentWork() {
  return (
    <section aria-labelledby="recent-work-heading" className="pb-(--section-space)">
      <SectionHeading
        id="recent-work-heading"
        title="Recent work"
        intro="A few of the systems and sites I’ve shipped, and what each one changed."
      />
      <PlottedRowList rows={recentWorkRows} />
      <Link
        href={CASE_STUDY_INDEX_PATH}
        className={textLinkVariants({ tone: "foreground", underline: "always", className: "mt-10" })}
      >
        See all work
      </Link>
    </section>
  );
}
