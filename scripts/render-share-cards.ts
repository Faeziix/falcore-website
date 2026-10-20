import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright";
import sharp from "sharp";
import { CASE_STUDIES } from "../app/work/_lib/case-study-index";

const SCRIPTS_DIRECTORY = path.dirname(fileURLToPath(import.meta.url));
const SHARE_CARDS_PAGE = path.join(SCRIPTS_DIRECTORY, "share-cards", "share-cards.html");
const PUBLIC_DIRECTORY = path.join(SCRIPTS_DIRECTORY, "..", "public");
const OUTPUT_DIRECTORY = path.join(PUBLIC_DIRECTORY, "og");
const CASE_STUDY_OUTPUT_DIRECTORY = path.join(OUTPUT_DIRECTORY, "work");
const SHARE_CARD_SELECTOR = "[data-share-card]";
const SERVED_JPEG_QUALITY = 90;
const SHARE_CARD_WIDTH = 1200;
const SHARE_CARD_HEIGHT = 630;

const requestedCardNames = new Set(process.argv.slice(2));

function isRequested(cardName: string) {
  return requestedCardNames.size === 0 || requestedCardNames.has(cardName);
}

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1400, height: 900 },
  deviceScaleFactor: 1,
});
await page.goto(pathToFileURL(SHARE_CARDS_PAGE).href, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.evaluate(() =>
  Promise.all(
    Array.from(document.images, (image) =>
      image.complete ? undefined : new Promise((resolve) => image.addEventListener("load", resolve)),
    ),
  ),
);
await page.addStyleTag({ content: `${SHARE_CARD_SELECTOR} { outline: none !important; }` });
await mkdir(OUTPUT_DIRECTORY, { recursive: true });

const shareCards = await page.locator(SHARE_CARD_SELECTOR).all();
for (const shareCard of shareCards) {
  const cardName = await shareCard.getAttribute("data-share-card");
  if (!cardName) continue;
  if (!isRequested(cardName)) continue;
  await shareCard.screenshot({ path: path.join(OUTPUT_DIRECTORY, `${cardName}.png`), type: "png" });
  await shareCard.screenshot({
    path: path.join(OUTPUT_DIRECTORY, `${cardName}.jpg`),
    type: "jpeg",
    quality: SERVED_JPEG_QUALITY,
  });
  console.log(`rendered public/og/${cardName}.png and .jpg`);
}

await browser.close();

await mkdir(CASE_STUDY_OUTPUT_DIRECTORY, { recursive: true });
for (const caseStudy of CASE_STUDIES) {
  const cardName = `work/${caseStudy.slug}`;
  if (!isRequested(cardName)) continue;
  await sharp(path.join(PUBLIC_DIRECTORY, caseStudy.coverImage.src))
    .resize(SHARE_CARD_WIDTH, SHARE_CARD_HEIGHT, { fit: "cover", position: "centre" })
    .jpeg({ quality: SERVED_JPEG_QUALITY, mozjpeg: true })
    .toFile(path.join(OUTPUT_DIRECTORY, `${cardName}.jpg`));
  console.log(`rendered public/og/${cardName}.jpg from ${caseStudy.coverImage.src}`);
}
