import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium, type Page } from "playwright";

type FrameRequest = {
  url: string;
  outputDirectory: string;
  namePrefix: string;
  device: "desktop" | "mobile";
  scrollStops: number[];
  captureFullPage: boolean;
  settleDelayMilliseconds: number;
  usesSystemChromium: boolean;
};

const DEVICE_VIEWPORTS = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 414, height: 896 },
} as const;
const JPEG_QUALITY = 90;
const DESKTOP_USER_AGENT =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36";
const MOBILE_USER_AGENT =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1";
const SYSTEM_CHROMIUM_PATH = "/usr/bin/chromium";
const CONSENT_BUTTON_LABEL = /^(decline|reject all|reject|accept|accept all|got it|ok)$/i;

function readFlag(flagName: string) {
  const flagIndex = process.argv.indexOf(`--${flagName}`);
  return flagIndex === -1 ? undefined : process.argv[flagIndex + 1];
}

function parseFrameRequest(): FrameRequest {
  const url = readFlag("url");
  const outputDirectory = readFlag("out");
  if (!url || !outputDirectory) {
    console.error(
      "Usage: bun run scripts/capture-case-study-frames.ts --url <url> --out <public/work/slug> [--name home] [--device desktop|mobile] [--stops 0,900,1800] [--full-page] [--settle 5000] [--system-chromium]"
    );
    process.exit(1);
  }
  return {
    url,
    outputDirectory,
    namePrefix: readFlag("name") ?? "page",
    device: readFlag("device") === "mobile" ? "mobile" : "desktop",
    scrollStops: (readFlag("stops") ?? "0").split(",").map(Number),
    captureFullPage: process.argv.includes("--full-page"),
    settleDelayMilliseconds: Number(readFlag("settle") ?? 5000),
    usesSystemChromium: process.argv.includes("--system-chromium"),
  };
}

async function dismissConsentBanner(page: Page) {
  const consentButton = page.getByRole("button", { name: CONSENT_BUTTON_LABEL }).first();
  if (await consentButton.isVisible().catch(() => false)) {
    await consentButton.click();
    await page.waitForTimeout(800);
  }
}

async function scrollThroughPageToTriggerReveals(page: Page) {
  const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let scrollPosition = 0; scrollPosition < pageHeight; scrollPosition += 600) {
    await page.evaluate((position) => window.scrollTo(0, position), scrollPosition);
    await page.waitForTimeout(250);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(600);
}

const request = parseFrameRequest();
const isMobile = request.device === "mobile";
await mkdir(request.outputDirectory, { recursive: true });

const browser = await chromium.launch({
  executablePath: request.usesSystemChromium ? SYSTEM_CHROMIUM_PATH : undefined,
  args: ["--disable-blink-features=AutomationControlled", "--autoplay-policy=no-user-gesture-required"],
});
const context = await browser.newContext({
  viewport: DEVICE_VIEWPORTS[request.device],
  deviceScaleFactor: 2,
  isMobile,
  hasTouch: isMobile,
  userAgent: isMobile ? MOBILE_USER_AGENT : DESKTOP_USER_AGENT,
});
const page = await context.newPage();
await page.goto(request.url, { waitUntil: "networkidle", timeout: 90_000 });
await page.waitForTimeout(request.settleDelayMilliseconds);
await dismissConsentBanner(page);
await page.waitForTimeout(1500);
await dismissConsentBanner(page);
await scrollThroughPageToTriggerReveals(page);

for (const scrollStop of request.scrollStops) {
  await page.evaluate((position) => window.scrollTo(0, position), scrollStop);
  await page.waitForTimeout(1200);
  const outputPath = path.join(
    request.outputDirectory,
    `${request.namePrefix}-${request.device}-${scrollStop}.jpg`
  );
  await page.screenshot({ path: outputPath, type: "jpeg", quality: JPEG_QUALITY });
  console.log(`captured ${outputPath}`);
}

if (request.captureFullPage) {
  const outputPath = path.join(
    request.outputDirectory,
    `${request.namePrefix}-${request.device}-full.jpg`
  );
  await page.screenshot({ path: outputPath, type: "jpeg", quality: JPEG_QUALITY, fullPage: true });
  console.log(`captured ${outputPath}`);
}

await browser.close();
