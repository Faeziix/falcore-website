import type { Metadata } from "next";
import { Oxanium, Source_Code_Pro } from "next/font/google";
import "./globals.css";

const oxanium = Oxanium({
  variable: "--font-oxanium",
  subsets: ["latin"],
});

const sourceCodePro = Source_Code_Pro({
  variable: "--font-source-code-pro",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Atlas | Web Design for Local Businesses",
  description:
    "Atlas builds high-performance websites for local businesses. Clean design, fast load times, and real results.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${oxanium.variable} ${sourceCodePro.variable} dark antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
