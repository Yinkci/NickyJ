"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const items = [
  {
    key: "guestbook",
    index: "01",
    title: "Guestbook",
    desc: "Optional page where visitors can leave a short message.",
    href: "#other",
  },
  {
    key: "achievements",
    index: "02",
    title: "Achievements",
    desc: "A visual timeline for milestones, awards, and certifications.",
    href: "#other",
  },
  {
    key: "links",
    index: "03",
    title: "Useful Links",
    desc: "One place for socials, docs, CV, and featured resources.",
    href: "#other",
  },
];

export function Other() {
  return (
    <section
      id="other"
      className="relative overflow-hidden py-28 sm:py-36"
      style={{ scrollMarginTop: "80px" }}
    >
      <div className="shell">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-5 border-b border-ivory/10 pb-6"
        >
          <span className="meta">05</span>
          <span className="h-px flex-1 bg-ivory/10" />
          <span className="eyebrow">Elsewhere</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="mt-14"
        >
          <h2 className="display max-w-2xl text-4xl sm:text-6xl lg:text-7xl">
            More to <span className="display-italic text-gradient-shimmer">come.</span>
          </h2>
          <p className="mt-7 max-w-xl text-base font-light leading-relaxed text-(--muted)">
            Pages planned for this site. Keep them or replace them with your own.
          </p>
        </motion.div>

        <div className="mt-16">
          {items.map((item, index) => (
            <motion.a
              key={item.key}
              href={item.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, delay: index * 0.06 }}
              className="group grid items-baseline gap-4 border-t border-ivory/10 py-9 transition-colors duration-700 hover:border-champagne/25 sm:grid-cols-[5rem_minmax(0,1fr)_auto] sm:gap-10"
            >
              <span className="meta transition-colors duration-500 group-hover:text-champagne">
                {item.index}
              </span>

              <div>
                <h3 className="display-medium text-2xl transition-all duration-500 group-hover:translate-x-2 group-hover:text-champagne sm:text-3xl">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-lg text-sm font-light leading-relaxed text-(--muted) transition-colors duration-500 group-hover:text-ivory/80">
                  {item.desc}
                </p>
              </div>

              <span className="flex items-center gap-3 font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-(--muted) transition-colors duration-500 group-hover:text-champagne">
                Explore
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </span>
            </motion.a>
          ))}
          <div className="border-t border-ivory/10" />
        </div>
      </div>
    </section>
  );
}
