export const SITE_URL = "https://www.falcoretech.com";

export const BOOKING_URL = "https://calendly.com/amirfaezansari/30min";

export const CONTACT_EMAIL = "contact@falcoretech.com";

export const BUSINESS_NAME = "Falcore";

export const FOUNDER_NAME = "Faez Ansari";

export const BUSINESS_LOCATION = {
  city: "Dubai",
  countryCode: "AE",
} as const;

export const SERVED_MARKETS = [
  { name: "United Arab Emirates", code: "AE" },
  { name: "United States", code: "US" },
] as const;

export const HOMEPAGE_TITLE = "Falcore | Web Design, Custom Apps & AI in the UAE & US";

export const SITE_DESCRIPTION =
  "I build websites, custom web apps, business automations and AI systems for businesses in the UAE and US. Based in Dubai. Book a consultation call.";

export const SERVED_MARKETS_SENTENCE = "Based in Dubai, working with clients in the UAE and US.";

export const SOCIAL_PROFILES = {
  linkedInCompany: "https://www.linkedin.com/company/falcoretech",
  linkedInFounder: "https://www.linkedin.com/in/faezansari",
  upworkFounder: "https://www.upwork.com/freelancers/~01a4868edc71ea272d",
} as const;

export function absoluteUrl(path: string) {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

export const externalLinkProps = {
  target: "_blank",
  rel: "noopener noreferrer nofollow",
} as const;
