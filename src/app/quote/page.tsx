import { Clock, Phone, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

import { WhatsAppIcon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { QuoteForm } from "@/components/quote-form";
import { Container, Section } from "@/components/shell";
import { buttonVariants } from "@/components/ui/button";
import { getUnits } from "@/lib/api/catalogue";
import { breadcrumbSchema } from "@/lib/schema";
import { DEFAULT_WHATSAPP_MESSAGE, site, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Get a Free Quote — Portable Toilet Hire",
  description:
    "Tell us your event date, headcount and venue and we will come back with a written quote — usually the same working day. Delivery, set-up and servicing included.",
  alternates: { canonical: "/quote" },
};

const assurances = [
  { icon: Clock, text: "Most quotes come back the same working day" },
  { icon: ShieldCheck, text: "No obligation, and no charge for advice" },
  { icon: Phone, text: "Prefer to talk? Call and skip the form entirely" },
];

export default async function QuotePage(props: PageProps<"/quote">) {
  const searchParams = await props.searchParams;
  const units = await getUnits();

  // `unit=` comes from a fleet detail page, `units=a,b,c` from the sizing calculator.
  const slugs = new Set(units.map((unit) => unit.slug));
  const requested = [
    typeof searchParams.unit === "string" ? searchParams.unit : "",
    ...(typeof searchParams.units === "string" ? searchParams.units.split(",") : []),
  ];
  const initialUnits = [...new Set(requested.filter((slug) => slugs.has(slug)))];

  const guestsParam = Number(searchParams.guests);
  const initialGuests =
    Number.isFinite(guestsParam) && guestsParam > 0 ? Math.round(guestsParam) : undefined;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Get a quote", href: "/quote" },
        ])}
      />

      <PageHero
        eyebrow="Free quote"
        title="Tell us about your event"
        lead="Four short steps. At the end we hand the whole summary to WhatsApp or your email app — you press send."
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Get a quote", href: "/quote" },
        ]}
      >
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {assurances.map((item) => (
            <li key={item.text} className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <item.icon className="size-4 text-brand" aria-hidden />
              {item.text}
            </li>
          ))}
        </ul>
      </PageHero>

      <Section>
        <Container className="max-w-4xl">
          <QuoteForm units={units} initialUnits={initialUnits} initialGuests={initialGuests} />

          <div className="mt-8 flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed p-6 text-center sm:flex-row sm:text-left">
            <p className="text-sm text-muted-foreground">
              In a hurry, or your date is this week?
            </p>
            <div className="flex gap-2.5">
              <a
                href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "outline" }), "h-10 px-4 text-sm")}
              >
                <WhatsAppIcon className="size-4 text-[#25D366]" />
                WhatsApp
              </a>
              <a
                href={site.phone.href}
                className={cn(buttonVariants({ variant: "outline" }), "h-10 px-4 text-sm")}
              >
                <Phone aria-hidden />
                {site.phone.display}
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
