"use client";

import { ArrowRight, Info, Minus, Plus, Users } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { getArt } from "@/components/art";
import { buttonVariants } from "@/components/ui/button";
import { formatCedis } from "@/lib/format";
import {
  durationOptions,
  GUESTS_MAX,
  GUESTS_MIN,
  sizeEvent,
  type Duration,
  type Finish,
} from "@/lib/sizing";
import { cn } from "@/lib/utils";
import type { Unit } from "@/types";

const presets = [80, 200, 500, 1200];

function Toggle({
  checked,
  onChange,
  label,
  hint,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
  hint: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "flex items-start gap-3 rounded-xl border p-4 text-left transition-colors",
        checked ? "border-brand bg-brand-soft" : "bg-card hover:border-brand/40",
      )}
    >
      <span
        aria-hidden
        className={cn(
          "mt-0.5 flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition-colors",
          checked ? "bg-brand" : "bg-border",
        )}
      >
        <span
          className={cn(
            "size-4 rounded-full bg-white shadow-sm transition-transform",
            checked && "translate-x-4",
          )}
        />
      </span>
      <span>
        <span className="block text-sm font-semibold">{label}</span>
        <span className="mt-0.5 block text-xs text-muted-foreground">{hint}</span>
      </span>
    </button>
  );
}

/**
 * The question every enquiry starts with — "how many do I need?" — answered on the
 * page instead of by email. It doubles as the top of the quote funnel: the result
 * hands its recommended mix straight to the quote form.
 */
export function SizingCalculator({ units }: { units: Unit[] }) {
  const [guests, setGuests] = useState(200);
  const [duration, setDuration] = useState<Duration>("half");
  const [drinks, setDrinks] = useState(true);
  const [catering, setCatering] = useState(true);
  const [finish, setFinish] = useState<Finish>("standard");

  const unitBySlug = useMemo(
    () => new Map(units.map((unit) => [unit.slug, unit])),
    [units],
  );

  const result = useMemo(
    () => sizeEvent({ guests, duration, drinks, catering, finish }),
    [guests, duration, drinks, catering, finish],
  );

  const dayTotal = result.lines.reduce((total, line) => {
    const rate = unitBySlug.get(line.slug)?.pricing.perDay ?? 0;
    return total + rate * line.count;
  }, 0);

  const quoteHref = `/quote?units=${result.lines.map((line) => line.slug).join(",")}&guests=${guests}`;

  function nudge(delta: number) {
    setGuests((current) =>
      Math.min(GUESTS_MAX, Math.max(GUESTS_MIN, current + delta)),
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.05fr] lg:gap-8">
      {/* ---------------- controls ---------------- */}
      <div className="card-surface rounded-3xl p-6 sm:p-8">
        <label htmlFor="guests-range" className="text-sm font-semibold">
          How many guests?
        </label>

        <div className="mt-4 flex items-center gap-3">
          <button
            type="button"
            onClick={() => nudge(-25)}
            aria-label="Fewer guests"
            className="flex size-10 shrink-0 items-center justify-center rounded-xl border bg-card transition-colors hover:border-brand/40 hover:text-brand"
          >
            <Minus className="size-4" aria-hidden />
          </button>

          <div className="flex-1 text-center">
            <span className="tabular font-heading text-4xl font-extrabold text-brand-ink sm:text-5xl">
              {guests.toLocaleString("en-GH")}
            </span>
            <span className="mt-1 block text-xs text-muted-foreground">guests expected</span>
          </div>

          <button
            type="button"
            onClick={() => nudge(25)}
            aria-label="More guests"
            className="flex size-10 shrink-0 items-center justify-center rounded-xl border bg-card transition-colors hover:border-brand/40 hover:text-brand"
          >
            <Plus className="size-4" aria-hidden />
          </button>
        </div>

        <input
          id="guests-range"
          type="range"
          min={GUESTS_MIN}
          max={GUESTS_MAX}
          step={25}
          value={guests}
          onChange={(event) => setGuests(Number(event.target.value))}
          className="mt-5 h-2 w-full cursor-pointer appearance-none rounded-full bg-secondary accent-brand outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        />

        <div className="mt-4 flex flex-wrap gap-2">
          {presets.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => setGuests(preset)}
              className={cn(
                "rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors",
                guests === preset
                  ? "border-brand bg-brand text-white"
                  : "bg-card text-muted-foreground hover:border-brand/40 hover:text-foreground",
              )}
            >
              {preset.toLocaleString("en-GH")}
            </button>
          ))}
        </div>

        <fieldset className="mt-8">
          <legend className="text-sm font-semibold">How long is the programme?</legend>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {durationOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setDuration(option.id)}
                aria-pressed={duration === option.id}
                className={cn(
                  "rounded-xl border p-3 text-left transition-colors",
                  duration === option.id
                    ? "border-brand bg-brand-soft"
                    : "bg-card hover:border-brand/40",
                )}
              >
                <span className="block text-sm font-semibold">{option.label}</span>
                <span className="mt-0.5 block text-[0.7rem] text-muted-foreground">
                  {option.hint}
                </span>
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="mt-8">
          <legend className="text-sm font-semibold">What is being served?</legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <Toggle
              checked={drinks}
              onChange={setDrinks}
              label="Drinks"
              hint="Raises peak demand sharply"
            />
            <Toggle
              checked={catering}
              onChange={setCatering}
              label="Food"
              hint="Adds hand-washing stations"
            />
          </div>
        </fieldset>

        <fieldset className="mt-8">
          <legend className="text-sm font-semibold">What standard?</legend>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {(
              [
                { id: "standard", label: "Practical", hint: "Standard cubicles" },
                { id: "premium", label: "Premium", hint: "Restroom trailers" },
              ] as const
            ).map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setFinish(option.id)}
                aria-pressed={finish === option.id}
                className={cn(
                  "rounded-xl border p-3 text-left transition-colors",
                  finish === option.id
                    ? "border-brand bg-brand-soft"
                    : "bg-card hover:border-brand/40",
                )}
              >
                <span className="block text-sm font-semibold">{option.label}</span>
                <span className="mt-0.5 block text-[0.7rem] text-muted-foreground">
                  {option.hint}
                </span>
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      {/* ---------------- result ---------------- */}
      <div className="relative overflow-hidden rounded-3xl bg-brand-ink text-white shadow-pop">
        <div className="bg-glow absolute inset-0 opacity-70" aria-hidden />
        <div className="bg-grain absolute inset-0" aria-hidden />

        <div className="relative p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
            Our recommendation
          </p>
          <h3 className="mt-2 font-heading text-2xl font-bold">
            {result.capacity} {result.capacity === 1 ? "facility" : "facilities"} for{" "}
            {guests.toLocaleString("en-GH")} guests
          </h3>
          <p className="mt-2 flex items-center gap-1.5 text-sm text-white/55">
            <Users className="size-3.5" aria-hidden />
            Sized for {result.effectiveGuests.toLocaleString("en-GH")} effective users at peak
          </p>

          <ul className="mt-6 space-y-2.5">
            {result.lines.map((line) => {
              const unit = unitBySlug.get(line.slug);
              if (!unit) return null;
              const art = unit.images[0]?.art;
              const Art = art ? getArt(art).Art : null;

              return (
                <li
                  key={line.slug}
                  className="edge-light flex items-center gap-4 rounded-2xl bg-white/8 p-3 pr-4 backdrop-blur-sm"
                >
                  <span className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white/90 p-1">
                    {Art ? <Art /> : null}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold">
                      <span className="tabular text-fresh">{line.count}×</span> {unit.name}
                    </span>
                    <span className="mt-0.5 block text-xs leading-snug text-white/55">
                      {line.reason}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>

          {dayTotal > 0 ? (
            <div className="mt-6 flex items-end justify-between gap-4 border-t border-white/10 pt-5">
              <div>
                <p className="text-xs text-white/45">Indicative, per day, in Accra</p>
                <p className="tabular font-heading text-3xl font-extrabold">
                  {formatCedis(dayTotal)}
                </p>
              </div>
              <p className="max-w-[14rem] text-right text-[0.7rem] leading-snug text-white/40">
                Delivery, set-up, consumables and pump-out included
              </p>
            </div>
          ) : null}

          {result.notes.length ? (
            <ul className="mt-5 space-y-2">
              {result.notes.map((note) => (
                <li key={note} className="flex items-start gap-2 text-xs leading-relaxed text-white/50">
                  <Info className="mt-0.5 size-3.5 shrink-0 text-fresh" aria-hidden />
                  {note}
                </li>
              ))}
            </ul>
          ) : null}

          <Link
            href={quoteHref}
            className={cn(
              buttonVariants(),
              "mt-7 h-12 w-full bg-white text-base font-semibold text-brand-ink hover:bg-white/90",
            )}
          >
            Get this quoted
            <ArrowRight aria-hidden />
          </Link>
          <p className="mt-3 text-center text-[0.7rem] text-white/35">
            A guide, not a quote — we confirm the final mix with you before anything is booked.
          </p>
        </div>
      </div>
    </div>
  );
}
