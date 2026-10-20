import Link from "next/link";
import { ServiceScene } from "@/components/service-scenes/service-scene";
import { AcquireFrame } from "@/components/scroll-reveal/acquire-frame";
import { MaskedLine } from "@/components/scroll-reveal/masked-words";
import { revealOrder } from "@/components/scroll-reveal/reveal-order";
import type { Service } from "@/lib/data/services";

export type ServiceTileHeadingLevel = "h2" | "h3";

const titleLagInSteps = 6;
const descriptionLagInSteps = 9;

export function ServiceTile({
  service,
  headingLevel = "h3",
  revealOffset = 0,
}: {
  service: Service;
  headingLevel?: ServiceTileHeadingLevel;
  revealOffset?: number;
}) {
  const TitleHeading = headingLevel;

  return (
    <Link
      data-reveal
      href={`/services/${service.slug}`}
      className="group block focus-visible:outline-offset-8"
    >
      <AcquireFrame order={revealOffset} className="aspect-video" filmClassName="bg-surface">
        <ServiceScene slug={service.slug} label={service.sceneLabel} />
      </AcquireFrame>
      <TitleHeading className="mt-6 text-display-sm font-medium text-foreground underline-offset-[0.2em] decoration-1 group-hover:underline">
        <MaskedLine order={revealOffset + titleLagInSteps}>{service.title}</MaskedLine>
      </TitleHeading>
      <p className="reveal-rise mt-3 max-w-md text-foreground-soft" style={revealOrder(revealOffset + descriptionLagInSteps)}>
        {service.description}
      </p>
    </Link>
  );
}
