import type { Metadata } from "next";
import Icon from "@/components/Icon";
import PageHead from "@/components/PageHead";
import Photo from "@/components/Photo";
import SectionHead from "@/components/SectionHead";
import MugClub from "@/components/tools/MugClub";

export const metadata: Metadata = {
  title: "Mug Club",
  description: "Your own 20 oz mug on the wall, $1 off every pour, first dibs on releases, and a member brew day. $150 a year, 150 members.",
};

const perks = [
  { icon: "beer", title: "A 20 oz mug for a pint price", body: "Handmade by a potter in Englewood, numbered, and hung on our wall. Four free ounces every pour." },
  { icon: "star", title: "$1 off, every time", body: "Every pour, every day, including happy hour." },
  { icon: "ticket", title: "First dibs on releases", body: "Bottle releases open to members an hour early, and a free pour of every new beer on Wednesdays." },
  { icon: "wheat", title: "Member brew day", body: "Once a year the club brews a beer with Maya. Members vote on the style and name it." },
  { icon: "gift", title: "Birthday pint", body: "On us, the whole month of your birthday." },
  { icon: "users", title: "Members-only party", body: "Every December, with a keg of something we won't pour for anyone else." },
];

export default function MugClubPage() {
  return (
    <>
      <PageHead
        eyebrow="Mug Club · $150 a year"
        title={
          <>
            Your mug.
            <br />
            <span className="text-straw">Our wall.</span>
          </>
        }
        lede="150 hand-thrown mugs hang over the bar, each one with a number and a regular. Here's what membership gets you, and a calculator to see if it's worth it."
      />

      <section className="grain section-y">
        <div className="wrap">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {perks.map((p) => (
              <li key={p.title} className="reveal rounded-lg bg-paper p-6 ring-1 ring-line">
                <Icon name={p.icon} className="h-7 w-7 text-brick-deep" />
                <h2 className="mt-4 text-3xl">{p.title}</h2>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-dust">{p.body}</p>
              </li>
            ))}
          </ul>
          <div className="mt-14">
            <MugClub />
          </div>
        </div>
      </section>

      <section className="bg-stout section-y text-paper">
        <div className="wrap grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="reveal aspect-[3/2] overflow-hidden rounded-lg">
            <Photo name="mug-outdoors" alt="A frosty mug of lager outdoors" sizes="(min-width: 1024px) 45vw, 100vw" className="h-full w-full object-cover" />
          </div>
          <SectionHead
            light
            eyebrow="The fine print"
            title="Renews every January."
            lede="Membership runs January through December. Miss a renewal and your mug comes off the wall (you keep it). Members must be 21+, and the mug stays at the bar except on the last day of the year."
          />
        </div>
      </section>
    </>
  );
}
