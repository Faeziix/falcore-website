import { FAQ_ITEMS } from "@/lib/data/faq";
import { SITE_URL } from "@/lib/site-config";

/**
 * Falcore — Schema.org structured data (JSON-LD)
 *
 * Site-wide blocks are injected by the root layout. WebPage, the homepage
 * breadcrumb and the homepage FAQPage render on the homepage only.
 *
 * Types used:
 *   - ProfessionalService  (Google: knowledge panel, local entity)
 *   - WebSite              (Google: sitelinks search box)
 *   - WebPage              (connects site + org to this page)
 *   - Person               (founder entity for GEO / knowledge graph)
 *   - Service × 4          (one per service offered)
 *   - BreadcrumbList       (sitelinks / breadcrumb rich result)
 *
 * No Review blocks: add reviews only from real clients who agreed to be quoted.
 */

const BASE_URL = SITE_URL;

// ─── Organization ────────────────────────────────────────────────────────────

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${BASE_URL}/#organization`,
  name: "Falcore",
  alternateName: "Falcore Web Design",
  url: BASE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${BASE_URL}/logo.png`,
    width: 512,
    height: 512,
  },
  image: `${BASE_URL}/logo.png`,
  description:
    "Falcore builds websites, custom web applications, AI-powered workflows, and business automations for US companies.",
  slogan: "The technical arm your business is missing.",
  email: "contact@falcoretech.com",
  foundingDate: "2026",
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
  sameAs: [
    "https://www.linkedin.com/company/falcoretech",
  ],
};

// ─── WebSite ─────────────────────────────────────────────────────────────────

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  url: BASE_URL,
  name: "Falcore",
  description:
    "Websites, custom web applications, AI systems, and business automations for US companies.",
  publisher: {
    "@id": `${BASE_URL}/#organization`,
  },
};

// ─── WebPage ─────────────────────────────────────────────────────────────────

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${BASE_URL}/#webpage`,
  url: BASE_URL,
  name: "Falcore | Web Design, Custom Apps & AI for US Businesses",
  description:
    "Falcore builds websites, custom web applications, AI-powered workflows, and business automations for US companies. Book a free 30-minute call.",
  dateModified: "2026-04-04",
  isPartOf: {
    "@id": `${BASE_URL}/#website`,
  },
  about: {
    "@id": `${BASE_URL}/#organization`,
  },
  breadcrumb: {
    "@id": `${BASE_URL}/#breadcrumb`,
  },
};

// ─── BreadcrumbList ───────────────────────────────────────────────────────────

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": `${BASE_URL}/#breadcrumb`,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: BASE_URL,
    },
  ],
};

// ─── Person (founder) ─────────────────────────────────────────────────────────

const founderSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${BASE_URL}/#founder`,
  name: "Faez Ansari",
  jobTitle: "Founder & Full-Stack Developer",
  worksFor: {
    "@id": `${BASE_URL}/#organization`,
  },
  url: `${BASE_URL}/#about`,
  sameAs: [
    "https://www.linkedin.com/in/faezansari",
  ],
  knowsAbout: [
    "Next.js",
    "TypeScript",
    "Web Design",
    "CRM Implementation",
    "AI Integration",
    "Business Automation",
  ],
  description:
    "Full-stack developer and systems builder with 13+ client projects. Built proposal generators, membership platforms, and client-facing project tracking tools. Founded Falcore to bring technical solutions to US businesses.",
};

// ─── Services ─────────────────────────────────────────────────────────────────

const webDesignServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${BASE_URL}/#service-web-design`,
  name: "Web Design",
  description:
    "Designs built around your brand and your customers — not a template with your logo slapped on. Every page is intentional.",
  provider: {
    "@id": `${BASE_URL}/#organization`,
  },
  serviceType: "Web Design",
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
  url: `${BASE_URL}/services/web-design`,
};

const webAppServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${BASE_URL}/#service-custom-web-applications`,
  name: "Custom Web Applications",
  description:
    "Client portals, membership platforms, internal dashboards, booking systems — if your business needs it built, we build it.",
  provider: {
    "@id": `${BASE_URL}/#organization`,
  },
  serviceType: "Custom Web Application Development",
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
  url: `${BASE_URL}/services/custom-web-applications`,
};

const aiEnablementServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${BASE_URL}/#service-ai-enablement`,
  name: "AI Enablement",
  description:
    "Put AI to work inside your business. Smarter workflows, automated responses, and tools that learn — integrated into how you already operate.",
  provider: {
    "@id": `${BASE_URL}/#organization`,
  },
  serviceType: "AI Integration and Automation",
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
  url: `${BASE_URL}/services/ai-enablement`,
};

const systemsServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${BASE_URL}/#service-systems-automations`,
  name: "Systems & Automations",
  description:
    "CRM setup, workflow automation, and tool integrations that eliminate the manual work slowing your team down.",
  provider: {
    "@id": `${BASE_URL}/#organization`,
  },
  serviceType: "Business Process Automation",
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
  url: `${BASE_URL}/services/systems-automations`,
};

// ─── FAQ ─────────────────────────────────────────────────────────────────────

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

// ─── Schema list ──────────────────────────────────────────────────────────────

const siteWideSchemas = [
  organizationSchema,
  webSiteSchema,
  founderSchema,
  webDesignServiceSchema,
  webAppServiceSchema,
  aiEnablementServiceSchema,
  systemsServiceSchema,
];

const homepageSchemas = [webPageSchema, breadcrumbSchema, faqSchema];

export function JsonLdScripts({ schemas }: { schemas: object[] }) {
  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

export function HomepageSchemaMarkup() {
  return <JsonLdScripts schemas={homepageSchemas} />;
}

export default function SchemaMarkup() {
  return <JsonLdScripts schemas={siteWideSchemas} />;
}
