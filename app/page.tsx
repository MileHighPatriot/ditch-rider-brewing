import Link from "next/link";
import { Can, Glass, KegBar } from "@/components/BeerArt";
import Icon from "@/components/Icon";
import NowBoard from "@/components/NowBoard";
import Photo from "@/components/Photo";
import SectionHead from "@/components/SectionHead";
import Button from "@/components/ui/Button";
import { beerById, beers, KICKING } from "@/data/beers";
import { events } from "@/data/events";
import { menu } from "@/data/menu";
import { mapsHref, site } from "@/data/site";

const fmt = (iso: string) => new Date(`${iso}:00`).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

const policies = [
  { icon: "dog", title: "Dogs on the patio", body: "Water bowls and biscuits at the gate. Inside is humans only (Colorado rules, not ours)." },
  { icon: "child", title: "Kids welcome", body: "Kids menu, crayons, and lawn games. Minors with an adult until 9pm." },
  { icon: "train", title: "3 min from light rail", body: "Orchard Station, E and R lines. Ride home, no parking needed." },
  { icon: "bike", title: "Bike racks & a repair stand", body: "Six minutes from the High Line Canal trail. Post-ride pint encouraged." },
];

export default function Home() {
  const featured = ["harvest-gate", "wet-ditch", "water-right", "canal-water", "irrigation-night"].map((id) => beerById[id]);
  const cans = beers.filter((b) => b.fourPack).slice(0, 6);
  const dishes = menu.filter((d) => d.popular);
  const upcoming = events.filter((e) => e.featured).slice(1, 4);

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="glow relative overflow-hidden bg-stout text-paper" style={{ "--glow-x": "78%", "--glow-y": "35%" } as React.CSSProperties}>
        <div className="wrap grid items-center gap-12 pt-12 pb-20 lg:grid-cols-[1.2fr_1fr] lg:gap-14 lg:pt-16 lg:pb-24">
          <div>
            <p className="eyebrow animate-rise text-straw">Brewpub · Greenwood Village, Colorado</p>
            <h1 className="display mt-5 animate-rise [animation-delay:60ms]">
              Brewed here.
              <br />
              Grilled here.
              <br />
              <span className="text-straw">Poured cold.</span>
            </h1>
            <p className="mt-7 max-w-xl animate-rise text-lg leading-relaxed text-haze [animation-delay:120ms] sm:text-xl">
              Seventeen house beers from the brewhouse behind the bar, a scratch kitchen that takes food as seriously as the beer, and a
              patio three minutes from Orchard Station.
            </p>
            <div className="mt-9 flex animate-rise flex-wrap gap-3 [animation-delay:180ms]">
              <Button href="/beer/">See what&rsquo;s pouring</Button>
              <Button href="/kitchen/" variant="outline-light" arrow={false}>
                Kitchen menu
              </Button>
            </div>
            <dl className="mt-12 grid max-w-lg animate-rise grid-cols-3 gap-4 border-t border-paper/15 pt-6 [animation-delay:240ms]">
              {[
                [String(beers.length), "on tap"],
                ["$7", "a pint"],
                ["3 min", "to light rail"],
              ].map(([v, l]) => (
                <div key={l} className="flex flex-col-reverse">
                  <dt className="text-sm text-haze">{l}</dt>
                  <dd className="font-display text-4xl font-extrabold">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative ml-auto aspect-[4/5] w-[80%] overflow-hidden rounded-lg ring-1 ring-paper/10">
              <Photo name="tap-pour" alt="A bartender pulling a pint of dark beer from a brass tap" sizes="(min-width: 1024px) 34vw, 80vw" priority className="h-full w-full object-cover object-[35%_center]" />
              <div className="absolute inset-0 bg-gradient-to-t from-stout/60 via-transparent to-transparent" />
            </div>
            <div className="label-frame relative -mt-48 w-[88%] rounded-lg bg-foam p-5 text-ink shadow-[0_30px_70px_-25px_rgb(0_0_0/0.8)] [--frame:var(--color-line)] sm:-mt-56 sm:w-[76%] sm:p-6">
              <div className="flex items-baseline justify-between gap-3">
                <p className="font-display text-3xl font-extrabold uppercase">New & notable</p>
                <Link href="/beer/" className="text-xs font-bold tracking-wider text-brick-deep uppercase hover:underline">
                  All {beers.length} taps
                </Link>
              </div>
              <ul className="mt-3 divide-y divide-line">
                {featured.map((b) => (
                  <li key={b.id} className="flex items-center gap-3 py-2.5">
                    <Glass beer={b} className="h-10 w-7 shrink-0 text-ink" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-bold">{b.name}</p>
                      <p className="truncate text-xs text-dust">
                        {b.style} · {b.abv}%
                      </p>
                    </div>
                    {b.tags.includes("new") ? (
                      <span className="rounded-sm bg-brick px-1.5 py-0.5 text-[0.65rem] font-bold tracking-wider text-paper uppercase">New</span>
                    ) : b.keg < 50 ? (
                      <span className="hidden sm:block">
                        <KegBar pct={b.keg} kicking={b.keg < KICKING} />
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="canal-rule canal-rule-light absolute inset-x-0 bottom-0" aria-hidden />
      </section>

      {/* ---------- Right now ---------- */}
      <section className="bg-stout pb-16 text-paper">
        <div className="wrap pt-12">
          <NowBoard />
        </div>
      </section>

      {/* ---------- Kitchen ---------- */}
      <section className="grain section-y">
        <div className="wrap grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div className="relative">
            <div className="reveal aspect-[4/3] overflow-hidden rounded-lg">
              <Photo name="burger" alt="A burger with pickled red onion on a white plate, warm lights behind" sizes="(min-width: 1024px) 42vw, 100vw" className="h-full w-full object-cover" />
            </div>
            <p className="reveal absolute -bottom-5 left-5 max-w-xs rounded-md bg-stout px-4 py-3 text-sm text-haze shadow-xl">
              <span className="aside text-lg text-straw">A brewpub, by law.</span> Colorado brewpubs have to earn 15% of sales from food. Ours
              passed that in the first week.
            </p>
          </div>
          <div className="pt-6 lg:pt-0">
            <SectionHead
              eyebrow="The kitchen"
              title={
                <>
                  Real food.
                  <br />
                  Every plate has a pint.
                </>
              }
              lede="Chef Tomás Reyes runs a scratch kitchen: wings smoked out back, pickles made in house, pretzels baked every morning. Every dish on the menu comes with the beer we'd pour next to it."
            />
            <ul className="reveal mt-8 divide-y divide-line border-y border-line">
              {dishes.map((d) => {
                const b = beerById[d.pairId];
                return (
                  <li key={d.id} className="flex items-center gap-4 py-4">
                    <div className="min-w-0 flex-1">
                      <p className="flex items-baseline justify-between gap-3">
                        <span className="font-display text-2xl font-extrabold uppercase">{d.name}</span>
                        <span className="font-display text-2xl font-extrabold text-brick-deep">${d.price}</span>
                      </p>
                      <p className="mt-0.5 flex items-center gap-2 text-sm text-dust">
                        <Glass beer={b} className="h-5 w-3.5 shrink-0 text-ink" /> Pairs with <strong className="text-ink">{b.name}</strong>
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="reveal mt-8 flex flex-wrap gap-3">
              <Button href="/kitchen/" variant="stout">
                Full menu & pairings
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- To go ---------- */}
      <section className="bg-kraft section-y">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead
              eyebrow="To go"
              title="Take a 4-pack home."
              lede="Order ahead and pick up in 20 minutes. Crowlers are filled and sealed when you walk in. (Colorado doesn't let breweries ship beer, so it's pickup only.)"
            />
            <div className="reveal">
              <Button href="/to-go/">Order for pickup</Button>
            </div>
          </div>
          <ul className="reveal mt-12 grid grid-cols-3 gap-x-4 gap-y-8 sm:grid-cols-6">
            {cans.map((b) => (
              <li key={b.id} className="text-center">
                <Link href="/to-go/" className="group block">
                  <Can beer={b} className="mx-auto h-40 w-24 drop-shadow-[0_18px_18px_rgb(22_18_14/0.28)] transition-transform duration-300 group-hover:-translate-y-2 sm:h-48 sm:w-28" />
                  <p className="mt-3 font-bold">{b.name}</p>
                  <p className="text-sm text-dust">${b.fourPack} / 4-pack</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Events ---------- */}
      <section className="glow bg-stout section-y text-paper" style={{ "--glow-x": "15%", "--glow-y": "0%" } as React.CSSProperties}>
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead light eyebrow="Coming up" title="Trivia, tap takeovers, and a five-year party." />
            <div className="reveal">
              <Button href="/events/" variant="straw">
                All events
              </Button>
            </div>
          </div>
          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {upcoming.map((e) => (
              <li key={e.id} className="reveal">
                <Link href={`/events/#${e.id}`} className="group flex h-full flex-col rounded-lg bg-stout-2 p-6 ring-1 ring-paper/10 transition-colors hover:ring-straw/60">
                  <span className="eyebrow text-straw">
                    {fmt(e.start)} · {e.kind}
                  </span>
                  <span className="mt-3 font-display text-3xl font-extrabold uppercase">{e.title}</span>
                  <span className="mt-2 line-clamp-3 flex-1 text-haze">{e.blurb}</span>
                  <span className="mt-5 flex items-center gap-2 text-sm font-bold tracking-wide text-paper uppercase">
                    Details <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Visit ---------- */}
      <section className="grain section-y">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            <SectionHead
              eyebrow="Find us"
              title={
                <>
                  A block from
                  <br />
                  <span className="text-brick-deep">Orchard Station.</span>
                </>
              }
              lede={`${site.address.street}, ${site.address.city}, on the Tech Center side of I-25. The after-work crowd shows up around 4; the patio is at its best around sunset.`}
            />
            <div className="reveal mt-8 flex flex-wrap gap-3">
              <Button href="/visit/" variant="stout">
                Hours, patio & parking
              </Button>
              <Button href={mapsHref} variant="ghost">
                Directions
              </Button>
            </div>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {policies.map((p) => (
              <li key={p.title} className="reveal rounded-lg bg-paper p-6 ring-1 ring-line">
                <span className="grid h-11 w-11 place-items-center rounded-md bg-stout text-straw">
                  <Icon name={p.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-3xl">{p.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-dust">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Mug club / private ---------- */}
      <section className="bg-foam pb-20 lg:pb-28">
        <div className="wrap grid gap-5 md:grid-cols-2">
          {[
            {
              href: "/private-events/",
              photo: "firepit",
              alt: "A fire pit burning on a patio at dusk",
              eyebrow: "Private events",
              title: "Book the Headgate Room",
              body: "Team happy hours, launch parties, rehearsal dinners. Four spaces from 24 to 250 people, with a price estimate in 30 seconds.",
            },
            {
              href: "/mug-club/",
              photo: "amber",
              alt: "A pint of amber ale on a weathered wood table",
              eyebrow: "Mug Club",
              title: "Your mug on our wall",
              body: "A 20 oz mug for the price of a pint, first dibs on releases, and a member-only brew day. 150 members, short waitlist.",
            },
          ].map((c) => (
            <Link key={c.href} href={c.href} className="reveal group relative isolate flex min-h-[26rem] flex-col justify-end overflow-hidden rounded-lg p-7 text-paper sm:p-9">
              <Photo name={c.photo} alt={c.alt} sizes="(min-width: 768px) 45vw, 100vw" className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute inset-0 -z-10 bg-gradient-to-t from-stout via-stout/70 to-stout/10" />
              <span className="eyebrow text-straw">{c.eyebrow}</span>
              <span className="mt-2 font-display text-5xl font-extrabold uppercase">{c.title}</span>
              <span className="mt-3 max-w-md text-paper/85">{c.body}</span>
              <span className="mt-5 flex items-center gap-2 font-bold tracking-wide uppercase">
                Learn more <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
