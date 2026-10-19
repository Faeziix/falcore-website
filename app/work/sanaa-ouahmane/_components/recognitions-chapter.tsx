import { CaseStudyChapter } from "@/app/work/_components/case-study-chapter";
import { CaseStudyFigure } from "@/app/work/_components/case-study-figure";
import { recognitionsChapter } from "../_lib/case-study-chapters";
import {
  recognitionsTimelineDesktopImage,
  recognitionsTimelineMobileImage,
} from "../_lib/case-study-images";

export function RecognitionsChapter() {
  return (
    <CaseStudyChapter
      id={recognitionsChapter.id}
      title={recognitionsChapter.title}
      intro={recognitionsChapter.intro}
    >
      <CaseStudyFigure
        image={recognitionsTimelineDesktopImage}
        frame="hairline"
        sizes="(min-width: 1024px) 1024px, 100vw"
        className="mx-auto hidden max-w-5xl lg:block"
      />
      <CaseStudyFigure
        image={recognitionsTimelineMobileImage}
        frame="hairline"
        sizes="(min-width: 640px) 384px, calc(100vw - 2rem)"
        className="mx-auto max-w-sm lg:hidden"
      />
    </CaseStudyChapter>
  );
}
