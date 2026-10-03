import { hours, site } from "@/data/site";

const dayUri = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/** Brewery structured data: address, phone, hours, and menu. */
export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": ["Brewery", "Restaurant"],
    name: site.name,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    description: site.description,
    servesCuisine: ["American", "Pub food"],
    priceRange: "$$",
    menu: `${site.url}/kitchen/`,
    acceptsReservations: "True",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      addressCountry: "US",
    },
    openingHoursSpecification: hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${dayUri[h.day]}`,
      opens: h.open,
      closes: h.close,
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
