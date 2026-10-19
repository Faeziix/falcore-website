import { WaveCTA } from "@/components/ui/wave-cta";
import type { Service } from "@/lib/data/services";
import { ServiceHero } from "./service-hero";
import { ServiceInclusions } from "./service-inclusions";
import { ServiceUseCases } from "./service-use-cases";

export default function ServicePage({ service }: { service: Service }) {
  return (
    <>
      <div className="page-container">
        <ServiceHero service={service} />
        <ServiceInclusions service={service} />
        <ServiceUseCases service={service} />
      </div>
      <WaveCTA />
    </>
  );
}
