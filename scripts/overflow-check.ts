import { chromium, firefox, type Page } from "playwright";
import { SITE_URL } from "../lib/site-config";

type OverflowingElement = {
  selector: string;
  right: number;
  left: number;
  width: number;
};

type PageOverflowReport = {
  path: string;
  viewportWidth: number;
  documentScrollWidth: number;
  sidewaysPanPixels: number;
  culprits: OverflowingElement[];
};

const VIEWPORT_WIDTHS = (process.env.OVERFLOW_WIDTHS ?? "360,390,768,1024,1440").split(",").map(Number);
const VIEWPORT_HEIGHT = 900;
const OVERFLOW_TOLERANCE_PIXELS = 1;
const SCROLL_STEP_PIXELS = 600;
const DISABLE_WEBGL_SCRIPT = `HTMLCanvasElement.prototype.getContext = new Proxy(HTMLCanvasElement.prototype.getContext, {
  apply(target, canvas, args) { return String(args[0]).startsWith("webgl") ? null : Reflect.apply(target, canvas, args); }
});`;

const baseUrl = (process.argv[2] ?? SITE_URL).replace(/\/$/, "");
const requestedPaths = process.argv.slice(3);

async function listSitemapPaths(): Promise<string[]> {
  const sitemapResponse = await fetch(`${baseUrl}/sitemap.xml`);
  const sitemapXml = await sitemapResponse.text();
  const sitemapUrls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  return sitemapUrls.map((sitemapUrl) => new URL(sitemapUrl).pathname);
}

async function startAnimationOverflowSampler(page: Page) {
  await page.evaluate(() => {
    const samplesBySelector = new Map<string, { selector: string; left: number; right: number; width: number }>();
    let widestDocument = document.documentElement.clientWidth;

    function describeElement(element: Element) {
      const idPart = element.id ? `#${element.id}` : "";
      const classPart = typeof element.className === "string" && element.className.trim()
        ? `.${element.className.trim().split(/\s+/).slice(0, 6).join(".")}`
        : "";
      const parentPart = element.parentElement ? `${element.parentElement.tagName.toLowerCase()} > ` : "";
      return `${parentPart}${element.tagName.toLowerCase()}${idPart}${classPart}`;
    }

    function sampleFrame() {
      const viewportWidth = document.documentElement.clientWidth;
      const documentWidth = document.documentElement.scrollWidth;
      if (documentWidth > viewportWidth + 1) {
        widestDocument = Math.max(widestDocument, documentWidth);
        const stickingOut = [...document.body.querySelectorAll("*")].filter((element) => {
          const bounds = element.getBoundingClientRect();
          return bounds.width > 0 && bounds.height > 0 && bounds.right > viewportWidth + 1;
        });
        const outermost = stickingOut.filter((element) => !stickingOut.some((other) => other !== element && other.contains(element)));
        for (const element of outermost) {
          const bounds = element.getBoundingClientRect();
          const selector = describeElement(element);
          const previous = samplesBySelector.get(selector);
          if (!previous || bounds.right > previous.right) {
            samplesBySelector.set(selector, { selector, left: Math.round(bounds.left), right: Math.round(bounds.right), width: Math.round(bounds.width) });
          }
        }
      }
      requestAnimationFrame(sampleFrame);
    }

    requestAnimationFrame(sampleFrame);
    Object.assign(window, {
      readAnimationOverflowSamples: () => ({ widestDocument, samples: [...samplesBySelector.values()] }),
    });
  });
}

async function readAnimationOverflowSamples(page: Page) {
  return page.evaluate(
    () =>
      (window as unknown as { readAnimationOverflowSamples: () => { widestDocument: number; samples: OverflowingElement[] } })
        .readAnimationOverflowSamples(),
  );
}

async function scrollThroughPage(page: Page) {
  const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let scrollTop = 0; scrollTop < pageHeight; scrollTop += SCROLL_STEP_PIXELS) {
    await page.evaluate((top) => window.scrollTo(0, top), scrollTop);
    await page.waitForTimeout(450);
  }
  await page.waitForTimeout(1200);
}

async function measureSidewaysPan(page: Page) {
  return page.evaluate(async () => {
    const pannedOffsets: number[] = [];
    const pageHeight = document.documentElement.scrollHeight;
    for (let scrollTop = 0; scrollTop < pageHeight; scrollTop += window.innerHeight) {
      window.scrollTo(10_000, scrollTop);
      await new Promise((resolve) => requestAnimationFrame(resolve));
      pannedOffsets.push(window.scrollX + (window.visualViewport?.offsetLeft ?? 0));
      window.scrollTo(0, scrollTop);
    }
    return Math.max(0, ...pannedOffsets);
  });
}

async function measureOverflow(page: Page, tolerance: number) {
  return page.evaluate((tolerancePixels) => {
    const viewportWidth = document.documentElement.clientWidth;

    function describeElement(element: Element) {
      const idPart = element.id ? `#${element.id}` : "";
      const classPart = typeof element.className === "string" && element.className.trim()
        ? `.${element.className.trim().split(/\s+/).slice(0, 6).join(".")}`
        : "";
      return `${element.tagName.toLowerCase()}${idPart}${classPart}`;
    }

    function isClippedByAncestor(element: Element) {
      for (let ancestor = element.parentElement; ancestor && ancestor !== document.body; ancestor = ancestor.parentElement) {
        const overflowX = getComputedStyle(ancestor).overflowX;
        if (overflowX !== "visible") {
          const ancestorBounds = ancestor.getBoundingClientRect();
          if (ancestorBounds.right <= viewportWidth + tolerancePixels && ancestorBounds.left >= -tolerancePixels) return true;
        }
      }
      return false;
    }

    function stickingOut(element: Element) {
      const bounds = element.getBoundingClientRect();
      if (bounds.width === 0 || bounds.height === 0) return false;
      return bounds.right > viewportWidth + tolerancePixels || bounds.left < -tolerancePixels;
    }

    const overflowing = [...document.body.querySelectorAll("*")].filter(
      (element) => stickingOut(element) && !isClippedByAncestor(element),
    );
    const outermostOverflowing = overflowing.filter(
      (element) => !overflowing.some((other) => other !== element && other.contains(element)),
    );

    return {
      documentScrollWidth: document.documentElement.scrollWidth,
      viewportWidth,
      culprits: outermostOverflowing.map((element) => {
        const bounds = element.getBoundingClientRect();
        return {
          selector: describeElement(element),
          right: Math.round(bounds.right),
          left: Math.round(bounds.left),
          width: Math.round(bounds.width),
        };
      }),
    };
  }, tolerance);
}

const pathsToCheck = requestedPaths.length > 0 ? requestedPaths : await listSitemapPaths();
const browserEngine = process.env.OVERFLOW_BROWSER === "firefox" ? firefox : chromium;
const reports: PageOverflowReport[] = [];
const uncheckedPages: string[] = [];

async function checkPage(path: string, viewportWidth: number) {
  const browser = await browserEngine.launch();
  try {
    const emulatesPhone = viewportWidth < 768 && process.env.OVERFLOW_BROWSER !== "firefox";
    const context = await browser.newContext({
      viewport: { width: viewportWidth, height: VIEWPORT_HEIGHT },
      ...(emulatesPhone ? { isMobile: true, hasTouch: true, deviceScaleFactor: 3 } : {}),
    });
    await context.addInitScript(DISABLE_WEBGL_SCRIPT);
    const page = await context.newPage();
    await page.goto(`${baseUrl}${path}`, { waitUntil: "load" });
    await startAnimationOverflowSampler(page);
    await scrollThroughPage(page);
    const animationOverflow = await readAnimationOverflowSamples(page);
    const measurement = await measureOverflow(page, OVERFLOW_TOLERANCE_PIXELS);
    const sidewaysPanPixels = await measureSidewaysPan(page);
    const pageScrollsSideways =
      animationOverflow.widestDocument > measurement.viewportWidth + OVERFLOW_TOLERANCE_PIXELS ||
      measurement.documentScrollWidth > measurement.viewportWidth + OVERFLOW_TOLERANCE_PIXELS || sidewaysPanPixels > OVERFLOW_TOLERANCE_PIXELS;
    if (pageScrollsSideways || measurement.culprits.length > 0) {
      reports.push({
        path,
        viewportWidth,
        documentScrollWidth: Math.max(measurement.documentScrollWidth, animationOverflow.widestDocument),
        sidewaysPanPixels,
        culprits: [...measurement.culprits, ...animationOverflow.samples],
      });
    }
  } finally {
    await browser.close();
  }
}

for (const viewportWidth of VIEWPORT_WIDTHS) {
  for (const path of pathsToCheck) {
    try {
      await checkPage(path, viewportWidth);
    } catch {
      try {
        await checkPage(path, viewportWidth);
      } catch {
        uncheckedPages.push(`${path} @ ${viewportWidth}px`);
      }
    }
  }
}

for (const report of reports) {
  console.log(`\n${report.path} @ ${report.viewportWidth}px  (document width ${report.documentScrollWidth}px, pans ${report.sidewaysPanPixels}px)`);
  for (const culprit of report.culprits) {
    console.log(`  ${culprit.selector}  left ${culprit.left} right ${culprit.right} width ${culprit.width}`);
  }
}

const pagesThatScrollSideways = reports.filter(
  (report) => report.documentScrollWidth > report.viewportWidth + OVERFLOW_TOLERANCE_PIXELS || report.sidewaysPanPixels > OVERFLOW_TOLERANCE_PIXELS,
);
if (uncheckedPages.length > 0) console.log(`\nCould not check: ${uncheckedPages.join(", ")}`);
console.log(`\n${pagesThatScrollSideways.length} page/width combinations scroll sideways, ${reports.length} with elements sticking out.`);
process.exit(pagesThatScrollSideways.length > 0 ? 1 : 0);
