"use client";

import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";
import type { GalleryCategory, GalleryPhoto } from "@/types";

const filters: { id: GalleryCategory | "all"; label: string }[] = [
  { id: "all", label: "Everything" },
  { id: "trailers", label: "The trailers" },
  { id: "interiors", label: "Inside" },
  { id: "on-site", label: "On site" },
  { id: "servicing", label: "Delivery & servicing" },
];

/**
 * Masonry gallery with a lightbox.
 *
 * CSS columns rather than a fixed grid: the photos are a mix of portrait, landscape
 * and near-square, and a uniform grid would centre-crop most of them. Columns let
 * every frame keep its real proportions, which is the difference between a gallery
 * that looks composed and one that looks like a spreadsheet of thumbnails.
 */
export function GalleryGrid({ photos }: { photos: GalleryPhoto[] }) {
  const [filter, setFilter] = useState<GalleryCategory | "all">("all");
  const [active, setActive] = useState<number | null>(null);

  const shown = useMemo(
    () => (filter === "all" ? photos : photos.filter((p) => p.category === filter)),
    [filter, photos],
  );

  const counts = useMemo(() => {
    const map = new Map<string, number>([["all", photos.length]]);
    for (const photo of photos) {
      map.set(photo.category, (map.get(photo.category) ?? 0) + 1);
    }
    return map;
  }, [photos]);

  const current = active === null ? null : (shown[active] ?? null);

  function step(delta: number) {
    setActive((index) =>
      index === null ? null : (index + delta + shown.length) % shown.length,
    );
  }

  function changeFilter(next: GalleryCategory | "all") {
    setFilter(next);
    // Indices refer to the filtered list, so a stale one would open the wrong photo.
    setActive(null);
  }

  return (
    <>
      {/* ---------- filters ---------- */}
      <div className="flex flex-wrap gap-2">
        {filters.map((item) => {
          const count = counts.get(item.id) ?? 0;
          if (count === 0) return null;
          const on = filter === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => changeFilter(item.id)}
              aria-pressed={on}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                on
                  ? "border-brand bg-brand text-white"
                  : "bg-card text-muted-foreground hover:border-brand/40 hover:text-foreground",
              )}
            >
              {item.label}
              <span className={cn("tabular text-xs", on ? "text-white/70" : "text-muted-foreground/70")}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ---------- masonry ---------- */}
      <div className="mt-10 gap-4 [column-fill:balance] sm:columns-2 lg:columns-3">
        {shown.map((photo, index) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => setActive(index)}
            className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl border bg-secondary text-left shadow-raise transition-shadow hover:shadow-lift focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={900}
              height={1200}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="h-auto w-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
            />

            {/* hover scrim + caption */}
            <span className="pointer-events-none absolute inset-0 bg-linear-to-t from-brand-ink/75 via-brand-ink/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" />
            <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
              <span className="text-sm leading-snug font-medium text-white drop-shadow">
                {photo.caption ?? photo.alt}
              </span>
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm">
                <Expand className="size-4" aria-hidden />
              </span>
            </span>
          </button>
        ))}
      </div>

      {/* ---------- lightbox ---------- */}
      {current ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
          tabIndex={-1}
          // Takes focus on open so Escape and the arrow keys below reach it.
          autoFocus
          onKeyDown={(event) => {
            if (event.key === "Escape") setActive(null);
            if (event.key === "ArrowRight") step(1);
            if (event.key === "ArrowLeft") step(-1);
          }}
          className="fixed inset-0 z-100 flex flex-col bg-brand-deep/95 backdrop-blur-md outline-none"
        >
          {/* click-away */}
          <button
            type="button"
            aria-label="Close gallery"
            onClick={() => setActive(null)}
            className="absolute inset-0 cursor-zoom-out"
          />

          <div className="pointer-events-none relative flex items-center justify-between p-4 text-white sm:p-6">
            <span className="tabular rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium backdrop-blur-sm">
              {active !== null ? active + 1 : 0} / {shown.length}
            </span>
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label="Close"
              className="pointer-events-auto flex size-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              <X className="size-5" aria-hidden />
            </button>
          </div>

          <div className="pointer-events-none relative flex flex-1 items-center justify-center px-4 pb-4 sm:px-6">
            <div className="pointer-events-auto relative max-h-full">
              <Image
                src={current.src}
                alt={current.alt}
                width={1400}
                height={1400}
                sizes="90vw"
                className="max-h-[70vh] w-auto rounded-xl object-contain shadow-pop"
                priority
              />
            </div>
          </div>

          <div className="pointer-events-none relative px-4 pb-6 sm:px-6">
            <div className="mx-auto flex max-w-2xl items-center gap-4">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous photo"
                className="pointer-events-auto flex size-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                <ChevronLeft className="size-5" aria-hidden />
              </button>

              <p className="flex-1 text-center text-sm leading-relaxed text-white/75">
                {current.caption ?? current.alt}
              </p>

              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next photo"
                className="pointer-events-auto flex size-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                <ChevronRight className="size-5" aria-hidden />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
