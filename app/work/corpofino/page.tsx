import "./case-study-theme.css";
import { CaseStudyLayout } from "@/app/work/_components/case-study-layout";
import { CaseStudyHero } from "@/app/work/_components/case-study-hero";
import { CaseStudyOutcomes } from "@/app/work/_components/case-study-outcomes";
import { buildCaseStudyMetadata } from "@/app/work/_lib/case-study-metadata";
import { corpofinoCaseStudySummary } from "./_lib/case-study-summary";
import { corpofinoFontVariables } from "./_lib/fonts";
import { OUTCOMES, OUTCOMES_INTRO } from "./_lib/case-study-content";
import { CorpofinoHeroMedia } from "./_components/corpofino-hero-media";
import { DocumentsChapter } from "./_components/documents-chapter";
import { PriceMenuChapter } from "./_components/price-menu-chapter";
import { RightToLeftChapter } from "./_components/right-to-left-chapter";
import { OldAddressesChapter } from "./_components/old-addresses-chapter";
import { PhotographsChapter } from "./_components/photographs-chapter";
import { DepartmentsChapter } from "./_components/departments-chapter";

const CLIENT_NAME_DISPLAY_CLASS_NAME =
  "font-normal text-[length:clamp(3.5rem,11vw+0.75rem,7.5rem)] leading-[0.95] tracking-[-0.04em]";

export const metadata = buildCaseStudyMetadata(corpofinoCaseStudySummary);

export default function CorpofinoCaseStudyPage() {
  return (
    <CaseStudyLayout slug={corpofinoCaseStudySummary.slug} fontClassName={corpofinoFontVariables}>
      <CaseStudyHero
        caseStudy={corpofinoCaseStudySummary}
        clientNameClassName={CLIENT_NAME_DISPLAY_CLASS_NAME}
        media={<CorpofinoHeroMedia />}
      />
      <DocumentsChapter />
      <PriceMenuChapter />
      <RightToLeftChapter />
      <OldAddressesChapter />
      <PhotographsChapter />
      <DepartmentsChapter />
      <CaseStudyOutcomes intro={OUTCOMES_INTRO} outcomes={OUTCOMES} />
    </CaseStudyLayout>
  );
}
