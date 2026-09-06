"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
} from "react";
import {
  AnimatePresence,
  LayoutGroup,
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
  { rotation: -5, offset: 26 },
  { rotation: -1.7, offset: 0 },
  { rotation: 2, offset: 6 },
  { rotation: 5, offset: 29 },
];

const layoutTransition = {
  type: "spring" as const,
  stiffness: 330,
  damping: 34,
  mass: 0.82,
};

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
  reducedMotion: boolean | null;
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
  reducedMotion,
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
    "data-story-id": id,
    onClick: () => onToggle(id),
  };
  const mediaLayoutProps = {
    layoutId: `personal-media-${id}`,
    transition: {
      layout: reducedMotion ? { duration: 0 } : layoutTransition,
    },
  };

  if (id === "music") {
    return (
      <motion.div
        {...mediaLayoutProps}
        className={`music-object-stage ${expanded ? "is-expanded" : ""}`}
      >
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
      </motion.div>
    );
  }

  if (id === "mullis") {
    return (
      <motion.figure
        {...mediaLayoutProps}
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
      </motion.figure>
    );
  }

  if (id === "game") {
    return (
      <motion.figure
        {...mediaLayoutProps}
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
            className={
              expanded ? "object-contain" : "object-cover object-[50%_78%]"
            }
          />
        </button>
      </motion.figure>
    );
  }

  return (
    <motion.figure
      {...mediaLayoutProps}
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
    </motion.figure>
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
  reducedMotion: boolean | null;
};

function CompactCard({
  index,
  rotationEnabled,
  onToggleRotation,
  reducedMotion,
  ...mediaProps
}: CompactCardProps) {
  const piece = mediaProps.copy[mediaProps.id];
  const fanPosition = fanPositions[index];

  return (
    <motion.div
      layout
      className="personal-fan-card-wrap"
      transition={{ duration: reducedMotion ? 0 : 0.28 }}
    >
      <motion.article
        layoutId={`personal-card-${mediaProps.id}`}
        className="personal-compact-card"
        initial={false}
        animate={
          reducedMotion
            ? { rotate: 0, y: 0 }
            : { rotate: fanPosition.rotation, y: fanPosition.offset }
        }
        whileHover={
          reducedMotion
            ? undefined
            : { y: fanPosition.offset - 6, transition: { duration: 0.18 } }
        }
        transition={{
          layout: reducedMotion ? { duration: 0 } : layoutTransition,
          rotate: { duration: reducedMotion ? 0 : 0.4, ease: "easeOut" },
          y: { duration: reducedMotion ? 0 : 0.4, ease: "easeOut" },
        }}
      >
        <StoryMedia
          {...mediaProps}
          expanded={false}
          reducedMotion={reducedMotion}
        />
        <motion.div
          className="personal-compact-copy"
          layout="position"
          transition={{ duration: reducedMotion ? 0 : 0.2 }}
        >
          <h3>{piece.title}</h3>
          <p>{piece.short}</p>
          {mediaProps.id === "music" ? (
            <VinylControl
              copy={mediaProps.copy}
              enabled={rotationEnabled}
              onToggle={onToggleRotation}
            />
          ) : null}
        </motion.div>
      </motion.article>
    </motion.div>
  );
}

type StorySelectorsProps = {
  copy: SectionCopy;
  selectedId: PieceId;
  onSelect: (id: PieceId) => void;
};

function StorySelectors({
  copy,
  selectedId,
  onSelect,
}: StorySelectorsProps) {
  const selectorImages = {
    mullis: personalImages.mullis,
    music: personalImages.feid,
    game: personalImages.residentEvil,
    travel: personalImages.travel,
  };

  return (
    <div
      className="personal-story-selectors"
      role="group"
      aria-label={copy.storySelectorLabel}
    >
      {pieceIds.map((id) => {
        const isActive = selectedId === id;
        return (
          <button
            key={id}
            type="button"
            className={`personal-story-selector ${isActive ? "is-active" : ""}`}
            aria-pressed={isActive}
            aria-controls="personal-expanded-story"
            onClick={() => onSelect(id)}
          >
            <span className={`personal-selector-thumb is-${id}`}>
              <Image
                src={selectorImages[id]}
                alt=""
                fill
                sizes="4.5rem"
                className={
                  id === "game"
                    ? "object-contain"
                    : id === "mullis"
                      ? "object-cover object-[50%_42%]"
                      : "object-cover"
                }
              />
            </span>
            <span>{copy[id].selectorLabel}</span>
          </button>
        );
      })}
    </div>
  );
}

type ExpandedStoryProps = MediaProps & {
  rotationEnabled: boolean;
  onToggleRotation: () => void;
  onBack: () => void;
  contentVisible: boolean;
  isClosing: boolean;
  reducedMotion: boolean | null;
};

function ExpandedStory({
  rotationEnabled,
  onToggleRotation,
  onBack,
  contentVisible,
  isClosing,
  reducedMotion,
  ...mediaProps
}: ExpandedStoryProps) {
  const piece = mediaProps.copy[mediaProps.id];

  return (
    <motion.article
      id="personal-expanded-story"
      className="personal-expanded-story"
      layout
      layoutId={`personal-card-${mediaProps.id}`}
      transition={{
        layout: reducedMotion ? { duration: 0 } : layoutTransition,
      }}
    >
      <motion.div
        key={mediaProps.id}
        className={`personal-expanded-grid is-${mediaProps.id}`}
        layout
        transition={{
          layout: reducedMotion ? { duration: 0 } : layoutTransition,
        }}
      >
        <motion.div
          className="personal-expanded-media"
          initial={reducedMotion ? false : { opacity: 0.2 }}
          animate={{ opacity: isClosing || contentVisible ? 1 : 0.2 }}
          transition={{ duration: reducedMotion ? 0 : 0.12 }}
        >
          <StoryMedia
            {...mediaProps}
            expanded
            reducedMotion={reducedMotion}
          />
        </motion.div>
        <motion.div
          className="personal-expanded-copy"
          layout="position"
          initial={reducedMotion ? false : { opacity: 0, y: 7 }}
          animate={{
            opacity: contentVisible ? 1 : 0,
            y: contentVisible ? 0 : isClosing ? 5 : -4,
          }}
          transition={{ duration: reducedMotion ? 0 : 0.17, ease: "easeOut" }}
        >
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
        </motion.div>
      </motion.div>
    </motion.article>
  );
}

export function PersonalSection() {
  const { language } = usePreferences();
  const copy = personalCopy[language];
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const selectedIdRef = useRef<PieceId | null>(null);
  const switchTimeoutRef = useRef<number | null>(null);
  const closeTimeoutRef = useRef<number | null>(null);
  const [selectedId, setSelectedId] = useState<PieceId | null>(null);
  const [displayedId, setDisplayedId] = useState<PieceId | null>(null);
  const [openerId, setOpenerId] = useState<PieceId | null>(null);
  const [pendingExpandedFocusId, setPendingExpandedFocusId] =
    useState<PieceId | null>(null);
  const [pendingFanFocusId, setPendingFanFocusId] =
    useState<PieceId | null>(null);
  const [contentVisible, setContentVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(true);
  const [spinMode, setSpinMode] = useState<SpinMode>("auto");
  const [vinylReducedMotion, setVinylReducedMotion] = useState(true);
  const [albumCoverAvailable, setAlbumCoverAvailable] = useState(
    Boolean(personalImages.albumCover),
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsSectionVisible(entry.isIntersecting),
      { threshold: 0.08 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

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

  useEffect(
    () => () => {
      if (switchTimeoutRef.current !== null) {
        window.clearTimeout(switchTimeoutRef.current);
      }
      if (closeTimeoutRef.current !== null) {
        window.clearTimeout(closeTimeoutRef.current);
      }
    },
    [],
  );

  useEffect(() => {
    if (
      pendingExpandedFocusId === null ||
      displayedId !== pendingExpandedFocusId
    ) {
      return;
    }

    const control = sectionRef.current?.querySelector<HTMLButtonElement>(
      `#personal-expanded-story [data-story-id="${pendingExpandedFocusId}"]`,
    );
    if (!control) return;
    control.focus({ preventScroll: true });
    setPendingExpandedFocusId(null);
  }, [displayedId, pendingExpandedFocusId]);

  useEffect(() => {
    if (selectedId !== null || pendingFanFocusId === null) return;

    const control = sectionRef.current?.querySelector<HTMLButtonElement>(
      `.personal-fan [data-story-id="${pendingFanFocusId}"]`,
    );
    if (!control) return;
    control.focus({ preventScroll: true });
    setPendingFanFocusId(null);
  }, [pendingFanFocusId, selectedId]);

  const rotationEnabled =
    spinMode === "playing" || (spinMode === "auto" && !vinylReducedMotion);
  const isSpinning = rotationEnabled && isSectionVisible && isPageVisible;
  const toggleRotation = () =>
    setSpinMode(rotationEnabled ? "paused" : "playing");

  const clearInteractionTimers = () => {
    if (switchTimeoutRef.current !== null) {
      window.clearTimeout(switchTimeoutRef.current);
      switchTimeoutRef.current = null;
    }
    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const openStory = (id: PieceId) => {
    clearInteractionTimers();
    setOpenerId(id);
    setPendingExpandedFocusId(id);
    selectedIdRef.current = id;
    setDisplayedId(id);
    setSelectedId(id);
    setIsClosing(false);
    setContentVisible(true);
  };

  const selectStory = (id: PieceId) => {
    const current = selectedIdRef.current;
    if (current === null) {
      openStory(id);
      return;
    }
    if (current === id) return;

    clearInteractionTimers();
    selectedIdRef.current = id;
    setSelectedId(id);
    setIsClosing(false);
    setContentVisible(false);

    const showNextStory = () => {
      if (selectedIdRef.current !== id) return;
      setDisplayedId(id);
      if (shouldReduceMotion) {
        setContentVisible(true);
      } else {
        window.requestAnimationFrame(() => setContentVisible(true));
      }
      switchTimeoutRef.current = null;
    };

    if (shouldReduceMotion) {
      showNextStory();
    } else {
      switchTimeoutRef.current = window.setTimeout(showNextStory, 110);
    }
  };

  const closeStory = () => {
    const closingId = selectedIdRef.current;
    if (closingId === null) return;

    clearInteractionTimers();
    setIsClosing(true);
    setContentVisible(false);

    const showFan = () => {
      selectedIdRef.current = null;
      setSelectedId(null);
      setDisplayedId(null);
      setIsClosing(false);
      setContentVisible(true);
      closeTimeoutRef.current = null;

      setPendingFanFocusId(openerId ?? closingId);
    };

    if (shouldReduceMotion) {
      showFan();
    } else {
      closeTimeoutRef.current = window.setTimeout(showFan, 170);
    }
  };

  const toggleStory = (id: PieceId) => {
    if (selectedIdRef.current === null) {
      openStory(id);
    } else if (selectedIdRef.current === id) {
      closeStory();
    } else {
      selectStory(id);
    }
  };

  const sharedMediaProps = (
    id: PieceId,
  ): Omit<MediaProps, "onToggle" | "reducedMotion"> => ({
    id,
    copy,
    expanded: false,
    isSelected: selectedId === id,
    isSpinning,
    showAlbumCover: albumCoverAvailable,
    onAlbumCoverError: () => setAlbumCoverAvailable(false),
  });

  return (
    <section
      ref={sectionRef}
      id="personal"
      className="section-shell section-spacing"
    >
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

      <LayoutGroup id="personal-story-layout">
        <motion.div
          layout
          className="personal-desk mt-12"
          transition={{
            layout: shouldReduceMotion
              ? { duration: 0 }
              : layoutTransition,
          }}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {selectedId && displayedId ? (
              <motion.div
                key="personal-detail-state"
                layout
                className="personal-detail-state"
                transition={{
                  layout: shouldReduceMotion
                    ? { duration: 0 }
                    : layoutTransition,
                }}
              >
                <ExpandedStory
                  {...sharedMediaProps(displayedId)}
                  onToggle={toggleStory}
                  expanded
                  isSelected
                  rotationEnabled={rotationEnabled}
                  onToggleRotation={toggleRotation}
                  onBack={closeStory}
                  contentVisible={contentVisible}
                  isClosing={isClosing}
                  reducedMotion={shouldReduceMotion}
                />
                <motion.div
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.2,
                    delay: shouldReduceMotion ? 0 : 0.12,
                  }}
                >
                  <StorySelectors
                    copy={copy}
                    selectedId={selectedId}
                    onSelect={selectStory}
                  />
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="personal-fan-state"
                className="personal-fan is-resting"
                initial={shouldReduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.18 }}
              >
                {pieceIds.map((id, index) => (
                  <CompactCard
                    key={id}
                    {...sharedMediaProps(id)}
                    index={index}
                    rotationEnabled={rotationEnabled}
                    onToggleRotation={toggleRotation}
                    onToggle={toggleStory}
                    reducedMotion={shouldReduceMotion}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>
    </section>
  );
}
