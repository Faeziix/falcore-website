import type { ArtDirectedImage } from "./art-direction";
import {
  assistantApprovalCardsImage,
  assistantApprovalCardsPhoneImage,
  clientApprovalRoundImage,
  clientApprovalRoundPhoneImage,
  meetingActionItemsNarrowImage,
  meetingNotesImage,
  projectBoardImage,
  projectBoardNarrowImage,
  projectBoardPhoneImage,
  projectGanttImage,
  projectGanttNarrowImage,
  projectGanttPhoneImage,
  projectTimelineImage,
  projectTimelineNarrowImage,
  projectTimelinePhoneImage,
  sharedWhatsAppInboxImage,
  sharedWhatsAppInboxNarrowImage,
  sharedWhatsAppThreadPhoneImage,
  studioDirectorImage,
  studioDirectorNarrowImage,
  studioDirectorTabletImage,
} from "./case-study-images";

export type ChapterCopy = {
  id: string;
  title: string;
  intro: string;
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
  phoneImage: assistantApprovalCardsPhoneImage,
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
    tabletImage: projectTimelineNarrowImage,
    phoneImage: projectTimelinePhoneImage,
  },
  {
    id: "gantt",
    label: "Gantt",
    image: projectGanttImage,
    tabletImage: projectGanttNarrowImage,
    phoneImage: projectGanttPhoneImage,
  },
  {
    id: "board",
    label: "Board",
    image: projectBoardImage,
    tabletImage: projectBoardNarrowImage,
    phoneImage: projectBoardPhoneImage,
  },
];

export const meetingsChapter: ScreenshotChapterContent = {
  id: "meetings-that-file-their-own-to-dos",
  title: "Meetings that file their own to-dos",
  intro:
    "Every recorded call becomes a summary, decisions and action items with owners, and is matched to its client automatically.",
  image: meetingNotesImage,
  phoneImage: meetingActionItemsNarrowImage,
};

export const inboxChapter: ScreenshotChapterContent = {
  id: "sales-and-whatsapp-in-one-inbox",
  title: "Sales and WhatsApp in one inbox",
  intro:
    "The company's WhatsApp number is a shared inbox for the whole sales team. A message from a new number becomes a lead on its own.",
  image: sharedWhatsAppInboxImage,
  tabletImage: sharedWhatsAppInboxNarrowImage,
  phoneImage: sharedWhatsAppThreadPhoneImage,
};

export const studioChapter: ChapterCopy & {
  director: ArtDirectedImage;
  clientRound: ArtDirectedImage;
} = {
  id: "a-film-studio-with-a-director",
  title: "A film studio with a director you can talk to",
  intro:
    "Producers ask the director for changes in plain words, and it edits the shot list with one undo for all of it. Then the client approves the shot list one shot at a time.",
  director: {
    image: studioDirectorImage,
    tabletImage: studioDirectorTabletImage,
    phoneImage: studioDirectorNarrowImage,
  },
  clientRound: { image: clientApprovalRoundImage, phoneImage: clientApprovalRoundPhoneImage },
};
