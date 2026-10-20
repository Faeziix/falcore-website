import type { Organization, Person, WebSite } from "schema-dts";
import {
  BOOKING_URL,
  BUSINESS_LOCATION,
  BUSINESS_NAME,
  CONTACT_EMAIL,
  FOUNDER_NAME,
  SERVED_MARKETS,
  SITE_URL,
  SOCIAL_PROFILES,
  absoluteUrl,
} from "@/lib/site-config";
import { FOUNDER_ID, ORGANIZATION_ID, WEBSITE_ID } from "./entity-ids";

const SITE_DESCRIPTION =
  "Falcore builds websites, custom web applications, business automations and AI systems for businesses in the UAE and US.";

const FOUNDER_DESCRIPTION =
  "Full-stack developer and AI automation engineer based in Dubai. Builds websites, custom web applications, business automations and AI agents for businesses in the UAE and US.";

const AREAS_OF_EXPERTISE = [
  "Web design",
  "Custom web applications",
  "Business process automation",
  "CRM integration",
  "WhatsApp automation",
  "AI agents",
  "AI integration",
];

export const SERVED_COUNTRIES = SERVED_MARKETS.map((market) => ({
  "@type": "Country" as const,
  name: market.name,
}));

const businessAddress = {
  "@type": "PostalAddress" as const,
  addressLocality: BUSINESS_LOCATION.city,
  addressCountry: BUSINESS_LOCATION.countryCode,
};

export const organizationReference = { "@id": ORGANIZATION_ID };
export const founderReference = { "@id": FOUNDER_ID };
export const websiteReference = { "@id": WEBSITE_ID };

export const founderAuthor: Person = {
  "@type": "Person",
  "@id": FOUNDER_ID,
  name: FOUNDER_NAME,
  url: absoluteUrl("/about"),
};

export const organizationNode: Organization = {
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: BUSINESS_NAME,
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: absoluteUrl("/logo.png"),
    width: "512",
    height: "512",
  },
  image: absoluteUrl("/logo.png"),
  description: SITE_DESCRIPTION,
  slogan: "The technical arm your business is missing.",
  email: CONTACT_EMAIL,
  address: businessAddress,
  areaServed: SERVED_COUNTRIES,
  knowsAbout: AREAS_OF_EXPERTISE,
  founder: founderReference,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: CONTACT_EMAIL,
    url: BOOKING_URL,
    areaServed: SERVED_MARKETS.map((market) => market.code),
    availableLanguage: "English",
  },
  sameAs: [SOCIAL_PROFILES.linkedInCompany],
};

export const founderNode: Person = {
  "@type": "Person",
  "@id": FOUNDER_ID,
  name: FOUNDER_NAME,
  jobTitle: "Founder, full-stack developer and AI automation engineer",
  description: FOUNDER_DESCRIPTION,
  url: absoluteUrl("/about"),
  image: absoluteUrl("/founder-portrait.jpg"),
  worksFor: organizationReference,
  homeLocation: { "@type": "Place", address: businessAddress },
  knowsAbout: AREAS_OF_EXPERTISE,
  sameAs: [SOCIAL_PROFILES.linkedInFounder, SOCIAL_PROFILES.upworkFounder],
};

export const websiteNode: WebSite = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: BUSINESS_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  inLanguage: "en",
  publisher: organizationReference,
};
