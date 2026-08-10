import { ArrowUpRight } from "lucide-react";

import { InstagramIcon } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * "There's more on Instagram" — the invitation to keep looking.
 *
 * Instagram is where this business actually posts: deliveries, set-ups, late-night
 * jobs. It is far more current than anything hand-maintained here, so it earns a
 * standing place on the pages where someone is already looking at the units.
 *
 * One component, two shapes, so it reads as the same invitation each time rather
 * than five slightly different hand-built links.
 */

/** The Instagram brand gradient, used only on the icon so it stays a guest here. */
const gradient = "bg-[linear-gradient(45deg,#F58529,#DD2A7B_45%,#8134AF_75%,#515BD4)]";

export function InstagramCta({
  variant = "band",
  headline = "There's a lot more on Instagram",
  body = "We post deliveries and set-ups as they happen — photos and video, including the late-night ones. It is more current than any page we could keep up to date.",
  className,
}: {
  variant?: "band" | "inline";
  headline?: string;
  body?: string;
  className?: string;
}) {
  if (variant === "inline") {
    return (
      <a
        href={site.social.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "group card-surface flex items-center gap-4 rounded-2xl p-4 sm:p-5",
          className,
        )}
      >
        <span
          className={cn(
            "flex size-11 shrink-0 items-center justify-center rounded-xl text-white",
            gradient,
          )}
        >
          <InstagramIcon className="size-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-semibold">More photos and video on Instagram</span>
          <span className="mt-0.5 block truncate text-xs text-muted-foreground">
            {site.social.instagramHandle}
          </span>
        </span>
        <ArrowUpRight
          className="size-5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
          aria-hidden
        />
      </a>
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border bg-card p-8 text-center shadow-raise sm:p-10",
        className,
      )}
    >
      {/* A wash of the brand gradient, kept faint so it never competes with the page */}
      <div
        aria-hidden
        className={cn("pointer-events-none absolute inset-0 opacity-[0.07]", gradient)}
      />

      <div className="relative">
        <span
          className={cn(
            "mx-auto flex size-14 items-center justify-center rounded-2xl text-white shadow-lift",
            gradient,
          )}
        >
          <InstagramIcon className="size-7" />
        </span>

        <h2 className="mt-5 font-heading text-2xl font-bold sm:text-3xl">{headline}</h2>
        <p className="mx-auto mt-3 max-w-lg text-base leading-relaxed text-muted-foreground">
          {body}
        </p>

        <a
          href={site.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            buttonVariants(),
            "mt-7 h-12 px-7 text-base font-semibold transition-transform hover:-translate-y-0.5",
          )}
        >
          <InstagramIcon className="size-5" />
          Follow {site.social.instagramHandle}
          <ArrowUpRight aria-hidden />
        </a>
      </div>
    </div>
  );
}
