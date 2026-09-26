/**
 * The tap list. In production this would come from a taplist service reading
 * keg monitors; here `keg` is the percent left in the keg, so "kicking soon"
 * is driven by the same number a real Kegtron sensor would report.
 */
export type Family = "Lagers" | "Light & Wheat" | "Hoppy" | "Amber & Malty" | "Dark" | "Sour & Fruit" | "Non-alc";
export type Tag = "new" | "seasonal" | "gr" | "na" | "nitro" | "barrel";
export type Pattern = "waves" | "stripes" | "chevron" | "sun" | "dots" | "grid" | "peaks";

export type Beer = {
  id: string;
  tap: number;
  name: string;
  style: string;
  family: Family;
  abv: number;
  ibu: number;
  /** Beer color on the SRM scale. `hex` overrides it for fruit beers. */
  srm: number;
  hex?: string;
  notes: string;
  tags: Tag[];
  keg: number;
  /** Prices for a 5 oz taster, 10 oz, and 16 oz pour. Null = not poured in that size. */
  pours: [number, number, number | null];
  crowler?: number;
  fourPack?: number;
  pairId: string;
  label: { pattern: Pattern; accent: string };
};

export const families: Family[] = ["Lagers", "Light & Wheat", "Hoppy", "Amber & Malty", "Dark", "Sour & Fruit", "Non-alc"];

export const tagLabels: Record<Tag, string> = {
  new: "New",
  seasonal: "Seasonal",
  gr: "Gluten-reduced",
  na: "Non-alcoholic",
  nitro: "Nitro",
  barrel: "Barrel-aged",
};

export const beers: Beer[] = [
  {
    id: "ditch-rider-lager",
    tap: 1,
    name: "Ditch Rider Lager",
    style: "Munich Helles",
    family: "Lagers",
    abv: 4.8,
    ibu: 18,
    srm: 4,
    notes: "Our flagship. Soft bread, a little honey, and a clean finish that asks for a second one.",
    tags: [],
    keg: 64,
    pours: [3, 5, 7],
    crowler: 12,
    fourPack: 14,
    pairId: "smash",
    label: { pattern: "waves", accent: "#b8391f" },
  },
  {
    id: "high-line-pils",
    tap: 2,
    name: "High Line Pils",
    style: "German Pilsner",
    family: "Lagers",
    abv: 5.1,
    ibu: 36,
    srm: 3,
    notes: "Crisp, floral, and snappy. Named for the canal that runs a few blocks east.",
    tags: [],
    keg: 81,
    pours: [3, 5, 7],
    crowler: 12,
    fourPack: 15,
    pairId: "fish",
    label: { pattern: "stripes", accent: "#2d5d6b" },
  },
  {
    id: "orchard-station",
    tap: 3,
    name: "Orchard Station",
    style: "Czech Dark Lager",
    family: "Lagers",
    abv: 4.6,
    ibu: 24,
    srm: 24,
    notes: "Dark as a stout, light as a lager. Cocoa, toasted bread, and gone before you know it.",
    tags: [],
    keg: 12,
    pours: [3, 5, 7],
    crowler: 12,
    pairId: "steak",
    label: { pattern: "grid", accent: "#e8b64a" },
  },
  {
    id: "harvest-gate",
    tap: 4,
    name: "Harvest Gate",
    style: "Märzen",
    family: "Amber & Malty",
    abv: 5.8,
    ibu: 22,
    srm: 10,
    notes: "Our Oktoberfest lager. Toasty, bready malt and a dry finish built for a one-liter stein.",
    tags: ["seasonal", "new"],
    keg: 93,
    pours: [3, 6, 8],
    crowler: 13,
    pairId: "brat",
    label: { pattern: "sun", accent: "#b8391f" },
  },
  {
    id: "headgate-ipa",
    tap: 5,
    name: "Headgate IPA",
    style: "West Coast IPA",
    family: "Hoppy",
    abv: 6.8,
    ibu: 65,
    srm: 6,
    notes: "Pine, grapefruit pith, and a bitter handshake. The one the brewers drink after a shift.",
    tags: [],
    keg: 45,
    pours: [3, 6, 8],
    crowler: 13,
    fourPack: 17,
    pairId: "wings",
    label: { pattern: "chevron", accent: "#5f6a1c" },
  },
  {
    id: "water-right",
    tap: 6,
    name: "Water Right",
    style: "Hazy IPA",
    family: "Hoppy",
    abv: 6.5,
    ibu: 30,
    srm: 5,
    notes: "Mango, orange, and a pillowy body. First in time, first in right.",
    tags: [],
    keg: 38,
    pours: [4, 6, 8],
    crowler: 14,
    fourPack: 18,
    pairId: "chile-burger",
    label: { pattern: "dots", accent: "#e8b64a" },
  },
  {
    id: "priority-call",
    tap: 7,
    name: "Priority Call",
    style: "Double IPA",
    family: "Hoppy",
    abv: 8.4,
    ibu: 80,
    srm: 7,
    notes: "Resin, tangerine, and enough alcohol to make it a 10 oz beer. Once it's gone, it's gone.",
    tags: [],
    keg: 9,
    pours: [4, 7, null],
    crowler: 16,
    pairId: "queso",
    label: { pattern: "peaks", accent: "#b8391f" },
  },
  {
    id: "wet-ditch",
    tap: 8,
    name: "Wet Ditch",
    style: "Fresh Hop Pale Ale",
    family: "Hoppy",
    abv: 5.6,
    ibu: 40,
    srm: 6,
    notes: "Colorado Cascade picked on a Monday and in the kettle by Tuesday. Grassy, bright, and only here in the fall.",
    tags: ["new", "seasonal"],
    keg: 97,
    pours: [3, 6, 8],
    crowler: 13,
    pairId: "rings",
    label: { pattern: "waves", accent: "#5f6a1c" },
  },
  {
    id: "prior-appropriation",
    tap: 9,
    name: "Prior Appropriation",
    style: "Amber Ale",
    family: "Amber & Malty",
    abv: 5.4,
    ibu: 28,
    srm: 14,
    notes: "Caramel, biscuit, and just enough hops. Senior rights to your Thursday night.",
    tags: [],
    keg: 55,
    pours: [3, 5, 7],
    crowler: 12,
    pairId: "rings",
    label: { pattern: "stripes", accent: "#b8391f" },
  },
  {
    id: "cottonwood",
    tap: 10,
    name: "Cottonwood Hefe",
    style: "Hefeweizen",
    family: "Light & Wheat",
    abv: 5.0,
    ibu: 12,
    srm: 4,
    notes: "Banana, clove, and cloud-soft. Tames anything spicy on the menu.",
    tags: [],
    keg: 70,
    pours: [3, 5, 7],
    crowler: 12,
    pairId: "hot-chicken",
    label: { pattern: "sun", accent: "#2d5d6b" },
  },
  {
    id: "show-night",
    tap: 11,
    name: "Show Night",
    style: "Kölsch",
    family: "Light & Wheat",
    abv: 4.7,
    ibu: 20,
    srm: 3,
    notes: "Delicate, crisp, a little fruity. Brewed for the walk up to the amphitheater.",
    tags: [],
    keg: 58,
    pours: [3, 5, 7],
    crowler: 12,
    fourPack: 14,
    pairId: "bowl",
    label: { pattern: "dots", accent: "#b8391f" },
  },
  {
    id: "canal-water",
    tap: 12,
    name: "Canal Water",
    style: "Oatmeal Stout · Nitro",
    family: "Dark",
    abv: 5.5,
    ibu: 32,
    srm: 38,
    notes: "Poured on nitro. Coffee, dark chocolate, and a creamy head that lasts to the bottom of the glass.",
    tags: ["nitro"],
    keg: 41,
    pours: [3, 6, 8],
    pairId: "float",
    label: { pattern: "waves", accent: "#a9c3cb" },
  },
  {
    id: "irrigation-night",
    tap: 13,
    name: "Irrigation Night",
    style: "Bourbon Barrel Imperial Stout",
    family: "Dark",
    abv: 11.2,
    ibu: 55,
    srm: 45,
    notes: "A year in Colorado bourbon barrels. Fudge, vanilla, and a slow warmth. Sip it.",
    tags: ["new", "barrel"],
    keg: 30,
    pours: [5, 9, null],
    pairId: "cookie",
    label: { pattern: "peaks", accent: "#e8b64a" },
  },
  {
    id: "cherry-creek",
    tap: 14,
    name: "Cherry Creek",
    style: "Cherry Kettle Sour",
    family: "Sour & Fruit",
    abv: 5.2,
    ibu: 8,
    srm: 12,
    hex: "#9b2335",
    notes: "Tart Montmorency cherries and a clean lactic snap. Pink as the sunset over Chatfield.",
    tags: [],
    keg: 22,
    pours: [3, 6, 8],
    crowler: 14,
    pairId: "tacos",
    label: { pattern: "chevron", accent: "#9b2335" },
  },
  {
    id: "trail-radler",
    tap: 15,
    name: "Trail Radler",
    style: "Grapefruit Radler",
    family: "Sour & Fruit",
    abv: 3.2,
    ibu: 10,
    srm: 4,
    hex: "#f0c46a",
    notes: "Half Ditch Rider Lager, half fresh grapefruit soda. The post-ride pint.",
    tags: [],
    keg: 66,
    pours: [3, 5, 7],
    fourPack: 14,
    pairId: "tacos",
    label: { pattern: "sun", accent: "#ef7b5c" },
  },
  {
    id: "rider-light",
    tap: 16,
    name: "Rider Light",
    style: "Light Lager · Gluten-reduced",
    family: "Lagers",
    abv: 4.2,
    ibu: 12,
    srm: 2,
    notes: "Brewed with an enzyme that breaks down gluten to under 20 ppm. Not safe for celiac, but a good pint for the gluten-shy.",
    tags: ["gr"],
    keg: 77,
    pours: [3, 5, 6],
    fourPack: 13,
    pairId: "wedge",
    label: { pattern: "grid", accent: "#2d5d6b" },
  },
  {
    id: "designated",
    tap: 17,
    name: "Designated",
    style: "Non-alcoholic Hazy IPA",
    family: "Non-alc",
    abv: 0.4,
    ibu: 25,
    srm: 5,
    notes: "All the citrus and none of the buzz. For the driver, the early meeting, or just because.",
    tags: ["na"],
    keg: 50,
    pours: [2, 4, 5],
    fourPack: 12,
    pairId: "queso",
    label: { pattern: "stripes", accent: "#5f6a1c" },
  },
];

export const beerById = Object.fromEntries(beers.map((b) => [b.id, b])) as Record<string, Beer>;

/** Approximate SRM → hex, for glass and can art. */
const srmScale: [number, string][] = [
  [2, "#f8e37a"],
  [3, "#f5d85a"],
  [4, "#eac73a"],
  [5, "#dfb02c"],
  [6, "#d49a28"],
  [8, "#c9822a"],
  [10, "#b96a28"],
  [13, "#9c4f24"],
  [17, "#7a391c"],
  [20, "#5c2a17"],
  [24, "#452012"],
  [29, "#321710"],
  [35, "#24110c"],
  [45, "#1a0c08"],
];

export function beerColor(b: Pick<Beer, "srm" | "hex">) {
  if (b.hex) return b.hex;
  let c = srmScale[0][1];
  for (const [s, hex] of srmScale) if (b.srm >= s) c = hex;
  return c;
}

/** Dark beers get light type on their color. */
export const isDark = (b: Pick<Beer, "srm" | "hex">) => (b.hex ? b.hex === "#9b2335" : b.srm >= 13);

/**
 * Tasting order for a flight: lighter, lower-alcohol, less bitter beers first;
 * sours and big barrel beers last so they don't flatten what comes after.
 */
export function tastingScore(b: Beer) {
  const sour = b.family === "Sour & Fruit" ? 4 : 0;
  const barrel = b.tags.includes("barrel") ? 6 : 0;
  return b.abv + b.ibu / 22 + b.srm / 9 + sour + barrel;
}

export const KICKING = 15;
