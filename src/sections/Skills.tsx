"use client";

import { motion } from "framer-motion";
import { Code2, Gauge, ShoppingCart, Smartphone, Wrench } from "lucide-react";
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
      title: "Development",
      icon: Code2,
      span: "lg:col-span-7",
      items: [
        "Laravel",
        "PHP",
        "Blade",
        "JavaScript",
        "HTML5",
        "SASS/CSS",
        "jQuery",
        "VueJS",
        "Node.js",
        "OOP",
        "MySQL",
        "APIs",
        "JAVA",
      ],
    },
    {
      title: "WordPress & Commerce",
      icon: ShoppingCart,
      span: "lg:col-span-5",
      items: [
        "WordPress",
        "WooCommerce",
        "Gutenberg Blocks",
        "ACF",
        "Kadence",
        "WPBakery",
        "Beaver Builder",
        "Elementor",
      ],
    },
    {
      title: "Performance & SEO",
      icon: Gauge,
      span: "lg:col-span-4",
      items: ["Core Web Vitals", "Technical SEO", "Rank Math", "Yoast SEO"],
    },
    {
      title: "Mobile & Cloud",
      icon: Smartphone,
      span: "sm:col-span-2 lg:col-span-3",
      items: ["React Native", "Firebase"],
    },
    {
      title: "Workflow & Tools",
      icon: Wrench,
      span: "lg:col-span-5",
      items: [
        "GitHub",
        "Bitbucket",
        "Jira",
        "Gulp",
        "Webpack",
        "npm/Yarn",
        "Laragon",
        "Photoshop",
      ],
    },
  ];

  return (
    <section
      id="skills"
      className="relative overflow-hidden pt-0 pb-28"
      style={{ scrollMarginTop: "100px" }}
    >
      <div className="section">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-(--accent) sm:text-base">
            Tech stack
          </span>
          <h2 className="mt-3 px-2 text-3xl font-bold tracking-tight text-pretty sm:text-5xl md:text-6xl">
            Skills <span className="text-gradient-shimmer">Overview</span>
          </h2>
        </motion.div>

        <div className="mx-auto mt-12 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-12">
          {skillGroups.map((group, index) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.07 }}
              className={`group relative overflow-hidden rounded-2xl border border-(--card-border) bg-linear-to-br from-(--card) to-(--card-border) p-5 transition-colors duration-300 hover:border-violet-400/30 sm:p-6 ${group.span}`}
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.14),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative z-10 flex items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-violet-300 transition-colors duration-300 group-hover:border-violet-400/50 group-hover:bg-violet-500/20">
                  <group.icon size={18} />
                </span>
                <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-(--foreground) sm:text-xs">
                  {group.title}
                </h3>
              </div>

              <div className="relative z-10 mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] font-medium text-(--muted) transition-colors duration-200 hover:border-violet-400/40 hover:text-(--foreground) sm:text-xs"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mx-auto mt-8 max-w-6xl rounded-2xl border border-(--card-border) bg-(--card)/40 py-3">
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
