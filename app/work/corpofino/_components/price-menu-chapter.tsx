import { CaseStudyChapter } from "@/app/work/_components/case-study-chapter";
import { CaseStudyFigure } from "@/app/work/_components/case-study-figure";
import { CHAPTER_COPY } from "../_lib/case-study-content";
import { priceMenuFrame, priceMenuPhoneFrame } from "../_lib/case-study-images";
import { CONTAINER_WIDE_IMAGE_SIZES, PHONE_SINGLE_IMAGE_SIZES } from "../_lib/image-sizes";

export function PriceMenuChapter() {
  return (
    <CaseStudyChapter
      id="price-menu"
      tone="raised"
      title={CHAPTER_COPY.priceMenu.title}
      intro={CHAPTER_COPY.priceMenu.intro}
    >
      <CaseStudyFigure
        image={priceMenuFrame}
        sizes={CONTAINER_WIDE_IMAGE_SIZES}
        frame="hairline"
        className="hidden md:block"
      />
      <CaseStudyFigure
        image={priceMenuPhoneFrame}
        sizes={PHONE_SINGLE_IMAGE_SIZES}
        frame="hairline"
        className="md:hidden"
      />
    </CaseStudyChapter>
  );
}
