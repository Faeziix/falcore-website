import type { IconStroke } from "@/components/plotted-icon/plotted-stroke-icon";
import type { WorkingPrincipleIconName } from "./about-content";

export const WORKING_PRINCIPLE_ICON_STROKES: Record<WorkingPrincipleIconName, IconStroke[]> = {
  directContact: [
    { d: "M6.5 6.5H14.5V14.5H6.5Z M3.5 28.5V18.5H17.5V28.5 M25.5 6.5H33.5V14.5H25.5Z M22.5 28.5V18.5H36.5V28.5", tone: "outline" },
    { d: "M27.5 31.5L25 34L27.5 36.5 M31.5 31.5L34 34L31.5 36.5", tone: "detail" },
    { d: "M14.5 10.5H25.5", tone: "signal" },
  ],
  writtenPlan: [
    { d: "M9.5 4.5H25.5L30.5 9.5V35.5H9.5Z", tone: "outline" },
    { d: "M25.5 4.5V9.5H30.5 M14.5 14.5H25.5 M14.5 19.5H25.5 M14.5 24.5H20.5", tone: "detail" },
    { d: "M17.5 30L20 32.5L25.5 27", tone: "signal" },
  ],
  yourProcess: [
    { d: "M4.5 15H12.5V25H4.5Z M16 15H24V25H16Z M27.5 15H35.5V25H27.5Z", tone: "outline" },
    { d: "M12.5 20H16 M24 20H27.5", tone: "detail" },
    { d: "M2.5 11.5V7.5H6.5 M33.5 7.5H37.5V11.5 M37.5 28.5V32.5H33.5 M6.5 32.5H2.5V28.5", tone: "signal" },
  ],
  ownership: [
    { d: "M4.5 12.5H19.5V27.5H4.5Z M19.5 20H36.5", tone: "outline" },
    { d: "M31.5 20V27.5 M26.5 20V25", tone: "detail" },
    { d: "M9.5 17.5H14.5V22.5H9.5Z", tone: "signal" },
  ],
};
