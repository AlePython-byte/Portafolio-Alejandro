"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type Ref,
} from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import {
  LuArrowLeft,
  LuGamepad2,
  LuPause,
  LuPawPrint,
  LuPlay,
} from "react-icons/lu";
import { personalCopy, personalImages } from "@/data/personal";
import { usePreferences } from "./preferences-provider";

type PieceId = "mullis" | "music" | "game" | "travel";
type SpinMode = "auto" | "paused" | "playing";
type SectionCopy = (typeof personalCopy)[keyof typeof personalCopy];

const pieceIds: PieceId[] = ["mullis", "music", "game", "travel"];
const fanPositions = [
  { rotation: "-5deg", offset: "1.6rem" },
  { rotation: "-1.7deg", offset: "0" },
  { rotation: "2deg", offset: ".35rem" },
  { rotation: "5deg", offset: "1.8rem" },
];

const reveal = (reducedMotion: boolean | null, delay = 0) => ({
  initial: reducedMotion ? false : { y: 20 },
  whileInView: { y: 0 },
  viewport: { once: true, amount: 0.12 },
  transition: { duration: reducedMotion ? 0 : 0.45, delay },
});

type VinylProps = {
  albumAlt: string;
  albumTitle: string;
  isSpinning: boolean;
  onCoverError: () => void;
  showCover: boolean;
};

function Vinyl({
  albumAlt,
  albumTitle,
  isSpinning,
  onCoverError,
  showCover,
}: VinylProps) {
  return (
    <div className="vinyl-positioner" aria-label={albumTitle}>
      <div className={`vinyl-record ${isSpinning ? "is-spinning" : ""}`}>
        <span className="vinyl-reflection" aria-hidden="true" />
        <div className="vinyl-label">
          {personalImages.albumCover && showCover ? (
            <Image
              src={personalImages.albumCover}
              alt={albumAlt}
              fill
              sizes="10rem"
              className="object-cover"
              onError={onCoverError}
            />
          ) : (
            <span>{albumTitle}</span>
          )}
        </div>
        <span className="vinyl-hole" aria-hidden="true" />
      </div>
    </div>
  );
}

type MediaProps = {
  id: PieceId;
  copy: SectionCopy;
  expanded: boolean;
  isSelected: boolean;
  isSpinning: boolean;
  showAlbumCover: boolean;
  onAlbumCoverError: () => void;
  onToggle: (id: PieceId) => void;
};

function StoryMedia({
  id,
  copy,
  expanded,
  isSelected,
  isSpinning,
  showAlbumCover,
  onAlbumCoverError,
  onToggle,
}: MediaProps) {
  const piece = copy[id];
  const controlLabel = `${
    isSelected ? copy.collapseStory : copy.selectStory
  }: ${piece.title}`;
  const commonButtonProps = {
    type: "button" as const,
    "aria-expanded": isSelected,
    "aria-controls": isSelected ? "personal-expanded-story" : undefined,
    "aria-label": controlLabel,
    onClick: () => onToggle(id),
  };

  if (id === "music") {
    return (
      <div className={`music-object-stage ${expanded ? "is-expanded" : ""}`}>
        <button
          {...commonButtonProps}
          className="story-photo-control album-sleeve"
        >
          <Image
            src={personalImages.feid}
            alt={copy.music.imageAlt}
            fill
            sizes={expanded ? "(max-width: 899px) 58vw, 25rem" : "14rem"}
            className="object-cover"
          />
        </button>
        <Vinyl
          albumAlt={copy.music.albumAlt}
          albumTitle={copy.music.album}
          isSpinning={isSpinning}
          onCoverError={onAlbumCoverError}
          showCover={showAlbumCover}
        />
      </div>
    );
  }

  if (id === "mullis") {
    return (
      <figure
        className={`story-figure mullis-figure ${expanded ? "is-expanded" : ""}`}
      >
        <button {...commonButtonProps} className="story-photo-control">
          <Image
            src={personalImages.mullis}
            alt={copy.mullis.imageAlt}
            fill
            sizes={
              expanded
                ? "(max-width: 899px) calc(100vw - 5rem), 27rem"
                : "17rem"
            }
            className="object-cover object-[50%_42%]"
          />
        </button>
        <figcaption className="personal-nameplate">
          <LuPawPrint className="size-4" aria-hidden="true" />
          {copy.mullis.plaque}
        </figcaption>
      </figure>
    );
  }

  if (id === "game") {
    return (
      <figure
        className={`story-figure game-case ${expanded ? "is-expanded" : ""}`}
      >
        <button {...commonButtonProps} className="story-photo-control">
          <Image
            src={personalImages.residentEvil}
            alt={copy.game.imageAlt}
            fill
            sizes={
              expanded
                ? "(max-width: 899px) calc(100vw - 5rem), 22rem"
                : "17rem"
            }
            className="object-cover object-[50%_78%]"
          />
        </button>
      </figure>
    );
  }

  return (
    <figure
      className={`story-figure travel-postcard ${expanded ? "is-expanded" : ""}`}
    >
      <button {...commonButtonProps} className="story-photo-control">
        <Image
          src={personalImages.travel}
          alt={copy.travel.imageAlt}
          fill
          sizes={
            expanded
              ? "(max-width: 899px) calc(100vw - 5rem), 40rem"
              : "17rem"
          }
          className="object-cover"
        />
      </button>
      {expanded ? (
        <figcaption className="travel-note">{copy.travel.note}</figcaption>
      ) : null}
    </figure>
  );
}

type VinylControlProps = {
  copy: SectionCopy;
  enabled: boolean;
  onToggle: () => void;
};

function VinylControl({ copy, enabled, onToggle }: VinylControlProps) {
  return (
    <button
      type="button"
      className="vinyl-control"
      aria-pressed={enabled}
      onClick={onToggle}
    >
      {enabled ? (
        <LuPause className="size-4" aria-hidden="true" />
      ) : (
        <LuPlay className="size-4" aria-hidden="true" />
      )}
      {enabled ? copy.music.pause : copy.music.play}
    </button>
  );
}

type CompactCardProps = MediaProps & {
  index: number;
  rotationEnabled: boolean;
  onToggleRotation: () => void;
  musicRef?: Ref<HTMLDivElement>;
  reducedMotion: boolean | null;
};

function CompactCard({
  index,
  rotationEnabled,
  onToggleRotation,
  musicRef,
  reducedMotion,
  ...mediaProps
}: CompactCardProps) {
  const piece = mediaProps.copy[mediaProps.id];
  const fanStyle = {
    "--fan-rotation": fanPositions[index].rotation,
    "--fan-offset": fanPositions[index].offset,
  } as CSSProperties;

  return (
    <motion.div
      layout
      ref={mediaProps.id === "music" ? musicRef : undefined}
      className="personal-fan-card-wrap"
      transition={{ duration: reducedMotion ? 0 : 0.28 }}
    >
      <article className="personal-compact-card" style={fanStyle}>
        <StoryMedia {...mediaProps} expanded={false} />
        <div className="personal-compact-copy">
          <h3>{piece.title}</h3>
          <p>{piece.short}</p>
          {mediaProps.id === "music" ? (
            <VinylControl
              copy={mediaProps.copy}
              enabled={rotationEnabled}
              onToggle={onToggleRotation}
            />
          ) : null}
        </div>
      </article>
    </motion.div>
  );
}

type ExpandedStoryProps = MediaProps & {
  rotationEnabled: boolean;
  onToggleRotation: () => void;
  onBack: () => void;
  musicRef?: Ref<HTMLDivElement>;
  reducedMotion: boolean | null;
};

function ExpandedStory({
  rotationEnabled,
  onToggleRotation,
  onBack,
  musicRef,
  reducedMotion,
  ...mediaProps
}: ExpandedStoryProps) {
  const piece = mediaProps.copy[mediaProps.id];

  return (
    <motion.article
      id="personal-expanded-story"
      ref={mediaProps.id === "music" ? musicRef : undefined}
      className="personal-expanded-story"
      initial={reducedMotion ? false : { y: 18, scale: 0.99 }}
      animate={{ y: 0, scale: 1 }}
      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
      transition={{ duration: reducedMotion ? 0 : 0.3 }}
    >
      <div className={`personal-expanded-grid is-${mediaProps.id}`}>
        <div className="personal-expanded-media">
          <StoryMedia {...mediaProps} expanded />
        </div>
        <div className="personal-expanded-copy">
          {mediaProps.id === "music" ? (
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="detail-label">{mediaProps.copy.music.albumLabel}</p>
                <p className="mt-2 font-semibold text-[var(--accent)]">
                  {mediaProps.copy.music.album}
                </p>
              </div>
              <VinylControl
                copy={mediaProps.copy}
                enabled={rotationEnabled}
                onToggle={onToggleRotation}
              />
            </div>
          ) : null}
          {mediaProps.id === "game" ? (
            <p className="favorite-game-label mb-6">
              <LuGamepad2 className="size-5" aria-hidden="true" />
              {mediaProps.copy.game.favoriteLabel}
            </p>
          ) : null}
          <h3>{piece.title}</h3>
          <p className="personal-full-story">{piece.text}</p>
          <button type="button" className="back-to-cards" onClick={onBack}>
            <LuArrowLeft className="size-4" aria-hidden="true" />
            {mediaProps.copy.backToCards}
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export function PersonalSection() {
  const { language } = usePreferences();
  const copy = personalCopy[language];
  const shouldReduceMotion = useReducedMotion();
  const musicPieceRef = useRef<HTMLDivElement>(null);
  const [selectedId, setSelectedId] = useState<PieceId | null>(null);
  const [isMusicVisible, setIsMusicVisible] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(true);
  const [spinMode, setSpinMode] = useState<SpinMode>("auto");
  const [vinylReducedMotion, setVinylReducedMotion] = useState(true);
  const [albumCoverAvailable, setAlbumCoverAvailable] = useState(
    Boolean(personalImages.albumCover),
  );

  useEffect(() => {
    const musicPiece = musicPieceRef.current;
    if (!musicPiece) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsMusicVisible(entry.isIntersecting),
      { threshold: 0.08 },
    );
    observer.observe(musicPiece);
    return () => observer.disconnect();
  }, [selectedId]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () =>
      setVinylReducedMotion(mediaQuery.matches);
    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);
    return () =>
      mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    const updateVisibility = () =>
      setIsPageVisible(document.visibilityState === "visible");
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () =>
      document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  const rotationEnabled =
    spinMode === "playing" || (spinMode === "auto" && !vinylReducedMotion);
  const isSpinning = rotationEnabled && isMusicVisible && isPageVisible;
  const visibleCompactIds = selectedId
    ? pieceIds.filter((id) => id !== selectedId)
    : pieceIds;

  const toggleStory = (id: PieceId) =>
    setSelectedId((current) => (current === id ? null : id));
  const toggleRotation = () =>
    setSpinMode(rotationEnabled ? "paused" : "playing");

  const sharedMediaProps = (id: PieceId): MediaProps => ({
    id,
    copy,
    expanded: false,
    isSelected: selectedId === id,
    isSpinning,
    showAlbumCover: albumCoverAvailable,
    onAlbumCoverError: () => setAlbumCoverAvailable(false),
    onToggle: toggleStory,
  });

  return (
    <section id="personal" className="section-shell section-spacing">
      <div className="grid gap-8 lg:grid-cols-[1fr_0.82fr] lg:items-end">
        <motion.div {...reveal(shouldReduceMotion)}>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2 className="section-title mt-5 max-w-[10ch]">{copy.title}</h2>
        </motion.div>
        <motion.p
          {...reveal(shouldReduceMotion, 0.04)}
          className="max-w-[34rem] text-base leading-7 text-[var(--muted)] lg:justify-self-end lg:text-right"
        >
          {copy.intro}
        </motion.p>
      </div>

      <div className="personal-desk mt-12 rounded-[2.75rem] p-3 sm:p-6 lg:p-8">
        <AnimatePresence mode="wait" initial={false}>
          {selectedId ? (
            <ExpandedStory
              key={selectedId}
              {...sharedMediaProps(selectedId)}
              expanded
              isSelected
              rotationEnabled={rotationEnabled}
              onToggleRotation={toggleRotation}
              onBack={() => setSelectedId(null)}
              musicRef={selectedId === "music" ? musicPieceRef : undefined}
              reducedMotion={shouldReduceMotion}
            />
          ) : null}
        </AnimatePresence>

        <div
          className={`personal-fan ${selectedId ? "is-selector" : "is-resting"}`}
        >
          {visibleCompactIds.map((id, compactIndex) => {
            const originalIndex = pieceIds.indexOf(id);
            return (
              <CompactCard
                key={id}
                {...sharedMediaProps(id)}
                index={selectedId ? compactIndex + 1 : originalIndex}
                rotationEnabled={rotationEnabled}
                onToggleRotation={toggleRotation}
                musicRef={id === "music" ? musicPieceRef : undefined}
                reducedMotion={shouldReduceMotion}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
