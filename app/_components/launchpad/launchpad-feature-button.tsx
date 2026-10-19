import { cn } from "@/lib/utils";
import type { LaunchpadFeature } from "@/app/_lib/launchpad-showcase";

export function LaunchpadFeatureButton({
  feature,
  isActive,
  onSelect,
}: {
  feature: LaunchpadFeature;
  isActive: boolean;
  onSelect: (featureId: string) => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={isActive}
      aria-controls="launchpad-screenshot"
      onClick={() => onSelect(feature.id)}
      className={cn(
        "group flex flex-col items-start justify-start border-l-2 py-1 pl-5 text-left transition-colors duration-500",
        isActive ? "border-primary" : "border-border"
      )}
    >
      <span
        className={cn(
          "block font-display text-lg font-medium transition-colors duration-300",
          isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
        )}
      >
        {feature.name}
      </span>
      <span className="mt-2 block text-[0.9375rem] leading-relaxed text-foreground-soft">
        {feature.summary}
      </span>
    </button>
  );
}
