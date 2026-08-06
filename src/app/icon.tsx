import { ImageResponse } from "next/og";

/**
 * Browser-tab icon. Replaces the Next.js default that ships with create-next-app —
 * leaving that in place is the single most obvious "this is a template" tell.
 *
 * A monogram stands in until the owner supplies the real logo; swap this file for a
 * static icon.png at that point.
 */
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #2b5fa8 0%, #1d3566 100%)",
          borderRadius: 14,
          color: "#ffffff",
          fontSize: 34,
          fontWeight: 800,
          fontFamily: "sans-serif",
          letterSpacing: -1,
        }}
      >
        AP
      </div>
    ),
    size,
  );
}
