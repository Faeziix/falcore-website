import "./case-study-theme.css";
import { CaseStudyLayout } from "@/app/work/_components/case-study-layout";
import { CaseStudyHero } from "@/app/work/_components/case-study-hero";
import { CaseStudyOutcomes } from "@/app/work/_components/case-study-outcomes";
import { buildCaseStudyMetadata } from "@/app/work/_lib/case-study-metadata";
import { sanaaOuahmaneCaseStudySummary } from "./_lib/case-study-summary";
import { sanaaOuahmaneFontVariables } from "./_lib/fonts";
import { sanaaOuahmaneOutcomes } from "./_lib/case-study-outcomes";
import { outcomesIntro } from "./_lib/case-study-chapters";
import { CaseStudyHeroMedia } from "./_components/case-study-hero-media";
import { LightPageChapter } from "./_components/light-page-chapter";
import { PortraitsAsShotChapter } from "./_components/portraits-as-shot-chapter";
import { BookLaunchChapter } from "./_components/book-launch-chapter";
import { ExcerptSignature } from "./_components/excerpt-signature";
import { RecognitionsChapter } from "./_components/recognitions-chapter";
import { SelfEditingChapter } from "./_components/self-editing-chapter";

const sanaaOuahmaneClientNameClassName =
  "text-[clamp(3rem,7.2vw+1rem,7.5rem)] leading-[0.96]";

export const metadata = buildCaseStudyMetadata(sanaaOuahmaneCaseStudySummary);

export default function SanaaOuahmaneCaseStudyPage() {
  return (
    <CaseStudyLayout slug={sanaaOuahmaneCaseStudySummary.slug} fontClassName={sanaaOuahmaneFontVariables}>
      <CaseStudyHero
        caseStudy={sanaaOuahmaneCaseStudySummary}
        clientNameClassName={sanaaOuahmaneClientNameClassName}
        media={<CaseStudyHeroMedia />}
      />
      <LightPageChapter />
      <PortraitsAsShotChapter />
      <BookLaunchChapter />
      <ExcerptSignature />
      <RecognitionsChapter />
      <SelfEditingChapter />
      <CaseStudyOutcomes intro={outcomesIntro} outcomes={sanaaOuahmaneOutcomes} />
    </CaseStudyLayout>
  );
}
