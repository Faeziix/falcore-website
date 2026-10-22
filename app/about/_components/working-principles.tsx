import { SectionHeading } from "@/components/ui/section-heading";
import { WorkingPrincipleGrid } from "./working-principle-grid";

export function WorkingPrinciples() {
  return (
    <section aria-labelledby="principles-heading" className="pb-(--section-space)">
      <SectionHeading
        id="principles-heading"
        title="How I work"
        intro="Four things you can count on, on every project."
      />
      <WorkingPrincipleGrid />
    </section>
  );
}
