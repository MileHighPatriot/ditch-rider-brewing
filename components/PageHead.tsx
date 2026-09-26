import { Mark } from "@/components/Logo";

/** Dark page header with taproom glow and a canal line along the bottom. */
export default function PageHead({
  eyebrow,
  title,
  lede,
  children,
  glow = "80% 10%",
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  children?: React.ReactNode;
  glow?: string;
}) {
  const [x, y] = glow.split(" ");
  return (
    <section className="glow relative overflow-hidden bg-stout text-paper" style={{ "--glow-x": x, "--glow-y": y } as React.CSSProperties}>
      <Mark className="pointer-events-none absolute -right-20 -bottom-16 h-[28rem] w-[28rem] text-paper opacity-[0.04]" wheel="currentColor" water="currentColor" />
      <div className="wrap relative pt-14 pb-16 sm:pt-20 sm:pb-20">
        <p className="eyebrow animate-rise text-straw">{eyebrow}</p>
        <h1 className="display mt-4 max-w-5xl animate-rise [animation-delay:60ms]">{title}</h1>
        {lede ? (
          <p className="mt-6 max-w-2xl animate-rise text-lg leading-relaxed text-haze [animation-delay:120ms] sm:text-xl">{lede}</p>
        ) : null}
        {children ? <div className="mt-8 animate-rise [animation-delay:180ms]">{children}</div> : null}
      </div>
      <div className="canal-rule canal-rule-light absolute inset-x-0 bottom-0" aria-hidden />
    </section>
  );
}
