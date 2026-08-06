import { ArrowRight, Phone } from "lucide-react";
import Link from "next/link";

import { Delivery } from "@/components/art/illustrations";
import { WhatsAppIcon } from "@/components/icons";
import { Container, Section } from "@/components/shell";
import { buttonVariants } from "@/components/ui/button";
import { DEFAULT_WHATSAPP_MESSAGE, site, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

export function CtaBand({
  title = "Tell us the date. We'll tell you what you need.",
  lead = "Send your event details and we come back with a written quote — the right mix of units, the delivery cost, and nothing you don't need.",
  message = DEFAULT_WHATSAPP_MESSAGE,
}: {
  title?: string;
  lead?: string;
  message?: string;
}) {
  return (
    <Section tone="ink" className="relative overflow-hidden">
      <div className="bg-glow absolute inset-0 opacity-80" aria-hidden />
      <div className="bg-grid absolute inset-0 opacity-[0.09]" aria-hidden />
      <div className="bg-grain absolute inset-0" aria-hidden />

      {/* The delivery illustration anchors the band to the business rather than
          leaving it a generic dark CTA. Decorative, so it is hidden from assistive
          tech and dropped entirely on small screens. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -bottom-10 hidden w-[26rem] opacity-25 lg:block"
      >
        <Delivery />
      </div>

      <Container className="relative">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-[2.6rem] lg:leading-[1.1]">
            {title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/65 sm:text-lg">{lead}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/quote"
              className={cn(
                buttonVariants(),
                "h-13 bg-white px-7 text-base font-semibold text-brand-ink shadow-lg shadow-black/20 hover:bg-white/90",
              )}
            >
              Get a free quote
              <ArrowRight aria-hidden />
            </Link>
            <a
              href={whatsappLink(message)}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "edge-light h-13 border-white/20 bg-white/8 px-7 text-base font-semibold text-white backdrop-blur-sm hover:bg-white/14 hover:text-white",
              )}
            >
              <WhatsAppIcon className="size-5" />
              WhatsApp us
            </a>
          </div>

          <p className="mt-6 text-sm text-white/45">
            Or call{" "}
            <a
              href={site.phone.href}
              className="inline-flex items-center gap-1.5 font-semibold text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white"
            >
              <Phone className="size-3.5" aria-hidden />
              {site.phone.display}
            </a>
          </p>
        </div>
      </Container>
    </Section>
  );
}
