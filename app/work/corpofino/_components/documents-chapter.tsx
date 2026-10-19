import { CaseStudyChapter } from "@/app/work/_components/case-study-chapter";
import { CHAPTER_COPY } from "../_lib/case-study-content";
import { treatmentPageFrame, treatmentPagePhoneFrame } from "../_lib/case-study-images";
import { ArtDirectedFigure } from "./art-directed-figure";

export function DocumentsChapter() {
  return (
    <CaseStudyChapter
      id="documents"
      title={CHAPTER_COPY.documents.title}
      intro={CHAPTER_COPY.documents.intro}
    >
      <ArtDirectedFigure desktopImage={treatmentPageFrame} phoneImage={treatmentPagePhoneFrame} />
    </CaseStudyChapter>
  );
}
