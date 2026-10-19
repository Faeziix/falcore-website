import { CaseStudyChapter } from "@/app/work/_components/case-study-chapter";
import { callToAdsChapter } from "../_lib/case-study-chapters";
import { bookingFormDesktop, bookingFormPhone, processDesktop, processPhone } from "../_lib/case-study-images";
import { ResponsiveCapture } from "./responsive-capture";

const CALL_TO_ADS_DESKTOP_SIZES = "(min-width: 1400px) 1000px, (min-width: 1024px) 72vw, 96vw";

export function CallToAdsChapter() {
  return (
    <CaseStudyChapter id={callToAdsChapter.id} title={callToAdsChapter.title} intro={callToAdsChapter.intro}>
      <div className="grid gap-10 sm:grid-cols-2 sm:gap-6 md:grid-cols-1 md:gap-8 lg:grid-cols-12">
        <ResponsiveCapture
          desktop={processDesktop}
          phone={processPhone}
          desktopSizes={CALL_TO_ADS_DESKTOP_SIZES}
          className="lg:col-span-9"
        />
        <ResponsiveCapture
          desktop={bookingFormDesktop}
          phone={bookingFormPhone}
          desktopSizes={CALL_TO_ADS_DESKTOP_SIZES}
          className="lg:col-span-9 lg:col-start-4"
        />
      </div>
    </CaseStudyChapter>
  );
}
