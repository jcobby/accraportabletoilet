import { cn } from "@/lib/utils";

/**
 * Text lockup standing in for the real logo mark.
 *
 * TODO: drop the supplied logo into /public/logo.svg and swap this component's
 * innards for an <Image>. Keep the same props so nothing else needs touching.
 */
export function Logo({
  className,
  tone = "default",
}: {
  className?: string;
  tone?: "default" | "inverse";
}) {
  return (
    <span className={cn("inline-flex flex-col leading-none", className)}>
      <span
        className={cn(
          "text-[0.6rem] font-semibold uppercase tracking-[0.28em]",
          tone === "inverse" ? "text-white/60" : "text-muted-foreground",
        )}
      >
        Accra
      </span>
      <span className="font-heading text-lg font-extrabold tracking-tight">
        <span className={tone === "inverse" ? "text-white" : "text-brand-ink"}>Portable</span>
        <span className={tone === "inverse" ? "text-white/80" : "text-brand"}>Toilets</span>
      </span>
    </span>
  );
}
