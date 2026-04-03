import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://falcoretech.com",
      lastModified: new Date("2026-04-03"),
    },
    {
      url: "https://falcoretech.com/privacy",
      lastModified: new Date("2026-04-03"),
    },
  ];
}
