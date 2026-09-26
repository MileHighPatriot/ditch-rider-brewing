"use client";

import { useEffect, useState } from "react";
import Icon from "@/components/Icon";
import { dayShort, site } from "@/data/site";

type Day = { date: string; hi: number; lo: number; gust: number; rain: number; code: number };

/** Patio outlook for the next 5 evenings, from Open-Meteo (5pm conditions). */
function call(d: Day) {
  if (d.rain >= 50 || d.code >= 61) return { label: "Inside night", tone: "bg-canal-soft text-canal", icon: "drop" };
  if (d.gust >= 30) return { label: "Windy", tone: "bg-kraft text-dust", icon: "wind" };
  if (d.hi < 50) return { label: "Heaters on", tone: "bg-[#f6d8cf] text-brick-deep", icon: "flame" };
  return { label: "Patio night", tone: "bg-hop-soft text-hop", icon: "sun" };
}

export default function PatioForecast() {
  const [days, setDays] = useState<Day[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const q = new URLSearchParams({
      latitude: String(site.geo.lat),
      longitude: String(site.geo.lon),
      daily: "temperature_2m_max,temperature_2m_min,wind_gusts_10m_max,precipitation_probability_max,weather_code",
      temperature_unit: "fahrenheit",
      wind_speed_unit: "mph",
      timezone: "America/Denver",
      forecast_days: "5",
    });
    const ctrl = new AbortController();
    fetch(`https://api.open-meteo.com/v1/forecast?${q}`, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((j) =>
        setDays(
          j.daily.time.map((date: string, i: number) => ({
            date,
            hi: Math.round(j.daily.temperature_2m_max[i]),
            lo: Math.round(j.daily.temperature_2m_min[i]),
            gust: Math.round(j.daily.wind_gusts_10m_max[i]),
            rain: j.daily.precipitation_probability_max[i] ?? 0,
            code: j.daily.weather_code[i],
          })),
        ),
      )
      .catch((e) => e?.name !== "AbortError" && setFailed(true));
    return () => ctrl.abort();
  }, []);

  if (failed) return <p className="text-dust">Forecast unavailable right now. The patio is open whenever the weather allows.</p>;
  return (
    <ol className="grid grid-cols-5 gap-2" aria-label="Five-day patio outlook">
      {(days ?? Array.from({ length: 5 }, () => null)).map((d, i) => {
        if (!d) return <li key={i} className="h-40 animate-pulse rounded-lg bg-kraft" />;
        const c = call(d);
        const wd = new Date(`${d.date}T12:00:00`).getDay();
        return (
          <li key={d.date} className="flex flex-col items-center rounded-lg bg-paper px-1 py-4 text-center ring-1 ring-line">
            <p className="eyebrow text-dust">{i === 0 ? "Today" : dayShort[wd]}</p>
            <Icon name={c.icon} className="mt-3 h-6 w-6 text-brick-deep" />
            <p className="mt-2 font-display text-3xl font-extrabold">{d.hi}°</p>
            <p className="text-xs text-dust">low {d.lo}°</p>
            <span className={`mt-3 rounded-sm px-1.5 py-0.5 text-[0.62rem] font-bold tracking-wider uppercase ${c.tone}`}>{c.label}</span>
          </li>
        );
      })}
    </ol>
  );
}
