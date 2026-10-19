import BrowserShowcaseSection from "@/components/BrowserShowcaseSection";
import FAQ from "@/components/faq";
import type { Service } from "@/lib/data/services";
import { OtherServices } from "./other-services";
import { ServiceExamples } from "./service-examples";
import { ServiceHero } from "./service-hero";
import { ServiceInclusions } from "./service-inclusions";
import { ServiceProcess } from "./service-process";
import { ServiceStructuredData } from "./service-structured-data";

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
        <ServiceProcess />
        <OtherServices currentService={service} />
      </div>
      <FAQ items={service.faqs} />
      <ServiceStructuredData service={service} />
    </>
  );
}
