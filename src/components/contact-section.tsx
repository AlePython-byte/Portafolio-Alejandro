"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";
import { translations } from "@/data/translations";
import { EmailIcon } from "./brand-icon";
import { CheckIcon, CopyIcon } from "./icons";
import { usePreferences } from "./preferences-provider";
import { SocialLinks } from "./social-links";

type CopyStatus = "idle" | "copied" | "error";

export function ContactSection() {
  const { language } = usePreferences();
  const copy = translations[language].contact;
  const [copyStatus, setCopyStatus] = useState<CopyStatus>("idle");
  const resetTimer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (resetTimer.current) window.clearTimeout(resetTimer.current);
    },
    [],
  );

  const copyEmail = async () => {
    if (resetTimer.current) window.clearTimeout(resetTimer.current);

    try {
      if (!navigator.clipboard) throw new Error("Clipboard API unavailable");
      await navigator.clipboard.writeText(profile.email);
      setCopyStatus("copied");
      resetTimer.current = window.setTimeout(
        () => setCopyStatus("idle"),
        2400,
      );
    } catch {
      setCopyStatus("error");
    }
  };

  return (
    <section id="contact" className="section-shell section-spacing pb-10">
      <div className="contact-panel relative overflow-hidden rounded-[2.5rem] px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-16">
        <div className="contact-glow" aria-hidden="true" />
        <div className="relative z-10 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <p className="eyebrow on-accent-label">{copy.eyebrow}</p>
            <h2 className="section-title mt-5 max-w-[12ch] text-current">
              {copy.title}
            </h2>
            <p className="on-accent-copy mt-6 max-w-[38rem] text-lg leading-8">
              {copy.body}
            </p>
          </div>

          <div className="contact-channels lg:justify-self-end">
            <div className="flex flex-wrap gap-3">
              <a className="contact-action" href={`mailto:${profile.email}`}>
                <EmailIcon className="size-5" />
                <span>{profile.email}</span>
              </a>
              <button className="contact-action" type="button" onClick={copyEmail}>
                {copyStatus === "copied" ? (
                  <CheckIcon className="size-5" />
                ) : (
                  <CopyIcon className="size-5" />
                )}
                {copyStatus === "copied" ? copy.copied : copy.copy}
              </button>
            </div>

            <SocialLinks label={copy.socialLabel} variant="contact" />

            <p
              className={`contact-copy-status ${
                copyStatus === "error" ? "is-error" : ""
              }`}
              aria-live="polite"
            >
              {copyStatus === "copied"
                ? copy.copied
                : copyStatus === "error"
                  ? copy.copyError
                  : ""}
            </p>
          </div>
        </div>
        <div className="contact-monogram" aria-hidden="true">
          AP
        </div>
      </div>
    </section>
  );
}
