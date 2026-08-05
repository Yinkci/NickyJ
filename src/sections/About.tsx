"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

import awardStar from "../award/AwardStar.jpg";
import nickyOne from "../myself/nicky5.png";
import nickyTwo from "../myself/nicky6.png";
import nickyThree from "../myself/nicky3.png";

const portraits = [
  { image: nickyThree, caption: "Senior Full Stack Developer" },
  { image: nickyTwo, caption: "Front-end and back-end" },
  { image: nickyOne, caption: "Clark, Pampanga" },
];

const facts = [
  {
    index: "01",
    label: "Experience",
    body: "Over 10 years of front-end and back-end development, delivering websites, web applications, business systems, APIs, and custom solutions across a wide range of industries.",
  },
  {
    index: "02",
    label: "Capabilities",
    body: "Websites, web applications, business systems, WordPress, Laravel, PHP, Vue, modern JavaScript, APIs, database architecture, e-commerce, and custom software development.",
  },
  {
    index: "03",
    label: "Performance & SEO",
    body: "Core Web Vitals tuning and technical SEO with Rank Math and Yoast, so a site loads fast and stays findable long after launch.",
  },
  {
    index: "04",
    label: "Based in",
    body: "Clark, Pampanga, Philippines. GMT+8, working remotely and available on flexible hours.",
  },
];

export function About() {
  const [active, setActive] = useState(0);
  const portrait = portraits[active];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % portraits.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section
      id="about"
      className="relative overflow-hidden py-28 sm:py-36"
      style={{ scrollMarginTop: "80px" }}
    >
      <div className="shell">
        {/* Section marker */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-5 border-b border-ivory/10 pb-6"
        >
          <span className="meta">02</span>
          <span className="h-px flex-1 bg-ivory/10" />
          <span className="eyebrow">About</span>
        </motion.div>

        <div className="mt-16 grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          {/* Portrait column. Not sticky: portrait + caption + award plaque runs
              ~800px tall, which would clip the plaque off-screen on a laptop
              viewport while the column was stuck. */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-onyx">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={portrait.image}
                    alt="Nicky Jacobo"
                    fill
                    priority
                    sizes="(max-width: 1023px) 100vw, 40vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-obsidian/80 via-transparent to-transparent" />
              {/* Inset champagne frame */}
              <div className="pointer-events-none absolute inset-4 border border-champagne/20" />
            </div>

            <div className="mt-6 flex items-center justify-between gap-4">
              <AnimatePresence mode="wait">
                <motion.span
                  key={active}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.4 }}
                  className="meta"
                >
                  {portrait.caption}
                </motion.span>
              </AnimatePresence>

              <div className="flex gap-1.5">
                {portraits.map((item, index) => (
                  <span
                    key={item.caption}
                    className={`h-px transition-all duration-700 ${
                      active === index ? "w-8 bg-champagne" : "w-3 bg-ivory/25"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Award plaque — its own panel under the portrait, never part of
                the rotation above it. The image keeps its native 716x768 ratio
                so the engraving stays legible and uncropped. */}
            <div className="group mt-6 border border-ivory/12 bg-onyx/70 p-4 transition-colors duration-500 hover:border-champagne/30">
              {/* 10rem wide against the 716x768 ratio puts the image at ~172px
                  tall, down from ~275px at 16rem. */}
              <div className="grid gap-5 sm:grid-cols-[minmax(0,10rem)_minmax(0,1fr)] sm:items-center sm:gap-6">
                <div className="relative overflow-hidden border border-champagne/25 bg-obsidian">
                  <Image
                    src={awardStar}
                    alt="Glass star trophy engraved 2024 Client Experience Award, Nicky Jacobo"
                    sizes="(max-width: 639px) 92vw, 10rem"
                    className="h-auto w-full transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
                  />
                </div>

                <div className="min-w-0">
                  <p className="eyebrow">Recognition</p>
                  <p className="display-medium mt-2.5 text-xl text-ivory transition-colors duration-500 group-hover:text-champagne sm:text-2xl">
                    2024 Client Experience Award
                  </p>
                  <div className="rule mt-5 w-12" />
                  <p className="meta mt-5">Engraved &mdash; Nicky Jacobo</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Copy and facts */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="display text-4xl sm:text-6xl lg:text-7xl">
                Nicky <span className="text-gradient-shimmer">Jacobo</span>
              </h2>
              <p className="meta mt-5">Senior Full Stack Developer</p>
              <div className="rule mt-8 w-20" />

              <p className="mt-10 text-lg font-light leading-relaxed text-ivory/80 sm:text-xl">
                I build fast, scalable websites, web applications, backend systems, and custom solutions, backed by over a decade of professional development experience.
              </p>
              <p className="mt-6 max-w-2xl text-base font-light leading-relaxed text-(--muted)">
                My expertise covers frontend and backend development using Laravel, PHP Vue, modern JavaScript, APIs, databases, e-commerce, WordPress, SEO, and performance optimisation. I build scalable websites, web applications, business systems, custom plugins, and integrations designed to be fast, maintainable, and reliable.
              </p>

              <div className="mt-10 flex items-center gap-3">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-champagne opacity-70" />
                  <span className="relative inline-flex size-2 rounded-full bg-champagne" />
                </span>
                <span className="meta text-ivory/80">Open to collaboration &amp; freelance</span>
              </div>
            </motion.div>

            <dl className="mt-16">
              {facts.map((fact, index) => (
                <motion.div
                  key={fact.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.06 }}
                  className="group grid gap-3 border-t border-ivory/10 py-7 sm:grid-cols-[11rem_1fr] sm:gap-8"
                >
                  <dt className="flex items-baseline gap-4">
                    <span className="meta transition-colors duration-500 group-hover:text-champagne">
                      {fact.index}
                    </span>
                    <span className="label transition-colors duration-500 group-hover:text-champagne">
                      {fact.label}
                    </span>
                  </dt>
                  <dd className="text-sm font-light leading-relaxed text-(--muted) transition-colors duration-500 group-hover:text-ivory/85 sm:text-base">
                    {fact.body}
                  </dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
