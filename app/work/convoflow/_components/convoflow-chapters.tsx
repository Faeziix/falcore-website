import { CaseStudyChapter } from "@/app/work/_components/case-study-chapter";
import { convoFlowChapterCopy } from "../_lib/convoflow-chapters";
import { convoFlowImages, convoFlowMobileImages } from "../_lib/convoflow-images";
import { ColdTrafficPhones } from "./cold-traffic-phones";
import { ScreenPairFigure } from "./screen-pair-figure";

export function ConvoFlowChapters() {
  const { coldTraffic, tryTheDemo, yourNumbers, ownerEdits } = convoFlowChapterCopy;

  return (
    <>
      <CaseStudyChapter id={coldTraffic.id} title={coldTraffic.title} intro={coldTraffic.intro}>
        <ColdTrafficPhones />
      </CaseStudyChapter>
      <CaseStudyChapter id={tryTheDemo.id} title={tryTheDemo.title} intro={tryTheDemo.intro} tone="raised">
        <ScreenPairFigure
          desktopImage={convoFlowImages.demoBookingDesktop}
          phoneImage={convoFlowImages.demoBookingMobile}
        />
      </CaseStudyChapter>
      <CaseStudyChapter id={yourNumbers.id} title={yourNumbers.title} intro={yourNumbers.intro}>
        <ScreenPairFigure
          desktopImage={convoFlowImages.calculatorProjection}
          phoneImage={convoFlowMobileImages.calculatorProjection}
          caption={yourNumbers.caption}
        />
      </CaseStudyChapter>
      <CaseStudyChapter id={ownerEdits.id} title={ownerEdits.title} intro={ownerEdits.intro} tone="raised">
        <ScreenPairFigure
          desktopImage={convoFlowImages.processEditableCopy}
          phoneImage={convoFlowMobileImages.processEditableCopy}
        />
      </CaseStudyChapter>
    </>
  );
}
