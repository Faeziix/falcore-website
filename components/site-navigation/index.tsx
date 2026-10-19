"use client";

import { useCallback, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { LayoutGroup, MotionConfig } from "motion/react";
import Logo from "@/components/logo";
import { cn } from "@/lib/utils";
import { DesktopNavigation } from "./desktop-navigation";
import { MobileMenuToggle } from "./mobile-menu-toggle";
import { MobileNavigationSheet } from "./mobile-navigation-sheet";
import { ServicesMenuPanel } from "./services-menu-panel";
import { useActiveNavigationLink } from "./use-active-navigation-link";
import { useServicesMenuHover } from "./use-services-menu-hover";
import {
  useDismissibleLayer,
  useDocumentScrollLock,
  useScrollDrivenBarState,
} from "./use-navigation-chrome-state";

type OpenMenu = "services" | "mobile" | null;

function navigationBarSurfaceClassName(isMenuOpen: boolean, hasScrolled: boolean) {
  if (isMenuOpen) return "border-border bg-background";
  if (hasScrolled) return "border-border bg-background/85 backdrop-blur-md";
  return "border-transparent bg-transparent";
}

export function SiteNavigation() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<OpenMenu>(null);
  const [pathnameWhenMenuStateSet, setPathnameWhenMenuStateSet] = useState(pathname);
  const headerRef = useRef<HTMLElement>(null);
  const servicesTriggerRef = useRef<HTMLButtonElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);

  const { hasScrolled, isHiddenByScroll } = useScrollDrivenBarState();
  const activeNavigationLink = useActiveNavigationLink();

  if (pathname !== pathnameWhenMenuStateSet) {
    setPathnameWhenMenuStateSet(pathname);
    setOpenMenu(null);
  }

  const closeMenus = useCallback(() => setOpenMenu(null), []);
  const toggleMenu = (menu: Exclude<OpenMenu, null>) =>
    setOpenMenu((currentMenu) => (currentMenu === menu ? null : menu));

  const { servicesTriggerHandlers, closeServicesWhenPageLinkHovered, headerPointerHandlers } =
    useServicesMenuHover({
      openServicesMenu: () => setOpenMenu("services"),
      closeServicesMenu: () => setOpenMenu((currentMenu) => (currentMenu === "services" ? null : currentMenu)),
      toggleServicesMenu: () => toggleMenu("services"),
    });

  useDocumentScrollLock(openMenu === "mobile");
  useDismissibleLayer({
    isOpen: openMenu !== null,
    layerRef: headerRef,
    triggerRef: openMenu === "mobile" ? mobileToggleRef : servicesTriggerRef,
    onDismiss: closeMenus,
  });

  return (
    <MotionConfig reducedMotion="user">
      <LayoutGroup>
        <header
          ref={headerRef}
          {...headerPointerHandlers}
          data-hidden-by-scroll={isHiddenByScroll && openMenu === null}
          className="fixed inset-x-0 top-0 z-50 transition-transform duration-300 ease-out-expo motion-reduce:transition-none data-[hidden-by-scroll=true]:not-has-focus-visible:-translate-y-full"
        >
          <div
            className={cn(
              "border-b transition-[background-color,border-color] duration-300",
              navigationBarSurfaceClassName(openMenu !== null, hasScrolled)
            )}
          >
            <nav
              aria-label="Main"
              className="page-container flex h-(--nav-height) items-center justify-between lg:grid lg:grid-cols-12 lg:gap-8"
            >
              <Logo size="lg" className="-ml-2 lg:col-span-3" />
              <DesktopNavigation
                activeNavigationLink={activeNavigationLink}
                isServicesMenuOpen={openMenu === "services"}
                servicesTriggerRef={servicesTriggerRef}
                servicesTriggerHandlers={servicesTriggerHandlers}
                onPageLinkPointerEnter={closeServicesWhenPageLinkHovered}
                onNavigate={closeMenus}
              />
              <MobileMenuToggle
                isOpen={openMenu === "mobile"}
                onToggle={() => toggleMenu("mobile")}
                toggleRef={mobileToggleRef}
              />
            </nav>
          </div>

          <ServicesMenuPanel isOpen={openMenu === "services"} onNavigate={closeMenus} />
          <MobileNavigationSheet
            isOpen={openMenu === "mobile"}
            activeNavigationLink={activeNavigationLink}
            onNavigate={closeMenus}
          />
        </header>
      </LayoutGroup>
    </MotionConfig>
  );
}
