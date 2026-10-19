import type { CaseStudyOutcome } from "../_lib/case-study-types";
import { CaseStudyChapter } from "./case-study-chapter";

export function CaseStudyOutcomes({
  title = "What changed",
  intro,
  outcomes,
}: {
  title?: string;
  intro: string;
  outcomes: CaseStudyOutcome[];
}) {
  return (
    <CaseStudyChapter id="outcomes" title={title} intro={intro}>
      <ul>
        {outcomes.map((outcome) => (
          <li
            key={outcome.statement}
            className="grid gap-3 border-t border-case-rule py-8 lg:grid-cols-12 lg:gap-8"
          >
            <p className="font-case-display text-display-sm text-case-ink lg:col-span-6">
              {outcome.statement}
            </p>
            <p className="max-w-xl text-case-ink-soft lg:col-span-5 lg:col-start-8">
              {outcome.detail}
            </p>
          </li>
        ))}
      </ul>
    </CaseStudyChapter>
  );
}
