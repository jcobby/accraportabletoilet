import type { Service } from "@/types";

export const services: Service[] = [
  {
    slug: "event-rental",
    name: "Event Rental",
    summary:
      "Short-term hire for weddings, funerals, conferences, concerts and sports events — delivered, set up and collected.",
    description: [
      "This is the bulk of what we do. You tell us the date, the venue and roughly how many guests, and we work out the right mix of units, deliver them the day before, set them up, and collect them once the programme ends.",
      "Every rental includes consumables — tissue, hand soap, sanitiser and air freshener — and a final pump-out. For programmes running past a single session we schedule mid-event servicing so units are never left in a state your guests will remember.",
    ],
    icon: "PartyPopper",
    points: [
      "Delivery, set-up and collection included",
      "Consumables stocked before every session",
      "Mid-event servicing on multi-day programmes",
      "Optional uniformed attendants",
    ],
  },
  {
    slug: "site-hire",
    name: "Long-Term Site Hire",
    summary:
      "Monthly hire for construction sites, mining camps, farms and project offices, with scheduled servicing built in.",
    description: [
      "Sites need sanitation for months, not hours. Long-term hire is quoted monthly and always includes a servicing schedule — typically weekly, more often where headcount is high.",
      "We handle the waste stream end to end, so your site manager never has to think about it. Units can be repositioned as the site moves.",
    ],
    icon: "HardHat",
    points: [
      "Monthly rates well below daily hire",
      "Scheduled servicing and waste removal",
      "Repositioning as the site progresses",
      "Shower and welfare units available",
    ],
  },
  {
    slug: "manufacturing",
    name: "Manufacturing & Fabrication",
    summary:
      "We build our own units — so we also build yours, to your specification and in your branding.",
    description: [
      "Accra Portable Toilets is a manufacturer first. Every trailer and cabin in our fleet was fabricated in our own workshop, which is why we can repair, modify and customise without waiting on an importer.",
      "If you want your own units — for a hotel group, an estate, a district assembly or a rental business of your own — we build to specification: cubicle count, fittings, tank sizes, chassis or skid mounting, and your branding on the shell.",
      "Because the units are built here, spare parts and servicing are available locally for the life of the unit.",
    ],
    icon: "Factory",
    points: [
      "Custom cubicle counts and layouts",
      "Trailer, skid or container-mounted builds",
      "Your branding applied to the shell",
      "Locally available spares and servicing",
    ],
  },
  {
    slug: "sales",
    name: "Unit Sales",
    summary:
      "Buy outright when you need sanitation permanently — schools, estates, churches, assemblies and rental businesses.",
    description: [
      "If you are hiring the same units month after month, owning them costs less. We sell new units from our workshop and deliver anywhere in Ghana.",
      "Purchase includes commissioning on site, a walkthrough for whoever will maintain the unit, and a servicing plan if you want us to keep handling the waste.",
    ],
    icon: "ShoppingBag",
    points: [
      "New units built to order",
      "Delivery and commissioning nationwide",
      "Maintenance training on handover",
      "Optional ongoing servicing contract",
    ],
  },
  {
    slug: "servicing",
    name: "Servicing & Waste Management",
    summary:
      "Pump-out, deep cleaning and restocking — for our units and for units you already own.",
    description: [
      "A portable toilet is only as good as its last service. Our crews pump out holding tanks, deep clean interiors, restock consumables and recharge the chemical treatment.",
      "We service units we did not supply, on a one-off or scheduled basis. Waste goes to a licensed treatment facility, not into a drain.",
    ],
    icon: "Droplets",
    points: [
      "Scheduled or emergency call-out",
      "Deep clean and chemical recharge",
      "Consumables restocked",
      "Waste taken to a licensed facility",
    ],
  },
  {
    slug: "event-support",
    name: "On-Site Attendants",
    summary:
      "Trained attendants who keep the facilities clean and stocked through the whole programme.",
    description: [
      "At a large event the difference between good and bad facilities is whether someone is looking after them. Our attendants stay for the duration, cleaning between rushes, restocking tissue and soap, and directing guests.",
      "For upmarket weddings and state functions we recommend one attendant per trailer.",
    ],
    icon: "Users",
    points: [
      "Uniformed and briefed before arrival",
      "Continuous cleaning and restocking",
      "Queue management at peak times",
      "Recommended for trailers and VIP areas",
    ],
  },
];
