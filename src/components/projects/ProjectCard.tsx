"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, Github } from "lucide-react";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpen: (project: Project) => void;
}

export function ProjectCard({ project, index, onOpen }: ProjectCardProps) {
  const screenshots = project.screenshots || [];

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group flex h-full flex-col"
    >
      <header className="mb-4 shrink-0">
        <div className="mb-2 flex items-center gap-3">
          <span className="text-xs font-mono uppercase tracking-wider text-(--muted)">
            0{index + 1}
          </span>
          <span className="h-px w-6 bg-(--card-border)" />
          <span className="text-[10px] font-mono uppercase tracking-wider text-(--muted)">
            Portfolio Project
          </span>
        </div>

        <div className="flex flex-col gap-2 min-[380px]:flex-row min-[380px]:items-center min-[380px]:justify-between">
          <h3 className="line-clamp-2 flex-1 text-base font-bold leading-tight text-(--foreground) sm:text-lg md:text-2xl">
            {project.title}
          </h3>

          <div className="flex items-center gap-2 opacity-100 transition-opacity duration-300 xl:opacity-0 xl:group-hover:opacity-100">
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-linear-to-r from-purple-600 via-violet-600 to-fuchsia-600 px-2.5 py-1.5 text-[10px] font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 md:text-xs"
              >
                <Github size={12} />
                Star
              </a>
            ) : null}
            {project.demo ? (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full p-1.5 text-(--muted) transition-all hover:bg-(--card) hover:text-(--foreground)"
              >
                <ArrowUpRight size={18} />
              </a>
            ) : null}
          </div>
        </div>
      </header>

      <button
        type="button"
        onClick={() => onOpen(project)}
        aria-label={`Open full-size preview of ${project.title}`}
        className="relative aspect-[21/9] w-full cursor-pointer overflow-hidden rounded-[28px] border border-white/20 bg-[#161616] text-left shadow-2xl ring-1 ring-white/10 transition-all duration-500 hover:border-white/40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400"
      >
        {screenshots[0] ? (
          <Image
            src={screenshots[0]}
            alt={`${project.title} project preview`}
            fill
            className="object-contain transition-transform duration-700 group-hover:scale-[1.03]"
            sizes="(max-width: 1023px) 100vw, 50vw"
            priority={index === 0}
          />
        ) : null}
        <span className="pointer-events-none absolute right-4 bottom-4 rounded-full border border-white/20 bg-black/60 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          View full size
        </span>
      </button>

      {project.tags?.length ? (
        <footer className="mt-4 flex shrink-0 flex-wrap gap-2">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-(--card-border) bg-(--card) px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-(--muted) md:text-[10px]"
            >
              {tag}
            </span>
          ))}
        </footer>
      ) : null}
    </motion.article>
  );
}
