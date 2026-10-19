import type { CaseStudyImage } from "@/app/work/_lib/case-study-types";

const FULL_CAPTURE_SIZE = { width: 3200, height: 1800 };

export const clientKnowledgeRecordImage: CaseStudyImage = {
  src: "/work/company-operating-system/client-knowledge-record-clean-edge.webp",
  alt: "A demo client's knowledge record for Northline Dental: brand facts each marked confirmed by a teammate with a date and a history link, tabs for review, learnings and sources, and the client's active projects in a side rail.",
  width: 3200,
  height: 1734,
};

export const knowledgeAssistantAnswerImage: CaseStudyImage = {
  src: "/work/company-os/knowledge-assistant.webp",
  alt: "The assistant answering where a demo client's December campaign stands, with the search steps it took, an answer in five points and six numbered sources from a meeting, a chat room, onboarding answers, brand rules, WhatsApp and a PDF.",
  ...FULL_CAPTURE_SIZE,
};

export const assistantApprovalCardsImage: CaseStudyImage = {
  src: "/work/company-operating-system/assistant-approval-cards-crop.webp",
  alt: "The assistant asked to turn yesterday's sales call into tasks: it reads the meeting, transcript and lead, then lists five new tasks and one lead move, each on its own card with Approve and Deny buttons.",
  width: 1600,
  height: 1680,
};

export const projectTimelineImage: CaseStudyImage = {
  src: "/work/company-os/v2/project-timeline.webp",
  alt: "A demo December campaign project on a timeline: task bars across six weeks in four sections, from scripting to delivery, chained by dependency arrows, with a today line and a client sign-off milestone.",
  ...FULL_CAPTURE_SIZE,
};

export const projectGanttImage: CaseStudyImage = {
  src: "/work/company-os/v2/project-gantt.webp",
  alt: "The same project as a Gantt chart: a table of tasks with start dates, due dates and the tasks blocking them, beside bars coloured by section with dependency lines.",
  ...FULL_CAPTURE_SIZE,
};

export const projectBoardImage: CaseStudyImage = {
  src: "/work/company-os/v2/project-board.webp",
  alt: "The same project as a board: four columns from planning to editing and delivery, with task cards showing owners, due dates, subtask counts and finished tasks struck through.",
  ...FULL_CAPTURE_SIZE,
};

export const meetingNotesImage: CaseStudyImage = {
  src: "/work/company-operating-system/meeting-notes-and-action-items-crop.webp",
  alt: "Notes written from a demo client call: a summary, key points, decisions and next steps, then a list of action items, each with an owner.",
  width: 1968,
  height: 1704,
};

export const sharedWhatsAppInboxImage: CaseStudyImage = {
  src: "/work/company-os/v2/whatsapp-inbox.webp",
  alt: "A shared WhatsApp inbox with demo leads: a list of conversations tagged by sales stage, an open thread with read ticks, a photo and a voice note, and a side panel with the lead's stage, owner and quick actions.",
  ...FULL_CAPTURE_SIZE,
};

export const studioDirectorImage: CaseStudyImage = {
  src: "/work/company-operating-system/studio-director-clean-edge.webp",
  alt: "A demo skincare video brief in the studio: a strip of twelve shots with ten stills made so far and the shot script, beside the director chat after it changed three shots on request, offering to undo all three.",
  width: 3200,
  height: 1712,
};

export const clientApprovalRoundImage: CaseStudyImage = {
  src: "/work/company-operating-system/studio-client-approval-round-crop.webp",
  alt: "What the client sees when reviewing the same video's shot list: a tally of approved, changed and waiting shots, and shot cards with the preview still, voiceover and on-screen text, each with Approve, Request changes and Comment.",
  width: 2100,
  height: 1008,
};

const NARROW_PROJECT_CROP_SIZE = { width: 1928, height: 1704 };

export const clientKnowledgeRecordNarrowImage: CaseStudyImage = {
  src: "/work/company-operating-system/client-knowledge-record-narrow-clean-edge.webp",
  alt: clientKnowledgeRecordImage.alt,
  width: 1752,
  height: 1672,
};

export const sharedWhatsAppInboxNarrowImage: CaseStudyImage = {
  src: "/work/company-operating-system/whatsapp-thread-narrow-clean-top.webp",
  alt: "An open WhatsApp thread with a demo lead inside the shared inbox: messages with read ticks, a reaction, a photo of the room to film in and a voice note.",
  width: 1752,
  height: 1674,
};

export const studioDirectorNarrowImage: CaseStudyImage = {
  src: "/work/company-operating-system/studio-director-chat-narrow.webp",
  alt: "The studio director chat: a producer asks for two warmer morning shots and a shorter shelf shot, and the director reports the three changes it made, with one button to undo all three.",
  width: 776,
  height: 1200,
};

export const projectTimelineNarrowImage: CaseStudyImage = {
  src: "/work/company-operating-system/project-timeline-narrow.webp",
  alt: projectTimelineImage.alt,
  ...NARROW_PROJECT_CROP_SIZE,
};

export const projectGanttNarrowImage: CaseStudyImage = {
  src: "/work/company-operating-system/project-gantt-narrow.webp",
  alt: projectGanttImage.alt,
  ...NARROW_PROJECT_CROP_SIZE,
};

export const projectBoardNarrowImage: CaseStudyImage = {
  src: "/work/company-operating-system/project-board-narrow.webp",
  alt: projectBoardImage.alt,
  ...NARROW_PROJECT_CROP_SIZE,
};

export const meetingActionItemsNarrowImage: CaseStudyImage = {
  src: "/work/company-operating-system/meeting-action-items-narrow.webp",
  alt: "Action items written from a demo client call, each with an owner: scripts to write, a shot list to build, consent forms to collect, a campaign brief and a room to book.",
  width: 1020,
  height: 599,
};
