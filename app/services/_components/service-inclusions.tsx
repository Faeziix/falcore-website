import { SectionHeading } from "@/components/ui/section-heading";
import type { Service } from "@/lib/data/services";

export function ServiceInclusions({ service }: { service: Service }) {
  return (
    <section aria-labelledby="inclusions-heading" className="section-spacing">
      <SectionHeading
        id="inclusions-heading"
        title="What’s included"
        intro="Everything you get at launch, and you own all of it."
      />
      <ul className="mt-12 grid border-t border-l border-border sm:grid-cols-2 lg:grid-cols-3">
        {service.bullets.map((bullet) => (
          <li
            key={bullet}
            className="flex gap-4 border-r border-b border-border p-6 text-foreground-soft lg:p-8"
          >
            <span aria-hidden className="mt-[0.7em] h-px w-4 shrink-0 bg-accent" />
            {bullet}
          </li>
        ))}
      </ul>
    </section>
  );
}
