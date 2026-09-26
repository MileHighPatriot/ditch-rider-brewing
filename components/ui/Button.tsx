import Link from "next/link";
import Icon from "@/components/Icon";

type Variant = "brick" | "straw" | "stout" | "outline" | "outline-light" | "ghost";

const styles: Record<Variant, string> = {
  brick: "bg-brick text-paper hover:bg-brick-deep shadow-[0_12px_30px_-14px_rgb(184_57_31/0.9)]",
  straw: "bg-straw text-stout hover:bg-straw-soft",
  stout: "bg-stout text-paper hover:bg-stout-3",
  outline: "ring-2 ring-inset ring-ink/80 text-ink hover:bg-ink hover:text-paper",
  "outline-light": "ring-2 ring-inset ring-paper/40 text-paper hover:ring-paper hover:bg-paper/5",
  ghost: "text-brick-deep hover:text-ink underline-offset-4 hover:underline",
};

export default function Button({
  href,
  children,
  variant = "brick",
  arrow = true,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
}) {
  const cls = `group inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-6 text-[0.95rem] font-bold tracking-wide uppercase transition-colors ${styles[variant]} ${className}`;
  const inner = (
    <>
      {children}
      {arrow ? <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /> : null}
    </>
  );
  if (href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:")) {
    return (
      <a href={href} className={cls} {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
