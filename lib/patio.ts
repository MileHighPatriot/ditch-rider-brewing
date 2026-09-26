"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";

export type Weather = {
  tempF: number;
  gustMph: number;
  uv: number;
  code: number;
  precip: number;
  sunset: string; // ISO local
};

export type Patio = {
  level: "open" | "heaters" | "shade" | "closed";
  label: string;
  detail: string;
};

const KEY = "dr-weather-v1";

/**
 * Current conditions at the brewery from Open-Meteo (free, no key), cached for
 * 10 minutes in sessionStorage. Null until loaded or if the request fails.
 */
export function useWeather() {
  const [w, setW] = useState<Weather | null>(null);
  useEffect(() => {
    try {
      const cached = JSON.parse(sessionStorage.getItem(KEY) ?? "null");
      if (cached && Date.now() - cached.at < 600000) {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- restore cached conditions after hydration
        setW(cached.w);
        return;
      }
    } catch {}
    const ctrl = new AbortController();
    const q = new URLSearchParams({
      latitude: String(site.geo.lat),
      longitude: String(site.geo.lon),
      current: "temperature_2m,wind_gusts_10m,uv_index,weather_code,precipitation",
      daily: "sunset",
      temperature_unit: "fahrenheit",
      wind_speed_unit: "mph",
      timezone: "America/Denver",
      forecast_days: "1",
    });
    fetch(`https://api.open-meteo.com/v1/forecast?${q}`, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((j) => {
        const value: Weather = {
          tempF: Math.round(j.current.temperature_2m),
          gustMph: Math.round(j.current.wind_gusts_10m),
          uv: Math.round(j.current.uv_index ?? 0),
          code: j.current.weather_code,
          precip: j.current.precipitation ?? 0,
          sunset: j.daily.sunset[0],
        };
        try {
          sessionStorage.setItem(KEY, JSON.stringify({ at: Date.now(), w: value }));
        } catch {}
        setW(value);
      })
      .catch(() => {});
    return () => ctrl.abort();
  }, []);
  return w;
}

/** WMO weather codes 51+ are drizzle, rain, snow, or storms. */
const wet = (code: number) => code >= 51;

/** Turn the weather into a patio call, the way a manager would. */
export function patioCall(w: Weather, open: boolean): Patio {
  if (!open) return { level: "closed", label: "Patio closed", detail: "Opens with the taproom" };
  if (wet(w.code) || w.precip > 0.2) return { level: "closed", label: "Patio closed", detail: "Rain or snow. Plenty of room inside." };
  if (w.gustMph >= 30) return { level: "closed", label: "Patio closed for wind", detail: `Gusts to ${w.gustMph} mph. Umbrellas down.` };
  if (w.tempF < 40) return { level: "closed", label: "Patio closed", detail: `${w.tempF}°. Fire pits can only do so much.` };
  if (w.tempF < 62) return { level: "heaters", label: "Patio open · heaters on", detail: `${w.tempF}° with fire pits lit` };
  if (w.tempF >= 88 || w.uv >= 8) return { level: "shade", label: "Patio open · shade sails up", detail: `${w.tempF}°, UV ${w.uv}. Misters on.` };
  return { level: "open", label: "Patio open", detail: `${w.tempF}° and ${w.gustMph < 12 ? "calm" : "breezy"}` };
}

export const sunsetTime = (iso: string) =>
  new Date(iso).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: "America/Denver" }).replace(" ", "").toLowerCase();
