import type { ReactNode } from "react";
import type { Service } from "@/lib/data/services";
import { ServiceHero } from "./service-hero";
import { ServiceInclusions } from "./service-inclusions";
import { ServiceUseCases } from "./service-use-cases";

export default function ServicePage({
  service,
  examples,
}: {
  service: Service;
  examples?: ReactNode;
}) {
  return (
    <>
      <div className="page-container">
        <ServiceHero service={service} />
        <ServiceInclusions service={service} />
      </div>
      {examples}
      <div className="page-container">
        <ServiceUseCases service={service} />
      </div>
    </>
  );
}
