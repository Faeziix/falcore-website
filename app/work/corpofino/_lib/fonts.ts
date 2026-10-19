import { IBM_Plex_Sans_Arabic, Manrope } from "next/font/google";

const corpofinoDisplayFont = Manrope({
  variable: "--font-corpofino-display",
  subsets: ["latin"],
});

const corpofinoArabicFont = IBM_Plex_Sans_Arabic({
  variable: "--font-corpofino-arabic",
  subsets: ["arabic"],
  weight: ["300", "400"],
  preload: false,
});

export const corpofinoFontVariables = `${corpofinoDisplayFont.variable} ${corpofinoArabicFont.variable}`;
