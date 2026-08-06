import type { Metadata } from "next";
import { Info } from "lucide-react";

import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Container, Section, SectionHeading } from "@/components/shell";
import { SizingCalculator } from "@/components/sizing-calculator";
import { UnitCard } from "@/components/unit-card";
import { getUnits } from "@/lib/api/catalogue";
import { breadcrumbSchema } from "@/lib/schema";
import { categoryLabels } from "@/data/units";
import type { Unit } from "@/types";

export const metadata: Metadata = {
  title: "Our Fleet — Portable Toilets & Restroom Trailers for Hire",
  description:
    "Restroom trailers, VIP cabins, standard cubicles, accessible units, urinal stations, hand-washing stations and showers — for hire or sale across Ghana. Indicative day rates shown.",
  alternates: { canonical: "/fleet" },
};

const order: Unit["category"][] = [
  "trailer",
  "cabin",
  "standard",
  "accessible",
  "urinal",
  "handwash",
  "shower",
];

export default async function FleetPage() {
  const units = await getUnits();

  const grouped = order
    .map((category) => ({
      category,
      label: categoryLabels[category],
      items: units.filter((unit) => unit.category === category),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Our fleet", href: "/fleet" },
        ])}
      />

      <PageHero
        eyebrow="Hire or buy"
        title="The full fleet, from a single cubicle to a three-door trailer"
        lead="Every unit below is built and maintained in our own workshop. Hire it for a day, take it on monthly site hire, or buy it outright."
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Our fleet", href: "/fleet" },
        ]}
      />

      <Section>
        <Container>
          <div className="flex items-start gap-3 rounded-xl border border-brand/20 bg-brand-soft p-4 text-sm leading-relaxed text-brand-ink/80">
            <Info className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
            <p>
              Rates are <strong className="font-semibold">indicative day rates for hire within
              Accra</strong>, including delivery, set-up, consumables and the end-of-hire pump-out.
              Multi-day, weekly and monthly hires cost less per day, and volume orders are cheaper
              per unit. Your written quote is the price that counts.
            </p>
          </div>

          <div className="mt-14 space-y-16">
            {grouped.map((group) => (
              <div key={group.category}>
                <div className="flex items-baseline justify-between gap-4 border-b pb-4">
                  <h2 className="font-heading text-xl font-bold sm:text-2xl">{group.label}</h2>
                  <span className="text-sm text-muted-foreground">
                    {group.items.length} {group.items.length === 1 ? "unit" : "units"}
                  </span>
                </div>

                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {group.items.map((unit, index) => (
                    <Reveal key={unit.slug} delay={index * 0.05} className="h-full">
                      <UnitCard unit={unit} className="h-full" />
                    </Reveal>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="tinted" id="sizer">
        <Container>
          <SectionHeading
            eyebrow="Not sure what to pick?"
            title="Size it in ten seconds"
            lead="Set your headcount and we will suggest the mix — then hand it straight to the quote form."
            align="center"
          />
          <div className="mt-12">
            <SizingCalculator units={units} />
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Prefer a human to check it?"
        lead="Send the headcount and how long the programme runs, and we will size it properly — over-ordering wastes your money and under-ordering makes queues."
      />
    </>
  );
}
