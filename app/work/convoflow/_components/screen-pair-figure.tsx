import { CaseStudyFigure } from "@/app/work/_components/case-study-figure";
import type { CaseStudyImage } from "@/app/work/_lib/case-study-types";
import { PhoneScreen } from "./phone-screen";

export function ScreenPairFigure({
  desktopImage,
  phoneImage,
  caption,
}: {
  desktopImage: CaseStudyImage;
  phoneImage: CaseStudyImage;
  caption?: string;
}) {
  return (
    <figure>
      <CaseStudyFigure
        image={desktopImage}
        sizes="(min-width: 1440px) 1336px, 100vw"
        frame="hairline"
        className="hidden md:block"
      />
      <PhoneScreen image={phoneImage} sizes="(min-width: 400px) 384px, 100vw" className="max-w-sm md:hidden" />
      {caption ? (
        <figcaption className="mt-4 max-w-xl text-sm text-case-ink-soft">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
