import { beerColor, type Beer, type Pattern } from "@/data/beers";

/** A pint (or a tulip, for big and dark beers) filled with the beer's actual color. */
export function Glass({ beer, className = "h-14 w-9", fill = 1 }: { beer: Beer; className?: string; fill?: number }) {
  const color = beerColor(beer);
  const tulip = beer.family === "Dark" || beer.tags.includes("barrel") || beer.family === "Sour & Fruit";
  const id = `g-${beer.id}`;
  const outline = tulip
    ? "M8 4h24c1 8 2 14-1 22-2 5-6 8-9 9v14h7v3H11v-3h7V35c-3-1-7-4-9-9-3-8-2-14-1-22Z"
    : "M7 4h26l-3 44a3 3 0 0 1-3 3H13a3 3 0 0 1-3-3L7 4Z";
  const head = beer.tags.includes("nitro") ? 7 : beer.family === "Sour & Fruit" ? 2 : 5;
  const top = 4 + (1 - fill) * 30;
  return (
    <svg viewBox="0 0 40 56" aria-hidden="true" className={className}>
      <defs>
        <clipPath id={id}>
          <path d={outline} />
        </clipPath>
        <linearGradient id={`${id}-l`} x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.25" />
          <stop offset="0.35" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g clipPath={`url(#${id})`}>
        <rect x="0" y={top + head} width="40" height="56" fill={color} />
        <rect x="0" y={top} width="40" height={head} fill="#f7efdc" />
        <rect x="0" y="0" width="40" height="56" fill={`url(#${id}-l)`} />
      </g>
      <path d={outline} fill="none" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.2" />
    </svg>
  );
}

function patternShapes(p: Pattern, accent: string) {
  const s = { stroke: accent, strokeWidth: 3, fill: "none" } as const;
  switch (p) {
    case "waves":
      return [0, 1, 2, 3, 4, 5].map((i) => <path key={i} d={`M-4 ${12 + i * 10}c5 0 5-4 10-4s5 4 10 4 5-4 10-4 5 4 10 4 5-4 10-4 5 4 10 4`} {...s} />);
    case "stripes":
      return [0, 1, 2, 3, 4, 5, 6, 7].map((i) => <path key={i} d={`M${-40 + i * 14} 70 L${i * 14 + 10} 0`} {...s} strokeWidth={5} />);
    case "chevron":
      return [0, 1, 2, 3, 4].map((i) => <path key={i} d={`M-2 ${14 + i * 12}l10-8 10 8 10-8 10 8 10-8 10 8`} {...s} />);
    case "sun":
      return (
        <>
          <circle cx="30" cy="62" r="16" fill={accent} />
          {[...Array(9)].map((_, i) => {
            const a = Math.PI + (i * Math.PI) / 8;
            return <path key={i} d={`M${30 + Math.cos(a) * 21} ${62 + Math.sin(a) * 21}L${30 + Math.cos(a) * 40} ${62 + Math.sin(a) * 40}`} {...s} />;
          })}
        </>
      );
    case "dots":
      return [...Array(24)].map((_, i) => <circle key={i} cx={6 + (i % 5) * 12 + (Math.floor(i / 5) % 2) * 6} cy={8 + Math.floor(i / 5) * 12} r="3.4" fill={accent} />);
    case "grid":
      return (
        <>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <path key={`h${i}`} d={`M0 ${6 + i * 11}H60`} {...s} strokeWidth={2} />
          ))}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <path key={`v${i}`} d={`M${6 + i * 11} 0V70`} {...s} strokeWidth={2} />
          ))}
        </>
      );
    case "peaks":
      return (
        <>
          <path d="M-4 66 16 30l10 14 12-24 26 46Z" fill={accent} />
          <path d="M34 26l4-6 5 8" stroke="#fbf7ef" strokeWidth="2.4" fill="none" />
        </>
      );
  }
}

/** A 16 oz can with a procedural label: pattern and accent come from the beer. */
export function Can({ beer, className = "h-40 w-24" }: { beer: Beer; className?: string }) {
  const id = `c-${beer.id}`;
  const color = beerColor(beer);
  // Size the type to fit the 50-unit label: condensed caps run ~0.46em wide, Archivo caps ~0.68em.
  const name = beer.name.toUpperCase();
  const styleLine = `${beer.style.split(" · ")[0].toUpperCase()} · ${beer.abv}%`;
  const nameSize = Math.min(10, 50 / (0.46 * name.length));
  const styleSize = Math.min(4.6, 50 / (0.68 * styleLine.length));
  return (
    <svg viewBox="0 0 60 112" aria-hidden="true" className={className}>
      <defs>
        <clipPath id={`${id}-art`}>
          <rect x="3" y="14" width="54" height="56" />
        </clipPath>
        <linearGradient id={`${id}-sh`} x1="0" x2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0.28" />
          <stop offset="0.18" stopColor="#fff" stopOpacity="0.16" />
          <stop offset="0.45" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.85" stopColor="#000" stopOpacity="0.12" />
          <stop offset="1" stopColor="#000" stopOpacity="0.32" />
        </linearGradient>
      </defs>
      {/* body */}
      <path d="M6 8h48l3 6v84l-3 6H6l-3-6V14Z" fill="#fbf7ef" />
      <g clipPath={`url(#${id}-art)`}>
        <rect x="3" y="14" width="54" height="56" fill="#16120e" />
        <g transform="translate(0 12)">{patternShapes(beer.label.pattern, beer.label.accent)}</g>
      </g>
      <rect x="3" y="70" width="54" height="5" fill={color} />
      <text x="30" y="86" textAnchor="middle" style={{ fontFamily: "var(--font-display)" }} fontWeight="800" fontSize={nameSize} fill="#16120e" letterSpacing="0.2">
        {name}
      </text>
      <text x="30" y="95" textAnchor="middle" style={{ fontFamily: "var(--font-archivo)" }} fontWeight="700" fontSize={styleSize} fill="#665a4b" letterSpacing="0.4">
        {styleLine}
      </text>
      {/* rims */}
      <path d="M6 8h48l3 6H3Z" fill="#b9b3a8" />
      <path d="M3 98h54l-3 6H6Z" fill="#b9b3a8" />
      <rect x="4" y="2" width="52" height="6" rx="2" fill="#d4cec3" />
      <path d="M6 8h48l3 6v84l-3 6H6l-3-6V14Z" fill={`url(#${id}-sh)`} />
    </svg>
  );
}

/** Keg level: how much is left, and whether it's about to kick. */
export function KegBar({ pct, kicking, dark = false }: { pct: number; kicking: boolean; dark?: boolean }) {
  return (
    <div className="flex items-center gap-2" title={`${pct}% left in the keg`}>
      <span className={`relative h-1.5 w-16 overflow-hidden rounded-full ${dark ? "bg-paper/15" : "bg-kraft"}`}>
        <span className={`absolute inset-y-0 left-0 rounded-full ${kicking ? "bg-brick" : dark ? "bg-straw" : "bg-hop"}`} style={{ width: `${Math.max(4, pct)}%` }} />
      </span>
      <span className={`text-xs font-semibold ${kicking ? (dark ? "text-brick-light" : "text-brick-deep") : dark ? "text-haze" : "text-dust"}`}>
        {kicking ? "Kicking soon" : `${pct}% left`}
      </span>
    </div>
  );
}
