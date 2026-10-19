import Image from "next/image";
import type { LaunchpadFeature } from "@/app/_lib/launchpad-showcase";

export function LaunchpadFeatureSlide({
  feature,
  isFirst,
}: {
  feature: LaunchpadFeature;
  isFirst: boolean;
}) {
  return (
    <article className="flex flex-1 flex-col border border-border bg-card">
      <div className="relative aspect-4/3 overflow-clip border-b border-border bg-surface">
        <Image
          src={feature.screenshot}
          alt={feature.screenshotAlt}
          fill
          draggable={false}
          quality={90}
          sizes="(max-width: 1023px) 90vw, 480px"
          priority={isFirst}
          className="object-cover"
          style={{ objectPosition: feature.mobileCropPosition }}
        />
      </div>
      <div className="flex-1 px-5 pt-4 pb-5">
        <h3 className="font-display text-lg font-medium text-foreground">{feature.name}</h3>
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-foreground-soft">
          {feature.summary}
        </p>
      </div>
    </article>
  );
}
