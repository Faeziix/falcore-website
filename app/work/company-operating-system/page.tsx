import "./case-study-theme.css";
import { CaseStudyHero } from "@/app/work/_components/case-study-hero";
import { CaseStudyLayout } from "@/app/work/_components/case-study-layout";
import { CaseStudyOutcomes } from "@/app/work/_components/case-study-outcomes";
import { buildCaseStudyMetadata } from "@/app/work/_lib/case-study-metadata";
import { HeroMedia } from "./_components/hero-media";
import { ProjectViewsChapter } from "./_components/project-views/project-views-chapter";
import { ScreenshotChapter } from "./_components/screenshot-chapter";
import { SourceTraceChapter } from "./_components/source-trace/source-trace-chapter";
import { StudioChapter } from "./_components/studio-chapter";
import { companyOperatingSystemCaseStudySummary } from "./_lib/case-study-summary";
import { approvalChapter, inboxChapter, meetingsChapter } from "./_lib/case-study-chapters";
import { companyOperatingSystemOutcomes, outcomesIntro } from "./_lib/case-study-outcomes";
import { companyOperatingSystemFontClassName } from "./_lib/fonts";

export const metadata = buildCaseStudyMetadata(companyOperatingSystemCaseStudySummary);

export default function CompanyOperatingSystemCaseStudyPage() {
  return (
    <CaseStudyLayout
      slug={companyOperatingSystemCaseStudySummary.slug}
      fontClassName={companyOperatingSystemFontClassName}
    >
      <CaseStudyHero
        caseStudy={companyOperatingSystemCaseStudySummary}
        media={<HeroMedia />}
        clientNameClassName="max-w-5xl font-semibold tracking-[-0.045em]"
      />
      <SourceTraceChapter />
      <ScreenshotChapter chapter={approvalChapter} tone="raised" placement="sevenColumnsRight" />
      <ProjectViewsChapter />
      <ScreenshotChapter chapter={meetingsChapter} tone="raised" placement="eightColumnsLeft" />
      <ScreenshotChapter chapter={inboxChapter} />
      <StudioChapter tone="raised" />
      <CaseStudyOutcomes intro={outcomesIntro} outcomes={companyOperatingSystemOutcomes} />
    </CaseStudyLayout>
  );
}
