export type NavigationLinkId = "services" | "work" | "about" | "contact";

export type NavigationLink = {
  id: NavigationLinkId;
  label: string;
  href: string;
};

export const SERVICES_NAVIGATION_LABEL = "Services";

export const PAGE_NAVIGATION_LINKS: NavigationLink[] = [
  { id: "work", label: "Work", href: "/#launchpad" },
  { id: "about", label: "About", href: "/about" },
  { id: "contact", label: "Contact", href: "/contact" },
];

export const NAVIGATION_LINK_BY_HOME_SECTION_ID: Record<string, NavigationLinkId> = {
  services: "services",
  launchpad: "work",
  work: "work",
};

const NAVIGATION_LINK_BY_ROUTE_PREFIX: [string, NavigationLinkId][] = [
  ["/services", "services"],
  ["/about", "about"],
  ["/contact", "contact"],
];

export function findNavigationLinkForPathname(pathname: string): NavigationLinkId | null {
  const matchingRoute = NAVIGATION_LINK_BY_ROUTE_PREFIX.find(([routePrefix]) =>
    pathname.startsWith(routePrefix)
  );
  return matchingRoute ? matchingRoute[1] : null;
}

export const SERVICES_MENU_PANEL_ID = "services-menu-panel";
export const MOBILE_NAVIGATION_SHEET_ID = "mobile-navigation-sheet";
