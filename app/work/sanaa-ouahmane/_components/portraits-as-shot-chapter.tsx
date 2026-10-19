import { cva } from "class-variance-authority";
import { CaseStudyChapter } from "@/app/work/_components/case-study-chapter";
import { CaseStudyFigure } from "@/app/work/_components/case-study-figure";
import { portraitsChapter } from "../_lib/case-study-chapters";
import { portraitsAsShot } from "../_lib/case-study-images";

const portraitPlacementVariants = cva("", {
  variants: {
    placement: {
      lead: "col-span-2 sm:col-span-5",
      middle: "sm:col-span-4",
      trailing: "sm:col-span-3",
    },
  },
});

const portraitPlacements = [
  { placement: "lead", sizes: "(min-width: 640px) 40vw, calc(100vw - 2rem)" },
  { placement: "middle", sizes: "(min-width: 640px) 31vw, 50vw" },
  { placement: "trailing", sizes: "(min-width: 640px) 23vw, 50vw" },
] as const;

export function PortraitsAsShotChapter() {
  return (
    <CaseStudyChapter
      id={portraitsChapter.id}
      title={portraitsChapter.title}
      intro={portraitsChapter.intro}
      tone="raised"
    >
      <figure>
        <div className="grid grid-cols-2 items-end gap-x-4 gap-y-4 sm:grid-cols-12 sm:gap-x-6 lg:gap-x-8">
          {portraitsAsShot.map((portrait, portraitPosition) => (
            <CaseStudyFigure
              key={portrait.src}
              image={portrait}
              sizes={portraitPlacements[portraitPosition].sizes}
              className={portraitPlacementVariants({
                placement: portraitPlacements[portraitPosition].placement,
              })}
            />
          ))}
        </div>
        <figcaption className="sr-only">Frames from her studio shoot, shown as shot.</figcaption>
      </figure>
    </CaseStudyChapter>
  );
}
