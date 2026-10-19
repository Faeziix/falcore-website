import { SectionHeading } from "@/components/ui/section-heading";
import type { Service } from "@/lib/data/services";
import { InclusionsGrid } from "./inclusions-grid";

export function ServiceInclusions({ service }: { service: Service }) {
  return (
    <section aria-labelledby="inclusions-heading" className="section-spacing">
      <SectionHeading
        id="inclusions-heading"
        title="What’s included"
        intro="Everything you get at launch, and you own all of it."
      />
      <InclusionsGrid inclusions={service.inclusions} />
    </section>
  );
}
