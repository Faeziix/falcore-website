import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium, type Browser, type Page } from "playwright";
import {
  DESKTOP_VIEWPORT,
  MOBILE_VIEWPORT,
  SHOWCASE_WEBSITES,
} from "../lib/data/showcase-websites";

const PUBLIC_DIRECTORY = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "public");
const SETTLE_DELAY_MS = 6000;
const JPEG_QUALITY = 82;
const CONSENT_BUTTON_LABEL = /^(decline|reject all|reject|accept|accept all|got it|ok)$/i;

async function dismissConsentBanner(page: Page) {
  const consentButton = page
    .getByRole("button", { name: CONSENT_BUTTON_LABEL })
    .first();
  if (await consentButton.isVisible().catch(() => false)) {
    await consentButton.click();
    await page.waitForTimeout(800);
  }
}

type CaptureTarget = {
  url: string;
  outputPath: string;
  viewport: { width: number; height: number };
  isMobile: boolean;
};

async function captureScreenshot(browser: Browser, target: CaptureTarget) {
  const context = await browser.newContext({
    viewport: target.viewport,
    deviceScaleFactor: 2,
    isMobile: target.isMobile,
    hasTouch: target.isMobile,
    reducedMotion: "no-preference",
  });
  const page = await context.newPage();
  await page.goto(target.url, { waitUntil: "networkidle", timeout: 60_000 });
  await page.waitForTimeout(SETTLE_DELAY_MS);
  await dismissConsentBanner(page);
  await page.screenshot({
    path: target.outputPath,
    type: "jpeg",
    quality: JPEG_QUALITY,
  });
  await context.close();
  console.log(`captured ${path.relative(PUBLIC_DIRECTORY, target.outputPath)}`);
}

const MOBILE_ONLY_FLAG = "--mobile-only";
const commandLineArguments = process.argv.slice(2);
const isMobileOnly = commandLineArguments.includes(MOBILE_ONLY_FLAG);
const requestedIds = new Set(
  commandLineArguments.filter((argument) => argument !== MOBILE_ONLY_FLAG)
);
const websitesToCapture = SHOWCASE_WEBSITES.filter(
  (website) => requestedIds.size === 0 || requestedIds.has(website.id)
);

await mkdir(path.join(PUBLIC_DIRECTORY, "showcase"), { recursive: true });
const browser = await chromium.launch();

for (const website of websitesToCapture) {
  if (!isMobileOnly) {
    await captureScreenshot(browser, {
      url: website.externalUrl,
      outputPath: path.join(PUBLIC_DIRECTORY, website.thumbnailUrl),
      viewport: DESKTOP_VIEWPORT,
      isMobile: false,
    });
  }
  await captureScreenshot(browser, {
    url: website.externalUrl,
    outputPath: path.join(PUBLIC_DIRECTORY, website.mobileThumbnailUrl),
    viewport: MOBILE_VIEWPORT,
    isMobile: true,
  });
}

await browser.close();
