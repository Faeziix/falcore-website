import { SectionHeading } from "@/components/ui/section-heading";
import { PlottedRowList } from "@/components/plotted-row-list";
import { WORKING_PRINCIPLES } from "../_lib/about-content";

export function WorkingPrinciples() {
  return (
    <section aria-labelledby="principles-heading" className="pb-(--section-space)">
      <SectionHeading
        id="principles-heading"
        title="How I work"
        intro="Four things you can count on, on every project."
      />
      <PlottedRowList rows={WORKING_PRINCIPLES} />
    </section>
  );
}
