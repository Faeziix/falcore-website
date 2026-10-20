import type { Metadata } from "next";
import { SiteNavigation } from "@/components/site-navigation";
import { PageClosing } from "@/components/page-closing";
import { ServiceTileGrid } from "@/components/services/service-tile-grid";
import { SERVICES } from "@/lib/data/services";
import { buildSocialShareMetadata, generatedShareCard } from "@/lib/social-share-metadata";
import { STATIC_PAGE_DATES } from "@/lib/data/page-dates";
import { JsonLd } from "@/lib/structured-data/json-ld";
import { breadcrumbNode, collectionPageNode } from "@/lib/structured-data/page-nodes";
import { SERVICES_INDEX_PATH, servicePath } from "./_lib/service-structured-data";

const SERVICES_INDEX_TITLE = "Services: Web Design, Custom Apps, Automation & AI";

const SERVICES_INDEX_DESCRIPTION =
  "AI that does real work, automations that connect your tools, websites that win enquiries and custom apps, for businesses in the UAE and US.";

export const metadata: Metadata = {
  title: SERVICES_INDEX_TITLE,
  description: SERVICES_INDEX_DESCRIPTION,
  alternates: { canonical: SERVICES_INDEX_PATH },
  ...buildSocialShareMetadata({
    title: `${SERVICES_INDEX_TITLE} | Falcore`,
    description: SERVICES_INDEX_DESCRIPTION,
    path: SERVICES_INDEX_PATH,
    image: generatedShareCard("services", "Falcore services: four ways I take manual work off your team"),
  }),
};

const servicesIndexStructuredData = [
  collectionPageNode(
    {
      path: SERVICES_INDEX_PATH,
      name: SERVICES_INDEX_TITLE,
      description: SERVICES_INDEX_DESCRIPTION,
      dates: STATIC_PAGE_DATES.services,
    },
    SERVICES.map((service) => ({ name: service.title, path: servicePath(service) }))
  ),
  breadcrumbNode(SERVICES_INDEX_PATH, [{ name: "Services", path: SERVICES_INDEX_PATH }]),
];

export default function ServicesIndexPage() {
  return (
    <>
      <JsonLd nodes={servicesIndexStructuredData} />
      <SiteNavigation />
      <main className="pt-28 md:pt-32">
        <div className="page-container pb-(--section-space)">
          <h1 className="max-w-5xl text-display-xl font-medium text-foreground animate-rise-in">
            Services
          </h1>
          <p className="mt-5 max-w-2xl text-balance text-lead text-foreground-soft animate-rise-in [animation-delay:120ms]">
            Four ways I take manual work off your team, each built around how your business already runs.
          </p>
          <ServiceTileGrid services={SERVICES} tileHeadingLevel="h2" />
        </div>
      </main>
      <PageClosing />
    </>
  );
}
