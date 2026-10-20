import BrowserShowcaseSection from "@/components/BrowserShowcaseSection";
import FAQ from "@/components/faq";
import { WhatHappensNext } from "@/components/process/what-happens-next";
import type { Service } from "@/lib/data/services";
import { OtherServices } from "./other-services";
import { ServiceExamples } from "./service-examples";
import { ServiceHero } from "./service-hero";
import { ServiceInclusions } from "./service-inclusions";
import { JsonLd } from "@/lib/structured-data/json-ld";
import { serviceStructuredDataNodes } from "../_lib/service-structured-data";

export default function ServicePage({ service }: { service: Service }) {
  return (
    <>
      <div className="page-container">
        <ServiceHero service={service} />
        <ServiceInclusions service={service} />
      </div>
      {service.showsWebsiteShowcase && <BrowserShowcaseSection spacing="followsSection" />}
      <div className="page-container">
        <ServiceExamples service={service} />
        <WhatHappensNext />
        <OtherServices currentService={service} />
      </div>
      <FAQ items={service.faqs} />
      <JsonLd nodes={serviceStructuredDataNodes(service)} />
    </>
  );
}
