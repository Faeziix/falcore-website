import { CaseStudyChapter } from "@/app/work/_components/case-study-chapter";
import { CHAPTER_COPY } from "../_lib/case-study-content";
import { TreatmentImageryWall } from "./treatment-imagery-wall";

export function PhotographsChapter() {
  return (
    <CaseStudyChapter
      id="photographs"
      title={CHAPTER_COPY.photographs.title}
      intro={CHAPTER_COPY.photographs.intro}
      isMediaFullBleed
    >
      <TreatmentImageryWall />
    </CaseStudyChapter>
  );
}
