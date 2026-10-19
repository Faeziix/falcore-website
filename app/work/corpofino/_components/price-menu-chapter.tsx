import { CaseStudyChapter } from "@/app/work/_components/case-study-chapter";
import { CHAPTER_COPY } from "../_lib/case-study-content";
import { priceMenuFrame, priceMenuPhoneFrame } from "../_lib/case-study-images";
import { ArtDirectedFigure } from "./art-directed-figure";

export function PriceMenuChapter() {
  return (
    <CaseStudyChapter
      id="price-menu"
      tone="raised"
      title={CHAPTER_COPY.priceMenu.title}
      intro={CHAPTER_COPY.priceMenu.intro}
    >
      <ArtDirectedFigure desktopImage={priceMenuFrame} phoneImage={priceMenuPhoneFrame} />
    </CaseStudyChapter>
  );
}
