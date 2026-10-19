"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { SERVICES } from "@/lib/data/services";
import { SERVICES_MENU_PANEL_ID } from "./navigation-links";
import { revealFromBarVariants } from "./navigation-motion";
import { ServiceMenuItem } from "./service-menu-item";

export function ServicesMenuPanel({ isOpen, onNavigate }: { isOpen: boolean; onNavigate: () => void }) {
  const pathname = usePathname();
  const panelVariants = revealFromBarVariants({
    revealSeconds: 0.24,
    exitSeconds: 0.15,
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id={SERVICES_MENU_PANEL_ID}
          variants={panelVariants}
          initial="hidden"
          animate="shown"
          exit="exit"
          className="absolute inset-x-0 top-full hidden border-b border-border bg-background md:block"
        >
          <ul className="page-container grid grid-cols-2 gap-x-8 gap-y-10 py-10 lg:grid-cols-4">
            {SERVICES.map((service) => (
              <ServiceMenuItem
                key={service.slug}
                service={service}
                isCurrentPage={pathname === `/services/${service.slug}`}
                onNavigate={onNavigate}
              />
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
