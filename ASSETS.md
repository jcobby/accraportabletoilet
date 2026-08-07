# Swapping illustrations for real photos

Every image on this site is described in data, not hard-coded into a page. Until a
real photo is supplied, the `Media` component (`src/components/media.tsx`) draws a
**custom illustration** of that unit or scene. The site is not waiting on the photo
shoot to look finished — and when the photos arrive, each one is a one-line change
with no layout shift.

## The shape

```ts
{
  src: "",                    // photo path once it exists
  alt: "Executive 3-door trailer lit up at an evening event",
  ratio: "landscape",         // "landscape" (4:3) | "portrait" (3:4) | "square"
  art: "event-night",         // illustration drawn until `src` is filled in
}
```

Resolution order: `src` wins if set → otherwise `art` is drawn → otherwise a dashed
placeholder captioned with `alt`.

## The illustration set

Defined in `src/components/art/`. `parts.tsx` holds the shared pieces (ground shadow,
turf mat, wheels, steps, gradients); `illustrations.tsx` composes them; `index.tsx` is
the registry that maps a key to a component.

| Key | Draws |
| --- | --- |
| `trailer-3` / `trailer-2` | Restroom trailers, 3-door and 2-door |
| `cabin` | VIP luxury cabin |
| `cubicle` / `cubicle-row` | Single standard cubicle / a bank of three |
| `accessible` | Ramped accessible unit |
| `urinal` | 4-bay urinal station |
| `handwash` | Twin-basin hand-washing station |
| `shower` | Shower unit |
| `interior` | Cutaway interior — WC, basin, mirror |
| `event-night` | Trailer at an evening event (dark panel) |
| `workshop` | Half-clad unit under fabrication |
| `delivery` | Pickup towing a trailer |

All are drawn on one 400×300 stage so they share an eye level, a light direction and a
stroke weight. They are fitted inside their slot, never cropped, so they hold up at any
aspect ratio. Colours come from the CSS brand tokens, so re-theming the site re-themes
the artwork.

To add one: draw it in `illustrations.tsx` using the shared parts, then register it in
`index.tsx`. The `ArtKey` type updates automatically and TypeScript will accept the new
key in any data file.

## To add new photos

1. Put the original in `photos-inbox/`.
2. Add a line to `MAP` in `scripts/import-photos.mjs` pointing it at its destination.
3. Run `npm run photos`.

The script honours EXIF rotation, **crops black letterbox bars off screenshots and
video frames**, caps the long edge at 1800px and re-encodes as progressive JPEG. It
always works from the originals, so re-running never degrades quality. Originals stay
in `photos-inbox/`, which is gitignored — they belong in the client's storage, not the
repo.

Then set `src` on the matching entry in `src/data/*` and tighten the `alt` text:

```ts
{ src: "/images/units/executive-3-door-restroom-trailer/lawn.jpg", alt: "…", ratio: "landscape" }
```

`next/image` takes over from there — sizing, lazy loading and format conversion are
already wired up.

> **Identify each photo by what is in frame, not by its filename.** The first batch
> arrived numbered `photo_1`…`photo_7` in an order that did not match how they were
> sent. Getting it wrong puts a 2-door trailer on the 3-door product page.

## Photos currently in place

| Unit | Shots |
| --- | --- |
| Executive 3-door trailer | on a lawn, and in use at an event |
| Luxury 2-door trailer | garden compound, rear corner, kerbside — no illustration left |
| Standard cubicle | two interiors (blue and tan units) |

## Video

`public/video/trailer-interior.mp4` — a 4.8s silent walkthrough of a trailer interior,
shown on the home page and on both trailer product pages via `VideoLoop`
(`src/components/video-loop.tsx`).

It was encoded from the phone original with:

```bash
ffmpeg -i original.MP4 -an -vcodec libx264 -profile:v main -crf 28 -preset slow \
  -pix_fmt yuv420p -movflags +faststart -y public/video/trailer-interior.mp4
ffmpeg -ss 2.2 -i original.MP4 -frames:v 1 -q:v 3 -y public/video/trailer-interior-poster.jpg
```

`ffmpeg` is available as a devDependency — `node -e "console.log(require('ffmpeg-static'))"`
prints the binary path.

That took 1,035KB → 304KB. The flags matter:

- `-an` strips the audio track. The clip is a silent walkthrough and autoplay requires
  muted anyway, so the audio was pure waste.
- `-movflags +faststart` moves the index to the front of the file so playback can begin
  before the whole thing has downloaded.
- A poster frame is always supplied, and `preload="none"` means nothing is fetched
  until playback starts — a visitor who scrolls past pays nothing.

To add another clip, follow the same recipe and pass `src`/`poster` to `VideoLoop`, or
set the optional `video` field on a unit in `src/data/units.ts` to have it appear under
that unit's gallery automatically.

## Still needed

1. **Confirmation of which trailer the interior clip shows.** It is currently captioned
   neutrally ("a restroom trailer") and used on both trailer pages, because nobody has
   confirmed whether it is the 3-door or the 2-door. Once known, tighten the copy — or
   split it if the two interiors differ.
2. **An exterior of a standard cubicle** — both cubicle photos are interiors, so the
   product card still uses a drawing.
3. VIP cabin, accessible unit, urinal station, hand-washing station, shower unit.
4. Workshop mid-build — this backs the "we manufacture our own" claim, which is the
   business's real differentiator.

Slots without a photograph keep their illustration, so nothing ever renders empty.

## Where the image lists live

| File | Images it controls |
| --- | --- |
| `src/data/units.ts` | Every fleet unit's gallery (`images: [...]` on each unit) |
| `src/data/deployments.ts` | The past-work cards on `/gallery` and the home page |
| `src/app/page.tsx` | The three hero images (inline, near the top) |
| `src/app/about/page.tsx` | The three About page images (inline) |
| `src/app/services/page.tsx` | One per service — see the `serviceArt` map at the top |

## Photo guidance

- **Landscape 4:3 for exteriors**, portrait 3:4 for interiors and single cabins.
- Aim for at least 1600px on the long edge; `next/image` scales down, never up.
- Shoot the trailers on the turf steps with the door open — the interior is what
  makes the sale, and a closed white box does not show it.
- Evening shots with the interior lighting on are the strongest images the company
  has; the hero slot is built for one.
- Compress before committing (Squoosh, TinyPNG). Nothing should exceed ~400KB.
