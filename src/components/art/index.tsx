import {
  Accessible,
  Cabin,
  Cubicle,
  CubicleRow,
  Delivery,
  EventNight,
  Handwash,
  Interior,
  Shower,
  TrailerThree,
  TrailerTwo,
  Urinal,
  Workshop,
} from "./illustrations";

/**
 * Every illustration the site can draw. `tone` tells the frame whether to sit the
 * artwork on a light wash or a dark panel — night scenes need the dark one or the
 * glowing windows have nothing to glow against.
 */
const registry = {
  "trailer-3": { Art: TrailerThree, tone: "light" },
  "trailer-2": { Art: TrailerTwo, tone: "light" },
  cabin: { Art: Cabin, tone: "light" },
  cubicle: { Art: Cubicle, tone: "light" },
  "cubicle-row": { Art: CubicleRow, tone: "light" },
  accessible: { Art: Accessible, tone: "light" },
  urinal: { Art: Urinal, tone: "light" },
  handwash: { Art: Handwash, tone: "light" },
  shower: { Art: Shower, tone: "light" },
  interior: { Art: Interior, tone: "light" },
  "event-night": { Art: EventNight, tone: "night" },
  workshop: { Art: Workshop, tone: "light" },
  delivery: { Art: Delivery, tone: "light" },
} as const;

export type ArtKey = keyof typeof registry;

export type ArtTone = (typeof registry)[ArtKey]["tone"];

export function getArt(key: ArtKey) {
  return registry[key];
}

export function isArtKey(value: string): value is ArtKey {
  return value in registry;
}
