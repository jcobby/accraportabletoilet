export interface NavItem {
  href: string;
  label: string;
}

export const mainNav: NavItem[] = [
  { href: "/fleet", label: "Our fleet" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Past work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Hire & buy",
    items: [
      { href: "/fleet", label: "The full fleet" },
      { href: "/fleet/executive-3-door-restroom-trailer", label: "Executive 3-door trailer" },
      { href: "/fleet/luxury-2-door-restroom-trailer", label: "Luxury 2-door trailer" },
      { href: "/fleet/standard-portable-toilet", label: "Standard cubicles" },
      { href: "/fleet/accessible-unit", label: "Accessible units" },
    ],
  },
  {
    title: "Services",
    items: [
      { href: "/services#event-rental", label: "Event rental" },
      { href: "/services#site-hire", label: "Long-term site hire" },
      { href: "/services#manufacturing", label: "Manufacturing" },
      { href: "/services#servicing", label: "Servicing & waste" },
    ],
  },
  {
    title: "Where we deliver",
    items: [
      { href: "/areas/accra", label: "Accra" },
      { href: "/areas/tema", label: "Tema" },
      { href: "/areas/kasoa", label: "Kasoa & Weija" },
      { href: "/areas/kumasi", label: "Kumasi" },
      { href: "/areas/takoradi", label: "Takoradi" },
    ],
  },
];
