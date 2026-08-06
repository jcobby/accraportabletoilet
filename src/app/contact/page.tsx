import { Clock, Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { FaqList } from "@/components/faq-list";
import { InstagramIcon, WhatsAppIcon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { Container, Eyebrow, Section } from "@/components/shell";
import { buttonVariants } from "@/components/ui/button";
import { getFaqs } from "@/lib/api/catalogue";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { DEFAULT_WHATSAPP_MESSAGE, site, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact — Book Portable Toilets in Ghana",
  description: `Call ${site.phone.display}, message us on WhatsApp, or send your event details for a written quote. Portable toilet rental, sales and servicing across Ghana.`,
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const faqs = await getFaqs();

  return (
    <>
      <JsonLd
        data={[
          faqSchema(faqs),
          breadcrumbSchema([
            { name: "Home", href: "/" },
            { name: "Contact", href: "/contact" },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Contact"
        title="Talk to someone who knows the fleet"
        lead="For anything urgent, call or WhatsApp — you will get an answer faster than any form can manage."
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact" },
        ]}
      />

      <Section>
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            <a
              href={site.phone.href}
              className="group flex flex-col rounded-2xl border bg-card p-6 transition-shadow hover:shadow-lg hover:shadow-brand/5"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
                <Phone className="size-5" aria-hidden />
              </span>
              <h2 className="mt-4 font-heading text-base font-bold">Call us</h2>
              <p className="mt-1 flex-1 text-sm text-muted-foreground">
                Fastest for date checks and short-notice bookings.
              </p>
              <span className="mt-4 font-heading text-lg font-bold text-brand">
                {site.phone.display}
              </span>
            </a>

            <a
              href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded-2xl border bg-card p-6 transition-shadow hover:shadow-lg hover:shadow-brand/5"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-[#25D366]/12 text-[#128C7E]">
                <WhatsAppIcon className="size-5" />
              </span>
              <h2 className="mt-4 font-heading text-base font-bold">WhatsApp</h2>
              <p className="mt-1 flex-1 text-sm text-muted-foreground">
                Send photos of your venue and we will confirm access before the day.
              </p>
              <span className="mt-4 font-heading text-lg font-bold text-brand">
                Start a chat
              </span>
            </a>

            <a
              href={`mailto:${site.email}`}
              className="group flex flex-col rounded-2xl border bg-card p-6 transition-shadow hover:shadow-lg hover:shadow-brand/5"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
                <Mail className="size-5" aria-hidden />
              </span>
              <h2 className="mt-4 font-heading text-base font-bold">Email</h2>
              <p className="mt-1 flex-1 text-sm text-muted-foreground">
                Best for procurement, invoices and formal quotations.
              </p>
              <span className="mt-4 break-all font-heading text-sm font-bold text-brand">
                {site.email}
              </span>
            </a>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-2xl border border-brand/20 bg-brand-soft p-8">
              <Eyebrow>Prefer to send details?</Eyebrow>
              <h2 className="text-2xl font-bold sm:text-3xl">
                The quote form takes about two minutes
              </h2>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-brand-ink/70">
                It walks through the event, the units, the location and how to reach you — then
                hands the whole summary straight to us on WhatsApp or by email, whichever you
                prefer. Nothing is stored on this website.
              </p>
              <Link
                href="/quote"
                className={cn(buttonVariants(), "mt-6 h-12 px-7 text-base font-semibold")}
              >
                Start a quote request
              </Link>
            </div>

            <div className="rounded-2xl border bg-card p-8">
              <h2 className="font-heading text-base font-bold">Where to find us</h2>
              <ul className="mt-5 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
                  <span className="text-muted-foreground">
                    {site.address.city}, {site.address.region}, {site.address.country}
                    <span className="mt-1 block text-xs">
                      Yard visits by appointment — call ahead and we will have the trailers open.
                    </span>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
                  <div className="text-muted-foreground">
                    {site.hours.map((entry) => (
                      <p key={entry.days}>
                        <span className="font-medium text-foreground">{entry.days}:</span>{" "}
                        {entry.time}
                      </p>
                    ))}
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <InstagramIcon className="mt-0.5 size-4 shrink-0 text-brand" />
                  <a
                    href={site.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
                  >
                    @accraportabletoilets
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="muted" id="faq">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <Eyebrow>Questions</Eyebrow>
              <h2 className="text-3xl font-bold sm:text-4xl">Everything organisers ask</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                If your question is not covered, call{" "}
                <a
                  href={site.phone.href}
                  className="font-semibold text-foreground underline underline-offset-4"
                >
                  {site.phone.display}
                </a>
                . We would rather answer it now than have you guess.
              </p>
            </div>
            <FaqList faqs={faqs} />
          </div>
        </Container>
      </Section>
    </>
  );
}
