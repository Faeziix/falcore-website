import { SectionHeading } from "@/components/ui/section-heading";
import type { Service } from "@/lib/data/services";
import { UseCasesList } from "./use-cases-list";

export function ServiceUseCases({ service }: { service: Service }) {
  return (
    <section aria-labelledby="use-cases-heading" className="pb-[var(--section-space)]">
      <SectionHeading
        id="use-cases-heading"
        title="How businesses use this"
        intro="Typical projects. Yours will be shaped on the scoping call."
      />
      <UseCasesList useCases={service.useCases} />
    </section>
  );
}
