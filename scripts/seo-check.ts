import axios from "axios";
import { SITE_URL } from "../lib/site-config";

type Severity = "error" | "warning";

type Finding = {
  path: string;
  severity: Severity;
  message: string;
};

type JsonLdNode = Record<string, unknown> & { "@type"?: string | string[]; "@id"?: string };

type PageSnapshot = {
  path: string;
  status: number;
  title: string;
  description: string | null;
  canonicalUrls: string[];
  headingOneCount: number;
  openGraphImage: string | null;
  jsonLdBlocks: string[];
  imagesWithoutAlt: string[];
  internalLinks: Set<string>;
};

const TITLE_MAXIMUM_LENGTH = 60;
const SHARED_LASTMOD_MAXIMUM_SHARE = 0.5;
const HTML_ENTITIES: Record<string, string> = { "&amp;": "&", "&quot;": '"', "&#x27;": "'", "&#39;": "'", "&lt;": "<", "&gt;": ">" };
const DESCRIPTION_LENGTH_RANGE = { minimum: 70, maximum: 160 };
const IGNORED_INTERNAL_LINK_PREFIXES = ["/_next/", "/cdn-cgi/"];

const baseUrl = (process.argv[2] ?? SITE_URL).replace(/\/$/, "");
const canonicalOrigin = new URL(SITE_URL).origin;
const findings: Finding[] = [];

function report(path: string, severity: Severity, message: string) {
  findings.push({ path, severity, message });
}

function expectedJsonLdTypesForPath(path: string): string[] {
  if (path === "/") return ["Organization", "WebSite", "WebPage"];
  if (path === "/about") return ["ProfilePage", "Person", "BreadcrumbList"];
  if (path === "/contact") return ["ContactPage", "BreadcrumbList"];
  if (["/services", "/work", "/blog"].includes(path)) return ["CollectionPage", "BreadcrumbList"];
  if (path.startsWith("/services/")) return ["Service", "BreadcrumbList"];
  if (path.startsWith("/work/")) return ["Article", "BreadcrumbList"];
  if (path.startsWith("/blog/")) return ["BlogPosting", "BreadcrumbList"];
  return ["Organization"];
}

async function fetchText(url: string) {
  const response = await axios.get<string>(url, {
    responseType: "text",
    transformResponse: (body) => body,
    validateStatus: () => true,
    maxRedirects: 0,
  });
  return { status: response.status, body: response.data };
}

async function fetchStatus(url: string) {
  const response = await axios.get(url, {
    responseType: "arraybuffer",
    validateStatus: () => true,
    maxRedirects: 5,
  });
  return response.status;
}

function decodeHtmlEntities(text: string) {
  return text.replace(/&(amp|quot|#x27|#39|lt|gt);/g, (entity) => HTML_ENTITIES[entity]);
}

function toBaseUrl(absoluteUrl: string) {
  const parsed = new URL(absoluteUrl, canonicalOrigin);
  return `${baseUrl}${parsed.pathname}${parsed.search}`;
}

async function readSitemapEntries() {
  const { status, body } = await fetchText(`${baseUrl}/sitemap.xml`);
  if (status !== 200) throw new Error(`sitemap.xml returned ${status}`);
  const locations = [...body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  const lastModifiedDates = [...body.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((match) => match[1]);
  return { locations, lastModifiedDates };
}

async function snapshotPage(path: string): Promise<PageSnapshot> {
  const { status, body } = await fetchText(`${baseUrl}${path}`);
  const snapshot: PageSnapshot = {
    path,
    status,
    title: "",
    description: null,
    canonicalUrls: [],
    headingOneCount: 0,
    openGraphImage: null,
    jsonLdBlocks: [],
    imagesWithoutAlt: [],
    internalLinks: new Set(),
  };
  let isInsideTitle = false;
  let isInsideSvg = 0;
  let pendingJsonLd: string | null = null;

  const rewriter = new HTMLRewriter()
    .on("svg", {
      element(element) {
        isInsideSvg += 1;
        element.onEndTag(() => {
          isInsideSvg -= 1;
        });
      },
    })
    .on("title", {
      element(element) {
        if (isInsideSvg > 0 || snapshot.title) return;
        isInsideTitle = true;
        element.onEndTag(() => {
          isInsideTitle = false;
        });
      },
      text(chunk) {
        if (isInsideTitle) snapshot.title += chunk.text;
      },
    })
    .on('meta[name="description"]', {
      element(element) {
        const content = element.getAttribute("content");
        snapshot.description ??= content === null ? null : decodeHtmlEntities(content);
      },
    })
    .on('meta[property="og:image"]', {
      element(element) {
        snapshot.openGraphImage ??= element.getAttribute("content");
      },
    })
    .on('link[rel="canonical"]', {
      element(element) {
        const href = element.getAttribute("href");
        if (href) snapshot.canonicalUrls.push(href);
      },
    })
    .on("h1", {
      element() {
        snapshot.headingOneCount += 1;
      },
    })
    .on("img", {
      element(element) {
        if (!element.hasAttribute("alt")) {
          snapshot.imagesWithoutAlt.push(element.getAttribute("src") ?? "(no src)");
        }
      },
    })
    .on("a[href]", {
      element(element) {
        const href = element.getAttribute("href") ?? "";
        const pathOnly = href.split("#")[0].split("?")[0];
        if (!pathOnly.startsWith("/") || pathOnly.startsWith("//")) return;
        if (IGNORED_INTERNAL_LINK_PREFIXES.some((prefix) => pathOnly.startsWith(prefix))) return;
        snapshot.internalLinks.add(pathOnly);
      },
    })
    .on('script[type="application/ld+json"]', {
      element(element) {
        pendingJsonLd = "";
        element.onEndTag(() => {
          if (pendingJsonLd !== null) snapshot.jsonLdBlocks.push(pendingJsonLd);
          pendingJsonLd = null;
        });
      },
      text(chunk) {
        if (pendingJsonLd !== null) pendingJsonLd += chunk.text;
      },
    });

  await rewriter.transform(new Response(body)).text();
  snapshot.title = decodeHtmlEntities(snapshot.title.trim());
  return snapshot;
}

function flattenJsonLdNodes(value: unknown): JsonLdNode[] {
  if (Array.isArray(value)) return value.flatMap(flattenJsonLdNodes);
  if (value && typeof value === "object") {
    const node = value as JsonLdNode;
    const graph = node["@graph"];
    return graph ? flattenJsonLdNodes(graph) : [node];
  }
  return [];
}

function typesOf(node: JsonLdNode): string[] {
  const type = node["@type"];
  if (!type) return [];
  return Array.isArray(type) ? type : [type];
}

function collectNestedTypes(value: unknown, collected: Set<string>) {
  if (Array.isArray(value)) {
    value.forEach((item) => collectNestedTypes(item, collected));
    return;
  }
  if (value && typeof value === "object") {
    typesOf(value as JsonLdNode).forEach((type) => collected.add(type));
    Object.values(value).forEach((child) => collectNestedTypes(child, collected));
  }
}

function auditStructuredData(snapshot: PageSnapshot) {
  const nodes: JsonLdNode[] = [];
  for (const block of snapshot.jsonLdBlocks) {
    try {
      nodes.push(...flattenJsonLdNodes(JSON.parse(block)));
    } catch {
      report(snapshot.path, "error", "A JSON-LD block does not parse");
    }
  }

  const presentTypes = new Set<string>();
  collectNestedTypes(nodes, presentTypes);
  for (const expectedType of expectedJsonLdTypesForPath(snapshot.path)) {
    if (!presentTypes.has(expectedType)) report(snapshot.path, "error", `JSON-LD is missing ${expectedType}`);
  }

  const nodesById = new Map<string, string>();
  for (const node of nodes) {
    const id = node["@id"];
    if (!id || Object.keys(node).length <= 1) continue;
    const serialised = JSON.stringify(node);
    const existing = nodesById.get(id);
    if (existing && existing !== serialised) {
      report(snapshot.path, "error", `JSON-LD declares ${id} twice with different data`);
    }
    nodesById.set(id, serialised);
    if (!id.startsWith(canonicalOrigin)) report(snapshot.path, "error", `JSON-LD @id ${id} is not on ${canonicalOrigin}`);
  }
}

function auditPage(snapshot: PageSnapshot) {
  const { path } = snapshot;
  if (snapshot.status !== 200) {
    report(path, "error", `returned HTTP ${snapshot.status}`);
    return;
  }

  if (!snapshot.title) report(path, "error", "has no <title>");
  else if (snapshot.title.length > TITLE_MAXIMUM_LENGTH) {
    report(path, "warning", `title is ${snapshot.title.length} characters: "${snapshot.title}"`);
  }

  if (!snapshot.description) report(path, "error", "has no meta description");
  else {
    const { length } = snapshot.description;
    if (length < DESCRIPTION_LENGTH_RANGE.minimum || length > DESCRIPTION_LENGTH_RANGE.maximum) {
      report(path, "warning", `description is ${length} characters`);
    }
  }

  if (snapshot.canonicalUrls.length !== 1) {
    report(path, "error", `has ${snapshot.canonicalUrls.length} canonical links`);
  } else {
    const expectedCanonical = path === "/" ? canonicalOrigin : `${canonicalOrigin}${path}`;
    const canonical = snapshot.canonicalUrls[0].replace(/\/$/, "");
    if (canonical !== expectedCanonical) report(path, "error", `canonical is ${canonical}, expected ${expectedCanonical}`);
  }

  if (snapshot.headingOneCount !== 1) report(path, "error", `has ${snapshot.headingOneCount} <h1> elements`);
  if (!snapshot.openGraphImage) report(path, "error", "has no og:image");
  for (const source of snapshot.imagesWithoutAlt) report(path, "error", `image without alt: ${source}`);

  auditStructuredData(snapshot);
}

function reportDuplicates(snapshots: PageSnapshot[], label: string, valueOf: (snapshot: PageSnapshot) => string | null) {
  const pathsByValue = new Map<string, string[]>();
  for (const snapshot of snapshots) {
    const value = valueOf(snapshot);
    if (!value) continue;
    pathsByValue.set(value, [...(pathsByValue.get(value) ?? []), snapshot.path]);
  }
  for (const [value, paths] of pathsByValue) {
    if (paths.length > 1) report(paths.join(", "), "error", `share the same ${label}: "${value}"`);
  }
}

async function auditOpenGraphImages(snapshots: PageSnapshot[]) {
  const uniqueImages = new Set(snapshots.map((snapshot) => snapshot.openGraphImage).filter(Boolean) as string[]);
  for (const image of uniqueImages) {
    const status = await fetchStatus(toBaseUrl(image));
    if (status !== 200) report(image, "error", `og:image returned HTTP ${status}`);
  }
}

async function auditInternalLinks(snapshots: PageSnapshot[], sitemapPaths: Set<string>) {
  const linkedPaths = new Set(snapshots.flatMap((snapshot) => [...snapshot.internalLinks]));
  for (const linkedPath of linkedPaths) {
    if (sitemapPaths.has(linkedPath)) continue;
    const { status } = await fetchText(`${baseUrl}${linkedPath}`);
    if (status !== 200) report(linkedPath, "error", `internal link returns HTTP ${status}`);
  }
  for (const sitemapPath of sitemapPaths) {
    if (sitemapPath !== "/" && !linkedPaths.has(sitemapPath)) {
      report(sitemapPath, "warning", "is in the sitemap but no page links to it");
    }
  }
}

const { locations, lastModifiedDates } = await readSitemapEntries();
const sitemapPaths = new Set(locations.map((location) => new URL(location).pathname.replace(/(.)\/$/, "$1")));

for (const location of locations) {
  if (new URL(location).origin !== canonicalOrigin) report(location, "error", `sitemap URL is not on ${canonicalOrigin}`);
}
const lastmodCounts = new Map<string, number>();
lastModifiedDates.forEach((date) => lastmodCounts.set(date, (lastmodCounts.get(date) ?? 0) + 1));
const mostSharedLastmodCount = Math.max(0, ...lastmodCounts.values());
if (lastModifiedDates.length > 2 && mostSharedLastmodCount / lastModifiedDates.length > SHARED_LASTMOD_MAXIMUM_SHARE) {
  report("/sitemap.xml", "warning", `${mostSharedLastmodCount} of ${lastModifiedDates.length} lastmod values are identical; check they are real content dates`);
}

const snapshots = await Promise.all([...sitemapPaths].map(snapshotPage));
snapshots.forEach(auditPage);
reportDuplicates(snapshots, "title", (snapshot) => snapshot.title);
reportDuplicates(snapshots, "meta description", (snapshot) => snapshot.description);
await auditOpenGraphImages(snapshots);
await auditInternalLinks(snapshots, sitemapPaths);

const errors = findings.filter((finding) => finding.severity === "error");
const warnings = findings.filter((finding) => finding.severity === "warning");

console.log(`Checked ${snapshots.length} pages on ${baseUrl}\n`);
for (const snapshot of snapshots) {
  console.log(`${snapshot.status} ${snapshot.path.padEnd(42)} ${snapshot.title}`);
}
for (const finding of [...errors, ...warnings]) {
  console.log(`${finding.severity === "error" ? "ERROR" : "warn "} ${finding.path}: ${finding.message}`);
}
console.log(`\n${errors.length} errors, ${warnings.length} warnings`);
process.exit(errors.length > 0 ? 1 : 0);
