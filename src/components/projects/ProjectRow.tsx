"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, Github } from "lucide-react";
import type { Project } from "@/data/projects";

interface ProjectRowProps {
  project: Project;
  index: number;
  onOpen: (project: Project) => void;
}

export function ProjectRow({ project, index, onOpen }: ProjectRowProps) {
  const cover = project.screenshots?.[0];
  // Static imports carry their intrinsic size, so every screenshot keeps its
  // own ratio rather than being letterboxed into one fixed frame.
  const ratio = cover && typeof cover === "object" ? cover.width / cover.height : 16 / 10;
  const imageFirst = index % 2 === 0;
  // The column template has to mirror along with the order, or the image lands
  // in the narrow column on every alternating row.
  const columns = imageFirst
    ? "lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]"
    : "lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]";

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
      className={`group grid items-center gap-8 border-t border-ivory/10 py-14 lg:gap-16 lg:py-20 ${columns}`}
    >
      {/* Screenshot */}
      <button
        type="button"
        onClick={() => onOpen(project)}
        aria-label={`Open full-size preview of ${project.title}`}
        className={`relative block w-full cursor-pointer overflow-hidden bg-onyx focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne ${
          imageFirst ? "lg:order-1" : "lg:order-2"
        }`}
        style={{ aspectRatio: ratio }}
      >
        {cover ? (
          <Image
            src={cover}
            alt={`${project.title} project preview`}
            fill
            sizes="(max-width: 1023px) 100vw, 62vw"
            priority={index === 0}
            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
          />
        ) : null}

        {/* Champagne inset frame, drawn on hover */}
        <span className="pointer-events-none absolute inset-5 border border-champagne/0 transition-all duration-700 group-hover:border-champagne/35" />

        {/* Slow sheen */}
        <span className="pointer-events-none absolute inset-0 overflow-hidden">
          <span className="absolute inset-y-0 -left-1/3 w-1/3 -translate-x-full skew-x-12 bg-linear-to-r from-transparent via-ivory/12 to-transparent transition-transform duration-1200 ease-out group-hover:translate-x-[400%]" />
        </span>
      </button>

      {/* Caption block */}
      <div className={imageFirst ? "lg:order-2" : "lg:order-1"}>
        <div className="flex items-center gap-4">
          <span className="display text-5xl text-champagne/35 transition-colors duration-700 group-hover:text-champagne/70 sm:text-6xl">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="h-px flex-1 bg-ivory/10 transition-colors duration-700 group-hover:bg-champagne/30" />
        </div>

        <h3 className="display mt-6 text-3xl sm:text-4xl lg:text-5xl">{project.title}</h3>

        {project.description ? (
          <p className="mt-5 max-w-md text-sm font-light leading-relaxed text-(--muted) sm:text-base">
            {project.description}
          </p>
        ) : null}

        {project.tags?.length ? (
          <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1">
            {project.tags.slice(0, 5).map((tag, tagIndex) => (
              <span key={tag} className="meta">
                {tagIndex > 0 ? <span className="mr-3 text-champagne/60">·</span> : null}
                {tag}
              </span>
            ))}
          </p>
        ) : null}

        <div className="mt-8 flex flex-wrap items-center gap-6">
          <button
            type="button"
            onClick={() => onOpen(project)}
            className="group/link flex items-center gap-3 font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-ivory/70 transition-colors duration-500 hover:text-champagne"
          >
            View full size
            <span className="h-px w-8 bg-champagne/50 transition-all duration-500 group-hover/link:w-14 group-hover/link:bg-champagne" />
          </button>

          {project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-(--muted) transition-colors duration-500 hover:text-champagne"
            >
              Visit site
              <ArrowUpRight size={13} />
            </a>
          ) : null}

          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-(--muted) transition-colors duration-500 hover:text-champagne"
            >
              Source
              <Github size={13} />
            </a>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}
