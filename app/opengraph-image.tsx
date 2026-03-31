import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "Mohian & Lamia – Wedding Invitation"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

// Exact colours from CardFloralArt in invitation-page.tsx
const p   = "#b87878"   // dusty rose petals
const pd  = "#8a5555"   // deeper rose
const pl  = "#d4a0a0"   // lighter rose highlights
const s   = "#7a5050"   // dark rose stems
const lav = "#9070a0"   // lavender scattered petals

function FloralSVG() {
  return (
    <svg
      viewBox="0 0 200 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="420"
      height="546"
    >
      {/* LARGE STAR FLOWER top-right */}
      <g transform="translate(158,52)">
        <path d="M0,-26 C3,-18 4,-10 0,-4 C-4,-10 -3,-18 0,-26Z" fill={p} opacity="0.95"/>
        <path d="M0,-26 C5,-20 6,-12 0,-4 C-6,-12 -5,-20 0,-26Z" fill={pd} opacity="0.35"/>
        <path d="M18,-19 C12,-13 7,-6 3,-2 C3,-9 7,-16 18,-19Z" fill={p} opacity="0.92"/>
        <path d="M18,-19 C14,-11 8,-5 3,-2 C7,-7 12,-14 18,-19Z" fill={pd} opacity="0.3"/>
        <path d="M24,4 C16,4 9,3 4,0 C7,-5 14,-5 24,4Z" fill={p} opacity="0.92"/>
        <path d="M24,4 C16,6 9,5 4,0 C9,-3 16,-2 24,4Z" fill={pd} opacity="0.3"/>
        <path d="M16,22 C10,15 6,8 3,3 C8,3 13,8 16,22Z" fill={p} opacity="0.92"/>
        <path d="M-2,26 C-3,17 -3,9 0,3 C3,9 3,17 -2,26Z" fill={p} opacity="0.88"/>
        <path d="M-20,18 C-13,13 -7,8 -3,3 C-6,4 -11,8 -20,18Z" fill={p} opacity="0.92"/>
        <path d="M-24,2 C-16,2 -9,2 -3,0 C-6,-5 -13,-5 -24,2Z" fill={p} opacity="0.92"/>
        <path d="M-16,-20 C-11,-14 -6,-7 -3,-2 C-7,-4 -11,-10 -16,-20Z" fill={p} opacity="0.92"/>
        <circle r="7" fill={pd} opacity="0.6"/>
        <circle r="4" fill={pl} opacity="0.9"/>
        <circle r="2" fill={s} opacity="0.5"/>
        <path d="M0,-24 L0,-6" stroke={s} strokeWidth="0.4" opacity="0.3"/>
        <path d="M17,-18 L4,-2" stroke={s} strokeWidth="0.4" opacity="0.3"/>
        <path d="M-17,-18 L-4,-2" stroke={s} strokeWidth="0.4" opacity="0.3"/>
      </g>
      {/* Scattered lavender petals top */}
      <ellipse cx="128" cy="22" rx="5" ry="9" transform="rotate(-30 128 22)" fill={lav} opacity="0.65"/>
      <ellipse cx="140" cy="14" rx="4" ry="7" transform="rotate(-55 140 14)" fill={lav} opacity="0.55"/>
      <ellipse cx="174" cy="28" rx="4" ry="8" transform="rotate(20 174 28)" fill={lav} opacity="0.6"/>
      <ellipse cx="185" cy="44" rx="3.5" ry="6" transform="rotate(40 185 44)" fill={lav} opacity="0.5"/>
      <ellipse cx="168" cy="18" rx="3" ry="5" transform="rotate(-10 168 18)" fill={lav} opacity="0.45"/>
      {/* Leaves near top flower */}
      <path d="M126,40 C116,28 101,26 97,36 C93,46 103,56 118,50Z" fill={pd} opacity="0.25" stroke={s} strokeWidth="0.6"/>
      <path d="M126,40 C114,36 108,43 111,50" stroke={s} strokeWidth="0.5" fill="none" opacity="0.55"/>
      <path d="M152,30 C156,16 170,13 174,22 C178,31 168,40 156,36Z" fill={pd} opacity="0.25" stroke={s} strokeWidth="0.6"/>
      {/* Rose bud top-right */}
      <g transform="translate(142,76)">
        <path d="M0,-9 C4,-9 7,-5 7,0 C7,5 4,9 0,9 C-4,9 -7,5 -7,0 C-7,-5 -4,-9 0,-9Z" fill="none" stroke={s} strokeWidth="0.7" opacity="0.6"/>
        <path d="M0,-9 C0,-4 3,-2 3,0 C3,2 0,3 0,9" stroke={s} strokeWidth="0.5" fill="none" opacity="0.4"/>
        <path d="M-7,0 C-4,0 -2,3 0,3 C2,3 4,0 7,0" stroke={s} strokeWidth="0.5" fill="none" opacity="0.4"/>
        <path d="M0,0 C0,-5 4,-7 6,-4 C8,-1 5,2 2,3 C5,4 7,7 4,9 C1,11 -2,9 -3,6 C-5,7 -8,4 -7,1 C-6,-2 -3,-2 0,0Z" fill={p} opacity="0.75"/>
        <circle r="2.5" fill={pl} opacity="0.7"/>
      </g>
      {/* Main vine stem */}
      <path d="M148,90 C140,106 128,124 118,144 C108,164 96,184 84,206" stroke={s} strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.55"/>
      <path d="M150,88 C158,78 162,68 158,58" stroke={s} strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.4"/>
      <path d="M145,95 C134,88 128,80 132,72" stroke={s} strokeWidth="0.7" strokeLinecap="round" fill="none" opacity="0.35"/>
      {/* Leaf pair 1 */}
      <path d="M134,108 C142,94 156,94 158,104 C160,114 150,122 136,116Z" fill={pd} opacity="0.3" stroke={s} strokeWidth="0.55"/>
      <path d="M134,108 C140,102 150,104 152,111" stroke={s} strokeWidth="0.5" fill="none" opacity="0.5"/>
      <path d="M124,124 C112,112 98,115 98,125 C98,135 112,138 124,132Z" fill={pd} opacity="0.3" stroke={s} strokeWidth="0.55"/>
      <path d="M124,124 C116,118 106,121 106,129" stroke={s} strokeWidth="0.5" fill="none" opacity="0.5"/>
      {/* Mid star flower */}
      <g transform="translate(108,152)">
        <path d="M0,-20 C2,-14 3,-8 0,-3 C-3,-8 -2,-14 0,-20Z" fill={p} opacity="0.95"/>
        <path d="M14,-15 C9,-9 5,-4 2,-1 C2,-7 5,-13 14,-15Z" fill={p} opacity="0.9"/>
        <path d="M18,3 C12,3 6,3 2,0 C5,-4 12,-4 18,3Z" fill={p} opacity="0.95"/>
        <path d="M12,17 C8,12 5,7 2,3 C6,3 10,7 12,17Z" fill={p} opacity="0.9"/>
        <path d="M-1,20 C-2,14 -2,8 0,3 C2,8 2,14 -1,20Z" fill={p} opacity="0.95"/>
        <path d="M-14,14 C-9,9 -5,6 -2,3 C-4,4 -8,7 -14,14Z" fill={p} opacity="0.9"/>
        <path d="M-18,1 C-12,1 -6,1 -2,0 C-5,-4 -11,-3 -18,1Z" fill={p} opacity="0.95"/>
        <path d="M-12,-16 C-8,-11 -5,-6 -2,-1 C-5,-3 -8,-7 -12,-16Z" fill={p} opacity="0.9"/>
        <circle r="5" fill={pd} opacity="0.6"/>
        <circle r="2.5" fill={pl} opacity="0.9"/>
        <path d="M0,-18 L0,-4" stroke={s} strokeWidth="0.35" opacity="0.3"/>
        <path d="M13,-14 L2,-2" stroke={s} strokeWidth="0.35" opacity="0.3"/>
        <path d="M-13,-14 L-2,-2" stroke={s} strokeWidth="0.35" opacity="0.3"/>
      </g>
      {/* Lavender petals mid */}
      <ellipse cx="92" cy="148" rx="4" ry="8" transform="rotate(50 92 148)" fill={lav} opacity="0.6"/>
      <ellipse cx="126" cy="160" rx="3.5" ry="7" transform="rotate(-25 126 160)" fill={lav} opacity="0.55"/>
      <ellipse cx="98" cy="166" rx="3" ry="6" transform="rotate(70 98 166)" fill={lav} opacity="0.5"/>
      <ellipse cx="88" cy="138" rx="3" ry="5.5" transform="rotate(20 88 138)" fill={lav} opacity="0.45"/>
      {/* Rose bud mid */}
      <g transform="translate(96,178)">
        <path d="M0,-8 C3,-8 6,-4 6,0 C6,4 3,8 0,8 C-3,8 -6,4 -6,0 C-6,-4 -3,-8 0,-8Z" fill="none" stroke={s} strokeWidth="0.65" opacity="0.55"/>
        <path d="M0,0 C0,-4 3,-6 5,-3 C7,-0 5,2 2,3 C4,4 6,7 3,8 C1,10 -2,8 -3,6 C-5,6 -7,3 -6,0 C-5,-2 -3,-2 0,0Z" fill={p} opacity="0.7"/>
        <circle r="1.8" fill={pl} opacity="0.7"/>
      </g>
      {/* Leaf pair 2 */}
      <path d="M92,186 C80,174 68,178 69,187 C70,196 84,199 94,192Z" fill={pd} opacity="0.28" stroke={s} strokeWidth="0.55"/>
      <path d="M92,186 C84,180 75,183 76,190" stroke={s} strokeWidth="0.5" fill="none" opacity="0.45"/>
      <path d="M100,170 C88,165 80,170 82,178" stroke={s} strokeWidth="0.7" fill="none" opacity="0.35"/>
      {/* Bottom large star flower */}
      <g transform="translate(84,212)">
        <path d="M0,-22 C2,-15 3,-8 0,-3 C-3,-8 -2,-15 0,-22Z" fill={p} opacity="0.95"/>
        <path d="M16,-16 C10,-10 6,-4 2,-1 C2,-8 6,-14 16,-16Z" fill={p} opacity="0.9"/>
        <path d="M20,3 C13,3 7,3 2,0 C5,-5 13,-4 20,3Z" fill={p} opacity="0.95"/>
        <path d="M13,18 C9,12 6,7 2,3 C7,3 11,8 13,18Z" fill={p} opacity="0.9"/>
        <path d="M-1,22 C-2,15 -2,8 0,3 C2,8 2,15 -1,22Z" fill={p} opacity="0.95"/>
        <path d="M-15,15 C-10,10 -5,6 -2,3 C-5,4 -9,7 -15,15Z" fill={p} opacity="0.9"/>
        <path d="M-20,2 C-13,2 -7,2 -2,0 C-5,-5 -13,-4 -20,2Z" fill={p} opacity="0.95"/>
        <path d="M-13,-18 C-9,-12 -5,-6 -2,-1 C-5,-3 -8,-8 -13,-18Z" fill={p} opacity="0.9"/>
        <circle r="6" fill={pd} opacity="0.55"/>
        <circle r="3" fill={pl} opacity="0.9"/>
        <path d="M0,-20 L0,-4" stroke={s} strokeWidth="0.4" opacity="0.3"/>
        <path d="M15,-15 L2,-2" stroke={s} strokeWidth="0.4" opacity="0.3"/>
        <path d="M-15,-15 L-2,-2" stroke={s} strokeWidth="0.4" opacity="0.3"/>
      </g>
      {/* Scattered lavender petals bottom */}
      <ellipse cx="60" cy="224" rx="4" ry="9" transform="rotate(-20 60 224)" fill={lav} opacity="0.6"/>
      <ellipse cx="48" cy="238" rx="3.5" ry="7" transform="rotate(15 48 238)" fill={lav} opacity="0.55"/>
      <ellipse cx="110" cy="228" rx="3" ry="6" transform="rotate(-40 110 228)" fill={lav} opacity="0.5"/>
      <ellipse cx="70" cy="244" rx="3" ry="5.5" transform="rotate(35 70 244)" fill={lav} opacity="0.5"/>
      <ellipse cx="56" cy="252" rx="2.5" ry="5" transform="rotate(-5 56 252)" fill={lav} opacity="0.4"/>
      {/* Small buds bottom */}
      <path d="M62,205 C60,196 64,192 67,196 C70,200 68,207 62,205Z" fill={p} opacity="0.7" stroke={s} strokeWidth="0.4"/>
      <path d="M62,205 L65,196" stroke={s} strokeWidth="0.6" fill="none" opacity="0.5"/>
      <path d="M54,218 C51,210 55,206 58,209 C61,212 59,219 54,218Z" fill={p} opacity="0.65" stroke={s} strokeWidth="0.4"/>
      <path d="M54,218 L57,208" stroke={s} strokeWidth="0.55" fill="none" opacity="0.4"/>
      <path d="M46,232 C44,224 47,220 50,224 C53,227 51,234 46,232Z" fill={lav} opacity="0.55" stroke={s} strokeWidth="0.35"/>
    </svg>
  )
}

async function loadFont(family: string, weight: number, style: "italic" | "normal") {
  // Use Google Fonts v1 CSS API with an old Safari UA so Google returns TTF
  // (satori only supports TTF/OTF/woff — NOT woff2)
  const styleParam = style === "italic" ? `${weight}italic` : `${weight}`
  const css = await fetch(
    `https://fonts.googleapis.com/css?family=${encodeURIComponent(family)}:${styleParam}`,
    {
      headers: {
        // Old Safari on Mac OS X — Google Fonts returns TTF for this UA
        "User-Agent":
          "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1",
      },
    },
  ).then((r) => r.text())

  // Match TTF or any font URL in the src
  const url =
    css.match(/url\(([^)]+)\)\s+format\('truetype'\)/)?.[1] ??
    css.match(/url\(([^)]+\.ttf[^)]*)\)/)?.[1] ??
    css.match(/src:\s*url\(([^)]+)\)/)?.[1]

  if (!url) throw new Error(`No font URL found for ${family} ${weight} ${style}`)
  return fetch(url).then((r) => r.arrayBuffer())
}

export default async function Image() {
  // Load exact fonts used in the real card (Cormorant Garamond via --font-cormorant)
  const [cormorant400i, cormorant600i] = await Promise.all([
    loadFont("Cormorant Garamond", 400, "italic"),
    loadFont("Cormorant Garamond", 600, "italic"),
  ])

  // Corner decoration colours — matches DecorativeCardFrame (dark=true variant used on the front card)
  const primaryStroke   = "rgba(61, 90, 114, 0.3)"
  const secondaryStroke = "rgba(61, 90, 114, 0.18)"
  const accentFill      = "rgba(61, 90, 114, 0.4)"

  const corners = [
    { top: 20,  left: 20,   rot: 0   },
    { top: 20,  left: 1150, rot: 90  },
    { top: 580, left: 1150, rot: 180 },
    { top: 580, left: 20,   rot: 270 },
  ]

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          // Exact gradient from invitation-page.tsx InvitationHeroCard
          backgroundImage:
            "linear-gradient(145deg, #f5eeee 0%, #ede4e4 40%, #f0e8e8 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* ── Border frames (matches DecorativeCardFrame dark=true) ── */}
        <div
          style={{
            position: "absolute",
            top: "16px", right: "16px", bottom: "16px", left: "16px",
            border: "1px solid rgba(61, 90, 114, 0.18)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "24px", right: "24px", bottom: "24px", left: "24px",
            border: "1px solid rgba(61, 90, 114, 0.10)",
          }}
        />

        {/* ── Corner SVGs ── */}
        {corners.map((c) => (
          <div
            key={c.rot}
            style={{
              position: "absolute",
              top: `${c.top}px`,
              left: `${c.left}px`,
              transform: `rotate(${c.rot}deg)`,
              display: "flex",
            }}
          >
            <svg width="30" height="30" viewBox="0 0 36 36" fill="none">
              <path d="M2 2 C2 18, 18 18, 18 2" stroke={primaryStroke} strokeWidth="0.75"/>
              <path d="M2 2 C2 18, 2 34, 2 34" stroke={secondaryStroke} strokeWidth="0.5"/>
              <path d="M2 2 L34 2" stroke={secondaryStroke} strokeWidth="0.5"/>
              <circle cx="2" cy="2" r="1.5" fill={accentFill}/>
              <path d="M6 6 C6 12, 12 12, 12 6" stroke={secondaryStroke} strokeWidth="0.5"/>
            </svg>
          </div>
        ))}

        {/* ── Floral art – top-right (exactly as the card: absolute top-0 right-0 w-[60%]) ── */}
        <div
          style={{
            position: "absolute",
            top: "0px",
            right: "0px",
            display: "flex",
            opacity: 0.82,
          }}
        >
          <FloralSVG />
        </div>

        {/* ── Floral art – bottom-left rotated 180° ── */}
        <div
          style={{
            position: "absolute",
            bottom: "0px",
            left: "0px",
            display: "flex",
            opacity: 0.82,
            transform: "rotate(180deg)",
          }}
        >
          <FloralSVG />
        </div>

        {/* ── Center monogram — matches InvitationHeroCard center content ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "18px",
            position: "relative",
          }}
        >
          {/* YOU'RE INVITED — matches: text-[0.5rem] font-semibold tracking-[0.5em] text-[#2d3750]/60 */}
          <p
            style={{
              fontSize: "26px",
              fontWeight: "600",
              letterSpacing: "0.5em",
              color: "rgba(45, 55, 80, 0.88)",
              fontFamily: "ui-sans-serif, system-ui, sans-serif",
              textTransform: "uppercase",
              display: "flex",
              margin: "0px",
            }}
          >
            YOU&apos;RE INVITED
          </p>

          {/* Monogram circle — matches: h-28 w-28 border border-[#3d5a72]/28 */}
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "360px",
              height: "360px",
            }}
          >
            {/* Outer glow ring — matches: h-36 w-36 border border-[#3d5a72]/12 */}
            <div
              style={{
                position: "absolute",
                width: "360px",
                height: "360px",
                borderRadius: "9999px",
                border: "1px solid rgba(61, 90, 114, 0.20)",
              }}
            />
            {/* Inner bordered ring */}
            <div
              style={{
                position: "relative",
                width: "284px",
                height: "284px",
                borderRadius: "9999px",
                border: "1px solid rgba(61, 90, 114, 0.28)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Inner-inner ring — matches: absolute inset-[7px] border-0.5 border-[#3d5a72]/14 */}
              <div
                style={{
                  position: "absolute",
                  top: "18px", right: "18px", bottom: "18px", left: "18px",
                  borderRadius: "9999px",
                  border: "0.5px solid rgba(61, 90, 114, 0.14)",
                }}
              />
              {/* Top diamond — matches: h-1 w-1 rotate-45 bg-[#3d5a72]/28 */}
              <div
                style={{
                  position: "absolute",
                  top: "28px",
                  left: "137px",
                  width: "10px",
                  height: "10px",
                  transform: "rotate(45deg)",
                  backgroundColor: "rgba(61, 90, 114, 0.28)",
                }}
              />
              {/* Bottom diamond */}
              <div
                style={{
                  position: "absolute",
                  bottom: "28px",
                  left: "137px",
                  width: "10px",
                  height: "10px",
                  transform: "rotate(45deg)",
                  backgroundColor: "rgba(61, 90, 114, 0.28)",
                }}
              />
              {/* M & L — matches: font-heading text-[2.2rem] font-semibold italic text-[#1e2d45] */}
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "12px",
                  position: "relative",
                }}
              >
                <span
                  style={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: "104px",
                    fontStyle: "italic",
                    fontWeight: 600,
                    color: "#1e2d45",
                    lineHeight: "1",
                  }}
                >
                  M
                </span>
                <span
                  style={{
                    fontFamily: "ui-sans-serif, system-ui, sans-serif",
                    fontSize: "26px",
                    fontWeight: 500,
                    color: "rgba(61, 90, 114, 0.80)",
                    paddingBottom: "8px",
                  }}
                >
                  &amp;
                </span>
                <span
                  style={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: "104px",
                    fontStyle: "italic",
                    fontWeight: 600,
                    color: "#1e2d45",
                    lineHeight: "1",
                  }}
                >
                  L
                </span>
              </div>
            </div>
          </div>

          {/* Tap to Open — matches the envelope button on the card */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              borderRadius: "9999px",
              border: "1px solid rgba(61, 90, 114, 0.25)",
              backgroundColor: "rgba(255, 255, 255, 0.30)",
              padding: "18px 40px",
            }}
          >
            <svg width="26" height="20" viewBox="0 0 13 10" fill="none">
              <rect x="0.5" y="0.5" width="12" height="9" rx="1.5" stroke="rgba(61,90,114,0.5)" strokeWidth="0.8"/>
              <path d="M0.5 2L6.5 6L12.5 2" stroke="rgba(61,90,114,0.5)" strokeWidth="0.8" strokeLinecap="round"/>
            </svg>
            <span
              style={{
                fontFamily: "ui-sans-serif, system-ui, sans-serif",
                fontSize: "20px",
                fontWeight: 600,
                letterSpacing: "0.35em",
                color: "rgba(45, 55, 80, 0.90)",
                textTransform: "uppercase",
              }}
            >
              TAP TO OPEN
            </span>
          </div>

          {/* With Love, and Joy — matches: font-heading text-[0.65rem] italic text-[#3d5a72]/40 */}
          <p
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: "36px",
              fontStyle: "italic",
              fontWeight: 400,
              color: "rgba(61, 90, 114, 0.70)",
              display: "flex",
              margin: "0px",
            }}
          >
            With Love, and Joy
          </p>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Cormorant Garamond",
          data: cormorant400i,
          weight: 400,
          style: "italic",
        },
        {
          name: "Cormorant Garamond",
          data: cormorant600i,
          weight: 600,
          style: "italic",
        },
      ],
    },
  )
}
