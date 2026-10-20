import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";

const ANSWER_ENGINE_CRAWLERS = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Applebot",
];

const MODEL_TRAINING_CRAWLERS_ALLOWED = ["GPTBot", "ClaudeBot", "Google-Extended", "Applebot-Extended"];

const BLOCKED_CRAWLERS = ["CCBot"];

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
