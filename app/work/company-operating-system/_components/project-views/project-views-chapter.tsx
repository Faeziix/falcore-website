import { CaseStudyChapter } from "@/app/work/_components/case-study-chapter";
import { projectViews, projectViewsChapter } from "../../_lib/case-study-chapters";
import { ProjectViewSwitcher } from "./project-view-switcher";

export function ProjectViewsChapter() {
  return (
    <CaseStudyChapter
      id={projectViewsChapter.id}
      title={projectViewsChapter.title}
      intro={projectViewsChapter.intro}
    >
      <ProjectViewSwitcher views={projectViews} />
    </CaseStudyChapter>
  );
}
