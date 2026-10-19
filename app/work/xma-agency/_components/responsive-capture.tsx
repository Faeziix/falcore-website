import { cva, type VariantProps } from "class-variance-authority";
import { CaseStudyFigure } from "@/app/work/_components/case-study-figure";
import type { CaseStudyImage } from "@/app/work/_lib/case-study-types";
import { cn } from "@/lib/utils";

const phoneFigureVariants = cva("md:hidden", {
  variants: {
    phoneFit: {
      handset: "mx-auto max-w-xs",
      crop: "max-w-md",
    },
  },
  defaultVariants: { phoneFit: "handset" },
});

const PHONE_SIZES_BY_FIT = {
  handset: "(max-width: 767px) 320px, 1px",
  crop: "(max-width: 767px) 448px, 1px",
} as const;

const TABLET_SIZES = "(min-width: 1280px) 1px, (min-width: 1024px) 64vw, (min-width: 768px) 96vw, 1px";

function desktopVisibilityClassName(hasPhone: boolean, hasTablet: boolean) {
  if (hasTablet) return "hidden xl:block";
  if (hasPhone) return "hidden md:block";
  return undefined;
}

type ResponsiveCaptureProps = VariantProps<typeof phoneFigureVariants> & {
  desktop: CaseStudyImage;
  tablet?: CaseStudyImage;
  phone?: CaseStudyImage;
  desktopSizes: string;
  caption?: string;
  isPriority?: boolean;
  className?: string;
  desktopClassName?: string;
};

export function ResponsiveCapture({
  desktop,
  tablet,
  phone,
  phoneFit,
  desktopSizes,
  caption,
  isPriority = false,
  className,
  desktopClassName,
}: ResponsiveCaptureProps) {
  return (
    <div className={className}>
      <CaseStudyFigure
        image={desktop}
        caption={caption}
        sizes={desktopSizes}
        frame="hairline"
        isPriority={isPriority}
        className={cn(desktopVisibilityClassName(Boolean(phone), Boolean(tablet)), desktopClassName)}
      />
      {tablet ? (
        <CaseStudyFigure
          image={tablet}
          caption={caption}
          sizes={TABLET_SIZES}
          frame="hairline"
          isPriority={isPriority}
          className={cn(phone ? "hidden md:block xl:hidden" : "xl:hidden", desktopClassName)}
        />
      ) : null}
      {phone ? (
        <CaseStudyFigure
          image={phone}
          caption={caption}
          sizes={PHONE_SIZES_BY_FIT[phoneFit ?? "handset"]}
          frame="hairline"
          isPriority={isPriority}
          className={phoneFigureVariants({ phoneFit })}
        />
      ) : null}
    </div>
  );
}
