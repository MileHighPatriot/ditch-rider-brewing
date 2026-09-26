"use client";

import { useState } from "react";
import { Glass } from "@/components/BeerArt";
import Icon from "@/components/Icon";
import { beerById } from "@/data/beers";
import { courses, dietLabels, menu, rootBeer, type Course, type Diet } from "@/data/menu";

const diets: Diet[] = ["V", "VG", "GF", "spicy"];
const dietTone: Record<Diet, string> = {
  V: "bg-hop-soft text-hop",
  VG: "bg-hop-soft text-hop",
  GF: "bg-canal-soft text-canal",
  spicy: "bg-[#f6d8cf] text-brick-deep",
};

/** Menu with dietary filters. Every dish names the beer we'd pour with it. */
export default function KitchenMenu() {
  const [need, setNeed] = useState<Diet[]>([]);
  const [noSpicy, setNoSpicy] = useState(false);
  const [course, setCourse] = useState<Course | "All">("All");

  const match = (d: (typeof menu)[number]) =>
    (course === "All" || d.course === course) &&
    need.every((n) => d.diet.includes(n) || (n === "V" && d.diet.includes("VG"))) &&
    (!noSpicy || !d.diet.includes("spicy"));
  const shown = courses.filter((c) => menu.some((d) => d.course === c && match(d)));

  const chip =
    "min-h-10 shrink-0 rounded-md px-3.5 text-sm font-bold ring-1 ring-inset ring-line bg-paper hover:ring-ink aria-pressed:bg-stout aria-pressed:text-paper aria-pressed:ring-stout";

  return (
    <div>
      <div className="z-20 -mx-5 border-b sm:sticky sm:top-0 border-line bg-foam/95 px-5 py-3 backdrop-blur sm:-mx-8 sm:px-8">
        <div className="flex flex-wrap items-center gap-2">
          <div role="group" aria-label="Course" className="-mx-1 flex gap-2 overflow-x-auto px-1">
            {(["All", ...courses] as const).map((c) => (
              <button key={c} type="button" aria-pressed={course === c} onClick={() => setCourse(c)} className={chip}>
                {c}
              </button>
            ))}
          </div>
          <span className="mx-1 hidden h-6 w-px bg-line md:block" aria-hidden />
          <div role="group" aria-label="Dietary" className="flex flex-wrap gap-2">
            {diets
              .filter((d) => d !== "spicy")
              .map((d) => (
                <button
                  key={d}
                  type="button"
                  aria-pressed={need.includes(d)}
                  onClick={() => setNeed((v) => (v.includes(d) ? v.filter((x) => x !== d) : [...v, d]))}
                  className="min-h-10 rounded-full px-3.5 text-sm font-semibold ring-1 ring-line ring-inset hover:ring-ink aria-pressed:bg-straw aria-pressed:ring-straw"
                >
                  {dietLabels[d]}
                </button>
              ))}
            <button
              type="button"
              aria-pressed={noSpicy}
              onClick={() => setNoSpicy(!noSpicy)}
              className="min-h-10 rounded-full px-3.5 text-sm font-semibold ring-1 ring-line ring-inset hover:ring-ink aria-pressed:bg-straw aria-pressed:ring-straw"
            >
              Not spicy
            </button>
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-14" aria-live="polite">
        {shown.length ? (
          shown.map((c) => (
            <section key={c} aria-labelledby={`c-${c}`}>
              <h2 id={`c-${c}`} className="flex items-center gap-4 text-5xl">
                {c}
                <span className="canal-rule flex-1 opacity-60" aria-hidden />
              </h2>
              <ul className="mt-6 grid gap-x-10 md:grid-cols-2">
                {menu
                  .filter((d) => d.course === c && match(d))
                  .map((d) => {
                    const b = beerById[d.pairId];
                    return (
                      <li key={d.id} id={d.id} className="scroll-mt-28 border-b border-line py-5 target:bg-straw-soft/40">
                        <p className="flex items-baseline gap-3">
                          <span className="font-display text-[1.75rem] leading-none font-extrabold uppercase">{d.name}</span>
                          <span className="mb-1 flex-1 border-b-2 border-dotted border-line" aria-hidden />
                          <span className="font-display text-[1.75rem] leading-none font-extrabold text-brick-deep">${d.price}</span>
                        </p>
                        {d.diet.length || d.popular ? (
                          <p className="mt-2 flex flex-wrap gap-1.5">
                            {d.popular ? <span className="rounded-sm bg-brick px-1.5 py-0.5 text-[0.65rem] font-bold tracking-wider text-paper uppercase">Favorite</span> : null}
                            {d.diet.map((x) => (
                              <span key={x} className={`rounded-sm px-1.5 py-0.5 text-[0.65rem] font-bold tracking-wider uppercase ${dietTone[x]}`}>
                                {dietLabels[x]}
                              </span>
                            ))}
                          </p>
                        ) : null}
                        <p className="mt-2 text-[0.97rem] leading-relaxed text-dust">{d.desc}</p>
                        <div className="mt-3 flex items-start gap-3 rounded-md bg-paper p-3 ring-1 ring-line">
                          {b ? <Glass beer={b} className="h-10 w-7 shrink-0 text-ink" /> : <Icon name="cup" className="mt-1 h-6 w-6 shrink-0 text-brick-deep" />}
                          <p className="text-sm leading-snug">
                            <span className="aside text-base text-brick-deep">Pour with </span>
                            {b ? (
                              <a href={`/beer/#${b.id}`} className="font-bold underline decoration-line underline-offset-4 hover:decoration-ink">
                                {b.name}
                              </a>
                            ) : (
                              <strong>{rootBeer.name}</strong>
                            )}
                            {b ? <span className="text-dust"> · {b.style.split(" · ")[0]}</span> : null}
                            <span className="mt-0.5 block text-dust">{d.why}</span>
                          </p>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </section>
          ))
        ) : (
          <div className="rounded-lg border-2 border-dashed border-line p-10 text-center">
            <p className="font-display text-3xl font-extrabold uppercase">Nothing matches all of that.</p>
            <p className="mt-2 text-dust">Tell your server what you need. The kitchen can adapt most dishes.</p>
          </div>
        )}
      </div>
      <p className="mt-10 max-w-3xl text-sm text-dust">
        Our fryer is shared, so &ldquo;gluten-free&rdquo; dishes may contain traces. Tell your server about allergies and the kitchen will walk you
        through it. Eating raw or undercooked meat may increase your risk of foodborne illness.
      </p>
    </div>
  );
}
