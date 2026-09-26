"use client";

import { useEffect, useState } from "react";
import Icon from "@/components/Icon";
import { showNights } from "@/data/events";
import { denver } from "@/lib/status";

/**
 * On amphitheater show nights the patio fills early, so we say so up top.
 * Dates live in data/events.ts. Add ?show=1 to preview.
 */
export default function ShowBanner() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const preview = new URLSearchParams(location.search).get("show") === "1";
    const { ymd, minutes } = denver(new Date());
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem("dr-show-hide") === ymd;
    } catch {}
    // eslint-disable-next-line react-hooks/set-state-in-effect -- depends on the visitor's clock
    setOn(preview || (showNights.includes(ymd) && minutes < 20 * 60 && !dismissed));
  }, []);

  if (!on) return null;
  return (
    <div role="status" className="relative z-50 bg-straw text-stout">
      <div className="wrap flex items-start gap-3 py-2.5 text-[0.92rem]">
        <Icon name="ticket" className="mt-0.5 h-5 w-5 shrink-0" />
        <p className="flex-1">
          <strong>Show night at the amphitheater.</strong> Pre-show dinner: order by 6 and we&rsquo;ll have you out the door by 6:45.
          It&rsquo;s a 12-minute walk up Greenwood Plaza Blvd.
        </p>
        <button
          type="button"
          onClick={() => {
            try {
              sessionStorage.setItem("dr-show-hide", denver(new Date()).ymd);
            } catch {}
            setOn(false);
          }}
          className="-m-2 grid h-10 w-10 shrink-0 place-items-center rounded-md hover:bg-stout/10"
          aria-label="Dismiss"
        >
          <Icon name="close" className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
