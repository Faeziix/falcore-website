import { SectionHeading } from "@/components/ui/section-heading";
import { SectionCallToAction } from "@/components/section-call-to-action";
import { caseStudyPath } from "@/app/work/_lib/case-study-index";
import type { Service } from "@/lib/data/services";
import { ExamplesList } from "./examples-list";

export function ServiceExamples({ service }: { service: Service }) {
  const examplesWithCaseStudyLinks = service.examples.map((example) => ({
    ...example,
    caseStudyHref: example.caseStudySlug && caseStudyPath(example.caseStudySlug),
  }));

  return (
    <section aria-labelledby="examples-heading" className="pb-[var(--section-space)]">
      <SectionHeading
        id="examples-heading"
        title="Built and running"
        intro="Real work I’ve shipped, in plain terms."
      />
      <ExamplesList examples={examplesWithCaseStudyLinks} />
      <SectionCallToAction
        prompt="Want something like this in your business?"
        className="mt-16 lg:mt-20"
      />
    </section>
  );
}
