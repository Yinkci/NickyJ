"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { siteConfig, socials } from "@/data/config";

const navItems = [
  { href: "#home", label: "Home", index: "01" },
  { href: "#about", label: "About", index: "02" },
  { href: "#projects", label: "Work", index: "03" },
  { href: "#skills", label: "Expertise", index: "04" },
  { href: "#other", label: "More", index: "05" },
];

export function Navbar() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const ids = navItems.map((item) => item.href.replace("#", ""));
      let current = ids[0];
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.getBoundingClientRect().top <= 140) {
          current = ids[i];
          break;
        }
      }
      setActive(current);
      setScrolled(window.scrollY > 40);

      const scrollable = document.body.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Lock the page and wire Escape while the overlay is open.
  useEffect(() => {
    if (!menuOpen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-70">
        {/* Reading progress hairline */}
        <div className="h-px w-full bg-ivory/5">
          <div
            className="h-px origin-left bg-champagne transition-transform duration-150 ease-out"
            style={{ transform: `scaleX(${progress})` }}
          />
        </div>

        <div
          className={`transition-all duration-700 ${
            scrolled
              ? "border-b border-ivory/8 bg-obsidian/85 backdrop-blur-xl"
              : "border-b border-transparent bg-transparent"
          }`}
        >
          <div className="shell">
            <div
              className={`flex items-center justify-between transition-all duration-700 ${
                scrolled ? "h-16" : "h-20 sm:h-24"
              }`}
            >
              <a href="#home" aria-label={`${siteConfig.name} — home`} className="group flex items-center gap-3">
                <span className="display-medium text-2xl leading-none">
                  <span className="gradient-text">NJ</span>
                </span>
                <span className="hidden h-3.5 w-px bg-champagne/30 sm:block" />
                <span className="meta hidden transition-colors duration-500 group-hover:text-ivory sm:block">
                  {siteConfig.name}
                </span>
              </a>

              <nav className="hidden items-center gap-10 lg:flex">
                {navItems.map((item) => {
                  const id = item.href.replace("#", "");
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      data-active={active === id}
                      className="nav-link font-mono text-[10px] font-medium uppercase tracking-[0.24em] transition-colors duration-500"
                      style={{ color: active === id ? "var(--accent)" : "var(--muted)" }}
                    >
                      {item.label}
                    </a>
                  );
                })}
                <a
                  href={socials[0]?.url ?? "#other"}
                  className="rounded-full border border-champagne/35 px-6 py-2.5 font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-champagne transition-all duration-500 hover:bg-champagne hover:text-obsidian"
                >
                  Get in touch
                </a>
              </nav>

              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                aria-expanded={menuOpen}
                className="group flex items-center gap-3 lg:hidden"
              >
                <span className="meta transition-colors duration-500 group-hover:text-champagne">Menu</span>
                <span className="flex w-7 flex-col gap-1.5">
                  <span className="h-px w-full bg-ivory/70 transition-colors duration-500 group-hover:bg-champagne" />
                  <span className="h-px w-2/3 self-end bg-ivory/70 transition-all duration-500 group-hover:w-full group-hover:bg-champagne" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed inset-0 z-80 bg-obsidian/97 backdrop-blur-2xl"
          >
            <div className="shell flex h-full flex-col">
              <div className="flex h-20 shrink-0 items-center justify-between sm:h-24">
                <span className="display-medium text-2xl">
                  <span className="gradient-text">NJ</span>
                </span>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  autoFocus
                  className="group flex items-center gap-3"
                >
                  <span className="meta transition-colors duration-500 group-hover:text-champagne">
                    Close
                  </span>
                  <span className="relative block size-6">
                    <span className="absolute top-1/2 left-0 h-px w-full rotate-45 bg-ivory/70 transition-colors duration-500 group-hover:bg-champagne" />
                    <span className="absolute top-1/2 left-0 h-px w-full -rotate-45 bg-ivory/70 transition-colors duration-500 group-hover:bg-champagne" />
                  </span>
                </button>
              </div>

              <nav className="flex flex-1 flex-col justify-center gap-1 py-8">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.08 + index * 0.06, ease: "easeOut" }}
                    className="group flex items-baseline gap-5 border-b border-ivory/8 py-5"
                  >
                    <span className="meta w-8 shrink-0 transition-colors duration-500 group-hover:text-champagne">
                      {item.index}
                    </span>
                    <span className="display text-4xl transition-all duration-500 group-hover:translate-x-2 group-hover:text-champagne sm:text-5xl">
                      {item.label}
                    </span>
                  </motion.a>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="shrink-0 border-t border-ivory/8 py-6"
              >
                <p className="eyebrow">Get in touch</p>
                <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2">
                  {socials.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      className="display-medium text-xl text-ivory/85 transition-colors duration-500 hover:text-champagne"
                    >
                      {social.url.replace("mailto:", "")}
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
