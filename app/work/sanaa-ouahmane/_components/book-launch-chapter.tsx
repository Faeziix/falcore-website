import { CaseStudyChapter } from "@/app/work/_components/case-study-chapter";
import { bookLaunchChapter } from "../_lib/case-study-chapters";
import { bookOrderPlateImage, bookOrderPlatePhoneImage } from "../_lib/case-study-images";
import { ArtDirectedFigure } from "./art-directed-figure";

export function BookLaunchChapter() {
  return (
    <CaseStudyChapter
      id={bookLaunchChapter.id}
      title={bookLaunchChapter.title}
      intro={bookLaunchChapter.intro}
      isMediaFullBleed
      className="pb-0!"
    >
      <ArtDirectedFigure
        wideImage={bookOrderPlateImage}
        phoneImage={bookOrderPlatePhoneImage}
        wideSizes="100vw"
        phoneSizes="100vw"
      />
    </CaseStudyChapter>
  );
}
