import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: "https://falcoretech.com",
      lastModified: now,
    },
    {
      url: "https://falcoretech.com/about",
      lastModified: now,
    },
    {
      url: "https://falcoretech.com/contact",
      lastModified: now,
    },
    {
      url: "https://falcoretech.com/services/web-design",
      lastModified: now,
    },
    {
      url: "https://falcoretech.com/services/custom-web-applications",
      lastModified: now,
    },
    {
      url: "https://falcoretech.com/services/ai-enablement",
      lastModified: now,
    },
    {
      url: "https://falcoretech.com/services/systems-automations",
      lastModified: now,
    },
    {
      url: "https://falcoretech.com/privacy",
      lastModified: new Date("2026-04-03"),
    },
  ];
}
