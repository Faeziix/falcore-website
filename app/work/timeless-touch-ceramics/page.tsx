import "./case-study-theme.css";
import { CaseStudyLayout } from "@/app/work/_components/case-study-layout";
import { CaseStudyHero } from "@/app/work/_components/case-study-hero";
import { CaseStudyOutcomes } from "@/app/work/_components/case-study-outcomes";
import { buildCaseStudyMetadata } from "@/app/work/_lib/case-study-metadata";
import { BookmatchReveal } from "./_components/bookmatch-reveal";
import { TimelessTouchChapterSequence } from "./_components/timeless-touch-chapter-sequence";
import { timelessTouchCeramicsCaseStudySummary } from "./_lib/case-study-summary";
import { timelessTouchCeramicsDisplayFont } from "./_lib/fonts";
import { timelessTouchOutcomes, timelessTouchOutcomesIntro } from "./_lib/timeless-touch-outcomes";

export const metadata = buildCaseStudyMetadata(timelessTouchCeramicsCaseStudySummary);

export default function TimelessTouchCeramicsCaseStudyPage() {
  return (
    <CaseStudyLayout
      slug={timelessTouchCeramicsCaseStudySummary.slug}
      fontClassName={timelessTouchCeramicsDisplayFont.variable}
    >
      <CaseStudyHero
        caseStudy={timelessTouchCeramicsCaseStudySummary}
        clientNameClassName="tracking-[-0.045em]"
        media={<BookmatchReveal />}
      />
      <TimelessTouchChapterSequence />
      <CaseStudyOutcomes intro={timelessTouchOutcomesIntro} outcomes={timelessTouchOutcomes} />
    </CaseStudyLayout>
  );
}
