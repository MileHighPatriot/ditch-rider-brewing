/** Weekly regulars and one-off events. Times are Denver local. */
export type EventKind = "Music" | "Trivia" | "Release" | "Run club" | "Family" | "Food" | "Community";

export const kinds: EventKind[] = ["Release", "Music", "Trivia", "Run club", "Food", "Family", "Community"];

export type Weekly = { id: string; day: number; start: string; end: string; title: string; kind: EventKind; blurb: string };

export const weeklies: Weekly[] = [
  { id: "trivia", day: 2, start: "19:00", end: "21:00", title: "Ditch Trivia", kind: "Trivia", blurb: "Teams of up to six. Winners drink free for the rest of the night (well, up to $50). Reserve a table if you're 6+." },
  { id: "pint-night", day: 3, start: "16:00", end: "22:00", title: "Mug Club Pint Night", kind: "Community", blurb: "Members get a free pour of whatever's newest. Everyone else gets a look at the mugs on the wall." },
  { id: "music", day: 5, start: "19:00", end: "22:00", title: "Friday Patio Music", kind: "Music", blurb: "Local bands and songwriters on the patio stage, inside by the tanks when it's cold. Never a cover." },
  { id: "run-club", day: 6, start: "08:00", end: "09:30", title: "Canal Run Club", kind: "Run club", blurb: "3 or 5 miles out and back on the High Line Canal trail. Coffee after, and a token for a pint when we open at 11." },
  { id: "brunch", day: 0, start: "10:00", end: "14:00", title: "Sunday Brunch & Lawn Games", kind: "Family", blurb: "Breakfast burritos, chilaquiles, and giant Jenga on the lawn. Kids and dogs very welcome." },
];

export type BrewEvent = {
  id: string;
  title: string;
  kind: EventKind;
  start: string; // "2026-10-03T12:00"
  end?: string;
  blurb: string;
  featured?: boolean;
  rsvp?: boolean;
  price?: string;
};

export const events: BrewEvent[] = [
  {
    id: "oktoberfest",
    title: "Oktoberfest on the Patio",
    kind: "Release",
    start: "2026-09-26T12:00",
    end: "2026-09-26T22:00",
    blurb: "Harvest Gate Märzen in one-liter steins, the bratwurst plate, a polka band at 3, and stein-holding at 6. Lederhosen optional but encouraged.",
    featured: true,
  },
  {
    id: "wet-ditch",
    title: "Fresh Hop Release: Wet Ditch",
    kind: "Release",
    start: "2026-10-02T16:00",
    end: "2026-10-02T22:00",
    blurb: "Our once-a-year fresh hop pale ale, brewed with Colorado Cascade picked the day before. First 50 pours come with a pint glass.",
  },
  {
    id: "gabf-week",
    title: "GABF Week Tap Takeover",
    kind: "Release",
    start: "2026-10-05T11:00",
    end: "2026-10-11T21:00",
    blurb: "Can't get festival tickets? We're pouring six collabs with Colorado breweries all week, with a brewers' Q&A Thursday at 6.",
    featured: true,
  },
  {
    id: "irrigation-night",
    title: "Barrel Release: Irrigation Night",
    kind: "Release",
    start: "2026-10-10T11:00",
    blurb: "A year in bourbon barrels. On draft in 5 and 10 oz pours, and 500 bottles to go (limit two). Mug Club gets first dibs from 11 to noon.",
    rsvp: true,
  },
  {
    id: "canal-cleanup",
    title: "Canal Cleanup Ride",
    kind: "Community",
    start: "2026-10-17T09:00",
    end: "2026-10-17T12:00",
    blurb: "Bikes, grabbers, and trash bags on the High Line Canal trail. We finish at the patio with lunch on us.",
    rsvp: true,
  },
  {
    id: "costume-trivia",
    title: "Costume Trivia Night",
    kind: "Trivia",
    start: "2026-10-27T19:00",
    end: "2026-10-27T21:30",
    blurb: "Regular trivia, irregular outfits. Best team costume wins a $100 tab.",
  },
  {
    id: "pumpkins",
    title: "Pumpkin Carving on the Patio",
    kind: "Family",
    start: "2026-10-31T12:00",
    end: "2026-10-31T16:00",
    blurb: "Free pumpkins for kids (while they last), carving tools, and hot cider. Dogs in costume get a treat.",
  },
  {
    id: "stout-week",
    title: "Stout Week",
    kind: "Release",
    start: "2026-11-02T11:00",
    end: "2026-11-07T22:00",
    blurb: "Six stouts on at once, including two Irrigation Night variants. Stout floats all week.",
  },
  {
    id: "beer-dinner",
    title: "Brewer's Dinner: Five Courses, Five Lagers",
    kind: "Food",
    start: "2026-11-12T18:30",
    end: "2026-11-12T21:30",
    blurb: "Chef Tomás and head brewer Maya pair five courses with five lagers, including one we've never poured before. 40 seats.",
    rsvp: true,
    price: "$85",
    featured: true,
  },
  {
    id: "anniversary",
    title: "Five-Year Anniversary Party",
    kind: "Music",
    start: "2026-11-21T12:00",
    end: "2026-11-21T23:00",
    blurb: "Five years since we opened the taps. Anniversary cans, three bands, a food truck on the lawn, and a cake the size of a keg.",
    featured: true,
  },
  {
    id: "ugly-sweater",
    title: "Ugly Sweater Run",
    kind: "Run club",
    start: "2026-12-05T08:00",
    end: "2026-12-05T09:30",
    blurb: "The usual canal loop in your worst holiday knit. Hot cocoa after, and prizes for the ugliest.",
  },
];

/**
 * Amphitheater show nights, when the patio fills before the show. Dates only;
 * check the venue's own calendar for who's playing. Preview with ?show=1.
 */
export const showNights = ["2026-09-18", "2026-09-19", "2026-09-25", "2026-09-26", "2026-09-27"];
