import type { CaseStudyImage } from "@/app/work/_lib/case-study-types";
import {
  assistantApprovalCardsImage,
  clientApprovalRoundImage,
  meetingActionItemsNarrowImage,
  meetingNotesImage,
  projectBoardImage,
  projectBoardNarrowImage,
  projectGanttImage,
  projectGanttNarrowImage,
  projectTimelineImage,
  projectTimelineNarrowImage,
  sharedWhatsAppInboxImage,
  sharedWhatsAppInboxNarrowImage,
  studioDirectorImage,
  studioDirectorNarrowImage,
} from "./case-study-images";

export type ChapterCopy = {
  id: string;
  title: string;
  intro: string;
};

export type ArtDirectedImage = {
  image: CaseStudyImage;
  narrowImage?: CaseStudyImage;
};

export type ScreenshotChapterContent = ChapterCopy & ArtDirectedImage;

export type ProjectView = ArtDirectedImage & {
  id: string;
  label: string;
};

export const sourceTraceChapter: ChapterCopy = {
  id: "one-question-every-source",
  title: "One question, every source",
  intro:
    "Anyone on the team can ask about a client in plain words. The answer shows where each fact came from, and leaves out what they aren't allowed to see.",
};

export const approvalChapter: ScreenshotChapterContent = {
  id: "ai-that-asks-first",
  title: "AI that does the work, and asks first",
  intro:
    "The assistant reads freely, then puts every change it wants to make on a card you approve or deny. It can take more than 140 actions across the system, but only the ones the person asking is allowed to.",
  image: assistantApprovalCardsImage,
};

export const projectViewsChapter: ChapterCopy = {
  id: "every-project-three-ways",
  title: "Every project, three ways",
  intro:
    "The same project as a timeline, a Gantt chart or a board. I built it to work like Asana, down to dependencies and milestones.",
};

export const projectViews: ProjectView[] = [
  {
    id: "timeline",
    label: "Timeline",
    image: projectTimelineImage,
    narrowImage: projectTimelineNarrowImage,
  },
  { id: "gantt", label: "Gantt", image: projectGanttImage, narrowImage: projectGanttNarrowImage },
  { id: "board", label: "Board", image: projectBoardImage, narrowImage: projectBoardNarrowImage },
];

export const meetingsChapter: ScreenshotChapterContent = {
  id: "meetings-that-file-their-own-to-dos",
  title: "Meetings that file their own to-dos",
  intro:
    "Every recorded call becomes a summary, decisions and action items with owners, and is matched to its client automatically.",
  image: meetingNotesImage,
  narrowImage: meetingActionItemsNarrowImage,
};

export const inboxChapter: ScreenshotChapterContent = {
  id: "sales-and-whatsapp-in-one-inbox",
  title: "Sales and WhatsApp in one inbox",
  intro:
    "The company's WhatsApp number is a shared inbox for the whole sales team. A message from a new number becomes a lead on its own.",
  image: sharedWhatsAppInboxImage,
  narrowImage: sharedWhatsAppInboxNarrowImage,
};

export const studioChapter: ChapterCopy & {
  director: ArtDirectedImage;
  clientRoundImage: CaseStudyImage;
} = {
  id: "a-film-studio-with-a-director",
  title: "A film studio with a director you can talk to",
  intro:
    "Producers ask the director for changes in plain words, and it edits the shot list with one undo for all of it. Then the client approves the shot list one shot at a time.",
  director: { image: studioDirectorImage, narrowImage: studioDirectorNarrowImage },
  clientRoundImage: clientApprovalRoundImage,
};
