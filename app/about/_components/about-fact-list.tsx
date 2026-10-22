import { BriefcaseIcon, CodeIcon, MapPinIcon } from "@phosphor-icons/react/ssr";
import type { Icon } from "@phosphor-icons/react";
import { ABOUT_FACTS, type AboutFactIconName } from "../_lib/about-content";

const FACT_ICONS: Record<AboutFactIconName, Icon> = {
  location: MapPinIcon,
  experience: BriefcaseIcon,
  craft: CodeIcon,
};

export function AboutFactList({ className }: { className?: string }) {
  return (
    <ul className={className}>
      {ABOUT_FACTS.map((fact) => {
        const FactIcon = FACT_ICONS[fact.icon];
        return (
          <li key={fact.icon} className="flex items-center gap-3 py-2 text-foreground-soft">
            <FactIcon aria-hidden size={20} className="shrink-0 text-accent" />
            {fact.label}
          </li>
        );
      })}
    </ul>
  );
}
