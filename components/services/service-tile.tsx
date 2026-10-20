import Link from "next/link";
import { ServiceScene } from "@/components/service-scenes/service-scene";
import type { Service } from "@/lib/data/services";

export type ServiceTileHeadingLevel = "h2" | "h3";

export function ServiceTile({
  service,
  headingLevel = "h3",
}: {
  service: Service;
  headingLevel?: ServiceTileHeadingLevel;
}) {
  const TitleHeading = headingLevel;

  return (
    <Link
      href={`/services/${service.slug}`}
      className="group block focus-visible:outline-offset-8"
    >
      <div className="aspect-video overflow-clip bg-surface">
        <ServiceScene slug={service.slug} label={service.sceneLabel} />
      </div>
      <TitleHeading className="mt-6 text-display-sm font-medium text-foreground underline-offset-[0.2em] decoration-1 group-hover:underline">
        {service.title}
      </TitleHeading>
      <p className="mt-3 max-w-md text-foreground-soft">{service.description}</p>
    </Link>
  );
}
