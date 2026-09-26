"use client";

import { useEffect, useMemo, useState } from "react";
import { Can } from "@/components/BeerArt";
import Icon from "@/components/Icon";
import { beerById, KICKING } from "@/data/beers";
import { formatTime, hours, toMinutes } from "@/data/site";
import { PICKUP_LEAD_MIN, togo, type ToGoItem } from "@/data/togo";
import { denver } from "@/lib/status";
import { useNow } from "@/lib/useNow";

type Step = "shop" | "details" | "done";
const kinds = ["4-packs", "Crowlers", "Merch"] as const;

/** Pickup slots every 15 minutes, starting 20 minutes out, until 30 minutes before close. */
function slots(now: Date) {
  const { day, minutes } = denver(now);
  const out: { day: "Today" | "Tomorrow"; label: string; value: string }[] = [];
  for (const [offset, name] of [[0, "Today"], [1, "Tomorrow"]] as const) {
    const h = hours[(day + offset) % 7];
    const start = offset === 0 ? Math.max(toMinutes(h.open), Math.ceil((minutes + PICKUP_LEAD_MIN) / 15) * 15) : toMinutes(h.open);
    for (let m = start; m <= toMinutes(h.close) - 30; m += 15) {
      const hh = `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
      out.push({ day: name, label: formatTime(hh), value: `${name} ${hh}` });
    }
  }
  return out;
}

/** Pickup pre-order: cart, pickup time, a 21+ step, and a labeled demo checkout. */
export default function ToGoOrder() {
  const now = useNow(60000);
  const [kind, setKind] = useState<(typeof kinds)[number]>("4-packs");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [step, setStep] = useState<Step>("shop");
  const [slot, setSlot] = useState("");
  const [age, setAge] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    if (step !== "shop") document.getElementById(step === "done" ? "order-done" : "order")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- open the tab a link pointed at
    if (location.hash === "#merch") setKind("Merch");
  }, []);

  const times = useMemo(() => (now ? slots(now) : []), [now]);
  const lines = Object.entries(cart)
    .filter(([, q]) => q > 0)
    .map(([id, q]) => ({ item: togo.find((t) => t.id === id)!, q }));
  const count = lines.reduce((n, l) => n + l.q, 0);
  const subtotal = lines.reduce((n, l) => n + l.item.price * l.q, 0);
  const hasBeer = lines.some((l) => l.item.kind !== "Merch");
  const tax = Math.round(subtotal * 0.0775 * 100) / 100;

  const set = (it: ToGoItem, q: number) => setCart((c) => ({ ...c, [it.id]: Math.max(0, Math.min(it.limit ?? 6, q)) }));
  const money = (n: number) => `$${n.toFixed(2).replace(/\.00$/, "")}`;

  if (step === "done") {
    const code = `DR-${(name.trim().slice(0, 1) || "X").toUpperCase()}${String(subtotal * 7 + count * 13).slice(-3)}`;
    return (
      <div id="order-done" className="label-frame mx-auto max-w-xl scroll-mt-6 rounded-lg bg-paper p-8 text-center [--frame:var(--color-line)] sm:p-10" aria-live="polite">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-hop-soft text-hop">
          <Icon name="check" className="h-7 w-7" />
        </span>
        <p className="eyebrow mt-5 text-brick-deep">Order {code}</p>
        <h2 className="mt-2 text-5xl">See you {slot.split(" ")[0].toLowerCase()} at {formatTime(slot.split(" ")[1])}.</h2>
        <p className="mt-4 text-dust">
          Head to the to-go counter just inside the front door. {hasBeer ? "Bring an ID: whoever picks up has to be 21+, and we check every time." : ""}{" "}
          Crowlers are filled and sealed when you arrive, so they&rsquo;re as fresh as a pint.
        </p>
        <ul className="mt-6 divide-y divide-line border-y border-line text-left">
          {lines.map((l) => (
            <li key={l.item.id} className="flex justify-between gap-3 py-2">
              <span>
                {l.q} × {l.item.name} <span className="text-dust">({l.item.kind === "Merch" ? l.item.detail.split(",")[0] : l.item.kind.replace(/s$/, "")})</span>
              </span>
              <span className="font-semibold">{money(l.item.price * l.q)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-xs text-dust">Concept site: nothing was ordered or charged.</p>
        <button
          type="button"
          onClick={() => {
            setCart({});
            setStep("shop");
            setAge(false);
            setSlot("");
          }}
          className="mt-5 min-h-12 rounded-md px-6 font-bold tracking-wide uppercase ring-2 ring-ink ring-inset hover:bg-ink hover:text-paper"
        >
          Start a new order
        </button>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_24rem] lg:gap-10">
      {/* ---------- Catalog ---------- */}
      <div>
        <div id="merch" role="tablist" aria-label="What to order" className="flex scroll-mt-24 gap-2">
          {kinds.map((k) => (
            <button
              key={k}
              role="tab"
              type="button"
              aria-selected={kind === k}
              onClick={() => setKind(k)}
              className="min-h-11 rounded-md px-4 font-bold tracking-wide uppercase ring-1 ring-line ring-inset hover:ring-ink aria-selected:bg-stout aria-selected:text-paper aria-selected:ring-stout"
            >
              {k}
            </button>
          ))}
        </div>
        <div role="tabpanel">
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {togo
            .filter((t) => t.kind === kind)
            .map((t) => {
              const b = t.beerId ? beerById[t.beerId] : null;
              const q = cart[t.id] ?? 0;
              return (
                <li key={t.id} className="flex flex-col rounded-lg bg-paper p-4 ring-1 ring-line">
                  <div className="flex gap-4">
                    {b ? (
                      <Can beer={b} className="h-28 w-16 shrink-0 drop-shadow-[0_10px_10px_rgb(22_18_14/0.2)]" />
                    ) : (
                      <span className="grid h-28 w-16 shrink-0 place-items-center rounded-md bg-kraft text-brick-deep">
                        <Icon name={t.id === "gift" ? "gift" : t.id === "glass" ? "beer" : "bag"} className="h-7 w-7" />
                      </span>
                    )}
                    <div className="min-w-0">
                      <p className="font-display text-2xl leading-none font-extrabold uppercase">{t.name}</p>
                      <p className="mt-1 text-sm text-dust">{t.detail}</p>
                      {b && b.keg < KICKING && t.kind === "Crowlers" ? <p className="mt-1 text-xs font-bold text-brick-deep">Kicking soon · limit 1</p> : null}
                      <p className="mt-2 font-display text-2xl font-extrabold text-brick-deep">${t.price}</p>
                    </div>
                  </div>
                  <div className="mt-auto flex items-center justify-end gap-2 pt-3">
                    {q ? (
                      <>
                        <button type="button" onClick={() => set(t, q - 1)} className="grid h-10 w-10 place-items-center rounded-md ring-1 ring-line ring-inset hover:ring-ink" aria-label={`One fewer ${t.name}`}>
                          <Icon name="minus" className="h-4 w-4" />
                        </button>
                        <span className="w-6 text-center font-display text-2xl font-extrabold" aria-live="polite">
                          {q}
                        </span>
                        <button
                          type="button"
                          onClick={() => set(t, q + 1)}
                          disabled={q >= (t.limit ?? 6)}
                          className="grid h-10 w-10 place-items-center rounded-md ring-1 ring-line ring-inset hover:ring-ink disabled:opacity-40"
                          aria-label={`One more ${t.name}`}
                        >
                          <Icon name="plus" className="h-4 w-4" />
                        </button>
                      </>
                    ) : (
                      <button type="button" onClick={() => set(t, 1)} className="flex min-h-10 items-center gap-1.5 rounded-md bg-stout px-4 text-sm font-bold text-paper hover:bg-stout-3">
                        <Icon name="plus" className="h-4 w-4" /> Add
                      </button>
                    )}
                  </div>
                </li>
              );
            })}
        </ul>
        </div>
      </div>

      {/* ---------- Order ---------- */}
      <aside className="lg:sticky lg:top-6 lg:self-start">
        <div id="order" className="scroll-mt-24 rounded-lg bg-stout p-5 text-paper sm:p-6">
          <p className="font-display text-3xl font-extrabold uppercase">Your order</p>
          {lines.length ? (
            <ul className="mt-3 divide-y divide-paper/10">
              {lines.map((l) => (
                <li key={l.item.id} className="flex justify-between gap-3 py-2 text-sm">
                  <span>
                    {l.q} × {l.item.name}
                    <span className="block text-xs text-haze">{l.item.kind === "Merch" ? "Merch" : l.item.kind.replace(/s$/, "")}</span>
                  </span>
                  <span className="font-semibold">{money(l.item.price * l.q)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-haze">Nothing yet. Add a 4-pack or two.</p>
          )}

          {step === "details" && lines.length ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (slot && (!hasBeer || age)) setStep("done");
              }}
              className="mt-4 grid gap-3 border-t border-paper/15 pt-4"
            >
              <label className="grid gap-1.5 text-sm text-haze">
                Pickup time
                <select required value={slot} onChange={(e) => setSlot(e.target.value)} className="h-12 rounded-md bg-paper px-3 font-semibold text-ink">
                  <option value="">Choose a time</option>
                  {(["Today", "Tomorrow"] as const).map((d) =>
                    times.some((t) => t.day === d) ? (
                      <optgroup key={d} label={d}>
                        {times
                          .filter((t) => t.day === d)
                          .map((t) => (
                            <option key={t.value} value={t.value}>
                              {d} · {t.label}
                            </option>
                          ))}
                      </optgroup>
                    ) : null,
                  )}
                </select>
              </label>
              <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Name for the order" aria-label="Name for the order" className="h-12 rounded-md bg-paper px-3 text-ink" />
              <input required type="tel" placeholder="Mobile, for a ready text" aria-label="Mobile number" className="h-12 rounded-md bg-paper px-3 text-ink" />
              {hasBeer ? (
                <label className="flex cursor-pointer items-start gap-3 rounded-md bg-stout-2 p-3 text-sm ring-1 ring-straw/40">
                  <input type="checkbox" required checked={age} onChange={(e) => setAge(e.target.checked)} className="mt-0.5 h-4 w-4 accent-[#e8b64a]" />
                  <span>
                    <strong>I&rsquo;m 21 or older</strong> and will show a valid ID at pickup. We can&rsquo;t hand beer to anyone under 21, even with the
                    buyer&rsquo;s card.
                  </span>
                </label>
              ) : null}
              <div className="rounded-md bg-stout-2 p-3 text-sm text-haze">
                <p className="flex justify-between">
                  <span>Subtotal</span> <span>{money(subtotal)}</span>
                </p>
                <p className="flex justify-between">
                  <span>Tax (est.)</span> <span>{money(tax)}</span>
                </p>
                <p className="mt-1 flex justify-between font-display text-2xl font-extrabold text-paper">
                  <span>Total</span> <span>{money(subtotal + tax)}</span>
                </p>
              </div>
              <button type="submit" className="flex min-h-12 items-center justify-center gap-2 rounded-md bg-straw font-bold tracking-wide text-stout uppercase hover:bg-straw-soft">
                Place pickup order <Icon name="arrow" className="h-4 w-4" />
              </button>
              <p className="text-center text-xs text-haze">Demo checkout (Toast-style). No payment is taken; you&rsquo;d pay at pickup.</p>
            </form>
          ) : (
            <>
              <div className="mt-4 flex items-end justify-between border-t border-paper/15 pt-4">
                <p className="text-sm text-haze">{count} item{count === 1 ? "" : "s"}</p>
                <p className="font-display text-4xl font-extrabold">{money(subtotal)}</p>
              </div>
              <button
                type="button"
                disabled={!lines.length}
                onClick={() => setStep("details")}
                className="mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-straw font-bold tracking-wide text-stout uppercase hover:bg-straw-soft disabled:cursor-not-allowed disabled:bg-paper/10 disabled:text-paper/50"
              >
                Choose pickup time <Icon name="arrow" className="h-4 w-4" />
              </button>
            </>
          )}
          <p className="mt-4 flex items-start gap-2 text-xs text-haze">
            <Icon name="info" className="h-4 w-4 shrink-0" /> Colorado law lets us sell sealed beer to go but not ship it. Pickup only, ID checked every time.
          </p>
        </div>
      </aside>
      {count && step === "shop" ? (
        <a
          href="#order"
          className="fixed right-4 bottom-24 z-30 flex min-h-12 items-center gap-2 rounded-full bg-straw px-5 font-bold text-stout shadow-[0_10px_30px_-8px_rgb(0_0_0/0.5)] sm:bottom-6 lg:hidden"
        >
          <Icon name="bag" className="h-4 w-4" /> {count} · {money(subtotal)}
        </a>
      ) : null}
    </div>
  );
}
