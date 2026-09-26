import { brunch, dayShort, formatTime, happyHour, hours, toMinutes } from "@/data/site";

/** Wall-clock parts for a moment in Denver. */
export function denver(date: Date) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Denver",
      weekday: "short",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    })
      .formatToParts(date)
      .map((p) => [p.type, p.value]),
  );
  const day = dayShort.indexOf(parts.weekday);
  const minutes = Number(parts.hour) * 60 + Number(parts.minute);
  return { day, minutes, ymd: `${parts.year}-${parts.month}-${parts.day}` };
}

export type OpenState =
  | { open: true; closesAt: string; kitchenClosesAt: string; minutesLeft: number; happyHour: boolean; brunch: boolean }
  | { open: false; opensAt: string; opensLabel: string };

/** Is the taproom open right now, and what's next? */
export function openState(now: Date): OpenState {
  const { day, minutes } = denver(now);
  const today = hours[day];
  const o = toMinutes(today.open);
  const c = toMinutes(today.close);
  if (minutes >= o && minutes < c) {
    const hh = happyHour.days.includes(day) && minutes >= toMinutes(happyHour.start) && minutes < toMinutes(happyHour.end);
    const br = day === brunch.day && minutes >= toMinutes(brunch.start) && minutes < toMinutes(brunch.end);
    return {
      open: true,
      closesAt: formatTime(today.close),
      kitchenClosesAt: formatTime(`${String(Math.floor(c / 60) - 1).padStart(2, "0")}:${String(c % 60).padStart(2, "0")}`),
      minutesLeft: c - minutes,
      happyHour: hh,
      brunch: br,
    };
  }
  if (minutes < o) return { open: false, opensAt: formatTime(today.open), opensLabel: "today" };
  const next = hours[(day + 1) % 7];
  return { open: false, opensAt: formatTime(next.open), opensLabel: "tomorrow" };
}
