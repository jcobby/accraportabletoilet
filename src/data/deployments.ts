import type { Deployment } from "@/types";

/**
 * Selected past work.
 *
 * ⚠ READ BEFORE EDITING
 *
 * Only entries with `verified: true` are rendered anywhere on the site. Everything
 * here was drafted by the developer from the company's public Instagram grid — the
 * events are real, but the descriptive detail (unit counts, attendants, timings) was
 * written as plausible filler, not reported from the business.
 *
 * Publishing a job a business did not do, or naming a client who did not agree to be
 * named, is the owner's liability, not the developer's. So the rule is simple:
 *
 *   Set `verified: true` only after the owner has confirmed, in writing, that
 *   (a) the job happened as described and (b) the client may be named.
 *
 * Four entries that previously claimed specific engagements — including a Government
 * of Ghana contract at Independence Square — were removed outright rather than left
 * here to be switched on by accident.
 */
export const deployments: Deployment[] = [
  {
    slug: "kwahu-business-forum",
    title: "Kwahu Business Forum",
    client: "Kwahu Business Forum",
    location: "Eastern Region",
    year: "2025",
    category: "Conference",
    units: "Restroom trailer + standard cubicles", // TODO:VERIFY exact mix with owner
    summary:
      "Delegate facilities for a multi-day business forum.",
    image: {
      src: "",
      alt: "Accra Portable Toilets units at the Kwahu Business Forum",
      ratio: "landscape",
      art: "trailer-3",
    },
    // Appears on the company's public Instagram grid, but the owner has not yet
    // confirmed the detail below. Flip once he has.
    verified: false,
  },
  {
    slug: "kimo-marathon",
    title: "KIMO Marathon",
    client: "KIMO Marathon",
    location: "Accra",
    year: "2025",
    category: "Sports",
    units: "Standard cubicles + urinal stations", // TODO:VERIFY exact mix with owner
    summary: "Route and finish-line sanitation for a mass-participation road race.",
    image: {
      src: "",
      alt: "Portable toilets positioned along a marathon route",
      ratio: "landscape",
      art: "cubicle-row",
    },
    verified: false,
  },
];
