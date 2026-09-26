"use client";

import { useEffect, useState } from "react";
import Icon from "@/components/Icon";
import FlightBuilder from "@/components/tools/FlightBuilder";
import TapList from "@/components/tools/TapList";

const KEY = "dr-flight-v1";

/** Tap list and flight builder share one flight, remembered for this visit. */
export default function BeerBoard() {
  const [flight, setFlight] = useState<string[]>([]);

  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- restore the flight after hydration
      setFlight(JSON.parse(sessionStorage.getItem(KEY) ?? "[]"));
    } catch {}
  }, []);

  const save = (next: string[]) => {
    setFlight(next);
    try {
      sessionStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
  };
  const toggle = (id: string) => save(flight.includes(id) ? flight.filter((x) => x !== id) : flight.length < 4 ? [...flight, id] : flight);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_22rem] lg:gap-10">
      <TapList flight={flight} onToggle={toggle} />
      {/* Sticky beside the list on desktop; after the list on phones, with a floating counter to get there. */}
      <aside className="lg:sticky lg:top-6 lg:self-start">
        <FlightBuilder flight={flight} onRemove={(id) => save(flight.filter((x) => x !== id))} onClear={() => save([])} />
      </aside>
      {flight.length ? (
        <a
          href="#flight"
          className="fixed right-4 bottom-24 z-30 flex min-h-12 items-center gap-2 rounded-full bg-straw px-5 font-bold text-stout shadow-[0_10px_30px_-8px_rgb(0_0_0/0.5)] sm:bottom-6 lg:hidden"
        >
          <Icon name="beer" className="h-4 w-4" /> Flight {flight.length}/4
        </a>
      ) : null}
    </div>
  );
}
