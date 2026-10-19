import { diaMariaCaseStudySummary } from "@/app/work/diamaria/_lib/case-study-summary";
import { companyOperatingSystemCaseStudySummary } from "@/app/work/company-operating-system/_lib/case-study-summary";
import { xmaAgencyCaseStudySummary } from "@/app/work/xma-agency/_lib/case-study-summary";
import { convoFlowCaseStudySummary } from "@/app/work/convoflow/_lib/case-study-summary";
import { timelessTouchCeramicsCaseStudySummary } from "@/app/work/timeless-touch-ceramics/_lib/case-study-summary";
import { sanaaOuahmaneCaseStudySummary } from "@/app/work/sanaa-ouahmane/_lib/case-study-summary";
import { corpofinoCaseStudySummary } from "@/app/work/corpofino/_lib/case-study-summary";
import type { CaseStudySummary } from "./case-study-types";

export const CASE_STUDY_INDEX_PATH = "/work";

export const CASE_STUDIES: CaseStudySummary[] = [
  companyOperatingSystemCaseStudySummary,
  diaMariaCaseStudySummary,
  xmaAgencyCaseStudySummary,
  convoFlowCaseStudySummary,
  timelessTouchCeramicsCaseStudySummary,
  sanaaOuahmaneCaseStudySummary,
  corpofinoCaseStudySummary,
];

export function caseStudyPath(slug: string) {
  return `${CASE_STUDY_INDEX_PATH}/${slug}`;
}

export function findCaseStudy(slug: string) {
  return CASE_STUDIES.find((caseStudy) => caseStudy.slug === slug);
}

export function findNextCaseStudy(slug: string) {
  const currentIndex = CASE_STUDIES.findIndex((caseStudy) => caseStudy.slug === slug);
  return CASE_STUDIES[(currentIndex + 1) % CASE_STUDIES.length];
}
