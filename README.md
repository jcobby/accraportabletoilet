# Accra Portable Toilets

Marketing site for Accra Portable Toilets — manufacturer, sale and rental of portable
sanitation in Ghana.

Frontend only. There is no database, no login and no server-side form handling: the
quote form composes a summary and hands it to WhatsApp or the visitor's email client.

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind v4 ·
shadcn/ui (Base UI variant, `base-nova`) · framer-motion · zod + react-hook-form ·
lucide-react · sonner

## Commands

```bash
npm run dev     # dev server on http://localhost:3000
npm run build   # production build — must pass before calling work done
npm run lint    # eslint (React Compiler rules are on; they fail the build)
npm start       # serve the production build
```

## Structure

```
src/
  app/
    page.tsx              home
    fleet/                fleet index + /fleet/[slug] unit pages
    services/             all services, anchored per service
    gallery/              past work
    areas/[slug]/         location pages for local SEO
    quote/                multi-step quote request
    about/  contact/
    sitemap.ts  robots.ts
  components/
    ui/                   shadcn primitives — do not hand-edit, re-add via CLI
    art/                  the SVG illustration set (see ASSETS.md)
    layout/               header, footer, WhatsApp FAB, mobile action bar
    quote-form.tsx        the multi-step form (client)
    sizing-calculator.tsx "how many do I need?" widget (client)
    media.tsx             photo → illustration → placeholder image slot
  data/                   units, services, deployments, areas, faqs
  lib/
    api/catalogue.ts      the only module pages read data through
    site.ts               business details — phone, email, hours, socials
    quote.ts              quote schema + message builder
    sizing.ts             the event sizing model (pure, no React)
    schema.ts             JSON-LD builders
  types/
```

## Conventions

- **Pages never import from `@/data` directly.** All reads go through
  `src/lib/api/catalogue.ts`, so swapping in a CMS or backend later touches one file.
- **Business details live in `src/lib/site.ts`.** Phone number, email, hours and
  socials are referenced from there everywhere — never hard-code them in a page.
- **shadcn here is the Base UI variant**, not Radix. Polymorphism uses the `render`
  prop, not `asChild`. For link-styled buttons, apply `buttonVariants()` to a `Link`
  rather than wrapping `Button` — it sidesteps the `nativeButton` handling entirely.
- **Images are data.** See `ASSETS.md`. Slots resolve photo → illustration →
  placeholder, so the site looks finished before any photography exists.
- **The sizing model lives in `src/lib/sizing.ts`, not in the component.** The numbers
  are the product; keep them pure and separately reviewable.
- **React Compiler lint rules are enforced.** No `setState` inside effects, no
  assigning to values from outside the component (use `window.location.assign()`,
  not `window.location.href = …`), and prefer `useWatch` over RHF's `watch()`.

## Before launch

Read `CONTENT-TODO.md`. Prices, the email address, the yard address and four of the
six past-work entries are placeholders that need the owner's confirmation.

## SEO

Metadata and canonicals on every route, `sitemap.xml` and `robots.txt` generated from
the data layer, and JSON-LD for Organization, LocalBusiness, BreadcrumbList, FAQPage
and Product (per unit). Location pages under `/areas/*` target local search — add a
new town by appending to `src/data/areas.ts` and the page, sitemap entry and footer
link follow automatically.
