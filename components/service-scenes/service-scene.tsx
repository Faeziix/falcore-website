"use client";

import type { ComponentType } from "react";
import { AiEnablementScene } from "./ai-enablement/ai-enablement-scene";
import { CustomWebApplicationsScene } from "./custom-web-applications/custom-web-applications-scene";
import { SystemsAutomationsScene } from "./systems-automations/systems-automations-scene";
import { WebDesignScene } from "./web-design/web-design-scene";

type ServiceSceneComponent = ComponentType<{ label: string; isActive?: boolean }>;

const SERVICE_SCENES: Record<string, ServiceSceneComponent> = {
  "ai-enablement": AiEnablementScene,
  "systems-automations": SystemsAutomationsScene,
  "web-design": WebDesignScene,
  "custom-web-applications": CustomWebApplicationsScene,
};

export function ServiceScene({ slug, label, isActive = true }: { slug: string; label: string; isActive?: boolean }) {
  const Scene = SERVICE_SCENES[slug];
  if (!Scene) return null;
  return (
    <div data-nosnippet className="contents">
      <Scene label={label} isActive={isActive} />
    </div>
  );
}
