"use client";

import { useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

/**
 * Short, silent, looping clip.
 *
 * Deliberately conservative about data: the audio track is stripped at encode time,
 * `preload="none"` means nothing is fetched until playback actually begins, and a
 * poster frame stands in meanwhile — so a visitor on an expensive mobile connection
 * never silently pays for a video they scrolled past.
 *
 * Anyone who has asked for reduced motion gets the poster with controls instead of an
 * autoplaying loop.
 */
export function VideoLoop({
  src,
  poster,
  label,
  className,
}: {
  src: string;
  poster: string;
  /** Describes what the clip shows — this is the accessible name. */
  label: string;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <video
      className={cn("h-full w-full object-cover", className)}
      src={src}
      poster={poster}
      aria-label={label}
      muted
      loop
      playsInline
      preload="none"
      autoPlay={!reduced}
      controls={Boolean(reduced)}
    />
  );
}
