"use client";

import { useState } from "react";
import Icon from "@/components/Icon";

const PRICE = 150;
const PINT = 7;
const SAVE_PER_PINT = 1;
const EXTRA_OZ = 4;

/** "Is it worth it?" calculator, plus a mock waitlist signup. */
export default function MugClub() {
  const [visits, setVisits] = useState(3);
  const [pints, setPints] = useState(2);
  const [joined, setJoined] = useState(false);

  const pintsYear = Math.round(visits * 12 * pints);
  const saved = pintsYear * SAVE_PER_PINT;
  const extraBeer = Math.round((pintsYear * EXTRA_OZ) / 16);
  const perks = 7 + 12 + 25; // birthday pint, 12 release pours, brew day
  const value = saved + extraBeer * PINT + perks;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-lg bg-paper p-6 ring-1 ring-line sm:p-8">
        <p className="font-display text-3xl font-extrabold uppercase">Is it worth it?</p>
        <label className="mt-6 grid gap-2">
          <span className="flex justify-between text-sm font-semibold">
            Visits a month <span className="font-display text-2xl font-extrabold">{visits}</span>
          </span>
          <input type="range" min={1} max={12} value={visits} onChange={(e) => setVisits(Number(e.target.value))} className="accent-[#b8391f]" />
        </label>
        <label className="mt-4 grid gap-2">
          <span className="flex justify-between text-sm font-semibold">
            Pints per visit <span className="font-display text-2xl font-extrabold">{pints}</span>
          </span>
          <input type="range" min={1} max={4} value={pints} onChange={(e) => setPints(Number(e.target.value))} className="accent-[#b8391f]" />
        </label>
        <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-line pt-5 text-center">
          <div className="flex flex-col-reverse">
            <dt className="text-xs text-dust">saved at $1 off</dt>
            <dd className="font-display text-3xl font-extrabold">${saved}</dd>
          </div>
          <div className="flex flex-col-reverse">
            <dt className="text-xs text-dust">free pints from the 20 oz mug</dt>
            <dd className="font-display text-3xl font-extrabold">{extraBeer}</dd>
          </div>
          <div className="flex flex-col-reverse">
            <dt className="text-xs text-dust">in release pours & perks</dt>
            <dd className="font-display text-3xl font-extrabold">${perks}</dd>
          </div>
        </dl>
        <p className={`mt-5 rounded-md p-4 text-center font-bold ${value >= PRICE ? "bg-hop-soft text-hop" : "bg-kraft text-dust"}`} aria-live="polite">
          About ${value} of value for ${PRICE} a year.{" "}
          {value >= PRICE ? "It pays for itself." : "Come by a little more and it pays for itself."}
        </p>
      </div>

      <div className="rounded-lg bg-stout p-6 text-paper sm:p-8">
        <p className="font-display text-3xl font-extrabold uppercase">Join the waitlist</p>
        <p className="mt-2 text-haze">150 mugs on the wall, and we open 25 spots every January. Currently about 40 people ahead of you.</p>
        {joined ? (
          <p className="mt-6 flex items-center gap-2 rounded-md bg-hop-soft p-4 font-bold text-hop">
            <Icon name="check" className="h-5 w-5" /> You&rsquo;re on the list. We&rsquo;ll email when a mug opens up. (Concept: nothing was sent.)
          </p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setJoined(true);
            }}
            className="mt-6 grid gap-3"
          >
            <input required placeholder="Name" aria-label="Name" className="h-12 rounded-md bg-paper px-3 text-ink" />
            <input required type="email" placeholder="Email" aria-label="Email" className="h-12 rounded-md bg-paper px-3 text-ink" />
            <label className="flex items-start gap-3 text-sm text-haze">
              <input required type="checkbox" className="mt-0.5 h-4 w-4 accent-[#e8b64a]" /> I&rsquo;m 21 or older.
            </label>
            <button type="submit" className="flex min-h-12 items-center justify-center gap-2 rounded-md bg-straw font-bold tracking-wide text-stout uppercase hover:bg-straw-soft">
              Save my spot <Icon name="arrow" className="h-4 w-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
