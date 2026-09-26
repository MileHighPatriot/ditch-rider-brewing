"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Mark } from "@/components/Logo";

const KEY = "dr-age-ok";
const DAYS = 30;

/**
 * Industry-standard age check on the beer and to-go pages only, so families
 * can still browse the kitchen menu. Remembered for 30 days. Not a legal
 * requirement in Colorado: ID is checked at the bar and at pickup.
 */
export default function AgeGate() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let ok = false;
    try {
      const at = Number(localStorage.getItem(KEY));
      ok = at > 0 && Date.now() - at < DAYS * 86400000;
    } catch {}
    if (new URLSearchParams(location.search).get("age") === "1") ok = true;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- depends on this browser's saved answer
    setShow(!ok);
  }, []);

  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [show]);

  if (!show) return null;
  return (
    <div role="dialog" aria-modal="true" aria-labelledby="age-title" className="fixed inset-0 z-[60] grid place-items-center bg-stout/85 p-4 backdrop-blur-md">
      <div className="label-frame w-full max-w-md rounded-lg bg-foam p-8 text-center text-ink [--frame:var(--color-line)] sm:p-10">
        <Mark className="mx-auto h-14 w-14 text-brick" water="var(--color-canal)" />
        <p className="eyebrow mt-5 text-brick-deep">Before you look at the beer</p>
        <h2 id="age-title" className="mt-2 text-5xl">
          Are you 21 or older?
        </h2>
        <p className="mt-3 text-dust">We&rsquo;ll remember your answer on this device for 30 days.</p>
        <div className="mt-7 grid gap-2">
          <button
            type="button"
            autoFocus
            onClick={() => {
              try {
                localStorage.setItem(KEY, String(Date.now()));
              } catch {}
              setShow(false);
            }}
            className="min-h-12 rounded-md bg-brick font-bold tracking-wide text-paper uppercase hover:bg-brick-deep"
          >
            Yes, I&rsquo;m 21+
          </button>
          <Link href="/kitchen/" className="grid min-h-12 place-items-center rounded-md font-bold tracking-wide uppercase ring-2 ring-ink/80 ring-inset hover:bg-ink hover:text-paper">
            Not yet. Show me the food.
          </Link>
        </div>
      </div>
    </div>
  );
}
