import { CaseStudyFigure } from "@/app/work/_components/case-study-figure";
import { timelessTouchChapters } from "../_lib/timeless-touch-chapters";
import {
  eliteNeroCataloguePageImage,
  eliteNeroProductPageImage,
  eliteNeroProductPhoneImage,
} from "../_lib/timeless-touch-images";
import { ResponsiveScreenshot } from "./responsive-screenshot";

const PAIR_IMAGE_SIZES = "(min-width: 1400px) 680px, (min-width: 1280px) 48vw, (min-width: 1024px) 64vw, 100vw";

export function CatalogueToProductPair() {
  const { cataloguePageCaption, productPageCaption } = timelessTouchChapters.catalogue;

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1.9fr)_minmax(0,1fr)] lg:items-start lg:gap-x-6 xl:grid-cols-2 xl:gap-8">
      <CaseStudyFigure
        image={eliteNeroCataloguePageImage}
        caption={cataloguePageCaption}
        sizes={PAIR_IMAGE_SIZES}
        frame="hairline"
      />
      <ResponsiveScreenshot
        desktopImage={eliteNeroProductPageImage}
        phoneImage={eliteNeroProductPhoneImage}
        desktopSizes={PAIR_IMAGE_SIZES}
        desktopFrom="xl"
        caption={productPageCaption}
      />
    </div>
  );
}
