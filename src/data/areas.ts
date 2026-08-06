import type { ServiceArea } from "@/types";

/** Locations we publish dedicated pages for, primarily for local search. */
export const areas: ServiceArea[] = [
  {
    slug: "accra",
    city: "Accra",
    region: "Greater Accra",
    blurb:
      "Accra is home ground. Our yard is here, our crews are here, and same-week deliveries across the city are routine — including short-notice replacements when another supplier has let an organiser down.",
    neighbourhoods: [
      "East Legon",
      "Airport City",
      "Cantonments",
      "Labone",
      "Osu",
      "Dzorwulu",
      "Spintex",
      "Adenta",
      "Madina",
      "Achimota",
    ],
    leadTime: "Same-week delivery, often next-day for standard cubicles",
    venues: [
      "Independence Square",
      "Accra International Conference Centre",
      "La Palm & beachfront venues",
      "Private compounds and garden venues",
    ],
  },
  {
    slug: "tema",
    city: "Tema",
    region: "Greater Accra",
    blurb:
      "Tema is a short run from our yard, so it is priced as local. Between the port, the industrial area and the growing residential communities, we cover everything from single-day funerals to months-long site welfare contracts.",
    neighbourhoods: [
      "Tema Community 1 – 25",
      "Sakumono",
      "Nungua",
      "Ashaiman",
      "Tema Industrial Area",
      "Afienya",
    ],
    leadTime: "Same-week delivery, no distance surcharge",
    venues: ["Industrial and port sites", "Community centres", "Church grounds", "Residential compounds"],
  },
  {
    slug: "kasoa",
    city: "Kasoa & Weija",
    region: "Greater Accra / Central",
    blurb:
      "The Kasoa–Weija corridor has grown faster than its permanent facilities, which makes portable sanitation essential for the large funerals, church conventions and open-air programmes held there.",
    neighbourhoods: ["Kasoa", "Weija", "Bortianor", "Amasaman", "Ngleshie Amanfro", "Oduman"],
    leadTime: "Same-week delivery, modest distance charge",
    venues: ["Church conventions", "Funeral grounds", "Open-air event fields", "Estate developments"],
  },
  {
    slug: "kumasi",
    city: "Kumasi",
    region: "Ashanti",
    blurb:
      "We run regularly to Kumasi for weddings, funerals and corporate programmes. Because it is a road journey, we deliver the day before so nothing depends on traffic on the morning of your event.",
    neighbourhoods: ["Ahodwo", "Nhyiaeso", "Asokwa", "Ejisu", "Suame", "Bantama"],
    leadTime: "Book 5 – 7 days ahead; delivery the day before the event",
    venues: ["Hotel lawns and garden venues", "Funeral grounds", "Church programmes", "Corporate sites"],
  },
  {
    slug: "takoradi",
    city: "Takoradi & Sekondi",
    region: "Western",
    blurb:
      "The Western Region's oil, gas and construction activity means most of our Takoradi work is long-term site welfare — cubicles and shower units on monthly hire with scheduled servicing.",
    neighbourhoods: ["Takoradi", "Sekondi", "Effia", "Anaji", "Kwesimintsim", "Agona Nkwanta"],
    leadTime: "Book 5 – 7 days ahead; monthly contracts preferred",
    venues: ["Industrial and project sites", "Beachfront events", "Hotel venues", "Community programmes"],
  },
  {
    slug: "cape-coast",
    city: "Cape Coast",
    region: "Central",
    blurb:
      "Festivals, university programmes and the tourism calendar keep Cape Coast busy. We deliver ahead of the date and can leave an attendant on site for the duration of a festival.",
    neighbourhoods: ["Cape Coast", "Elmina", "Abura", "Pedu", "Kakumdo"],
    leadTime: "Book 5 – 7 days ahead",
    venues: ["Festival grounds", "University campuses", "Historic sites", "Beach resorts"],
  },
];
