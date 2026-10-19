import type { LoopingVideoSources } from "@/components/ui/looping-video";

type ServiceEntry = {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  loopLabel: string;
  bullets: string[];
  useCases: { title: string; description: string }[];
  metaTitle: string;
  metaDescription: string;
};

export type Service = ServiceEntry & { loop: LoopingVideoSources };

const SERVICE_LOOP_DIRECTORY = "/services/loops";

function buildServiceLoopSources(slug: string): LoopingVideoSources {
  return {
    mp4: `${SERVICE_LOOP_DIRECTORY}/${slug}.mp4`,
    webm: `${SERVICE_LOOP_DIRECTORY}/${slug}.webm`,
    poster: `${SERVICE_LOOP_DIRECTORY}/${slug}-poster.jpg`,
  };
}

const SERVICE_ENTRIES: ServiceEntry[] = [
  {
    slug: "ai-enablement",
    title: "AI Enablement",
    description:
      "AI that answers, sorts and drafts inside the tools your team already uses.",
    longDescription:
      "Most businesses know AI can help — they just do not know where to start. We identify the repetitive, time-consuming parts of your operation and build AI-powered solutions that handle them. From customer-facing chatbots to internal workflow automation, we integrate AI into the tools you already use so your team works faster without changing how they work.",
    loopLabel:
      "Scattered points of information being sorted into neat channels inside a glass slab",
    bullets: [
      "AI-powered workflow automation",
      "Custom chatbots & virtual assistants",
      "Intelligent data processing",
      "AI integration into existing tools",
      "Smarter decision-making pipelines",
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
    loopLabel:
      "A precision machine moving blocks steadily around a conveyor loop",
    bullets: [
      "CRM setup & configuration",
      "Workflow automation across tools",
      "Third-party integrations",
      "Process optimization & mapping",
      "Scalable operational infrastructure",
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
    loopLabel:
      "Layout blocks arranging themselves on a tablet, surrounded by wireframe sketches",
    bullets: [
      "Custom UI/UX tailored to your brand",
      "Mobile-first responsive layouts",
      "Conversion-focused page structures",
      "Brand identity integration",
      "Rapid turnaround — designs in days, not weeks",
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
    loopLabel:
      "A control console showing a live dashboard of charts",
    bullets: [
      "Client portals & membership platforms",
      "Internal dashboards & admin panels",
      "Headless CMS implementation",
      "Booking & scheduling systems",
      "Custom tools built for your workflow",
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

export const SERVICES: Service[] = SERVICE_ENTRIES.map((entry) => ({
  ...entry,
  loop: buildServiceLoopSources(entry.slug),
}));

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
