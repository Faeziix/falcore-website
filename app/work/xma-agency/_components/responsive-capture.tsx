import { CaseStudyFigure } from "@/app/work/_components/case-study-figure";
import type { CaseStudyImage } from "@/app/work/_lib/case-study-types";
import { cn } from "@/lib/utils";

type ResponsiveCaptureProps = {
  desktop: CaseStudyImage;
  phone?: CaseStudyImage;
  desktopSizes: string;
  caption?: string;
  isPriority?: boolean;
  className?: string;
};

export function ResponsiveCapture({
  desktop,
  phone,
  desktopSizes,
  caption,
  isPriority = false,
  className,
}: ResponsiveCaptureProps) {
  return (
    <div className={className}>
      <CaseStudyFigure
        image={desktop}
        caption={caption}
        sizes={desktopSizes}
        frame="hairline"
        isPriority={isPriority}
        className={cn(phone && "hidden md:block")}
      />
      {phone ? (
        <CaseStudyFigure
          image={phone}
          caption={caption}
          sizes="(max-width: 767px) 80vw, 1px"
          frame="hairline"
          isPriority={isPriority}
          className="mx-auto max-w-xs md:hidden"
        />
      ) : null}
    </div>
  );
}
