"use client";

import { motion } from "framer-motion";
import {
  SiGit,
  SiJavascript,
  SiJquery,
  SiLaravel,
  SiMysql,
  SiNodedotjs,
  SiPhp,
  SiSass,
  SiVuedotjs,
  SiWoocommerce,
  SiWordpress,
} from "react-icons/si";

export function Skills() {
  const beltChunk = [...Array(2)].flatMap(() => [
    { name: "WordPress", icon: SiWordpress, color: "#21759B" },
    { name: "PHP", icon: SiPhp, color: "#777BB4" },
    { name: "Laravel", icon: SiLaravel, color: "#FF2D20" },
    { name: "Vue.js", icon: SiVuedotjs, color: "#4FC08D" },
    { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
    { name: "WooCommerce", icon: SiWoocommerce, color: "#96588A" },
    { name: "MySQL", icon: SiMysql, color: "#4479A1" },
    { name: "jQuery", icon: SiJquery, color: "#0769AD" },
    { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
    { name: "SASS", icon: SiSass, color: "#CC6699" },
    { name: "Git", icon: SiGit, color: "#F05032" },
  ]);

  const skillGroups = [
    {
      title: "WordPress",
      summary: "Custom builds, not off-the-shelf themes.",
      items: [
        "Custom plugins & Gutenberg blocks",
        "WooCommerce e-commerce",
        "ACF, Elementor, Kadence, WPBakery",
      ],
    },
    {
      title: "Full Stack",
      summary: "Application logic and the data behind it.",
      items: ["PHP & Laravel (Blade, OOP)", "Vue.js, JavaScript, jQuery", "MySQL & API integrations"],
    },
    {
      title: "Performance & SEO",
      summary: "Fast to load, easy to find, simple to maintain.",
      items: ["Core Web Vitals optimisation", "Technical SEO: Rank Math, Yoast", "Git, Bitbucket, Jira, Webpack"],
    },
  ];

  return (
    <section
      id="skills"
      className="relative overflow-hidden pt-0 pb-28"
      style={{ scrollMarginTop: "100px" }}
    >
      <div className="section">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-(--accent) sm:text-base">
            Tech stack
          </span>
          <h2 className="mt-2 px-2 text-3xl font-bold tracking-tight text-pretty sm:text-5xl md:text-6xl">
            Skills{" "}
            <span className="text-gradient-shimmer">Overview</span>
          </h2>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-3">
          {skillGroups.map((group) => (
            <div
              key={group.title}
              className="rounded-2xl border border-(--card-border) bg-linear-to-br from-(--card) to-(--card-border) p-5"
            >
              <h3 className="text-base font-semibold">{group.title}</h3>
              <p className="mt-1 text-xs text-(--muted)">{group.summary}</p>
              <ul className="mt-3 space-y-2 text-sm text-(--muted)">
                {group.items.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-(--card-border) bg-(--card)/40 py-3">
          <div className="relative overflow-hidden">
            <motion.div
              className="flex w-max items-center gap-8 whitespace-nowrap"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                repeat: Infinity,
                ease: "linear",
                duration: 24,
              }}
            >
              {[0, 1].map((copy) => (
                <div key={copy} className="flex items-center gap-8 px-4">
                  {beltChunk.map((item, index) => (
                    <div key={`${copy}-${item.name}-${index}`} className="flex items-center gap-2">
                      <item.icon style={{ color: item.color }} size={16} />
                      <span className="text-xs uppercase tracking-wider text-(--muted)">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
