"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { skillCategories, type SkillCategory } from "@/data/skills";
import { translations } from "@/data/translations";
import { TechnologyIcon } from "./brand-icon";
import { usePreferences } from "./preferences-provider";

const restingRotations = [-3.5, 2.25, -1.75, 2.75, -2.25];

type SkillCardProps = {
  category: SkillCategory;
  cardLabel: string;
  language: "es" | "en";
  mobile?: boolean;
};

function SkillCard({
  category,
  cardLabel,
  language,
  mobile = false,
}: SkillCardProps) {
  return (
    <article
      className={`skill-card flex h-full min-h-[27rem] flex-col rounded-[2rem] p-6 ${
        mobile
          ? "w-[84vw] max-w-[21rem] shrink-0 snap-center"
          : "w-[16.25rem] shrink-0"
      }`}
      aria-label={`${cardLabel}: ${category.title[language]}`}
      tabIndex={mobile ? 0 : undefined}
    >
      <div className="flex items-start justify-between">
        <span className="text-xs font-extrabold tracking-[0.18em] text-[var(--accent)]">
          {category.index}
        </span>
        <span className="card-pip" aria-hidden="true" />
      </div>

      <ul className="technology-grid mt-7 grid grid-cols-2 gap-2">
        {category.technologies.map((technology) => (
          <li className="technology-chip" key={technology.id}>
            <TechnologyIcon id={technology.id} className="size-[1.05rem] shrink-0" />
            <span>{technology.name}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-7">
        <p className="mb-4 text-sm leading-6 text-[var(--muted)]">
          {category.description[language]}
        </p>
        <h3 className="max-w-[10ch] text-[2.15rem] font-black leading-[0.98] tracking-[-0.06em]">
          {category.title[language]}
        </h3>
      </div>
    </article>
  );
}

export function SkillsSection() {
  const { language } = usePreferences();
  const copy = translations[language].skills;
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [topIndex, setTopIndex] = useState<number | null>(null);
  const releaseTimer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (releaseTimer.current) window.clearTimeout(releaseTimer.current);
    },
    [],
  );

  const activateCard = (index: number) => {
    if (releaseTimer.current) window.clearTimeout(releaseTimer.current);
    setTopIndex(index);
    setActiveIndex(index);
  };

  const releaseCards = () => {
    setActiveIndex(null);
    releaseTimer.current = window.setTimeout(() => setTopIndex(null), 360);
  };

  return (
    <section id="skills" className="section-spacing overflow-hidden">
      <div className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="eyebrow">{copy.eyebrow}</p>
            <h2 className="section-title mt-5 max-w-[12ch]">{copy.title}</h2>
          </div>
          <p className="max-w-[31rem] text-base leading-7 text-[var(--muted)] lg:text-right">
            {copy.intro}
          </p>
        </div>

        <div className="skills-desktop mt-12">
          <p className="mb-7 flex items-center gap-3 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
            <span className="h-px w-8 bg-[var(--line-strong)]" />
            {copy.hint}
          </p>
          <div
            className="skill-deck flex min-h-[32rem] items-center justify-center"
            onMouseLeave={releaseCards}
          >
            {skillCategories.map((category, index) => {
              const isActive = index === activeIndex;
              const direction =
                activeIndex === null
                  ? 0
                  : index < activeIndex
                    ? -28
                    : index > activeIndex
                      ? 28
                      : 0;

              return (
                <motion.div
                  key={category.id}
                  className="skill-stack-item relative focus-visible:outline-none"
                  tabIndex={0}
                  onHoverStart={() => activateCard(index)}
                  onPointerDown={() => activateCard(index)}
                  onFocus={() => activateCard(index)}
                  onBlur={releaseCards}
                  animate={{
                    x: shouldReduceMotion ? 0 : direction,
                    y: shouldReduceMotion ? 0 : isActive ? -24 : 0,
                    rotate: isActive ? 0 : restingRotations[index],
                    scale: shouldReduceMotion ? 1 : isActive ? 1.025 : 1,
                  }}
                  initial={{ rotate: restingRotations[index] }}
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 250, damping: 25 }
                  }
                  style={{ zIndex: topIndex === index ? 50 : index + 1 }}
                >
                  <SkillCard
                    category={category}
                    cardLabel={copy.cardLabel}
                    language={language}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="skills-touch mt-10">
        <p className="section-shell mb-6 flex items-center gap-3 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
          <span className="h-px w-8 bg-[var(--line-strong)]" />
          {copy.mobileHint}
        </p>
        <div className="skill-scroll flex snap-x snap-mandatory gap-4 overflow-x-auto px-[max(1.25rem,calc((100vw-76rem)/2))] pb-9 pt-2">
          {skillCategories.map((category) => (
            <SkillCard
              key={category.id}
              category={category}
              cardLabel={copy.cardLabel}
              language={language}
              mobile
            />
          ))}
          <div className="w-2 shrink-0" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
