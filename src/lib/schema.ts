import type { Faq, Unit } from "@/types";
import { site } from "@/lib/site";

const ORG_ID = `${site.url}/#organisation`;

export function organisationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: site.name,
    url: site.url,
    description: site.description,
    telephone: site.phone.intl,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      addressCountry: site.address.countryCode,
    },
    sameAs: [site.social.instagram, site.social.facebook, site.social.tiktok].filter(Boolean),
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.url}/#localbusiness`,
    name: site.name,
    image: `${site.url}/opengraph-image`,
    url: site.url,
    telephone: site.phone.intl,
    email: site.email,
    // schema.org expects the symbolic form here, not a figure.
    priceRange: "$$",
    parentOrganization: { "@id": ORG_ID },
    address: {
      "@type": "PostalAddress",
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      addressCountry: site.address.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    areaServed: [
      { "@type": "Country", name: "Ghana" },
      { "@type": "City", name: "Accra" },
      { "@type": "City", name: "Tema" },
      { "@type": "City", name: "Kumasi" },
      { "@type": "City", name: "Takoradi" },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "08:00",
        closes: "17:00",
      },
    ],
    makesOffer: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Portable toilet rental" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Restroom trailer hire" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Portable toilet manufacturing" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Sanitation servicing and waste removal" } },
    ],
  };
}

export function breadcrumbSchema(trail: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${site.url}${crumb.href}`,
    })),
  };
}

export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function unitSchema(unit: Unit) {
  const price = unit.pricing.perDay;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: unit.name,
    description: unit.summary,
    category: "Portable sanitation",
    brand: { "@type": "Brand", name: site.name },
    url: `${site.url}/fleet/${unit.slug}`,
    ...(price
      ? {
          offers: {
            "@type": "Offer",
            price: String(price),
            priceCurrency: "GHS",
            availability: "https://schema.org/InStock",
            url: `${site.url}/fleet/${unit.slug}`,
            seller: { "@id": ORG_ID },
            eligibleCustomerType: "https://schema.org/Enduser",
            description: "Indicative day rate for hire within Accra.",
          },
        }
      : {}),
  };
}
