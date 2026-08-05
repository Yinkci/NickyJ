"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { projects } from "@/data/projects";
import type { Project } from "@/data/projects";
import { ProjectRow } from "@/components/projects/ProjectRow";

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const featured = projects.filter((project) => project.featured);

  useEffect(() => {
    if (!selectedProject) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedProject(null);
    };
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selectedProject]);

  return (
    <>
      <section
        id="projects"
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
            <span className="meta">03</span>
            <span className="h-px flex-1 bg-ivory/10" />
            <span className="eyebrow">Selected work</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="mt-14 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end"
          >
            <h2 className="display max-w-2xl text-4xl sm:text-6xl lg:text-7xl">
              Client work, platforms and{" "}
              <span className="display-italic text-gradient-shimmer">interfaces.</span>
            </h2>
            <p className="meta lg:text-right">
              {String(featured.length).padStart(2, "0")} projects
              <span className="mx-3 text-champagne/50">/</span>
              Select any to enlarge
            </p>
          </motion.div>

          <div className="mt-8">
            {featured.map((project, index) => (
              <ProjectRow
                key={project.id}
                project={project}
                index={index}
                onOpen={setSelectedProject}
              />
            ))}
            <div className="border-t border-ivory/10" />
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedProject ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onMouseDown={() => setSelectedProject(null)}
            className="fixed inset-0 z-100 flex items-center justify-center bg-obsidian/94 p-4 backdrop-blur-lg sm:p-10"
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-preview-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
              onMouseDown={(event) => event.stopPropagation()}
              className="relative flex max-h-full w-full max-w-7xl flex-col overflow-hidden border border-champagne/20 bg-onyx"
            >
              <div className="flex items-center justify-between gap-4 border-b border-ivory/10 px-5 py-4 sm:px-7">
                <div className="flex min-w-0 items-baseline gap-4">
                  <span className="meta shrink-0 text-champagne">
                    {String(
                      featured.findIndex((project) => project.id === selectedProject.id) + 1,
                    ).padStart(2, "0")}
                  </span>
                  <h3
                    id="project-preview-title"
                    className="display-medium truncate text-xl text-ivory sm:text-2xl"
                  >
                    {selectedProject.title}
                  </h3>
                </div>
                <button
                  type="button"
                  autoFocus
                  onClick={() => setSelectedProject(null)}
                  aria-label="Close project preview"
                  className="grid size-10 shrink-0 place-items-center rounded-full border border-ivory/15 text-(--muted) transition-all duration-500 hover:border-champagne/60 hover:text-champagne focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="relative h-[72vh] min-h-64 bg-obsidian">
                {selectedProject.screenshots?.[0] ? (
                  <Image
                    src={selectedProject.screenshots[0]}
                    alt={`${selectedProject.title} full-size project preview`}
                    fill
                    sizes="100vw"
                    className="object-contain"
                    priority
                  />
                ) : null}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
