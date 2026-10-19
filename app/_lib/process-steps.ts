export type ProcessStepIconName =
  | "scopingCall"
  | "writtenPlan"
  | "build"
  | "launch"
  | "support";

export type ProcessStep = {
  title: string;
  description: string;
  iconName: ProcessStepIconName;
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    title: "Scoping call",
    description: "Thirty minutes on what’s slowing you down. Free.",
    iconName: "scopingCall",
  },
  {
    title: "Written plan",
    description: "Scope, timeline and cost, agreed before any work starts.",
    iconName: "writtenPlan",
  },
  {
    title: "Build",
    description: "You see working pieces as they come together.",
    iconName: "build",
  },
  {
    title: "Launch",
    description: "Live on your own accounts. You own the code and data.",
    iconName: "launch",
  },
  {
    title: "Support",
    description: "Fixes and improvements as the business grows.",
    iconName: "support",
  },
];
