import { SectionHeading } from "@/components/ui/section-heading";
import type { Service } from "@/lib/data/services";

export function ServiceUseCases({ service }: { service: Service }) {
  return (
    <section aria-labelledby="use-cases-heading" className="pb-[var(--section-space)]">
      <SectionHeading
        id="use-cases-heading"
        title="How businesses use this"
        intro="Typical projects. Yours will be shaped on the scoping call."
      />
      <ul className="mt-12 divide-y divide-border border-y border-border">
        {service.useCases.map((useCase) => (
          <li
            key={useCase.title}
            className="grid gap-3 py-8 md:grid-cols-12 md:gap-8"
          >
            <h3 className="font-display text-xl font-medium text-foreground md:col-span-5">
              {useCase.title}
            </h3>
            <p className="leading-relaxed text-foreground-soft md:col-span-7">
              {useCase.description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
