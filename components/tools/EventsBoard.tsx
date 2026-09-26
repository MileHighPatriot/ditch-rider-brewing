"use client";

import { useState } from "react";
import Icon from "@/components/Icon";
import { events, kinds, weeklies, type BrewEvent, type EventKind } from "@/data/events";
import { dayNames, formatTime, fullAddress, site } from "@/data/site";
import { denver } from "@/lib/status";
import { useNow } from "@/lib/useNow";

const d = (iso: string) => new Date(`${iso}:00`);
const time = (iso: string) => d(iso).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }).replace(":00", "").replace(" ", "").toLowerCase();

function when(e: BrewEvent) {
  const day = d(e.start).toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });
  if (!e.end) return `${day} · ${time(e.start)}`;
  if (e.start.slice(0, 10) === e.end.slice(0, 10)) return `${day} · ${time(e.start)}–${time(e.end)}`;
  return `${day} – ${d(e.end).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}`;
}

function ics(e: BrewEvent) {
  const stamp = (x: Date) =>
    `${x.getFullYear()}${String(x.getMonth() + 1).padStart(2, "0")}${String(x.getDate()).padStart(2, "0")}T${String(x.getHours()).padStart(2, "0")}${String(x.getMinutes()).padStart(2, "0")}00`;
  const start = d(e.start);
  const end = e.end && e.end.slice(0, 10) === e.start.slice(0, 10) ? d(e.end) : new Date(start.getTime() + 3 * 3600000);
  const esc = (s: string) => s.replace(/[,;]/g, (c) => `\\${c}`);
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Ditch Rider Brewing//Events//EN",
    "BEGIN:VEVENT",
    `UID:${e.id}@ditchrider.example`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART;TZID=America/Denver:${stamp(start)}`,
    `DTEND;TZID=America/Denver:${stamp(end)}`,
    `SUMMARY:${esc(`${e.title} at ${site.shortName}`)}`,
    `LOCATION:${esc(fullAddress)}`,
    `DESCRIPTION:${esc(e.blurb)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

const tone: Record<EventKind, string> = {
  Release: "bg-brick text-paper",
  Music: "bg-straw text-stout",
  Trivia: "bg-canal text-paper",
  "Run club": "bg-hop text-paper",
  Family: "bg-hop-soft text-hop",
  Food: "bg-kraft text-ink",
  Community: "bg-canal-soft text-canal",
};

/** Upcoming events with filters, .ics files, and RSVPs; the weekly lineup above. */
export default function EventsBoard() {
  const now = useNow(300000);
  const today = now ? denver(now).ymd : "2026-09-26";
  const [kind, setKind] = useState<EventKind | "All">("All");
  const [rsvp, setRsvp] = useState<BrewEvent | null>(null);
  const [going, setGoing] = useState<Record<string, number>>({});

  const list = events.filter((e) => (e.end ?? e.start).slice(0, 10) >= today && (kind === "All" || e.kind === kind));

  return (
    <div>
      {/* ---------- Every week ---------- */}
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {weeklies.map((w) => {
          const tonight = now && denver(now).day === w.day;
          return (
            <li key={w.id} className={`flex flex-col rounded-lg p-5 ring-1 ${tonight ? "bg-stout text-paper ring-stout" : "bg-paper ring-line"}`}>
              <p className={`eyebrow ${tonight ? "text-straw" : "text-brick-deep"}`}>
                {tonight ? "Today" : `${dayNames[w.day]}s`} · {formatTime(w.start)}
              </p>
              <p className="mt-2 font-display text-[1.7rem] leading-none font-extrabold uppercase">{w.title}</p>
              <p className={`mt-2 text-sm leading-relaxed ${tonight ? "text-haze" : "text-dust"}`}>{w.blurb}</p>
            </li>
          );
        })}
      </ul>

      {/* ---------- Upcoming ---------- */}
      <div className="mt-14 flex flex-wrap items-end justify-between gap-4">
        <h2 className="h-section">Coming up</h2>
        <div role="group" aria-label="Filter events" className="flex flex-wrap gap-2">
          {(["All", ...kinds] as const).map((k) => (
            <button
              key={k}
              type="button"
              aria-pressed={kind === k}
              onClick={() => setKind(k)}
              className="min-h-10 rounded-md bg-paper px-3.5 text-sm font-bold ring-1 ring-line ring-inset hover:ring-ink aria-pressed:bg-stout aria-pressed:text-paper aria-pressed:ring-stout"
            >
              {k}
            </button>
          ))}
        </div>
      </div>

      <ul className="mt-6 grid gap-3" aria-live="polite">
        {list.map((e) => {
          const s = d(e.start);
          const live = e.start.slice(0, 10) <= today && (e.end ?? e.start).slice(0, 10) >= today;
          return (
            <li
              key={e.id}
              id={e.id}
              className="grid scroll-mt-24 gap-4 rounded-lg bg-paper p-5 ring-1 ring-line target:ring-2 target:ring-brick sm:grid-cols-[5.5rem_1fr_auto] sm:items-center sm:gap-6 sm:p-6"
            >
              <div className="flex items-center gap-3 sm:block">
                <div className="w-16 overflow-hidden rounded-md bg-stout text-center text-paper sm:w-full">
                  <p className="bg-brick py-1 text-[0.7rem] font-bold tracking-widest uppercase">{s.toLocaleDateString("en-US", { month: "short" })}</p>
                  <p className="py-1 font-display text-4xl leading-none font-extrabold">{s.getDate()}</p>
                </div>
                <span className={`rounded-sm px-2 py-0.5 text-[0.7rem] font-bold tracking-wider uppercase sm:mt-2 sm:inline-block ${tone[e.kind]}`}>{e.kind}</span>
              </div>
              <div>
                <p className="flex flex-wrap items-center gap-2">
                  <span className="font-display text-3xl leading-none font-extrabold uppercase">{e.title}</span>
                  {live ? <span className="rounded-sm bg-open px-1.5 py-0.5 text-[0.65rem] font-bold tracking-wider text-stout uppercase">Happening now</span> : null}
                </p>
                <p className="mt-1.5 flex flex-wrap gap-x-4 text-sm font-semibold text-dust">
                  <span className="flex items-center gap-1.5">
                    <Icon name="clock" className="h-4 w-4 text-brick-deep" /> {when(e)}
                  </span>
                  {e.price ? (
                    <span className="flex items-center gap-1.5">
                      <Icon name="ticket" className="h-4 w-4 text-brick-deep" /> {e.price}
                    </span>
                  ) : (
                    <span>Free · no cover</span>
                  )}
                </p>
                <p className="mt-2 max-w-2xl text-[0.97rem] leading-relaxed text-dust">{e.blurb}</p>
              </div>
              <div className="flex flex-wrap gap-2 sm:flex-col sm:items-stretch">
                {e.rsvp ? (
                  going[e.id] ? (
                    <p className="flex min-h-11 items-center gap-2 rounded-md bg-hop-soft px-4 text-sm font-bold text-hop">
                      <Icon name="check" className="h-4 w-4" /> {going[e.id]} going
                    </p>
                  ) : (
                    <button type="button" onClick={() => setRsvp(e)} className="min-h-11 rounded-md bg-brick px-5 text-sm font-bold tracking-wide text-paper uppercase hover:bg-brick-deep">
                      {e.price ? "Get seats" : "RSVP"}
                    </button>
                  )
                ) : null}
                <a
                  href={`data:text/calendar;charset=utf-8,${encodeURIComponent(ics(e))}`}
                  download={`${e.id}.ics`}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-4 text-sm font-bold ring-1 ring-line ring-inset hover:ring-ink"
                >
                  <Icon name="calendar" className="h-4 w-4" /> Add to calendar
                </a>
              </div>
            </li>
          );
        })}
      </ul>
      {!list.length ? <p className="mt-6 rounded-lg border-2 border-dashed border-line p-8 text-center text-dust">Nothing on the calendar in that category yet.</p> : null}

      {rsvp ? (
        <div role="dialog" aria-modal="true" aria-labelledby="rsvp-title" className="fixed inset-0 z-50 flex items-end justify-center bg-stout/70 p-4 backdrop-blur-sm sm:items-center" onClick={() => setRsvp(null)}>
          <form
            onClick={(ev) => ev.stopPropagation()}
            onSubmit={(ev) => {
              ev.preventDefault();
              setGoing((g) => ({ ...g, [rsvp.id]: Number(new FormData(ev.currentTarget).get("n")) || 1 }));
              setRsvp(null);
            }}
            className="w-full max-w-md rounded-lg bg-foam p-7"
          >
            <p className="eyebrow text-brick-deep">{rsvp.price ? `Tickets · ${rsvp.price} each` : "RSVP"}</p>
            <h2 id="rsvp-title" className="mt-2 text-4xl">
              {rsvp.title}
            </h2>
            <p className="mt-1 text-sm text-dust">{when(rsvp)}</p>
            <div className="mt-5 grid gap-3">
              <input required placeholder="Your name" aria-label="Your name" className="h-12 rounded-md bg-paper px-4 ring-1 ring-line outline-none focus:ring-2 focus:ring-straw" />
              <input required type="email" placeholder="Email" aria-label="Email" className="h-12 rounded-md bg-paper px-4 ring-1 ring-line outline-none focus:ring-2 focus:ring-straw" />
              <label className="flex items-center justify-between rounded-md bg-paper px-4 py-2 ring-1 ring-line">
                <span className="font-semibold">How many?</span>
                <select name="n" defaultValue="2" className="h-9 rounded-md bg-foam px-2 ring-1 ring-line">
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n}>{n}</option>
                  ))}
                </select>
              </label>
            </div>
            <div className="mt-5 flex gap-2">
              <button type="submit" className="min-h-12 flex-1 rounded-md bg-brick font-bold tracking-wide text-paper uppercase hover:bg-brick-deep">
                {rsvp.price ? "Reserve seats" : "Count me in"}
              </button>
              <button type="button" onClick={() => setRsvp(null)} className="min-h-12 rounded-md px-5 font-bold ring-1 ring-line ring-inset">
                Cancel
              </button>
            </div>
            <p className="mt-3 text-xs text-dust">Concept site: nothing is sent or charged.</p>
          </form>
        </div>
      ) : null}
    </div>
  );
}
