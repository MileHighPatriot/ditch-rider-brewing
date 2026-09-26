"use client";

import { useEffect, useState } from "react";
import { Glass } from "@/components/BeerArt";
import Icon from "@/components/Icon";
import { Mark } from "@/components/Logo";
import { beerById, tastingScore } from "@/data/beers";

export const FLIGHT_PRICE = 12;

/**
 * Four 5 oz tasters, auto-sorted into tasting order, with a full-screen card
 * to show the bartender. Sticky on desktop; a bottom drawer on phones.
 */
export default function FlightBuilder({ flight, onRemove, onClear }: { flight: string[]; onRemove: (id: string) => void; onClear: () => void }) {
  const [show, setShow] = useState(false);
  const ordered = flight.map((id) => beerById[id]).sort((a, b) => tastingScore(a) - tastingScore(b));
  const single = ordered.reduce((n, b) => n + b.pours[0], 0);

  useEffect(() => {
    if (!show) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setShow(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [show]);

  return (
    <>
      <div id="flight" className="scroll-mt-24 rounded-lg bg-stout p-5 text-paper sm:p-6">
        <div className="flex items-baseline justify-between gap-3">
          <p className="font-display text-3xl font-extrabold uppercase">Your flight</p>
          <p className="text-sm text-haze">{flight.length}/4 tasters</p>
        </div>
        <p className="mt-1 text-sm text-haze">Pick four. We&rsquo;ll put them in tasting order: light to dark, soft to bitter, sours last.</p>

        {/* the paddle */}
        <div className="mt-5 rounded-md bg-[#6b4a2b] p-3 shadow-inner ring-1 ring-black/40">
          <ol className="grid grid-cols-4 gap-2">
            {[0, 1, 2, 3].map((i) => {
              const b = ordered[i];
              return (
                <li key={i} className="grid place-items-center">
                  {b ? (
                    <button type="button" onClick={() => onRemove(b.id)} className="group relative grid place-items-center" aria-label={`Remove ${b.name}`}>
                      <Glass beer={b} className="h-16 w-11 text-paper" />
                      <span className="absolute -top-1 -right-1 hidden h-5 w-5 place-items-center rounded-full bg-brick text-paper group-hover:grid group-focus-visible:grid">
                        <Icon name="close" className="h-3 w-3" />
                      </span>
                    </button>
                  ) : (
                    <span className="grid h-16 w-11 place-items-center rounded-b-md border-2 border-dashed border-paper/25 text-paper/40">
                      <Icon name="plus" className="h-4 w-4" />
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </div>

        {ordered.length ? (
          <ol className="mt-4 grid gap-1.5 text-sm">
            {ordered.map((b, i) => (
              <li key={b.id} className="flex items-center gap-2">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-straw text-[0.7rem] font-bold text-stout">{i + 1}</span>
                <span className="flex-1 truncate font-semibold">{b.name}</span>
                <span className="text-haze">{b.abv}%</span>
              </li>
            ))}
          </ol>
        ) : null}

        <div className="mt-5 flex items-end justify-between gap-3 border-t border-paper/15 pt-4">
          <div>
            <p className="font-display text-4xl font-extrabold">{flight.length === 4 ? `$${FLIGHT_PRICE}` : flight.length ? `$${single}` : `$${FLIGHT_PRICE}`}</p>
            <p className="text-xs text-haze">{flight.length === 4 ? (single > FLIGHT_PRICE ? `Flight price (save $${single - FLIGHT_PRICE})` : "Flight price") : "Any four tasters"}</p>
          </div>
          {flight.length ? (
            <button type="button" onClick={onClear} className="text-sm font-semibold text-haze hover:text-paper">
              Start over
            </button>
          ) : null}
        </div>
        <button
          type="button"
          disabled={flight.length < 4}
          onClick={() => setShow(true)}
          className="mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-straw font-bold tracking-wide text-stout uppercase transition-colors hover:bg-straw-soft disabled:cursor-not-allowed disabled:bg-paper/10 disabled:text-paper/50"
        >
          <Icon name="expand" className="h-4 w-4" /> {flight.length < 4 ? `Pick ${4 - flight.length} more` : "Show the bartender"}
        </button>
      </div>

      {show ? (
        <div role="dialog" aria-modal="true" aria-label="Your flight" className="fixed inset-0 z-[70] flex flex-col bg-foam text-ink">
          <div className="flex items-center justify-between p-4">
            <Mark className="h-10 w-10 text-brick" water="var(--color-canal)" />
            <button type="button" onClick={() => setShow(false)} autoFocus className="flex min-h-11 items-center gap-2 rounded-md px-4 font-bold tracking-wide uppercase ring-2 ring-ink ring-inset">
              <Icon name="close" className="h-4 w-4" /> Done
            </button>
          </div>
          <div className="wrap flex flex-1 flex-col justify-center pb-10">
            <p className="eyebrow text-brick-deep">Flight · pour in this order</p>
            <ol className="mt-4 grid gap-3">
              {ordered.map((b, i) => (
                <li key={b.id} className="flex items-center gap-4 rounded-lg bg-paper p-4 ring-1 ring-line sm:p-5">
                  <span className="font-display text-5xl font-extrabold text-brick-deep sm:text-6xl">{i + 1}</span>
                  <Glass beer={b} className="h-14 w-10 shrink-0 text-ink" />
                  <div className="min-w-0">
                    <p className="font-display text-3xl leading-none font-extrabold uppercase sm:text-5xl">{b.name}</p>
                    <p className="mt-1 text-dust">
                      Tap {b.tap} · {b.style} · {b.abv}%
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-6 font-display text-4xl font-extrabold uppercase">4 × 5 oz · ${FLIGHT_PRICE}</p>
          </div>
        </div>
      ) : null}
    </>
  );
}
