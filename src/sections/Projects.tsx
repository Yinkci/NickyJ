"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { projects } from "@/data/projects";
import type { Project } from "@/data/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
        className="relative overflow-hidden pt-0 pb-32"
        style={{ scrollMarginTop: "120px" }}
      >
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            className="absolute top-1/4 -left-1/4 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute right-0 bottom-1/4 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          />
        </div>

        <div className="section">
          <div className="mb-20 text-center">
            <span className="text-base font-bold uppercase tracking-widest text-(--accent)">
              Selected work
            </span>
            <h2 className="mt-4 px-2 text-3xl font-bold tracking-tight text-pretty sm:text-5xl md:text-6xl">
              Featured{" "}
              <span className="text-gradient-shimmer">Projects</span>
            </h2>
            <p className="mx-auto mt-8 max-w-3xl px-2 text-base font-light leading-relaxed text-(--muted) sm:text-xl">
              A selection of client work, web platforms, and product interfaces.
            </p>
          </div>

          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
            {projects
              .filter((p) => p.featured)
              .map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onOpen={setSelectedProject}
                />
              ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedProject ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={() => setSelectedProject(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm sm:p-8"
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-preview-title"
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onMouseDown={(event) => event.stopPropagation()}
              className="relative flex max-h-full w-full max-w-7xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-(--card) shadow-2xl"
            >
              <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3 sm:px-6">
                <h3 id="project-preview-title" className="text-sm font-semibold text-(--foreground) sm:text-lg">
                  {selectedProject.title}
                </h3>
                <button
                  type="button"
                  autoFocus
                  onClick={() => setSelectedProject(null)}
                  aria-label="Close project preview"
                  className="grid size-9 shrink-0 place-items-center rounded-full border border-white/15 text-(--muted) transition hover:border-white/40 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
                >
                  <X size={19} />
                </button>
              </div>
              <div className="relative h-[70vh] min-h-64 bg-black">
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
