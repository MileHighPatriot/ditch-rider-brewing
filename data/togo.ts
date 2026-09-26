import { beers } from "@/data/beers";

/**
 * To-go catalog. Colorado lets brewpubs sell sealed beer to go, but not ship
 * it, so this is pickup only, with ID checked at the counter.
 */
export type ToGoItem = {
  id: string;
  kind: "Crowlers" | "4-packs" | "Merch";
  name: string;
  detail: string;
  price: number;
  beerId?: string;
  limit?: number;
};

export const togo: ToGoItem[] = [
  ...beers
    .filter((b) => b.fourPack)
    .map((b) => ({
      id: `4pk-${b.id}`,
      kind: "4-packs" as const,
      name: b.name,
      detail: `${b.style} · 4 × 16 oz cans`,
      price: b.fourPack!,
      beerId: b.id,
    })),
  ...beers
    .filter((b) => b.crowler)
    .map((b) => ({
      id: `crowler-${b.id}`,
      kind: "Crowlers" as const,
      name: b.name,
      detail: `${b.style.split(" · ")[0]} · 32 oz, filled at pickup`,
      price: b.crowler!,
      beerId: b.id,
      limit: b.keg < 15 ? 1 : 4,
    })),
  { id: "tee", kind: "Merch", name: "Headgate Tee", detail: "Brick red, soft cotton, wheel on the back", price: 25 },
  { id: "hat", kind: "Merch", name: "Rope Hat", detail: "Tan corduroy, embroidered wheel", price: 28 },
  { id: "glass", kind: "Merch", name: "Tulip Glass", detail: "13 oz, etched logo", price: 8 },
  { id: "gift", kind: "Merch", name: "Gift Card", detail: "$50 in food, beer, or merch. Emailed or at pickup.", price: 50 },
];

export const PICKUP_LEAD_MIN = 20;
