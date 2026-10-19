import { CaseStudyChapter } from "@/app/work/_components/case-study-chapter";
import { selfEditingChapter } from "../_lib/case-study-chapters";
import { editorDiagramCaption, editorPages } from "../_lib/editor-pages";
import { EditorPageSheet } from "./editor-page-sheet";

export function SelfEditingChapter() {
  return (
    <CaseStudyChapter
      id={selfEditingChapter.id}
      title={selfEditingChapter.title}
      intro={selfEditingChapter.intro}
      tone="raised"
    >
      <figure>
        <ul
          aria-label="Her five pages and their sections"
          className="grid grid-cols-2 items-start gap-3 sm:gap-4 lg:grid-cols-5"
        >
          {editorPages.map((page) => (
            <EditorPageSheet key={page.path} page={page} />
          ))}
        </ul>
        <figcaption className="mt-6 max-w-xl text-sm text-case-ink-soft">{editorDiagramCaption}</figcaption>
      </figure>
    </CaseStudyChapter>
  );
}
