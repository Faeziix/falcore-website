import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { $ } from "bun";
import axios from "axios";
import { SERVICE_LOOP_PROMPTS, type ServiceLoopPrompt } from "./service-loop-prompts";

const KIE_API_BASE_URL = "https://api.kie.ai/api/v1";
const KEYFRAME_MODEL = "nano-banana-2-1";
const VIDEO_MODEL = "kling-3.0/video";
const VIDEO_DURATION_SECONDS = "5";
const POLL_INTERVAL_MS = 5000;
const POLL_TIMEOUT_MS = 20 * 60 * 1000;

const PROJECT_ROOT = path.join(import.meta.dir, "..");
const OUTPUT_DIRECTORY = path.join(PROJECT_ROOT, "public", "services", "loops");
const WORK_DIRECTORY = path.join(PROJECT_ROOT, "scripts", ".service-loops");
const MANIFEST_PATH = path.join(WORK_DIRECTORY, "manifest.json");

type Stage = "keyframe" | "video" | "all";
type LoopManifestEntry = { keyframeUrl?: string; videoUrl?: string };
type LoopManifest = Record<string, LoopManifestEntry>;

const apiKey = process.env.KIE_API_KEY;
if (!apiKey) throw new Error("KIE_API_KEY is not set");

const kieClient = axios.create({
  baseURL: KIE_API_BASE_URL,
  headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
});

function parseArguments() {
  const argumentsList = process.argv.slice(2);
  const stageFlag = argumentsList.find((argument) => argument.startsWith("--stage="));
  const stage = (stageFlag?.split("=")[1] ?? "all") as Stage;
  const requestedSlugs = new Set(argumentsList.filter((argument) => !argument.startsWith("--")));
  const selectedLoops = SERVICE_LOOP_PROMPTS.filter(
    (loop) => requestedSlugs.size === 0 || requestedSlugs.has(loop.slug)
  );
  const shouldRegenerate = argumentsList.includes("--fresh");
  return { stage, selectedLoops, shouldRegenerate };
}

async function readManifest(): Promise<LoopManifest> {
  if (!existsSync(MANIFEST_PATH)) return {};
  return JSON.parse(await readFile(MANIFEST_PATH, "utf8"));
}

async function saveManifest(manifest: LoopManifest) {
  await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
}

async function createTask(model: string, input: Record<string, unknown>) {
  const { data } = await kieClient.post("/jobs/createTask", { model, input });
  if (data.code !== 200) throw new Error(`createTask failed: ${JSON.stringify(data)}`);
  return data.data.taskId as string;
}

async function waitForResultUrl(taskId: string, label: string) {
  const startedAt = Date.now();
  while (Date.now() - startedAt < POLL_TIMEOUT_MS) {
    const { data } = await kieClient.get("/jobs/recordInfo", { params: { taskId } });
    if (data.code !== 200) throw new Error(`recordInfo failed: ${JSON.stringify(data)}`);
    const { state, resultJson, failMsg } = data.data;
    if (state === "success") return JSON.parse(resultJson).resultUrls[0] as string;
    if (state === "fail") throw new Error(`${label} failed: ${failMsg}`);
    console.log(`${label}: ${state}`);
    await Bun.sleep(POLL_INTERVAL_MS);
  }
  throw new Error(`${label} timed out`);
}

const DOWNLOAD_ATTEMPTS = 6;

async function resolveReachableDownloadUrl(generatedFileUrl: string) {
  const { data } = await kieClient.post("/common/download-url", { url: generatedFileUrl });
  if (data.code !== 200) throw new Error(`download-url failed: ${JSON.stringify(data)}`);
  return data.data as string;
}

async function downloadFile(generatedFileUrl: string, destination: string) {
  for (let attempt = 1; attempt <= DOWNLOAD_ATTEMPTS; attempt++) {
    try {
      const reachableUrl = await resolveReachableDownloadUrl(generatedFileUrl);
      const response = await axios.get(reachableUrl, { responseType: "arraybuffer", timeout: 120_000 });
      await writeFile(destination, Buffer.from(response.data));
      return;
    } catch (error) {
      if (attempt === DOWNLOAD_ATTEMPTS) throw error;
      console.log(`download retry ${attempt} for ${path.basename(destination)}`);
      await Bun.sleep(attempt * 2000);
    }
  }
}

async function generateKeyframe(loop: ServiceLoopPrompt, manifest: LoopManifest) {
  const keyframePath = path.join(WORK_DIRECTORY, `${loop.slug}-keyframe.jpg`);
  const existingKeyframeUrl = manifest[loop.slug]?.keyframeUrl;
  if (existingKeyframeUrl && !shouldRegenerate) {
    if (!existsSync(keyframePath)) await downloadFile(existingKeyframeUrl, keyframePath);
    console.log(`${loop.slug}: reusing keyframe`);
    return;
  }
  const taskId = await createTask(KEYFRAME_MODEL, {
    prompt: loop.keyframePrompt,
    image_input: [],
    aspect_ratio: "16:9",
    resolution: "2K",
    output_format: "jpg",
  });
  const keyframeUrl = await waitForResultUrl(taskId, `${loop.slug} keyframe`);
  manifest[loop.slug] = { ...manifest[loop.slug], keyframeUrl };
  await saveManifest(manifest);
  await downloadFile(keyframeUrl, keyframePath);
  console.log(`${loop.slug}: keyframe saved`);
}

async function generateVideo(loop: ServiceLoopPrompt, manifest: LoopManifest) {
  const keyframeUrl = manifest[loop.slug]?.keyframeUrl;
  if (!keyframeUrl) throw new Error(`${loop.slug}: run the keyframe stage first`);
  const rawVideoPath = path.join(WORK_DIRECTORY, `${loop.slug}-raw.mp4`);
  const existingVideoUrl = manifest[loop.slug]?.videoUrl;
  if (existingVideoUrl && !shouldRegenerate) {
    if (!existsSync(rawVideoPath)) await downloadFile(existingVideoUrl, rawVideoPath);
    await encodeForWeb(loop.slug, rawVideoPath);
    console.log(`${loop.slug}: reusing video, re-encoded`);
    return;
  }
  const taskId = await createTask(VIDEO_MODEL, {
    prompt: loop.motionPrompt,
    image_urls: [keyframeUrl, keyframeUrl],
    sound: false,
    duration: VIDEO_DURATION_SECONDS,
    mode: "std",
    multi_shots: false,
  });
  const videoUrl = await waitForResultUrl(taskId, `${loop.slug} video`);
  manifest[loop.slug] = { ...manifest[loop.slug], videoUrl };
  await saveManifest(manifest);
  await downloadFile(videoUrl, rawVideoPath);
  await encodeForWeb(loop.slug, rawVideoPath);
  console.log(`${loop.slug}: video encoded`);
}

async function encodeForWeb(slug: string, rawVideoPath: string) {
  const mp4Path = path.join(OUTPUT_DIRECTORY, `${slug}.mp4`);
  const webmPath = path.join(OUTPUT_DIRECTORY, `${slug}.webm`);
  const posterPath = path.join(OUTPUT_DIRECTORY, `${slug}-poster.jpg`);
  const scaleFilter = "scale=1280:720:flags=lanczos";

  await $`ffmpeg -y -loglevel error -i ${rawVideoPath} -an -vf ${scaleFilter} -c:v libx264 -preset slow -crf 23 -pix_fmt yuv420p -movflags +faststart ${mp4Path}`;
  await $`ffmpeg -y -loglevel error -i ${rawVideoPath} -an -vf ${scaleFilter} -c:v libvpx-vp9 -crf 36 -b:v 0 -row-mt 1 ${webmPath}`;
  await $`ffmpeg -y -loglevel error -i ${rawVideoPath} -vf ${scaleFilter} -frames:v 1 -q:v 3 ${posterPath}`;
}

const { stage, selectedLoops, shouldRegenerate } = parseArguments();
await mkdir(OUTPUT_DIRECTORY, { recursive: true });
await mkdir(WORK_DIRECTORY, { recursive: true });
const manifest = await readManifest();

const loopResults = await Promise.allSettled(
  selectedLoops.map(async (loop) => {
    if (stage === "keyframe" || stage === "all") await generateKeyframe(loop, manifest);
    if (stage === "video" || stage === "all") await generateVideo(loop, manifest);
    await saveManifest(manifest);
  })
);

const failedLoops = loopResults.flatMap((result, index) =>
  result.status === "rejected" ? [`${selectedLoops[index].slug}: ${result.reason}`] : []
);
if (failedLoops.length > 0) {
  console.error(`Failed:\n${failedLoops.join("\n")}`);
  process.exit(1);
}
