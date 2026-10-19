import { CaseStudyFigure } from "@/app/work/_components/case-study-figure";
import { cn } from "@/lib/utils";
import type { ArtDirectedImage } from "../_lib/case-study-chapters";
import { narrowCropSizes } from "../_lib/screenshot-sizes";

export function ArtDirectedFigure({
  image,
  narrowImage,
  sizes,
  caption,
  isPriority = false,
  className,
}: ArtDirectedImage & {
  sizes: string;
  caption?: string;
  isPriority?: boolean;
  className?: string;
}) {
  return (
    <>
      {narrowImage ? (
        <CaseStudyFigure
          image={narrowImage}
          sizes={narrowCropSizes}
          caption={caption}
          frame="hairline"
          className={cn("md:hidden", className)}
        />
      ) : null}
      <CaseStudyFigure
        image={image}
        sizes={sizes}
        caption={caption}
        frame="hairline"
        isPriority={isPriority}
        className={cn(narrowImage && "hidden md:block", className)}
      />
    </>
  );
}
