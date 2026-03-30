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
    title: "Mehendi Night",
    label: "First Celebration",
    date: "Friday, April 3rd",
    time: "Evening",
    venue: "Rockaway Beach",
    note: "Friday, April 3rd at Rockaway Beach.",
  },
  {
    title: "Gaye Holud",
    label: "Day Gathering",
    date: "Saturday, April 4th",
    time: "3:00 PM",
    venue: "Rockaway Beach",
    note: "Saturday, April 4th at 3:00 PM at Rockaway Beach",
  },
  {
    title: "The Wedding",
    label: "Main Ceremony",
    date: "Sunday, April 5th",
    time: "5:00 PM",
    venue: "Maleen Banquet Hall, Bellerose, NY",
    note: "Sunday, April 5th at 5:00 PM at Maleen Banquet Hall in Bellerose, New York.",
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
  onReveal: () => void
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
  reducedMotion,
}: EventCardProps) {
  return (
    <motion.article
      className="group relative flex h-full flex-col overflow-hidden rounded-[30px] border border-[#DFD3CE]/60 bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(223,211,206,0.18)_100%)] p-6 shadow-[0_18px_48px_rgba(168,193,212,0.1)] backdrop-blur-sm sm:p-7"
      initial={reducedMotion ? undefined : { opacity: 0, y: 36 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      whileHover={reducedMotion ? undefined : { y: -6 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{
        duration: 0.8,
        delay: reducedMotion ? 0 : index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="pointer-events-none absolute inset-[10px] rounded-[24px] border border-white/80" />
      <div className="pointer-events-none absolute top-0 right-0 h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.78)_0%,rgba(255,255,255,0)_72%)] opacity-80" />

      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <span className="inline-flex rounded-full border border-[#DFD3CE]/50 bg-[#DFD3CE]/12 px-3 py-1.5 text-[0.62rem] tracking-[0.3em] text-[#A8C1D4] uppercase">
            Wedding Event
          </span>
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#DFD3CE]/55 bg-white/75 text-[0.95rem] font-semibold text-[#c5a36e] shadow-[0_10px_24px_rgba(168,193,212,0.08)]">
            0{index + 1}
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-[0.68rem] tracking-[0.34em] text-[#A8C1D4] uppercase">
            {label}
          </p>
          <h3 className="mt-3 font-heading text-[2.15rem] leading-[1] text-[#394355] sm:text-[2.35rem]">
            {title}
          </h3>
          <div className="mx-auto mt-4 h-px w-20 bg-gradient-to-r from-transparent via-[#d7b87e]/70 to-transparent" />
        </div>

        <div className="mt-7 space-y-3 rounded-[22px] border border-[#DFD3CE]/55 bg-white/68 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
          <div className="flex items-start justify-between gap-4 border-b border-[#DFD3CE]/70 pb-3">
            <p className="text-[0.68rem] tracking-[0.28em] text-[#A8C1D4] uppercase">
              Date
            </p>
            <p className="text-right text-[1.02rem] leading-snug text-[#4b5562] sm:text-[1.08rem]">
              {date}
            </p>
          </div>
          <div className="flex items-start justify-between gap-4 border-b border-[#DFD3CE]/70 pb-3">
            <p className="text-[0.68rem] tracking-[0.28em] text-[#A8C1D4] uppercase">
              Time
            </p>
            <p className="text-right text-[1.02rem] leading-snug text-[#4b5562] sm:text-[1.08rem]">
              {time}
            </p>
          </div>
          <div className="flex items-start justify-between gap-4">
            <p className="text-[0.68rem] tracking-[0.28em] text-[#c5a36e] uppercase">
              Venue
            </p>
            <p className="text-right font-heading text-[1.35rem] leading-tight text-[#455066] sm:text-[1.5rem]">
              {venue}
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-[20px] bg-[#DFD3CE]/14 px-5 py-4 text-center">
          <p className="text-[0.96rem] leading-7 text-[#66727a] sm:text-base">
            {note}
          </p>
        </div>
      </div>
    </motion.article>
  )
}

function DecorativeCardFrame({ dark = false }: DecorativeCardFrameProps) {
  const primaryStroke = dark
    ? "rgba(211, 181, 123, 0.5)"
    : "rgba(211, 181, 123, 0.55)"
  const secondaryStroke = dark
    ? "rgba(168, 193, 212, 0.28)"
    : "rgba(223, 211, 206, 0.44)"
  const accentFill = dark
    ? "rgba(211, 181, 123, 0.72)"
    : "rgba(211, 181, 123, 0.68)"

  return (
    <>
      <div
        className="pointer-events-none absolute inset-3 sm:inset-4"
        style={{
          border: dark
            ? "1px solid rgba(211, 181, 123, 0.22)"
            : "1px solid rgba(211, 181, 123, 0.28)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-5 sm:inset-6"
        style={{
          border: dark
            ? "1px solid rgba(168, 193, 212, 0.2)"
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
            ? "radial-gradient(ellipse 80% 50% at 25% 15%, rgba(255,255,255,0.14) 0%, transparent 60%)"
            : "radial-gradient(ellipse 80% 50% at 25% 15%, rgba(255,255,255,0.7) 0%, transparent 60%)",
        }}
      />
    </>
  )
}

function InvitationHeroCard({
  isRevealed,
  onReveal,
  onKeyDown,
  reducedMotion,
}: InvitationHeroCardProps) {
  return (
    <div className="relative flex w-full max-w-[22rem] items-center justify-center py-20 [perspective:2400px] sm:max-w-[28rem] md:max-w-[34rem] md:py-28 lg:max-w-[38rem]">
      <motion.div
        initial={
          reducedMotion ? undefined : { opacity: 0, scale: 0.78, x: 52, y: -36 }
        }
        animate={{
          opacity: isRevealed ? 0 : 1,
          scale: isRevealed ? 0.92 : 1,
          x: isRevealed ? 36 : 0,
          y: isRevealed ? -24 : 0,
          rotate: isRevealed ? -8 : 0,
        }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute -top-6 -right-12 z-30 w-40 md:-top-10 md:-right-24 md:w-64 lg:w-72"
      >
        <Image
          src={topRightRose}
          alt=""
          priority
          sizes="(max-width: 768px) 10rem, 18rem"
          className="h-auto w-full object-contain drop-shadow-[0_24px_36px_rgba(180,149,176,0.18)]"
        />
      </motion.div>

      <motion.div
        initial={
          reducedMotion ? undefined : { opacity: 0, scale: 0.78, x: -56, y: 44 }
        }
        animate={{
          opacity: isRevealed ? 0 : 1,
          scale: isRevealed ? 0.92 : 1,
          x: isRevealed ? -40 : 0,
          y: isRevealed ? 28 : 0,
          rotate: isRevealed ? 8 : 0,
        }}
        transition={{
          duration: 0.7,
          delay: reducedMotion ? 0 : 0.08,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="pointer-events-none absolute -bottom-8 -left-16 z-30 w-48 md:-bottom-14 md:-left-28 md:w-72 lg:w-80"
      >
        <Image
          src={bottomLeftRoses}
          alt=""
          priority
          sizes="(max-width: 768px) 12rem, 20rem"
          className="h-auto w-full object-contain drop-shadow-[0_30px_40px_rgba(154,177,211,0.16)]"
        />
      </motion.div>

      <motion.div
        className="relative z-10 w-full"
        onClick={!isRevealed ? onReveal : undefined}
        onKeyDown={onKeyDown}
        role={isRevealed ? undefined : "button"}
        tabIndex={isRevealed ? -1 : 0}
        aria-expanded={isRevealed}
        aria-label={isRevealed ? "Invitation opened" : "Open invitation"}
        initial={reducedMotion ? undefined : { scale: 0.92, opacity: 0, y: 36 }}
        animate={reducedMotion ? undefined : { scale: 1, opacity: 1, y: 0 }}
        whileHover={
          reducedMotion || isRevealed
            ? undefined
            : {
                scale: 1.02,
                y: -6,
                transition: { duration: 0.45, ease: "easeOut" },
              }
        }
        whileTap={reducedMotion || isRevealed ? undefined : { scale: 0.985 }}
        transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="relative w-full cursor-pointer overflow-hidden rounded-[6px] [transform-style:preserve-3d]"
          style={{
            aspectRatio: "3 / 4.15",
            boxShadow: `
              0 2px 4px rgba(168, 193, 212, 0.04),
              0 8px 16px rgba(168, 193, 212, 0.06),
              0 25px 60px -12px rgba(168, 193, 212, 0.12),
              0 50px 100px -30px rgba(223, 211, 206, 0.18),
              inset 0 1px 1px rgba(255, 255, 255, 0.9),
              inset 0 -1px 1px rgba(223, 211, 206, 0.18)
            `,
          }}
        >
          <motion.div
            className="absolute inset-0 overflow-hidden bg-[linear-gradient(175deg,#fffdfd_0%,rgba(223,211,206,0.18)_18%,rgba(255,255,255,0.96)_52%,rgba(168,193,212,0.16)_82%,#fffdfd_100%)] p-8 sm:p-10"
            style={cardFaceStyle}
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
            <DecorativeCardFrame />
            <div className="pointer-events-none absolute right-6 bottom-6 left-6 h-24 rounded-[28px] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.7)_0%,rgba(255,255,255,0)_72%)] opacity-80 sm:right-10 sm:bottom-10 sm:left-10" />

            <div className="absolute inset-0 flex items-center justify-center p-8 text-center sm:p-10">
              <div className="mx-auto flex w-full max-w-[16rem] flex-col items-center justify-center sm:max-w-[20rem]">
                <p className="mb-6 text-[10px] font-medium tracking-[0.4em] text-[#a6849b] uppercase sm:text-xs">
                  A Special Invitation
                </p>

                <div className="mb-6 flex items-center justify-center gap-3">
                  <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#d5b06f] to-transparent opacity-70" />
                  <div className="h-1.5 w-1.5 rotate-45 border border-[#d5b06f]/50 bg-white/60" />
                  <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#d5b06f] to-transparent opacity-70" />
                </div>

                <motion.h2
                  className="font-heading text-4xl leading-tight text-[#515c77] sm:text-5xl md:text-6xl"
                  animate={reducedMotion ? undefined : { scale: [1, 1.01, 1] }}
                  transition={{
                    duration: 4.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  You&apos;re Invited
                </motion.h2>

                <div className="mt-6 mb-8 flex items-center justify-center gap-3">
                  <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#A8C1D4] to-transparent opacity-75" />
                  <div className="h-1.5 w-1.5 rotate-45 border border-[#d5b06f]/45 bg-[#DFD3CE]/70" />
                  <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#DFD3CE] to-transparent opacity-75" />
                </div>

                <motion.p
                  className="text-[10px] font-medium tracking-[0.48em] text-[#A8C1D4] uppercase sm:text-xs"
                  animate={
                    reducedMotion ? undefined : { opacity: [0.55, 1, 0.55] }
                  }
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  Tap to Open
                </motion.p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute inset-0 overflow-hidden bg-[linear-gradient(175deg,#fffefe_0%,rgba(223,211,206,0.34)_18%,rgba(255,255,255,0.99)_56%,rgba(168,193,212,0.24)_82%,#fffefe_100%)] p-8 text-[#39445a] sm:bg-[linear-gradient(175deg,#fffdfd_0%,rgba(223,211,206,0.18)_18%,rgba(255,255,255,0.96)_52%,rgba(168,193,212,0.16)_82%,#fffdfd_100%)] sm:p-10"
            style={{
              ...cardFaceStyle,
              transform: "rotateY(-180deg)",
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
            <DecorativeCardFrame dark />
            <div className="pointer-events-none absolute inset-[14px] rounded-[18px] bg-white/32 sm:hidden" />
            <div className="pointer-events-none absolute inset-x-8 bottom-8 h-28 rounded-[32px] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.72)_0%,rgba(255,255,255,0)_72%)] opacity-80 sm:inset-x-10 sm:bottom-10" />

            <motion.div
              className="absolute inset-0 z-10 flex flex-col items-center justify-center p-8 text-center sm:p-10"
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
              <div className="mx-auto flex w-full max-w-[17rem] flex-col items-center px-2 py-3 text-center sm:max-w-[27rem]">
                <motion.p
                  className="text-[10px] font-medium tracking-[0.34em] text-[#A8C1D4] uppercase sm:text-xs"
                  initial={reducedMotion ? undefined : { opacity: 0, y: 8 }}
                  animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ delay: reducedMotion ? 0 : 0.14 }}
                >
                  Wedding Invitation
                </motion.p>

                <motion.div
                  className="my-5 flex items-center justify-center gap-3"
                  initial={
                    reducedMotion ? undefined : { scaleX: 0, opacity: 0 }
                  }
                  animate={
                    reducedMotion ? undefined : { scaleX: 1, opacity: 1 }
                  }
                  transition={{
                    delay: reducedMotion ? 0 : 0.22,
                    duration: 0.4,
                  }}
                >
                  <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#d5b06f] opacity-60" />
                  <div className="h-1 w-1 rotate-45 bg-[#d5b06f]/45" />
                  <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#d5b06f] opacity-60" />
                </motion.div>

                <motion.p
                  className="max-w-[20rem] text-sm leading-6 text-[#66727a] sm:text-base sm:leading-7"
                  initial={reducedMotion ? undefined : { opacity: 0, y: 8 }}
                  animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ delay: reducedMotion ? 0 : 0.3 }}
                >
                  Together with their families, request the pleasure of your
                  company as they celebrate their marriage.
                </motion.p>

                <motion.div
                  className="mt-6 flex w-full flex-col items-center space-y-1"
                  initial={reducedMotion ? undefined : { opacity: 0, y: 10 }}
                  animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{
                    delay: reducedMotion ? 0 : 0.38,
                    duration: 0.45,
                  }}
                >
                  <h1 className="font-heading text-[2.65rem] leading-[0.95] text-[#4f5961] sm:text-[3.5rem] md:text-[4.1rem]">
                    Mohian Islam Protik
                  </h1>
                  <p
                    className="text-[2rem] leading-none text-[#d2ae73] sm:text-[2.6rem]"
                    style={{ fontFamily: "var(--font-script)" }}
                  >
                    &
                  </p>
                  <h1 className="font-heading text-[2.55rem] leading-[0.95] text-[#4f5961] sm:text-[3.45rem] md:text-[4.05rem]">
                    Lamia Zaman
                  </h1>
                </motion.div>

                <motion.p
                  className="mt-5 max-w-[18rem] text-sm leading-6 text-[#66727a] sm:text-base"
                  initial={reducedMotion ? undefined : { opacity: 0 }}
                  animate={reducedMotion ? undefined : { opacity: 1 }}
                  transition={{ delay: reducedMotion ? 0 : 0.5 }}
                >
                  Join us for Mehendi Night, Gaye Holud, and the wedding
                  celebration.
                </motion.p>

                <motion.div
                  className="mt-6 w-full max-w-[230px] pt-4"
                  style={{ borderTop: "1px solid rgba(213, 176, 111, 0.3)" }}
                  initial={reducedMotion ? undefined : { opacity: 0, y: 8 }}
                  animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ delay: reducedMotion ? 0 : 0.64 }}
                >
                  <p className="text-[11px] font-semibold tracking-[0.22em] text-[#d2ae73] uppercase sm:text-xs">
                    April 3rd to April 5th
                  </p>
                  <p className="mt-1 text-[10px] tracking-[0.18em] text-[#A8C1D4] uppercase sm:text-[11px]">
                    Rockaway Beach and Maleen Banquet Hall
                  </p>
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

  const openInvitation = () => {
    if (isOpen) {
      return
    }

    startTransition(() => {
      setIsOpen(true)
    })
  }

  const handleCardKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return
    }

    event.preventDefault()
    openInvitation()
  }

  return (
    <MotionConfig reducedMotion="user">
      <main className="relative overflow-x-hidden bg-[#fffcfb] text-[#384355]">
        <motion.div
          className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-gradient-to-r from-[#d7b57a] via-[#DFD3CE] to-[#A8C1D4]"
          style={{ scaleX: progressScaleX }}
        />

        <div className="pointer-events-none fixed inset-0 -z-20 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.82),transparent_28%),radial-gradient(circle_at_18%_18%,rgba(223,211,206,0.42),transparent_34%),radial-gradient(circle_at_82%_12%,rgba(168,193,212,0.34),transparent_30%),linear-gradient(180deg,#fffafc_0%,rgba(223,211,206,0.12)_44%,rgba(168,193,212,0.1)_100%)]" />
        <div className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(120deg,rgba(255,255,255,0.14)_0%,transparent_32%,rgba(255,255,255,0.08)_58%,transparent_100%)]" />

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
              opacity: isOpen ? 0.82 : 0,
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
              className="h-auto w-full object-contain opacity-80 mix-blend-multiply select-none"
            />
          </motion.div>

          <motion.div
            aria-hidden
            className="pointer-events-none absolute top-0 right-0 z-0 w-[7.5rem] sm:w-[11rem] md:w-[15rem] lg:w-[18rem]"
            style={{ y: rightRoseY }}
            initial={false}
            animate={{
              opacity: isOpen ? 0.88 : 0,
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
              className="h-auto w-full object-contain opacity-85 mix-blend-multiply select-none"
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
                  ? { opacity: 0.45 }
                  : {
                      y: [0, -18, 0],
                      scale: [1, 1.08, 1],
                      opacity: [0.3, 0.6, 0.3],
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
              onReveal={openInvitation}
              onKeyDown={handleCardKeyDown}
              reducedMotion={reducedMotion}
            />

            <AnimatePresence mode="wait">
              {!isOpen ? (
                <motion.p
                  key="closed"
                  className="text-center text-[0.72rem] font-bold tracking-[0.34em] text-[#A8C1D4] uppercase sm:text-sm"
                  initial={reducedMotion ? undefined : { opacity: 0, y: 10 }}
                  animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                  exit={reducedMotion ? undefined : { opacity: 0, y: -10 }}
                >
                  Click the card to reveal the celebration
                </motion.p>
              ) : (
                <motion.p
                  key="opened"
                  className="text-center text-[0.72rem] tracking-[0.34em] text-[#A8C1D4] uppercase sm:text-sm"
                  initial={reducedMotion ? undefined : { opacity: 0, y: 10 }}
                  animate={
                    reducedMotion
                      ? undefined
                      : { opacity: [0.7, 1, 0.7], y: [0, 4, 0] }
                  }
                  exit={reducedMotion ? undefined : { opacity: 0, y: -10 }}
                  transition={{
                    duration: 1.9,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  Invitation opened. Scroll down for the full schedule and maps.
                </motion.p>
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
              <div className="rounded-[34px] border border-white/60 bg-[linear-gradient(180deg,rgba(255,251,253,0.88),rgba(223,211,206,0.2),rgba(168,193,212,0.12))] p-8 shadow-[0_24px_60px_rgba(168,193,212,0.1)] backdrop-blur-sm sm:p-10">
                <p className="text-xs font-medium tracking-[0.34em] text-[#A8C1D4] uppercase">
                  Mohian Islam Protik and Lamia Zaman
                </p>
                <h2 className="mt-4 font-heading text-[2.5rem] leading-tight text-[#4d5874] sm:text-[3.5rem]">
                  We would love your presence across each part of our wedding
                  celebrations.
                </h2>
                <p className="mt-6 max-w-2xl text-base leading-8 text-[#767f93]">
                  The celebration begins at Rockaway Beach for Mehendi Night and
                  Gaye Holud, then continues to Maleen Banquet Hall in
                  Bellerose, New York for the wedding. Everything you need is
                  below.
                </p>
              </div>

              <motion.div
                className="relative overflow-hidden rounded-[34px] border border-[#DFD3CE]/28 bg-[linear-gradient(180deg,rgba(255,250,252,0.96),rgba(223,211,206,0.16),rgba(168,193,212,0.14))] p-8 shadow-[0_24px_60px_rgba(168,193,212,0.1)]"
                initial={
                  reducedMotion ? undefined : { opacity: 0, scale: 0.96 }
                }
                whileInView={
                  reducedMotion ? undefined : { opacity: 1, scale: 1 }
                }
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#d5b06f]/55 to-transparent" />
                <p className="text-xs font-medium tracking-[0.34em] text-[#A8C1D4] uppercase">
                  Quick Guide
                </p>
                <div className="mt-6 space-y-5">
                  <div>
                    <p className="text-sm tracking-[0.22em] text-[#A8C1D4] uppercase">
                      Friday, April 3rd
                    </p>
                    <p className="mt-2 font-heading text-[2rem] text-[#4d5874]">
                      Mehendi Night
                    </p>
                    <p className="text-base text-[#77839c]">Rockaway Beach</p>
                  </div>
                  <div className="h-px w-full bg-[#DFD3CE]/60" />
                  <div>
                    <p className="text-sm tracking-[0.22em] text-[#A8C1D4] uppercase">
                      Saturday, April 4th | 3:00 PM
                    </p>
                    <p className="mt-2 font-heading text-[2rem] text-[#4d5874]">
                      Gaye Holud
                    </p>
                    <p className="text-base text-[#77839c]">Rockaway Beach</p>
                  </div>
                  <div className="h-px w-full bg-[#A8C1D4]/50" />
                  <div>
                    <p className="text-sm tracking-[0.22em] text-[#d0ad72] uppercase">
                      Sunday, April 5th | 5:00 PM
                    </p>
                    <p className="mt-2 font-heading text-[2rem] text-[#4d5874]">
                      The Wedding
                    </p>
                    <p className="text-base text-[#77839c]">
                      Maleen Banquet Hall, Bellerose, NY
                    </p>
                  </div>
                </div>
              </motion.div>
            </Reveal>

            <Reveal reducedMotion={reducedMotion}>
              <div className="max-w-3xl">
                <p className="text-xs font-medium tracking-[0.34em] text-[#A8C1D4] uppercase">
                  Event Schedule
                </p>
                <h2 className="mt-4 font-heading text-[2.5rem] leading-tight text-[#4d5874] sm:text-[3.5rem]">
                  The flow of the celebration
                </h2>
              </div>
            </Reveal>

            <div className="grid gap-6 md:grid-cols-3">
              {EVENTS.map((event, index) => (
                <EventCard
                  key={event.title}
                  index={index}
                  reducedMotion={reducedMotion}
                  {...event}
                />
              ))}
            </div>

            <Reveal
              reducedMotion={reducedMotion}
              className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]"
            >
              <div className="rounded-[34px] border border-[#DFD3CE]/28 bg-[linear-gradient(155deg,#A8C1D4_0%,rgba(168,193,212,0.92)_46%,#DFD3CE_100%)] p-8 text-white shadow-[0_24px_60px_rgba(168,193,212,0.18)] sm:p-10">
                <p className="text-xs font-medium tracking-[0.34em] text-[#fff3f8] uppercase">
                  Venue Guide
                </p>
                <h2 className="mt-4 font-heading text-[2.5rem] leading-tight sm:text-[3.3rem]">
                  Directions and shared location
                </h2>
                <p className="mt-6 text-base leading-8 text-white/78">
                  Use the embedded maps below for a quick view, and keep the
                  shared Google Maps pin handy for arrival.
                </p>
                <a
                  href="https://maps.app.goo.gl/qNpLNXT4oTg6sqdi9?g_st=ic"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex rounded-full border border-[#e3c88f]/45 bg-white/12 px-6 py-3 text-sm font-medium tracking-[0.24em] text-[#fff8ee] uppercase transition hover:bg-white/18"
                >
                  Open Shared Pin
                </a>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <motion.div
                  className="rounded-[28px] border border-white/60 bg-[linear-gradient(180deg,rgba(255,251,253,0.92),rgba(223,211,206,0.16),rgba(168,193,212,0.12))] p-6 shadow-[0_24px_60px_rgba(168,193,212,0.1)] backdrop-blur-sm"
                  initial={reducedMotion ? undefined : { opacity: 0, x: 32 }}
                  whileInView={reducedMotion ? undefined : { opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="text-xs font-medium tracking-[0.34em] text-[#A8C1D4] uppercase">
                    Beach Venue
                  </p>
                  <p className="mt-3 font-heading text-[2rem] text-[#4d5874]">
                    Rockaway Beach
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[#77839c]">
                    Mehendi Night and Gaye Holud take place here.
                  </p>
                </motion.div>

                <motion.div
                  className="rounded-[28px] border border-white/60 bg-[linear-gradient(180deg,rgba(255,251,253,0.92),rgba(223,211,206,0.16),rgba(168,193,212,0.12))] p-6 shadow-[0_24px_60px_rgba(168,193,212,0.1)] backdrop-blur-sm"
                  initial={reducedMotion ? undefined : { opacity: 0, x: 32 }}
                  whileInView={reducedMotion ? undefined : { opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{
                    duration: 0.75,
                    delay: reducedMotion ? 0 : 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <p className="text-xs font-medium tracking-[0.34em] text-[#A8C1D4] uppercase">
                    Wedding Venue
                  </p>
                  <p className="mt-3 font-heading text-[2rem] text-[#4d5874]">
                    Maleen Banquet Hall
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[#77839c]">
                    The wedding begins here on Sunday, April 5th at 5:00 PM in
                    Bellerose, New York.
                  </p>
                </motion.div>
              </div>
            </Reveal>

            <div className="grid gap-6 lg:grid-cols-2">
              <motion.div
                className="overflow-hidden rounded-[32px] border border-white/60 bg-[linear-gradient(180deg,rgba(255,251,253,0.92),rgba(223,211,206,0.16),rgba(168,193,212,0.12))] p-4 shadow-[0_24px_60px_rgba(168,193,212,0.1)] backdrop-blur-sm"
                initial={reducedMotion ? undefined : { opacity: 0, y: 28 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                whileHover={reducedMotion ? undefined : { y: -6 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="mb-4 px-3 pt-3">
                  <p className="text-xs font-medium tracking-[0.34em] text-[#A8C1D4] uppercase">
                    Rockaway Beach
                  </p>
                  <h3 className="mt-2 font-heading text-[2rem] text-[#4d5874]">
                    Mehendi Night and Gaye Holud
                  </h3>
                </div>
                <div className="overflow-hidden rounded-[24px] border border-[#DFD3CE]/40">
                  <iframe
                    title="Rockaway Beach map"
                    src="https://www.google.com/maps?q=Rockaway%20Beach&z=14&output=embed"
                    className="h-[22rem] w-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
              </motion.div>

              <motion.div
                className="overflow-hidden rounded-[32px] border border-white/60 bg-[linear-gradient(180deg,rgba(255,251,253,0.92),rgba(223,211,206,0.16),rgba(168,193,212,0.12))] p-4 shadow-[0_24px_60px_rgba(168,193,212,0.1)] backdrop-blur-sm"
                initial={reducedMotion ? undefined : { opacity: 0, y: 28 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                whileHover={reducedMotion ? undefined : { y: -6 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.85,
                  delay: reducedMotion ? 0 : 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="mb-4 px-3 pt-3">
                  <p className="text-xs font-medium tracking-[0.34em] text-[#A8C1D4] uppercase">
                    Maleen Banquet Hall
                  </p>
                  <h3 className="mt-2 font-heading text-[2rem] text-[#4d5874]">
                    Wedding Ceremony
                  </h3>
                </div>
                <div className="overflow-hidden rounded-[24px] border border-[#A8C1D4]/35">
                  <iframe
                    title="Maleen Banquet Hall map"
                    src="https://www.google.com/maps?q=Maleen%20Banquet%20Hall%20Bellerose%20NY&z=15&output=embed"
                    className="h-[22rem] w-full"
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
