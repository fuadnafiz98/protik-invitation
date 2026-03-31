"use client"

import Image from "next/image"
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react"
import {
  startTransition,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
} from "react"

import bottomLeftRoses from "./images/bottom-left-roses.webp"
import topRightRose from "./images/top-right-rose.webp"

const EVENTS = [
  {
    title: "Mehendi & Kawali",
    label: "Evening Celebration",
    date: "Friday, April 3rd",
    time: "Evening onwards",
    venue: "Rockaway Beach",
    note: "Friday, April 3rd evening at Rockaway Beach. Mehendi followed by Kawali Night.",
  },
  {
    title: "Haldi",
    label: "Day Ceremony",
    date: "Saturday, April 4th",
    time: "3:00 PM",
    venue: "Rockaway Beach",
    note: "Saturday, April 4th at 3:00 PM at Rockaway Beach.",
  },
  {
    title: "Wedding & Walima",
    label: "Main Ceremony",
    date: "Sunday, April 5th",
    time: "5:00 PM",
    venue: "Maleen Banquet Rooftop",
    note: "Sunday, April 5th at 5:00 PM at Maleen Banquet Rooftop in Bellerose, New York.",
  },
] as const

const FLOATING_BLOOMS: ReadonlyArray<{
  id: string
  size: number
  top?: string
  right?: string
  bottom?: string
  left?: string
  delay: number
  duration: number
  color: string
}> = [
  {
    id: "top-left",
    size: 88,
    top: "14%",
    left: "9%",
    delay: 0.1,
    duration: 12,
    color: "bg-[#DFD3CE]/42",
  },
  {
    id: "top-right",
    size: 132,
    top: "18%",
    right: "12%",
    delay: 1,
    duration: 16,
    color: "bg-[#A8C1D4]/48",
  },
  {
    id: "bottom-left",
    size: 72,
    bottom: "22%",
    left: "18%",
    delay: 1.8,
    duration: 13,
    color: "bg-[#DFD3CE]/48",
  },
  {
    id: "bottom-right",
    size: 120,
    bottom: "16%",
    right: "10%",
    delay: 0.7,
    duration: 14,
    color: "bg-[#A8C1D4]/34",
  },
] as const

const cardFaceStyle: CSSProperties = {
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
}

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  reducedMotion: boolean
}

type EventCardProps = (typeof EVENTS)[number] & {
  index: number
  onSelect: () => void
  reducedMotion: boolean
}

const CARD_CORNERS = [
  {
    id: "top-left",
    className: "top-3 left-3 sm:top-4 sm:left-4",
    rotation: "0deg",
  },
  {
    id: "top-right",
    className: "top-3 right-3 sm:top-4 sm:right-4",
    rotation: "90deg",
  },
  {
    id: "bottom-right",
    className: "right-3 bottom-3 sm:right-4 sm:bottom-4",
    rotation: "180deg",
  },
  {
    id: "bottom-left",
    className: "bottom-3 left-3 sm:bottom-4 sm:left-4",
    rotation: "270deg",
  },
] as const

const REVEAL_PARTICLES = [
  { id: "left-top", top: "15%", left: "4%", delay: 0.2, size: 5 },
  { id: "right-top", top: "24%", left: "93%", delay: 0.4, size: 4 },
  { id: "left-mid", top: "50%", left: "2%", delay: 0.6, size: 4.5 },
  { id: "right-mid", top: "63%", left: "94%", delay: 0.8, size: 3.5 },
  { id: "left-bottom", top: "82%", left: "11%", delay: 1, size: 4 },
] as const

type DecorativeCardFrameProps = {
  dark?: boolean
}

type InvitationHeroCardProps = {
  isRevealed: boolean
  onToggle: () => void
  onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void
  reducedMotion: boolean
}

function Reveal({
  children,
  className,
  delay = 0,
  reducedMotion,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={reducedMotion ? undefined : { opacity: 0, y: 40 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function EventCard({
  index,
  label,
  title,
  date,
  time,
  venue,
  note,
  onSelect,
  reducedMotion,
}: EventCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      className="group relative flex w-full cursor-pointer flex-col overflow-hidden rounded-[24px] border border-[#a8c4d8]/50 bg-[#f0e6e6]/50 p-6 text-left shadow-[0_8px_24px_rgba(168,193,212,0.1)] backdrop-blur-md transition focus-visible:ring-2 focus-visible:ring-[#A8C1D4]/50 focus-visible:outline-none sm:p-7"
      initial={reducedMotion ? undefined : { opacity: 0, y: 36 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      whileHover={reducedMotion ? undefined : { y: -8, boxShadow: "0 20px 48px rgba(168,193,212,0.15)" }}
      whileTap={reducedMotion ? undefined : { scale: 0.992 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{
        duration: 0.8,
        delay: reducedMotion ? 0 : index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="pointer-events-none absolute inset-[10px] rounded-[24px] border border-white/50" />
      <div className="pointer-events-none absolute top-0 right-0 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(168,193,212,0.15)_0%,rgba(168,193,212,0)_70%)]" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(215,225,235,0.12)_0%,rgba(215,225,235,0)_65%)]" />

      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <span className="inline-flex rounded-full border border-[#5a7a96]/30 bg-[rgba(90,122,150,0.06)] px-3 py-1.5 text-[0.6rem] tracking-[0.28em] text-[#3d6080] font-medium uppercase">
            {label}
          </span>
          <span className="text-[0.72rem] font-medium tracking-[0.2em] text-[#4a6b85]">
            0{index + 1}
          </span>
        </div>

        <div className="mt-5">
          <h3 className="font-heading text-[1.7rem] leading-tight text-[#2d3750] sm:text-[1.9rem]">
            {title}
          </h3>
          <div className="mt-2 h-px w-10 bg-gradient-to-r from-[#c8afd0]/70 to-transparent" />
        </div>

        <div className="mt-5 space-y-2.5 border-t border-[#A8C1D4]/15 pt-5">
          <div className="flex items-center justify-between">
            <p className="text-[0.6rem] tracking-[0.28em] text-[#5a7a96] uppercase">Date</p>
            <p className="text-sm text-[#2d3750]">{date}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-[0.6rem] tracking-[0.28em] text-[#5a7a96] uppercase">Time</p>
            <p className="text-sm text-[#2d3750]">{time}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-[0.6rem] tracking-[0.28em] text-[#5a7a96] uppercase">Venue</p>
            <p className="text-sm font-medium text-[#3d4f6b]">{venue}</p>
          </div>
        </div>
      </div>
    </motion.button>
  )
}

function DecorativeCardFrame({ dark = false }: DecorativeCardFrameProps) {
  const primaryStroke = dark
    ? "rgba(61, 90, 114, 0.3)"
    : "rgba(211, 181, 123, 0.55)"
  const secondaryStroke = dark
    ? "rgba(61, 90, 114, 0.18)"
    : "rgba(223, 211, 206, 0.44)"
  const accentFill = dark
    ? "rgba(61, 90, 114, 0.4)"
    : "rgba(211, 181, 123, 0.68)"

  return (
    <>
      <div
        className="pointer-events-none absolute inset-3 sm:inset-4"
        style={{
          border: dark
            ? "1px solid rgba(61, 90, 114, 0.18)"
            : "1px solid rgba(211, 181, 123, 0.28)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-5 sm:inset-6"
        style={{
          border: dark
            ? "1px solid rgba(61, 90, 114, 0.1)"
            : "1px solid rgba(223, 211, 206, 0.32)",
        }}
      />

      {CARD_CORNERS.map((corner) => (
        <div
          key={corner.id}
          className={`absolute ${corner.className}`}
          style={{ transform: `rotate(${corner.rotation})` }}
        >
          <svg width="30" height="30" viewBox="0 0 36 36" fill="none">
            <path
              d="M2 2 C2 18, 18 18, 18 2"
              stroke={primaryStroke}
              strokeWidth="0.75"
            />
            <path
              d="M2 2 C2 18, 2 34, 2 34"
              stroke={secondaryStroke}
              strokeWidth="0.5"
            />
            <path d="M2 2 L34 2" stroke={secondaryStroke} strokeWidth="0.5" />
            <circle cx="2" cy="2" r="1.5" fill={accentFill} />
            <path
              d="M6 6 C6 12, 12 12, 12 6"
              stroke={secondaryStroke}
              strokeWidth="0.5"
            />
          </svg>
        </div>
      ))}

      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          background: dark
            ? "radial-gradient(ellipse 80% 50% at 25% 15%, rgba(255,255,255,0.25) 0%, transparent 60%)"
            : "radial-gradient(ellipse 80% 50% at 25% 15%, rgba(255,255,255,0.7) 0%, transparent 60%)",
        }}
      />
    </>
  )
}

function CardFloralArt({ className = "" }: { className?: string }) {
  const p = "#b87878"    // dusty rose for petals
  const pd = "#8a5555"   // deeper rose for depth / leaf fill
  const pl = "#d4a0a0"   // lighter rose highlights
  const s = "#7a5050"    // dark rose stems & outlines
  const lav = "#9070a0"  // deeper lavender-mauve for scattered loose petals
  return (
    <svg className={className} viewBox="0 0 200 260" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* === LARGE STAR FLOWER top-right === */}
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
        {/* petal vein lines */}
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
      {/* Leaves & rose bud near top flower — line-art style */}
      <path d="M126,40 C116,28 101,26 97,36 C93,46 103,56 118,50Z" fill={pd} opacity="0.25" stroke={s} strokeWidth="0.6"/>
      <path d="M126,40 C114,36 108,43 111,50" stroke={s} strokeWidth="0.5" fill="none" opacity="0.55"/>
      <path d="M152,30 C156,16 170,13 174,22 C178,31 168,40 156,36Z" fill={pd} opacity="0.25" stroke={s} strokeWidth="0.6"/>
      {/* Rose bud top-right — outline style */}
      <g transform="translate(142,76)">
        <path d="M0,-9 C4,-9 7,-5 7,0 C7,5 4,9 0,9 C-4,9 -7,5 -7,0 C-7,-5 -4,-9 0,-9Z" fill="none" stroke={s} strokeWidth="0.7" opacity="0.6"/>
        <path d="M0,-9 C0,-4 3,-2 3,0 C3,2 0,3 0,9" stroke={s} strokeWidth="0.5" fill="none" opacity="0.4"/>
        <path d="M-7,0 C-4,0 -2,3 0,3 C2,3 4,0 7,0" stroke={s} strokeWidth="0.5" fill="none" opacity="0.4"/>
        <path d="M0,0 C0,-5 4,-7 6,-4 C8,-1 5,2 2,3 C5,4 7,7 4,9 C1,11 -2,9 -3,6 C-5,7 -8,4 -7,1 C-6,-2 -3,-2 0,0Z" fill={p} opacity="0.75"/>
        <circle r="2.5" fill={pl} opacity="0.7"/>
      </g>
      {/* Main vine stem */}
      <path d="M148,90 C140,106 128,124 118,144 C108,164 96,184 84,206" stroke={s} strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.55"/>
      {/* Secondary vine branch top */}
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
        {/* vein lines */}
        <path d="M0,-18 L0,-4" stroke={s} strokeWidth="0.35" opacity="0.3"/>
        <path d="M13,-14 L2,-2" stroke={s} strokeWidth="0.35" opacity="0.3"/>
        <path d="M-13,-14 L-2,-2" stroke={s} strokeWidth="0.35" opacity="0.3"/>
      </g>
      {/* Lavender petals scattered mid */}
      <ellipse cx="92" cy="148" rx="4" ry="8" transform="rotate(50 92 148)" fill={lav} opacity="0.6"/>
      <ellipse cx="126" cy="160" rx="3.5" ry="7" transform="rotate(-25 126 160)" fill={lav} opacity="0.55"/>
      <ellipse cx="98" cy="166" rx="3" ry="6" transform="rotate(70 98 166)" fill={lav} opacity="0.5"/>
      <ellipse cx="88" cy="138" rx="3" ry="5.5" transform="rotate(20 88 138)" fill={lav} opacity="0.45"/>
      {/* Rose bud mid — outline */}
      <g transform="translate(96,178)">
        <path d="M0,-8 C3,-8 6,-4 6,0 C6,4 3,8 0,8 C-3,8 -6,4 -6,0 C-6,-4 -3,-8 0,-8Z" fill="none" stroke={s} strokeWidth="0.65" opacity="0.55"/>
        <path d="M0,0 C0,-4 3,-6 5,-3 C7,-0 5,2 2,3 C4,4 6,7 3,8 C1,10 -2,8 -3,6 C-5,6 -7,3 -6,0 C-5,-2 -3,-2 0,0Z" fill={p} opacity="0.7"/>
        <circle r="1.8" fill={pl} opacity="0.7"/>
      </g>
      {/* Leaf pair 2 */}
      <path d="M92,186 C80,174 68,178 69,187 C70,196 84,199 94,192Z" fill={pd} opacity="0.28" stroke={s} strokeWidth="0.55"/>
      <path d="M92,186 C84,180 75,183 76,190" stroke={s} strokeWidth="0.5" fill="none" opacity="0.45"/>
      {/* Branch off main vine */}
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
        {/* vein lines */}
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
      {/* Small buds bottom — outline style */}
      <path d="M62,205 C60,196 64,192 67,196 C70,200 68,207 62,205Z" fill={p} opacity="0.7" stroke={s} strokeWidth="0.4"/>
      <path d="M62,205 L65,196" stroke={s} strokeWidth="0.6" fill="none" opacity="0.5"/>
      <path d="M54,218 C51,210 55,206 58,209 C61,212 59,219 54,218Z" fill={p} opacity="0.65" stroke={s} strokeWidth="0.4"/>
      <path d="M54,218 L57,208" stroke={s} strokeWidth="0.55" fill="none" opacity="0.4"/>
      <path d="M46,232 C44,224 47,220 50,224 C53,227 51,234 46,232Z" fill={lav} opacity="0.55" stroke={s} strokeWidth="0.35"/>
    </svg>
  )
}

function InvitationHeroCard({
  isRevealed,
  onToggle,
  onKeyDown,
  reducedMotion,
}: InvitationHeroCardProps) {
  return (
    <div className="relative flex w-full max-w-[22rem] items-center justify-center py-16 [perspective:2400px] sm:max-w-[28rem] md:max-w-[32rem] md:py-20">
      <motion.div
        className="relative z-10 w-full"
        onClick={onToggle}
        onKeyDown={onKeyDown}
        role="button"
        tabIndex={0}
        aria-expanded={isRevealed}
        aria-label={isRevealed ? "Close invitation" : "Open invitation"}
        initial={reducedMotion ? undefined : { scale: 0.92, opacity: 0, y: 36 }}
        animate={reducedMotion ? undefined : { scale: 1, opacity: 1, y: 0 }}
        whileHover={
          reducedMotion
            ? undefined
            : { scale: 1.015, transition: { duration: 0.35, ease: "easeOut" } }
        }
        whileTap={reducedMotion ? undefined : { scale: 0.98 }}
        transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="relative w-full cursor-pointer overflow-hidden rounded-[8px] [transform-style:preserve-3d]"
          style={{
            aspectRatio: "3 / 4.15",
            boxShadow: `
              0 4px 12px rgba(61,90,114,0.12),
              0 20px 50px rgba(61,90,114,0.18),
              0 50px 100px rgba(61,90,114,0.1)
            `,
          }}
        >
          <motion.div
            className="absolute inset-0 overflow-hidden"
            style={{ ...cardFaceStyle, background: "linear-gradient(145deg, #dce6f0 0%, #c8d8e8 40%, #d8e4f0 100%)" }}
            animate={
              reducedMotion
                ? { opacity: isRevealed ? 0 : 1 }
                : {
                    rotateY: isRevealed ? 180 : 0,
                    opacity: isRevealed ? 0 : 1,
                  }
            }
            transition={{
              duration: reducedMotion ? 0.15 : 0.95,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <DecorativeCardFrame dark={true} />


            {/* Floral corner art */}
            <CardFloralArt className="pointer-events-none absolute top-0 right-0 w-[60%] opacity-80" />
            <div className="pointer-events-none absolute bottom-0 left-0 w-[60%] rotate-180 opacity-80">
              <CardFloralArt className="w-full" />
            </div>

            {/* Center monogram + text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 text-center">
              <p className="text-[0.5rem] font-semibold tracking-[0.5em] text-[#2d3750]/60 uppercase">
                You&apos;re Invited
              </p>

              {/* Monogram circle */}
              <div className="relative flex items-center justify-center">
                <motion.div
                  className="absolute h-36 w-36 rounded-full border border-[#3d5a72]/12"
                  animate={reducedMotion ? undefined : { scale: [1, 1.1, 1], opacity: [0.12, 0.35, 0.12] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                />
                <div
                  className="relative flex h-28 w-28 items-center justify-center rounded-full"
                  style={{ border: "1px solid rgba(61,90,114,0.28)" }}
                >
                  <div className="absolute inset-[7px] rounded-full" style={{ border: "0.5px solid rgba(61,90,114,0.14)" }} />
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 h-1 w-1 rotate-45 bg-[#3d5a72]/28" />
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 h-1 w-1 rotate-45 bg-[#3d5a72]/28" />
                  <div className="z-10 flex items-baseline gap-1.5">
                    <span className="font-heading text-[2.2rem] font-semibold italic leading-none text-[#1e2d45]">M</span>
                    <span className="text-[0.6rem] font-medium text-[#3d5a72]/55">&</span>
                    <span className="font-heading text-[2.2rem] font-semibold italic leading-none text-[#1e2d45]">L</span>
                  </div>
                </div>
              </div>

              {/* Envelope-style tap button */}
              <motion.div
                className="flex flex-col items-center gap-2"
                animate={reducedMotion ? undefined : { opacity: [0.55, 1, 0.55] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-2 rounded-full border border-[#3d5a72]/25 bg-white/30 px-4 py-2 backdrop-blur-sm">
                  {/* Mini envelope icon */}
                  <svg width="13" height="10" viewBox="0 0 13 10" fill="none">
                    <rect x="0.5" y="0.5" width="12" height="9" rx="1.5" stroke="rgba(61,90,114,0.5)" strokeWidth="0.8"/>
                    <path d="M0.5 2L6.5 6L12.5 2" stroke="rgba(61,90,114,0.5)" strokeWidth="0.8" strokeLinecap="round"/>
                  </svg>
                  <p className="text-[0.55rem] font-semibold tracking-[0.35em] text-[#2d3750]/70 uppercase">Tap to Open</p>
                </div>
                <p className="font-heading text-[0.65rem] italic text-[#3d5a72]/40">With Love, and Joy</p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="absolute inset-0 overflow-hidden p-8 text-[#2d3750] sm:p-10"
            style={{
              ...cardFaceStyle,
              transform: "rotateY(-180deg)",
              background: "linear-gradient(145deg, #dce6f0 0%, #c8d8e8 40%, #d8e4f0 100%)",
            }}
            animate={
              reducedMotion
                ? { opacity: isRevealed ? 1 : 0 }
                : {
                    rotateY: isRevealed ? 0 : -180,
                    opacity: isRevealed ? 1 : 0,
                  }
            }
            transition={{
              duration: reducedMotion ? 0.15 : 0.95,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <DecorativeCardFrame dark={true} />


            <CardFloralArt className="pointer-events-none absolute top-0 right-0 w-[55%] opacity-30" />
            <div className="pointer-events-none absolute bottom-0 left-0 w-[55%] rotate-180 opacity-30">
              <CardFloralArt className="w-full" />
            </div>

            <motion.div
              className="absolute inset-0 z-10 flex flex-col items-center justify-center p-10 text-center sm:p-12"
              initial={false}
              animate={
                isRevealed
                  ? { opacity: 1, y: 0 }
                  : { opacity: reducedMotion ? 1 : 0, y: 12 }
              }
              transition={{
                delay: reducedMotion ? 0 : 0.16,
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="flex flex-col items-center gap-4">
                <motion.p
                  className="text-[8px] font-medium tracking-[0.5em] text-[#3d5a72]/60 uppercase"
                  initial={reducedMotion ? undefined : { opacity: 0 }}
                  animate={reducedMotion ? undefined : { opacity: 1 }}
                  transition={{ delay: reducedMotion ? 0 : 0.2 }}
                >
                  You&apos;re Invited
                </motion.p>

                <motion.div
                  initial={reducedMotion ? undefined : { opacity: 0, y: 10 }}
                  animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ delay: reducedMotion ? 0 : 0.28 }}
                >
                  <h1 className="font-heading text-[2rem] italic leading-tight text-[#1e2d45] sm:text-[2.4rem]">
                    Mohian &amp; Lamia
                  </h1>
                  <p className="font-heading text-[0.9rem] italic text-[#3d5a72]/85 sm:text-[1rem]">Wedding &amp; Walima</p>
                </motion.div>

                <motion.div
                  className="flex items-center gap-3"
                  initial={reducedMotion ? undefined : { opacity: 0 }}
                  animate={reducedMotion ? undefined : { opacity: 1 }}
                  transition={{ delay: reducedMotion ? 0 : 0.36 }}
                >
                  <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#3d5a72]/35" />
                  <div className="h-1 w-1 rotate-45 bg-[#3d5a72]/40" />
                  <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#3d5a72]/35" />
                </motion.div>

                <motion.div
                  className="flex flex-col items-center gap-1"
                  initial={reducedMotion ? undefined : { opacity: 0, y: 8 }}
                  animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ delay: reducedMotion ? 0 : 0.42 }}
                >
                  <p className="font-heading text-[1.1rem] text-[#2d3750]">
                    Maleen Banquet Rooftop
                  </p>
                  <p className="text-[0.65rem] tracking-[0.25em] text-[#3d5a72]/60 uppercase">
                    Bellerose, New York
                  </p>
                </motion.div>

                <motion.p
                  className="text-[0.65rem] font-medium tracking-[0.28em] text-[#3d5a72]/70 uppercase"
                  initial={reducedMotion ? undefined : { opacity: 0 }}
                  animate={reducedMotion ? undefined : { opacity: 1 }}
                  transition={{ delay: reducedMotion ? 0 : 0.52 }}
                >
                  Sunday, April 5th · 5:00 PM
                </motion.p>

                <motion.div
                  className="mt-1 flex flex-col items-center gap-2"
                  initial={reducedMotion ? undefined : { opacity: 0 }}
                  animate={reducedMotion ? undefined : { opacity: 1 }}
                  transition={{ delay: reducedMotion ? 0 : 0.62 }}
                >
                  <p className="text-[8px] tracking-[0.3em] text-[#3d5a72]/40 uppercase">
                    Scroll down for full schedule
                  </p>
                  <motion.p
                    className="text-[8px] tracking-[0.3em] text-[#3d5a72]/35 uppercase"
                    animate={reducedMotion ? undefined : { opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    Tap to close
                  </motion.p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isRevealed
          ? REVEAL_PARTICLES.map((particle) => (
              <motion.div
                key={particle.id}
                className="pointer-events-none absolute rounded-full"
                style={{
                  top: particle.top,
                  left: particle.left,
                  width: particle.size * 3.5,
                  height: particle.size * 3.5,
                  background:
                    "radial-gradient(circle, rgba(223, 211, 206, 0.62) 0%, transparent 70%)",
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 0.7, 0],
                  scale: [0, 1.2, 0.6],
                  y: [0, -50, -80],
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 3.5,
                  delay: particle.delay,
                  ease: "easeOut",
                }}
              />
            ))
          : null}
      </AnimatePresence>
    </div>
  )
}

export default function InvitationPage() {
  const [isOpen, setIsOpen] = useState(false)
  const heroRef = useRef<HTMLElement>(null)
  const beachMapRef = useRef<HTMLDivElement>(null)
  const weddingMapRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion() ?? false

  const { scrollYProgress } = useScroll()
  const progressScaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 32,
    mass: 0.25,
  })

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const heroLift = useTransform(
    heroProgress,
    [0, 1],
    [0, reducedMotion ? 0 : -110]
  )
  const heroFade = useTransform(heroProgress, [0, 0.82], [1, 0.45])
  const leftRoseY = useTransform(
    heroProgress,
    [0, 1],
    [0, reducedMotion ? 0 : -78]
  )
  const rightRoseY = useTransform(
    heroProgress,
    [0, 1],
    [0, reducedMotion ? 0 : 70]
  )

  useEffect(() => {
    return heroProgress.on("change", (v) => {
      if (v > 0.22) {
        startTransition(() => setIsOpen(true))
      }
    })
  }, [heroProgress])

  const toggleInvitation = () => {
    startTransition(() => {
      setIsOpen((prev) => !prev)
    })
  }

  const handleCardKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return
    }

    event.preventDefault()
    toggleInvitation()
  }

  const scrollToMap = (index: number) => {
    const targetRef = index === 2 ? weddingMapRef : beachMapRef

    targetRef.current?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    })
  }

  return (
    <MotionConfig reducedMotion="user">
      <main className="relative overflow-x-hidden bg-[#eef3f9] text-[#384355]">
        <motion.div
          className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-gradient-to-r from-[#c8afd0] via-[#A8C1D4] to-[#7aa8c8]"
          style={{ scaleX: progressScaleX }}
        />

        <div className="pointer-events-none fixed inset-0 -z-20 bg-[radial-gradient(ellipse_at_top_right,rgba(168,193,212,0.28),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(140,180,215,0.18),transparent_55%),linear-gradient(180deg,#eef3f9_0%,#f2f6fa_50%,#edf2f8_100%)]" />
        <div className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(135deg,rgba(255,255,255,0.22)_0%,transparent_40%,rgba(168,193,212,0.06)_100%)]" />

        {/* Bismillah header */}
        <div className="flex items-center justify-center pt-8 pb-2">
          <p className="text-[1.5rem] text-[#2d3750]/65" style={{ fontFamily: "serif", direction: "rtl", letterSpacing: "0.04em" }}>
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </p>
        </div>

        <section
          ref={heroRef}
          className="relative flex min-h-screen items-center justify-center px-6 py-12 md:px-10 md:py-20"
        >
          <motion.div
            aria-hidden
            className="pointer-events-none absolute bottom-0 left-0 z-0 w-[11rem] sm:w-[17rem] md:w-[23rem] lg:w-[29rem]"
            style={{ y: leftRoseY }}
            initial={false}
            animate={{
              opacity: isOpen ? 0.4 : 0,
              scale: isOpen ? 1 : 0.92,
              x: isOpen ? 0 : -18,
            }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={bottomLeftRoses}
              alt=""
              priority
              sizes="(max-width: 640px) 10rem, (max-width: 1024px) 20rem, 24rem"
              className="h-auto w-full object-contain opacity-75 select-none"
              style={{ filter: "sepia(0.4) saturate(1.8) hue-rotate(-15deg) brightness(0.9)" }}
            />
          </motion.div>

          <motion.div
            aria-hidden
            className="pointer-events-none absolute top-0 right-0 z-0 w-[7.5rem] sm:w-[11rem] md:w-[15rem] lg:w-[18rem]"
            style={{ y: rightRoseY }}
            initial={false}
            animate={{
              opacity: isOpen ? 0.36 : 0,
              scale: isOpen ? 1 : 0.92,
              x: isOpen ? 0 : 18,
            }}
            transition={{
              duration: 0.8,
              delay: reducedMotion ? 0 : 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Image
              src={topRightRose}
              alt=""
              priority
              sizes="(max-width: 640px) 7rem, (max-width: 1024px) 13rem, 15rem"
              className="h-auto w-full object-contain opacity-70 select-none"
              style={{ filter: "sepia(0.4) saturate(1.8) hue-rotate(-15deg) brightness(0.9)" }}
            />
          </motion.div>

          {FLOATING_BLOOMS.map((bloom) => (
            <motion.span
              key={bloom.id}
              aria-hidden
              className={`pointer-events-none absolute rounded-full blur-2xl ${bloom.color}`}
              style={{
                width: bloom.size,
                height: bloom.size,
                top: bloom.top,
                right: bloom.right,
                bottom: bloom.bottom,
                left: bloom.left,
              }}
              animate={
                reducedMotion
                  ? { opacity: isOpen ? 0.18 : 0.45 }
                  : {
                      y: [0, -18, 0],
                      scale: [1, 1.08, 1],
                      opacity: isOpen ? [0.12, 0.22, 0.12] : [0.3, 0.6, 0.3],
                    }
              }
              transition={{
                duration: bloom.duration,
                delay: bloom.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

          <motion.div
            className="relative z-10 mx-auto flex w-full max-w-[88rem] flex-col items-center gap-6"
            style={{ y: heroLift, opacity: heroFade }}
          >
            <InvitationHeroCard
              isRevealed={isOpen}
              onToggle={toggleInvitation}
              onKeyDown={handleCardKeyDown}
              reducedMotion={reducedMotion}
            />

            <AnimatePresence mode="wait">
              {!isOpen ? (
                <motion.p
                  key="closed"
                  className="text-center text-[0.6rem] font-medium tracking-[0.3em] text-[#5a7a96]/90 uppercase"
                  initial={reducedMotion ? undefined : { opacity: 0, y: 10 }}
                  animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                  exit={reducedMotion ? undefined : { opacity: 0, y: -10 }}
                >
                  Click the card to reveal the celebration
                </motion.p>
              ) : (
                <motion.div key="opened" exit={reducedMotion ? undefined : { opacity: 0 }} />
              )}
            </AnimatePresence>
          </motion.div>
        </section>

        <section className="relative px-6 pb-24 md:px-10 md:pb-32">
          <div className="mx-auto flex max-w-6xl flex-col gap-14">
            <Reveal
              reducedMotion={reducedMotion}
              className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]"
            >
              <div className="rounded-[28px] border border-[#a8c4d8]/50 bg-[#f0e6e6]/50 p-8 shadow-[0_8px_28px_rgba(168,193,212,0.08)] backdrop-blur-sm sm:p-10">
                <p className="font-heading text-[0.95rem] italic text-[#5a7a96]">
                  Mohian Islam Protik &amp; Lamia Zaman
                </p>
                <h2 className="mt-4 font-heading text-[1.55rem] leading-snug text-[#1e2d45] sm:text-[2rem]">
                  We would love your presence at our wedding celebrations.
                </h2>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-[#4a5568]">
                  Starting at Rockaway Beach for Mehendi, Kawali, and Haldi — then the Wedding &amp; Walima at Maleen Banquet Rooftop, Bellerose NY.
                </p>
              </div>

              <motion.div
                className="relative overflow-hidden rounded-[28px] border border-[#a8c4d8]/50 bg-[#f0e6e6]/50 p-8 shadow-[0_8px_28px_rgba(168,193,212,0.08)]"
                initial={
                  reducedMotion ? undefined : { opacity: 0, scale: 0.96 }
                }
                whileInView={
                  reducedMotion ? undefined : { opacity: 1, scale: 1 }
                }
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#c8afd0]/55 to-transparent" />
                <p className="text-xs font-medium tracking-[0.34em] text-[#5a7a96] uppercase">
                  Quick Guide
                </p>
                <div className="mt-6 space-y-5">
                  <div>
                    <p className="text-sm tracking-[0.22em] text-[#b87878] uppercase">
                      Friday, April 3rd · Evening
                    </p>
                    <p className="mt-2 font-heading text-[2rem] text-[#4d5874]">
                      Mehendi &amp; Kawali
                    </p>
                    <p className="text-base text-[#4d5874]">Rockaway Beach</p>
                  </div>
                  <div className="h-px w-full bg-[#DFD3CE]/60" />
                  <div>
                    <p className="text-sm tracking-[0.22em] text-[#b87878] uppercase">
                      Saturday, April 4th | 3:00 PM
                    </p>
                    <p className="mt-2 font-heading text-[2rem] text-[#4d5874]">
                      Haldi
                    </p>
                    <p className="text-base text-[#4d5874]">Rockaway Beach</p>
                  </div>
                  <div className="h-px w-full bg-[#A8C1D4]/50" />
                  <div>
                    <p className="text-sm tracking-[0.22em] text-[#b87878] uppercase">
                      Sunday, April 5th | 5:00 PM
                    </p>
                    <p className="mt-2 font-heading text-[2rem] text-[#4d5874]">
                      The Wedding
                    </p>
                    <p className="text-base text-[#4d5874]">
                      Maleen Banquet Hall, Bellerose, NY
                    </p>
                  </div>
                </div>
              </motion.div>
            </Reveal>

            <Reveal reducedMotion={reducedMotion}>
              <div className="max-w-2xl">
                <p className="text-[0.6rem] font-medium tracking-[0.4em] text-[#5a7a96] uppercase">
                  Schedule
                </p>
                <h2 className="mt-3 font-heading text-[1.9rem] leading-snug text-[#2d3750] sm:text-[2.4rem]">
                  Three days of celebration
                </h2>
              </div>
            </Reveal>

            <div className="grid gap-6 md:grid-cols-3">
              {EVENTS.map((event, index) => (
                <EventCard
                  key={event.title}
                  index={index}
                  onSelect={() => scrollToMap(index)}
                  reducedMotion={reducedMotion}
                  {...event}
                />
              ))}
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              <motion.div
                ref={beachMapRef}
                className="overflow-hidden rounded-[24px] border border-[#a8c4d8]/50 bg-[#f0e6e6]/50 shadow-[0_8px_28px_rgba(168,193,212,0.1)] backdrop-blur-sm"
                style={{ scrollMarginTop: "7rem" }}
                initial={reducedMotion ? undefined : { opacity: 0, y: 28 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-start justify-between px-5 pt-5 pb-3">
                  <div>
                    <p className="text-[0.6rem] font-medium tracking-[0.3em] text-[#5a7a96] uppercase">
                      Fri Apr 3 – Sat Apr 4
                    </p>
                    <h3 className="mt-1 font-heading text-[1.35rem] text-[#2d3750]">
                      Rockaway Beach
                    </h3>
                    <p className="mt-0.5 text-xs text-[#4d5874]">Mehendi, Kawali &amp; Haldi</p>
                  </div>
                  <a
                    href="https://maps.google.com/?q=Rockaway+Beach+NY"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 flex items-center gap-1.5 rounded-full border border-[#A8C1D4]/40 bg-[rgba(168,193,212,0.08)] px-3 py-1.5 text-[0.6rem] font-medium tracking-[0.15em] text-[#5a7fa3] uppercase transition hover:bg-[rgba(168,193,212,0.15)]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    Directions
                  </a>
                </div>
                <div className="overflow-hidden rounded-[16px] mx-3 mb-3 border border-[#A8C1D4]/20">
                  <iframe
                    title="Rockaway Beach map"
                    src="https://www.google.com/maps?q=Rockaway%20Beach&z=14&output=embed"
                    className="h-[18rem] w-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
              </motion.div>

              <motion.div
                ref={weddingMapRef}
                className="overflow-hidden rounded-[24px] border border-[#a8c4d8]/50 bg-[#f0e6e6]/50 shadow-[0_8px_28px_rgba(168,193,212,0.1)] backdrop-blur-sm"
                style={{ scrollMarginTop: "7rem" }}
                initial={reducedMotion ? undefined : { opacity: 0, y: 28 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.85,
                  delay: reducedMotion ? 0 : 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="flex items-start justify-between px-5 pt-5 pb-3">
                  <div>
                    <p className="text-[0.6rem] font-medium tracking-[0.3em] text-[#5a7a96] uppercase">
                      Sun Apr 5 · 5:00 PM
                    </p>
                    <h3 className="mt-1 font-heading text-[1.35rem] text-[#2d3750]">
                      Maleen Banquet Rooftop
                    </h3>
                    <p className="mt-0.5 text-xs text-[#4d5874]">Bellerose, New York · Wedding & Walima</p>
                  </div>
                  <a
                    href="https://maps.google.com/?q=Maleen+Banquet+Hall+Bellerose+NY"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 flex items-center gap-1.5 rounded-full border border-[#A8C1D4]/40 bg-[rgba(168,193,212,0.08)] px-3 py-1.5 text-[0.6rem] font-medium tracking-[0.15em] text-[#5a7fa3] uppercase transition hover:bg-[rgba(168,193,212,0.15)]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    Directions
                  </a>
                </div>
                <div className="overflow-hidden rounded-[16px] mx-3 mb-3 border border-[#A8C1D4]/20">
                  <iframe
                    title="Maleen Banquet Hall map"
                    src="https://www.google.com/maps?q=Maleen%20Banquet%20Hall%20Bellerose%20NY&z=15&output=embed"
                    className="h-[18rem] w-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </MotionConfig>
  )
}
