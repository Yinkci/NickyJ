"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

import nickyOne from "../myself/nicky.png";
import nickyTwo from "../myself/nicky2.png";
import nickyThree from "../myself/nicky3.png";

const TILE_IMAGES = {
  experience: nickyTwo,
  capabilities: nickyThree,
  collaboration: nickyOne,
  craft: nickyTwo,
  location:
    "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop",
  mindset:
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200&auto=format&fit=crop",
  default: nickyThree,
} as const;

type TileKey = keyof typeof TILE_IMAGES;

const technologies = ["Next.js", "React", "TypeScript", "Node", "WordPress", "APIs"];

function ProfileName({ desktop = false }: { desktop?: boolean }) {
  const size = desktop ? "text-4xl text-transparent" : "text-3xl text-(--foreground)";
  const gradient = desktop ? "bg-clip-text bg-linear-to-b from-(--foreground) to-(--muted) drop-shadow-sm" : "";

  return (
    <>
      <div className="flex flex-col items-center w-full pb-2">
        <div className={`flex justify-center font-black tracking-tighter leading-[1.1] ${size} ${gradient}`}>
          NICKY
        </div>
        <div className={`flex justify-center font-black tracking-tighter leading-[1.1] ${size} ${gradient}`}>
          JACOBO
        </div>
      </div>
      <div className="-mt-1 flex flex-col items-center gap-2">
        <div className="h-px w-12 bg-(--foreground)/20" />
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-(--muted) opacity-80">
          Full Stack Developer
        </span>
      </div>
    </>
  );
}

export function About() {
  const [activeTile, setActiveTile] = useState<TileKey | null>(null);
  const currentImage = activeTile ? TILE_IMAGES[activeTile] : TILE_IMAGES.default;

  const activate = (tile: TileKey) => () => setActiveTile(tile);
  const reset = () => setActiveTile(null);

  return (
    <section
      id="about"
      className="mx-auto max-w-5xl px-4 pb-32 pt-0"
      style={{ scrollMarginTop: "0px" }}
    >
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:grid-rows-[9rem_auto_9rem]">
        <article className="group relative col-span-1 row-span-1 h-full w-full overflow-hidden rounded-2xl border border-(--card-border) bg-linear-to-br from-(--card) to-(--card-border) p-6 md:hidden">
          <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-1 text-center">
            <ProfileName />
          </div>
        </article>

        <article className="group relative hidden col-span-1 row-span-1 h-full w-full overflow-hidden rounded-2xl border border-(--card-border) bg-linear-to-br from-(--card) to-(--card-border) p-7 backdrop-blur-md md:col-start-1 md:row-start-1 md:flex">
          <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
            <div className="h-full w-full scale-110 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0%,transparent_70%)] blur-3xl mix-blend-overlay" />
          </div>
          <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-1 text-center">
            <ProfileName desktop />
          </div>
        </article>

        <article className="relative col-span-1 row-span-1 aspect-square w-full overflow-hidden rounded-2xl border border-(--card-border) md:hidden">
          <Image
            src={nickyThree}
            alt="Nicky Jacobo"
            fill
            sizes="(max-width: 768px) 50vw"
            className="object-cover"
          />
        </article>

        <article className="group relative col-span-2 row-span-1 h-32 w-full overflow-hidden rounded-2xl border border-(--card-border) bg-linear-to-br from-(--card) to-(--card-border) [--y-mid:70px] [--y-side:60px] md:col-start-2 md:row-start-1 md:h-full md:[--y-mid:100px] md:[--y-side:100px]">
          <div className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:radial-gradient(circle,var(--foreground)_0.5px,transparent_0.5px)] [background-size:24px_24px]" />
          <div className="pointer-events-none absolute top-4 right-0 left-0 z-30 hidden justify-center transition-opacity duration-300 group-hover:opacity-0 md:flex">
            <span className="rounded-full border border-violet-500/10 bg-(--card)/50 px-3 py-1 text-[8px] font-medium uppercase tracking-[0.2em] text-violet-300/60 backdrop-blur-sm">
              Hover to read more
            </span>
          </div>

          <div className="relative z-10 flex h-full w-full items-end justify-center overflow-hidden rounded-2xl px-2">
            <article
              tabIndex={0}
              onMouseEnter={activate("experience")}
              onMouseLeave={reset}
              onFocus={activate("experience")}
              onBlur={reset}
              className="group/card relative z-10 -mr-6 flex h-44 w-1/3 flex-col justify-start overflow-hidden rounded-t-xl border border-b-0 border-(--foreground)/10 bg-(--card) p-3 pr-6 shadow-[0_-5px_30px_rgba(0,0,0,0.3)] transition-colors duration-200 hover:border-violet-400/50 hover:shadow-[0_-5px_35px_rgba(168,85,247,0.5)] md:p-4"
              style={{ transform: "translateY(var(--y-side))" }}
            >
              <div className="absolute top-0 right-1/4 left-1/4 h-px bg-linear-to-r from-transparent via-violet-400/50 to-transparent opacity-100 transition-opacity duration-300 md:opacity-0 md:group-hover/card:opacity-100" />
              <div className="relative z-10 mt-1">
                <span className="block text-[10px] font-bold leading-tight uppercase text-(--foreground) opacity-90">
                  Experience
                </span>
                <span className="mt-1.5 block text-[8px] leading-tight text-(--muted) opacity-70 sm:text-[9px] md:mt-2 md:text-[10px] md:opacity-50 md:transition-all md:group-hover/card:opacity-100">
                  Over 10 years building scalable web applications and digital systems.
                </span>
              </div>
            </article>

            <article
              tabIndex={0}
              onMouseEnter={activate("capabilities")}
              onMouseLeave={reset}
              onFocus={activate("capabilities")}
              onBlur={reset}
              className="group/card relative z-20 flex h-48 w-2/5 flex-col justify-start overflow-hidden rounded-t-xl border border-b-0 border-(--foreground)/10 bg-(--card) p-3 shadow-[0_-5px_30px_rgba(0,0,0,0.3)] transition-colors duration-200 hover:border-violet-400/50 hover:shadow-[0_-5px_35px_rgba(168,85,247,0.5)] md:p-5"
              style={{ transform: "translateY(var(--y-mid))" }}
            >
              <div className="absolute top-0 right-1/4 left-1/4 h-px bg-linear-to-r from-transparent via-violet-400/50 to-transparent opacity-100 transition-opacity duration-300 md:opacity-0 md:group-hover/card:opacity-100" />
              <div className="relative z-10 mt-2 text-center">
                <span className="mb-1 block text-[12px] font-black leading-none uppercase tracking-tight text-(--foreground)">
                  Capabilities
                </span>
                <span className="mt-1.5 block text-[8px] leading-tight text-(--muted) opacity-70 sm:text-[9px] md:mt-2 md:text-[10px] md:opacity-50 md:transition-all md:group-hover/card:opacity-100">
                  Frontend and backend development, WordPress solutions, APIs, and modern web systems.
                </span>
              </div>
            </article>

            <article
              tabIndex={0}
              onMouseEnter={activate("collaboration")}
              onMouseLeave={reset}
              onFocus={activate("collaboration")}
              onBlur={reset}
              className="group/card relative z-10 -ml-6 flex h-44 w-1/3 flex-col justify-start overflow-hidden rounded-t-xl border border-b-0 border-(--foreground)/10 bg-(--card) p-3 pl-6 text-right shadow-[0_-5px_30px_rgba(0,0,0,0.3)] transition-colors duration-200 hover:border-violet-400/50 hover:shadow-[0_-5px_35px_rgba(168,85,247,0.5)] md:p-4"
              style={{ transform: "translateY(var(--y-side))" }}
            >
              <div className="absolute top-0 right-1/4 left-1/4 h-px bg-linear-to-r from-transparent via-violet-400/50 to-transparent opacity-100 transition-opacity duration-300 md:opacity-0 md:group-hover/card:opacity-100" />
              <div className="relative z-10 mt-1">
                <span className="block text-[10px] font-bold leading-tight uppercase text-(--foreground) opacity-90">
                  Collaboration
                </span>
                <span className="mt-1.5 block text-[8px] leading-tight text-(--muted) opacity-70 sm:text-[9px] md:mt-2 md:text-[10px] md:opacity-50 md:transition-all md:group-hover/card:opacity-100">
                  Clear communication and dependable delivery from idea to release.
                </span>
              </div>
            </article>
          </div>
        </article>

        <article
          tabIndex={0}
          onMouseEnter={activate("craft")}
          onMouseLeave={reset}
          onFocus={activate("craft")}
          onBlur={reset}
          className="group col-span-1 row-span-2 flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl border border-(--card-border) bg-linear-to-br from-(--card) to-(--card-border) backdrop-blur-sm transition-all duration-200 hover:shadow-lg hover:shadow-violet-500/10 md:col-start-3 md:row-start-2"
        >
          <div className="flex flex-col gap-2 p-3 pb-0 md:p-3.5">
            <div>
              <h3 className="mb-1 text-xs font-bold text-(--foreground)">Craft</h3>
              <div className="h-0.5 w-8 rounded-full bg-violet-400/60" />
            </div>
            <div className="space-y-1.5">
              <p className="text-[10px] leading-tight text-(--muted)">
                Building scalable <strong>apps, websites, and automations</strong>.
              </p>
              <p className="hidden text-[10px] leading-tight text-(--muted) md:block">
                I help businesses choose and build technology that solves the problems that matter.
              </p>
            </div>
          </div>

          <div className="relative my-auto w-full border-y border-(--card-border)/50 bg-(--card-border)/30 py-2">
            <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-6 bg-linear-to-r from-(--card) to-transparent" />
            <div className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-6 bg-linear-to-l from-(--card) to-transparent" />
            <div className="flex select-none overflow-hidden">
              <div className="flex -translate-x-5 items-center gap-5 whitespace-nowrap pr-5">
                {technologies.concat(technologies).map((technology, index) => (
                  <span
                    key={`${technology}-${index}`}
                    className="font-mono text-[9px] font-medium uppercase tracking-wide text-(--muted) opacity-80 transition-opacity group-hover:opacity-100"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="p-3 pt-0 md:p-3.5">
            <p className="text-[8px] leading-tight text-(--muted) sm:text-[9px] md:text-[10px]">
              I&apos;ll find and deliver the best tech solution for your business.
            </p>
            <div className="mt-2 flex items-center gap-2">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              <span className="max-w-full text-center text-[8px] font-medium leading-tight text-(--foreground) opacity-80 sm:text-[9px]">
                Open to collaboration &amp; freelance
              </span>
            </div>
          </div>
        </article>

        <article
          tabIndex={0}
          onMouseEnter={activate("location")}
          onMouseLeave={reset}
          onFocus={activate("location")}
          onBlur={reset}
          className="group relative col-span-1 row-span-1 aspect-square h-full w-full overflow-hidden rounded-2xl border border-(--card-border) bg-(--card) backdrop-blur-sm transition-all duration-200 hover:shadow-lg hover:shadow-violet-500/10 md:col-start-2 md:row-start-3"
        >
          <div className="absolute inset-0 z-0">
            <Image
              src={TILE_IMAGES.location}
              alt="Map background"
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="scale-125 translate-y-4 object-cover grayscale opacity-50 mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-linear-to-t from-(--card) via-(--card)/70 to-transparent" />
          </div>
          <div className="absolute top-0 bottom-0 left-[58%] z-10 w-px bg-violet-400 shadow-[0_0_10px_rgba(168,85,247,0.6)]" />
          <div className="absolute right-0 bottom-0 left-0 z-20 flex w-full flex-col justify-end p-3">
            <span className="mb-1 block text-[22px] font-bold leading-[0.95] tracking-tighter text-(--foreground) sm:text-[26px] md:text-[30px] md:whitespace-nowrap">
              Remote,
              <br className="md:hidden" /> Worldwide
            </span>
            <div className="flex flex-col gap-0.5">
              <span className="font-mono text-[15px] leading-none tracking-tight text-(--muted) opacity-80">
                Available online
              </span>
              <div className="flex items-center gap-1">
                <span className="text-[15px] font-bold leading-none text-violet-400">-</span>
                <span className="font-mono text-[15px] leading-none tracking-tight text-violet-300 uppercase opacity-90">
                  Flexible hours
                </span>
              </div>
            </div>
          </div>
        </article>

        <article
          tabIndex={0}
          onMouseEnter={activate("mindset")}
          onMouseLeave={reset}
          onFocus={activate("mindset")}
          onBlur={reset}
          className="group relative col-span-1 row-span-2 flex h-full w-full flex-col overflow-hidden rounded-2xl border border-(--card-border) bg-linear-to-br from-(--card) to-(--card-border) backdrop-blur-sm transition-all duration-200 hover:shadow-lg hover:shadow-violet-500/10 md:col-start-1 md:row-start-2"
        >
          <div className="z-20 flex shrink-0 flex-col gap-2 p-3 pb-2 md:p-3.5 md:pb-0">
            <div>
              <h3 className="mb-1 text-xs font-bold text-(--foreground)">Mindset</h3>
              <div className="h-0.5 w-8 rounded-full bg-violet-400/60" />
            </div>
            <p className="text-[9px] leading-tight text-(--muted) sm:text-[10px]">
              <strong>Building more than software.</strong> Curiosity and consistent improvement
              provide the focus needed to grow.
            </p>
          </div>

          <div className="relative flex flex-1 items-center justify-center overflow-hidden px-2 pb-3 md:pb-0">
            <div className="relative flex h-full w-full items-center justify-center [perspective:1000px]">
              <div className="absolute z-10 w-[45%] aspect-[3/4] -translate-x-[55%] scale-70 rotate-y-[25deg] overflow-hidden rounded-xl border border-(--card-border)/50 opacity-50 shadow-lg blur-[1px] grayscale-30 md:w-[42%] md:rounded-2xl">
                <Image src={nickyOne} alt="Nicky Jacobo" fill sizes="(max-width: 768px) 25vw, 18vw" className="object-cover" />
              </div>
              <div className="relative z-20 w-[55%] aspect-[3/4] overflow-hidden rounded-xl border-2 border-violet-400/30 shadow-2xl md:w-[50%] md:rounded-2xl">
                <Image src={TILE_IMAGES.mindset} alt="Focused work" fill sizes="(max-width: 768px) 40vw, 25vw" className="object-cover" />
                <div className="absolute right-0 bottom-0 left-0 bg-linear-to-t from-black/70 via-black/30 to-transparent p-1 pt-6 md:p-3 md:pt-8">
                  <span className="text-[8px] font-bold uppercase tracking-wider text-white md:text-xs">Keep growing</span>
                </div>
                <div className="pointer-events-none absolute inset-0 bg-linear-to-tr from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
              <div className="absolute z-10 w-[45%] aspect-[3/4] translate-x-[55%] scale-70 -rotate-y-[25deg] overflow-hidden rounded-xl border border-(--card-border)/50 opacity-50 shadow-lg blur-[1px] grayscale-30 md:w-[42%] md:rounded-2xl">
                <Image src={nickyTwo} alt="Nicky Jacobo" fill sizes="(max-width: 768px) 25vw, 18vw" className="object-cover" />
              </div>
            </div>
          </div>

          <div className="z-20 hidden shrink-0 border-t border-(--card-border)/30 p-3 pt-0 md:block md:p-3.5 md:pt-0">
            <p className="text-[9px] leading-tight text-(--muted) sm:text-[10px]">
              <strong>Discipline and care</strong> are how good work becomes dependable work.
            </p>
          </div>
        </article>

        <article className="relative col-span-1 row-span-1 aspect-square w-full overflow-hidden rounded-2xl border border-(--card-border) md:hidden">
          <Image src={nickyOne} alt="Nicky Jacobo" fill sizes="(max-width: 768px) 50vw" className="object-cover" />
        </article>

        <article className="relative hidden col-start-2 row-start-2 aspect-square h-full w-full overflow-hidden rounded-2xl border border-(--card-border) bg-black md:block">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTile ?? "default"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="absolute inset-0 z-0"
            >
              <Image
                src={currentImage}
                alt="Nicky Jacobo"
                fill
                priority
                sizes="(min-width: 768px) 33vw"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
          <div className="pointer-events-none absolute inset-0 z-10 bg-black/10" />
        </article>
      </div>
    </section>
  );
}
