"use client";

import { motion, useReducedMotion } from "motion/react";
import { translations } from "@/data/translations";
import { usePreferences } from "./preferences-provider";

export function AboutSection() {
  const { language } = usePreferences();
  const copy = translations[language].about;
  const shouldReduceMotion = useReducedMotion();
  const reveal = {
    initial: shouldReduceMotion ? false : { y: 20 },
    whileInView: { y: 0 },
    viewport: { once: true, amount: 0.18 },
    transition: { duration: 0.45 },
  } as const;

  return (
    <section id="about" className="section-shell section-spacing">
      <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
        <motion.div {...reveal}>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2 className="section-title mt-5 max-w-[9ch]">{copy.title}</h2>
        </motion.div>

        <div className="about-grid grid gap-4 sm:grid-cols-2">
          <motion.article
            {...reveal}
            className="about-intro neu-panel rounded-[2rem] p-7 sm:col-span-2 sm:p-10"
          >
            <p className="max-w-[44rem] text-xl leading-9 tracking-[-0.02em] text-[var(--ink)] sm:text-2xl sm:leading-10">
              {copy.body}
            </p>
          </motion.article>

          <motion.article
            {...reveal}
            transition={{ duration: 0.45, delay: 0.06 }}
            className="interest-block rounded-[2rem] p-7 sm:p-8"
          >
            <p className="detail-label">{copy.interestsLabel}</p>
            <ul className="mt-7 space-y-4">
              {copy.interests.map((interest, index) => (
                <li
                  key={interest}
                  className="flex items-center gap-4 text-lg font-semibold tracking-[-0.02em]"
                >
                  <span className="grid size-8 place-items-center rounded-full border border-[var(--line)] text-[0.62rem] font-bold text-[var(--accent)]">
                    0{index + 1}
                  </span>
                  {interest}
                </li>
              ))}
            </ul>
          </motion.article>

          <div className="grid gap-4">
            <motion.article
              {...reveal}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="neu-inset rounded-[2rem] p-7 sm:p-8"
            >
              <p className="detail-label">{copy.educationLabel}</p>
              <h3 className="mt-5 text-2xl font-bold tracking-[-0.04em]">
                {copy.educationTitle}
              </h3>
              <p className="mt-3 leading-7 text-[var(--muted)]">
                {copy.educationBody}
              </p>
            </motion.article>

            <motion.article
              {...reveal}
              transition={{ duration: 0.45, delay: 0.14 }}
              className="accent-panel rounded-[2rem] p-7 sm:p-8"
            >
              <p className="detail-label on-accent-label">
                {copy.approachLabel}
              </p>
              <p className="mt-5 text-xl font-semibold leading-8 tracking-[-0.025em]">
                {copy.approachBody}
              </p>
            </motion.article>
          </div>
        </div>
      </div>
    </section>
  );
}
