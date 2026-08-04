"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
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
    alt: "Teaching Students",
    label: "Teaching Students",
  },
  {
    image: clientFive,
    alt: "Two colleagues walking through an office",
    label: "Building relationships",
  },
];

export function Hero() {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % clientImages.length);
    }, 3000);

    return () => window.clearInterval(timer);
  }, []);

  const showPrevious = () => {
    setActiveImage(
      (current) => (current - 1 + clientImages.length) % clientImages.length,
    );
  };

  const showNext = () => {
    setActiveImage((current) => (current + 1) % clientImages.length);
  };

  const currentImage = clientImages[activeImage];

  return (
    <section
      id="home"
      className="section relative overflow-hidden pb-20 pt-28 sm:pb-24 sm:pt-32 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-28 -left-20 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="absolute right-0 bottom-6 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
      </div>

      <div className="grid w-full items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.25em] text-violet-300 sm:text-sm">
            NICKY CABALU JACOBO
          </p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-6xl lg:text-7xl">
            {/* 10 years of solving real-world problems.
            <br /> */}
            <span className="text-gradient-shimmer">10 years of solving real-world problems.</span>
          </h1>
          <p className="max-w-2xl text-base text-(--muted) sm:text-lg">
            Full Stack Developer with over 10 years of experience building scalable web applications, WordPress solutions, APIs, and modern frontend and backend systems.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#projects"
              className="rounded-full bg-violet-500 px-5 py-2 text-sm font-semibold text-black transition-colors hover:bg-violet-400"
            >
              Explore projects
            </a>
            <a
              href="#about"
              className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white transition-colors hover:border-white/40"
            >
              About section
            </a>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-2xl border border-(--card-border) bg-(--card) shadow-2xl shadow-black/30">
          <div className="relative aspect-[16/10]">
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={activeImage}
                initial={{ opacity: 0, x: 32 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -32 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={currentImage.image}
                  alt={currentImage.alt}
                  fill
                  priority={activeImage === 0}
                  sizes="(max-width: 1023px) 100vw, 40vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-black/75 via-black/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-white/65">
                  Client moments
                </p>
                <p className="mt-1 text-lg font-semibold text-white">{currentImage.label}</p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={showPrevious}
                  aria-label="Show previous image"
                  className="grid size-9 place-items-center rounded-full border border-white/30 bg-black/25 text-white backdrop-blur-sm transition hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  aria-label="Show next image"
                  className="grid size-9 place-items-center rounded-full border border-white/30 bg-black/25 text-white backdrop-blur-sm transition hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-1.5 px-5 py-4 sm:px-6">
            {clientImages.map((item, index) => (
              <button
                key={item.label}
                type="button"
                onClick={() => setActiveImage(index)}
                aria-label={`Show ${item.label.toLowerCase()} image`}
                aria-current={activeImage === index ? "true" : undefined}
                className={`h-1 rounded-full transition-all ${
                  activeImage === index
                    ? "w-8 bg-violet-400"
                    : "w-3 bg-white/20 hover:bg-white/45"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
