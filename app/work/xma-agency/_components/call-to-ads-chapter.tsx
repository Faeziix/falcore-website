import { CaseStudyChapter } from "@/app/work/_components/case-study-chapter";
import { CaseStudyFigure } from "@/app/work/_components/case-study-figure";
import { callToAdsChapter } from "../_lib/case-study-chapters";
import { bookingFormDesktop, processDesktop } from "../_lib/case-study-images";

export function CallToAdsChapter() {
  return (
    <CaseStudyChapter id={callToAdsChapter.id} title={callToAdsChapter.title} intro={callToAdsChapter.intro}>
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-8">
        <CaseStudyFigure
          image={processDesktop}
          frame="hairline"
          sizes="(min-width: 1400px) 1000px, (min-width: 1024px) 72vw, 96vw"
          className="lg:col-span-9"
        />
        <CaseStudyFigure
          image={bookingFormDesktop}
          frame="hairline"
          sizes="(min-width: 1400px) 1000px, (min-width: 1024px) 72vw, 96vw"
          className="lg:col-span-9 lg:col-start-4"
        />
      </div>
    </CaseStudyChapter>
  );
}
