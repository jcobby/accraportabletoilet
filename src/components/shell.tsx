import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)}>{children}</div>
  );
}

/**
 * Section tones alternate down a page so it reads as chapters rather than one long
 * scroll. `tinted` is the light break, `ink` the full stop.
 */
export function Section({
  className,
  children,
  id,
  tone = "default",
}: {
  className?: string;
  children: React.ReactNode;
  id?: string;
  tone?: "default" | "muted" | "tinted" | "ink";
}) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-24 py-16 sm:py-20 lg:py-24",
        tone === "muted" && "bg-secondary/70",
        tone === "tinted" && "bg-linear-to-b from-brand-soft/80 via-white to-brand-soft/50",
        tone === "ink" && "bg-brand-ink text-white",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function Eyebrow({
  children,
  className,
  tone = "default",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "default" | "inverse";
}) {
  return (
    <p
      className={cn(
        "mb-4 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase",
        tone === "inverse" ? "text-white/55" : "text-brand",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "h-px w-6",
          tone === "inverse" ? "bg-white/30" : "bg-linear-to-r from-brand to-fresh",
        )}
      />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  tone = "default",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
  tone?: "default" | "inverse";
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <Eyebrow
          tone={tone === "inverse" ? "inverse" : "default"}
          className={align === "center" ? "justify-center" : undefined}
        >
          {eyebrow}
        </Eyebrow>
      ) : null}
      <h2 className="text-3xl font-bold sm:text-4xl lg:text-[2.6rem] lg:leading-[1.12]">{title}</h2>
      {lead ? (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed sm:text-lg",
            tone === "inverse" ? "text-white/65" : "text-muted-foreground",
          )}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
