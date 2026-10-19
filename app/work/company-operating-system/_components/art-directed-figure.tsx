import { CaseStudyFigure } from "@/app/work/_components/case-study-figure";
import { cn } from "@/lib/utils";
import { artDirectedRenditions, type ArtDirectedImage } from "../_lib/art-direction";

export function ArtDirectedFigure({
  sizes,
  caption,
  isPriority = false,
  className,
  ...artDirectedImage
}: ArtDirectedImage & {
  sizes: string;
  caption?: string;
  isPriority?: boolean;
  className?: string;
}) {
  return (
    <>
      {artDirectedRenditions(artDirectedImage, sizes).map((rendition) => (
        <CaseStudyFigure
          key={rendition.key}
          image={rendition.image}
          sizes={rendition.sizes}
          caption={caption}
          frame="hairline"
          isPriority={isPriority}
          className={cn(rendition.visibilityClassName, className)}
        />
      ))}
    </>
  );
}
