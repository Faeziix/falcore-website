export const ABOUT_PATH = "/about";

export const ABOUT_TITLE = "Faez Ansari, Developer & AI Automation Engineer";

export const ABOUT_DESCRIPTION =
  "Faez Ansari is a full-stack developer and AI automation engineer in Dubai, building websites, apps and automations for businesses in the UAE and US.";

export const ABOUT_LEAD =
  "I build websites, custom apps and AI automations for businesses in the UAE and US.";

export type AboutFactIconName = "location" | "experience" | "craft";

export type AboutFact = { icon: AboutFactIconName; label: string };

export const ABOUT_FACTS: AboutFact[] = [
  { icon: "location", label: "Based in Dubai" },
  { icon: "experience", label: "6 years building for agencies and clients" },
  { icon: "craft", label: "Full-stack developer and AI automation engineer" },
];

export type WorkingPrincipleIconName = "directContact" | "writtenPlan" | "yourProcess" | "ownership";

export type WorkingPrinciple = { icon: WorkingPrincipleIconName; title: string; description: string };

export const WORKING_PRINCIPLES: WorkingPrinciple[] = [
  {
    icon: "directContact",
    title: "You talk to the person building it",
    description: "No account managers. The person on the call writes the code.",
  },
  {
    icon: "writtenPlan",
    title: "A written plan before any work",
    description: "Scope, timeline and cost agreed up front. No surprises.",
  },
  {
    icon: "yourProcess",
    title: "Built around how you already work",
    description: "I start from your team’s real work, not a feature wishlist.",
  },
  {
    icon: "ownership",
    title: "You own everything",
    description: "Code, data and accounts are yours, on your own servers.",
  },
];

export type StackToolSlug =
  | "nextdotjs"
  | "react"
  | "typescript"
  | "tailwindcss"
  | "supabase"
  | "postgresql"
  | "claude"
  | "n8n"
  | "whatsapp"
  | "meta"
  | "vercel";

export const STACK_TOOLS: { slug: StackToolSlug; name: string }[] = [
  { slug: "nextdotjs", name: "Next.js" },
  { slug: "react", name: "React" },
  { slug: "typescript", name: "TypeScript" },
  { slug: "tailwindcss", name: "Tailwind CSS" },
  { slug: "supabase", name: "Supabase" },
  { slug: "postgresql", name: "PostgreSQL" },
  { slug: "claude", name: "Claude" },
  { slug: "n8n", name: "n8n" },
  { slug: "whatsapp", name: "WhatsApp" },
  { slug: "meta", name: "Meta" },
  { slug: "vercel", name: "Vercel" },
];

export const RECENT_WORK_COUNT = 4;
