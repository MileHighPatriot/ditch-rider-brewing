"use client";

import Icon from "@/components/Icon";
import { showNights } from "@/data/events";
import { denver } from "@/lib/status";

/**
 * Runs inline as the page is parsed, before the banner paints: on show nights (before 8 pm Denver
 * time, unless dismissed today) it marks <html data-show>, and CSS reveals the banner. Deciding
 * this in a React effect instead inserted the banner after first paint and pushed the page down.
 * Mirrors denver() in lib/status.ts. Add ?show=1 to preview.
 */
export const showBannerScript = `(function(){try{
var nights=${JSON.stringify(showNights)};
var p={};new Intl.DateTimeFormat("en-US",{timeZone:"America/Denver",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hourCycle:"h23"}).formatToParts(new Date()).forEach(function(x){p[x.type]=x.value});
var ymd=p.year+"-"+p.month+"-"+p.day,min=Number(p.hour)*60+Number(p.minute),hid=false;
try{hid=sessionStorage.getItem("dr-show-hide")===ymd}catch(e){}
if(new URLSearchParams(location.search).get("show")==="1"||(nights.indexOf(ymd)>-1&&min<1200&&!hid))document.documentElement.setAttribute("data-show","");
}catch(e){}})();`;

/** On amphitheater show nights the patio fills early, so we say so up top. Dates live in data/events.ts. */
export default function ShowBanner() {
  return (
    <div role="status" className="show-banner relative z-50 bg-straw text-stout">
      <div className="wrap flex items-start gap-3 py-2.5 text-[0.92rem]">
        <Icon name="ticket" className="mt-0.5 h-5 w-5 shrink-0" />
        <p className="flex-1">
          <strong>Show night at the amphitheater.</strong> Pre-show dinner: order by 6 and we&rsquo;ll have you out the door by 6:45.
          It&rsquo;s a 12-minute walk to the amphitheater.
        </p>
        <button
          type="button"
          onClick={() => {
            try {
              sessionStorage.setItem("dr-show-hide", denver(new Date()).ymd);
            } catch {}
            document.documentElement.removeAttribute("data-show");
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
