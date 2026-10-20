import { readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import axios from "axios";
import { SITE_URL } from "../lib/site-config";

const PUBLIC_DIRECTORY = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "public");
const INDEXNOW_KEY_FILE_PATTERN = /^([0-9a-f]{32})\.txt$/;

async function readIndexNowKey() {
  const keyFileNames = (await readdir(PUBLIC_DIRECTORY)).filter((fileName) => INDEXNOW_KEY_FILE_PATTERN.test(fileName));
  if (keyFileNames.length !== 1) {
    throw new Error(`Expected one IndexNow key file in public/, found ${keyFileNames.length}`);
  }
  return keyFileNames[0].replace(".txt", "");
}

const INDEXNOW_KEY = await readIndexNowKey();

const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";
const MAXIMUM_URLS_PER_SUBMISSION = 10000;

async function readSitemapUrls() {
  const response = await axios.get<string>(`${SITE_URL}/sitemap.xml`, { responseType: "text" });
  return [...response.data.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
}

function toAbsoluteSiteUrl(urlOrPath: string) {
  return new URL(urlOrPath, SITE_URL).href;
}

const requestedUrls = process.argv.slice(2).map(toAbsoluteSiteUrl);
const urlList = (requestedUrls.length > 0 ? requestedUrls : await readSitemapUrls()).slice(
  0,
  MAXIMUM_URLS_PER_SUBMISSION
);

const response = await axios.post(
  INDEXNOW_ENDPOINT,
  {
    host: new URL(SITE_URL).host,
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList,
  },
  { headers: { "Content-Type": "application/json; charset=utf-8" }, validateStatus: () => true }
);

console.log(`IndexNow answered HTTP ${response.status} for ${urlList.length} URLs`);
for (const url of urlList) console.log(`  ${url}`);
process.exit(response.status === 200 || response.status === 202 ? 0 : 1);
