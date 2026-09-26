/** Private event spaces and packages. Figures are illustrative. */
export type Space = {
  id: string;
  name: string;
  seated: number;
  standing: number;
  minimum: { weekday: number; weekend: number };
  features: string[];
  photo: string;
  blurb: string;
};

export const spaces: Space[] = [
  {
    id: "headgate-room",
    name: "The Headgate Room",
    seated: 40,
    standing: 60,
    minimum: { weekday: 800, weekend: 1500 },
    features: ["Private room with its own bar", "85-inch screen and HDMI", "Sound bar and a wireless mic"],
    photo: "taproom",
    blurb: "Our private room off the main taproom. Tech Center teams book it for offsite lunches, launch parties, and the happy hour that turns into dinner.",
  },
  {
    id: "mezzanine",
    name: "Brewhouse Mezzanine",
    seated: 24,
    standing: 35,
    minimum: { weekday: 500, weekend: 900 },
    features: ["Overlooks the fermenters", "Brewer-led tour included", "Semi-private"],
    photo: "tap-pour",
    blurb: "A loft over the brewhouse for rehearsal dinners, birthdays, and anyone who wants to see where the beer comes from.",
  },
  {
    id: "patio",
    name: "Patio Buyout",
    seated: 80,
    standing: 120,
    minimum: { weekday: 2500, weekend: 4500 },
    features: ["Fire pits and heaters", "Stage with power for a band", "Dogs welcome"],
    photo: "firepit",
    blurb: "The whole patio under the string lights. Heaters and fire pits keep it going from April into November.",
  },
  {
    id: "buyout",
    name: "Full Buyout",
    seated: 180,
    standing: 250,
    minimum: { weekday: 7500, weekend: 12000 },
    features: ["Taproom, room, mezzanine, and patio", "Custom beer label available", "Dedicated event captain"],
    photo: "string-lights",
    blurb: "Everything. Company parties, fundraisers, and the occasional wedding reception.",
  },
];

export const packages = [
  { id: "hh", name: "Happy hour", perPerson: 22, note: "Pretzels, wings, queso, and a slider bar" },
  { id: "buffet", name: "Canal-side buffet", perPerson: 34, note: "Two proteins, tacos or burgers, salads, sides, cookies" },
  { id: "plated", name: "Plated dinner", perPerson: 52, note: "Three courses, each with a pairing suggestion" },
];

export const drinks = [
  { id: "tickets", name: "Drink tickets", perPerson: 14, note: "Two tickets per guest, any draft" },
  { id: "hosted", name: "Hosted bar, beer & wine", perPerson: 26, note: "Three hours, all drafts, house wine, NA options" },
  { id: "cash", name: "Guests pay their own", perPerson: 0, note: "Open tab per guest" },
];

/** Service charge and an approximate combined sales tax, for the estimate only. */
export const SERVICE = 0.2;
export const TAX = 0.075;
