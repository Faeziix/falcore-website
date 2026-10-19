import { CaseStudyChapter } from "@/app/work/_components/case-study-chapter";
import type { CaseStudyImage } from "@/app/work/_lib/case-study-types";
import { ResponsiveCapture } from "./responsive-capture";

type CaptureChapterProps = {
  chapter: { id: string; title: string; intro: string };
  desktop: CaseStudyImage;
  phone?: CaseStudyImage;
  tone?: "paper" | "raised";
};

export function CaptureChapter({ chapter, desktop, phone, tone = "paper" }: CaptureChapterProps) {
  return (
    <CaseStudyChapter id={chapter.id} title={chapter.title} intro={chapter.intro} tone={tone}>
      <ResponsiveCapture desktop={desktop} phone={phone} desktopSizes="(min-width: 1400px) 1336px, 96vw" />
    </CaseStudyChapter>
  );
}
