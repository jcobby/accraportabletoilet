import Link from "next/link";

import { Container, Section } from "@/components/shell";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <Section>
      <Container className="max-w-xl text-center">
        <p className="font-heading text-6xl font-extrabold text-brand/25">404</p>
        <h1 className="mt-4 text-3xl font-bold">We cannot find that page</h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          The link may be out of date. The fleet, our services and the quote form are all still
          where you left them.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className={cn(buttonVariants(), "h-11 px-6")}>
            Back to home
          </Link>
          <Link href="/fleet" className={cn(buttonVariants({ variant: "outline" }), "h-11 px-6")}>
            Browse the fleet
          </Link>
        </div>

        <p className="mt-8 text-sm text-muted-foreground">
          Or just call{" "}
          <a
            href={site.phone.href}
            className="font-semibold text-foreground underline underline-offset-4"
          >
            {site.phone.display}
          </a>
        </p>
      </Container>
    </Section>
  );
}
