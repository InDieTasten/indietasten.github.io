#!/usr/bin/env node
// Downloads the social previews referenced by _data/projects.yml
// (repository-images.githubusercontent.com URLs) into public/project-previews/
// and keeps the remote -> local mapping in _data/previews.json, which the build
// reads to serve the previews from this site instead of GitHub (see #191).
//
//   node scripts/fetch-previews.mjs            lenient: warn, exit 0
//   node scripts/fetch-previews.mjs --strict   exit 1 if a preview failed
//   PREVIEWS_SKIP=1                            skip entirely (offline builds)

import fs from "node:fs";
import path from "node:path";
import { load } from "js-yaml";

const strict = process.argv.includes("--strict");

if (process.env.PREVIEWS_SKIP === "1") {
  console.log("[previews] skipped (PREVIEWS_SKIP=1)");
  process.exit(0);
}

const PROJECTS_FILE = "_data/projects.yml";
const MANIFEST_FILE = "_data/previews.json";
const OUT_DIR = "public/project-previews";
const PUBLIC_BASE = "/project-previews";
const PREVIEW_HOST = "repository-images.githubusercontent.com";
const hostOverride = process.env.PREVIEWS_HOST;

const CONTENT_TYPES = {
  "image/png": "png",
  "image/gif": "gif",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/webp": "webp",
};

function collectPreviewUrls() {
  if (!fs.existsSync(PROJECTS_FILE)) {
    throw new Error(`${PROJECTS_FILE} not found - run scripts/fetch-projects.sh first`);
  }
  const projects = load(fs.readFileSync(PROJECTS_FILE, "utf8")) ?? [];
  const urls = [];
  for (const project of projects) {
    if (!project.preview_image) continue;
    let url;
    try {
      url = new URL(project.preview_image);
    } catch {
      console.warn(`[previews] ignoring invalid preview URL for ${project.name}: ${project.preview_image}`);
      continue;
    }
    if (url.hostname !== PREVIEW_HOST) {
      console.warn(`[previews] ignoring preview URL on unexpected host for ${project.name}: ${project.preview_image}`);
      continue;
    }
    if (!urls.includes(project.preview_image)) urls.push(project.preview_image);
  }
  return urls;
}

function readManifest() {
  if (!fs.existsSync(MANIFEST_FILE)) return {};
  try {
    return JSON.parse(fs.readFileSync(MANIFEST_FILE, "utf8"));
  } catch {
    console.warn(`[previews] ${MANIFEST_FILE} is not valid JSON, rebuilding it`);
    return {};
  }
}

function localName(remoteUrl, ext) {
  const segments = new URL(remoteUrl).pathname.split("/").filter(Boolean);
  if (segments.length < 2) {
    throw new Error(`cannot derive a file name from ${remoteUrl}`);
  }
  const safe = (s) => s.replace(/[^A-Za-z0-9._-]/g, "_");
  return `${safe(segments[0])}-${safe(segments[1])}.${ext}`;
}

function requestUrl(remoteUrl) {
  if (!hostOverride) return remoteUrl;
  const url = new URL(remoteUrl);
  const override = new URL(hostOverride);
  url.protocol = override.protocol;
  url.host = override.host;
  return url.toString();
}

async function download(remoteUrl) {
  let lastError;
  for (let attempt = 0; attempt <= 2; attempt++) {
    if (attempt > 0) await new Promise((resolve) => setTimeout(resolve, 500 * 2 ** (attempt - 1)));
    try {
      const response = await fetch(requestUrl(remoteUrl), {
        redirect: "follow",
        headers: { "User-Agent": "indietasten-homepage-previews" },
      });
      if (!response.ok) throw new Error(`HTTP ${response.status} ${response.statusText}`);
      const contentType = (response.headers.get("content-type") ?? "").split(";")[0].trim().toLowerCase();
      const ext = CONTENT_TYPES[contentType];
      if (!ext) throw new Error(`unsupported content type: ${contentType || "unknown"}`);
      return { buffer: Buffer.from(await response.arrayBuffer()), ext };
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError;
}

const urls = collectPreviewUrls();
const manifest = readManifest();
fs.mkdirSync(OUT_DIR, { recursive: true });

let fetched = 0;
let cached = 0;
const failed = [];

for (const url of urls) {
  const existing = manifest[url];
  if (existing && fs.existsSync(path.join(OUT_DIR, path.posix.basename(existing)))) {
    cached++;
    console.log(`[previews] cached ${url} -> ${existing}`);
    continue;
  }
  try {
    const { buffer, ext } = await download(url);
    const fileName = localName(url, ext);
    fs.writeFileSync(path.join(OUT_DIR, fileName), buffer);
    manifest[url] = `${PUBLIC_BASE}/${fileName}`;
    fetched++;
    console.log(`[previews] fetched ${url} -> ${manifest[url]} (${buffer.length} bytes)`);
  } catch (error) {
    failed.push({ url, error });
    console.warn(`[previews] FAILED ${url}: ${error.message}`);
  }
}

const wanted = new Set(urls);
for (const key of Object.keys(manifest)) {
  if (!wanted.has(key)) delete manifest[key];
}
fs.writeFileSync(MANIFEST_FILE, `${JSON.stringify(manifest, null, 2)}\n`);

console.log(`[previews] done: ${fetched} fetched, ${cached} cached, ${failed.length} failed`);

if (failed.length > 0 && strict) {
  console.error(`[previews] ${failed.length} preview(s) could not be fetched${hostOverride ? ` from ${hostOverride}` : ""}:`);
  for (const { url, error } of failed) {
    console.error(`  ${url}: ${error.message}`);
  }
  process.exit(1);
}
