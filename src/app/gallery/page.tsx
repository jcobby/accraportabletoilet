import type { Metadata } from "next";

import { CtaBand } from "@/components/cta-band";
import { InstagramIcon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { Media } from "@/components/media";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Container, Section } from "@/components/shell";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { getDeployments } from "@/lib/api/catalogue";
import { breadcrumbSchema } from "@/lib/schema";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Past Work — Events We Have Supplied",
  description:
    "Weddings, funerals, marathons, business forums, corporate launches, construction sites and state functions supplied with portable sanitation across Ghana.",
  alternates: { canonical: "/gallery" },
};

export default async function GalleryPage() {
  const deployments = await getDeployments();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Past work", href: "/gallery" },
        ])}
      />

      <PageHero
        eyebrow="Past work"
        title="Programmes we have kept running"
        lead="A cross-section of what we deliver: private weddings, mass-participation sport, corporate launches, long-running site welfare, and national occasions."
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Past work", href: "/gallery" },
        ]}
      />

      <Section>
        <Container>
          {deployments.length === 0 ? (
            // No confirmed jobs yet. Rather than fake a portfolio, send people to the
            // Instagram grid — which is real, current, and already full of the work.
            <div className="mx-auto max-w-xl rounded-2xl border border-dashed p-10 text-center">
              <h2 className="font-heading text-xl font-bold">Our work, as it happens</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                We post every delivery and set-up to Instagram as we do it — including the
                late-night ones. It is the most honest picture of what we turn out, and it is
                more current than any page we could write.
              </p>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants(), "mt-6 h-11 px-5")}
              >
                <InstagramIcon className="size-4" />
                @accraportabletoilets
              </a>
            </div>
          ) : null}

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {deployments.map((deployment, index) => (
              <Reveal key={deployment.slug} delay={index * 0.05} className="h-full">
                <article className="flex h-full flex-col overflow-hidden rounded-2xl border bg-card">
                  <Media
                    image={deployment.image}
                    className="rounded-none border-0 border-b border-dashed"
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

          <div
            className={cn(
              "rounded-2xl border bg-brand-soft/60 p-8 text-center",
              deployments.length > 0 ? "mt-14" : "hidden",
            )}
          >
            <h2 className="font-heading text-xl font-bold">More on Instagram</h2>
            <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
              We post deliveries and set-ups as they happen — including the late-night ones nobody
              sees. It is the fastest way to judge whether our finish matches your event.
            </p>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "outline" }), "mt-6 h-11 bg-background px-5")}
            >
              <InstagramIcon className="size-4" />
              @accraportabletoilets
            </a>
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Your event could be the next one here"
        lead="Send us the date and the headcount, and we will tell you exactly what it takes to cover it."
      />
    </>
  );
}
