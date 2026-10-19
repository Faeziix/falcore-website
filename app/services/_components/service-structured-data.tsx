import { JsonLdScripts } from "@/components/schema-markup";
import type { Service } from "@/lib/data/services";
import { SITE_URL } from "@/lib/site-config";

export function servicePageUrl(service: Service) {
  return `${SITE_URL}/services/${service.slug}`;
}

function buildServiceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/#service-${service.slug}`,
    name: service.title,
    description: service.metaDescription,
    url: servicePageUrl(service),
    provider: { "@id": `${SITE_URL}/#organization` },
  };
}

function buildBreadcrumbSchema(service: Service) {
  const trail = [
    { name: "Home", url: SITE_URL },
    { name: "Services", url: `${SITE_URL}/services` },
    { name: service.title, url: servicePageUrl(service) },
  ];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

function buildFaqSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function ServiceStructuredData({ service }: { service: Service }) {
  return (
    <JsonLdScripts
      schemas={[
        buildServiceSchema(service),
        buildBreadcrumbSchema(service),
        buildFaqSchema(service),
      ]}
    />
  );
}
