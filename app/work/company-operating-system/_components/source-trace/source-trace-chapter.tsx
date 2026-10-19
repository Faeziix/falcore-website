import { CaseStudyChapter } from "@/app/work/_components/case-study-chapter";
import { sourceTraceChapter } from "../../_lib/case-study-chapters";
import { SourceTraceStage } from "./source-trace-stage";

export function SourceTraceChapter() {
  return (
    <CaseStudyChapter
      id={sourceTraceChapter.id}
      title={sourceTraceChapter.title}
      intro={sourceTraceChapter.intro}
    >
      <SourceTraceStage />
    </CaseStudyChapter>
  );
}
