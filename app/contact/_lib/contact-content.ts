import { CONTACT_EMAIL, SERVED_MARKETS_SENTENCE } from "@/lib/site-config";

export const CONTACT_PATH = "/contact";

export const CONTACT_TITLE = "Contact: Book a Consultation Call";

export const CONTACT_DESCRIPTION =
  "Book a consultation call about your website, custom app, automation or AI project. Based in Dubai, working with businesses in the UAE and US.";

export const CONTACT_LEAD =
  "Start with a 30-minute consultation call about what’s slowing your team down. No commitment and no jargon.";

export type ContactDetail = {
  label: string;
  value: string;
  href?: string;
};

export const CONTACT_DETAILS: ContactDetail[] = [
  { label: "Email", value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
  { label: "Where I work", value: `${SERVED_MARKETS_SENTENCE} Calls happen online.` },
  { label: "Replies", value: "Most emails get a reply within 24 hours. Booking a call is the fastest way to start." },
];
