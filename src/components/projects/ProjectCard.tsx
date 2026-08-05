"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, Github, Maximize2 } from "lucide-react";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpen: (project: Project) => void;
}

export function ProjectCard({ project, index, onOpen }: ProjectCardProps) {
  const cover = project.screenshots?.[0];
  // Static imports carry their intrinsic size, so each card can keep the
  // screenshot's own ratio instead of letterboxing it into a fixed frame.
  const ratio = cover && typeof cover === "object" ? cover.width / cover.height : 16 / 10;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.08 }}
      className="group mb-6 break-inside-avoid sm:mb-8"
    >
      <div className="relative rounded-[22px] border border-white/10 bg-linear-to-b from-white/[0.06] to-white/[0.01] p-1.5 transition-all duration-500 hover:-translate-y-1 hover:border-violet-400/35 hover:shadow-[0_30px_70px_-28px_rgba(139,92,246,0.35)]">
        <button
          type="button"
          onClick={() => onOpen(project)}
          aria-label={`Open full-size preview of ${project.title}`}
          className="relative block w-full cursor-pointer overflow-hidden rounded-[16px] bg-black/40 ring-1 ring-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400"
          style={{ aspectRatio: ratio }}
        >
          {cover ? (
            <Image
              src={cover}
              alt={`${project.title} project preview`}
              fill
              sizes="(max-width: 1023px) 100vw, 50vw"
              priority={index === 0}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
          ) : null}

          {/* Slow sheen sweep on hover */}
          <span className="pointer-events-none absolute inset-0 overflow-hidden">
            <span className="absolute inset-y-0 -left-1/3 w-1/3 -translate-x-full skew-x-12 bg-linear-to-r from-transparent via-white/15 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-[400%]" />
          </span>

          <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          <span className="pointer-events-none absolute right-3 bottom-3 grid size-9 scale-90 place-items-center rounded-full border border-white/25 bg-black/50 text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover:scale-100 group-hover:opacity-100">
            <Maximize2 size={14} />
          </span>
        </button>

        <div className="flex items-center justify-between gap-4 px-3 pt-3.5 pb-2">
          <div className="min-w-0">
            <span className="font-mono text-[10px] tracking-[0.3em] text-violet-300/70">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-1 truncate text-sm font-semibold tracking-tight text-(--foreground)/90 transition-colors duration-300 group-hover:text-(--foreground) sm:text-base">
              {project.title}
            </h3>
          </div>

          {project.github || project.demo ? (
            <div className="flex shrink-0 items-center gap-2">
              {project.github ? (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} source on GitHub`}
                  className="grid size-9 place-items-center rounded-full border border-white/10 text-(--muted) transition-colors duration-300 hover:border-violet-400/40 hover:text-(--foreground)"
                >
                  <Github size={15} />
                </a>
              ) : null}
              {project.demo ? (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${project.title}`}
                  className="grid size-9 place-items-center rounded-full border border-white/10 text-(--muted) transition-colors duration-300 hover:border-violet-400/40 hover:text-(--foreground)"
                >
                  <ArrowUpRight size={15} />
                </a>
              ) : null}
            </div>
          ) : null}
        </div>

        {project.tags?.length ? (
          <div className="flex flex-wrap gap-1.5 px-3 pb-3">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.12em] text-(--muted) md:text-[10px]"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </motion.article>
  );
}
