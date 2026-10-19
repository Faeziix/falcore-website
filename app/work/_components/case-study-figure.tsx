import Image from "next/image";
import { cva, type VariantProps } from "class-variance-authority";
import { ViewfinderFrame } from "@/components/ui/viewfinder-frame";
import { cn } from "@/lib/utils";
import type { CaseStudyImage } from "../_lib/case-study-types";

const SCREENSHOT_QUALITY = 90;

const figureFrameVariants = cva("relative overflow-clip", {
  variants: {
    frame: {
      none: "",
      hairline: "border border-case-rule",
    },
  },
  defaultVariants: { frame: "none" },
});

type CaseStudyFigureProps = VariantProps<typeof figureFrameVariants> & {
  image: CaseStudyImage;
  caption?: string;
  sizes: string;
  isPriority?: boolean;
  hasViewfinder?: boolean;
  className?: string;
  imageClassName?: string;
};

export function CaseStudyFigure({
  image,
  caption,
  sizes,
  frame,
  isPriority = false,
  hasViewfinder = false,
  className,
  imageClassName,
}: CaseStudyFigureProps) {
  const picture = (
    <div className={figureFrameVariants({ frame })}>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        quality={SCREENSHOT_QUALITY}
        priority={isPriority}
        className={cn("h-auto w-full", imageClassName)}
      />
    </div>
  );

  return (
    <figure className={className}>
      {hasViewfinder ? <ViewfinderFrame>{picture}</ViewfinderFrame> : picture}
      {caption ? (
        <figcaption className="mt-4 max-w-xl text-sm text-case-ink-soft">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
