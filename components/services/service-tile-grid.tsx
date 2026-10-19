import { cn } from "@/lib/utils";
import type { Service } from "@/lib/data/services";
import { ServiceTile } from "./service-tile";

export function ServiceTileGrid({
  services,
  className,
}: {
  services: Service[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mt-14 grid gap-x-8 gap-y-16 md:grid-cols-2 lg:mt-20 lg:gap-x-12 lg:gap-y-20",
        className
      )}
    >
      {services.map((service) => (
        <ServiceTile key={service.slug} service={service} />
      ))}
    </div>
  );
}
