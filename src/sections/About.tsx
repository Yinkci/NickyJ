"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Briefcase, Layers, MapPin, MessageSquare, Sparkles } from "lucide-react";
import { useState } from "react";

import nickyOne from "../myself/nicky.png";
import nickyTwo from "../myself/nicky2.png";
import nickyThree from "../myself/nicky3.png";

const MAP_IMAGE =
  "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop";

const SPOTLIGHTS = {
  default: { image: nickyThree, label: "Nicky Jacobo", note: "Full Stack Developer" },
  experience: { image: nickyTwo, label: "10+ years", note: "Shipping production systems" },
  capabilities: { image: nickyThree, label: "Full stack", note: "Frontend, backend, APIs" },
  collaboration: { image: nickyOne, label: "Collaboration", note: "Clear and dependable" },
  craft: { image: nickyTwo, label: "Craft", note: "Built to last" },
  location: { image: MAP_IMAGE, label: "Remote", note: "Worldwide, flexible hours" },
};

type SpotlightKey = keyof typeof SPOTLIGHTS;

const technologies = ["Next.js", "React", "TypeScript", "Node", "WordPress", "APIs", "Tailwind"];

const cards = [
  {
    key: "experience" as const,
    icon: Briefcase,
    title: "Experience",
    body: "Over 10 years building scalable web applications and digital systems across industries.",
  },
  {
    key: "capabilities" as const,
    icon: Layers,
    title: "Capabilities",
    body: "Frontend and backend development, WordPress solutions, REST APIs, and modern web systems.",
  },
  {
    key: "collaboration" as const,
    icon: MessageSquare,
    title: "Collaboration",
    body: "Clear communication and dependable delivery, from first idea through to release.",
  },
];

const cardShell =
  "group relative overflow-hidden rounded-2xl border border-(--card-border) bg-linear-to-br from-(--card) to-(--card-border) transition-colors duration-300 hover:border-violet-400/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400";

const reveal = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
};

export function About() {
  const [active, setActive] = useState<SpotlightKey>("default");
  const spotlight = SPOTLIGHTS[active];

  const spotlightOn = (key: SpotlightKey) => ({
    tabIndex: 0,
    onMouseEnter: () => setActive(key),
    onMouseLeave: () => setActive("default"),
    onFocus: () => setActive(key),
    onBlur: () => setActive("default"),
  });

  return (
    <section
      id="about"
      className="relative overflow-hidden pt-0 pb-28 sm:pb-32"
      style={{ scrollMarginTop: "120px" }}
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/3 -left-32 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      <div className="section">
        <motion.div {...reveal} transition={{ duration: 0.5 }} className="mb-12 text-center sm:mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-(--accent) sm:text-base">
            About me
          </span>
          <h2 className="mt-3 px-2 text-3xl font-bold tracking-tight text-pretty sm:text-5xl md:text-6xl">
            Behind the <span className="text-gradient-shimmer">Code</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl px-2 text-base font-light leading-relaxed text-(--muted) sm:text-lg">
            A quick look at how I work, what I build, and where I do it from.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {/* Intro */}
          <motion.article
            {...reveal}
            transition={{ duration: 0.5 }}
            className={`${cardShell} flex flex-col justify-between p-6 sm:col-span-2 sm:p-8 lg:col-span-4`}
          >
            <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:radial-gradient(circle,var(--foreground)_0.5px,transparent_0.5px)] [background-size:22px_22px]" />

            <div className="relative z-10">
              <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-violet-300/80">
                Who I am
              </span>
              <h3 className="mt-3 text-3xl font-black leading-none tracking-tighter sm:text-4xl">
                Nicky <span className="text-gradient-shimmer">Jacobo</span>
              </h3>
              <div className="mt-4 h-px w-14 bg-(--foreground)/15" />
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-(--muted) sm:text-base">
                I turn business problems into software that holds up in production &mdash; web
                apps, WordPress platforms, APIs, and automations. Ten years in, the part I still
                enjoy most is picking the right solution rather than the fashionable one.
              </p>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-(--muted) sm:text-base">
                Curiosity keeps the work interesting; discipline and care are what make it
                dependable.
              </p>
            </div>

            <div className="relative z-10 mt-7 flex items-center gap-2.5">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
              </span>
              <span className="text-xs font-medium text-(--foreground)/85 sm:text-sm">
                Open to collaboration &amp; freelance
              </span>
            </div>
          </motion.article>

          {/* Reactive portrait */}
          <motion.article
            {...reveal}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-(--card-border) bg-black sm:col-span-2 sm:aspect-[16/10] lg:col-span-2 lg:row-span-2 lg:aspect-auto lg:h-full"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={spotlight.image}
                  alt={spotlight.label}
                  fill
                  priority
                  sizes="(max-width: 1023px) 100vw, 33vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-black/85 via-black/35 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 z-10 p-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <p className="text-lg font-semibold leading-tight text-white">
                    {spotlight.label}
                  </p>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-white/65">
                    {spotlight.note}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.article>

          {/* Experience / Capabilities / Collaboration */}
          {cards.map((card, index) => (
            <motion.article
              key={card.key}
              {...reveal}
              transition={{ duration: 0.5, delay: 0.12 + index * 0.06 }}
              {...spotlightOn(card.key)}
              className={`${cardShell} p-5 sm:p-6 lg:col-span-2 ${
                card.key === "collaboration" ? "sm:col-span-2" : ""
              }`}
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.16),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative z-10">
                <span className="grid size-10 place-items-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-violet-300 transition-colors duration-300 group-hover:border-violet-400/50 group-hover:bg-violet-500/20">
                  <card.icon size={18} />
                </span>
                <h3 className="mt-4 text-base font-semibold text-(--foreground)">{card.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-(--muted) sm:text-sm">
                  {card.body}
                </p>
              </div>
            </motion.article>
          ))}

          {/* Craft + tech marquee */}
          <motion.article
            {...reveal}
            transition={{ duration: 0.5, delay: 0.18 }}
            {...spotlightOn("craft")}
            className={`${cardShell} flex flex-col justify-between pt-5 pb-4 sm:col-span-2 sm:pt-6 lg:col-span-2`}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.16),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="relative z-10 px-5 sm:px-6">
              <span className="grid size-10 place-items-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-violet-300 transition-colors duration-300 group-hover:border-violet-400/50 group-hover:bg-violet-500/20">
                <Sparkles size={18} />
              </span>
              <h3 className="mt-4 text-base font-semibold text-(--foreground)">Craft</h3>
              <p className="mt-2 text-xs leading-relaxed text-(--muted) sm:text-sm">
                Scalable apps, websites, and automations &mdash; built with the tools that fit the
                job.
              </p>
            </div>

            <div className="relative z-10 mt-5 border-t border-(--card-border)/60 pt-4">
              <div className="pointer-events-none absolute top-4 bottom-0 left-0 z-10 w-10 bg-linear-to-r from-(--card) to-transparent" />
              <div className="pointer-events-none absolute top-4 right-0 bottom-0 z-10 w-10 bg-linear-to-l from-(--card-border) to-transparent" />
              <div className="overflow-hidden">
                <motion.div
                  className="flex w-max items-center"
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{ repeat: Infinity, ease: "linear", duration: 22 }}
                >
                  {[0, 1].map((copy) => (
                    <div key={copy} className="flex items-center gap-7 pr-7">
                      {technologies.map((technology) => (
                        <span
                          key={`${copy}-${technology}`}
                          className="font-mono text-[11px] uppercase tracking-[0.14em] text-(--muted) transition-colors group-hover:text-(--foreground)/70"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.article>

          {/* Location */}
          <motion.article
            {...reveal}
            transition={{ duration: 0.5, delay: 0.24 }}
            {...spotlightOn("location")}
            className="group relative aspect-[16/10] overflow-hidden rounded-2xl border border-(--card-border) bg-(--card) transition-colors duration-300 hover:border-violet-400/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400 sm:col-span-2 sm:aspect-[16/9] lg:col-span-2 lg:aspect-auto lg:h-full"
          >
            <Image
              src={MAP_IMAGE}
              alt="World map"
              fill
              sizes="(max-width: 1023px) 100vw, 33vw"
              className="object-cover opacity-40 grayscale transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-(--card) via-(--card)/70 to-transparent" />
            <div className="absolute inset-y-0 left-[58%] w-px bg-violet-400/70 shadow-[0_0_12px_rgba(168,85,247,0.6)]" />

            <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6">
              <span className="grid size-10 place-items-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-violet-300 transition-colors duration-300 group-hover:border-violet-400/50 group-hover:bg-violet-500/20">
                <MapPin size={18} />
              </span>
              <p className="mt-4 text-2xl font-bold leading-none tracking-tighter text-(--foreground) sm:text-3xl">
                Remote, Worldwide
              </p>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-(--muted)">
                Available online
                <span className="mx-2 text-violet-400">/</span>
                Flexible hours
              </p>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
