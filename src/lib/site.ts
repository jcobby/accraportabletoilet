/**
 * Single source of truth for business details.
 *
 * Values marked TODO:VERIFY were inferred from the public Instagram profile
 * (@accraportabletoilets) and have not been confirmed by the business owner.
 * See CONTENT-TODO.md.
 */
export const site = {
  name: "Accra Portable Toilets",
  shortName: "APT",
  tagline: "Manufacturer, Sale & Rental",
  headline: "Clean, dignified portable toilets for every Ghanaian event",
  description:
    "Accra Portable Toilets manufactures, sells and rents luxury restroom trailers and portable toilet units across Ghana — for weddings, funerals, conferences, festivals, marathons and construction sites.",
  url: "https://www.accraportabletoilet.com",
  locale: "en_GH",

  phone: {
    display: "0558 045 600",
    intl: "+233 55 804 5600",
    href: "tel:+233558045600",
  },
  /** Digits only, international format — used to build wa.me links. */
  whatsapp: "233558045600",
  // TODO:VERIFY — replace with the real inbox before launch.
  email: "info@accraportabletoilet.com",

  address: {
    street: "", // TODO:VERIFY — yard / office address
    city: "Accra",
    region: "Greater Accra",
    country: "Ghana",
    countryCode: "GH",
  },
  /** TODO:VERIFY — approximate Accra centre until the real yard is confirmed. */
  geo: { lat: 5.6037, lng: -0.187 },

  hours: [
    { days: "Monday – Friday", time: "7:00am – 6:00pm" },
    { days: "Saturday", time: "8:00am – 5:00pm" },
    { days: "Sunday", time: "Event deliveries & standby only" },
  ],

  social: {
    instagram: "https://www.instagram.com/accraportabletoilets/",
    // TODO:VERIFY — add the real handles when confirmed.
    facebook: "",
    tiktok: "",
  },

  founded: "2019", // TODO:VERIFY
  currency: "GHS",
} as const;

/**
 * Publish the rate card?
 *
 * The figures in src/data/units.ts were written by the developer as plausible
 * placeholders — they are NOT the business's rates. While this is `false` every
 * price on the site renders "On request", so a launch cannot accidentally advertise
 * prices the owner never agreed to and would be held to by customers.
 *
 * Flip to `true` only once the owner has confirmed every figure in units.ts.
 */
export const PRICING_CONFIRMED = false;

/** Builds a wa.me deep link with a prefilled message. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${site.whatsapp}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export const DEFAULT_WHATSAPP_MESSAGE =
  `Hello ${site.name}, I would like to enquire about renting portable toilets.`;
