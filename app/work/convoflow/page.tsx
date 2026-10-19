import "./case-study-theme.css";
import { CaseStudyLayout } from "@/app/work/_components/case-study-layout";
import { CaseStudyHero } from "@/app/work/_components/case-study-hero";
import { CaseStudyOutcomes } from "@/app/work/_components/case-study-outcomes";
import { buildCaseStudyMetadata } from "@/app/work/_lib/case-study-metadata";
import { convoFlowCaseStudySummary } from "./_lib/case-study-summary";
import { convoFlowChapterCopy } from "./_lib/convoflow-chapters";
import { convoFlowOutcomes } from "./_lib/convoflow-outcomes";
import { convoFlowDisplayFont } from "./_lib/fonts";
import { ConvoFlowHeroMedia } from "./_components/convoflow-hero-media";
import { ConvoFlowChapters } from "./_components/convoflow-chapters";
import { LeadFlowSignatureChapter } from "./_components/lead-flow-signature-chapter";

export const metadata = buildCaseStudyMetadata(convoFlowCaseStudySummary);

export default function ConvoFlowCaseStudyPage() {
  return (
    <CaseStudyLayout slug={convoFlowCaseStudySummary.slug} fontClassName={convoFlowDisplayFont.variable}>
      <CaseStudyHero
        caseStudy={convoFlowCaseStudySummary}
        media={<ConvoFlowHeroMedia />}
        clientNameClassName="font-semibold tracking-[-0.045em] max-sm:text-[3.25rem]"
      />
      <ConvoFlowChapters />
      <LeadFlowSignatureChapter />
      <CaseStudyOutcomes intro={convoFlowChapterCopy.outcomes.intro} outcomes={convoFlowOutcomes} />
    </CaseStudyLayout>
  );
}
