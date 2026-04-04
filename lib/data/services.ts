export type Service = {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  imageAlt: string;
  bullets: string[];
  useCases: { title: string; description: string }[];
  metaTitle: string;
  metaDescription: string;
};

export const SERVICES: Service[] = [
  {
    slug: "ai-enablement",
    title: "AI Enablement",
    description:
      "Put AI to work inside your business — integrated into how you already operate.",
    longDescription:
      "Most businesses know AI can help — they just do not know where to start. We identify the repetitive, time-consuming parts of your operation and build AI-powered solutions that handle them. From customer-facing chatbots to internal workflow automation, we integrate AI into the tools you already use so your team works faster without changing how they work.",
    image: "/services/ai-enablement.jpg",
    imageAlt:
      "AI-powered workflow automation dashboard for business operations",
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
      "Eliminate the manual work slowing your team down. We wire everything together.",
    longDescription:
      "Your team should not be copying data between spreadsheets, sending follow-up emails manually, or toggling between six different tools to complete one task. We map your workflows, identify the bottlenecks, and build automations that connect your CRM, email, scheduling, invoicing, and project management tools into one streamlined system.",
    image: "/services/system-automation.jpg",
    imageAlt: "CRM and business process automation system integration",
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
      "Designs built around your brand and your customers — not a template with your logo slapped on.",
    longDescription:
      "A good website is not just something that looks nice — it is a tool that earns trust, communicates value, and moves visitors toward action. We design every page with intention: clear messaging, intuitive navigation, and a visual identity that matches the quality of your business. No templates, no page builders, no compromise.",
    image: "/services/web-design.jpg",
    imageAlt:
      "Custom website design with brand-focused UI and responsive layout",
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
      "If your business needs it built, we build it. Full-stack, production-grade, and built to scale.",
    longDescription:
      "Off-the-shelf software does not always fit. When your business needs a tool that does not exist — a client portal, an internal dashboard, a booking system, a membership platform — we build it from scratch. Every application is full-stack, production-grade, and designed around how your team actually works.",
    image: "/services/web-dev.jpg",
    imageAlt:
      "Full-stack web application with client portal and dashboard interface",
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

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
