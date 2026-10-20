import { SITE_URL, absoluteUrl } from "@/lib/site-config";

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const FOUNDER_ID = `${SITE_URL}/#founder`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export function webPageId(path: string) {
  return `${absoluteUrl(path)}#webpage`;
}

export function breadcrumbId(path: string) {
  return `${absoluteUrl(path)}#breadcrumb`;
}
