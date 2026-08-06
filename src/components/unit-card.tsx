import { ArrowRight, Users } from "lucide-react";
import Link from "next/link";

import { Media } from "@/components/media";
import { formatCedis } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Unit } from "@/types";

export function UnitCard({ unit, className }: { unit: Unit; className?: string }) {
  return (
    <article
      className={cn(
        "card-surface group relative flex flex-col overflow-hidden rounded-2xl hover:-translate-y-1",
        className,
      )}
    >
      <div className="relative overflow-hidden">
        <Media
          image={{ ...unit.images[0], ratio: "landscape" }}
          frameless
          className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
        />
        {unit.popular ? (
          <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-brand-ink/90 px-2.5 py-1 text-[0.65rem] font-bold tracking-wide text-white uppercase backdrop-blur-sm">
            Most requested
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-heading text-lg leading-snug font-bold">
          <Link
            href={`/fleet/${unit.slug}`}
            className="after:absolute after:inset-0 focus-visible:outline-none"
          >
            {unit.name}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{unit.summary}</p>

        <p className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <Users className="size-3.5 text-brand" aria-hidden />
          {unit.capacity}
        </p>

        <div className="mt-4 flex items-end justify-between gap-3 border-t pt-4">
          <div>
            <p className="text-[0.7rem] font-medium tracking-wider text-muted-foreground uppercase">
              From
            </p>
            <p className="tabular font-heading text-xl font-extrabold text-brand-ink">
              {unit.pricing.perDay === null ? (
                "On request"
              ) : (
                <>
                  {formatCedis(unit.pricing.perDay)}
                  <span className="text-sm font-medium text-muted-foreground"> / day</span>
                </>
              )}
            </p>
          </div>
          <span className="inline-flex size-9 items-center justify-center rounded-full bg-brand-soft text-brand transition-all duration-300 group-hover:bg-brand group-hover:text-white">
            <ArrowRight className="size-4" aria-hidden />
            <span className="sr-only">See details</span>
          </span>
        </div>
      </div>
    </article>
  );
}
