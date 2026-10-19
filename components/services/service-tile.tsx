import Link from "next/link";
import { ServiceScene } from "@/components/service-scenes/service-scene";
import type { Service } from "@/lib/data/services";

export function ServiceTile({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group block focus-visible:outline-offset-8"
    >
      <div className="aspect-video overflow-clip bg-surface">
        <ServiceScene slug={service.slug} label={service.sceneLabel} />
      </div>
      <h3 className="mt-6 text-display-sm font-medium text-foreground underline-offset-[0.2em] decoration-1 group-hover:underline">
        {service.title}
      </h3>
      <p className="mt-3 max-w-md text-foreground-soft">{service.description}</p>
    </Link>
  );
}
