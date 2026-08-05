"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import clientThree from "../clients/client3.png";
import clientTwo from "../clients/client2.png";
import clientFour from "../clients/client4.jpg";
import clientFive from "../clients/client5.jpg";

const clientImages = [
  {
    image: clientTwo,
    alt: "Team members collaborating around a laptop",
    label: "Working together",
  },
  {
    image: clientFour,
    alt: "Team workshop in a modern office",
    label: "Sharing ideas",
  },
  {
    image: clientThree,
    alt: "Teaching students",
    label: "Teaching students",
  },
  {
    image: clientFive,
    alt: "Two colleagues walking through an office",
    label: "Building relationships",
  },
];

export function Hero() {
  const [activeImage, setActiveImage] = useState(0);

  const goTo = useCallback((next: number) => {
    setActiveImage((next + clientImages.length) % clientImages.length);
  }, []);

  // Keyed on activeImage, so manual navigation restarts the full dwell time
  // instead of cutting the next slide short.
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setActiveImage((current) => (current + 1) % clientImages.length);
    }, 5500);

    return () => window.clearTimeout(timer);
  }, [activeImage]);

  const currentImage = clientImages[activeImage];

  return (
    <section
      id="home"
      className="relative flex min-h-svh items-center overflow-hidden pt-28 pb-20 sm:pt-32"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-24 h-96 w-96 rounded-full bg-champagne/8 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-champagne-deep/8 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(8,7,10,0.6)_100%)]" />
      </div>

      <div className="shell w-full">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-20">
          {/* Statement */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
          >
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-champagne" />
              <span className="eyebrow">Nicky Cabalu Jacobo</span>
            </div>

            <h1 className="display-bold mt-7 text-4xl sm:text-5xl lg:text-6xl">
              <span className="text-gradient-shimmer">
                Ten years of <span className="display-italic">solving</span> real world problems.
              </span>
            </h1>

            <div className="rule mt-8 w-20" />

            <p className="mt-8 max-w-xl text-base font-light leading-relaxed text-ivory/70">
              Senior Full Stack Developer building fast, responsive websites, plugins, and web
              applications — WordPress, PHP, Laravel, Vue, e-commerce, and performance.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="rounded-full bg-champagne px-7 py-3.5 font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-obsidian transition-colors duration-500 hover:bg-champagne-light"
              >
                View the work
              </a>
              <a
                href="#about"
                className="rounded-full border border-ivory/25 px-7 py-3.5 font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-ivory/80 transition-all duration-500 hover:border-champagne/60 hover:text-champagne"
              >
                About me
              </a>
            </div>
          </motion.div>

          {/* Client moments slider */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.19, 1, 0.22, 1] }}
            className="relative border border-ivory/12 bg-onyx p-2 shadow-[0_40px_90px_-45px_rgba(0,0,0,0.9)]"
          >
            <div className="relative aspect-[16/11] overflow-hidden">
              {/* All slides stay mounted and crossfade. Nothing mounts or
                  unmounts mid-transition, so there is no gap and no rescale. */}
              {clientImages.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={false}
                  animate={{ opacity: index === activeImage ? 1 : 0 }}
                  transition={{ duration: 1.1, ease: "easeInOut" }}
                  aria-hidden={index !== activeImage}
                  className="absolute inset-0"
                >
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 1023px) 100vw, 50vw"
                    className="object-cover"
                  />
                </motion.div>
              ))}

              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-t from-obsidian via-obsidian/45 to-transparent" />
              <div className="pointer-events-none absolute inset-3 border border-champagne/15" />

              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
                <div className="min-w-0">
                  <p className="eyebrow">Client moments</p>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={activeImage}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.4 }}
                      className="display-medium mt-2 truncate text-xl text-ivory sm:text-2xl"
                    >
                      {currentImage.label}
                    </motion.p>
                  </AnimatePresence>
                </div>

                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    onClick={() => goTo(activeImage - 1)}
                    aria-label="Show previous client moment"
                    className="grid size-10 place-items-center rounded-full border border-ivory/25 bg-obsidian/40 text-ivory backdrop-blur-sm transition-all duration-500 hover:border-champagne hover:bg-champagne hover:text-obsidian focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
                  >
                    <ChevronLeft size={17} />
                  </button>
                  <button
                    type="button"
                    onClick={() => goTo(activeImage + 1)}
                    aria-label="Show next client moment"
                    className="grid size-10 place-items-center rounded-full border border-ivory/25 bg-obsidian/40 text-ivory backdrop-blur-sm transition-all duration-500 hover:border-champagne hover:bg-champagne hover:text-obsidian focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
                  >
                    <ChevronRight size={17} />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 px-3 pt-4 pb-2">
              <span className="meta">
                {String(activeImage + 1).padStart(2, "0")}
                <span className="mx-2 text-champagne/50">/</span>
                {String(clientImages.length).padStart(2, "0")}
              </span>

              <div className="flex items-center gap-2">
                {clientImages.map((item, index) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => goTo(index)}
                    aria-label={`Show ${item.label.toLowerCase()}`}
                    aria-current={activeImage === index ? "true" : undefined}
                    className="py-2"
                  >
                    <span
                      className={`block h-px transition-all duration-700 ${
                        activeImage === index
                          ? "w-12 bg-champagne"
                          : "w-5 bg-ivory/25 hover:bg-ivory/60"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
