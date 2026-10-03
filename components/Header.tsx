"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Icon from "@/components/Icon";
import Logo from "@/components/Logo";
import StatusStrip from "@/components/StatusStrip";
import { nav } from "@/data/nav";
import { site } from "@/data/site";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  // The concept bar (and the show-night banner) above the header change height from screen to
  // screen, so the phone menu is placed at the header's measured bottom edge (top-[7.35rem] is the fallback).
  const headerRef = useRef<HTMLElement>(null);
  const [menuTop, setMenuTop] = useState<number>();
  const placeMenu = () => setMenuTop(headerRef.current?.getBoundingClientRect().bottom);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- close the menu after navigating
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) window.addEventListener("resize", placeMenu);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("resize", placeMenu);
    };
  }, [open]);

  const isActive = (href: string) => pathname.startsWith(href.replace(/\/$/, ""));

  return (
    <header ref={headerRef} className="relative z-40 bg-stout text-paper">
      <div className="border-b border-paper/10">
        <div className="wrap flex min-h-10 items-center justify-between gap-4 py-2 text-[0.85rem]">
          <StatusStrip />
          <div className="hidden shrink-0 items-center gap-6 lg:flex">
            <Link href="/visit/#getting-here" className="flex items-center gap-1.5 text-haze hover:text-straw">
              <Icon name="train" className="h-4 w-4" /> 3 min from Orchard Station
            </Link>
            <Link href="/mug-club/" className="flex items-center gap-1.5 text-haze hover:text-straw">
              <Icon name="beer" className="h-4 w-4" /> Mug Club
            </Link>
          </div>
        </div>
      </div>

      <div className="wrap flex h-[4.75rem] items-center justify-between gap-6">
        <Link href="/" className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="rounded-md px-3.5 py-2 text-[0.92rem] font-bold tracking-wider text-paper/80 uppercase transition-colors hover:text-paper aria-[current=page]:text-straw"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/to-go/"
            className="hidden min-h-11 items-center gap-2 rounded-md bg-brick px-5 text-[0.9rem] font-bold tracking-wide text-paper uppercase transition-colors hover:bg-brick-deep sm:inline-flex"
          >
            <Icon name="bag" className="h-4 w-4" /> Order to go
          </Link>
          <button
            type="button"
            className="inline-flex min-h-11 items-center gap-2 rounded-md px-3 ring-1 ring-paper/25 ring-inset lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => {
              placeMenu();
              setOpen((v) => !v);
            }}
          >
            <Icon name={open ? "close" : "menu"} />
            <span className="text-sm font-bold tracking-wide uppercase">{open ? "Close" : "Menu"}</span>
          </button>
        </div>
      </div>

      <div id="mobile-menu" hidden={!open} style={menuTop === undefined ? undefined : { top: menuTop }} className="fixed inset-x-0 top-[7.35rem] bottom-0 overflow-y-auto bg-stout text-paper lg:hidden">
        <nav aria-label="Mobile" className="wrap py-6">
          <ul className="grid gap-0.5">
            {[...nav, { href: "/to-go/", label: "Order to go" }, { href: "/mug-club/", label: "Mug Club" }, { href: "/about/", label: "Our story" }].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="flex items-center justify-between border-b border-paper/10 py-4 font-display text-[2rem] font-extrabold uppercase">
                  {item.label}
                  <Icon name="arrow" className="h-5 w-5 text-straw" />
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-haze">
            {site.address.street}, {site.address.city}
            <br />
            {site.lightRail}
          </p>
        </nav>
      </div>
    </header>
  );
}
