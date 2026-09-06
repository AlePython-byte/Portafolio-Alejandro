"use client";

import Image from "next/image";
import type { PointerEvent } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { profile } from "@/data/profile";
import { translations } from "@/data/translations";
import alejandroPhoto from "../../public/images/alejandro-parra.jpeg";
import { ArrowDownIcon, ArrowIcon } from "./icons";
import { usePreferences } from "./preferences-provider";
import { SocialLinks } from "./social-links";

export function Hero() {
  const { language } = usePreferences();
  const copy = translations[language].hero;
  const shouldReduceMotion = useReducedMotion();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const smoothRotateX = useSpring(rotateX, { stiffness: 180, damping: 22 });
  const smoothRotateY = useSpring(rotateY, { stiffness: 180, damping: 22 });

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || shouldReduceMotion) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    rotateX.set(y * -4);
    rotateY.set(x * 4);
  };

  const resetTilt = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <section
      id="home"
      className="section-shell hero-grid relative grid min-h-[calc(100svh-2rem)] items-center gap-14 pb-14 pt-32 sm:pt-36 xl:gap-16 xl:pb-16 xl:pt-40"
    >
      <motion.div
        className="relative z-10 min-w-0"
        initial={shouldReduceMotion ? false : { y: 24 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="eyebrow mb-7">{copy.eyebrow}</p>
        <h1 className="hero-title">
          <span className="block text-[0.37em] font-semibold tracking-[-0.035em] text-[var(--muted)]">
            {copy.greeting}
          </span>
          Alejandro
          <span className="text-[var(--accent)]">.</span>
        </h1>
        <p className="mt-7 max-w-[39rem] text-lg leading-8 text-[var(--muted)] sm:text-xl sm:leading-9">
          {copy.lead}
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a className="primary-button group" href="#projects">
            {copy.projectsButton}
            <ArrowIcon className="size-5 transition-transform group-hover:translate-x-1" />
          </a>
          <a className="secondary-button" href="#about">
            {copy.aboutButton}
          </a>
        </div>
        <SocialLinks label={copy.socialLabel} />
      </motion.div>

      <motion.div
        className="relative mx-auto w-full min-w-0 max-w-[29rem] [perspective:1000px] xl:ml-auto"
        initial={shouldReduceMotion ? false : { y: 30, rotate: 2 }}
        animate={{ y: 0, rotate: 0 }}
        transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
        <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
        <motion.div
          className="identity-card relative aspect-[4/5] overflow-hidden rounded-[2.25rem] p-6 sm:p-8"
          style={{ rotateX: smoothRotateX, rotateY: smoothRotateY }}
          onPointerMove={handlePointerMove}
          onPointerLeave={resetTilt}
        >
          <div className="flex items-start justify-between">
            <p className="text-[0.66rem] font-extrabold uppercase tracking-[0.22em] text-[var(--muted)]">
              {copy.cardLabel} / 01
            </p>
            <span className="status-dot" aria-hidden="true" />
          </div>

          <div className="absolute inset-x-6 top-1/2 -translate-y-[56%] sm:inset-x-8">
            <div className="profile-photo-frame mx-auto aspect-square w-[64%] overflow-hidden rounded-full">
              <Image
                src={alejandroPhoto}
                alt={copy.photoAlt}
                fill
                preload
                sizes="(max-width: 639px) 15rem, 19rem"
                className="profile-photo"
              />
            </div>
          </div>

          <div className="absolute inset-x-6 bottom-6 border-t border-[var(--line)] pt-5 sm:inset-x-8 sm:bottom-8">
            <p className="text-2xl font-bold tracking-[-0.04em]">
              {profile.name}
            </p>
            <div className="mt-3 flex items-center justify-between gap-4">
              <p className="text-sm text-[var(--muted)]">{copy.cardDetail}</p>
              <p className="hidden items-center gap-2 text-right text-[0.68rem] font-bold uppercase tracking-[0.12em] text-[var(--muted)] sm:flex">
                <span className="status-dot small" />
                {copy.available}
              </p>
            </div>
          </div>
          <span className="card-corner card-corner-top" aria-hidden="true" />
          <span className="card-corner card-corner-bottom" aria-hidden="true" />
        </motion.div>
      </motion.div>

      <a
        href="#about"
        className="scroll-cue absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[var(--muted)] xl:flex"
      >
        {copy.scroll}
        <ArrowDownIcon className="size-4" />
      </a>
    </section>
  );
}
