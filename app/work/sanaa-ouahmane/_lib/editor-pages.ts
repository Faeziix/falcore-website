export type EditorSection = {
  title: string;
  isSwitchedOn: boolean;
};

export type EditorPage = {
  title: string;
  path: string;
  sections: EditorSection[];
};

function switchedOn(title: string): EditorSection {
  return { title, isSwitchedOn: true };
}

function switchedOff(title: string): EditorSection {
  return { title, isSwitchedOn: false };
}

export const editorPages: EditorPage[] = [
  {
    title: "Home",
    path: "/",
    sections: [
      switchedOn("Hero"),
      switchedOn("Featured in"),
      switchedOn("About me"),
      switchedOn("Launch film"),
      switchedOn("The book"),
      switchedOn("Advance praise"),
      switchedOn("Statement plate"),
      switchedOn("Closing ask"),
      switchedOff("Podcast"),
      switchedOn("Find me on"),
    ],
  },
  {
    title: "Manifesto",
    path: "/manifesto",
    sections: [
      switchedOn("Epigraph"),
      switchedOn("The excerpt"),
      switchedOn("Film"),
      switchedOff("The essay"),
      switchedOff("Join the list"),
      switchedOn("Order your copy"),
    ],
  },
  {
    title: "The Book",
    path: "/book",
    sections: [
      switchedOn("Book hero"),
      switchedOn("About the book"),
      switchedOn("Why read it"),
      switchedOn("Pull quote"),
      switchedOff("About the author"),
      switchedOn("Advance praise"),
      switchedOn("Questions"),
      switchedOff("Join the list"),
      switchedOn("Order your copy"),
      switchedOff("What you get"),
    ],
  },
  {
    title: "About",
    path: "/about",
    sections: [
      switchedOn("Page hero"),
      switchedOn("Her story"),
      switchedOn("Recognitions"),
      switchedOff("In her words"),
      switchedOff("Speaking"),
      switchedOn("Audience quote"),
      switchedOff("Join the list"),
      switchedOn("Order your copy"),
    ],
  },
  {
    title: "Contact",
    path: "/contact",
    sections: [
      switchedOn("Page hero"),
      switchedOn("Enquiry form"),
      switchedOff("Reading hand-off"),
      switchedOn("Find me on"),
    ],
  },
];

export const editorDiagramCaption =
  "Her five pages and their sections in the order her editor lists them, with plain names. Sections switched off stay built and can be turned back on.";
