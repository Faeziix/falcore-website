/**
 * Falcore — Schema.org structured data (JSON-LD)
 *
 * Blocks injected at the root layout level so they are present on every
 * page render, including the homepage.
 *
 * Types used:
 *   - Organization        (Google: sitelinks, knowledge panel)
 *   - WebSite             (Google: sitelinks search box)
 *   - Service × 3        (Google: general rich results / entity understanding)
 *   - Review × 2         (Google: review snippets — star ratings require
 *                          AggregateRating; individual reviews provide
 *                          entity credibility and GEO/LLM signals)
 */

const BASE_URL = "https://falcoretech.com";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${BASE_URL}/#organization`,
  name: "Falcore",
  alternateName: "Falcore Web Design",
  url: BASE_URL,
  logo: `${BASE_URL}/favicon.ico`,
  description:
    "Falcore builds high-performance websites for local businesses. Clean design, fast load times, and real results — delivered in 48 hours.",
  slogan: "Web design for local businesses.",
  email: "hello@falcorewebdesign.com",
  areaServed: {
    "@type": "Country",
    name: "Worldwide",
  },
  serviceType: [
    "Web Design",
    "Web Development",
    "Conversion Rate Optimisation",
    "AI Automation",
  ],
};

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  url: BASE_URL,
  name: "Falcore",
  description:
    "High-performance websites for local businesses. Fast delivery, clean design, real results.",
  publisher: {
    "@id": `${BASE_URL}/#organization`,
  },
};

const webDesignServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${BASE_URL}/#service-web-design`,
  name: "Web Design & Development",
  description:
    "Modern, fast-loading websites built with real code — not templates. Designed to turn visitors into customers.",
  provider: {
    "@id": `${BASE_URL}/#organization`,
  },
  serviceType: "Web Design and Development",
  url: `${BASE_URL}/#services`,
};

const croServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${BASE_URL}/#service-cro`,
  name: "Conversion Optimisation",
  description:
    "Data-driven tweaks to your site that increase leads, calls, and bookings. Every element earns its place.",
  provider: {
    "@id": `${BASE_URL}/#organization`,
  },
  serviceType: "Conversion Rate Optimisation",
  url: `${BASE_URL}/#services`,
};

const aiAutomationsServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${BASE_URL}/#service-ai-automations`,
  name: "AI Automations",
  description:
    "Chatbots, lead capture, and workflow automations that save you hours and never miss a customer.",
  provider: {
    "@id": `${BASE_URL}/#organization`,
  },
  serviceType: "AI Automation and Business Process Automation",
  url: `${BASE_URL}/#services`,
};

// Individual Review blocks — no AggregateRating because only 2 reviews exist.
// These still improve entity understanding for Google and LLM citation systems.
// Add AggregateRating once you have 5+ reviews.
const reviewsSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${BASE_URL}/#organization`,
  review: [
    {
      "@type": "Review",
      author: {
        "@type": "Person",
        name: "Rashid Al Maktoum",
        jobTitle: "Managing Director",
      },
      reviewBody:
        "We needed a site that matched the quality of our brand. Falcore delivered something we are genuinely proud to show our clients. The process was smooth and the result speaks for itself.",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
    },
    {
      "@type": "Review",
      author: {
        "@type": "Person",
        name: "Karim Haddad",
        jobTitle: "Founder",
      },
      reviewBody:
        "Fast turnaround, zero hassle. Our online bookings jumped within the first month of launching.",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
    },
  ],
};

const schemas = [
  organizationSchema,
  webSiteSchema,
  webDesignServiceSchema,
  croServiceSchema,
  aiAutomationsServiceSchema,
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
