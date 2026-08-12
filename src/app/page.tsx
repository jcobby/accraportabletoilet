import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  Check,
  ClipboardList,
  Droplets,
  Factory,
  HardHat,
  PartyPopper,
  Phone,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
  Users,
} from "lucide-react";
import Link from "next/link";

import { CtaBand } from "@/components/cta-band";
import { FaqList } from "@/components/faq-list";
import { InstagramIcon, WhatsAppIcon } from "@/components/icons";
import { InstagramCta } from "@/components/instagram-cta";
import { JsonLd } from "@/components/json-ld";
import { Media } from "@/components/media";
import { CountUp, Reveal } from "@/components/reveal";
import { Container, Eyebrow, Section, SectionHeading } from "@/components/shell";
import { SizingCalculator } from "@/components/sizing-calculator";
import { UnitCard } from "@/components/unit-card";
import { VideoLoop } from "@/components/video-loop";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  getAreas,
  getDeployments,
  getFaqs,
  getFeaturedUnits,
  getServices,
  getUnits,
} from "@/lib/api/catalogue";
import { faqSchema } from "@/lib/schema";
import { DEFAULT_WHATSAPP_MESSAGE, site, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

const serviceIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  PartyPopper,
  HardHat,
  Factory,
  ShoppingBag,
  Droplets,
  Users,
};

const promises = [
  {
    icon: Sparkles,
    title: "Delivered clean, kept clean",
    body: "Units arrive deep-cleaned and stocked with tissue, soap and sanitiser. On longer programmes our crew comes back mid-event, so the last guest sees what the first one saw.",
  },
  {
    icon: Truck,
    title: "Set up before you arrive",
    body: "We deliver ahead of the date, level the unit, connect it and test it. On the morning of your event there is nothing left for you to think about.",
  },
  {
    icon: ShieldCheck,
    title: "Waste handled properly",
    body: "Holding tanks are pumped out by our own crew and the waste goes to a licensed treatment facility. Nothing is discharged into a drain or onto open ground.",
  },
];

const steps = [
  {
    icon: ClipboardList,
    title: "Tell us about the event",
    body: "Date, venue, roughly how many guests and how long the programme runs. Two minutes on the form, or one message on WhatsApp.",
  },
  {
    icon: CalendarCheck,
    title: "We size it and quote it",
    body: "We come back with the right mix of units and a written price — including delivery — usually the same day.",
  },
  {
    icon: Truck,
    title: "We deliver and set up",
    body: "Units arrive ahead of the date, cleaned, stocked and tested, and we collect once your programme ends.",
  },
];

const stats: { value: string; count?: number; suffix?: string; label: string }[] = [
  { value: "8", count: 8, label: "Unit types in the fleet" },
  { value: "16", count: 16, label: "Regions we deliver to" },
  { value: "24hr", label: "Typical quote turnaround" },
];

export default async function HomePage() {
  const [units, featured, services, deployments, faqs, areas] = await Promise.all([
    getUnits(),
    getFeaturedUnits(),
    getServices(),
    getDeployments(),
    getFaqs(6),
    getAreas(),
  ]);

  return (
    <>
      <JsonLd data={faqSchema(faqs)} />

      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden border-b bg-linear-to-b from-brand-soft via-white to-white">
        <div className="bg-glow absolute inset-0" aria-hidden />
        <div className="bg-grid absolute inset-0 opacity-70" aria-hidden />
        <Container className="relative py-14 sm:py-20 lg:py-26">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <Badge
                variant="outline"
                className="h-7 border-brand/20 bg-white/80 px-3 text-brand shadow-raise backdrop-blur-sm"
              >
                <BadgeCheck aria-hidden />
                Manufacturer, sale &amp; rental
              </Badge>

              <h1 className="mt-5 text-4xl leading-[1.06] font-extrabold sm:text-5xl lg:text-[3.5rem]">
                Clean, dignified toilets for{" "}
                <span className="text-gradient">every event in Ghana</span>
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                From a single cubicle on a building site to a luxury restroom trailer at a state
                function — we build the units ourselves, deliver them across the country, and keep
                them clean for as long as your programme runs.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/quote"
                  className={cn(
                    buttonVariants(),
                    "h-13 px-7 text-base font-semibold shadow-[0_10px_30px_-10px_var(--brand)] transition-transform hover:-translate-y-0.5",
                  )}
                >
                  Get a free quote
                  <ArrowRight aria-hidden />
                </Link>
                <a
                  href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "h-13 bg-white px-7 text-base font-semibold shadow-raise transition-transform hover:-translate-y-0.5",
                  )}
                >
                  <WhatsAppIcon className="size-5 text-[#25D366]" />
                  WhatsApp us
                </a>
              </div>

              <p className="mt-5 text-sm text-muted-foreground">
                Or call{" "}
                <a
                  href={site.phone.href}
                  className="inline-flex items-center gap-1.5 font-semibold text-foreground underline underline-offset-4"
                >
                  <Phone className="size-3.5" aria-hidden />
                  {site.phone.display}
                </a>{" "}
                — we answer during working hours.
              </p>

              <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t pt-7">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <dt className="sr-only">{stat.label}</dt>
                    <dd>
                      <span className="tabular block font-heading text-2xl font-extrabold text-brand-ink sm:text-3xl">
                        {stat.count ? (
                          <CountUp to={stat.count} suffix={stat.suffix} />
                        ) : (
                          stat.value
                        )}
                      </span>
                      <span className="mt-1 block text-xs leading-snug text-muted-foreground">
                        {stat.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Real units, real sites.

                The lead frame is portrait beside the copy on desktop, but full-bleed
                on a phone that runs to roughly 790px tall and buries everything below
                it — so it drops to 4:3 on small screens. */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <Media
                image={{
                  src: "/images/units/executive-3-door-restroom-trailer/lawn.jpg",
                  alt: "Executive 3-door restroom trailer set up on a lawn at an outdoor event",
                  ratio: "portrait",
                }}
                className="col-span-2 aspect-4/3 shadow-lift sm:col-span-1 sm:mt-10 sm:aspect-3/4"
                sizes="(min-width: 640px) 280px, 100vw"
                priority
              />
              {/* Without col-span-2 this sits in one column of the two-column grid on
                  phones, leaving a dead gutter beside it. */}
              <div className="col-span-2 grid grid-cols-2 gap-3 sm:col-span-1 sm:grid-cols-1 sm:gap-4">
                <Media
                  image={{
                    src: "/images/units/luxury-2-door-restroom-trailer/garden.jpg",
                    alt: "2-door restroom trailer at a garden event with the door lights on",
                    ratio: "square",
                  }}
                  className="shadow-raise"
                  sizes="(min-width: 1024px) 280px, 50vw"
                />
                <Media
                  image={{
                    src: "/images/units/luxury-2-door-restroom-trailer/angle.jpg",
                    alt: "2-door restroom trailer on site, turf steps and handrails in place",
                    ratio: "square",
                  }}
                  className="shadow-raise"
                  sizes="(min-width: 1024px) 280px, 50vw"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------- Sizing calculator ---------- */}
      <Section tone="tinted" id="sizer">
        <Container>
          <SectionHeading
            eyebrow="Work it out yourself"
            title="How many toilets does your event actually need?"
            lead="The question every organiser starts with. Move the slider and you have an answer in about ten seconds — no form, no phone call, no waiting on an email."
            align="center"
          />
          <div className="mt-12">
            <SizingCalculator units={units} />
          </div>
        </Container>
      </Section>

      {/* ---------- Why us ---------- */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Why organisers call us back"
            title="Sanitation is the thing guests remember when it goes wrong"
            lead="Nobody compliments a clean toilet. They only ever mention the bad one. Everything below exists so yours never comes up."
          />

          {/* Three across, and the icon sits above the text rather than beside it —
              at a third of the width there is no room for a side-by-side layout, and
              this matches the service cards further down the page. */}
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {promises.map((promise, index) => (
              <Reveal key={promise.title} delay={index * 0.06} className="h-full">
                <div className="card-surface flex h-full flex-col rounded-2xl p-6">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
                    <promise.icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 font-heading text-base font-bold">{promise.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {promise.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---------- Fleet ---------- */}
      <Section tone="muted" id="fleet">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="The fleet"
              title="Pick the unit that fits your programme"
              lead="Rates below are indicative day rates for hire within Accra, including delivery, set-up, consumables and the end-of-event pump-out."
            />
            <Link
              href="/fleet"
              className={cn(buttonVariants({ variant: "outline" }), "h-11 bg-background px-5")}
            >
              See the full fleet
              <ArrowRight aria-hidden />
            </Link>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((unit, index) => (
              <Reveal key={unit.slug} delay={index * 0.05} className="h-full">
                <UnitCard unit={unit} className="h-full" />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---------- Look inside ----------
          The interior is the whole argument for a trailer over a plastic cubicle, and
          it is the one thing a photograph of the outside cannot make. */}
      <Section>
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            {/* Capped tighter on phones — at 20rem this vertical clip runs nearly
                600px tall and swallows the whole screen. */}
            <div className="relative mx-auto w-full max-w-60 overflow-hidden rounded-3xl bg-brand-ink shadow-pop sm:max-w-xs lg:max-w-sm">
              <div className="relative aspect-29/53">
                <VideoLoop
                  src="/video/trailer-interior.mp4"
                  poster="/video/trailer-interior-poster.jpg"
                  label="Walkthrough of a restroom trailer interior — timber-clad walls, ceramic WC, urinal, vanity basin and mirror"
                />
              </div>
            </div>

            <div>
              <Eyebrow>Look inside</Eyebrow>
              <h2 className="text-3xl font-bold sm:text-4xl lg:text-[2.6rem] lg:leading-[1.12]">
                This is what your guests walk into
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                Timber-clad walls, a ceramic WC, a urinal, a vanity basin with a mirror and an
                extractor fan overhead. No chemical smell, no plastic box — a room people are
                happy to be sent to.
              </p>

              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  "Timber-clad interior, not moulded plastic",
                  "Ceramic WC with foot-pedal flush",
                  "Vanity basin, mirror and running water",
                  "Extractor fan and interior lighting",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/fleet"
                  className={cn(buttonVariants({ variant: "outline" }), "h-11 px-5")}
                >
                  See the trailers
                  <ArrowRight aria-hidden />
                </Link>
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonVariants({ variant: "ghost" }), "h-11 px-4 text-brand")}
                >
                  <InstagramIcon className="size-4" />
                  More on Instagram
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------- How it works ---------- */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="How it works"
            title="Three steps, and it is off your plate"
            align="center"
          />

          <ol className="mt-12 grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.08} className="h-full">
                <li className="relative">
                  <span aria-hidden className="font-heading text-5xl font-extrabold text-brand/15">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-3 flex size-11 items-center justify-center rounded-xl bg-brand text-primary-foreground">
                    <step.icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 font-heading text-lg font-bold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ---------- Services ---------- */}
      <Section tone="tinted">
        <Container>
          <SectionHeading
            eyebrow="What we do"
            title="More than hire"
            lead="We are a manufacturer that also rents, sells and services — so whatever stage you are at, you deal with one company."
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => {
              const Icon = serviceIcons[service.icon] ?? PartyPopper;
              return (
                <Reveal key={service.slug} delay={index * 0.05} className="h-full">
                  <Link
                    href={`/services#${service.slug}`}
                    className="group flex h-full flex-col rounded-2xl border bg-card p-6 transition-shadow hover:shadow-lg hover:shadow-brand/5"
                  >
                    <span className="flex size-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="mt-4 font-heading text-base font-bold">{service.name}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {service.summary}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand transition-transform group-hover:translate-x-0.5">
                      Learn more
                      <ArrowRight className="size-4" aria-hidden />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ---------- Past work ----------
          Hidden entirely until the owner confirms at least one job. An empty
          "Past work" heading is worse than no section at all. */}
      {deployments.length > 0 ? (
      <Section>
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Past work"
              title="Where our units have stood"
              lead="Weddings and funerals, marathons and business forums, construction sites and state grounds."
            />
            <Link href="/gallery" className={cn(buttonVariants({ variant: "outline" }), "h-11 px-5")}>
              See the gallery
              <ArrowRight aria-hidden />
            </Link>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {deployments.slice(0, 3).map((deployment, index) => (
              <Reveal key={deployment.slug} delay={index * 0.06} className="h-full">
                <article className="flex h-full flex-col overflow-hidden rounded-2xl border bg-card">
                  <Media
                    image={deployment.image}
                    className="rounded-none border-0 border-b border-dashed"
                    sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                  />
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="h-6 px-2.5">
                        {deployment.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{deployment.year}</span>
                    </div>
                    <h3 className="mt-3 font-heading text-base font-bold">{deployment.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{deployment.location}</p>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {deployment.summary}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
      ) : null}

      {/* ---------- Instagram ---------- */}
      <Section className="pt-0">
        <Container className="max-w-3xl">
          <InstagramCta />
        </Container>
      </Section>

      {/* ---------- Coverage ---------- */}
      <Section tone="muted">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <Eyebrow>Where we deliver</Eyebrow>
              <h2 className="text-3xl font-bold sm:text-4xl">Accra is home. Ghana is the range.</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Greater Accra and Tema are priced as local with no distance surcharge. Everywhere
                else is quoted on road time and unit count — and for out-of-town events we deliver
                the day before, so nothing depends on traffic on the morning.
              </p>
            </div>

            <ul className="grid gap-3 sm:grid-cols-2">
              {areas.map((area) => (
                <li key={area.slug}>
                  <Link
                    href={`/areas/${area.slug}`}
                    className="group flex items-center justify-between gap-3 rounded-xl border bg-background px-4 py-3.5 transition-colors hover:border-brand/40"
                  >
                    <span>
                      <span className="block text-sm font-semibold">{area.city}</span>
                      <span className="block text-xs text-muted-foreground">{area.region}</span>
                    </span>
                    <ArrowRight
                      className="size-4 shrink-0 text-brand transition-transform group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* ---------- FAQ ---------- */}
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <Eyebrow>Questions</Eyebrow>
              <h2 className="text-3xl font-bold sm:text-4xl">Before you book</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                The things organisers ask us most. If yours is not here, call{" "}
                <a
                  href={site.phone.href}
                  className="font-semibold text-foreground underline underline-offset-4"
                >
                  {site.phone.display}
                </a>{" "}
                and ask.
              </p>
              <Link
                href="/contact#faq"
                className={cn(buttonVariants({ variant: "outline" }), "mt-6 h-11 px-5")}
              >
                All questions
                <ArrowRight aria-hidden />
              </Link>
            </div>
            <FaqList faqs={faqs} />
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
