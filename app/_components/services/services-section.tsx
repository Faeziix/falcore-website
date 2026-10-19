import { SERVICES } from "@/lib/data/services";
import { SectionHeading } from "@/components/ui/section-heading";
import { ServiceTile } from "./service-tile";

export function ServicesSection() {
  return (
    <section id="services" aria-labelledby="services-heading" className="section-spacing">
      <div className="page-container">
        <SectionHeading
          id="services-heading"
          title="What I build"
          intro="Each one is built around how your business already works."
        />
        <div className="mt-14 grid gap-x-8 gap-y-16 md:grid-cols-2 lg:mt-20 lg:gap-x-12 lg:gap-y-20">
          {SERVICES.map((service) => (
            <ServiceTile key={service.slug} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
