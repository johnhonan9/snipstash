import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "SnipStash — Save & Share Code Snippets";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#f4f1ea",
          padding: "72px",
          fontFamily: "serif",
        }}
      >
        {/* logo mark */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              backgroundColor: "#0d0d0f",
              borderRadius: "18px",
              padding: "22px",
            }}
          >
            <div style={{ width: "90px", height: "18px", borderRadius: "4px", backgroundColor: "#c8ff00" }} />
            <div style={{ width: "70px", height: "18px", borderRadius: "4px", backgroundColor: "#f4f1ea", marginLeft: "20px" }} />
            <div style={{ width: "90px", height: "18px", borderRadius: "4px", backgroundColor: "#ff5722" }} />
          </div>
          <div style={{ fontSize: "44px", fontWeight: 900, color: "#0d0d0f" }}>SnipStash</div>
        </div>

        {/* headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: "78px", fontWeight: 900, color: "#0d0d0f", lineHeight: 1.05 }}>
            Stash the code you
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ fontSize: "78px", fontWeight: 900, color: "#0d0d0f", lineHeight: 1.05 }}>keep </div>
            <div
              style={{
                fontSize: "78px",
                fontWeight: 900,
                color: "#0d0d0f",
                backgroundColor: "#c8ff00",
                padding: "0 16px",
                marginLeft: "16px",
              }}
            >
              re-googling.
            </div>
          </div>
        </div>

        {/* footer */}
        <div style={{ display: "flex", fontSize: "28px", color: "#0d0d0faa" }}>
          Save snippets privately · publish publicly · get discovered
        </div>
      </div>
    ),
    { ...size }
  );
}
