import type { Service as ServiceNode } from "schema-dts";
import type { Service } from "@/lib/data/services";
import { breadcrumbNode, faqPageNode } from "@/lib/structured-data/page-nodes";
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
    "@id": `${pageUrl}#service`,
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

export function serviceStructuredDataNodes(service: Service) {
  const path = servicePath(service);
  return [
    serviceNode(service),
    breadcrumbNode(path, [
      { name: "Services", path: SERVICES_INDEX_PATH },
      { name: service.title, path },
    ]),
    faqPageNode(path, service.faqs),
  ];
}
