import BrowserShowcaseClient from "./BrowserShowcaseClient";

const websites = [
  {
    id: "gulfepco",
    title: "Gulf EPCO",
    externalUrl: "https://www.gulfepco.com",
    thumbnailUrl: `https://api.microlink.io/?url=${encodeURIComponent("https://www.gulfepco.com")}&screenshot=true&meta=false&embed=screenshot.url&type=png&viewport.width=1280&viewport.height=800`,
  },
  {
    id: "dreamdrives",
    title: "Dream Drives",
    externalUrl: "https://www.dreamdrivesdxb.com",
    thumbnailUrl: `https://api.microlink.io/?url=${encodeURIComponent("https://www.dreamdrivesdxb.com")}&screenshot=true&meta=false&embed=screenshot.url&type=png&viewport.width=1280&viewport.height=800`,
  },
  {
    id: "convoflow",
    title: "ConvoFlow",
    externalUrl: "https://www.convoflow.ae",
    thumbnailUrl: `https://api.microlink.io/?url=${encodeURIComponent("https://www.convoflow.ae")}&screenshot=true&meta=false&embed=screenshot.url&type=png&viewport.width=1280&viewport.height=800`,
  },
  {
    id: "advance",
    title: "Advance Car Rental",
    externalUrl: "https://advance-website.vercel.app",
    thumbnailUrl: `https://api.microlink.io/?url=${encodeURIComponent("https://advance-website.vercel.app")}&screenshot=true&meta=false&embed=screenshot.url&type=png&viewport.width=1280&viewport.height=800`,
  },
];

export default function BrowserShowcaseSection() {
  return (
    <section id="work" className="py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <BrowserShowcaseClient websites={websites} />
      </div>
    </section>
  );
}
