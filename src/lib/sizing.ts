/**
 * Event sizing model.
 *
 * Pure functions, no React — the numbers are the product here, so they live apart
 * from the UI that draws them.
 *
 * The base ratio (one cubicle per 75 guests for a six-hour event with drinks served)
 * is the standard planning figure the industry works to. Everything else scales off
 * it. These are recommendations, not promises: the UI must always say so.
 */

export type Duration = "short" | "half" | "long" | "allday";
export type Finish = "standard" | "premium";

export interface SizingInput {
  guests: number;
  duration: Duration;
  drinks: boolean;
  catering: boolean;
  finish: Finish;
}

export interface SizingLine {
  slug: string;
  count: number;
  reason: string;
}

export interface SizingResult {
  lines: SizingLine[];
  /** Cubicle-equivalents of capacity the recommendation provides. */
  capacity: number;
  effectiveGuests: number;
  notes: string[];
}

const durationFactor: Record<Duration, number> = {
  short: 0.85,
  half: 1,
  long: 1.2,
  allday: 1.4,
};

export const durationOptions: { id: Duration; label: string; hint: string }[] = [
  { id: "short", label: "Up to 4 hrs", hint: "Short ceremony or briefing" },
  { id: "half", label: "5 – 6 hrs", hint: "Typical reception" },
  { id: "long", label: "7 – 8 hrs", hint: "Long programme" },
  { id: "allday", label: "All day", hint: "Sunrise to close" },
];

export const GUESTS_MIN = 25;
export const GUESTS_MAX = 5000;

export const SLUGS = {
  cubicle: "standard-portable-toilet",
  trailer3: "executive-3-door-restroom-trailer",
  trailer2: "luxury-2-door-restroom-trailer",
  accessible: "accessible-unit",
  urinal: "four-bay-urinal-station",
  handwash: "hand-washing-station",
} as const;

export function sizeEvent({
  guests,
  duration,
  drinks,
  catering,
  finish,
}: SizingInput): SizingResult {
  const safeGuests = Math.min(Math.max(Math.round(guests), GUESTS_MIN), GUESTS_MAX);
  const effectiveGuests = Math.round(
    safeGuests * durationFactor[duration] * (drinks ? 1.25 : 1),
  );

  // A urinal station absorbs the male traffic that would otherwise queue for a
  // cubicle, so it buys back roughly one cubicle of capacity each.
  const urinals = Math.floor(effectiveGuests / 500);
  const rawCubicles = Math.ceil(effectiveGuests / 75);
  let cubicles = Math.max(1, rawCubicles - urinals);

  const accessible = safeGuests >= 100 ? Math.max(1, Math.round(safeGuests / 800)) : 0;
  cubicles = Math.max(1, cubicles - accessible);

  const lines: SizingLine[] = [];
  const notes: string[] = [];

  if (finish === "premium") {
    // Trade cubicles for trailer cubicles, largest unit first.
    const trailer3 = Math.floor(cubicles / 3);
    const remainder = cubicles - trailer3 * 3;
    const trailer2 = remainder === 2 ? 1 : 0;
    const leftover = remainder === 1 ? 1 : 0;

    if (trailer3 > 0) {
      lines.push({
        slug: SLUGS.trailer3,
        count: trailer3,
        reason: "Three private cubicles each, with flushing WCs and basins",
      });
    }
    if (trailer2 > 0) {
      lines.push({
        slug: SLUGS.trailer2,
        count: trailer2,
        reason: "Covers the remainder without paying for a third cubicle",
      });
    }
    if (leftover > 0) {
      lines.push({
        slug: trailer3 > 0 ? SLUGS.cubicle : SLUGS.trailer2,
        count: 1,
        reason: trailer3 > 0 ? "Overflow unit for peak moments" : "Two cubicles for this headcount",
      });
    }
    if (trailer3 === 0 && trailer2 === 0 && leftover === 0) {
      lines.push({
        slug: SLUGS.trailer2,
        count: 1,
        reason: "Smallest trailer covers this headcount comfortably",
      });
    }
    notes.push(
      "Trailers need a 230V point within about 25m, or add a silent generator to the quote.",
    );
  } else {
    lines.push({
      slug: SLUGS.cubicle,
      count: cubicles,
      reason: `About one cubicle per 75 guests, adjusted for a ${
        duration === "allday" ? "full day" : "shorter programme"
      }`,
    });
  }

  if (urinals > 0) {
    lines.push({
      slug: SLUGS.urinal,
      count: urinals,
      reason: "Absorbs male traffic — the cheapest way to shorten the queue",
    });
  }

  if (accessible > 0) {
    lines.push({
      slug: SLUGS.accessible,
      count: accessible,
      reason: "Step-free access for wheelchair users, elderly and pregnant guests",
    });
  }

  if (catering) {
    lines.push({
      slug: SLUGS.handwash,
      count: Math.max(1, Math.ceil(cubicles / 3)),
      reason: "Running water where food is served",
    });
  }

  if (drinks) {
    notes.push("Drinks service roughly doubles peak demand in the hour after speeches.");
  }
  if (safeGuests >= 1000) {
    notes.push("At this size we would split the units across two locations on the ground.");
  }
  if (duration === "allday") {
    notes.push("An all-day programme wants at least one mid-event servicing visit.");
  }

  const capacity = lines.reduce((total, line) => {
    if (line.slug === SLUGS.trailer3) return total + line.count * 3;
    if (line.slug === SLUGS.trailer2) return total + line.count * 2;
    if (line.slug === SLUGS.handwash) return total;
    return total + line.count;
  }, 0);

  return { lines, capacity, effectiveGuests, notes };
}
