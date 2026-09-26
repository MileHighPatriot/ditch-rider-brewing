import { Mark } from "@/components/Logo";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="glow relative overflow-hidden border-b border-paper/10 bg-stout text-paper" style={{ "--glow-x": "50%", "--glow-y": "30%" } as React.CSSProperties}>
      <div className="wrap flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
        <Mark className="h-16 w-16 text-straw" />
        <p className="eyebrow mt-8 text-straw">404 · Page not found</p>
        <h1 className="display mt-4 max-w-4xl">
          This keg
          <br />
          <span className="text-straw">just kicked.</span>
        </h1>
        <p className="mt-6 max-w-lg text-lg text-haze">The page you were after isn&rsquo;t pouring. There are sixteen others that are.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button href="/beer/" variant="straw">
            See what&rsquo;s on tap
          </Button>
          <Button href="/" variant="outline-light">
            Back home
          </Button>
        </div>
      </div>
    </section>
  );
}
