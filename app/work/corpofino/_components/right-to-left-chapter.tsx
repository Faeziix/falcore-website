import { CaseStudyChapter } from "@/app/work/_components/case-study-chapter";
import { CaseStudyFigure } from "@/app/work/_components/case-study-figure";
import { CAPTIONS, CHAPTER_COPY } from "../_lib/case-study-content";
import {
  arabicHomeFrame,
  arabicHomePhoneFrame,
  englishHomeFrame,
  englishHomePhoneFrame,
} from "../_lib/case-study-images";
import { CONTAINER_HALF_IMAGE_SIZES, PHONE_PAIR_IMAGE_SIZES } from "../_lib/image-sizes";

export function RightToLeftChapter() {
  return (
    <CaseStudyChapter
      id="right-to-left"
      title={CHAPTER_COPY.rightToLeft.title}
      intro={CHAPTER_COPY.rightToLeft.intro}
    >
      <figure>
        <div className="hidden gap-4 md:grid lg:grid-cols-2 lg:gap-5">
          <CaseStudyFigure image={englishHomeFrame} sizes={CONTAINER_HALF_IMAGE_SIZES} frame="hairline" />
          <CaseStudyFigure image={arabicHomeFrame} sizes={CONTAINER_HALF_IMAGE_SIZES} frame="hairline" />
        </div>
        <div className="grid grid-cols-2 gap-2 md:hidden">
          <CaseStudyFigure image={englishHomePhoneFrame} sizes={PHONE_PAIR_IMAGE_SIZES} frame="hairline" />
          <CaseStudyFigure image={arabicHomePhoneFrame} sizes={PHONE_PAIR_IMAGE_SIZES} frame="hairline" />
        </div>
        <figcaption className="mt-4 max-w-xl text-sm text-case-ink-soft">{CAPTIONS.rightToLeft}</figcaption>
      </figure>
    </CaseStudyChapter>
  );
}
