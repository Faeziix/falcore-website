import { cn } from "@/lib/utils";
import type { Service } from "@/lib/data/services";
import { ServiceTile, type ServiceTileHeadingLevel } from "./service-tile";

const secondColumnRevealLagInSteps = 2;

export function ServiceTileGrid({
  services,
  className,
  tileHeadingLevel,
}: {
  services: Service[];
  className?: string;
  tileHeadingLevel?: ServiceTileHeadingLevel;
}) {
  return (
    <div
      className={cn(
        "mt-14 grid gap-x-8 gap-y-16 md:grid-cols-2 lg:mt-20 lg:gap-x-12 lg:gap-y-20",
        className
      )}
    >
      {services.map((service, serviceIndex) => (
        <ServiceTile
          key={service.slug}
          service={service}
          headingLevel={tileHeadingLevel}
          revealOffset={(serviceIndex % 2) * secondColumnRevealLagInSteps}
        />
      ))}
    </div>
  );
}
