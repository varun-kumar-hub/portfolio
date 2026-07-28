import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #690915 0%, #3a040a 100%)",
          border: "1.5px solid #ef4444",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ffffff",
          fontSize: "13px",
          fontWeight: 900,
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
          letterSpacing: "-0.5px",
        }}
      >
        VK
      </div>
    ),
    {
      ...size,
    }
  );
}
