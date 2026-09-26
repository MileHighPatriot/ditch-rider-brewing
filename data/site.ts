/**
 * Single edit point for business details. Ditch Rider is a fictional brewpub
 * built as a portfolio concept: phone numbers use the 555-01xx fiction range
 * and the address is illustrative.
 */
export const site = {
  name: "Ditch Rider Brewing & Kitchen",
  shortName: "Ditch Rider",
  url: "https://ditchrider.5280webs.com",
  description:
    "A Greenwood Village brewpub three minutes from Orchard Station: 16 house beers, a scratch kitchen, a dog-friendly patio, and crowlers to go.",
  locale: "en_US",
  phone: "(303) 555-0187",
  phoneHref: "tel:+13035550187",
  email: "hello@ditchrider.example",
  eventsEmail: "events@ditchrider.example",
  address: {
    street: "5690 S Greenwood Plaza Blvd",
    city: "Greenwood Village",
    region: "CO",
    postal: "80111",
  },
  geo: { lat: 39.6089, lon: -104.8938 },
  lightRail: "3-minute walk from Orchard Station (E and H lines). Head south on Greenwood Plaza Blvd.",
  parking: "Free 3-hour parking in the garage behind us. Grab a validation ticket at the bar.",
  bikes: "Covered bike racks and a repair stand by the patio gate. The High Line Canal trail is 6 minutes by bike.",
  founded: 2021,
  instagram: "https://instagram.com/ditchriderbrewing",
};

export const fullAddress = `${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postal}`;
export const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;

/**
 * Opening hours, Denver time. Day: 0 = Sunday. The kitchen closes an hour
 * before the taproom.
 */
export const hours: { day: number; open: string; close: string }[] = [
  { day: 0, open: "10:00", close: "21:00" },
  { day: 1, open: "11:00", close: "22:00" },
  { day: 2, open: "11:00", close: "22:00" },
  { day: 3, open: "11:00", close: "22:00" },
  { day: 4, open: "11:00", close: "22:00" },
  { day: 5, open: "11:00", close: "23:00" },
  { day: 6, open: "11:00", close: "23:00" },
];

export const happyHour = { days: [1, 2, 3, 4, 5], start: "15:00", end: "18:00", deal: "$2 off pints, $6 pretzels and wings" };
export const brunch = { day: 0, start: "10:00", end: "14:00" };

export const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export const dayShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function formatTime(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${h12}${suffix}` : `${h12}:${String(m).padStart(2, "0")}${suffix}`;
}

export const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};
