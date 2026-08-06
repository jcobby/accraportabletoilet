import { z } from "zod";

import { site } from "@/lib/site";

export const eventTypes = [
  "Wedding",
  "Funeral",
  "Church programme",
  "Corporate / conference",
  "Concert or festival",
  "Sports event",
  "Construction / site welfare",
  "Government / state function",
  "Other",
] as const;

export const contactMethods = ["WhatsApp", "Phone call", "Email"] as const;

export const extras = [
  { id: "attendant", label: "On-site attendant", hint: "Keeps units clean and stocked all day" },
  { id: "generator", label: "Silent generator", hint: "If the venue has no power point" },
  { id: "handwash", label: "Hand-washing stations", hint: "Recommended wherever food is served" },
  { id: "servicing", label: "Mid-event servicing", hint: "For programmes running over several sessions" },
  { id: "branding", label: "Event branding on units", hint: "Sponsor or event artwork applied to the shell" },
] as const;

export const quoteSchema = z.object({
  // Step 1 — the event
  eventType: z.enum(eventTypes, { message: "Tell us what kind of event this is" }),
  eventDate: z.string().min(1, "We need the date to check availability"),
  // Registered with `valueAsNumber`, so these stay plain numbers on both sides of
  // the schema and RHF needs no input/output generic gymnastics.
  days: z
    .number({ message: "Enter a number of days" })
    .int("Whole days only")
    .min(1, "At least 1 day")
    .max(365, "For hires over a year, please call us"),
  guests: z
    .number({ message: "Enter an approximate headcount" })
    .int("Whole numbers only")
    .min(1, "At least 1 guest")
    .max(200000, "Please call us for crowds this size"),

  // Step 2 — what they need
  unitSlugs: z.array(z.string()).min(1, "Pick at least one unit, or choose “Not sure yet”"),
  extraIds: z.array(z.string()),

  // Step 3 — where
  city: z.string().min(2, "Which town or city?"),
  venue: z.string().min(3, "Venue name or a landmark helps our driver"),

  // Step 4 — who
  name: z.string().min(2, "Your name, please"),
  phone: z
    .string()
    .min(9, "Enter a reachable phone number")
    .regex(/^[0-9+()\s-]+$/, "Digits, spaces and + only"),
  email: z.union([z.literal(""), z.email("That email address looks off")]),
  contactMethod: z.enum(contactMethods),
  notes: z.string().max(1000, "Keep it under 1000 characters").optional(),
});

export type QuoteValues = z.infer<typeof quoteSchema>;

export const quoteDefaults: Partial<QuoteValues> = {
  days: 1,
  unitSlugs: [],
  extraIds: [],
  contactMethod: "WhatsApp",
  email: "",
  notes: "",
};

/** The "I don't know what I need" escape hatch in step 2. */
export const NOT_SURE = "not-sure";

/** Turns a completed form into the message we hand to WhatsApp or email. */
export function buildQuoteMessage(
  values: QuoteValues,
  unitNameFor: (slug: string) => string,
): string {
  const chosenUnits = values.unitSlugs.map(unitNameFor).join(", ");
  const chosenExtras = values.extraIds.length
    ? values.extraIds
        .map((id) => extras.find((extra) => extra.id === id)?.label ?? id)
        .join(", ")
    : "None";

  return [
    `New quote request — ${site.name}`,
    "",
    `Name: ${values.name}`,
    `Phone: ${values.phone}`,
    values.email ? `Email: ${values.email}` : null,
    `Best contacted by: ${values.contactMethod}`,
    "",
    `Event: ${values.eventType}`,
    `Date: ${values.eventDate}`,
    `Duration: ${values.days} day${values.days === 1 ? "" : "s"}`,
    `Guests: approx. ${values.guests.toLocaleString("en-GH")}`,
    `Location: ${values.venue}, ${values.city}`,
    "",
    `Units wanted: ${chosenUnits}`,
    `Extras: ${chosenExtras}`,
    values.notes ? `` : null,
    values.notes ? `Notes: ${values.notes}` : null,
  ]
    .filter((line) => line !== null)
    .join("\n");
}
