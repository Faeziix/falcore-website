import { DM_Sans, Manrope } from "next/font/google";

const xmaAgencyDisplayFont = Manrope({
  subsets: ["latin"],
  variable: "--font-xma-agency-display",
  display: "swap",
});

const xmaAgencyBodyFont = DM_Sans({
  subsets: ["latin"],
  variable: "--font-xma-agency-body",
  display: "swap",
});

export const xmaAgencyFontVariables = `${xmaAgencyDisplayFont.variable} ${xmaAgencyBodyFont.variable}`;
