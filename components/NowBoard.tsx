"use client";

import Link from "next/link";
import Icon from "@/components/Icon";
import { events, weeklies } from "@/data/events";
import { dayNames, formatTime, happyHour } from "@/data/site";
import { patioCall, sunsetTime, useWeather } from "@/lib/patio";
import { denver, openState } from "@/lib/status";
import { useNow } from "@/lib/useNow";

/** What's going on right now: open/closed, the patio call, and tonight. */
export default function NowBoard() {
  const now = useNow(60000);
  const s = now ? openState(now) : null;
  const w = useWeather();
  const patio = w && s ? patioCall(w, s.open) : null;
  const today = now ? denver(now) : null;
  const special = today ? events.find((e) => e.start.slice(0, 10) <= today.ymd && (e.end ?? e.start).slice(0, 10) >= today.ymd) : null;
  const regular = today ? weeklies.find((x) => x.day === today.day) : null;

  const card = "flex flex-col rounded-lg bg-stout-2 p-6 ring-1 ring-paper/10";
  return (
    <div className="grid gap-4 md:grid-cols-3" aria-live="polite">
      <div className={card}>
        <p className="eyebrow flex items-center gap-2 text-haze">
          <Icon name="clock" className="h-4 w-4 text-straw" /> Right now
        </p>
        {s ? (
          <>
            <p className="mt-3 font-display text-4xl font-extrabold uppercase">
              {s.open ? (
                <>
                  <span className="text-open">Open</span> till {s.closesAt}
                </>
              ) : (
                <>Closed</>
              )}
            </p>
            <p className="mt-2 text-haze">
              {s.open
                ? s.happyHour
                  ? `Happy hour till ${formatTime(happyHour.end)}: ${happyHour.deal}.`
                  : s.brunch
                    ? "Brunch till 2. Lawn games are out."
                    : `Kitchen open till ${s.kitchenClosesAt}.`
                : `Opens ${s.opensLabel} at ${s.opensAt}. Crowlers and 4-packs can be pre-ordered any time.`}
            </p>
          </>
        ) : (
          <p className="mt-3 h-20 animate-pulse rounded bg-paper/5" />
        )}
      </div>

      <div className={card}>
        <p className="eyebrow flex items-center gap-2 text-haze">
          <Icon name="sun" className="h-4 w-4 text-straw" /> The patio
        </p>
        {patio && w ? (
          <>
            <p className="mt-3 font-display text-4xl font-extrabold uppercase">{patio.label}</p>
            <p className="mt-2 text-haze">{patio.detail}.</p>
            <p className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-4 text-sm text-haze">
              <span className="flex items-center gap-1.5">
                <Icon name="wind" className="h-4 w-4" /> Gusts {w.gustMph} mph
              </span>
              <span className="flex items-center gap-1.5">
                <Icon name="sunset" className="h-4 w-4" /> Sunset {sunsetTime(w.sunset)}
              </span>
            </p>
          </>
        ) : (
          <>
            <p className="mt-3 font-display text-4xl font-extrabold uppercase">Dog-friendly patio</p>
            <p className="mt-2 text-haze">Fire pits and heaters from spring into November. Checking the weather…</p>
          </>
        )}
      </div>

      <div className={card}>
        <p className="eyebrow flex items-center gap-2 text-haze">
          <Icon name="calendar" className="h-4 w-4 text-straw" /> Today
        </p>
        {special || regular ? (
          <>
            <p className="mt-3 font-display text-4xl font-extrabold uppercase">{special?.title ?? regular!.title}</p>
            <p className="mt-2 line-clamp-3 text-haze">{special?.blurb ?? regular!.blurb}</p>
          </>
        ) : (
          <>
            <p className="mt-3 font-display text-4xl font-extrabold uppercase">Just a good {today ? dayNames[today.day] : "night"}</p>
            <p className="mt-2 text-haze">No event tonight, which means there&rsquo;s a table. Happy hour runs 3 to 6.</p>
          </>
        )}
        <Link href="/events/" className="mt-auto flex items-center gap-2 pt-4 text-sm font-bold tracking-wide text-straw uppercase hover:underline">
          All events <Icon name="arrow" className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
