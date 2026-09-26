/** Scratch kitchen menu. Prices are illustrative. */
export type Diet = "V" | "VG" | "GF" | "spicy";
export type Course = "Snacks" | "Plates" | "Greens & Bowls" | "Kids" | "Sweets";

export type Dish = {
  id: string;
  course: Course;
  name: string;
  desc: string;
  price: number;
  diet: Diet[];
  /** The beer we'd pour with it. */
  pairId: string;
  why: string;
  photo?: string;
  popular?: boolean;
};

export const courses: Course[] = ["Snacks", "Plates", "Greens & Bowls", "Kids", "Sweets"];

export const dietLabels: Record<Diet, string> = {
  V: "Vegetarian",
  VG: "Vegan",
  GF: "Gluten-free",
  spicy: "Spicy",
};

export const menu: Dish[] = [
  {
    id: "pretzel",
    course: "Snacks",
    name: "Brewhouse Pretzel",
    desc: "A one-pound Bavarian pretzel, beer cheese made with Ditch Rider Lager, and our whole-grain lager mustard.",
    price: 13,
    diet: ["V"],
    pairId: "ditch-rider-lager",
    why: "Salt, bread, and a clean lager. It's been working in Munich for 500 years.",
    popular: true,
  },
  {
    id: "queso",
    course: "Snacks",
    name: "Pueblo Green Chile Queso",
    desc: "Roasted Pueblo chiles, three cheeses, and house tortilla chips.",
    price: 11,
    diet: ["V", "GF", "spicy"],
    pairId: "priority-call",
    why: "Big citrus hops stand up to green chile heat instead of hiding from it.",
  },
  {
    id: "wings",
    course: "Snacks",
    name: "Smoked Wings",
    desc: "Hickory-smoked, then crisped. Dry rub or Headgate hot sauce, with blue cheese and celery.",
    price: 16,
    diet: ["GF", "spicy"],
    pairId: "headgate-ipa",
    why: "Piney bitterness cuts the smoke and the fat. Classic for a reason.",
    popular: true,
  },
  {
    id: "rings",
    course: "Snacks",
    name: "Beer-Battered Onion Rings",
    desc: "Sweet onions in an amber-ale batter, with smoked-tomato ketchup.",
    price: 10,
    diet: ["V"],
    pairId: "prior-appropriation",
    why: "Caramel malt meets caramelized onion.",
    photo: "onion-rings",
  },
  {
    id: "smash",
    course: "Plates",
    name: "Ditch Rider Smash",
    desc: "Two Colorado beef patties, American cheese, house pickles, rider sauce, potato bun, and fries.",
    price: 17,
    diet: [],
    pairId: "ditch-rider-lager",
    why: "A crisp helles resets your palate between bites so the last one tastes like the first.",
    photo: "burger",
    popular: true,
  },
  {
    id: "chile-burger",
    course: "Plates",
    name: "Pueblo Chile Burger",
    desc: "Half-pound patty, roasted Pueblo chile, pepper jack, charred onion, and fries.",
    price: 18,
    diet: ["spicy"],
    pairId: "water-right",
    why: "Juicy tropical hops and a soft body cool down the chile.",
  },
  {
    id: "hot-chicken",
    course: "Plates",
    name: "Hot Chicken Sandwich",
    desc: "Buttermilk-fried thigh, cayenne oil, slaw, pickles, and sweet-potato fries.",
    price: 17,
    diet: ["spicy"],
    pairId: "cottonwood",
    why: "Hefeweizen's banana and clove soothe the heat without dulling it.",
    photo: "chicken",
  },
  {
    id: "steak",
    course: "Plates",
    name: "Steak Frites",
    desc: "Colorado flat iron, herb butter, fries, and a little arugula salad.",
    price: 29,
    diet: ["GF"],
    pairId: "orchard-station",
    why: "Roasty dark lager echoes the char but stays light enough for a full plate.",
    photo: "steak-frites",
  },
  {
    id: "fish",
    course: "Plates",
    name: "Pils-Battered Fish & Chips",
    desc: "Wild cod in a High Line Pils batter, fries, malt-vinegar aioli, and lemon.",
    price: 21,
    diet: [],
    pairId: "high-line-pils",
    why: "The same beer in the batter and the glass. Crisp on crisp.",
  },
  {
    id: "brat",
    course: "Plates",
    name: "Bratwurst Plate",
    desc: "A Harvest Gate–braised brat, kraut, lager mustard, German potato salad, and a pretzel roll.",
    price: 19,
    diet: [],
    pairId: "harvest-gate",
    why: "Märzen and bratwurst. Oktoberfest on a plate.",
  },
  {
    id: "tacos",
    course: "Plates",
    name: "Roasted Cauliflower Tacos",
    desc: "Chile-roasted cauliflower, pickled onion, avocado crema, and cotija on corn tortillas. Ask for them vegan.",
    price: 15,
    diet: ["V", "GF"],
    pairId: "trail-radler",
    why: "Grapefruit and lime are old friends.",
  },
  {
    id: "bowl",
    course: "Greens & Bowls",
    name: "Canal Bowl",
    desc: "Farro, roasted squash, kale, pickled beets, toasted seeds, and lemon-tahini. Add chicken or salmon.",
    price: 16,
    diet: ["VG"],
    pairId: "show-night",
    why: "A delicate Kölsch doesn't bully a delicate bowl.",
  },
  {
    id: "wedge",
    course: "Greens & Bowls",
    name: "Smoked Bacon Wedge",
    desc: "Iceberg, smoked bacon, tomato, blue cheese, and buttermilk ranch.",
    price: 13,
    diet: ["GF"],
    pairId: "rider-light",
    why: "Light, cold, and gluten-reduced, for the salad crowd.",
  },
  {
    id: "kids-burger",
    course: "Kids",
    name: "Little Rider Burger",
    desc: "Single patty and cheese, with fries or fruit and a drink.",
    price: 9,
    diet: [],
    pairId: "root-beer",
    why: "Made in the brewhouse with real sassafras and vanilla. Free refills for kids.",
  },
  {
    id: "kids-tenders",
    course: "Kids",
    name: "Chicken Tenders",
    desc: "Three hand-breaded tenders, ranch, and fries or fruit.",
    price: 9,
    diet: [],
    pairId: "root-beer",
    why: "Or a lemonade, if root beer isn't their thing.",
  },
  {
    id: "kids-grilled",
    course: "Kids",
    name: "Grilled Cheese",
    desc: "White cheddar on sourdough, with fries or fruit.",
    price: 8,
    diet: ["V"],
    pairId: "root-beer",
    why: "Root beer and grilled cheese. Undefeated.",
  },
  {
    id: "float",
    course: "Sweets",
    name: "Stout Float",
    desc: "Canal Water nitro stout over vanilla bean ice cream. 21+. Kids get the root-beer version.",
    price: 9,
    diet: ["V"],
    pairId: "canal-water",
    why: "Coffee, chocolate, cream. It's a milkshake with ambition.",
  },
  {
    id: "cookie",
    course: "Sweets",
    name: "Skillet Cookie",
    desc: "Brown-butter chocolate chip cookie baked to order, with vanilla ice cream. Serves two, or one.",
    price: 10,
    diet: ["V"],
    pairId: "irrigation-night",
    why: "Barrel-aged stout and warm chocolate. A 5 oz pour is plenty.",
  },
];

/** House-made root beer, for the kids menu pairings. */
export const rootBeer = { id: "root-beer", name: "House Root Beer", price: 4 };

export const dishById = Object.fromEntries(menu.map((d) => [d.id, d])) as Record<string, Dish>;
