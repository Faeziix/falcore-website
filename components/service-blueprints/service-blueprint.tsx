"use client";

import type { ComponentType } from "react";
import { AiEnablementBlueprint } from "./ai-enablement/ai-enablement-blueprint";
import { FULL_SHEET_FRAMING, type BlueprintFraming } from "./blueprint-canvas";
import { CustomWebApplicationsBlueprint } from "./custom-web-applications/custom-web-applications-blueprint";
import { SystemsAutomationsBlueprint } from "./systems-automations/systems-automations-blueprint";
import { WebDesignBlueprint } from "./web-design/web-design-blueprint";

type ServiceBlueprintScene = ComponentType<{ framing: BlueprintFraming; label: string; isActive?: boolean }>;

const SERVICE_BLUEPRINT_SCENES: Record<string, ServiceBlueprintScene> = {
  "ai-enablement": AiEnablementBlueprint,
  "systems-automations": SystemsAutomationsBlueprint,
  "web-design": WebDesignBlueprint,
  "custom-web-applications": CustomWebApplicationsBlueprint,
};

type ServiceBlueprintProps = {
  slug: string;
  label: string;
  isActive?: boolean;
};

export function ServiceBlueprint({ slug, label, isActive = true }: ServiceBlueprintProps) {
  const Scene = SERVICE_BLUEPRINT_SCENES[slug];
  if (!Scene) return null;
  return <Scene framing={FULL_SHEET_FRAMING} label={label} isActive={isActive} />;
}
