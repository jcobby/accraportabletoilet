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

## To swap one in

1. Drop the file into `public/images/…`. Suggested layout:

   ```
   public/images/units/executive-3-door-restroom-trailer/01.jpg
   public/images/work/kwahu-business-forum.jpg
   public/images/about/workshop.jpg
   ```

2. Set `src` to the path **from the public root**, with a leading slash:

   ```ts
   { src: "/images/units/executive-3-door-restroom-trailer/01.jpg", alt: "…", ratio: "landscape" }
   ```

3. Tighten the `alt` text so it describes the actual photo.

That is the whole change. `next/image` takes over automatically — sizing, lazy
loading and format conversion are already wired up.

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
