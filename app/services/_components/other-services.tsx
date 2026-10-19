import { SectionHeading } from "@/components/ui/section-heading";
import { ServiceTileGrid } from "@/components/services/service-tile-grid";
import { SERVICES, type Service } from "@/lib/data/services";

export function OtherServices({ currentService }: { currentService: Service }) {
  const otherServices = SERVICES.filter((service) => service.slug !== currentService.slug);

  return (
    <section aria-labelledby="other-services-heading">
      <SectionHeading
        id="other-services-heading"
        title="Other services"
        intro="Each one works on its own or alongside the others."
      />
      <ServiceTileGrid services={otherServices} className="lg:grid-cols-3" />
    </section>
  );
}
