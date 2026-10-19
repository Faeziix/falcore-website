import Image from "next/image";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { CaseStudyImage } from "@/app/work/_lib/case-study-types";

export const PHOTOGRAPH_QUALITY = 90;

const photographFrameVariants = cva("relative overflow-clip", {
  variants: {
    ground: {
      none: "",
      packshotWhite: "bg-(--diamaria-packshot-ground)",
      sweep: "bg-(--diamaria-sweep)",
      paper: "bg-case-paper",
    },
    border: {
      none: "",
      hairline: "border border-case-rule",
    },
  },
  defaultVariants: { ground: "none", border: "none" },
});

type FramedPhotographProps = VariantProps<typeof photographFrameVariants> & {
  image: CaseStudyImage;
  sizes: string;
  frameClassName: string;
  imageClassName?: string;
  isPriority?: boolean;
};

export function FramedPhotograph({
  image,
  sizes,
  frameClassName,
  imageClassName,
  ground,
  border,
  isPriority = false,
}: FramedPhotographProps) {
  return (
    <div className={cn(photographFrameVariants({ ground, border }), frameClassName)}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        quality={PHOTOGRAPH_QUALITY}
        priority={isPriority}
        className={cn("object-cover", imageClassName)}
      />
    </div>
  );
}

export function PhotographCaption({ children }: { children: string }) {
  return <figcaption className="mt-4 text-sm text-case-ink-soft">{children}</figcaption>;
}
