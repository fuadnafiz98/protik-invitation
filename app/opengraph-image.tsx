import { readFile } from "node:fs/promises"
import { ImageResponse } from "next/og"

export const runtime = "nodejs"

export const alt = "Mohian Weds Lamia invitation cover image"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

const imagePath = new URL("./images/og.jpg", import.meta.url)

async function getImageDataUrl() {
  const imageBuffer = await readFile(imagePath)
  const base64 = imageBuffer.toString("base64")

  return `data:image/jpeg;base64,${base64}`
}

export default async function OpenGraphImage() {
  const sourceImage = await getImageDataUrl()

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          background:
            "linear-gradient(135deg, #fffaf6 0%, #f9efe8 45%, #f5e4da 100%)",
          fontFamily: "Georgia, serif",
        }}
      >
        <img
          src={sourceImage}
          alt=""
          style={{
            position: "absolute",
            inset: "-8%",
            width: "116%",
            height: "116%",
            objectFit: "cover",
            filter: "blur(28px)",
            opacity: 0.38,
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at top left, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0) 34%), radial-gradient(circle at bottom right, rgba(232,197,171,0.28) 0%, rgba(232,197,171,0) 30%)",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 48,
            width: "100%",
            height: "100%",
            padding: "46px 58px",
          }}
        >
          <div
            style={{
              position: "relative",
              display: "flex",
              width: 410,
              height: 538,
              borderRadius: 34,
              overflow: "hidden",
              border: "10px solid rgba(255,255,255,0.92)",
              boxShadow:
                "0 22px 60px rgba(124, 86, 67, 0.18), inset 0 0 0 1px rgba(193, 155, 126, 0.22)",
              background: "#fffdf9",
            }}
          >
            <img
              src={sourceImage}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: 620,
              height: "100%",
              padding: "32px 12px 32px 0",
              color: "#5b4035",
            }}
          >
            <div
              style={{
                display: "flex",
                marginBottom: 18,
                fontSize: 28,
                letterSpacing: 8,
                textTransform: "uppercase",
                color: "#b88766",
              }}
            >
              Wedding Invitation
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                lineHeight: 0.95,
                color: "#6c4a3d",
                textShadow: "0 2px 12px rgba(255,255,255,0.35)",
              }}
            >
              <div style={{ display: "flex", fontSize: 74 }}>
                Mohian Islam Protik
              </div>
              <div
                style={{
                  display: "flex",
                  margin: "12px 0 10px",
                  fontSize: 50,
                  color: "#d0ab74",
                }}
              >
                &
              </div>
              <div style={{ display: "flex", fontSize: 74 }}>Lamia Zaman</div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                margin: "28px 0 24px",
              }}
            >
              <div
                style={{
                  width: 96,
                  height: 1,
                  background:
                    "linear-gradient(90deg, rgba(208,171,116,0), rgba(208,171,116,0.9))",
                }}
              />
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  background: "#d0ab74",
                }}
              />
              <div
                style={{
                  width: 96,
                  height: 1,
                  background:
                    "linear-gradient(90deg, rgba(208,171,116,0.9), rgba(208,171,116,0))",
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                maxWidth: 540,
                fontSize: 30,
                lineHeight: 1.4,
                color: "#7a6258",
              }}
            >
              Marriage invitation with the full celebration schedule, venue
              details, and maps.
            </div>
          </div>
        </div>
      </div>
    ),
    size
  )
}
