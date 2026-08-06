import Link from "next/link";

import { Container, Eyebrow } from "@/components/shell";

/** Compact hero used at the top of every page except the home page. */
export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  children,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  crumbs?: { name: string; href: string }[];
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b bg-linear-to-b from-brand-soft via-brand-soft/50 to-background">
      <div className="bg-glow absolute inset-0" aria-hidden />
      <div className="bg-grid absolute inset-0 opacity-60" aria-hidden />
      <Container className="relative py-14 sm:py-18">
        {crumbs?.length ? (
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
              {crumbs.map((crumb, index) => (
                <li key={crumb.href} className="flex items-center gap-1.5">
                  {index > 0 ? <span aria-hidden>/</span> : null}
                  {index === crumbs.length - 1 ? (
                    <span className="font-medium text-foreground">{crumb.name}</span>
                  ) : (
                    <Link href={crumb.href} className="transition-colors hover:text-foreground">
                      {crumb.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <h1 className="max-w-3xl text-3xl font-extrabold sm:text-4xl lg:text-[3rem] lg:leading-[1.08]">
          {title}
        </h1>
        {lead ? (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {lead}
          </p>
        ) : null}
        {children ? <div className="mt-7">{children}</div> : null}
      </Container>
    </section>
  );
}
