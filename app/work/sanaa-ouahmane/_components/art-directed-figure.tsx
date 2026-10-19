import type { CaseStudyImage } from "@/app/work/_lib/case-study-types";
import { CaseStudyFigure } from "@/app/work/_components/case-study-figure";

type ArtDirectedFigureProps = {
  wideImage: CaseStudyImage;
  phoneImage: CaseStudyImage;
  wideSizes: string;
  phoneSizes: string;
  frame?: "none" | "hairline";
  isPriority?: boolean;
};

export function ArtDirectedFigure({
  wideImage,
  phoneImage,
  wideSizes,
  phoneSizes,
  frame = "none",
  isPriority = false,
}: ArtDirectedFigureProps) {
  return (
    <>
      <CaseStudyFigure
        image={phoneImage}
        sizes={phoneSizes}
        frame={frame}
        isPriority={isPriority}
        className="md:hidden"
      />
      <CaseStudyFigure
        image={wideImage}
        sizes={wideSizes}
        frame={frame}
        isPriority={isPriority}
        className="hidden md:block"
      />
    </>
  );
}
