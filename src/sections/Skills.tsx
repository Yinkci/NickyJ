"use client";

import { motion } from "framer-motion";

const skillGroups = [
  {
    index: "01",
    title: "Development",
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
    index: "02",
    title: "WordPress & Commerce",
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
    index: "03",
    title: "Performance & SEO",
    items: ["Core Web Vitals", "Technical SEO", "Rank Math", "Yoast SEO"],
  },
  {
    index: "04",
    title: "Mobile & Cloud",
    items: ["React Native", "Firebase"],
  },
  {
    index: "05",
    title: "Workflow & Tools",
    items: ["GitHub", "Bitbucket", "Jira", "Gulp", "Webpack", "npm/Yarn", "Laragon", "Photoshop"],
  },
];

export function Skills() {
  return (
    <section
      id="skills"
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
          <span className="meta">04</span>
          <span className="h-px flex-1 bg-ivory/10" />
          <span className="eyebrow">Skills</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="mt-14 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end"
        >
          <h2 className="display max-w-2xl text-4xl sm:text-6xl lg:text-7xl">
            Skills, <span className="display-italic text-gradient-shimmer">in detail.</span>
          </h2>
          <p className="meta lg:text-right">
            05 disciplines
            <span className="mx-3 text-champagne/50">/</span>
            {skillGroups.reduce((total, group) => total + group.items.length, 0)} technologies
          </p>
        </motion.div>

        {/* Specification sheet */}
        <div className="mt-16">
          {skillGroups.map((group, index) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.65, delay: index * 0.05 }}
              className="group grid gap-5 border-t border-ivory/10 py-9 transition-colors duration-700 hover:border-champagne/25 lg:grid-cols-[minmax(0,0.4fr)_minmax(0,1fr)] lg:gap-16"
            >
              <div className="flex items-baseline gap-5">
                <span className="meta transition-colors duration-500 group-hover:text-champagne">
                  {group.index}
                </span>
                <h3 className="display-medium text-2xl transition-colors duration-500 group-hover:text-champagne sm:text-3xl">
                  {group.title}
                </h3>
              </div>

              <p className="flex flex-wrap items-baseline gap-x-3 gap-y-2 self-center">
                {group.items.map((item, itemIndex) => (
                  <span key={item} className="flex items-baseline gap-3">
                    {itemIndex > 0 ? (
                      <span className="text-champagne/45" aria-hidden="true">
                        ·
                      </span>
                    ) : null}
                    <span className="text-sm font-light text-(--muted) transition-colors duration-500 group-hover:text-ivory/85 sm:text-base">
                      {item}
                    </span>
                  </span>
                ))}
              </p>
            </motion.div>
          ))}
          <div className="border-t border-ivory/10" />
        </div>
      </div>
    </section>
  );
}
