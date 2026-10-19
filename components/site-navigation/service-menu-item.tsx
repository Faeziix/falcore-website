"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ServiceBlueprint } from "@/components/service-blueprints/service-blueprint";
import type { Service } from "@/lib/data/services";
import { cn } from "@/lib/utils";
import { settleIntoPlaceVariants } from "./navigation-motion";

type ServiceMenuItemProps = {
  service: Service;
  isCurrentPage: boolean;
  onNavigate: () => void;
};

export function ServiceMenuItem({ service, isCurrentPage, onNavigate }: ServiceMenuItemProps) {
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);

  function startPreview() {
    setIsPreviewPlaying(true);
  }

  function startPreviewForMouse(event: React.PointerEvent) {
    if (event.pointerType === "mouse") startPreview();
  }

  return (
    <motion.li variants={settleIntoPlaceVariants}>
      <Link
        href={`/services/${service.slug}`}
        onClick={onNavigate}
        onPointerEnter={startPreviewForMouse}
        onPointerLeave={() => setIsPreviewPlaying(false)}
        onFocus={startPreview}
        onBlur={() => setIsPreviewPlaying(false)}
        aria-current={isCurrentPage ? "page" : undefined}
        className="group block focus-visible:outline-offset-4"
      >
        <div aria-hidden className="relative aspect-video bg-surface">
          <ServiceBlueprint slug={service.slug} label={service.blueprintLabel} isActive={isPreviewPlaying} />
        </div>
        <p
          className={cn(
            "mt-4 font-display text-lg font-medium underline-offset-[0.2em] decoration-1 group-hover:underline",
            isCurrentPage ? "text-accent" : "text-foreground"
          )}
        >
          {service.title}
        </p>
        <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-muted-foreground">
          {service.description}
        </p>
      </Link>
    </motion.li>
  );
}
