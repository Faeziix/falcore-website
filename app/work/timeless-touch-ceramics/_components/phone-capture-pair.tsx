import { CaseStudyFigure } from "@/app/work/_components/case-study-figure";
import { eliteNeroMobileImage, galleryRowsMobileImage } from "../_lib/timeless-touch-images";

const PHONE_IMAGE_SIZES = "(min-width: 1024px) 420px, (min-width: 640px) 40vw, 46vw";

export function PhoneCapturePair() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-12 sm:gap-8">
      <CaseStudyFigure
        image={galleryRowsMobileImage}
        sizes={PHONE_IMAGE_SIZES}
        frame="hairline"
        className="sm:col-span-5 sm:col-start-2 lg:col-span-4 lg:col-start-3"
      />
      <CaseStudyFigure
        image={eliteNeroMobileImage}
        sizes={PHONE_IMAGE_SIZES}
        frame="hairline"
        className="mt-10 sm:col-span-5 sm:col-start-7 sm:mt-16 lg:col-span-4 lg:col-start-8 lg:mt-32"
      />
    </div>
  );
}
