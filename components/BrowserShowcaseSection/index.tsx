import BrowserShowcaseClient from "./BrowserShowcaseClient";

const desktopScreenshot = (url: string) =>
  `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url&type=png&viewport.width=1280&viewport.height=800&waitForTimeout=3000`;

const mobileScreenshot = (url: string) =>
  `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url&type=png&viewport.width=390&viewport.height=520&viewport.isMobile=true&viewport.deviceScaleFactor=2&waitForTimeout=3000`;

const websites = [
  {
    id: "xma",
    title: "XMA Agency",
    externalUrl: "https://www.xma.ae",
    thumbnailUrl: desktopScreenshot("https://www.xma.ae"),
    mobileThumbnailUrl: mobileScreenshot("https://www.xma.ae"),
    width: 1280,
    height: 800,
    mobileWidth: 390,
    mobileHeight: 520,
  },
  {
    id: "xma-car-rental",
    title: "XMA Car Rental",
    externalUrl: "https://car-rental.xma.ae",
    thumbnailUrl: desktopScreenshot("https://car-rental.xma.ae"),
    mobileThumbnailUrl: mobileScreenshot("https://car-rental.xma.ae"),
    width: 1280,
    height: 800,
    mobileWidth: 390,
    mobileHeight: 520,
  },
  {
    id: "convoflow",
    title: "ConvoFlow",
    externalUrl: "https://www.convoflow.ae",
    thumbnailUrl: desktopScreenshot("https://www.convoflow.ae"),
    mobileThumbnailUrl: mobileScreenshot("https://www.convoflow.ae"),
    width: 1280,
    height: 800,
    mobileWidth: 390,
    mobileHeight: 520,
  },
  {
    id: "timeless-touch",
    title: "Timeless Touch Ceramics",
    externalUrl: "https://www.timelesstouchceramics.com",
    thumbnailUrl: desktopScreenshot("https://www.timelesstouchceramics.com"),
    mobileThumbnailUrl: mobileScreenshot("https://www.timelesstouchceramics.com"),
    width: 1280,
    height: 800,
    mobileWidth: 390,
    mobileHeight: 520,
  },
  {
    id: "ebox-pro",
    title: "eBox Pro",
    externalUrl: "https://ebox-pro-website.vercel.app",
    thumbnailUrl: desktopScreenshot("https://ebox-pro-website.vercel.app"),
    mobileThumbnailUrl: mobileScreenshot("https://ebox-pro-website.vercel.app"),
    width: 1280,
    height: 800,
    mobileWidth: 390,
    mobileHeight: 520,
  },
  {
    id: "uptown",
    title: "Uptown Car Rental",
    externalUrl: "https://uptown-car-rental.vercel.app",
    thumbnailUrl: desktopScreenshot("https://uptown-car-rental.vercel.app"),
    mobileThumbnailUrl: mobileScreenshot("https://uptown-car-rental.vercel.app"),
    width: 1280,
    height: 800,
    mobileWidth: 390,
    mobileHeight: 520,
  },
];

export default function BrowserShowcaseSection() {
  return (
    <section id="work" className="md:py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto md:px-6 lg:px-8">
        <BrowserShowcaseClient websites={websites} />
      </div>
    </section>
  );
}
