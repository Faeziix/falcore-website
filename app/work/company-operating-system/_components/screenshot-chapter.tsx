import { cva, type VariantProps } from "class-variance-authority";
import { CaseStudyChapter } from "@/app/work/_components/case-study-chapter";
import type { ScreenshotChapterContent } from "../_lib/case-study-chapters";
import {
  containedScreenshotSizes,
  eightColumnScreenshotSizes,
  sevenColumnScreenshotSizes,
} from "../_lib/screenshot-sizes";
import { ArtDirectedFigure } from "./art-directed-figure";

const screenshotPlacementVariants = cva("", {
  variants: {
    placement: {
      fullWidth: "lg:col-span-12",
      sevenColumnsRight: "lg:col-span-7 lg:col-start-6",
      eightColumnsLeft: "lg:col-span-8",
    },
  },
  defaultVariants: { placement: "fullWidth" },
});

type ScreenshotPlacement = NonNullable<
  VariantProps<typeof screenshotPlacementVariants>["placement"]
>;

const sizesForPlacement: Record<ScreenshotPlacement, string> = {
  fullWidth: containedScreenshotSizes,
  sevenColumnsRight: sevenColumnScreenshotSizes,
  eightColumnsLeft: eightColumnScreenshotSizes,
};

export function ScreenshotChapter({
  chapter,
  tone,
  placement = "fullWidth",
}: {
  chapter: ScreenshotChapterContent;
  tone?: "paper" | "raised";
  placement?: ScreenshotPlacement;
}) {
  return (
    <CaseStudyChapter id={chapter.id} title={chapter.title} intro={chapter.intro} tone={tone}>
      <div className="grid lg:grid-cols-12 lg:gap-8">
        <ArtDirectedFigure
          image={chapter.image}
          tabletImage={chapter.tabletImage}
          phoneImage={chapter.phoneImage}
          sizes={sizesForPlacement[placement]}
          className={screenshotPlacementVariants({ placement })}
        />
      </div>
    </CaseStudyChapter>
  );
}
