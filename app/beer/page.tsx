import type { Metadata } from "next";
import { Glass } from "@/components/BeerArt";
import AgeGate from "@/components/AgeGate";
import PageHead from "@/components/PageHead";
import Photo from "@/components/Photo";
import SectionHead from "@/components/SectionHead";
import BeerBoard from "@/components/tools/BeerBoard";
import Button from "@/components/ui/Button";
import { beerById, beers } from "@/data/beers";

export const metadata: Metadata = {
  title: "On Tap",
  description: `${beers.length} house beers on tap right now: lagers, IPAs, a nitro stout, sours, and non-alcoholic. Filter by style and ABV, see what's kicking soon, and build a flight.`,
};

const pours = [
  { size: "5 oz", label: "Taster", body: "Try anything. Four make a flight for $12." },
  { size: "10 oz", label: "Half pour", body: "For big beers and lunch meetings." },
  { size: "16 oz", label: "Pint", body: "Most beers are $7. Happy hour takes $2 off." },
  { size: "32 oz", label: "Crowler", body: "Filled and sealed to go. $12–16." },
];

export default function BeerPage() {
  const picks = ["ditch-rider-lager", "water-right", "canal-water"].map((id) => beerById[id]);
  return (
    <>
      <AgeGate />
      <PageHead
        eyebrow={`On tap now · ${beers.length} house beers`}
        title={
          <>
            What&rsquo;s pouring
            <br />
            <span className="text-straw">right now.</span>
          </>
        }
        lede="Everything is brewed in the tanks behind the bar. The list updates as kegs change, so if it says kicking soon, it means it."
      >
        <ul className="flex flex-wrap gap-2">
          {picks.map((b) => (
            <li key={b.id}>
              <a href={`#${b.id}`} className="flex items-center gap-2 rounded-md bg-stout-2 py-1.5 pr-4 pl-2 ring-1 ring-paper/10 hover:ring-straw/60">
                <Glass beer={b} className="h-8 w-6 text-paper" />
                <span className="text-sm">
                  <span className="block font-bold">{b.name}</span>
                  <span className="text-haze">{b.style.split(" · ")[0]}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </PageHead>

      <section className="grain py-12 lg:py-16">
        <div className="wrap">
          <BeerBoard />
        </div>
      </section>

      <section className="bg-paper section-y">
        <div className="wrap grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div>
            <SectionHead
              eyebrow="How we pour"
              title="Four sizes. No surprises."
              lede="Every beer comes in the size that fits it. Big stouts and double IPAs top out at 10 oz, so you'll still enjoy the second one."
            />
            <dl className="reveal mt-8 grid gap-3 sm:grid-cols-2">
              {pours.map((p) => (
                <div key={p.size} className="rounded-lg bg-foam p-5 ring-1 ring-line">
                  <dt className="flex items-baseline gap-3">
                    <span className="font-display text-4xl font-extrabold">{p.size}</span>
                    <span className="eyebrow text-brick-deep">{p.label}</span>
                  </dt>
                  <dd className="mt-1 text-[0.95rem] text-dust">{p.body}</dd>
                </div>
              ))}
            </dl>
            <div className="reveal mt-8 flex flex-wrap gap-3">
              <Button href="/to-go/">Take some home</Button>
              <Button href="/kitchen/" variant="outline">
                See the pairings
              </Button>
            </div>
          </div>
          <div className="reveal grid grid-cols-2 gap-4">
            <div className="aspect-[3/4] overflow-hidden rounded-lg">
              <Photo name="hazy" alt="A hazy pale beer on a copper bar top" sizes="(min-width: 1024px) 22vw, 50vw" className="h-full w-full object-cover" />
            </div>
            <div className="mt-12 aspect-[3/4] overflow-hidden rounded-lg">
              <Photo name="dark-tulip" alt="A dark stout in a tulip glass with a tan head" sizes="(min-width: 1024px) 22vw, 50vw" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
