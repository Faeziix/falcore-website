import { CaseStudyFigure } from "@/app/work/_components/case-study-figure";
import type { CaseStudyImage } from "@/app/work/_lib/case-study-types";
import { CONTAINER_WIDE_IMAGE_SIZES, PHONE_SINGLE_IMAGE_SIZES } from "../_lib/image-sizes";

export function ArtDirectedFigure({
  desktopImage,
  phoneImage,
  isPriority = false,
}: {
  desktopImage: CaseStudyImage;
  phoneImage: CaseStudyImage;
  isPriority?: boolean;
}) {
  return (
    <>
      <CaseStudyFigure
        image={phoneImage}
        sizes={PHONE_SINGLE_IMAGE_SIZES}
        frame="hairline"
        isPriority={isPriority}
        className="sm:max-w-sm md:hidden"
      />
      <CaseStudyFigure
        image={desktopImage}
        sizes={CONTAINER_WIDE_IMAGE_SIZES}
        frame="hairline"
        isPriority={isPriority}
        className="hidden md:block"
      />
    </>
  );
}
