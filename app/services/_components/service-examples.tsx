import { SectionHeading } from "@/components/ui/section-heading";
import { SectionCallToAction } from "@/components/section-call-to-action";
import { PlottedRowList, type PlottedRow } from "@/components/plotted-row-list";
import { caseStudyPath } from "@/app/work/_lib/case-study-index";
import type { Service } from "@/lib/data/services";

function exampleRows(service: Service): PlottedRow[] {
  return service.examples.map((example) => ({
    title: example.title,
    description: example.description,
    link: example.caseStudySlug
      ? { href: caseStudyPath(example.caseStudySlug), label: "Read the case study" }
      : undefined,
  }));
}

export function ServiceExamples({ service }: { service: Service }) {
  return (
    <section aria-labelledby="examples-heading" className="pb-[var(--section-space)]">
      <SectionHeading
        id="examples-heading"
        title="Built and running"
        intro="Real work I’ve shipped, in plain terms."
      />
      <PlottedRowList rows={exampleRows(service)} />
      <SectionCallToAction
        prompt="Want something like this in your business?"
        className="mt-16 lg:mt-20"
      />
    </section>
  );
}
