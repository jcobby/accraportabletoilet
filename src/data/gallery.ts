import type { GalleryPhoto } from "@/types";

/**
 * The photo gallery. All real photography supplied by the business.
 *
 * Unlike `deployments.ts` these make no claim about a specific client or job — they
 * show the units and the operation, so nothing here needs the owner to verify a
 * customer name before it can be published.
 *
 * ORDER MATTERS. The masonry lays photos out in source order, so the list is
 * deliberately interleaved across categories. Grouping them by category instead puts
 * five timber interiors down one column and leaves the "Everything" view looking
 * segregated and brown on one side. Filtering still works from each item's
 * `category`, so the interleaving costs nothing.
 */
export const galleryPhotos: GalleryPhoto[] = [
  {
    src: "/images/gallery/interior-mirror-wc.jpg",
    alt: "Timber-clad trailer interior with a round mirror, framed pictures, vanity cabinet and ceramic WC",
    category: "interiors",
    caption: "Timber cladding, a round mirror and framed prints — finished like a room, not a cubicle.",
  },
  {
    src: "/images/gallery/trailer-roadside.jpg",
    alt: "Two-door restroom trailer set down at the roadside on turf steps",
    category: "trailers",
    caption: "Levelled, stepped and ready — usually the day before the event.",
  },
  {
    src: "/images/gallery/fleet-row-pavilion.jpg",
    alt: "A row of restroom trailers lined up on tarmac beside an event pavilion",
    category: "on-site",
    caption: "A bank of units for a large programme — sited together, serviced together.",
  },
  {
    src: "/images/gallery/interior-vanity-urinal.jpg",
    alt: "Trailer interior showing the vanity basin, urinal, ceramic WC and wood-effect floor",
    category: "interiors",
    caption: "Vanity basin, urinal and WC in one cubicle, with an extractor fan overhead.",
  },
  // WITHHELD: /images/gallery/trailer-front-marquee.jpg
  //
  // The livery on that unit reads "059 632 5186" and "accraportabletoilets.com"
  // (plural). Every other unit in the set — and this website — carries
  // "0558 045 600" and "accraportabletoilet.com" (singular). Publishing a photograph
  // that advertises a different number and a different domain works against the one
  // thing the page exists to do. The file is processed and on disk; restore this
  // entry once the owner confirms whether that number is also his.
  {
    src: "/images/gallery/vacuum-tanker.jpg",
    alt: "Accra Portable Toilets vacuum tanker truck used for pump-out and waste removal",
    category: "servicing",
    caption: "Our own tanker. Waste is pumped out by our crew and taken to a licensed facility.",
  },
  {
    src: "/images/gallery/trailer-under-tree.jpg",
    alt: "Restroom trailer set up on grass in the shade of a large tree",
    category: "on-site",
  },
  {
    src: "/images/units/shared/trailer-interior.jpg",
    alt: "Inside a restroom trailer — timber-clad walls, ceramic WC, urinal and vanity basin",
    category: "interiors",
    caption: "Every trailer interior is finished in timber and lit properly.",
  },
  {
    src: "/images/gallery/trailer-rear-angle.jpg",
    alt: "Rear corner of a restroom trailer showing the spare wheel and ventilation units",
    category: "trailers",
  },
  {
    src: "/images/gallery/fleet-row-grass.jpg",
    alt: "Several restroom trailers positioned on grass at an outdoor venue",
    category: "on-site",
  },
  {
    src: "/images/units/standard-portable-toilet/interior-blue.jpg",
    alt: "Inside a standard cubicle — flushing WC, corner wash basin and foot pump",
    category: "interiors",
    caption: "Standard cubicles carry a flushing WC and a corner basin as standard.",
  },
  {
    src: "/images/units/luxury-2-door-restroom-trailer/garden.jpg",
    alt: "Two-door restroom trailer in a garden compound with the door lights on",
    category: "trailers",
    caption: "Door lights on for an evening reception.",
  },
  {
    src: "/images/gallery/delivery-flatbed.jpg",
    alt: "A portable toilet unit being delivered on a flatbed truck on an upcountry road",
    category: "servicing",
    caption: "Delivering upcountry — we cover the whole country, not just Accra.",
  },
  {
    src: "/images/units/executive-3-door-restroom-trailer/lawn.jpg",
    alt: "Executive three-door restroom trailer on a lawn behind a rope barrier",
    category: "on-site",
  },
  {
    src: "/images/units/standard-portable-toilet/interior-tan.jpg",
    alt: "Inside a standard cubicle showing the WC, urinal and hand sanitiser dispenser",
    category: "interiors",
  },
  {
    src: "/images/gallery/trailer-side-closed.jpg",
    alt: "Side view of a closed restroom trailer parked at the roadside",
    category: "trailers",
  },
  {
    src: "/images/gallery/trailer-on-grass.jpg",
    alt: "Restroom trailer standing on open grass under a cloudy sky",
    category: "on-site",
  },
  {
    src: "/images/units/luxury-2-door-restroom-trailer/street.jpg",
    alt: "Two-door restroom trailer delivered and levelled at the kerbside",
    category: "trailers",
  },
  {
    src: "/images/units/executive-3-door-restroom-trailer/event.jpg",
    alt: "Guests stepping up into a restroom trailer during an event",
    category: "on-site",
    caption: "In use, mid-programme — the only real test.",
  },
];
