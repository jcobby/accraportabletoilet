/**
 * Photo import pipeline.
 *
 * Drop original photos into ./photos-inbox and run `npm run photos`.
 *
 * Phone screenshots and video frames arrive letterboxed with black bars, and phone
 * originals are 3–6MB, which would wreck load times on the Ghanaian mobile networks
 * most of this site's visitors are on. This script handles both automatically:
 *
 *   1. detects and crops solid black bars from every edge
 *   2. resizes so the long edge is at most MAX_EDGE
 *   3. re-encodes as progressive JPEG at quality 82
 *   4. writes to public/images/<destination>
 *
 * Re-running is safe — it always works from the originals in photos-inbox, never from
 * its own output, so quality never degrades through repeated passes.
 */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const INBOX = "photos-inbox";
const OUT_ROOT = path.join("public", "images");
const MAX_EDGE = 1800;
const QUALITY = 82;

/**
 * Filename in photos-inbox → path under public/images.
 *
 * Keys are the originals as supplied. The numbering in those filenames does NOT match
 * the order the photos were sent, so each was identified by what is actually in frame
 * before being mapped — do the same for any new batch rather than trusting the index.
 */
const MAP = {
  // 2-door trailer
  "photo_6_2026-08-07_08-57-11.jpg": "units/luxury-2-door-restroom-trailer/street.jpg",
  "photo_4_2026-08-07_08-57-11.jpg": "units/luxury-2-door-restroom-trailer/garden.jpg",
  "photo_3_2026-08-07_08-57-11.jpg": "units/luxury-2-door-restroom-trailer/angle.jpg",
  // 3-door trailer
  "photo_5_2026-08-07_08-57-11.jpg": "units/executive-3-door-restroom-trailer/event.jpg",
  "photo_1_2026-08-07_08-57-11.jpg": "units/executive-3-door-restroom-trailer/lawn.jpg",
  // standard cubicle interiors — these are moulded plastic units, NOT trailer interiors
  "photo_7_2026-08-07_08-57-11.jpg": "units/standard-portable-toilet/interior-blue.jpg",
  "photo_2_2026-08-07_08-57-11.jpg": "units/standard-portable-toilet/interior-tan.jpg",

  // ---- second batch, 10 Aug — the gallery set ----
  "photo_2026-08-10_09-53-45.jpg": "gallery/trailer-roadside.jpg",
  "photo_2026-08-10_09-53-54.jpg": "gallery/trailer-front-marquee.jpg",
  "photo_2026-08-10_09-54-00.jpg": "gallery/trailer-rear-angle.jpg",
  "photo_2026-08-10_09-54-05.jpg": "gallery/trailer-under-tree.jpg",
  "photo_2026-08-10_09-54-11.jpg": "gallery/fleet-row-pavilion.jpg",
  "photo_2026-08-10_09-54-18.jpg": "gallery/trailer-on-grass.jpg",
  "photo_2026-08-10_09-54-25.jpg": "gallery/interior-vanity-urinal.jpg",
  "photo_2026-08-10_09-54-30.jpg": "gallery/interior-mirror-wc.jpg",
  "photo_2026-08-10_09-54-37.jpg": "gallery/trailer-side-closed.jpg",
  "photo_2026-08-10_09-54-42.jpg": "gallery/delivery-flatbed.jpg",
  "photo_2026-08-10_09-54-48.jpg": "gallery/fleet-row-grass.jpg",
  "photo_2026-08-10_09-54-54.jpg": "gallery/vacuum-tanker.jpg",
  // photo_2026-08-10_09-55-05.jpg is the company vision graphic, not a photograph —
  // deliberately left out of the gallery. See ASSETS.md.
};

/**
 * Finds the content box by walking in from each edge while rows/columns stay
 * essentially black. Uses a small threshold rather than pure zero because JPEG
 * compression leaves the bars slightly noisy.
 */
async function contentBox(image) {
  const { width, height } = await image.metadata();
  const { data, info } = await image
    .clone()
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const THRESHOLD = 18; // 0–255; above this a pixel counts as picture, not bar
  const at = (x, y) => data[y * info.width + x];

  const rowIsBar = (y) => {
    for (let x = 0; x < info.width; x += 4) if (at(x, y) > THRESHOLD) return false;
    return true;
  };
  const colIsBar = (x) => {
    for (let y = 0; y < info.height; y += 4) if (at(x, y) > THRESHOLD) return false;
    return true;
  };

  let top = 0;
  let bottom = info.height - 1;
  let left = 0;
  let right = info.width - 1;

  while (top < bottom && rowIsBar(top)) top++;
  while (bottom > top && rowIsBar(bottom)) bottom--;
  while (left < right && colIsBar(left)) left++;
  while (right > left && colIsBar(right)) right--;

  const scaleX = width / info.width;
  const scaleY = height / info.height;

  return {
    left: Math.round(left * scaleX),
    top: Math.round(top * scaleY),
    width: Math.round((right - left + 1) * scaleX),
    height: Math.round((bottom - top + 1) * scaleY),
  };
}

const entries = await fs.readdir(INBOX).catch(() => []);
const present = entries.filter((name) => name in MAP);
const missing = Object.keys(MAP).filter((name) => !entries.includes(name));
const unknown = entries.filter(
  (name) => !(name in MAP) && /\.(jpe?g|png|webp)$/i.test(name),
);

if (present.length === 0) {
  console.log(`No recognised photos in ./${INBOX}. Expected any of:\n  ${Object.keys(MAP).join("\n  ")}`);
  process.exit(0);
}

for (const name of present) {
  const src = path.join(INBOX, name);
  const dest = path.join(OUT_ROOT, MAP[name]);
  await fs.mkdir(path.dirname(dest), { recursive: true });

  const image = sharp(src).rotate(); // honour EXIF orientation from phone cameras
  const before = await image.metadata();
  const box = await contentBox(image);
  const cropped = box.width !== before.width || box.height !== before.height;

  await image
    .extract(box)
    .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: QUALITY, progressive: true, mozjpeg: true })
    .toFile(dest);

  const out = await fs.stat(dest);
  const kb = (n) => `${Math.round(n / 1024)}KB`;
  console.log(
    `${name}\n  → ${MAP[name]}  ${before.width}×${before.height} ${kb((await fs.stat(src)).size)}` +
      `${cropped ? `  [cropped bars → ${box.width}×${box.height}]` : ""}` +
      `  →  ${kb(out.size)}`,
  );
}

if (unknown.length) console.log(`\nIgnored (name not in the map): ${unknown.join(", ")}`);
if (missing.length) console.log(`\nStill waiting for: ${missing.join(", ")}`);
