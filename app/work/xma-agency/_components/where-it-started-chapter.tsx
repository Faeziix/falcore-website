import { CaseStudyChapter } from "@/app/work/_components/case-study-chapter";
import { whereItStartedChapter } from "../_lib/case-study-chapters";
import { firstSiteHero, firstSiteHeroPhoneCrop, firstSiteHeroTabletCrop } from "../_lib/case-study-images";
import { ResponsiveCapture } from "./responsive-capture";

export function WhereItStartedChapter() {
  return (
    <CaseStudyChapter
      id={whereItStartedChapter.id}
      title={whereItStartedChapter.title}
      intro={whereItStartedChapter.intro}
      tone="raised"
    >
      <ResponsiveCapture
        desktop={firstSiteHero}
        tablet={firstSiteHeroTabletCrop}
        phone={firstSiteHeroPhoneCrop}
        phoneFit="crop"
        desktopSizes="(min-width: 1400px) 880px, (min-width: 1024px) 64vw, 96vw"
        desktopClassName="lg:w-2/3"
      />
    </CaseStudyChapter>
  );
}
