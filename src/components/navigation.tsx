"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { profile } from "@/data/profile";
import { translations } from "@/data/translations";
import { CloseIcon, MenuIcon, MoonIcon, SunIcon } from "./icons";
import { usePreferences } from "./preferences-provider";

const navItems = [
  ["home", "home", "00"],
  ["about", "about", "01"],
  ["personal", "personal", "02"],
  ["skills", "skills", "03"],
  ["projects", "projects", "04"],
  ["contact", "contact", "05"],
] as const;

export function Navigation() {
  const { language, theme, setLanguage, toggleTheme } = usePreferences();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const copy = translations[language];

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    let animationFrame = 0;

    const updateActiveSection = () => {
      const activationLine = window.scrollY + 140;
      const isAtPageEnd =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;
      let currentSection = "home";

      for (const [id] of navItems) {
        const section = document.getElementById(id);
        if (section && section.offsetTop <= activationLine) {
          currentSection = id;
        }
      }

      if (isAtPageEnd) {
        currentSection = navItems.at(-1)?.[0] ?? currentSection;
      }

      setActiveSection(currentSection);
    };

    const handleScroll = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(updateActiveSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    animationFrame = window.requestAnimationFrame(updateActiveSection);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-5">
      <nav
        className="nav-shell mx-auto flex h-[4.5rem] w-full max-w-[76rem] items-center justify-between rounded-[1.4rem] px-3 sm:px-4"
        aria-label="Primary navigation"
      >
        <a
          href="#home"
          className="brand-mark grid size-12 shrink-0 place-items-center rounded-2xl text-sm font-black tracking-[-0.04em]"
          aria-label={`${profile.name} — ${copy.nav.home}`}
          onClick={closeMenu}
        >
          {profile.initials}
        </a>

        <div className="hidden items-center gap-1 xl:flex">
          {navItems.map(([id, label]) => (
            <a
              key={id}
              className={`nav-link ${activeSection === id ? "is-active" : ""}`}
              href={`#${id}`}
              aria-current={activeSection === id ? "location" : undefined}
            >
              {activeSection === id ? (
                <motion.span
                  className="nav-active-indicator"
                  layoutId="active-nav-indicator"
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 420, damping: 35 }
                  }
                  aria-hidden="true"
                />
              ) : null}
              <span className="relative z-10">{copy.nav[label]}</span>
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            className="control-button grid size-12 place-items-center rounded-2xl text-xs font-extrabold tracking-[0.12em]"
            type="button"
            onClick={() => setLanguage(language === "es" ? "en" : "es")}
            aria-label={copy.nav.language}
          >
            {language === "es" ? "EN" : "ES"}
          </button>
          <button
            className="control-button grid size-12 place-items-center rounded-2xl"
            type="button"
            onClick={toggleTheme}
            aria-label={
              theme === "light" ? copy.nav.themeDark : copy.nav.themeLight
            }
          >
            {theme === "light" ? (
              <MoonIcon className="size-[1.15rem]" />
            ) : (
              <SunIcon className="size-[1.15rem]" />
            )}
          </button>
          <button
            ref={menuButtonRef}
            className="control-button grid size-12 place-items-center rounded-2xl xl:hidden"
            type="button"
            onClick={() => setIsOpen((current) => !current)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? copy.nav.closeMenu : copy.nav.openMenu}
          >
            {isOpen ? (
              <CloseIcon className="size-5" />
            ) : (
              <MenuIcon className="size-5" />
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            id="mobile-menu"
            className="mobile-menu mx-auto mt-2 max-w-[76rem] overflow-hidden rounded-[1.4rem] p-2 xl:hidden"
            initial={shouldReduceMotion ? false : { opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            {navItems.map(([id, label, number]) => (
              <a
                key={id}
                className={`mobile-nav-link ${activeSection === id ? "is-active" : ""}`}
                href={`#${id}`}
                onClick={closeMenu}
                aria-current={activeSection === id ? "location" : undefined}
              >
                <span className="text-[0.65rem] font-bold text-[var(--accent)]">
                  {number}
                </span>
                {copy.nav[label]}
              </a>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
