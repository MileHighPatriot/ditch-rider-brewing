import type { Metadata } from "next";
import Icon from "@/components/Icon";
import PageHead from "@/components/PageHead";
import Photo from "@/components/Photo";
import SectionHead from "@/components/SectionHead";
import Button from "@/components/ui/Button";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Why a Greenwood Village brewpub is named for the men who ran the High Line Canal, who brews the beer, who runs the kitchen, and how to work here.",
};

const story = [
  {
    year: "1883",
    title: "The High Line Canal",
    body: "Seventy-one miles of ditch carry South Platte water east across the plains. Ditch riders patrol it on horseback, opening and closing headgates so each farm gets its share, first in time, first in right.",
  },
  {
    year: "2019",
    title: "Two homebrewers and a lease",
    body: "Maya Lindgren, a lab chemist at a Tech Center biotech, and Tomás Reyes, a line cook turned chef, sign a lease on an empty restaurant a block from Orchard Station.",
  },
  {
    year: "2021",
    title: "Taps open",
    body: "A seven-barrel brewhouse, sixteen taps, and a kitchen that was always meant to be half the business. The first beer poured is Ditch Rider Lager.",
  },
  {
    year: "Today",
    title: "Still opening the gates",
    body: "Forty employees, a canning line, a patio that runs April into November, and a Mug Club with a waitlist. Same helles on tap 1.",
  },
];

const people = [
  { name: "Maya Lindgren", role: "Co-founder & head brewer", body: "Brews the lagers she couldn't find anywhere else. Will talk about water chemistry if you let her.", tone: "bg-straw text-stout" },
  { name: "Tomás Reyes", role: "Co-founder & chef", body: "Pueblo native. Roasts his own chiles every September and puts them in everything.", tone: "bg-brick text-paper" },
  { name: "Jess Okonkwo", role: "Taproom manager", body: "Runs the floor, the trivia mic, and the patio call. If the umbrellas are down, it was Jess.", tone: "bg-canal text-paper" },
  { name: "Dev Patel", role: "Events lead", body: "Plans the Headgate Room bookings. Replies to every inquiry within a business day.", tone: "bg-hop text-paper" },
];

const jobs = [
  { title: "Line cook", type: "Full-time · $20–24/hr + tips", body: "Nights and weekends. Burger, fryer, and sauté stations." },
  { title: "Beertender", type: "Part-time · $16/hr + tips", body: "You'll learn every beer and pour a perfect nitro. Must be 21+." },
  { title: "Cellar assistant", type: "Full-time · $21/hr", body: "Kegs, cans, and cleaning. Early mornings. Forklift a plus." },
];

export default function AboutPage() {
  return (
    <>
      <PageHead
        eyebrow={`Our story · since ${site.founded}`}
        title={
          <>
            Named for the
            <br />
            <span className="text-straw">canal riders.</span>
          </>
        }
        lede="A ditch rider kept water moving on the High Line Canal, the old irrigation ditch that still winds through Greenwood Village. We keep the beer moving. Close enough."
      />

      <section className="grain section-y">
        <div className="wrap grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-8 lg:self-start">
            <div className="reveal aspect-[4/5] max-w-md overflow-hidden rounded-lg">
              <Photo name="field" alt="Golden grass in a field beneath a line of evergreen trees" sizes="(min-width: 1024px) 32vw, 90vw" className="h-full w-full object-cover" />
            </div>
          </div>
          <ol className="relative grid gap-10 border-l-2 border-canal/30 pl-8 sm:pl-10">
            {story.map((s) => (
              <li key={s.year} className="reveal relative">
                <span aria-hidden className="absolute top-1 -left-[2.65rem] grid h-6 w-6 place-items-center rounded-full bg-foam ring-2 ring-canal sm:-left-[3.15rem]">
                  <span className="h-2 w-2 rounded-full bg-canal" />
                </span>
                <p className="eyebrow text-brick-deep">{s.year}</p>
                <h2 className="mt-2 text-5xl">{s.title}</h2>
                <p className="mt-3 max-w-xl text-lg leading-relaxed text-dust">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-paper section-y">
        <div className="wrap">
          <SectionHead eyebrow="The crew" title="The people behind the bar." />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {people.map((p) => (
              <li key={p.name} className="reveal rounded-lg bg-foam p-6 ring-1 ring-line">
                <span aria-hidden className={`grid h-16 w-16 place-items-center rounded-full font-display text-2xl font-extrabold ${p.tone}`}>
                  {p.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")}
                </span>
                <h3 className="mt-4 text-3xl">{p.name}</h3>
                <p className="text-sm font-bold text-brick-deep">{p.role}</p>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-dust">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="jobs" className="bg-stout section-y scroll-mt-4 text-paper">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <SectionHead
              light
              eyebrow="Work here"
              title="Now hiring."
              lede="Health insurance after 60 days for anyone over 25 hours, a shift beer, and 50% off food. Tips are pooled with the kitchen."
            />
            <div className="reveal mt-8">
              <Button href="mailto:jobs@ditchrider.example" variant="straw">
                Email your resume
              </Button>
            </div>
          </div>
          <ul className="grid gap-3">
            {jobs.map((j) => (
              <li key={j.title} className="reveal flex items-start gap-4 rounded-lg bg-stout-2 p-5 ring-1 ring-paper/10">
                <Icon name="briefcase" className="mt-1 h-5 w-5 shrink-0 text-straw" />
                <div>
                  <h3 className="text-3xl">{j.title}</h3>
                  <p className="text-sm font-semibold text-straw">{j.type}</p>
                  <p className="mt-1 text-haze">{j.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
