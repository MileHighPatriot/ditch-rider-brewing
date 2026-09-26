# Ditch Rider Brewing & Kitchen (concept)

A portfolio concept site by [5280 Web Solutions](https://5280webs.com): a fictional brewpub in Greenwood Village, Colorado, three minutes from Orchard Station light rail. Beers, people, prices and phone numbers (555-01xx) are illustrative.

## Features
- **Right now** board: open/closed and happy hour (Denver time), a patio call from live Open-Meteo weather (heaters on, closed for wind, shade sails up), sunset, and what's on today
- **Live tap list** (`/beer`): 17 beers with style filters, an ABV slider, quick filters (new, under 5%, non-alc, gluten-reduced, kicking soon), keg-level bars, pour prices, and pairings; glasses are tinted to each beer's SRM color
- **Flight builder**: pick four tasters, auto-sorted into tasting order, with a full-screen "show the bartender" card
- **Kitchen** (`/kitchen`): HTML menu with dietary filters; every dish names its beer and why
- **To go** (`/to-go`): pickup pre-order for 4-packs, crowlers and merch, with real pickup time slots, a 21+ step and a demo checkout (Colorado doesn't allow shipping beer)
- **Events** (`/events`): weekly lineup, filterable calendar, .ics per event, RSVPs
- **Visit** (`/visit`): hours, five-day patio outlook, light rail/parking/bike, dog and kid policies
- **Private events** (`/private-events`): headcount → which spaces fit → estimate against the F&B minimum → inquiry
- **Mug Club** (`/mug-club`): "is it worth it?" calculator and waitlist
- Procedural can art: each beer's label pattern and accent are generated from data
- Amphitheater show-night banner (preview with `?show=1`) and a remembered 21+ gate on beer pages only (skip with `?age=1`)

## Develop
```bash
npm install
npm run dev
```

## Publish (GitHub Pages)
`npm run pages` builds a static export into `docs/`. GitHub Pages serves `docs/` on `main` at https://ditchrider.5280webs.com (`public/CNAME` sets the domain).

Business details live in `data/site.ts`; beers in `data/beers.ts`; menu, events, to-go and private-event data in `data/*.ts`.

Photos are public domain (CC0) from StockSnap; sources are in `photos-src/SOURCES.json`.
