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

type ServiceEntry = {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  sceneLabel: string;
  inclusions: { label: string; icon: InclusionIconName }[];
  useCases: { title: string; description: string }[];
  metaTitle: string;
  metaDescription: string;
};

export type Service = ServiceEntry;

const SERVICE_ENTRIES: ServiceEntry[] = [
  {
    slug: "ai-enablement",
    title: "AI Enablement",
    description:
      "AI that answers, sorts and drafts inside the tools your team already uses.",
    longDescription:
      "Most businesses know AI can help — they just do not know where to start. We identify the repetitive, time-consuming parts of your operation and build AI-powered solutions that handle them. From customer-facing chatbots to internal workflow automation, we integrate AI into the tools you already use so your team works faster without changing how they work.",
    sceneLabel:
      "An AI agent working through a task: it reads your records, drafts 14 renewal quotes, waits for your approval before emailing, then books the calls",
    inclusions: [
      { label: "AI-powered workflow automation", icon: "automatedWorkflow" },
      { label: "Custom chatbots & virtual assistants", icon: "chatAssistant" },
      { label: "Intelligent data processing", icon: "dataSorting" },
      { label: "AI integration into existing tools", icon: "aiInsideTools" },
      { label: "Smarter decision-making pipelines", icon: "decisionBranch" },
    ],
    useCases: [
      {
        title: "Automated customer support",
        description:
          "Deploy AI chatbots that handle common questions, route complex issues to your team, and learn from every interaction.",
      },
      {
        title: "Intelligent document processing",
        description:
          "Extract, classify, and route information from invoices, contracts, and forms — automatically.",
      },
      {
        title: "AI-assisted content & proposals",
        description:
          "Generate first drafts of proposals, reports, and client communications that your team refines and sends.",
      },
    ],
    metaTitle: "AI Enablement Services",
    metaDescription:
      "Put AI to work inside your business. Custom chatbots, workflow automation, intelligent data processing, and AI integration into your existing tools. Built by Falcore.",
  },
  {
    slug: "systems-automations",
    title: "Systems & Automations",
    description:
      "Your tools connected, so information moves on its own instead of by copy and paste.",
    longDescription:
      "Your team should not be copying data between spreadsheets, sending follow-up emails manually, or toggling between six different tools to complete one task. We map your workflows, identify the bottlenecks, and build automations that connect your CRM, email, scheduling, invoicing, and project management tools into one streamlined system.",
    sceneLabel:
      "A new enquiry filling in a form, getting scored, then flowing on its own into the CRM, the calendar and a welcome email",
    inclusions: [
      { label: "CRM setup & configuration", icon: "crmRecord" },
      { label: "Workflow automation across tools", icon: "toolLoop" },
      { label: "Third-party integrations", icon: "integrationHub" },
      { label: "Process optimization & mapping", icon: "processShortcut" },
      { label: "Scalable operational infrastructure", icon: "stackedInfrastructure" },
    ],
    useCases: [
      {
        title: "CRM implementation & automation",
        description:
          "Set up HubSpot, Salesforce, or a custom CRM with automated lead scoring, follow-ups, and pipeline management.",
      },
      {
        title: "Cross-tool workflow automation",
        description:
          "Connect your scheduling, invoicing, project management, and communication tools so data flows automatically between them.",
      },
      {
        title: "Onboarding & internal processes",
        description:
          "Automate client onboarding sequences, internal task assignment, and recurring operational workflows.",
      },
    ],
    metaTitle: "Systems & Automations Services",
    metaDescription:
      "CRM setup, workflow automation, and tool integrations that eliminate manual work. We connect your business tools into one streamlined system. Built by Falcore.",
  },
  {
    slug: "web-design",
    title: "Web Design",
    description:
      "Websites designed around your brand and your customers, built to turn visits into enquiries.",
    longDescription:
      "A good website is not just something that looks nice — it is a tool that earns trust, communicates value, and moves visitors toward action. We design every page with intention: clear messaging, intuitive navigation, and a visual identity that matches the quality of your business. No templates, no page builders, no compromise.",
    sceneLabel:
      "A website being designed: layout guides, a headline typing in, a typeface and colour being chosen, then the site going live",
    inclusions: [
      { label: "Custom UI/UX tailored to your brand", icon: "brandedInterface" },
      { label: "Mobile-first responsive layouts", icon: "responsiveScreens" },
      { label: "Conversion-focused page structures", icon: "conversionPage" },
      { label: "Brand identity integration", icon: "brandMark" },
      { label: "Rapid turnaround — designs in days, not weeks", icon: "stopwatch" },
    ],
    useCases: [
      {
        title: "Business website redesign",
        description:
          "Replace an outdated or template-based site with a custom design that reflects the quality of your work and converts visitors into leads.",
      },
      {
        title: "Landing pages for campaigns",
        description:
          "Purpose-built pages designed to convert traffic from ads, email, or social media into booked calls or sign-ups.",
      },
      {
        title: "Multi-page service websites",
        description:
          "Full websites with dedicated service pages, case studies, and clear CTAs — built to rank on Google and convert on arrival.",
      },
    ],
    metaTitle: "Web Design Services",
    metaDescription:
      "Custom web design for US businesses. Brand-focused UI/UX, mobile-first layouts, conversion-optimized pages, and rapid turnaround. Built by Falcore.",
  },
  {
    slug: "custom-web-applications",
    title: "Custom Web Applications",
    description:
      "Portals, dashboards and booking systems built around how your business actually runs.",
    longDescription:
      "Off-the-shelf software does not always fit. When your business needs a tool that does not exist — a client portal, an internal dashboard, a booking system, a membership platform — we build it from scratch. Every application is full-stack, production-grade, and designed around how your team actually works.",
    sceneLabel:
      "A custom dashboard updating live: bookings and revenue counting up, a chart drawing, and views changing for admin, staff and client roles",
    inclusions: [
      { label: "Client portals & membership platforms", icon: "memberPortal" },
      { label: "Internal dashboards & admin panels", icon: "adminDashboard" },
      { label: "Headless CMS implementation", icon: "headlessContent" },
      { label: "Booking & scheduling systems", icon: "bookingCalendar" },
      { label: "Custom tools built for your workflow", icon: "fittedTool" },
    ],
    useCases: [
      {
        title: "Client portals & dashboards",
        description:
          "Give your clients a branded space to view project status, download deliverables, and communicate with your team.",
      },
      {
        title: "Booking & scheduling platforms",
        description:
          "Custom booking systems with availability management, payments, and automated confirmations — built for your specific workflow.",
      },
      {
        title: "Internal operations tools",
        description:
          "Admin panels, reporting dashboards, and workflow tools that replace the spreadsheets and manual processes your team outgrew.",
      },
    ],
    metaTitle: "Custom Web Application Development",
    metaDescription:
      "Client portals, dashboards, booking systems, and membership platforms — built full-stack with Next.js and TypeScript. Production-grade custom web apps by Falcore.",
  },
];

export const SERVICES: Service[] = SERVICE_ENTRIES;

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
