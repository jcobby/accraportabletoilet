import type { Metadata } from "next";

import { CtaBand } from "@/components/cta-band";
import { GalleryGrid } from "@/components/gallery-grid";
import { InstagramCta } from "@/components/instagram-cta";
import { JsonLd } from "@/components/json-ld";
import { Media } from "@/components/media";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Container, Section, SectionHeading } from "@/components/shell";
import { Badge } from "@/components/ui/badge";
import { getDeployments, getGalleryPhotos } from "@/lib/api/catalogue";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Gallery — Our Units, Interiors and Crews",
  description:
    "Photographs of Accra Portable Toilets restroom trailers, cubicle interiors, units on site across Ghana, and our own delivery and vacuum tanker fleet.",
  alternates: { canonical: "/gallery" },
};

export default async function GalleryPage() {
  const [photos, deployments] = await Promise.all([getGalleryPhotos(), getDeployments()]);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Gallery", href: "/gallery" },
        ])}
      />

      <PageHero
        eyebrow="Gallery"
        title="Our units, our interiors, our crews"
        lead="Every photograph here is our own equipment on real ground — no stock imagery, no borrowed shots."
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Gallery", href: "/gallery" },
        ]}
      />

      <Section>
        <Container>
          <GalleryGrid photos={photos} />
        </Container>
      </Section>

      {/* Past work only appears once the owner has confirmed a job — see
          src/data/deployments.ts. Until then the gallery above stands on its own. */}
      {deployments.length > 0 ? (
        <Section tone="muted">
          <Container>
            <SectionHeading
              eyebrow="Past work"
              title="Programmes we have kept running"
              lead="A cross-section of what we deliver."
            />

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {deployments.map((deployment, index) => (
                <Reveal key={deployment.slug} delay={index * 0.05} className="h-full">
                  <article className="card-surface flex h-full flex-col overflow-hidden rounded-2xl">
                    <Media
                      image={deployment.image}
                      frameless
                      className="border-b"
                      sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                    />
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="secondary" className="h-6 px-2.5">
                          {deployment.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{deployment.year}</span>
                      </div>
                      <h2 className="mt-3 font-heading text-lg font-bold">{deployment.title}</h2>
                      <p className="mt-1 text-xs text-muted-foreground">{deployment.location}</p>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                        {deployment.summary}
                      </p>
                      <p className="mt-4 border-t pt-4 text-xs text-muted-foreground">
                        <span className="font-medium text-foreground">Supplied: </span>
                        {deployment.units}
                      </p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <Section tone="tinted">
        <Container className="max-w-3xl">
          <InstagramCta />
        </Container>
      </Section>

      <CtaBand
        title="Your event could be the next one here"
        lead="Send us the date and the headcount, and we will tell you exactly what it takes to cover it."
      />
    </>
  );
}
