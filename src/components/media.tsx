import { ImageIcon } from "lucide-react";
import Image from "next/image";

import { getArt } from "@/components/art";
import { cn } from "@/lib/utils";
import type { GalleryImage } from "@/types";

const ratioClass = {
  square: "aspect-square",
  landscape: "aspect-4/3",
  portrait: "aspect-3/4",
} as const;

/**
 * One image slot, resolved in three tiers:
 *
 *   1. `src` set        → the real photograph, via next/image
 *   2. `art` set        → a drawn illustration of that unit or scene
 *   3. neither          → a labelled placeholder
 *
 * Tier 2 is why the site looks finished before the photo shoot: the illustrations are
 * real artwork sized to the same slots the photos will occupy, so dropping a photo in
 * later is a one-line change with no layout shift.
 *
 * Illustrations are laid out `contain`, never cropped — the frame supplies the wash,
 * the artwork floats inside it. That holds up at every aspect ratio.
 */
export function Media({
  image,
  className,
  sizes = "(min-width: 1024px) 33vw, 100vw",
  priority = false,
  frameless = false,
}: {
  image: GalleryImage;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Drop the rounded frame — for artwork bleeding to a card edge. */
  frameless?: boolean;
}) {
  const shape = ratioClass[image.ratio ?? "landscape"];
  const shell = cn("relative overflow-hidden", !frameless && "rounded-2xl", shape, className);

  if (image.src) {
    return (
      <div className={cn(shell, "bg-secondary")}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
    );
  }

  if (image.art) {
    const { Art, tone } = getArt(image.art);
    const night = tone === "night";

    return (
      <div
        role="img"
        aria-label={image.alt}
        className={cn(
          shell,
          "bg-grain",
          night
            ? "bg-brand-deep"
            : "bg-linear-to-br from-brand-soft via-white to-brand-tint/45",
        )}
      >
        {!night ? <div className="bg-grid absolute inset-0 opacity-70" aria-hidden /> : null}
        <div className="absolute inset-0 flex items-center justify-center p-[6%]">
          <Art />
        </div>
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={`Placeholder: ${image.alt}`}
      className={cn(
        shell,
        "flex flex-col items-center justify-center gap-3 border border-dashed border-brand/25 bg-brand-soft p-6 text-center",
      )}
    >
      <ImageIcon className="size-7 text-brand/40" aria-hidden />
      <p className="max-w-[26ch] text-xs leading-relaxed text-brand-ink/55">{image.alt}</p>
    </div>
  );
}
