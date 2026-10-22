import type { IconStroke } from "@/components/plotted-icon/plotted-stroke-icon";
import type { InclusionIconName } from "@/lib/data/services";

const sparkAt = (centerX: number, centerY: number, radius: number) => {
  const shoulder = radius * 0.28;
  return [
    `M${centerX} ${centerY - radius}`,
    `L${centerX + shoulder} ${centerY - shoulder}`,
    `L${centerX + radius} ${centerY}`,
    `L${centerX + shoulder} ${centerY + shoulder}`,
    `L${centerX} ${centerY + radius}`,
    `L${centerX - shoulder} ${centerY + shoulder}`,
    `L${centerX - radius} ${centerY}`,
    `L${centerX - shoulder} ${centerY - shoulder}`,
    "Z",
  ].join("");
};

export const INCLUSION_ICON_STROKES: Record<InclusionIconName, IconStroke[]> = {
  automatedWorkflow: [
    { d: "M4.5 21.5H13.5V30.5H4.5Z M26.5 21.5H35.5V30.5H26.5Z", tone: "outline" },
    { d: "M13.5 26H26.5 M23.5 23L26.5 26L23.5 29", tone: "detail" },
    { d: sparkAt(20, 11, 5.5), tone: "signal" },
  ],
  chatAssistant: [
    { d: "M5.5 8.5H34.5V26.5H17L10.5 32V26.5H5.5Z", tone: "outline" },
    { d: "M12.5 17.5H15.5M18.5 17.5H21.5M24.5 17.5H27.5", tone: "signal" },
  ],
  dataSorting: [
    { d: "M14.5 10.5H25.5V29.5H14.5Z", tone: "outline" },
    { d: "M3.5 12.5H10.5M6.5 19H11.5M4.5 26.5H9.5", tone: "detail" },
    { d: "M28.5 14.5H36.5M28.5 20H36.5M28.5 25.5H36.5", tone: "signal" },
  ],
  aiInsideTools: [
    { d: "M4.5 7.5H35.5V32.5H4.5Z", tone: "outline" },
    { d: "M4.5 13.5H35.5 M9.5 19.5H19.5M9.5 24.5H16.5", tone: "detail" },
    { d: sparkAt(28.5, 23, 5), tone: "signal" },
  ],
  decisionBranch: [
    { d: "M3.5 20H10.5 M17 13.5L23.5 20L17 26.5L10.5 20Z", tone: "outline" },
    { d: "M27.5 20V29.5H36", tone: "detail" },
    { d: "M23.5 20H27.5V10.5H35.5 M32.5 7.5L35.5 10.5L32.5 13.5", tone: "signal" },
  ],
  crmRecord: [
    { d: "M4.5 8.5H35.5V31.5H4.5Z", tone: "outline" },
    { d: "M10.5 13.5H17.5V20.5H10.5Z M9.5 26.5L11 24H17L18.5 26.5 M22.5 14.5H30.5M22.5 19H28", tone: "detail" },
    { d: "M22.5 25L25 27.5L30.5 22", tone: "signal" },
  ],
  toolLoop: [
    { d: "M4.5 4.5H13.5V13.5H4.5Z M26.5 4.5H35.5V13.5H26.5Z M15.5 26.5H24.5V35.5H15.5Z", tone: "outline" },
    { d: "M13.5 9H26.5 M31 13.5V31H24.5 M15.5 31H9V13.5", tone: "signal" },
  ],
  integrationHub: [
    { d: "M15.5 15.5H24.5V24.5H15.5Z", tone: "outline" },
    {
      d: "M3.5 3.5H9.5V9.5H3.5Z M3.5 30.5H9.5V36.5H3.5Z M30.5 30.5H36.5V36.5H30.5Z M9.5 9.5L15.5 15.5 M9.5 30.5L15.5 24.5 M30.5 30.5L24.5 24.5",
      tone: "detail",
    },
    { d: "M24.5 15.5L30.5 9.5 M30.5 3.5H36.5V9.5H30.5Z", tone: "signal" },
  ],
  processShortcut: [
    { d: "M4.5 4.5H12.5V12.5H4.5Z M27.5 27.5H35.5V35.5H27.5Z", tone: "outline" },
    { d: "M12.5 8.5H31.5V18.5H8.5V31.5H27.5", tone: "detail" },
    { d: "M12.5 12.5L27.5 27.5", tone: "signal" },
  ],
  stackedInfrastructure: [
    { d: "M6.5 26.5H33.5V33.5H6.5Z M6.5 16.5H33.5V23.5H6.5Z", tone: "outline" },
    { d: "M10.5 30H14.5M10.5 20H14.5", tone: "detail" },
    { d: "M6.5 6.5H33.5V13.5H6.5Z", tone: "signal" },
  ],
  brandedInterface: [
    { d: "M4.5 6.5H35.5V33.5H4.5Z", tone: "outline" },
    { d: "M4.5 12.5H35.5 M9.5 18.5H18.5M9.5 23H16.5M9.5 27.5H18.5", tone: "detail" },
    { d: "M27 17.5L31.5 27.5H22.5Z", tone: "signal" },
  ],
  responsiveScreens: [
    { d: "M3.5 7.5H24.5V24.5H3.5Z M10.5 31.5H17.5M14 24.5V31.5", tone: "outline" },
    { d: "M30.5 28.5H33.5", tone: "detail" },
    { d: "M27.5 13.5H36.5V32.5H27.5Z", tone: "signal" },
  ],
  conversionPage: [
    { d: "M8.5 3.5H31.5V36.5H8.5Z", tone: "outline" },
    { d: "M12.5 8.5H27.5M12.5 12.5H23.5 M12.5 17H27.5V22.5H12.5Z", tone: "detail" },
    { d: "M14.5 27.5H25.5V31.5H14.5Z", tone: "signal" },
  ],
  brandMark: [
    { d: "M6.5 6.5H33.5V33.5H6.5Z", tone: "outline" },
    { d: "M6.5 20H33.5M20 6.5V33.5 M20 11A9 9 0 1 1 20 29A9 9 0 1 1 20 11Z", tone: "detail" },
    { d: "M20 13.5L26.5 25.5H13.5Z", tone: "signal" },
  ],
  stopwatch: [
    { d: "M20 9.5A12.5 12.5 0 1 1 20 34.5A12.5 12.5 0 1 1 20 9.5Z M16.5 4.5H23.5M20 4.5V9.5", tone: "outline" },
    { d: "M20 12.5V14.5M29.5 22H27.5M20 31.5V29.5M10.5 22H12.5", tone: "detail" },
    { d: "M20 22L25.5 16.5", tone: "signal" },
  ],
  memberPortal: [
    { d: "M4.5 6.5H35.5V33.5H4.5Z M4.5 12.5H35.5", tone: "outline" },
    { d: "M12.5 29.5L14.5 26.5H25.5L27.5 29.5", tone: "detail" },
    { d: "M16.5 16.5H23.5V23.5H16.5Z", tone: "signal" },
  ],
  adminDashboard: [
    { d: "M4.5 6.5H35.5V33.5H4.5Z", tone: "outline" },
    { d: "M12.5 6.5V33.5 M7 11.5H10M7 15.5H10M7 19.5H10", tone: "detail" },
    { d: "M17.5 27.5L22 20.5L25.5 23.5L31 13.5", tone: "signal" },
  ],
  headlessContent: [
    { d: "M3.5 11.5H15.5V28.5H3.5Z M24.5 5.5H36.5V15.5H24.5Z M28.5 21.5H35.5V34.5H28.5Z", tone: "outline" },
    { d: "M6.5 16H12.5M6.5 20H12.5M6.5 24H10.5", tone: "detail" },
    { d: "M15.5 20H20 M20 10.5V27.5 M20 10.5H24.5 M20 27.5H28.5", tone: "signal" },
  ],
  bookingCalendar: [
    { d: "M5.5 8.5H34.5V33.5H5.5Z M5.5 14.5H34.5 M12.5 5.5V10.5M27.5 5.5V10.5", tone: "outline" },
    { d: "M10 19.5H13M18.5 19.5H21.5M27 19.5H30M10 25H13M27 25H30M10 29.5H13", tone: "detail" },
    { d: "M17.5 22.5H22.5V27.5H17.5Z", tone: "signal" },
  ],
  fittedTool: [
    { d: "M3.5 12.5H14.5V27.5H3.5Z M25.5 12.5H36.5V27.5H25.5Z", tone: "outline" },
    { d: "M7 20H11M29 20H33", tone: "detail" },
    { d: "M16.5 12.5H23.5V17.5H25.5V22.5H23.5V27.5H16.5V22.5H14.5V17.5H16.5Z", tone: "signal" },
  ],
};
