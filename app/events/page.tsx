import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import Photo from "@/components/Photo";
import SectionHead from "@/components/SectionHead";
import EventsBoard from "@/components/tools/EventsBoard";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Trivia Tuesdays, Friday patio music, Saturday run club, beer releases, a GABF week tap takeover, and brewer's dinners at Ditch Rider in Greenwood Village.",
};

export default function EventsPage() {
  return (
    <>
      <PageHead
        eyebrow="Events · never a cover"
        title={
          <>
            Something on
            <br />
            <span className="text-straw">most nights.</span>
          </>
        }
        lede="Trivia on Tuesdays, bands on Fridays, a run club that ends with a pint, and a release almost every week. Add anything to your calendar in one tap."
      />

      <section className="grain py-12 lg:py-16">
        <div className="wrap">
          <EventsBoard />
        </div>
      </section>

      <section className="bg-stout section-y text-paper">
        <div className="wrap grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div className="reveal aspect-[3/2] overflow-hidden rounded-lg">
            <Photo name="stage" alt="A small stage with a guitar and microphone under warm lights" sizes="(min-width: 1024px) 45vw, 100vw" className="h-full w-full object-cover" />
          </div>
          <div>
            <SectionHead
              light
              eyebrow="Play here"
              title="Bands, songwriters, and trivia hosts."
              lede="We book local acts for Friday nights on the patio stage, and inside by the tanks when it's cold. Send a link and a couple of dates."
            />
            <div className="reveal mt-8 flex flex-wrap gap-3">
              <Button href="mailto:events@ditchrider.example" variant="straw">
                Pitch a show
              </Button>
              <Button href="/private-events/" variant="outline-light">
                Host your own event
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
