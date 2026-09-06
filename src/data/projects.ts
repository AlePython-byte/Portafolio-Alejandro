import type { StaticImageData } from "next/image";
import bandSyncImage from "../../public/images/bandsync.png";
import ganaderiaImage from "../../public/images/ganaderia-4.png";
import pulseBurnImage from "../../public/images/pulseburn.png";
import type { LocalizedText } from "./profile";
import type { Technology } from "./skills";

export type ProjectCover = "cattle" | "music" | "band";

export type Project = {
  name: string;
  description: LocalizedText;
  technologies: Technology[];
  cover: ProjectCover;
  image?: StaticImageData;
  demoUrl?: string;
  githubUrl: string;
};

export const projects: Project[] = [
  {
    name: "Ganadería 4.0",
    description: {
      es: "Backend para monitoreo ganadero con collares IoT, telemetría GPS, geocercas y alertas operativas.",
      en: "Backend for livestock monitoring with IoT collars, GPS telemetry, geofences, and operational alerts.",
    },
    technologies: [
      { id: "java", name: "Java" },
      { id: "spring", name: "Spring Boot" },
      { id: "postgresql", name: "PostgreSQL" },
      { id: "docker", name: "Docker" },
      { id: "github-actions", name: "GitHub Actions" },
    ],
    cover: "cattle",
    image: ganaderiaImage,
    githubUrl: "https://github.com/AlePython-byte/ganaderia-backend",
    demoUrl: "https://ganaderia-40.vercel.app/dashboard",
  },
  {
    name: "PulseBurn",
    description: {
      es: "Reproductor de música.",
      en: "Music player.",
    },
    technologies: [],
    cover: "music",
    image: pulseBurnImage,
    githubUrl: "https://github.com/AlePython-byte/PulseBurn-Player",
    demoUrl: "https://pulse-burn-player.vercel.app/",
  },
  {
    name: "BandSync",
    description: {
      es: "Sistema para gestionar bandas musicales.",
      en: "A system for managing music bands.",
    },
    technologies: [],
    cover: "band",
    image: bandSyncImage,
    githubUrl: "https://github.com/AlePython-byte/BandSync",
    demoUrl: "https://bandsync-front.vercel.app/login",
  },
];
