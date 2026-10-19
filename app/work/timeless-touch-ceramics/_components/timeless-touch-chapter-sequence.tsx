import { CaseStudyChapter } from "@/app/work/_components/case-study-chapter";
import { timelessTouchChapters } from "../_lib/timeless-touch-chapters";
import {
  productListingImage,
  productListingPhoneImage,
  similarSurfacesImage,
  similarSurfacesPhoneImage,
} from "../_lib/timeless-touch-images";
import { CatalogueToProductPair } from "./catalogue-to-product-pair";
import { PhoneCapturePair } from "./phone-capture-pair";
import { ResponsiveScreenshot } from "./responsive-screenshot";

const WIDE_SCREENSHOT_SIZES = "(min-width: 1400px) 1400px, 100vw";

export function TimelessTouchChapterSequence() {
  const { catalogue, findability, similarSurfaces, mobileGallery } = timelessTouchChapters;

  return (
    <>
      <CaseStudyChapter
        id={catalogue.id}
        title={catalogue.title}
        intro={catalogue.intro}
      >
        <CatalogueToProductPair />
      </CaseStudyChapter>
      <CaseStudyChapter
        id={findability.id}
        tone="raised"
        title={findability.title}
        intro={findability.intro}
      >
        <ResponsiveScreenshot
          desktopImage={productListingImage}
          phoneImage={productListingPhoneImage}
          desktopSizes={WIDE_SCREENSHOT_SIZES}
        />
      </CaseStudyChapter>
      <CaseStudyChapter
        id={similarSurfaces.id}
        title={similarSurfaces.title}
        intro={similarSurfaces.intro}
      >
        <ResponsiveScreenshot
          desktopImage={similarSurfacesImage}
          phoneImage={similarSurfacesPhoneImage}
          desktopSizes={WIDE_SCREENSHOT_SIZES}
        />
      </CaseStudyChapter>
      <CaseStudyChapter
        id={mobileGallery.id}
        tone="raised"
        title={mobileGallery.title}
        intro={mobileGallery.intro}
      >
        <PhoneCapturePair />
      </CaseStudyChapter>
    </>
  );
}
