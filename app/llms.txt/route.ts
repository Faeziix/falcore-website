import { FAQ_ITEMS } from "@/lib/data/faq";
import { PROCESS_STEPS } from "@/lib/data/process-steps";
import { listIndexablePages, type IndexablePage, type IndexablePageGroup } from "@/lib/indexable-pages";
import {
  BOOKING_URL,
  BUSINESS_NAME,
  CONTACT_EMAIL,
  FOUNDER_NAME,
  SERVED_MARKETS_SENTENCE,
  SITE_DESCRIPTION,
  SITE_URL,
  absoluteUrl,
} from "@/lib/site-config";

export const dynamic = "force-static";

const SECTION_TITLES: Record<Exclude<IndexablePageGroup, "main">, string> = {
  service: "Services",
  caseStudy: "Case studies",
  blogPost: "Blog",
};

function pageLink(page: IndexablePage) {
  return `- [${page.title}](${absoluteUrl(page.path)}): ${page.description}`;
}

function buildLlmsText() {
  const pages = listIndexablePages();
  const groupedSections = (Object.keys(SECTION_TITLES) as (keyof typeof SECTION_TITLES)[])
    .map((group) => ({ title: SECTION_TITLES[group], pages: pages.filter((page) => page.group === group) }))
    .filter((section) => section.pages.length > 0)
    .map((section) => [`## ${section.title}`, ...section.pages.map(pageLink)].join("\n"));

  return [
    `# ${BUSINESS_NAME}`,
    `> ${SITE_DESCRIPTION}`,
    `${BUSINESS_NAME} is run by ${FOUNDER_NAME}, a full-stack developer and AI automation engineer. ${SERVED_MARKETS_SENTENCE} Clients work with him directly, own their code and data, and get a written plan with scope, timeline and cost before any work starts.`,
    ...groupedSections,
    ["## How a project runs", ...PROCESS_STEPS.map((step, index) => `${index + 1}. ${step.title}: ${step.description}`)].join("\n"),
    ["## Common questions", ...FAQ_ITEMS.map((item) => `- ${item.question} ${item.answer}`)].join("\n"),
    ["## Pages", ...pages.filter((page) => page.group === "main").map(pageLink)].join("\n"),
    ["## Contact", `- Email: ${CONTACT_EMAIL}`, `- Book a consultation call: ${BOOKING_URL}`, `- Website: ${SITE_URL}`].join("\n"),
  ].join("\n\n");
}

export function GET() {
  return new Response(`${buildLlmsText()}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
