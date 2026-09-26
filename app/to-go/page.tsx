import type { Metadata } from "next";
import AgeGate from "@/components/AgeGate";
import Icon from "@/components/Icon";
import PageHead from "@/components/PageHead";
import ToGoOrder from "@/components/tools/ToGoOrder";

export const metadata: Metadata = {
  title: "Order To Go",
  description: "Pre-order 4-packs, crowlers, merch, and gift cards for pickup in Greenwood Village. Ready in 20 minutes, ID checked at pickup.",
};

const steps = [
  { icon: "bag", title: "Order ahead", body: "Pick your cans and crowlers and a pickup time, 20 minutes out or later." },
  { icon: "phone", title: "Get a text", body: "We'll text you when it's ready. Crowlers get filled when you walk in." },
  { icon: "shield", title: "Bring an ID", body: "Whoever picks up has to be 21+. We check every single time." },
];

export default function ToGoPage() {
  return (
    <>
      <AgeGate />
      <PageHead
        eyebrow="To go · pickup only"
        title={
          <>
            Beer for
            <br />
            <span className="text-straw">the fridge.</span>
          </>
        }
        lede="16 oz 4-packs from the canning line, 32 oz crowlers filled to order, and merch for the people who have everything."
      >
        <ol className="grid max-w-3xl gap-3 sm:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="flex gap-3 rounded-lg bg-stout-2 p-4 ring-1 ring-paper/10">
              <span className="font-display text-3xl font-extrabold text-straw">{i + 1}</span>
              <span>
                <span className="flex items-center gap-1.5 font-bold">
                  <Icon name={s.icon} className="h-4 w-4 text-straw" /> {s.title}
                </span>
                <span className="mt-0.5 block text-sm text-haze">{s.body}</span>
              </span>
            </li>
          ))}
        </ol>
      </PageHead>

      <section className="grain py-12 lg:py-16">
        <div className="wrap">
          <ToGoOrder />
        </div>
      </section>
    </>
  );
}
