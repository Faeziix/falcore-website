export type LaunchpadFeature = {
  id: string;
  name: string;
  summary: string;
  screenshot: string;
  screenshotAlt: string;
};

export const LAUNCHPAD_SHOWCASE = {
  title: "A company operating system",
  summary:
    "One platform that runs a Dubai creative agency: CRM, project management, an AI studio and finance, all working from a shared knowledge base that AI agents act on.",
  features: [
    {
      id: "knowledge",
      name: "AI knowledge base",
      summary:
        "Calls, meetings, chats and client files become one memory. Ask it anything, or let AI agents act on it, with a source for every answer.",
      screenshot: "/work/company-os/knowledge-assistant.webp",
      screenshotAlt: "AI assistant answering a question with sources from meetings, chat rooms, onboarding and the client record",
    },
    {
      id: "studio",
      name: "AI studio",
      summary:
        "Images and video from 20-plus AI models in one place, with the spend tracked for every client.",
      screenshot: "/work/company-os/generate.webp",
      screenshotAlt: "AI studio showing a grid of generated images and videos (client names blurred)",
    },
    {
      id: "pipeline",
      name: "CRM",
      summary:
        "Leads from ads, websites and WhatsApp on one board, answered from one shared inbox.",
      screenshot: "/work/company-os/pipeline.webp",
      screenshotAlt: "CRM pipeline board with leads grouped by stage",
    },
    {
      id: "meetings",
      name: "Self-writing meeting notes",
      summary:
        "Calls are recorded and summarised, and the to-dos are filed to the right client.",
      screenshot: "/work/company-os/meetings.webp",
      screenshotAlt: "Meeting page with a summary and action items",
    },
  ] satisfies LaunchpadFeature[],
};
