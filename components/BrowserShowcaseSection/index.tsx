import BrowserShowcaseClient from "./BrowserShowcaseClient";

const websites = [
  {
    id: "xma",
    title: "XMA Agency",
    externalUrl: "https://www.xma.ae",
    thumbnailUrl: `https://api.microlink.io/?url=${encodeURIComponent("https://www.xma.ae")}&screenshot=true&meta=false&embed=screenshot.url&type=png&viewport.width=1280&viewport.height=800`,
  },
  {
    id: "xma-car-rental",
    title: "XMA Car Rental",
    externalUrl: "https://car-rental.xma.ae",
    thumbnailUrl: `https://api.microlink.io/?url=${encodeURIComponent("https://car-rental.xma.ae")}&screenshot=true&meta=false&embed=screenshot.url&type=png&viewport.width=1280&viewport.height=800`,
  },
  {
    id: "convoflow",
    title: "ConvoFlow",
    externalUrl: "https://www.convoflow.ae",
    thumbnailUrl: `https://api.microlink.io/?url=${encodeURIComponent("https://www.convoflow.ae")}&screenshot=true&meta=false&embed=screenshot.url&type=png&viewport.width=1280&viewport.height=800`,
  },
  {
    id: "timeless-touch",
    title: "Timeless Touch Ceramics",
    externalUrl: "https://www.timelesstouchceramics.com",
    thumbnailUrl: `https://api.microlink.io/?url=${encodeURIComponent("https://www.timelesstouchceramics.com")}&screenshot=true&meta=false&embed=screenshot.url&type=png&viewport.width=1280&viewport.height=800`,
  },
  {
    id: "ebox-pro",
    title: "eBox Pro",
    externalUrl: "https://ebox-pro-website.vercel.app",
    thumbnailUrl: `https://api.microlink.io/?url=${encodeURIComponent("https://ebox-pro-website.vercel.app")}&screenshot=true&meta=false&embed=screenshot.url&type=png&viewport.width=1280&viewport.height=800`,
  },
  {
    id: "uptown",
    title: "Uptown Car Rental",
    externalUrl: "https://uptown-car-rental.vercel.app",
    thumbnailUrl: `https://api.microlink.io/?url=${encodeURIComponent("https://uptown-car-rental.vercel.app")}&screenshot=true&meta=false&embed=screenshot.url&type=png&viewport.width=1280&viewport.height=800`,
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
