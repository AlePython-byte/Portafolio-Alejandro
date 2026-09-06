"use client";

import { translations } from "@/data/translations";
import { AboutSection } from "./about-section";
import { ContactSection } from "./contact-section";
import { Hero } from "./hero";
import { Navigation } from "./navigation";
import { PersonalSection } from "./personal-section";
import { PreferencesProvider, usePreferences } from "./preferences-provider";
import { ProjectsSection } from "./projects-section";
import { SkillsSection } from "./skills-section";

function PortfolioContent() {
  const { language } = usePreferences();
  const copy = translations[language];

  return (
    <>
      <a className="skip-link" href="#main-content">
        {copy.skip}
      </a>
      <Navigation />
      <main id="main-content">
        <Hero />
        <AboutSection />
        <PersonalSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <footer className="section-shell flex flex-col gap-3 border-t border-[var(--line)] py-7 text-xs font-semibold tracking-[0.04em] text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
        <p>{copy.footer}</p>
        <p>© {new Date().getFullYear()} · AP</p>
      </footer>
    </>
  );
}

export function Portfolio() {
  return (
    <PreferencesProvider>
      <PortfolioContent />
    </PreferencesProvider>
  );
}
