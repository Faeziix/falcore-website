import type { FrequentlyAskedQuestion } from "@/lib/data/faq";
import type { ContentDates } from "@/lib/data/page-dates";

export type InclusionIconName =
  | "automatedWorkflow"
  | "chatAssistant"
  | "dataSorting"
  | "aiInsideTools"
  | "decisionBranch"
  | "crmRecord"
  | "toolLoop"
  | "integrationHub"
  | "processShortcut"
  | "stackedInfrastructure"
  | "brandedInterface"
  | "responsiveScreens"
  | "conversionPage"
  | "brandMark"
  | "stopwatch"
  | "memberPortal"
  | "adminDashboard"
  | "headlessContent"
  | "bookingCalendar"
  | "fittedTool";

export type ServiceExample = {
  title: string;
  description: string;
  caseStudySlug?: string;
};

type ServiceEntry = {
  slug: string;
  title: string;
  description: string;
  lead: string;
  sceneLabel: string;
  inclusions: { label: string; icon: InclusionIconName }[];
  examples: ServiceExample[];
  faqs: FrequentlyAskedQuestion[];
  showsWebsiteShowcase?: boolean;
  metaTitle: string;
  metaDescription: string;
  dates: ContentDates;
};

export type Service = ServiceEntry;

const SERVICE_ENTRIES: ServiceEntry[] = [
  {
    slug: "ai-enablement",
    title: "AI Enablement",
    description:
      "AI that answers, sorts and drafts inside the tools your team already uses.",
    lead: "AI that does real work in your business. It reads your records, drafts the next step and waits for your OK before anything goes out.",
    sceneLabel:
      "An AI agent working through a task: it reads your records, drafts 14 renewal quotes, waits for your approval before emailing, then books the calls",
    inclusions: [
      { label: "AI steps inside your everyday workflows", icon: "automatedWorkflow" },
      { label: "Assistants that answer customers and staff", icon: "chatAssistant" },
      { label: "Documents and messages read and sorted", icon: "dataSorting" },
      { label: "AI added to the tools you already use", icon: "aiInsideTools" },
      { label: "AI that asks when it isn’t sure", icon: "decisionBranch" },
    ],
    examples: [
      {
        title: "Answers about any client, with sources",
        description:
          "Answers built from meetings, chats and notes, each claim linked to its source.",
        caseStudySlug: "company-operating-system",
      },
      {
        title: "Tasks written from every meeting",
        description:
          "After each call, AI suggests tasks quoting the transcript. A person approves them.",
      },
      {
        title: "Meetings filed to the right client",
        description:
          "It filed 34 of 43 test meetings with none wrong, and asks when unsure.",
      },
      {
        title: "An assistant that acts with your approval",
        description:
          "Over 140 actions across the business, each one waiting for your approval.",
        caseStudySlug: "company-operating-system",
      },
      {
        title: "A product catalogue read by AI",
        description:
          "AI read a ceramics catalogue and proposed 69 tiles. I checked them before launch.",
        caseStudySlug: "timeless-touch-ceramics",
      },
    ],
    faqs: [
      {
        question: "Will the AI send anything without me checking?",
        answer:
          "Only if you want it to. Anything that reaches a customer or changes a record can wait for a person to approve it. Routine, low-risk steps can run on their own once you trust them.",
      },
      {
        question: "What can the AI see?",
        answer:
          "Only what you give it access to. Confidential material, like interviews or deal terms, can be kept away from it entirely, and every answer shows the sources it used.",
      },
      {
        question: "Do I have to switch tools?",
        answer:
          "No. I add AI to the tools your team already uses, such as your inbox, CRM, WhatsApp or shared drive.",
      },
      {
        question: "Where do we start?",
        answer:
          "With one repetitive job that eats your team’s time. We pick it together on the call, and a written plan sets out the scope, timeline and cost before any work starts.",
      },
    ],
    metaTitle: "AI Agents & AI Automation for Businesses",
    metaDescription:
      "AI agents that do real work inside your business: answers with sources, tasks written from meetings and drafts you approve. For businesses in the UAE and US.",
    dates: { publishedOn: "2026-04-04", updatedOn: "2026-10-22" },
  },
  {
    slug: "systems-automations",
    title: "Systems & Automations",
    description:
      "Your tools connected, so information moves on its own instead of by copy and paste.",
    lead: "Your tools connected, so leads, bookings and follow-ups move on their own. Your team stops copying data between apps.",
    sceneLabel:
      "A new enquiry filling in a form, getting scored, then flowing on its own into the CRM, the calendar and a welcome email",
    inclusions: [
      { label: "A CRM set up around how you sell", icon: "crmRecord" },
      { label: "Workflows that run across your tools", icon: "toolLoop" },
      { label: "Your apps connected to each other", icon: "integrationHub" },
      { label: "Your processes mapped and simplified", icon: "processShortcut" },
      { label: "Systems that grow without extra admin", icon: "stackedInfrastructure" },
    ],
    examples: [
      {
        title: "Calls that file themselves",
        description:
          "A recorder joins each meeting and files the transcript under the right client.",
        caseStudySlug: "company-operating-system",
      },
      {
        title: "Replies jump the queue",
        description:
          "A WhatsApp reply stops the follow-ups, moves the lead up and alerts sales.",
      },
      {
        title: "Ads that learn which leads became sales",
        description:
          "CRM stages flow back to Meta, so spend follows the leads that book meetings.",
      },
      {
        title: "Every form feeds the CRM",
        description:
          "The popup, contact form and demo send every enquiry straight to the CRM.",
        caseStudySlug: "convoflow",
      },
      {
        title: "Bookings, calls and WhatsApp in one place",
        description:
          "CRM, phone menu and WhatsApp for a Dubai baggage company, in three weeks.",
      },
    ],
    faqs: [
      {
        question: "Which tools can you connect?",
        answer:
          "Most tools that allow connections, which covers the common CRMs, calendars, inboxes, WhatsApp, payments, forms and ad platforms. If one of yours can’t be connected, I’ll tell you on the call.",
      },
      {
        question: "Do I need to replace my CRM?",
        answer:
          "Usually not. I start from what you have and only suggest a change if it’s holding you back.",
      },
      {
        question: "What happens if something breaks?",
        answer:
          "Automations are built to tell a person when a step fails instead of failing quietly. After launch I fix issues and adjust things as your process changes.",
      },
      {
        question: "Who owns the automations?",
        answer:
          "You do. They run on your own accounts, and you keep the logins, the code and the data.",
      },
    ],
    metaTitle: "Business Automation, CRM & WhatsApp Integration",
    metaDescription:
      "Connect your CRM, calendar, WhatsApp and inbox so leads, bookings and follow-ups move on their own. Workflow automation for businesses in the UAE and US.",
    dates: { publishedOn: "2026-04-04", updatedOn: "2026-10-22" },
  },
  {
    slug: "web-design",
    title: "Web Design",
    description:
      "Websites designed around your brand and your customers, built to turn visits into enquiries.",
    lead: "A site designed around your brand and your customers, built to turn visits into enquiries. You can edit every page yourself.",
    sceneLabel:
      "A website being designed: layout guides, a headline typing in, a typeface and colour being chosen, then the site going live",
    inclusions: [
      { label: "A design made for your brand", icon: "brandedInterface" },
      { label: "Built for phones first", icon: "responsiveScreens" },
      { label: "Pages structured to win enquiries", icon: "conversionPage" },
      { label: "Your identity carried through every page", icon: "brandMark" },
      { label: "First designs within days of the call", icon: "stopwatch" },
    ],
    examples: [
      {
        title: "A spa’s spreadsheets became a website",
        description:
          "138 treatment pages in English and Arabic, built from the spa’s spreadsheets.",
        caseStudySlug: "corpofino",
      },
      {
        title: "An author’s site she edits herself",
        description:
          "Sending readers to Amazon within six weeks, and she edits every page herself.",
        caseStudySlug: "sanaa-ouahmane",
      },
      {
        title: "A jewellery site with matched product images",
        description:
          "A redesign, plus one raw photo shoot turned into matching product images.",
        caseStudySlug: "diamaria",
      },
    ],
    faqs: [
      {
        question: "Can I edit the site myself?",
        answer:
          "Yes. Text, images and pages are editable in a simple editor, so everyday changes don’t need a developer.",
      },
      {
        question: "Can you work with my current site?",
        answer:
          "Yes. I can redesign it, rebuild it or improve what’s there. If a rebuild makes more sense, I’ll explain why on the call.",
      },
      {
        question: "Will it work well on phones?",
        answer:
          "Every page is designed for phones first, then for larger screens, and tested on both.",
      },
      {
        question: "Will it show up on Google?",
        answer:
          "Each page is built to load fast, with a clean structure and the titles, descriptions and structured data that search engines read.",
      },
    ],
    showsWebsiteShowcase: true,
    metaTitle: "Custom Web Design for UAE & US Businesses",
    metaDescription:
      "Custom web design for businesses in the UAE and US: brand-led, mobile-first sites built to turn visits into enquiries, which you can edit yourself.",
    dates: { publishedOn: "2026-04-04", updatedOn: "2026-10-22" },
  },
  {
    slug: "custom-web-applications",
    title: "Custom Web Applications",
    description:
      "Portals, dashboards and booking systems built around how your business actually runs.",
    lead: "Portals, dashboards and booking systems built around how your business runs. You own the code and the data.",
    sceneLabel:
      "A custom dashboard updating live: bookings and revenue counting up, a chart drawing, and views changing for admin, staff and client roles",
    inclusions: [
      { label: "Client portals and membership platforms", icon: "memberPortal" },
      { label: "Internal dashboards and admin panels", icon: "adminDashboard" },
      { label: "Content you can edit without a developer", icon: "headlessContent" },
      { label: "Booking and scheduling systems", icon: "bookingCalendar" },
      { label: "Tools built for your exact workflow", icon: "fittedTool" },
    ],
    examples: [
      {
        title: "One system instead of a dozen tools",
        description:
          "215 screens for projects, meetings, sales and a client portal.",
        caseStudySlug: "company-operating-system",
      },
      {
        title: "A membership platform that cut software costs",
        description:
          "Courses, events and payments for a coaching company, cutting its platform bill by about 70%.",
      },
      {
        title: "An online showroom of 345 surfaces",
        description:
          "PDF catalogues became a filterable showroom with its own built-in editor.",
        caseStudySlug: "timeless-touch-ceramics",
      },
    ],
    faqs: [
      {
        question: "Why not use off-the-shelf software?",
        answer:
          "Often you should, and I’ll say so. Custom software makes sense when you pay for several tools that each do part of the job, or when your team works around a tool instead of with it.",
      },
      {
        question: "Who owns the code?",
        answer:
          "You do. It runs on your own accounts, so there’s no lock-in and any developer can pick it up later.",
      },
      {
        question: "Can it connect to the tools I already use?",
        answer:
          "Yes. Most apps I build pull from and send to the systems you already rely on, like your CRM, payments, calendar or accounting software.",
      },
      {
        question: "What happens after launch?",
        answer: "I stay on for fixes and new features as your business grows.",
      },
    ],
    metaTitle: "Custom Web Application Development",
    metaDescription:
      "Client portals, dashboards, booking systems and membership platforms built around how your business runs. You own the code and the data.",
    dates: { publishedOn: "2026-04-04", updatedOn: "2026-10-22" },
  },
];

export const SERVICES: Service[] = SERVICE_ENTRIES;

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
