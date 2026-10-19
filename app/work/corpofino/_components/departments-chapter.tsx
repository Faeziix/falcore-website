import { CaseStudyChapter } from "@/app/work/_components/case-study-chapter";
import { CHAPTER_COPY } from "../_lib/case-study-content";
import { DepartmentSwatchStrip } from "./department-swatch-strip";

export function DepartmentsChapter() {
  return (
    <CaseStudyChapter
      id="departments"
      tone="raised"
      title={CHAPTER_COPY.departments.title}
      intro={CHAPTER_COPY.departments.intro}
      isMediaFullBleed
    >
      <DepartmentSwatchStrip />
    </CaseStudyChapter>
  );
}
