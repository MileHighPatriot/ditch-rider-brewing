import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import Photo from "@/components/Photo";
import SectionHead from "@/components/SectionHead";
import KitchenMenu from "@/components/tools/KitchenMenu";
import Button from "@/components/ui/Button";
import { brunch, formatTime, happyHour } from "@/data/site";

export const metadata: Metadata = {
  title: "Kitchen Menu",
  description:
    "A scratch kitchen in Greenwood Village: smash burgers, smoked wings, a one-pound pretzel, and a kids menu. Every dish is paired with a house beer. Vegetarian, vegan, and gluten-free options.",
};

const photos = [
  { name: "burger-board", alt: "A burger and fries on a wooden board" },
  { name: "onion-rings", alt: "Beer-battered onion rings with dipping sauces and a pint of amber" },
  { name: "grill", alt: "Burger patties searing over open flames" },
];

export default function KitchenPage() {
  return (
    <>
      <PageHead
        eyebrow="Kitchen · open till an hour before close"
        title={
          <>
            Built to go
            <br />
            <span className="text-straw">with the beer.</span>
          </>
        }
        lede="Chef Tomás Reyes cooks like the beer is an ingredient, because half the time it is. Every plate lists the pour we'd put next to it."
      >
        <dl className="grid max-w-2xl grid-cols-2 gap-4 border-t border-paper/15 pt-6 sm:grid-cols-3">
          <div className="flex flex-col-reverse">
            <dt className="text-sm text-haze">Happy hour, weekdays {formatTime(happyHour.start)}–{formatTime(happyHour.end)}</dt>
            <dd className="font-display text-3xl font-extrabold">$6 pretzels</dd>
          </div>
          <div className="flex flex-col-reverse">
            <dt className="text-sm text-haze">
              Sundays {formatTime(brunch.start)}–{formatTime(brunch.end)}
            </dt>
            <dd className="font-display text-3xl font-extrabold">Brunch</dd>
          </div>
          <div className="flex flex-col-reverse">
            <dt className="text-sm text-haze">Crayons and root beer included</dt>
            <dd className="font-display text-3xl font-extrabold">Kids $8–9</dd>
          </div>
        </dl>
      </PageHead>

      <section className="grain pt-4 pb-20 lg:pb-28">
        <div className="wrap">
          <KitchenMenu />
        </div>
      </section>

      <section className="bg-stout section-y text-paper">
        <div className="wrap grid items-center gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            <SectionHead
              light
              eyebrow="Why a kitchen"
              title="A brewpub is half kitchen."
              lede="In Colorado, a brewpub has to make at least 15% of its sales from food. We'd have built this kitchen anyway. Pretzel dough uses our spent grain, the fish batter uses the pils, and the brats are braised in whatever lager is freshest."
            />
            <div className="reveal mt-8 flex flex-wrap gap-3">
              <Button href="/to-go/" variant="straw">
                Order to go
              </Button>
              <Button href="/private-events/" variant="outline-light">
                Cater a party
              </Button>
            </div>
          </div>
          <div className="reveal grid grid-cols-3 gap-3">
            {photos.map((p, i) => (
              <div key={p.name} className={`aspect-[3/4] overflow-hidden rounded-lg ${i === 1 ? "mt-10" : ""}`}>
                <Photo name={p.name} alt={p.alt} sizes="(min-width: 1024px) 18vw, 33vw" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
