import { Clock, MapPin, Phone } from "lucide-react";
import Link from "next/link";

import { InstagramIcon } from "@/components/icons";
import { Logo } from "@/components/logo";
import { Container } from "@/components/shell";
import { footerNav } from "@/lib/nav";
import { site } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-brand-ink text-white">
      <Container className="py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="max-w-sm">
            <Logo tone="inverse" />
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              {site.name} manufactures, sells and rents portable sanitation for events and work
              sites across Ghana — from single cubicles to luxury restroom trailers.
            </p>

            <ul className="mt-6 space-y-3 text-sm">
              <li>
                <a
                  href={site.phone.href}
                  className="inline-flex items-center gap-2.5 font-medium transition-colors hover:text-white/70"
                >
                  <Phone className="size-4 shrink-0 text-white/40" aria-hidden />
                  {site.phone.display}
                </a>
              </li>
              <li className="inline-flex items-center gap-2.5 text-white/70">
                <MapPin className="size-4 shrink-0 text-white/40" aria-hidden />
                {site.address.city}, {site.address.region}
              </li>
              <li>
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 transition-colors hover:text-white/70"
                >
                  <InstagramIcon className="size-4 shrink-0 text-white/40" />
                  {site.social.instagramHandle}
                </a>
              </li>
            </ul>
          </div>

          {footerNav.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
                {group.title}
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-white/70 transition-colors hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 rounded-xl border border-white/10 bg-white/5 p-5">
          <h2 className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
            <Clock className="size-3.5" aria-hidden />
            Opening hours
          </h2>
          <dl className="mt-3 grid gap-x-8 gap-y-2 text-sm sm:grid-cols-3">
            {site.hours.map((entry) => (
              <div key={entry.days} className="flex justify-between gap-4 sm:block">
                <dt className="text-white/50">{entry.days}</dt>
                <dd className="font-medium sm:mt-0.5">{entry.time}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p>
            Rates shown are indicative and confirmed in writing on every quote.
          </p>
        </div>
      </Container>
    </footer>
  );
}
