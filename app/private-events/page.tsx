import type { Metadata } from "next";
import Icon from "@/components/Icon";
import PageHead from "@/components/PageHead";
import SectionHead from "@/components/SectionHead";
import EventEstimator from "@/components/tools/EventEstimator";

export const metadata: Metadata = {
  title: "Private Events",
  description:
    "Book the Headgate Room, the brewhouse mezzanine, the patio, or the whole brewery for team happy hours, parties, and rehearsal dinners in the Denver Tech Center. Get an estimate in 30 seconds.",
};

const extras = [
  { icon: "beer", title: "Custom label", body: "Your logo on a batch of cans for launch parties and client gifts. Six weeks' notice." },
  { icon: "wheat", title: "Brewer-led tour", body: "Thirty minutes in the brewhouse with a taster at every stop. $12 a person." },
  { icon: "briefcase", title: "Built for offsites", body: "Screen, HDMI, and Wi-Fi in the Headgate Room. A 3-minute walk from Orchard Station." },
  { icon: "users", title: "One point of contact", body: "An event captain plans with you and runs the night, so you can actually enjoy it." },
];

export default function PrivateEventsPage() {
  return (
    <>
      <PageHead
        eyebrow="Private events · 24 to 250 guests"
        title={
          <>
            Your team.
            <br />
            <span className="text-straw">Our taproom.</span>
          </>
        }
        lede="Half of the Tech Center's happy hours end up here anyway. Book a room, the patio, or the whole place, and see a real estimate before you ever send an email."
      />

      <section className="grain py-12 lg:py-16">
        <div className="wrap">
          <EventEstimator />
          <p className="mt-6 max-w-3xl text-sm text-dust">
            Estimates are illustrative. Food-and-beverage minimums don&rsquo;t include service or tax. Room fees are waived when you meet the minimum.
            Inquiries run through Tripleseat (demo).
          </p>
        </div>
      </section>

      <section className="bg-stout section-y text-paper">
        <div className="wrap">
          <SectionHead light eyebrow="Add-ons" title="The details that make it yours." />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {extras.map((x) => (
              <li key={x.title} className="reveal rounded-lg bg-stout-2 p-6 ring-1 ring-paper/10">
                <span className="grid h-11 w-11 place-items-center rounded-md bg-straw text-stout">
                  <Icon name={x.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-3xl">{x.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-haze">{x.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
