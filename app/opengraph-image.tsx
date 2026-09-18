import { ImageResponse } from "next/og";

export const alt = "RawchySMP - The Hunter's World. Build. Hunt. Survive.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "linear-gradient(135deg, #05070a, #0c2833)", padding: "60px 72px", color: "#f8fafc", border: "2px solid #164151" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18, color: "#00e5ff", fontSize: 24, letterSpacing: 7 }}>
        <svg width="54" height="54" viewBox="0 0 24 24" fill="#00e5ff"><path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z" /></svg>
        THE HUNTER&apos;S WORLD
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", fontSize: 114, fontWeight: 700, letterSpacing: -6 }}>
          RAWCHY<span style={{ color: "#00e5ff" }}>SMP</span>
        </div>
        <div style={{ marginTop: 18, fontSize: 34, color: "#cbd5e1", letterSpacing: 5 }}>BUILD. HUNT. SURVIVE.</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 24, borderTop: "2px solid #164151", fontSize: 25 }}>
        <span style={{ color: "#00e5ff" }}>rawchysmp.com</span>
        <span style={{ color: "#94a3b8" }}>Explore the leaderboards</span>
      </div>
    </div>,
    size,
  );
}
