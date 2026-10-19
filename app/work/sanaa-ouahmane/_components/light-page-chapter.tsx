import { CaseStudyChapter } from "@/app/work/_components/case-study-chapter";
import { lightPageChapter } from "../_lib/case-study-chapters";
import { manifestoPageImage, manifestoPagePhoneImage } from "../_lib/case-study-images";
import { ArtDirectedFigure } from "./art-directed-figure";
import { PaletteSpendStrip } from "./palette-spend-strip";

export function LightPageChapter() {
  return (
    <CaseStudyChapter id={lightPageChapter.id} title={lightPageChapter.title} intro={lightPageChapter.intro}>
      <ArtDirectedFigure
        wideImage={manifestoPageImage}
        phoneImage={manifestoPagePhoneImage}
        wideSizes="(min-width: 1400px) 1336px, calc(100vw - 4rem)"
        phoneSizes="calc(100vw - 2rem)"
        frame="hairline"
      />
      <div className="mt-10 lg:mt-14">
        <PaletteSpendStrip />
      </div>
    </CaseStudyChapter>
  );
}
