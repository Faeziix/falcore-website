import { CaseStudyFigure } from "@/app/work/_components/case-study-figure";
import { timelessTouchChapters } from "../_lib/timeless-touch-chapters";
import { eliteNeroCataloguePageImage, eliteNeroProductPageImage } from "../_lib/timeless-touch-images";

const PAIR_IMAGE_SIZES = "(min-width: 1400px) 680px, (min-width: 768px) 48vw, 100vw";

export function CatalogueToProductPair() {
  const { cataloguePageCaption, productPageCaption } = timelessTouchChapters.catalogue;

  return (
    <div className="grid gap-12 md:grid-cols-2 md:gap-6 lg:gap-8">
      <CaseStudyFigure
        image={eliteNeroCataloguePageImage}
        caption={cataloguePageCaption}
        sizes={PAIR_IMAGE_SIZES}
        frame="hairline"
      />
      <CaseStudyFigure
        image={eliteNeroProductPageImage}
        caption={productPageCaption}
        sizes={PAIR_IMAGE_SIZES}
        frame="hairline"
      />
    </div>
  );
}
