"use client";

import { motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

/** Fades content up as it scrolls into view; respects reduced-motion. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Count-up for the hero statistics. Numbers that animate on arrival read as
 * "measured" rather than decorative — but only where a real number exists, and never
 * for anyone who has asked for less motion.
 */
export function CountUp({
  to,
  suffix = "",
  className,
}: {
  to: number;
  suffix?: string;
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <span className={className}>
        {to.toLocaleString("en-GH")}
        {suffix}
      </span>
    );
  }

  return (
    <span className={className}>
      <motion.span
        // `--n` is registered via @property in globals.css, so this interpolates.
        // The digits themselves are painted by a CSS counter in the ::after.
        initial={{ "--n": 0 }}
        whileInView={{ "--n": to }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: "easeOut" }}
        style={{ counterReset: "n var(--n)" }}
        className="after:[content:counter(n)]"
        // The animated digits are decorative duplication; the accessible value is
        // announced once from the sibling below.
        aria-hidden
      />
      <span className="sr-only">{to.toLocaleString("en-GH")}</span>
      {suffix}
    </span>
  );
}
