import { Bodoni_Moda, Zalando_Sans, Zalando_Sans_Expanded } from "next/font/google";

const sanaaOuahmaneDisplayFont = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-sanaa-ouahmane-display",
  display: "swap",
});

const sanaaOuahmaneBodyFont = Zalando_Sans({
  subsets: ["latin"],
  variable: "--font-sanaa-ouahmane-body",
  display: "swap",
});

const sanaaOuahmaneLabelFont = Zalando_Sans_Expanded({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-sanaa-ouahmane-label",
  display: "swap",
  preload: false,
});

export const sanaaOuahmaneFontVariables = [
  sanaaOuahmaneDisplayFont.variable,
  sanaaOuahmaneBodyFont.variable,
  sanaaOuahmaneLabelFont.variable,
].join(" ");
