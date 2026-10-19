import { CaseStudyFigure } from "@/app/work/_components/case-study-figure";
import { convoFlowImages, convoFlowMobileImages } from "../_lib/convoflow-images";

export function ConvoFlowHeroMedia() {
  return (
    <div className="page-container">
      <CaseStudyFigure
        image={convoFlowImages.heroDesktop}
        sizes="(min-width: 1440px) 1336px, 100vw"
        frame="hairline"
        className="hidden md:block"
        isPriority
      />
      <CaseStudyFigure
        image={convoFlowMobileImages.heroCrop}
        sizes="100vw"
        frame="hairline"
        className="md:hidden"
        isPriority
      />
    </div>
  );
}
