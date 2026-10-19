"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { ActiveLinkTick } from "./active-link-tick";
import { BookCallButton } from "@/components/book-call-button";
import {
  PAGE_NAVIGATION_LINKS,
  SERVICES_MENU_PANEL_ID,
  SERVICES_NAVIGATION_LABEL,
} from "./navigation-links";
import type { ActiveNavigationLink } from "./use-active-navigation-link";

const desktopItemClassName =
  "group/nav-item relative z-10 flex items-center gap-1.5 text-sm transition-[color,transform] duration-200 ease-out active:scale-[0.97]";
const underLabelPositionClassName = "inset-x-0 top-1/2 mt-3";

function itemToneClassName(isHighlighted: boolean) {
  return isHighlighted ? "text-foreground" : "text-muted-foreground hover:text-foreground";
}

function HoverUnderline({ isHeldOpen = false }: { isHeldOpen?: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute h-px origin-right bg-foreground-soft transition-transform duration-300 ease-out-expo",
        "group-hover/nav-item:origin-left group-hover/nav-item:scale-x-100",
        underLabelPositionClassName,
        isHeldOpen ? "origin-left scale-x-100" : "scale-x-0"
      )}
    />
  );
}

export type ServicesTriggerHandlers = {
  onPointerEnter: (event: React.PointerEvent) => void;
  onPointerDown: (event: React.PointerEvent) => void;
  onClick: () => void;
};

type DesktopNavigationProps = {
  activeNavigationLink: ActiveNavigationLink;
  isServicesMenuOpen: boolean;
  servicesTriggerRef: React.RefObject<HTMLButtonElement | null>;
  servicesTriggerHandlers: ServicesTriggerHandlers;
  onPageLinkPointerEnter: (event: React.PointerEvent) => void;
  onNavigate: () => void;
};

export function DesktopNavigation({
  activeNavigationLink: { activeLinkId, ariaCurrentValue },
  isServicesMenuOpen,
  servicesTriggerRef,
  servicesTriggerHandlers,
  onPageLinkPointerEnter,
  onNavigate,
}: DesktopNavigationProps) {
  const isServicesActive = activeLinkId === "services";

  return (
    <div className="hidden h-full items-center justify-between gap-10 md:flex lg:col-span-7 lg:col-start-6 lg:justify-end">
      <ul className="flex h-full items-stretch gap-8">
        <li onPointerEnter={servicesTriggerHandlers.onPointerEnter} className="relative flex">
          <button
            ref={servicesTriggerRef}
            type="button"
            aria-expanded={isServicesMenuOpen}
            aria-controls={SERVICES_MENU_PANEL_ID}
            onPointerDown={servicesTriggerHandlers.onPointerDown}
            onClick={servicesTriggerHandlers.onClick}
            className={cn(desktopItemClassName, itemToneClassName(isServicesActive || isServicesMenuOpen))}
          >
            {SERVICES_NAVIGATION_LABEL}
            <ChevronDown
              aria-hidden
              className={cn(
                "size-3.5 transition-transform duration-300 ease-out-expo",
                isServicesMenuOpen && "rotate-180"
              )}
            />
            {!isServicesActive && <HoverUnderline isHeldOpen={isServicesMenuOpen} />}
          </button>
          {isServicesActive && <ActiveLinkTick layoutGroup="desktop" className={underLabelPositionClassName} />}
        </li>

        {PAGE_NAVIGATION_LINKS.map((link) => {
          const isActive = activeLinkId === link.id;
          return (
            <li key={link.id} onPointerEnter={onPageLinkPointerEnter} className="relative flex">
              <Link
                href={link.href}
                onClick={onNavigate}
                aria-current={isActive ? ariaCurrentValue : undefined}
                className={cn(desktopItemClassName, itemToneClassName(isActive))}
              >
                {link.label}
                {!isActive && <HoverUnderline />}
              </Link>
              {isActive && <ActiveLinkTick layoutGroup="desktop" className={underLabelPositionClassName} />}
            </li>
          );
        })}
      </ul>

      <BookCallButton size="sm" />
    </div>
  );
}
