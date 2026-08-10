import { Check, ChevronRight, CircleAlert, Phone, Play, Users } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { WhatsAppIcon } from "@/components/icons";
import { InstagramCta } from "@/components/instagram-cta";
import { JsonLd } from "@/components/json-ld";
import { Media } from "@/components/media";
import { Container, Section, SectionHeading } from "@/components/shell";
import { UnitCard } from "@/components/unit-card";
import { VideoLoop } from "@/components/video-loop";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { categoryLabels } from "@/data/units";
import { getRelatedUnits, getUnit, getUnitSlugs } from "@/lib/api/catalogue";
import { formatCedis } from "@/lib/format";
import { breadcrumbSchema, unitSchema } from "@/lib/schema";
import { site, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

export async function generateStaticParams() {
  const slugs = await getUnitSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/fleet/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const unit = await getUnit(slug);

  if (!unit) return { title: "Unit not found" };

  return {
    title: `${unit.name} — Hire in Accra & Nationwide`,
    description: unit.summary,
    alternates: { canonical: `/fleet/${unit.slug}` },
    openGraph: {
      title: `${unit.name} | ${site.name}`,
      description: unit.summary,
      url: `/fleet/${unit.slug}`,
    },
  };
}

export default async function UnitPage(props: PageProps<"/fleet/[slug]">) {
  const { slug } = await props.params;
  const unit = await getUnit(slug);

  if (!unit) notFound();

  const related = await getRelatedUnits(unit.slug);
  const enquiry = `Hello ${site.name}, I would like to enquire about the ${unit.name}.`;

  return (
    <>
      <JsonLd
        data={[
          unitSchema(unit),
          breadcrumbSchema([
            { name: "Home", href: "/" },
            { name: "Our fleet", href: "/fleet" },
            { name: unit.name, href: `/fleet/${unit.slug}` },
          ]),
        ]}
      />

      <Section className="pt-8 pb-0 sm:pt-10">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
              <li>
                <Link href="/" className="transition-colors hover:text-foreground">
                  Home
                </Link>
              </li>
              <ChevronRight className="size-3" aria-hidden />
              <li>
                <Link href="/fleet" className="transition-colors hover:text-foreground">
                  Our fleet
                </Link>
              </li>
              <ChevronRight className="size-3" aria-hidden />
              <li className="font-medium text-foreground">{unit.name}</li>
            </ol>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            {/* Gallery */}
            <div className="space-y-4">
              <Media
                image={{ ...unit.images[0], ratio: "landscape" }}
                sizes="(min-width: 1024px) 620px, 100vw"
                priority
              />
              {unit.images.length > 1 ? (
                <div className="grid grid-cols-2 gap-4">
                  {unit.images.slice(1).map((image) => (
                    <Media
                      key={image.alt}
                      image={{ ...image, ratio: "square" }}
                      sizes="(min-width: 1024px) 300px, 50vw"
                    />
                  ))}
                </div>
              ) : null}

              {unit.video ? (
                <figure className="overflow-hidden rounded-2xl border bg-card">
                  <div className="relative aspect-4/3 bg-brand-ink">
                    <VideoLoop
                      src={unit.video.src}
                      poster={unit.video.poster}
                      label={unit.video.label}
                    />
                  </div>
                  <figcaption className="flex items-start gap-2.5 p-4 text-sm leading-relaxed text-muted-foreground">
                    <Play className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
                    {unit.video.caption}
                  </figcaption>
                </figure>
              ) : null}

              <InstagramCta variant="inline" />
            </div>

            {/* Summary + pricing */}
            <div>
              <Badge variant="secondary" className="h-6 px-2.5">
                {categoryLabels[unit.category]}
              </Badge>

              <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">{unit.name}</h1>
              <p className="mt-2 text-base text-brand">{unit.tagline}</p>

              <p className="mt-5 text-base leading-relaxed text-muted-foreground">{unit.summary}</p>

              <div className="mt-6 flex flex-wrap gap-3 text-sm">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-1.5 font-medium">
                  <Users className="size-4 text-brand" aria-hidden />
                  {unit.capacity}
                </span>
                {unit.cubicles > 0 ? (
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-1.5 font-medium">
                    {unit.cubicles} {unit.cubicles === 1 ? "cubicle" : "cubicles"}
                  </span>
                ) : null}
              </div>

              {/* Rate card */}
              <div className="mt-8 rounded-2xl border bg-card p-6">
                <h2 className="font-heading text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  Indicative rates
                </h2>

                <dl className="mt-4 divide-y">
                  <div className="flex items-baseline justify-between gap-4 pb-3">
                    <dt className="text-sm text-muted-foreground">Per day</dt>
                    <dd className="font-heading text-2xl font-extrabold text-brand-ink">
                      {unit.pricing.perDay === null ? "On request" : formatCedis(unit.pricing.perDay)}
                    </dd>
                  </div>
                  {unit.pricing.perWeek !== null ? (
                    <div className="flex items-baseline justify-between gap-4 py-3">
                      <dt className="text-sm text-muted-foreground">Per week (7 days)</dt>
                      <dd className="font-heading text-lg font-bold">
                        {formatCedis(unit.pricing.perWeek)}
                      </dd>
                    </div>
                  ) : null}
                  {unit.pricing.purchase !== null ? (
                    <div className="flex items-baseline justify-between gap-4 pt-3">
                      <dt className="text-sm text-muted-foreground">To buy outright</dt>
                      <dd className="font-heading text-lg font-bold">
                        {formatCedis(unit.pricing.purchase)}
                      </dd>
                    </div>
                  ) : null}
                </dl>

                {unit.pricing.note ? (
                  <p className="mt-4 border-t pt-4 text-xs leading-relaxed text-muted-foreground">
                    {unit.pricing.note}
                  </p>
                ) : null}

                <div className="mt-6 flex flex-col gap-2.5">
                  <Link
                    href={`/quote?unit=${unit.slug}`}
                    className={cn(buttonVariants(), "h-12 w-full text-base font-semibold")}
                  >
                    Request a quote for this unit
                  </Link>
                  <div className="grid grid-cols-2 gap-2.5">
                    <a
                      href={whatsappLink(enquiry)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(buttonVariants({ variant: "outline" }), "h-11 text-sm")}
                    >
                      <WhatsAppIcon className="size-4 text-[#25D366]" />
                      WhatsApp
                    </a>
                    <a
                      href={site.phone.href}
                      className={cn(buttonVariants({ variant: "outline" }), "h-11 text-sm")}
                    >
                      <Phone aria-hidden />
                      Call
                    </a>
                  </div>
                </div>

                <p className="mt-4 text-center text-xs text-muted-foreground">
                  Prices are indicative — your written quote confirms the final figure.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Detail */}
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            <div>
              <h2 className="font-heading text-2xl font-bold">About this unit</h2>
              <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground">
                {unit.description.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>

              <h3 className="mt-10 font-heading text-lg font-bold">What is included</h3>
              <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {unit.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <h3 className="mt-10 font-heading text-lg font-bold">Commonly used for</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {unit.bestFor.map((use) => (
                  <li key={use}>
                    <Badge variant="secondary" className="h-7 px-3 text-xs">
                      {use}
                    </Badge>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl border bg-card p-6">
                <h3 className="font-heading text-base font-bold">Specifications</h3>
                <dl className="mt-4 divide-y text-sm">
                  {unit.specs.map((spec) => (
                    <div
                      key={spec.label}
                      // Stacked on phones: side-by-side leaves values like
                      // "230V 13A supply or generator" wrapping to four words a line.
                      className="flex flex-col gap-0.5 py-2.5 sm:flex-row sm:justify-between sm:gap-4"
                    >
                      <dt className="text-muted-foreground">{spec.label}</dt>
                      <dd className="font-medium sm:text-right">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="rounded-2xl border border-brand/20 bg-brand-soft p-6">
                <h3 className="inline-flex items-center gap-2 font-heading text-base font-bold text-brand-ink">
                  <CircleAlert className="size-4 text-brand" aria-hidden />
                  What your site needs
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {unit.requirements.map((requirement) => (
                    <li key={requirement} className="flex items-start gap-2.5 text-sm">
                      <Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
                      <span className="text-brand-ink/75">{requirement}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-xs leading-relaxed text-brand-ink/60">
                  Unsure whether your venue works? Send a photo of the spot on WhatsApp and we will
                  tell you before the day, not on it.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Related */}
      <Section tone="muted">
        <Container>
          <SectionHeading
            eyebrow="Also consider"
            title="Units organisers pair with this one"
            lead="Most programmes use a mix — a trailer for guests, cubicles for volume, and a urinal station to keep the queue short."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <UnitCard key={item.slug} unit={item} className="h-full" />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
