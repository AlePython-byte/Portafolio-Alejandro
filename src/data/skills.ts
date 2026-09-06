import type { LocalizedText } from "./profile";

export type TechnologyId =
  | "react"
  | "nextjs"
  | "typescript"
  | "tailwind"
  | "html"
  | "vite"
  | "nodejs"
  | "nestjs"
  | "postgresql"
  | "mongodb"
  | "mysql"
  | "redis"
  | "aws"
  | "azure"
  | "docker"
  | "github-actions"
  | "git"
  | "github"
  | "linux"
  | "postman"
  | "java"
  | "spring";

export type Technology = {
  id: TechnologyId;
  name: string;
};

export type SkillCategory = {
  id: string;
  index: string;
  title: LocalizedText;
  description: LocalizedText;
  technologies: Technology[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    index: "01",
    title: { es: "Frontend", en: "Frontend" },
    description: {
      es: "Interfaces web claras, adaptables y centradas en las personas.",
      en: "Clear, responsive web interfaces centered on people.",
    },
    technologies: [
      { id: "react", name: "React" },
      { id: "nextjs", name: "Next.js" },
      { id: "typescript", name: "TypeScript" },
      { id: "tailwind", name: "Tailwind" },
      { id: "html", name: "HTML" },
      { id: "vite", name: "Vite" },
    ],
  },
  {
    id: "backend",
    index: "02",
    title: { es: "Backend", en: "Backend" },
    description: {
      es: "Servicios y lógica para aplicaciones estructuradas.",
      en: "Services and logic for well-structured applications.",
    },
    technologies: [
      { id: "nodejs", name: "Node.js" },
      { id: "nestjs", name: "NestJS" },
    ],
  },
  {
    id: "databases",
    index: "03",
    title: { es: "Bases de datos", en: "Databases" },
    description: {
      es: "Modelado, consulta y organización de la información.",
      en: "Information modeling, querying, and organization.",
    },
    technologies: [
      { id: "postgresql", name: "PostgreSQL" },
      { id: "mongodb", name: "MongoDB" },
      { id: "mysql", name: "MySQL" },
      { id: "redis", name: "Redis" },
    ],
  },
  {
    id: "cloud-devops",
    index: "04",
    title: { es: "Cloud & DevOps", en: "Cloud & DevOps" },
    description: {
      es: "Infraestructura, contenedores y automatización de entregas.",
      en: "Infrastructure, containers, and delivery automation.",
    },
    technologies: [
      { id: "aws", name: "AWS" },
      { id: "azure", name: "Azure" },
      { id: "docker", name: "Docker" },
      { id: "github-actions", name: "GitHub Actions" },
    ],
  },
  {
    id: "tools",
    index: "05",
    title: { es: "Herramientas", en: "Tools" },
    description: {
      es: "Flujo de trabajo, colaboración y pruebas de servicios.",
      en: "Workflow, collaboration, and service testing.",
    },
    technologies: [
      { id: "git", name: "Git" },
      { id: "github", name: "GitHub" },
      { id: "linux", name: "Linux" },
      { id: "postman", name: "Postman" },
    ],
  },
];

