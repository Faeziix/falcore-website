import type { MetadataRoute } from "next";
import { ANSWER_ENGINE_CRAWLERS, BLOCKED_CRAWLERS, MODEL_TRAINING_CRAWLERS_ALLOWED } from "@/lib/ai-crawlers";
import { SITE_URL } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...[...ANSWER_ENGINE_CRAWLERS, ...MODEL_TRAINING_CRAWLERS_ALLOWED].map((userAgent) => ({
        userAgent,
        allow: "/",
      })),
      ...BLOCKED_CRAWLERS.map((userAgent) => ({ userAgent, disallow: "/" })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
