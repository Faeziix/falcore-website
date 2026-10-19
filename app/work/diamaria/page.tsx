import "./case-study-theme.css";
import { CaseStudyLayout } from "@/app/work/_components/case-study-layout";
import { CaseStudyHero } from "@/app/work/_components/case-study-hero";
import { CaseStudyOutcomes } from "@/app/work/_components/case-study-outcomes";
import { buildCaseStudyMetadata } from "@/app/work/_lib/case-study-metadata";
import { diaMariaCaseStudySummary } from "./_lib/case-study-summary";
import { diaMariaFontVariables } from "./_lib/fonts";
import {
  catalogueChapter,
  diaMariaOutcomes,
  houseScenesChapter,
  matchedPackshotsChapter,
  outcomesIntro,
  startingPhotographsChapter,
  wornFramesChapter,
} from "./_lib/diamaria-chapters";
import { DiaMariaChapter } from "./_components/diamaria-chapter";
import { HeroCampaignPhotograph } from "./_components/hero-campaign-photograph";
import { StartingPhotographs } from "./_components/starting-photographs";
import { LoupeChapter } from "./_components/loupe-chapter";
import { MatchedPackshotGrid } from "./_components/matched-packshot-grid";
import { RawToWornSequence } from "./_components/raw-to-worn-sequence";
import { CatalogueCaptures } from "./_components/catalogue-captures";
import { HouseScenes } from "./_components/house-scenes";

export const metadata = buildCaseStudyMetadata(diaMariaCaseStudySummary);

export default function DiaMariaCaseStudyPage() {
  return (
    <CaseStudyLayout slug={diaMariaCaseStudySummary.slug} fontClassName={diaMariaFontVariables}>
      <CaseStudyHero
        caseStudy={diaMariaCaseStudySummary}
        media={<HeroCampaignPhotograph />}
        clientNameClassName="uppercase tracking-[0.04em] [--diamaria-display-weight:200]"
      />
      <DiaMariaChapter {...startingPhotographsChapter}>
        <StartingPhotographs />
      </DiaMariaChapter>
      <LoupeChapter />
      <DiaMariaChapter {...matchedPackshotsChapter} width="fullBleed">
        <MatchedPackshotGrid />
      </DiaMariaChapter>
      <DiaMariaChapter {...wornFramesChapter}>
        <RawToWornSequence />
      </DiaMariaChapter>
      <DiaMariaChapter {...catalogueChapter} tone="raised">
        <CatalogueCaptures />
      </DiaMariaChapter>
      <DiaMariaChapter {...houseScenesChapter}>
        <HouseScenes />
      </DiaMariaChapter>
      <CaseStudyOutcomes intro={outcomesIntro} outcomes={diaMariaOutcomes} />
    </CaseStudyLayout>
  );
}
