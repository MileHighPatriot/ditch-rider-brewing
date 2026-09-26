import type { Metadata } from "next";
import Icon from "@/components/Icon";
import PageHead from "@/components/PageHead";
import Photo from "@/components/Photo";
import SectionHead from "@/components/SectionHead";
import PatioForecast from "@/components/tools/PatioForecast";
import Button from "@/components/ui/Button";
import { brunch, dayNames, formatTime, happyHour, hours, mapsHref, site } from "@/data/site";

export const metadata: Metadata = {
  title: "Visit",
  description:
    "Hours, the patio forecast, and how to get here: 3 minutes from Orchard Station light rail, free garage parking, bike racks by the patio. Dogs on the patio, kids welcome.",
};

const policies = [
  {
    icon: "dog",
    title: "Dogs",
    body: "Welcome on the patio, on a leash, with water bowls and biscuits at the gate. Colorado health code keeps them out of the taproom, service animals excepted.",
  },
  {
    icon: "child",
    title: "Kids",
    body: "Always welcome with an adult until 9pm. Kids menu, crayons, high chairs, and giant Jenga on the lawn. We'll never serve anyone under 21.",
  },
  {
    icon: "users",
    title: "Groups",
    body: "Walk-ins for up to 8. Bigger than that, call ahead or book the Headgate Room. The after-work rush is 4 to 6.",
  },
  {
    icon: "access",
    title: "Accessibility",
    body: "Step-free entry from the garage, an accessible restroom, and lowered tables inside and on the patio.",
  },
];

const faqs = [
  ["Do you take reservations?", "For groups of 8 or more, and for the Headgate Room and the patio buyout. Everyone else, walk right in."],
  ["Is there a gluten-free beer?", "Rider Light is gluten-reduced (under 20 ppm). That's fine for the gluten-shy but not safe for celiac. The kitchen marks gluten-free dishes, though our fryer is shared."],
  ["Can I bring my own food?", "Birthday cakes, yes, with no fee. Otherwise the kitchen's got you."],
  ["What about amphitheater nights?", "The patio fills early. Order dinner by 6 and we'll have you out the door by 6:45; it's a 12-minute walk up Greenwood Plaza Blvd."],
];

export default function VisitPage() {
  const week = [1, 2, 3, 4, 5, 6, 0].map((d) => hours[d]);
  return (
    <>
      <PageHead
        eyebrow="Visit"
        title={
          <>
            Park the car.
            <br />
            <span className="text-straw">Take the train.</span>
          </>
        }
        lede={`${site.address.street}, ${site.address.city}. A block from Orchard Station, a short ride from the High Line Canal trail, and a walk from the amphitheater.`}
      >
        <div className="flex flex-wrap gap-3">
          <Button href={mapsHref} variant="straw">
            Get directions
          </Button>
          <Button href={site.phoneHref} variant="outline-light" arrow={false}>
            <Icon name="phone" className="h-4 w-4" /> {site.phone}
          </Button>
        </div>
      </PageHead>

      {/* ---------- Hours + patio ---------- */}
      <section className="grain section-y">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div>
            <SectionHead eyebrow="Hours" title="Open every day." />
            <table className="reveal mt-8 w-full text-left">
              <caption className="sr-only">Taproom and kitchen hours</caption>
              <thead>
                <tr className="border-b-2 border-ink text-sm">
                  <th scope="col" className="py-2 font-bold">Day</th>
                  <th scope="col" className="py-2 font-bold">Taproom</th>
                  <th scope="col" className="py-2 font-bold">Kitchen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {week.map((h) => {
                  const [ch, cm] = h.close.split(":").map(Number);
                  return (
                    <tr key={h.day}>
                      <th scope="row" className="py-3 font-display text-2xl font-extrabold uppercase">
                        {dayNames[h.day]}
                      </th>
                      <td className="py-3">
                        {formatTime(h.open)}–{formatTime(h.close)}
                      </td>
                      <td className="py-3 text-dust">
                        till {formatTime(`${String(ch - 1).padStart(2, "0")}:${String(cm).padStart(2, "0")}`)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="reveal mt-6 grid gap-3 sm:grid-cols-2">
              <p className="rounded-lg bg-paper p-4 ring-1 ring-line">
                <span className="eyebrow text-brick-deep">Happy hour</span>
                <span className="mt-1 block font-bold">
                  Mon–Fri, {formatTime(happyHour.start)}–{formatTime(happyHour.end)}
                </span>
                <span className="text-sm text-dust">{happyHour.deal}</span>
              </p>
              <p className="rounded-lg bg-paper p-4 ring-1 ring-line">
                <span className="eyebrow text-brick-deep">Brunch</span>
                <span className="mt-1 block font-bold">
                  Sundays, {formatTime(brunch.start)}–{formatTime(brunch.end)}
                </span>
                <span className="text-sm text-dust">Chilaquiles, breakfast burritos, and lawn games</span>
              </p>
            </div>
          </div>
          <div>
            <SectionHead
              eyebrow="The patio"
              title="Five-day patio outlook."
              lede="Live from Open-Meteo. Fire pits and heaters keep the patio going down to about 40°; we pull the umbrellas when gusts pass 30 mph."
            />
            <div className="reveal mt-8">
              <PatioForecast />
            </div>
            <div className="reveal mt-6 aspect-[16/9] overflow-hidden rounded-lg">
              <Photo name="string-lights" alt="String lights against a blue sky" sizes="(min-width: 1024px) 45vw, 100vw" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Getting here ---------- */}
      <section id="getting-here" className="bg-stout section-y scroll-mt-4 text-paper">
        <div className="wrap">
          <SectionHead light eyebrow="Getting here" title="Three ways in. One of them has beer at the end." />
          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {[
              { icon: "train", title: "Light rail", body: site.lightRail, note: "E and H lines · check RTD for late-night trains" },
              { icon: "car", title: "Parking", body: site.parking, note: "Rideshare pickup at the front door" },
              { icon: "bike", title: "Bike", body: site.bikes, note: "Saturday run club leaves at 8am" },
            ].map((w) => (
              <li key={w.title} className="reveal rounded-lg bg-stout-2 p-6 ring-1 ring-paper/10">
                <span className="grid h-12 w-12 place-items-center rounded-md bg-straw text-stout">
                  <Icon name={w.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-4xl">{w.title}</h3>
                <p className="mt-2 text-haze">{w.body}</p>
                <p className="mt-4 border-t border-paper/10 pt-3 text-sm text-paper/80">{w.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Policies ---------- */}
      <section className="grain section-y">
        <div className="wrap grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div>
            <SectionHead eyebrow="House rules" title="Dogs, kids, and everyone else." />
            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {policies.map((p) => (
                <li key={p.title} className="reveal rounded-lg bg-paper p-6 ring-1 ring-line">
                  <Icon name={p.icon} className="h-7 w-7 text-brick-deep" />
                  <h3 className="mt-4 text-3xl">{p.title}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-dust">{p.body}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="reveal aspect-[4/3] overflow-hidden rounded-lg">
              <Photo name="trail-dog" alt="A person walking a dog on a leafy trail" sizes="(min-width: 1024px) 40vw, 100vw" className="h-full w-full object-cover" />
            </div>
            <div className="mt-8 divide-y divide-line border-y border-line">
              {faqs.map(([q, a]) => (
                <details key={q} className="group reveal py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-2xl font-extrabold uppercase [&::-webkit-details-marker]:hidden">
                    {q}
                    <Icon name="chevron-down" className="h-5 w-5 shrink-0 text-brick-deep transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-2 leading-relaxed text-dust">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
