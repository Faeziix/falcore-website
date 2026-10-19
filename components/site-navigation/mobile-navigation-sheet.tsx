"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { TextLink } from "@/components/ui/text-link";
import { SERVICES } from "@/lib/data/services";
import { CONTACT_EMAIL } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { ActiveLinkTick } from "./active-link-tick";
import { BookCallButton } from "@/components/book-call-button";
import {
  MOBILE_NAVIGATION_SHEET_ID,
  PAGE_NAVIGATION_LINKS,
  SERVICES_NAVIGATION_LABEL,
} from "./navigation-links";
import { easeOutExpo, revealFromBarVariants, settleIntoPlaceVariants } from "./navigation-motion";
import type { ActiveNavigationLink } from "./use-active-navigation-link";

const MOBILE_SERVICES_LIST_ID = "mobile-navigation-services";
const mobileRowClassName =
  "flex w-full items-center justify-between py-5 font-display text-display-sm font-medium";

const servicesListExpandTransition = { duration: 0.25, ease: easeOutExpo };

function MobileServicesDisclosure({ isActive, onNavigate }: { isActive: boolean; onNavigate: () => void }) {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(isActive);

  return (
    <motion.li variants={settleIntoPlaceVariants} className="relative border-b border-border">
      <button
        type="button"
        autoFocus
        aria-expanded={isExpanded}
        aria-controls={MOBILE_SERVICES_LIST_ID}
        onClick={() => setIsExpanded((wasExpanded) => !wasExpanded)}
        className={cn(mobileRowClassName, isActive ? "text-foreground" : "text-foreground-soft")}
      >
        {SERVICES_NAVIGATION_LABEL}
        <ChevronDown
          aria-hidden
          className={cn(
            "size-5 text-muted-foreground transition-transform duration-300 ease-out-expo motion-reduce:transition-none",
            isExpanded && "rotate-180"
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            id={MOBILE_SERVICES_LIST_ID}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0, transition: { duration: 0.18, ease: "easeOut" } }}
            transition={servicesListExpandTransition}
            className="overflow-clip"
          >
            <ul className="flex flex-col pb-5">
            {SERVICES.map((service) => {
              const servicePath = `/services/${service.slug}`;
              const isCurrentPage = pathname === servicePath;
              return (
                <li key={service.slug}>
                  <Link
                    href={servicePath}
                    onClick={onNavigate}
                    aria-current={isCurrentPage ? "page" : undefined}
                    className={cn(
                      "block py-2.5 text-lg",
                      isCurrentPage ? "text-accent" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {service.title}
                  </Link>
                </li>
              );
            })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      {isActive && <ActiveLinkTick layoutGroup="mobile" className="-bottom-px left-0 w-12" />}
    </motion.li>
  );
}

type MobileNavigationSheetProps = {
  isOpen: boolean;
  activeNavigationLink: ActiveNavigationLink;
  onNavigate: () => void;
};

export function MobileNavigationSheet({
  isOpen,
  activeNavigationLink: { activeLinkId, ariaCurrentValue },
  onNavigate,
}: MobileNavigationSheetProps) {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const sheetVariants = revealFromBarVariants({
    revealSeconds: 0.3,
    exitSeconds: 0.18,
    prefersReducedMotion,
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id={MOBILE_NAVIGATION_SHEET_ID}
          variants={sheetVariants}
          initial="hidden"
          animate="shown"
          exit="exit"
          className="fixed inset-x-0 top-(--nav-height) bottom-0 z-40 flex flex-col overflow-y-auto overscroll-contain bg-background md:hidden"
        >
          <nav
            aria-label="Menu"
            className="page-container flex flex-1 flex-col pt-2 pb-[max(1.5rem,env(safe-area-inset-bottom))]"
          >
            <ul className="flex flex-col">
              <MobileServicesDisclosure isActive={activeLinkId === "services"} onNavigate={onNavigate} />
              {PAGE_NAVIGATION_LINKS.map((link) => {
                const isActive = activeLinkId === link.id;
                return (
                  <motion.li
                    key={link.id}
                    variants={settleIntoPlaceVariants}
                    className="relative border-b border-border"
                  >
                    <Link
                      href={link.href}
                      onClick={onNavigate}
                      aria-current={isActive ? ariaCurrentValue : undefined}
                      className={cn(mobileRowClassName, isActive ? "text-foreground" : "text-foreground-soft")}
                    >
                      {link.label}
                    </Link>
                    {isActive && <ActiveLinkTick layoutGroup="mobile" className="-bottom-px left-0 w-12" />}
                  </motion.li>
                );
              })}
            </ul>

            <motion.div variants={settleIntoPlaceVariants} className="mt-auto flex flex-col gap-5 pt-12">
              <BookCallButton size="lg" width="full" />
              <TextLink href={`mailto:${CONTACT_EMAIL}`} size="sm" className="self-start">
                {CONTACT_EMAIL}
              </TextLink>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
