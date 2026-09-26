import { ImageResponse } from "next/og";
import { beers, beerColor } from "@/data/beers";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Big Shoulders Display 800 from Google Fonts (Satori needs TTF, fetched at build time). */
async function display() {
  const css = await (await fetch("https://fonts.googleapis.com/css2?family=Big+Shoulders:wght@800")).text();
  const url = css.match(/url\((https:[^)]+\.ttf)\)/)![1];
  return (await fetch(url)).arrayBuffer();
}

export default async function OpenGraphImage() {
  const glasses = beers.filter((b) => !b.tags.includes("na")).slice(0, 12);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "radial-gradient(ellipse at 80% 20%, #3a2a16 0%, #1f1811 45%, #16120e 75%)",
          color: "#fbf7ef",
          padding: 64,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="60" height="60" viewBox="0 0 40 40">
            <circle cx="20" cy="15" r="11" stroke="#e8b64a" strokeWidth="2.6" fill="none" />
            <circle cx="20" cy="15" r="2.6" fill="#e8b64a" />
            <path d="M20 4.5v21" stroke="#e8b64a" strokeWidth="2" />
            <path d="M20 4.5v21" stroke="#e8b64a" strokeWidth="2" transform="rotate(60 20 15)" />
            <path d="M20 4.5v21" stroke="#e8b64a" strokeWidth="2" transform="rotate(120 20 15)" />
            <path d="M3 33.5c2.8 0 2.8-2 5.7-2s2.8 2 5.7 2 2.8-2 5.6-2 2.9 2 5.7 2 2.8-2 5.7-2 2.8 2 5.6 2" stroke="#a9c3cb" strokeWidth="2" fill="none" />
          </svg>
          <span style={{ fontFamily: "Big Shoulders", fontSize: 44, letterSpacing: 1 }}>DITCH RIDER</span>
          <span style={{ fontSize: 20, color: "#b9ac98", letterSpacing: 5, marginLeft: 6 }}>BREWING & KITCHEN</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontFamily: "Big Shoulders", lineHeight: 0.88 }}>
          <div style={{ display: "flex", fontSize: 128 }}>BREWED HERE.</div>
          <div style={{ display: "flex", fontSize: 128, color: "#e8b64a" }}>POURED COLD.</div>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 26, color: "#b9ac98" }}>{`Greenwood Village, CO · ${beers.length} on tap · 3 min from Orchard Station`}</div>
          <div style={{ display: "flex", gap: 8 }}>
            {glasses.slice(0, 8).map((b) => (
              <div key={b.id} style={{ display: "flex", flexDirection: "column", width: 26, height: 52, borderRadius: "0 0 5px 5px", overflow: "hidden" }}>
                <div style={{ height: 9, background: "#f7efdc" }} />
                <div style={{ flex: 1, background: beerColor(b) }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Big Shoulders", data: await display(), weight: 800, style: "normal" }] },
  );
}
