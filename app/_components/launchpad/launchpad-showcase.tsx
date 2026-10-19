"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { LAUNCHPAD_SHOWCASE } from "@/app/_lib/launchpad-showcase";
import { LaunchpadFeatureButton } from "./launchpad-feature-button";

export function LaunchpadShowcase() {
  const { features } = LAUNCHPAD_SHOWCASE;
  const [activeFeatureId, setActiveFeatureId] = useState(features[0].id);

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
      <div
        role="group"
        aria-label="Platform features"
        className="order-2 flex flex-col gap-7 lg:order-1 lg:col-span-4"
      >
        {features.map((feature) => (
          <LaunchpadFeatureButton
            key={feature.id}
            feature={feature}
            isActive={feature.id === activeFeatureId}
            onSelect={setActiveFeatureId}
          />
        ))}
      </div>

      <div
        id="launchpad-screenshot"
        className="relative order-1 aspect-video overflow-clip border border-border bg-surface lg:order-2 lg:col-span-8"
      >
        {features.map((feature) => {
          const isActive = feature.id === activeFeatureId;
          return (
            <Image
              key={feature.id}
              src={feature.screenshot}
              alt={isActive ? feature.screenshotAlt : ""}
              aria-hidden={!isActive}
              fill
              quality={90}
              sizes="(max-width: 1024px) 100vw, (max-width: 1400px) 66vw, 920px"
              className={cn(
                "object-cover object-top transition-opacity duration-700 ease-out-expo",
                isActive ? "opacity-100" : "opacity-0"
              )}
            />
          );
        })}
      </div>
    </div>
  );
}
