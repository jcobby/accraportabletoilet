import { Check, Droplets, Factory, HardHat, PartyPopper, ShoppingBag, Users } from "lucide-react";
import type { Metadata } from "next";

import type { ArtKey } from "@/components/art";
import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { Media } from "@/components/media";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Container, Section } from "@/components/shell";
import { getServices } from "@/lib/api/catalogue";
import { breadcrumbSchema } from "@/lib/schema";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services — Rental, Site Hire, Manufacturing & Servicing",
  description:
    "Event rental, long-term site hire, custom manufacturing, unit sales, servicing and waste management, and on-site attendants — portable sanitation across Ghana.",
  alternates: { canonical: "/services" },
};

const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  PartyPopper,
  HardHat,
  Factory,
  ShoppingBag,
  Droplets,
  Users,
};

/** The illustration that best carries each service until photography exists. */
const serviceArt: Record<string, ArtKey> = {
  "event-rental": "event-night",
  "site-hire": "cubicle-row",
  manufacturing: "workshop",
  sales: "cabin",
  servicing: "delivery",
  "event-support": "interior",
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
        ])}
      />

      <PageHero
        eyebrow="What we do"
        title="One company for the whole sanitation problem"
        lead="We manufacture the units, rent them out, sell them, service them and take the waste away. You are never passed between suppliers."
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
        ]}
      />

      <Section className="pb-8">
        <Container>
          <div className="space-y-20">
            {services.map((service, index) => {
              const Icon = icons[service.icon] ?? PartyPopper;
              const flipped = index % 2 === 1;

              return (
                <Reveal key={service.slug}>
                  <article
                    id={service.slug}
                    className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-2 lg:gap-14"
                  >
                    <div className={cn(flipped && "lg:order-2")}>
                      <span className="flex size-12 items-center justify-center rounded-xl bg-brand-soft text-brand">
                        <Icon className="size-6" />
                      </span>
                      <h2 className="mt-5 text-2xl font-bold sm:text-3xl">{service.name}</h2>
                      <p className="mt-3 text-base leading-relaxed text-brand">{service.summary}</p>

                      <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground">
                        {service.description.map((paragraph) => (
                          <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                        ))}
                      </div>

                      <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                        {service.points.map((point) => (
                          <li key={point} className="flex items-start gap-2.5 text-sm">
                            <Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
                            <span className="text-muted-foreground">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Media
                      image={{
                        src: "",
                        alt: `${service.name} at Accra Portable Toilets`,
                        ratio: "landscape",
                        art: serviceArt[service.slug],
                      }}
                      className={cn("shadow-lift", flipped && "lg:order-1")}
                      sizes="(min-width: 1024px) 520px, 100vw"
                    />
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Whichever of those you need, it starts the same way"
        lead="Send us the details and we come back with a written quote — hire, purchase or a servicing schedule."
      />
    </>
  );
}
