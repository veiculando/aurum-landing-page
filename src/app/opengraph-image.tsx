import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const logoBuffer = readFileSync(join(process.cwd(), "public", "image-7.png"));
  const logoBase64 = `data:image/png;base64,${logoBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #4a0005 0%, #8a0009 55%, #4a0005 100%)",
          padding: "60px",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoBase64} width={320} height={222} alt="" />
        <div
          style={{
            marginTop: 36,
            fontSize: 40,
            fontWeight: 700,
            color: "#F9F7F2",
            letterSpacing: -1,
          }}
        >
          Conectando marcas ao seu público
        </div>
        <div
          style={{
            marginTop: 18,
            fontSize: 24,
            color: "#d9b442",
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          Mídia Exterior e DOOH desde 1995
        </div>
      </div>
    ),
    { ...size }
  );
}
