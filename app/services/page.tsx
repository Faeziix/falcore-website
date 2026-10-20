import type { Metadata } from "next";
import { SiteNavigation } from "@/components/site-navigation";
import { PageClosing } from "@/components/page-closing";
import { ServiceTileGrid } from "@/components/services/service-tile-grid";
import { SERVICES } from "@/lib/data/services";
import { buildSocialShareMetadata, generatedShareCard } from "@/lib/social-share-metadata";

const SERVICES_INDEX_DESCRIPTION =
  "AI that does real work, automations that connect your tools, websites that win enquiries and custom apps built around how your business runs.";

export const metadata: Metadata = {
  title: "Services",
  description: SERVICES_INDEX_DESCRIPTION,
  alternates: { canonical: "/services" },
  ...buildSocialShareMetadata({
    title: "Services | Falcore",
    description: SERVICES_INDEX_DESCRIPTION,
    path: "/services",
    image: generatedShareCard("services", "Falcore services: four ways I take manual work off your team"),
  }),
};

export default function ServicesIndexPage() {
  return (
    <>
      <SiteNavigation />
      <main className="pt-28 md:pt-32">
        <div className="page-container pb-(--section-space)">
          <h1 className="max-w-5xl text-display-xl font-medium text-foreground animate-rise-in">
            Services
          </h1>
          <p className="mt-5 max-w-2xl text-balance text-lead text-foreground-soft animate-rise-in [animation-delay:120ms]">
            Four ways I take manual work off your team, each built around how your business already runs.
          </p>
          <ServiceTileGrid services={SERVICES} />
        </div>
      </main>
      <PageClosing />
    </>
  );
}
