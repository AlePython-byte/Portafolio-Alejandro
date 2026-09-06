import type { IconType } from "react-icons";
import { FaAws, FaJava, FaLinkedinIn } from "react-icons/fa6";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { LuBeef, LuMusic2, LuUsers } from "react-icons/lu";
import {
  SiDocker,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiHtml5,
  SiInstagram,
  SiLinux,
  SiMongodb,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPostman,
  SiReact,
  SiRedis,
  SiSpringboot,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from "react-icons/si";
import { VscAzure } from "react-icons/vsc";
import type { ProjectCover } from "@/data/projects";
import type { TechnologyId } from "@/data/skills";

const technologyIcons: Record<TechnologyId, IconType> = {
  react: SiReact,
  nextjs: SiNextdotjs,
  typescript: SiTypescript,
  tailwind: SiTailwindcss,
  html: SiHtml5,
  vite: SiVite,
  nodejs: SiNodedotjs,
  nestjs: SiNestjs,
  postgresql: SiPostgresql,
  mongodb: SiMongodb,
  mysql: SiMysql,
  redis: SiRedis,
  aws: FaAws,
  azure: VscAzure,
  docker: SiDocker,
  "github-actions": SiGithubactions,
  git: SiGit,
  github: SiGithub,
  linux: SiLinux,
  postman: SiPostman,
  java: FaJava,
  spring: SiSpringboot,
};

const projectIcons: Record<ProjectCover, IconType> = {
  cattle: LuBeef,
  music: LuMusic2,
  band: LuUsers,
};

type IconProps = {
  className?: string;
};

export function TechnologyIcon({
  id,
  className,
}: IconProps & { id: TechnologyId }) {
  const Icon = technologyIcons[id];
  return <Icon className={className} aria-hidden="true" />;
}

export function ProjectIcon({
  kind,
  className,
}: IconProps & { kind: ProjectCover }) {
  const Icon = projectIcons[kind];
  return <Icon className={className} aria-hidden="true" />;
}

export function GithubIcon({ className }: IconProps) {
  return <SiGithub className={className} aria-hidden="true" />;
}

export function LinkedinIcon({ className }: IconProps) {
  return <FaLinkedinIn className={className} aria-hidden="true" />;
}

export function InstagramIcon({ className }: IconProps) {
  return <SiInstagram className={className} aria-hidden="true" />;
}

export function EmailIcon({ className }: IconProps) {
  return <HiOutlineEnvelope className={className} aria-hidden="true" />;
}

