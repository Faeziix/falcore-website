import { bookPageHeroImage, bookPageHeroPhoneImage } from "../_lib/case-study-images";
import { ArtDirectedFigure } from "./art-directed-figure";

export function CaseStudyHeroMedia() {
  return (
    <div className="page-container">
      <ArtDirectedFigure
        wideImage={bookPageHeroImage}
        phoneImage={bookPageHeroPhoneImage}
        wideSizes="(min-width: 1400px) 1336px, calc(100vw - 4rem)"
        phoneSizes="calc(100vw - 2rem)"
        frame="hairline"
        isPriority
      />
    </div>
  );
}
