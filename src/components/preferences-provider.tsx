"use client";

import {
  createContext,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { Language } from "@/data/profile";

type Theme = "light" | "dark";

type PreferencesContextValue = {
  language: Language;
  theme: Theme;
  setLanguage: (language: Language) => void;
  toggleTheme: () => void;
};

const PreferencesContext = createContext<PreferencesContextValue | null>(null);
const preferenceEvent = "portfolio-preference-change";

function subscribeToPreferences(callback: () => void) {
  window.addEventListener(preferenceEvent, callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener(preferenceEvent, callback);
    window.removeEventListener("storage", callback);
  };
}

function getLanguageSnapshot(): Language {
  return window.localStorage.getItem("portfolio-language") === "en"
    ? "en"
    : "es";
}

function getThemeSnapshot(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const language = useSyncExternalStore<Language>(
    subscribeToPreferences,
    getLanguageSnapshot,
    () => "es" as Language,
  );
  const theme = useSyncExternalStore<Theme>(
    subscribeToPreferences,
    getThemeSnapshot,
    () => "light" as Theme,
  );

  const setLanguage = (nextLanguage: Language) => {
    document.documentElement.lang = nextLanguage;
    window.localStorage.setItem("portfolio-language", nextLanguage);
    window.dispatchEvent(new Event(preferenceEvent));
  };

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.style.colorScheme = nextTheme;
    window.localStorage.setItem("portfolio-theme", nextTheme);
    window.dispatchEvent(new Event(preferenceEvent));
  };

  return (
    <PreferencesContext.Provider
      value={{ language, theme, setLanguage, toggleTheme }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const context = useContext(PreferencesContext);

  if (!context) {
    throw new Error("usePreferences must be used within PreferencesProvider");
  }

  return context;
}
