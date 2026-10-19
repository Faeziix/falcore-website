import "./case-study-theme.css";
import { CaseStudyHero } from "@/app/work/_components/case-study-hero";
import { CaseStudyLayout } from "@/app/work/_components/case-study-layout";
import { CaseStudyOutcomes } from "@/app/work/_components/case-study-outcomes";
import { buildCaseStudyMetadata } from "@/app/work/_lib/case-study-metadata";
import { CallToAdsChapter } from "./_components/call-to-ads-chapter";
import { CaptureChapter } from "./_components/capture-chapter";
import { OneKitChapter } from "./_components/one-kit/one-kit-chapter";
import { ResponsiveCapture } from "./_components/responsive-capture";
import { WhereItStartedChapter } from "./_components/where-it-started-chapter";
import { filmsChapter, marketsChapter } from "./_lib/case-study-chapters";
import {
  filmsByProductDesktop,
  filmsByProductPhone,
  marketPageDesktop,
  marketPagePhone,
  mediaHomeDesktop,
  mediaHomePhone,
} from "./_lib/case-study-images";
import { xmaAgencyCaseStudySummary } from "./_lib/case-study-summary";
import { xmaAgencyOutcomes, xmaAgencyOutcomesIntro } from "./_lib/case-study-outcomes";
import { xmaAgencyFontVariables } from "./_lib/fonts";

export const metadata = buildCaseStudyMetadata(xmaAgencyCaseStudySummary);

export default function XmaAgencyCaseStudyPage() {
  return (
    <CaseStudyLayout slug={xmaAgencyCaseStudySummary.slug} fontClassName={xmaAgencyFontVariables}>
      <CaseStudyHero
        caseStudy={xmaAgencyCaseStudySummary}
        clientNameClassName="pb-[0.14em]"
        media={
          <ResponsiveCapture
            desktop={mediaHomeDesktop}
            phone={mediaHomePhone}
            desktopSizes="(min-width: 1400px) 1336px, 96vw"
            isPriority
            className="page-container"
          />
        }
      />
      <CaptureChapter chapter={filmsChapter} desktop={filmsByProductDesktop} phone={filmsByProductPhone} />
      <CaptureChapter chapter={marketsChapter} desktop={marketPageDesktop} phone={marketPagePhone} tone="raised" />
      <CallToAdsChapter />
      <OneKitChapter />
      <WhereItStartedChapter />
      <CaseStudyOutcomes intro={xmaAgencyOutcomesIntro} outcomes={xmaAgencyOutcomes} />
    </CaseStudyLayout>
  );
}
