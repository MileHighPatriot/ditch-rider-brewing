/**
 * The mark: the hand wheel of a canal headgate, the thing a ditch rider
 * turned to send water down the High Line Canal, over two lines of water.
 */
export function Mark({ className = "h-10 w-10", wheel = "currentColor", water = "var(--color-canal-light)" }: { className?: string; wheel?: string; water?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={className} fill="none">
      <circle cx="20" cy="15" r="11" stroke={wheel} strokeWidth="2.6" />
      <circle cx="20" cy="15" r="2.6" fill={wheel} />
      {[0, 60, 120].map((a) => (
        <path key={a} d="M20 4.5v21" stroke={wheel} strokeWidth="2" transform={`rotate(${a} 20 15)`} />
      ))}
      <path d="M17.2 26v4.4h5.6V26" stroke={wheel} strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M3 33.5c2.8 0 2.8-2 5.7-2s2.8 2 5.7 2 2.8-2 5.6-2 2.9 2 5.7 2 2.8-2 5.7-2 2.8 2 5.6 2" stroke={water} strokeWidth="2" strokeLinecap="round" />
      <path d="M7 38c2.2 0 2.2-1.6 4.5-1.6s2.2 1.6 4.4 1.6 2.3-1.6 4.5-1.6 2.3 1.6 4.5 1.6 2.2-1.6 4.4-1.6 2.3 1.6 4.5 1.6" stroke={water} strokeWidth="1.6" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <Mark className="h-10 w-10 text-straw" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.7rem] font-extrabold tracking-[0.02em] uppercase">Ditch Rider</span>
        <span className="mt-0.5 text-[0.6rem] font-bold tracking-[0.26em] uppercase opacity-75">Brewing & Kitchen</span>
      </span>
    </span>
  );
}
