export type LaunchpadFeature = {
  id: string;
  name: string;
  summary: string;
  screenshot: string;
  screenshotAlt: string;
};

export const LAUNCHPAD_SHOWCASE = {
  name: "XMA Launchpad",
  summary:
    "The system that runs a Dubai creative agency, from the first enquiry to the finished video.",
  features: [
    {
      id: "studio",
      name: "AI studio",
      summary:
        "Images and video from 20-plus AI models in one place, with the spend tracked for every client.",
      screenshot: "/work/launchpad/v3/generate.webp",
      screenshotAlt: "Launchpad studio showing a grid of generated images and videos (client names blurred)",
    },
    {
      id: "pipeline",
      name: "Sales pipeline",
      summary:
        "Leads from ads, websites and WhatsApp on one board, answered from one shared inbox.",
      screenshot: "/work/launchpad/v2/pipeline.webp",
      screenshotAlt: "Launchpad sales pipeline board with leads grouped by stage",
    },
    {
      id: "meetings",
      name: "Self-writing meeting notes",
      summary:
        "Calls are recorded and summarised, and the to-dos are filed to the right client.",
      screenshot: "/work/launchpad/v2/meetings.webp",
      screenshotAlt: "Launchpad meeting page with a summary and action items",
    },
    {
      id: "knowledge",
      name: "Company knowledge base",
      summary:
        "Everything the agency has learned, kept as one memory the whole team can ask questions of.",
      screenshot: "/work/launchpad/v3/knowledge.webp",
      screenshotAlt: "Launchpad company knowledge base",
    },
  ] satisfies LaunchpadFeature[],
};
