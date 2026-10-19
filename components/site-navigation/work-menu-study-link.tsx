"use client";

import Link from "next/link";
import { caseStudyPath } from "@/app/work/_lib/case-study-index";
import type { CaseStudySummary } from "@/app/work/_lib/case-study-types";
import { cn } from "@/lib/utils";
import { isMousePointer } from "./use-menu-hover";

type WorkMenuStudyLinkProps = {
  caseStudy: CaseStudySummary;
  isPreviewed: boolean;
  isCurrentPage: boolean;
  onPreview: () => void;
  onNavigate: () => void;
};

function studyNameToneClassName(isCurrentPage: boolean, isPreviewed: boolean) {
  if (isCurrentPage) return "text-accent";
  return isPreviewed ? "text-foreground" : "text-muted-foreground";
}

export function WorkMenuStudyLink({
  caseStudy,
  isPreviewed,
  isCurrentPage,
  onPreview,
  onNavigate,
}: WorkMenuStudyLinkProps) {
  return (
    <li className="border-b border-border first:border-t">
      <Link
        href={caseStudyPath(caseStudy.slug)}
        onClick={onNavigate}
        onPointerEnter={(event) => {
          if (isMousePointer(event)) onPreview();
        }}
        onFocus={onPreview}
        aria-current={isCurrentPage ? "page" : undefined}
        className="group/study flex items-baseline justify-between gap-6 py-3 focus-visible:outline-offset-2"
      >
        <span
          className={cn(
            "font-display text-xl font-medium transition-colors duration-200",
            studyNameToneClassName(isCurrentPage, isPreviewed)
          )}
        >
          {caseStudy.clientName}
        </span>
        <span
          className={cn(
            "shrink-0 text-sm text-muted-foreground transition-opacity duration-200",
            isPreviewed ? "opacity-100" : "opacity-0"
          )}
        >
          {caseStudy.year}
        </span>
      </Link>
    </li>
  );
}
