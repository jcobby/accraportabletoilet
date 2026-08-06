import { Factory, Recycle, ShieldCheck, Truck } from "lucide-react";
import type { Metadata } from "next";

import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { Media } from "@/components/media";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Container, Section, SectionHeading } from "@/components/shell";
import { breadcrumbSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us — A Ghanaian Portable Toilet Manufacturer",
  description:
    "Accra Portable Toilets builds, hires, sells and services portable sanitation in Ghana. Meet the company behind the units at weddings, marathons and national events.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    icon: Factory,
    title: "Built here, not imported",
    body: "Our units are fabricated in our own workshop in Accra. Nothing waits on a shipment, spares are always in stock, and a damaged panel is repaired in days rather than months.",
  },
  {
    icon: ShieldCheck,
    title: "Dignity is the point",
    body: "A portable toilet should not feel like a punishment. Proper lighting, a working lock, a mirror, running water and a clean floor cost very little and change how a guest feels about your whole event.",
  },
  {
    icon: Truck,
    title: "We turn up early",
    body: "Deliveries land before the date, not on it. Set-up, levelling and testing all happen while there is still time to fix anything unexpected.",
  },
  {
    icon: Recycle,
    title: "Waste goes where it should",
    body: "We pump out with our own crew and dispose at a licensed treatment facility. Sanitation that ends in a gutter is not sanitation.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
        ])}
      />

      <PageHero
        eyebrow="About us"
        title="A Ghanaian manufacturer that happens to run a rental fleet"
        lead="Most portable toilet suppliers buy units and hire them out. We build ours — which changes what we can promise you."
        crumbs={[
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
        ]}
      />

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
              <p>
                {site.name} started with a straightforward observation: Ghana holds an enormous
                number of outdoor programmes — weddings, funerals, festivals, church conventions,
                marathons, rallies — and almost none of the venues have enough toilets for the
                crowds that show up.
              </p>
              <p>
                The usual answer was a handful of tired plastic cubicles that organisers were
                embarrassed to point guests toward. We thought the answer should be facilities
                people are happy to walk into: lit, locked, ventilated, with running water and a
                mirror, and clean at the end of the night as well as the start.
              </p>
              <p>
                So we built them. Our workshop fabricates restroom trailers, VIP cabins, accessible
                units, urinal stations and hand-washing stands, and that same workshop maintains
                every unit that goes out on hire. When something needs modifying for a particular
                venue — a different ramp, a narrower footprint, event branding on the shell — we do
                it in-house.
              </p>
              <p>
                Today our units stand at private weddings in East Legon, at business forums in
                Kwahu, along marathon routes, on construction sites, and at national occasions in
                the middle of Accra. The brief never changes: nobody should have to think about the
                toilets.
              </p>
            </div>

            <div className="space-y-4">
              <Media
                image={{
                  src: "",
                  alt: "Units under fabrication in the workshop",
                  ratio: "landscape",
                  art: "workshop",
                }}
                className="shadow-lift"
                sizes="(min-width: 1024px) 460px, 100vw"
              />
              <div className="grid grid-cols-2 gap-4">
                <Media
                  image={{
                    src: "",
                    alt: "Crew delivering units to an event ground",
                    ratio: "square",
                    art: "delivery",
                  }}
                  className="shadow-raise"
                  sizes="(min-width: 1024px) 220px, 50vw"
                />
                <Media
                  image={{
                    src: "",
                    alt: "Finished trailer interior ready for handover",
                    ratio: "square",
                    art: "interior",
                  }}
                  className="shadow-raise"
                  sizes="(min-width: 1024px) 220px, 50vw"
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="muted">
        <Container>
          <SectionHeading
            eyebrow="How we work"
            title="Four things we do not compromise on"
            align="center"
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={index * 0.06} className="h-full">
                <div className="flex h-full gap-4 rounded-2xl border bg-background p-6">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
                    <value.icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-heading text-base font-bold">{value.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {value.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Come and see the units"
        lead="If you are planning something significant, visit the yard and look at the trailers before you commit. Call ahead and we will have them open."
      />
    </>
  );
}
