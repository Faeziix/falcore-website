import type { Service as ServiceNode, WebPage } from "schema-dts";
import type { Service } from "@/lib/data/services";
import { breadcrumbId, serviceId } from "@/lib/structured-data/entity-ids";
import { breadcrumbNode, faqPageNode, webPageFields } from "@/lib/structured-data/page-nodes";
import { SERVED_COUNTRIES, organizationReference } from "@/lib/structured-data/site-entities";
import { absoluteUrl } from "@/lib/site-config";

export const SERVICES_INDEX_PATH = "/services";

export function servicePath(service: Service) {
  return `${SERVICES_INDEX_PATH}/${service.slug}`;
}

function serviceNode(service: Service): ServiceNode {
  const pageUrl = absoluteUrl(servicePath(service));
  return {
    "@type": "Service",
    "@id": serviceId(service.slug),
    name: service.title,
    serviceType: service.metaTitle,
    description: service.metaDescription,
    url: pageUrl,
    provider: organizationReference,
    areaServed: SERVED_COUNTRIES,
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: pageUrl,
      availableLanguage: "English",
    },
  };
}

function servicePageNode(service: Service): WebPage {
  const path = servicePath(service);
  return {
    "@type": "WebPage",
    ...webPageFields({
      path,
      name: `${service.metaTitle} | Falcore`,
      description: service.metaDescription,
      dates: service.dates,
    }),
    breadcrumb: { "@id": breadcrumbId(path) },
    mainEntity: { "@id": serviceId(service.slug) },
  };
}

export function serviceStructuredDataNodes(service: Service) {
  const path = servicePath(service);
  return [
    servicePageNode(service),
    serviceNode(service),
    breadcrumbNode(path, [
      { name: "Services", path: SERVICES_INDEX_PATH },
      { name: service.title, path },
    ]),
    faqPageNode(path, service.faqs),
  ];
}
