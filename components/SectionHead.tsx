export default function SectionHead({
  eyebrow,
  title,
  lede,
  light = false,
  className = "",
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={`reveal max-w-3xl ${className}`}>
      <p className={`eyebrow ${light ? "text-straw" : "text-brick-deep"}`}>{eyebrow}</p>
      <h2 className="h-section mt-3">{title}</h2>
      {lede ? <p className={`mt-5 text-lg leading-relaxed ${light ? "text-haze" : "text-dust"}`}>{lede}</p> : null}
    </div>
  );
}
