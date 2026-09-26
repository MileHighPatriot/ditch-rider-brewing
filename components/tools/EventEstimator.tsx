"use client";

import { useState } from "react";
import Icon from "@/components/Icon";
import Photo from "@/components/Photo";
import { drinks, packages, SERVICE, spaces, TAX } from "@/data/private";

const usd = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

/**
 * Pick a headcount, day, food, and drinks; see which spaces fit and a rough
 * total against the food-and-beverage minimum. Then send an inquiry (mock,
 * Tripleseat-style).
 */
export default function EventEstimator() {
  const [guests, setGuests] = useState(30);
  const [weekend, setWeekend] = useState(false);
  const [seated, setSeated] = useState(false);
  const [food, setFood] = useState(packages[0].id);
  const [drink, setDrink] = useState(drinks[0].id);
  const [space, setSpace] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const fits = spaces.filter((s) => guests <= (seated ? s.seated : s.standing));
  const chosen = spaces.find((s) => s.id === space && fits.includes(s)) ?? fits[0];
  const perHead = packages.find((p) => p.id === food)!.perPerson + drinks.find((d) => d.id === drink)!.perPerson;
  const fb = perHead * guests;
  const minimum = chosen ? (weekend ? chosen.minimum.weekend : chosen.minimum.weekday) : 0;
  const base = Math.max(fb, minimum);
  const total = base * (1 + SERVICE + TAX);

  const seg = "min-h-11 flex-1 rounded-md px-3 text-sm font-bold ring-1 ring-line ring-inset hover:ring-ink aria-pressed:bg-stout aria-pressed:text-paper aria-pressed:ring-stout";

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-10">
      {/* ---------- Inputs ---------- */}
      <div className="grid content-start gap-6 rounded-lg bg-paper p-6 ring-1 ring-line sm:p-8">
        <label className="grid gap-3">
          <span className="flex items-baseline justify-between">
            <span className="eyebrow text-brick-deep">Guests</span>
            <span className="font-display text-5xl font-extrabold tabular-nums">{guests}</span>
          </span>
          <input type="range" min={10} max={250} step={5} value={guests} onChange={(e) => setGuests(Number(e.target.value))} className="w-full accent-[#b8391f]" aria-valuetext={`${guests} guests`} />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <fieldset>
            <legend className="eyebrow text-brick-deep">When</legend>
            <div className="mt-2 flex gap-2">
              <button type="button" aria-pressed={!weekend} onClick={() => setWeekend(false)} className={seg}>
                Sun–Thu
              </button>
              <button type="button" aria-pressed={weekend} onClick={() => setWeekend(true)} className={seg}>
                Fri–Sat
              </button>
            </div>
          </fieldset>
          <fieldset>
            <legend className="eyebrow text-brick-deep">Style</legend>
            <div className="mt-2 flex gap-2">
              <button type="button" aria-pressed={!seated} onClick={() => setSeated(false)} className={seg}>
                Mingling
              </button>
              <button type="button" aria-pressed={seated} onClick={() => setSeated(true)} className={seg}>
                Seated
              </button>
            </div>
          </fieldset>
        </div>
        <fieldset>
          <legend className="eyebrow text-brick-deep">Food</legend>
          <div className="mt-2 grid gap-2">
            {packages.map((p) => (
              <button
                key={p.id}
                type="button"
                aria-pressed={food === p.id}
                onClick={() => setFood(p.id)}
                className="flex items-center justify-between gap-3 rounded-md p-3 text-left ring-1 ring-line ring-inset hover:ring-ink aria-pressed:bg-stout aria-pressed:text-paper aria-pressed:ring-stout"
              >
                <span>
                  <span className="block font-bold">{p.name}</span>
                  <span className="text-sm opacity-75">{p.note}</span>
                </span>
                <span className="font-display text-2xl font-extrabold whitespace-nowrap">${p.perPerson}/pp</span>
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="eyebrow text-brick-deep">Drinks</legend>
          <div className="mt-2 grid gap-2">
            {drinks.map((d) => (
              <button
                key={d.id}
                type="button"
                aria-pressed={drink === d.id}
                onClick={() => setDrink(d.id)}
                className="flex items-center justify-between gap-3 rounded-md p-3 text-left ring-1 ring-line ring-inset hover:ring-ink aria-pressed:bg-stout aria-pressed:text-paper aria-pressed:ring-stout"
              >
                <span>
                  <span className="block font-bold">{d.name}</span>
                  <span className="text-sm opacity-75">{d.note}</span>
                </span>
                <span className="font-display text-2xl font-extrabold whitespace-nowrap">{d.perPerson ? `$${d.perPerson}/pp` : "—"}</span>
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      {/* ---------- Result ---------- */}
      <div className="grid content-start gap-4 lg:sticky lg:top-6 lg:self-start">
        <p className="eyebrow text-brick-deep" aria-live="polite">
          {fits.length ? `${fits.length} space${fits.length === 1 ? "" : "s"} fit ${guests} ${seated ? "seated" : "standing"}` : "Too big for one space"}
        </p>
        {fits.length ? (
          <ul className="grid grid-cols-2 gap-3">
            {fits.map((s) => (
              <li key={s.id}>
                <button
                  type="button"
                  aria-pressed={chosen?.id === s.id}
                  onClick={() => setSpace(s.id)}
                  className="group flex h-full w-full flex-col overflow-hidden rounded-lg bg-paper text-left ring-1 ring-line hover:ring-ink aria-pressed:ring-4 aria-pressed:ring-brick"
                >
                  <span className="block aspect-[16/9] overflow-hidden">
                    <Photo name={s.photo} alt="" sizes="(min-width: 1024px) 22vw, 50vw" className="h-full w-full object-cover" />
                  </span>
                  <span className="block p-3 sm:p-4">
                    <span className="flex items-baseline justify-between gap-2">
                      <span className="font-display text-xl leading-none font-extrabold uppercase sm:text-2xl">{s.name}</span>
                      {chosen?.id === s.id ? <Icon name="check" className="h-5 w-5 shrink-0 text-brick" /> : null}
                    </span>
                    <span className="mt-1 block text-sm text-dust">
                      {s.seated} seated · {s.standing} standing
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="rounded-lg border-2 border-dashed border-line p-6 text-dust">For more than 250 guests, talk to us about a full buyout with the lawn. It&rsquo;s been done.</p>
        )}

        {chosen ? (
          <div className="rounded-lg bg-stout p-6 text-paper">
            <p className="text-sm text-haze">{chosen.blurb}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {chosen.features.map((f) => (
                <li key={f} className="rounded-sm bg-stout-3 px-2 py-1 text-xs font-semibold">
                  {f}
                </li>
              ))}
            </ul>
            <dl className="mt-5 grid gap-1.5 border-t border-paper/15 pt-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-haze">
                  Food & drinks ({guests} × ${perHead})
                </dt>
                <dd>{usd(fb)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-haze">{weekend ? "Fri–Sat" : "Sun–Thu"} minimum for this space</dt>
                <dd className={fb < minimum ? "font-bold text-straw" : ""}>{usd(minimum)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-haze">20% service + tax</dt>
                <dd>{usd(total - base)}</dd>
              </div>
            </dl>
            <div className="mt-3 flex items-end justify-between border-t border-paper/15 pt-3">
              <p className="text-sm text-haze">Estimated total</p>
              <p className="font-display text-5xl font-extrabold">{usd(total)}</p>
            </div>
            {fb < minimum ? (
              <p className="mt-2 text-sm text-straw">You&rsquo;re {usd(minimum - fb)} under the minimum. Add guests, upgrade the food, or pick a weeknight.</p>
            ) : (
              <p className="mt-2 text-sm text-haze">About {usd(total / guests)} per guest, all in.</p>
            )}
            {sent ? (
              <p className="mt-5 flex items-center gap-2 rounded-md bg-hop-soft p-3 text-sm font-bold text-hop">
                <Icon name="check" className="h-4 w-4" /> Inquiry sent. Our events lead replies within one business day. (Concept: nothing was sent.)
              </p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="mt-5 grid gap-2 sm:grid-cols-2"
              >
                <input required placeholder="Name" aria-label="Name" className="h-12 rounded-md bg-paper px-3 text-ink" />
                <input required type="email" placeholder="Work email" aria-label="Email" className="h-12 rounded-md bg-paper px-3 text-ink" />
                <input type="date" aria-label="Preferred date" className="h-12 rounded-md bg-paper px-3 text-ink" />
                <input placeholder="Company (optional)" aria-label="Company" className="h-12 rounded-md bg-paper px-3 text-ink" />
                <button type="submit" className="flex min-h-12 items-center justify-center gap-2 rounded-md bg-brick font-bold tracking-wide uppercase hover:bg-brick-deep sm:col-span-2">
                  Check availability <Icon name="arrow" className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
