import type { MetadataRoute } from "next";
import { listIndexablePages } from "@/lib/indexable-pages";
import { absoluteUrl } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  return listIndexablePages().map((page) => ({
    url: absoluteUrl(page.path),
    lastModified: page.dates.updatedOn,
  }));
}
