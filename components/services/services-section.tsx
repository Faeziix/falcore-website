import { SERVICES } from "@/lib/data/services";
import { SectionHeading } from "@/components/ui/section-heading";
import { ServiceTileGrid } from "./service-tile-grid";

export function ServicesSection() {
  return (
    <section id="services" aria-labelledby="services-heading" className="section-spacing">
      <div className="page-container">
        <SectionHeading
          id="services-heading"
          title="What I build"
          intro="Each one is built around how your business already works."
        />
        <ServiceTileGrid services={SERVICES} />
      </div>
    </section>
  );
}
