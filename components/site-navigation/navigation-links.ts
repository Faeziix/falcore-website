export type NavigationLinkId = "services" | "work" | "about" | "contact";

export type NavigationLink = {
  id: NavigationLinkId;
  label: string;
  href: string;
};

export const SERVICES_NAVIGATION_LABEL = "Services";
export const WORK_NAVIGATION_LABEL = "Work";
export const WORK_INDEX_LINK = { label: "All work", href: "/work" };

export const PAGE_NAVIGATION_LINKS: NavigationLink[] = [
  { id: "about", label: "About", href: "/about" },
  { id: "contact", label: "Contact", href: "/contact" },
];

export const NAVIGATION_LINK_BY_HOME_SECTION_ID: Record<string, NavigationLinkId> = {
  services: "services",
  "operating-system": "work",
  work: "work",
};

const NAVIGATION_LINK_BY_ROUTE_PREFIX: [string, NavigationLinkId][] = [
  ["/services", "services"],
  ["/work", "work"],
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
export const WORK_MENU_PANEL_ID = "work-menu-panel";
export const MOBILE_NAVIGATION_SHEET_ID = "mobile-navigation-sheet";
