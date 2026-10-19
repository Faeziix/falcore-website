import { CaseStudyFigure } from "@/app/work/_components/case-study-figure";
import { skinCareDepartmentFrame } from "../_lib/case-study-images";
import { CONTAINER_WIDE_IMAGE_SIZES } from "../_lib/image-sizes";

export function CorpofinoHeroMedia() {
  return (
    <div className="page-container">
      <CaseStudyFigure
        image={skinCareDepartmentFrame}
        sizes={CONTAINER_WIDE_IMAGE_SIZES}
        frame="hairline"
        isPriority
      />
    </div>
  );
}
