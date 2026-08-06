const cedis = new Intl.NumberFormat("en-GH", {
  style: "currency",
  currency: "GHS",
  maximumFractionDigits: 0,
});

/** Formats a GHS amount, e.g. 4500 -> "GH₵4,500". */
export function formatCedis(amount: number): string {
  return cedis.format(amount).replace("GHS", "GH₵");
}

/** Formats an indicative rate, falling back to a quote-only label. */
export function formatRate(amount: number | null, suffix: string): string {
  if (amount === null) return "On request";
  return `${formatCedis(amount)} ${suffix}`;
}
