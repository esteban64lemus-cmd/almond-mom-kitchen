import { ImageResponse } from "next/og";
import { ENTRY, PREMIUM } from "./offer";

export const alt = "Desk by Seb — admin desk for San Diego local businesses";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#fff8f1",
        color: "#3d2914",
        padding: "72px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            width: 18,
            height: 18,
            borderRadius: 999,
            background: "#e86a3a",
          }}
        />
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 3 }}>
          DESK BY SEB
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        <div
          style={{
            display: "flex",
            fontSize: 68,
            lineHeight: 1.05,
            letterSpacing: -1,
            maxWidth: 980,
          }}
        >
          Admin desk for San Diego local businesses
        </div>
        <div style={{ display: "flex", gap: 28, fontSize: 32 }}>
          <div style={{ display: "flex" }}>
            Entry {ENTRY.price}
            /mo
          </div>
          <div style={{ display: "flex", color: "#e86a3a" }}>
            Premium {PREMIUM.price}
            /mo
          </div>
        </div>
      </div>
    </div>,
    { ...size },
  );
}
