import { areas } from "@/data/areas";
import { deployments } from "@/data/deployments";
import { faqs } from "@/data/faqs";
import { services } from "@/data/services";
import { units } from "@/data/units";
import { PRICING_CONFIRMED } from "@/lib/site";
import type { Deployment, Faq, Service, ServiceArea, Unit } from "@/types";

/**
 * Every read the UI performs goes through this module — pages never import from
 * `@/data` directly. When a real CMS or backend lands, only this file changes.
 *
 * Two safety gates live here rather than in the components, so there is exactly one
 * place that can leak unconfirmed content to a visitor:
 *   - prices are blanked to "On request" until the owner signs off the rate card
 *   - past work is filtered to entries the owner has confirmed really happened
 */

/** Blanks placeholder rates so they can never reach a page before sign-off. */
function withSafePricing(unit: Unit): Unit {
  if (PRICING_CONFIRMED) return unit;
  return {
    ...unit,
    pricing: {
      perDay: null,
      perWeek: null,
      purchase: null,
      note: "Rates are quoted per event — send us your details and we come back the same working day.",
    },
  };
}

export async function getUnits(): Promise<Unit[]> {
  return units.map(withSafePricing);
}

export async function getFeaturedUnits(): Promise<Unit[]> {
  return units.filter((unit) => unit.featured).map(withSafePricing);
}

export async function getUnit(slug: string): Promise<Unit | null> {
  const unit = units.find((entry) => entry.slug === slug);
  return unit ? withSafePricing(unit) : null;
}

export async function getUnitSlugs(): Promise<string[]> {
  return units.map((unit) => unit.slug);
}

export async function getRelatedUnits(slug: string, limit = 3): Promise<Unit[]> {
  const current = units.find((unit) => unit.slug === slug);
  if (!current) return units.slice(0, limit).map(withSafePricing);

  const sameCategory = units.filter(
    (unit) => unit.slug !== slug && unit.category === current.category,
  );
  const others = units.filter(
    (unit) => unit.slug !== slug && unit.category !== current.category,
  );

  return [...sameCategory, ...others].slice(0, limit).map(withSafePricing);
}

export async function getServices(): Promise<Service[]> {
  return services;
}

export async function getService(slug: string): Promise<Service | null> {
  return services.find((service) => service.slug === slug) ?? null;
}

/** Only jobs the owner has confirmed. See the warning in src/data/deployments.ts. */
export async function getDeployments(): Promise<Deployment[]> {
  return deployments.filter((deployment) => deployment.verified);
}

export async function getFaqs(limit?: number): Promise<Faq[]> {
  return typeof limit === "number" ? faqs.slice(0, limit) : faqs;
}

export async function getAreas(): Promise<ServiceArea[]> {
  return areas;
}

export async function getArea(slug: string): Promise<ServiceArea | null> {
  return areas.find((area) => area.slug === slug) ?? null;
}

export async function getAreaSlugs(): Promise<string[]> {
  return areas.map((area) => area.slug);
}
