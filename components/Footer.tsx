import Link from "next/link";
import Icon from "@/components/Icon";
import Logo from "@/components/Logo";
import { footerNav } from "@/data/nav";
import { dayShort, formatTime, fullAddress, hours, mapsHref, site } from "@/data/site";

/** Group consecutive days with the same hours: "Mon–Thu 11am–10pm". */
function hourRows() {
  const order = [1, 2, 3, 4, 5, 6, 0].map((d) => hours[d]);
  const rows: { days: string; time: string }[] = [];
  for (const h of order) {
    const time = `${formatTime(h.open)}–${formatTime(h.close)}`;
    const last = rows[rows.length - 1];
    if (last && last.time === time) last.days = `${last.days.split("–")[0]}–${dayShort[h.day]}`;
    else rows.push({ days: dayShort[h.day], time });
  }
  return rows;
}

export default function Footer() {
  return (
    <footer className="bg-stout pb-24 text-paper sm:pb-0">
      <div className="canal-rule canal-rule-light" aria-hidden />
      <div className="wrap grid gap-12 py-16 lg:grid-cols-[1.2fr_2fr] lg:py-20">
        <div>
          <Logo />
          <p className="aside mt-6 max-w-sm text-xl leading-snug text-paper/90">
            Named for the riders who opened the headgates on the High Line Canal. We open the taps.
          </p>
          <ul className="mt-8 grid gap-3 text-[0.95rem] text-paper/85">
            <li>
              <a href={mapsHref} className="flex gap-3 hover:text-straw">
                <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-straw" /> {fullAddress}
              </a>
            </li>
            <li>
              <a href={site.phoneHref} className="flex gap-3 hover:text-straw">
                <Icon name="phone" className="mt-0.5 h-4 w-4 shrink-0 text-straw" /> {site.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Icon name="clock" className="mt-0.5 h-4 w-4 shrink-0 text-straw" />
              <span>
                {hourRows().map((r) => (
                  <span key={r.days} className="block">
                    <span className="inline-block w-20 font-semibold">{r.days}</span> {r.time}
                  </span>
                ))}
              </span>
            </li>
          </ul>
        </div>
        <div className="grid gap-10 sm:grid-cols-3">
          {footerNav.map((col) => (
            <div key={col.title}>
              <p className="eyebrow text-straw">{col.title}</p>
              <ul className="mt-4 grid gap-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-paper/85 hover:text-straw">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-paper/10">
        <div className="wrap grid gap-4 py-6 text-sm text-haze md:grid-cols-[1fr_auto] md:items-center">
          <p>
            <strong className="text-paper">Please enjoy responsibly. 21+.</strong> Ride RTD or rideshare. © {new Date().getFullYear()} {site.name}.
          </p>
          <p>
            <strong className="text-paper">Concept project</strong> designed by{" "}
            <a href="https://5280webs.com" className="underline underline-offset-2 hover:text-straw">
              5280 Web Solutions
            </a>
            . Ditch Rider is fictional; beers, people, and prices are illustrative.
          </p>
        </div>
      </div>
    </footer>
  );
}
