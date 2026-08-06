import { Check, Clock, MapPin, Truck } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CtaBand } from "@/components/cta-band";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { Container, Eyebrow, Section, SectionHeading } from "@/components/shell";
import { UnitCard } from "@/components/unit-card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { getArea, getAreaSlugs, getAreas, getFaqs, getFeaturedUnits } from "@/lib/api/catalogue";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export async function generateStaticParams() {
  const slugs = await getAreaSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(props: PageProps<"/areas/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const area = await getArea(slug);

  if (!area) return { title: "Area not found" };

  return {
    title: `Portable Toilet Rental in ${area.city}`,
    description: `Hire portable toilets, restroom trailers and hand-washing stations in ${area.city}, ${area.region}. Delivery, set-up and servicing included. Call ${site.phone.display}.`,
    alternates: { canonical: `/areas/${area.slug}` },
    openGraph: {
      title: `Portable Toilet Rental in ${area.city} | ${site.name}`,
      description: area.blurb,
      url: `/areas/${area.slug}`,
    },
  };
}

export default async function AreaPage(props: PageProps<"/areas/[slug]">) {
  const { slug } = await props.params;
  const area = await getArea(slug);

  if (!area) notFound();

  const [units, faqs, allAreas] = await Promise.all([
    getFeaturedUnits(),
    getFaqs(5),
    getAreas(),
  ]);

  const others = allAreas.filter((entry) => entry.slug !== area.slug);

  return (
    <>
      <JsonLd
        data={[
          faqSchema(faqs),
          breadcrumbSchema([
            { name: "Home", href: "/" },
            { name: area.city, href: `/areas/${area.slug}` },
          ]),
        ]}
      />

      <PageHero
        eyebrow={area.region}
        title={`Portable toilet rental in ${area.city}`}
        lead={area.blurb}
        crumbs={[
          { name: "Home", href: "/" },
          { name: area.city, href: `/areas/${area.slug}` },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/quote" className={cn(buttonVariants(), "h-11 px-6 text-sm font-semibold")}>
            Get a quote for {area.city}
          </Link>
          <a
            href={site.phone.href}
            className={cn(buttonVariants({ variant: "outline" }), "h-11 bg-background px-6 text-sm")}
          >
            Call {site.phone.display}
          </a>
        </div>
      </PageHero>

      <Section>
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border bg-card p-6">
              <span className="flex size-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
                <Truck className="size-5" aria-hidden />
              </span>
              <h2 className="mt-4 font-heading text-base font-bold">Lead time</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{area.leadTime}</p>
            </div>

            <div className="rounded-2xl border bg-card p-6">
              <span className="flex size-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
                <MapPin className="size-5" aria-hidden />
              </span>
              <h2 className="mt-4 font-heading text-base font-bold">Areas we cover</h2>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {area.neighbourhoods.map((neighbourhood) => (
                  <li key={neighbourhood}>
                    <Badge variant="secondary" className="h-6 px-2.5 text-xs">
                      {neighbourhood}
                    </Badge>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border bg-card p-6">
              <span className="flex size-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
                <Clock className="size-5" aria-hidden />
              </span>
              <h2 className="mt-4 font-heading text-base font-bold">Typical venues</h2>
              <ul className="mt-3 space-y-2">
                {area.venues.map((venue) => (
                  <li key={venue} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="mt-0.5 size-3.5 shrink-0 text-brand" aria-hidden />
                    {venue}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="muted">
        <Container>
          <SectionHeading
            eyebrow="Available here"
            title={`Units we deliver to ${area.city}`}
            lead="The full fleet travels — these are the four organisers ask for most."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {units.map((unit) => (
              <UnitCard key={unit.slug} unit={unit} className="h-full" />
            ))}
          </div>
          <div className="mt-10">
            <Link href="/fleet" className={cn(buttonVariants({ variant: "outline" }), "h-11 bg-background px-5")}>
              See the full fleet
            </Link>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <Eyebrow>Questions</Eyebrow>
              <h2 className="text-3xl font-bold sm:text-4xl">Hiring in {area.city}</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                The same questions come up wherever we deliver. If yours is not here, call{" "}
                <a
                  href={site.phone.href}
                  className="font-semibold text-foreground underline underline-offset-4"
                >
                  {site.phone.display}
                </a>
                .
              </p>

              <h3 className="mt-10 font-heading text-sm font-bold uppercase tracking-wider text-muted-foreground">
                We also deliver to
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {others.map((entry) => (
                  <li key={entry.slug}>
                    <Link
                      href={`/areas/${entry.slug}`}
                      className="inline-flex rounded-lg border bg-card px-3 py-1.5 text-xs font-medium transition-colors hover:border-brand/40"
                    >
                      {entry.city}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <FaqList faqs={faqs} />
          </div>
        </Container>
      </Section>

      <CtaBand
        title={`Planning something in ${area.city}?`}
        lead="Send the date and the headcount and we will tell you what it takes to cover it, delivered and set up."
        message={`Hello ${site.name}, I need portable toilets in ${area.city}.`}
      />
    </>
  );
}
