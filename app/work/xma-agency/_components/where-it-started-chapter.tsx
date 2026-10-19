import { CaseStudyChapter } from "@/app/work/_components/case-study-chapter";
import { CaseStudyFigure } from "@/app/work/_components/case-study-figure";
import { whereItStartedChapter } from "../_lib/case-study-chapters";
import { firstSiteHero } from "../_lib/case-study-images";

export function WhereItStartedChapter() {
  return (
    <CaseStudyChapter
      id={whereItStartedChapter.id}
      title={whereItStartedChapter.title}
      intro={whereItStartedChapter.intro}
      tone="raised"
    >
      <CaseStudyFigure
        image={firstSiteHero}
        frame="hairline"
        sizes="(min-width: 1400px) 880px, (min-width: 1024px) 64vw, 96vw"
        className="lg:w-2/3"
      />
    </CaseStudyChapter>
  );
}
