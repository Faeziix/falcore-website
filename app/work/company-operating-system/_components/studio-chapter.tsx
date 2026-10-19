import { CaseStudyChapter } from "@/app/work/_components/case-study-chapter";
import { studioChapter } from "../_lib/case-study-chapters";
import { containedScreenshotSizes, eightColumnScreenshotSizes } from "../_lib/screenshot-sizes";
import { ArtDirectedFigure } from "./art-directed-figure";

export function StudioChapter({ tone }: { tone?: "paper" | "raised" }) {
  return (
    <CaseStudyChapter
      id={studioChapter.id}
      title={studioChapter.title}
      intro={studioChapter.intro}
      tone={tone}
    >
      <ArtDirectedFigure {...studioChapter.director} sizes={containedScreenshotSizes} />
      <div className="mt-6 grid lg:mt-8 lg:grid-cols-12 lg:gap-8">
        <ArtDirectedFigure
          {...studioChapter.clientRound}
          sizes={eightColumnScreenshotSizes}
          className="lg:col-span-8 lg:col-start-5"
        />
      </div>
    </CaseStudyChapter>
  );
}
