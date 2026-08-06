import type { ArtKey } from "@/components/art";

export type UnitCategory =
  | "trailer"
  | "cabin"
  | "standard"
  | "accessible"
  | "urinal"
  | "handwash"
  | "shower";

export type HireMode = "rental" | "sale" | "both";

export interface UnitSpec {
  label: string;
  value: string;
}

export interface UnitPricing {
  /** Indicative day rate in GHS. Null means quote-only. */
  perDay: number | null;
  /** Indicative rate for a 7-day hire in GHS. */
  perWeek: number | null;
  /** Indicative outright purchase price in GHS. Null when not sold. */
  purchase: number | null;
  note?: string;
}

export interface Unit {
  slug: string;
  name: string;
  category: UnitCategory;
  mode: HireMode;
  tagline: string;
  summary: string;
  description: string[];
  /** Guest headcount the unit comfortably serves for a single-day event. */
  capacity: string;
  cubicles: number;
  features: string[];
  specs: UnitSpec[];
  bestFor: string[];
  requirements: string[];
  pricing: UnitPricing;
  images: GalleryImage[];
  featured: boolean;
  popular?: boolean;
}

export interface Service {
  slug: string;
  name: string;
  summary: string;
  description: string[];
  icon: string;
  points: string[];
}

export interface GalleryImage {
  /** Path under /public. Empty means "no photo yet" — fall back to `art`. */
  src: string;
  alt: string;
  /** Aspect of the slot. Photos are cropped to it; illustrations are fitted inside it. */
  ratio?: "square" | "landscape" | "portrait";
  /** Illustration to draw until a real photo is supplied. See src/components/art. */
  art?: ArtKey;
}

export interface Deployment {
  slug: string;
  title: string;
  client: string;
  location: string;
  year: string;
  category: string;
  units: string;
  summary: string;
  image: GalleryImage;
  /**
   * Has the business owner confirmed this job happened, and that they may publish
   * the client's name? Only `true` entries are ever rendered — see
   * `getDeployments()`. Never set this without the owner actually saying so.
   */
  verified: boolean;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface ServiceArea {
  slug: string;
  city: string;
  region: string;
  blurb: string;
  neighbourhoods: string[];
  leadTime: string;
  venues: string[];
}
