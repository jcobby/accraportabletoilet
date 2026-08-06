import { ImageResponse } from "next/og";

import { site } from "@/lib/site";

/**
 * Social preview card.
 *
 * This is what appears when the link is pasted into WhatsApp — which, for a Ghanaian
 * events business, is the main way the site will actually travel. Without it a shared
 * link renders as a bare grey box.
 *
 * It also backs the `image` field in the LocalBusiness JSON-LD, which previously
 * pointed at this route before it existed.
 */
export const alt = `${site.name} — portable toilet rental, sale and manufacture in Ghana`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #16203a 0%, #1d3566 55%, #2b5fa8 100%)",
          padding: 72,
          fontFamily: "sans-serif",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 22, letterSpacing: 8, color: "#8fb4e8" }}>
            ACCRA
          </div>
          <div style={{ display: "flex", fontSize: 52, fontWeight: 800, marginTop: 4 }}>
            <span>Portable</span>
            <span style={{ color: "#63c9e0" }}>Toilets</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 68, fontWeight: 800, lineHeight: 1.1 }}>
            Clean, dignified toilets
          </div>
          <div style={{ display: "flex", fontSize: 68, fontWeight: 800, lineHeight: 1.1, color: "#63c9e0" }}>
            for every event in Ghana
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "#b9cbe8", marginTop: 24 }}>
            Manufacturer, sale &amp; rental — delivering nationwide from Accra
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.18)",
            paddingTop: 28,
            fontSize: 30,
          }}
        >
          <span style={{ fontWeight: 700 }}>{site.phone.display}</span>
          <span style={{ color: "#b9cbe8" }}>accraportabletoilet.com</span>
        </div>
      </div>
    ),
    size,
  );
}
