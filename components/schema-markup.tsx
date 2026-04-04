/**
 * Falcore — Schema.org structured data (JSON-LD)
 *
 * Blocks injected at the root layout level so they are present on every
 * page render, including the homepage.
 *
 * Types used:
 *   - ProfessionalService  (Google: knowledge panel, local entity)
 *   - WebSite              (Google: sitelinks search box)
 *   - WebPage              (connects site + org to this page)
 *   - Person               (founder entity for GEO / knowledge graph)
 *   - Service × 4          (one per service offered)
 *   - BreadcrumbList       (sitelinks / breadcrumb rich result)
 *   - Organization w/ reviews (review snippets + LLM entity signals)
 */

const BASE_URL = "https://falcoretech.com";

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
  email: "hello@falcoretech.com",
  foundingDate: "2024",
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
  url: `${BASE_URL}/#services`,
};

const webAppServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${BASE_URL}/#service-web-applications`,
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
  url: `${BASE_URL}/#services`,
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
  url: `${BASE_URL}/#services`,
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
  url: `${BASE_URL}/#services`,
};

// ─── Organization with reviews ────────────────────────────────────────────────
//
// Reviews use a separate block that references the same @id as the org so
// JSON-LD processors merge them into one node — keeping @type consistent.
// Individual reviews (no AggregateRating) improve entity understanding for
// Google and LLM citation systems. Add AggregateRating once you have 5+ reviews.

const reviewsSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${BASE_URL}/#organization`,
  review: [
    {
      "@type": "Review",
      author: {
        "@type": "Person",
        name: "Rashid Al Maktoum",
        jobTitle: "Managing Director",
      },
      itemReviewed: {
        "@id": `${BASE_URL}/#organization`,
      },
      reviewBody:
        "We needed a site that matched the quality of our brand. Falcore delivered something we are genuinely proud to show our clients. The process was smooth and the result speaks for itself.",
      reviewRating: {
        "@type": "Rating",
        ratingValue: 5,
        bestRating: 5,
        worstRating: 1,
      },
    },
    {
      "@type": "Review",
      author: {
        "@type": "Person",
        name: "Karim Haddad",
        jobTitle: "Founder",
      },
      itemReviewed: {
        "@id": `${BASE_URL}/#organization`,
      },
      reviewBody:
        "Fast turnaround, zero hassle. Our online bookings jumped within the first month of launching.",
      reviewRating: {
        "@type": "Rating",
        ratingValue: 5,
        bestRating: 5,
        worstRating: 1,
      },
    },
  ],
};

// ─── Schema list ──────────────────────────────────────────────────────────────

const schemas = [
  organizationSchema,
  webSiteSchema,
  webPageSchema,
  breadcrumbSchema,
  founderSchema,
  webDesignServiceSchema,
  webAppServiceSchema,
  aiEnablementServiceSchema,
  systemsServiceSchema,
  reviewsSchema,
];

export default function SchemaMarkup() {
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
