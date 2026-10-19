import { Geist, Geist_Mono } from "next/font/google";

const companyOperatingSystemDisplayFont = Geist({
  variable: "--font-company-operating-system-display",
  subsets: ["latin"],
});

const companyOperatingSystemMonoFont = Geist_Mono({
  variable: "--font-company-operating-system-mono",
  subsets: ["latin"],
});

export const companyOperatingSystemFontClassName = `${companyOperatingSystemDisplayFont.variable} ${companyOperatingSystemMonoFont.variable}`;
