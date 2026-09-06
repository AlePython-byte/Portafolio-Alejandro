"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { projects, type Project } from "@/data/projects";
import { translations } from "@/data/translations";
import { GithubIcon, ProjectIcon, TechnologyIcon } from "./brand-icon";
import { ExternalIcon } from "./icons";
import { usePreferences } from "./preferences-provider";

type ProjectCardProps = {
  project: Project;
  index: number;
  language: "es" | "en";
};

function ProjectCard({ project, index, language }: ProjectCardProps) {
  const copy = translations[language].projects;
  const shouldReduceMotion = useReducedMotion();
  const isReversed = index % 2 === 1;

  return (
    <motion.article
      className="project-card grid min-w-0 overflow-hidden rounded-[2.25rem] lg:grid-cols-[0.95fr_1.05fr]"
      initial={shouldReduceMotion ? false : { y: 24 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.48, delay: shouldReduceMotion ? 0 : index * 0.07 }}
    >
      <div
        className={`project-cover relative flex min-h-[19rem] items-center overflow-hidden p-4 sm:min-h-[23rem] sm:p-6 ${
          isReversed ? "lg:order-2" : ""
        }`}
      >
        {project.image ? (
          <div className="project-screenshot-frame relative aspect-[2.1/1] w-full overflow-hidden">
            <Image
              src={project.image}
              alt={`${copy.coverLabel} ${project.name}`}
              fill
              sizes="(min-width: 1024px) 36rem, calc(100vw - 4rem)"
              className="project-screenshot"
            />
          </div>
        ) : (
          <div className="project-cover-art absolute inset-0 flex flex-col justify-between p-7 sm:p-9">
            <div className="flex items-center justify-between">
              <span className="project-cover-index">0{index + 1} / 03</span>
              <ProjectIcon kind={project.cover} className="size-8" />
            </div>
            <div className="relative z-10">
              <ProjectIcon
                kind={project.cover}
                className="mb-5 size-12 text-[var(--accent)]"
              />
              <p className="project-cover-title">{project.name}</p>
            </div>
            <span className="project-cover-orbit" aria-hidden="true" />
            <span className="project-cover-grid" aria-hidden="true" />
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-col justify-between p-7 sm:p-10 lg:p-12">
        <div>
          <p className="detail-label">
            {String(index + 1).padStart(2, "0")} · {copy.eyebrow.split(" · ")[1]}
          </p>
          <h3 className="mt-6 text-[clamp(2.25rem,5vw,4.4rem)] font-black leading-[0.94] tracking-[-0.065em]">
            {project.name}
          </h3>
          <p className="mt-6 max-w-[35rem] text-lg leading-8 text-[var(--muted)]">
            {project.description[language]}
          </p>

          {project.technologies.length ? (
            <div className="mt-8">
              <p className="detail-label">{copy.technologiesLabel}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.technologies.map((technology) => (
                  <li className="project-technology" key={technology.id}>
                    <TechnologyIcon id={technology.id} className="size-4" />
                    {technology.name}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            className="secondary-button"
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon className="size-5" />
            {copy.github}
          </a>
          {project.demoUrl ? (
            <a
              className="primary-button"
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {copy.demo}
              <ExternalIcon className="size-4" />
            </a>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}

export function ProjectsSection() {
  const { language } = usePreferences();
  const copy = translations[language].projects;
  const projectCount = String(projects.length).padStart(2, "0");

  return (
    <section id="projects" className="section-shell section-spacing">
      <div className="grid gap-8 lg:grid-cols-[1fr_0.75fr] lg:items-end">
        <div>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2 className="section-title mt-5 max-w-[12ch]">{copy.title}</h2>
        </div>
        <div className="lg:justify-self-end">
          <p className="project-count">
            {projectCount} {copy.countLabel}
          </p>
          <p className="mt-4 max-w-[32rem] text-base leading-7 text-[var(--muted)]">
            {copy.intro}
          </p>
        </div>
      </div>

      <div className="mt-12 grid gap-8 lg:gap-10">
        {projects.map((project, index) => (
          <ProjectCard
            project={project}
            index={index}
            language={language}
            key={project.name}
          />
        ))}
      </div>
    </section>
  );
}
