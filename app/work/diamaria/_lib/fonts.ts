import { Jost, Josefin_Sans } from "next/font/google";
import { cn } from "@/lib/utils";

const jostDisplay = Jost({
  variable: "--font-diamaria-display",
  subsets: ["latin"],
  display: "swap",
});

const josefinSansBody = Josefin_Sans({
  variable: "--font-diamaria-body",
  subsets: ["latin"],
  display: "swap",
});

export const diaMariaFontVariables = cn(jostDisplay.variable, josefinSansBody.variable);
