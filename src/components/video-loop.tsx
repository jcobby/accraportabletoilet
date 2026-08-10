"use client";

import { useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

/**
 * Short, silent clip.
 *
 * Deliberately conservative about data: the audio track is stripped at encode time,
 * `preload="none"` means nothing is fetched until playback actually begins, and a
 * poster frame stands in meanwhile — so a visitor on an expensive mobile connection
 * never silently pays for a video they scrolled past.
 *
 * `loop` (the default) suits a few seconds of ambience. Pass `loop={false}` for
 * anything with a beginning and an end: it swaps to click-to-play with controls,
 * because silently restarting a 54-second story halfway through is worse than not
 * playing it at all — and a multi-megabyte file should be the visitor's choice.
 *
 * Anyone who has asked for reduced motion always gets the poster with controls.
 */
export function VideoLoop({
  src,
  poster,
  label,
  loop = true,
  className,
}: {
  src: string;
  poster: string;
  /** Describes what the clip shows — this is the accessible name. */
  label: string;
  loop?: boolean;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const autoPlay = loop && !reduced;

  return (
    <video
      className={cn("h-full w-full object-cover", className)}
      src={src}
      poster={poster}
      aria-label={label}
      muted
      loop={loop}
      playsInline
      preload="none"
      autoPlay={autoPlay}
      controls={!autoPlay}
    />
  );
}
