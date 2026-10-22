import {
  siClaude,
  siMeta,
  siN8n,
  siNextdotjs,
  siPostgresql,
  siReact,
  siSupabase,
  siTailwindcss,
  siTypescript,
  siVercel,
  siWhatsapp,
  type SimpleIcon,
} from "simple-icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { STACK_TOOLS, type StackToolSlug } from "../_lib/about-content";

const STACK_TOOL_ICONS: Record<StackToolSlug, SimpleIcon> = {
  nextdotjs: siNextdotjs,
  react: siReact,
  typescript: siTypescript,
  tailwindcss: siTailwindcss,
  supabase: siSupabase,
  postgresql: siPostgresql,
  claude: siClaude,
  n8n: siN8n,
  whatsapp: siWhatsapp,
  meta: siMeta,
  vercel: siVercel,
};

export function StackToolLogos() {
  return (
    <section aria-labelledby="stack-heading" className="pb-(--section-space)">
      <SectionHeading id="stack-heading" title="What I build with" intro="Proven tools, running on your own accounts." />
      <ul className="mt-12 flex flex-wrap gap-x-10 gap-y-8 md:gap-x-14">
        {STACK_TOOLS.map((tool) => (
          <li
            key={tool.slug}
            className="flex items-center gap-3 text-muted-foreground transition-colors duration-500 ease-out-expo hover:text-foreground"
          >
            <svg aria-hidden viewBox="0 0 24 24" className="size-7 fill-current md:size-8">
              <path d={STACK_TOOL_ICONS[tool.slug].path} />
            </svg>
            <span>{tool.name}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
