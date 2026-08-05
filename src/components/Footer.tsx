"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { siteConfig, socials } from "@/data/config";

const navigate = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#other", label: "More" },
];

export function Footer() {
  const year = new Date().getFullYear();
  const email = socials.find((social) => social.url.startsWith("mailto:"));

  return (
    <footer className="relative overflow-hidden border-t border-ivory/10 pt-24 pb-10 sm:pt-32">
      <div className="pointer-events-none absolute -bottom-32 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-champagne/8 blur-3xl" />

      <div className="shell relative">
        {/* Closing call to action */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <span className="eyebrow">Get in touch</span>
          <h2 className="display mt-7 max-w-4xl text-4xl sm:text-6xl lg:text-7xl">
            Let&apos;s build something{" "}
            <span className="display-italic text-gradient-shimmer">worth keeping.</span>
          </h2>

          {email ? (
            <a
              href={email.url}
              className="group mt-10 inline-flex items-baseline gap-4"
              aria-label={`Email ${siteConfig.name}`}
            >
              <span className="display-medium text-2xl text-ivory transition-colors duration-500 group-hover:text-champagne sm:text-4xl">
                {email.url.replace("mailto:", "")}
              </span>
              <span className="h-px w-10 bg-champagne/50 transition-all duration-500 group-hover:w-20 group-hover:bg-champagne" />
            </a>
          ) : null}
        </motion.div>

        {/* Columns */}
        <div className="mt-20 grid gap-12 border-t border-ivory/10 pt-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <span className="display-medium text-4xl">
              <span className="gradient-text">NJ</span>
            </span>
            <p className="mt-5 max-w-sm text-sm font-light leading-relaxed text-(--muted)">
              {siteConfig.description}
            </p>
          </div>

          <div>
            <p className="meta">Navigate</p>
            <ul className="mt-5 space-y-3">
              {navigate.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm font-light text-(--muted) transition-colors duration-500 hover:text-champagne"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="meta">Details</p>
            <ul className="mt-5 space-y-3 text-sm font-light text-(--muted)">
              <li>{siteConfig.title}</li>
              <li>Clark, Pampanga, Philippines</li>
              <li>GMT+8 · Remote friendly</li>
              {socials.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.url}
                    className="inline-flex items-center gap-2 transition-colors duration-500 hover:text-champagne"
                  >
                    <social.icon size={13} />
                    {social.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Baseline */}
        <div className="mt-16 flex flex-col items-center justify-between gap-5 border-t border-ivory/10 pt-8 sm:flex-row">
          <p className="meta">
            © {year} {siteConfig.name}
          </p>

          <a href="#home" className="group flex items-center gap-3">
            <span className="meta transition-colors duration-500 group-hover:text-champagne">
              Back to top
            </span>
            <span className="grid size-9 place-items-center rounded-full border border-ivory/15 text-(--muted) transition-all duration-500 group-hover:border-champagne/60 group-hover:text-champagne">
              <ArrowUp size={14} />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
