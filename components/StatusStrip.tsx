"use client";

import Icon from "@/components/Icon";
import { happyHour, formatTime } from "@/data/site";
import { patioCall, useWeather } from "@/lib/patio";
import { openState } from "@/lib/status";
import { useNow } from "@/lib/useNow";

/** Top-bar status: open now, happy hour, and the patio call. */
export default function StatusStrip() {
  const now = useNow(60000);
  const s = now ? openState(now) : null;
  const w = useWeather();
  const patio = w && s ? patioCall(w, s.open) : null;

  if (!s) return <span className="h-5" aria-hidden />;
  return (
    <p className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-1" aria-live="polite">
      <span className="flex items-center gap-2 font-semibold whitespace-nowrap">
        <span className={`h-2 w-2 rounded-full ${s.open ? "animate-pulse-open bg-open" : "bg-haze"}`} />
        {s.open ? `Open till ${s.closesAt}` : `Closed · opens ${s.opensLabel} ${s.opensAt}`}
      </span>
      {s.open && s.happyHour ? (
        <span className="hidden whitespace-nowrap text-straw sm:inline">Happy hour till {formatTime(happyHour.end)}</span>
      ) : null}
      {patio ? (
        <span className="hidden items-center gap-1.5 whitespace-nowrap text-haze md:flex">
          <Icon name={patio.level === "heaters" ? "flame" : patio.level === "closed" ? "wind" : "sun"} className="h-4 w-4 text-straw" />
          {patio.label}
          {patio.level !== "closed" ? ` · ${w!.tempF}°` : ""}
        </span>
      ) : null}
    </p>
  );
}
