import { CaseStudyChapter } from "@/app/work/_components/case-study-chapter";
import { CaseStudyFigure } from "@/app/work/_components/case-study-figure";
import { CHAPTER_COPY } from "../_lib/case-study-content";
import { treatmentPageFrame } from "../_lib/case-study-images";
import { CONTAINER_WIDE_IMAGE_SIZES } from "../_lib/image-sizes";

export function DocumentsChapter() {
  return (
    <CaseStudyChapter
      id="documents"
      title={CHAPTER_COPY.documents.title}
      intro={CHAPTER_COPY.documents.intro}
    >
      <CaseStudyFigure image={treatmentPageFrame} sizes={CONTAINER_WIDE_IMAGE_SIZES} frame="hairline" />
    </CaseStudyChapter>
  );
}
