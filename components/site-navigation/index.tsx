"use client";

import { useCallback, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { LayoutGroup } from "motion/react";
import Logo from "@/components/logo";
import { cn } from "@/lib/utils";
import { DesktopNavigation } from "./desktop-navigation";
import { MobileMenuToggle } from "./mobile-menu-toggle";
import { MobileNavigationSheet } from "./mobile-navigation-sheet";
import { ServicesMenuPanel } from "./services-menu-panel";
import { useActiveNavigationLink } from "./use-active-navigation-link";
import { isMousePointer, useMenuHover, type MenuTriggerHandlers } from "./use-menu-hover";
import { WorkMenuPanel } from "./work-menu-panel";
import {
  useDismissibleLayer,
  useDocumentScrollLock,
  useScrollDrivenBarState,
} from "./use-navigation-chrome-state";

type OpenMenu = "services" | "work" | "mobile" | null;
type DropdownMenu = "services" | "work";

type NavigationBarSurface = "transparentAtTop" | "solid";

function navigationBarSurfaceClassName(
  surface: NavigationBarSurface,
  isMenuOpen: boolean,
  hasScrolled: boolean
) {
  if (isMenuOpen || surface === "solid") return "border-border bg-background";
  if (hasScrolled) return "border-border bg-background/85 backdrop-blur-md";
  return "border-transparent bg-transparent";
}

export function SiteNavigation({ surface = "transparentAtTop" }: { surface?: NavigationBarSurface }) {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<OpenMenu>(null);
  const [pathnameWhenMenuStateSet, setPathnameWhenMenuStateSet] = useState(pathname);
  const headerRef = useRef<HTMLElement>(null);
  const servicesTriggerRef = useRef<HTMLButtonElement>(null);
  const workTriggerRef = useRef<HTMLButtonElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);

  const { hasScrolled } = useScrollDrivenBarState();
  const activeNavigationLink = useActiveNavigationLink();

  if (pathname !== pathnameWhenMenuStateSet) {
    setPathnameWhenMenuStateSet(pathname);
    setOpenMenu(null);
  }

  const closeMenus = useCallback(() => setOpenMenu(null), []);
  const toggleMenu = (menu: Exclude<OpenMenu, null>) =>
    setOpenMenu((currentMenu) => (currentMenu === menu ? null : menu));

  const closeDropdownMenu = (menu: DropdownMenu) =>
    setOpenMenu((currentMenu) => (currentMenu === menu ? null : currentMenu));

  const servicesMenuHover = useMenuHover({
    openMenu: () => setOpenMenu("services"),
    closeMenu: () => closeDropdownMenu("services"),
    toggleMenu: () => toggleMenu("services"),
  });
  const workMenuHover = useMenuHover({
    openMenu: () => setOpenMenu("work"),
    closeMenu: () => closeDropdownMenu("work"),
    toggleMenu: () => toggleMenu("work"),
  });

  function triggerHandlersCancellingOtherMenu(
    triggerHandlers: MenuTriggerHandlers,
    otherMenuHover: ReturnType<typeof useMenuHover>
  ): MenuTriggerHandlers {
    return {
      ...triggerHandlers,
      onPointerEnter: (event) => {
        if (isMousePointer(event)) otherMenuHover.cancelPending();
        triggerHandlers.onPointerEnter(event);
      },
    };
  }

  const headerPointerHandlers = {
    onPointerEnter: (event: React.PointerEvent) => {
      if (!isMousePointer(event)) return;
      servicesMenuHover.cancelPending();
      workMenuHover.cancelPending();
    },
    onPointerLeave: (event: React.PointerEvent) => {
      if (!isMousePointer(event)) return;
      servicesMenuHover.closeAfterPointerLeaves();
      workMenuHover.closeAfterPointerLeaves();
    },
  };

  function closeDropdownMenusWhenPageLinkHovered(event: React.PointerEvent) {
    if (!isMousePointer(event)) return;
    servicesMenuHover.closeNow();
    workMenuHover.closeNow();
  }

  const triggerRefForOpenMenu =
    openMenu === "mobile" ? mobileToggleRef : openMenu === "work" ? workTriggerRef : servicesTriggerRef;

  useDocumentScrollLock(openMenu === "mobile");
  useDismissibleLayer({
    isOpen: openMenu !== null,
    layerRef: headerRef,
    triggerRef: triggerRefForOpenMenu,
    onDismiss: closeMenus,
  });

  return (
    <LayoutGroup>
      <header
        ref={headerRef}
        {...headerPointerHandlers}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={cn(
            "border-b transition-[background-color,border-color] duration-300",
            navigationBarSurfaceClassName(surface, openMenu !== null, hasScrolled)
          )}
        >
          <nav
            aria-label="Main"
            className="page-container flex h-(--nav-height) items-center justify-between lg:grid lg:grid-cols-12 lg:gap-8"
          >
            <Logo size="lg" className="-ml-2 lg:col-span-3" />
            <DesktopNavigation
              activeNavigationLink={activeNavigationLink}
              servicesMenu={{
                isOpen: openMenu === "services",
                triggerRef: servicesTriggerRef,
                triggerHandlers: triggerHandlersCancellingOtherMenu(
                  servicesMenuHover.triggerHandlers,
                  workMenuHover
                ),
              }}
              workMenu={{
                isOpen: openMenu === "work",
                triggerRef: workTriggerRef,
                triggerHandlers: triggerHandlersCancellingOtherMenu(
                  workMenuHover.triggerHandlers,
                  servicesMenuHover
                ),
              }}
              onPageLinkPointerEnter={closeDropdownMenusWhenPageLinkHovered}
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
        <WorkMenuPanel isOpen={openMenu === "work"} onNavigate={closeMenus} />
        <MobileNavigationSheet
          isOpen={openMenu === "mobile"}
          activeNavigationLink={activeNavigationLink}
          onNavigate={closeMenus}
        />
      </header>
    </LayoutGroup>
  );
}
