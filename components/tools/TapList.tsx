"use client";

import { useState } from "react";
import { Glass, KegBar } from "@/components/BeerArt";
import Icon from "@/components/Icon";
import { beers, families, KICKING, tagLabels, type Beer, type Family } from "@/data/beers";
import { dishById } from "@/data/menu";

type Quick = "new" | "session" | "na" | "gr" | "kicking";
type Sort = "tap" | "abv" | "ibu" | "color";

const quick: { id: Quick; label: string; test: (b: Beer) => boolean }[] = [
  { id: "new", label: "New", test: (b) => b.tags.includes("new") },
  { id: "session", label: "Under 5%", test: (b) => b.abv < 5 },
  { id: "na", label: "Non-alc", test: (b) => b.tags.includes("na") },
  { id: "gr", label: "Gluten-reduced", test: (b) => b.tags.includes("gr") },
  { id: "kicking", label: "Kicking soon", test: (b) => b.keg < KICKING },
];

const money = (n: number | null) => (n == null ? "–" : `$${n}`);

/** The live tap list: filter by family, ABV, and quick tags; add beers to a flight. */
export default function TapList({ flight, onToggle }: { flight: string[]; onToggle: (id: string) => void }) {
  const [family, setFamily] = useState<Family | "All">("All");
  const [maxAbv, setMaxAbv] = useState(12);
  const [on, setOn] = useState<Quick[]>([]);
  const [sort, setSort] = useState<Sort>("tap");
  const [open, setOpen] = useState<string | null>(null);

  const list = beers
    .filter((b) => (family === "All" || b.family === family) && b.abv <= maxAbv && on.every((q) => quick.find((x) => x.id === q)!.test(b)))
    .sort((a, b) => (sort === "tap" ? a.tap - b.tap : sort === "abv" ? a.abv - b.abv : sort === "ibu" ? a.ibu - b.ibu : a.srm - b.srm));

  const reset = () => {
    setFamily("All");
    setMaxAbv(12);
    setOn([]);
  };
  const chip =
    "min-h-10 shrink-0 rounded-md px-3.5 text-sm font-bold ring-1 ring-inset transition-colors ring-line bg-paper hover:ring-ink aria-pressed:bg-stout aria-pressed:text-paper aria-pressed:ring-stout";

  return (
    <div>
      {/* ---------- Filters ---------- */}
      <div className="grid gap-4 rounded-lg bg-paper p-4 ring-1 ring-line sm:p-5">
        <div role="group" aria-label="Style" className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
          {(["All", ...families] as const).map((f) => (
            <button key={f} type="button" aria-pressed={family === f} onClick={() => setFamily(f)} className={chip}>
              {f}
            </button>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
          <div role="group" aria-label="Quick filters" className="flex flex-wrap gap-2">
            {quick.map((q) => (
              <button
                key={q.id}
                type="button"
                aria-pressed={on.includes(q.id)}
                onClick={() => setOn((v) => (v.includes(q.id) ? v.filter((x) => x !== q.id) : [...v, q.id]))}
                className="min-h-10 rounded-full px-3.5 text-sm font-semibold ring-1 ring-line ring-inset hover:ring-ink aria-pressed:bg-straw aria-pressed:ring-straw"
              >
                {q.label}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-3 text-sm font-semibold">
            <span className="whitespace-nowrap">ABV up to</span>
            <input
              type="range"
              min={3}
              max={12}
              step={0.5}
              value={maxAbv}
              onChange={(e) => setMaxAbv(Number(e.target.value))}
              className="w-full accent-[#b8391f] md:w-40"
              aria-valuetext={`${maxAbv}%`}
            />
            <span className="w-12 font-display text-xl font-extrabold tabular-nums">{maxAbv}%</span>
          </label>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3" aria-live="polite">
        <p className="text-dust">
          <strong className="text-ink">{list.length}</strong> of {beers.length} pouring
          {list.length !== beers.length ? (
            <button type="button" onClick={reset} className="ml-3 font-semibold text-brick-deep hover:underline">
              Clear
            </button>
          ) : null}
        </p>
        <label className="flex items-center gap-2 text-sm text-dust">
          Sort
          <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="h-10 rounded-md bg-paper px-2 font-semibold text-ink ring-1 ring-line">
            <option value="tap">Tap number</option>
            <option value="abv">ABV, low to high</option>
            <option value="ibu">Bitterness</option>
            <option value="color">Light to dark</option>
          </select>
        </label>
      </div>

      {/* ---------- List ---------- */}
      {list.length ? (
        <ul className="mt-4 divide-y divide-line overflow-hidden rounded-lg bg-paper ring-1 ring-line">
          {list.map((b) => {
            const inFlight = flight.includes(b.id);
            const dish = dishById[b.pairId];
            const expanded = open === b.id;
            return (
              <li key={b.id} id={b.id} className="scroll-mt-24">
                <div className="grid grid-cols-[2.5rem_1fr_auto] items-start gap-3 p-4 sm:grid-cols-[3rem_2.5rem_1fr_auto_auto] sm:items-center sm:gap-5 sm:px-6">
                  <span className="hidden font-display text-3xl font-extrabold text-dust tabular-nums sm:block">{String(b.tap).padStart(2, "0")}</span>
                  <Glass beer={b} className="h-14 w-10 text-ink" />
                  <div className="min-w-0">
                    <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span className="font-display text-[1.7rem] leading-none font-extrabold uppercase">{b.name}</span>
                      {b.tags.map((t) => (
                        <span
                          key={t}
                          className={`rounded-sm px-1.5 py-0.5 text-[0.65rem] font-bold tracking-wider uppercase ${t === "new" ? "bg-brick text-paper" : t === "na" || t === "gr" ? "bg-canal-soft text-canal" : "bg-kraft text-dust"}`}
                        >
                          {tagLabels[t]}
                        </span>
                      ))}
                    </p>
                    <p className="mt-1 text-sm text-dust">
                      {b.style} · <strong className="text-ink">{b.abv}%</strong> ABV · {b.ibu} IBU
                    </p>
                    <div className="mt-2 sm:hidden">
                      <KegBar pct={b.keg} kicking={b.keg < KICKING} />
                    </div>
                  </div>
                  <dl className="col-span-3 grid grid-cols-3 gap-1 text-center sm:col-span-1 sm:w-48">
                    {(["5 oz", "10 oz", "16 oz"] as const).map((size, i) => (
                      <div key={size} className="rounded-md bg-foam px-1 py-1.5">
                        <dt className="text-[0.65rem] font-bold tracking-wider text-dust uppercase">{size}</dt>
                        <dd className="font-display text-xl font-extrabold">{money(b.pours[i])}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="col-span-3 flex items-center justify-between gap-2 sm:col-span-1 sm:flex-col sm:items-end">
                    <span className="hidden sm:block">
                      <KegBar pct={b.keg} kicking={b.keg < KICKING} />
                    </span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        aria-expanded={expanded}
                        onClick={() => setOpen(expanded ? null : b.id)}
                        className="min-h-10 rounded-md px-3 text-sm font-semibold ring-1 ring-line ring-inset hover:ring-ink"
                      >
                        {expanded ? "Less" : "Notes"}
                      </button>
                      <button
                        type="button"
                        aria-pressed={inFlight}
                        onClick={() => onToggle(b.id)}
                        disabled={!inFlight && flight.length >= 4}
                        className="flex min-h-10 items-center gap-1.5 rounded-md bg-stout px-3 text-sm font-bold text-paper transition-colors hover:bg-stout-3 disabled:opacity-40 aria-pressed:bg-straw aria-pressed:text-stout"
                      >
                        <Icon name={inFlight ? "check" : "plus"} className="h-4 w-4" />
                        {inFlight ? "In flight" : "Flight"}
                      </button>
                    </div>
                  </div>
                </div>
                {expanded ? (
                  <div className="grid gap-4 border-t border-line bg-foam px-4 py-4 sm:grid-cols-2 sm:px-6 sm:pl-[8.5rem]">
                    <p className="text-[0.95rem] leading-relaxed">{b.notes}</p>
                    <p className="text-[0.95rem] leading-relaxed text-dust">
                      <span className="aside text-lg text-brick-deep">Try it with </span>
                      <a href={`/kitchen/#${dish.id}`} className="font-bold text-ink underline decoration-line underline-offset-4 hover:decoration-ink">
                        {dish.name}
                      </a>
                      . {dish.why}
                    </p>
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="mt-4 rounded-lg border-2 border-dashed border-line p-10 text-center">
          <p className="font-display text-3xl font-extrabold uppercase">Nothing pouring that matches.</p>
          <p className="mt-2 text-dust">Loosen a filter, or ask the bar. There&rsquo;s usually something in the back.</p>
          <button type="button" onClick={reset} className="mt-4 font-semibold text-brick-deep hover:underline">
            Clear filters
          </button>
        </div>
      )}
      <p className="mt-3 text-xs text-dust">Keg levels from Taplist.io and Kegtron sensors (demo data). Prices include tax.</p>
    </div>
  );
}
