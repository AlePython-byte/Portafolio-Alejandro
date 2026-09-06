import { profile } from "@/data/profile";
import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
} from "./brand-icon";

type SocialLinksProps = {
  label: string;
  variant?: "compact" | "contact";
};

export function SocialLinks({ label, variant = "compact" }: SocialLinksProps) {
  const instagram = profile.otherNetworks.find(
    (network) => network.id === "instagram",
  );
  const links = [
    {
      label: "GitHub",
      url: profile.github,
      icon: GithubIcon,
    },
    {
      label: "LinkedIn",
      url: profile.linkedin,
      icon: LinkedinIcon,
    },
    {
      label: "Instagram",
      url: instagram?.url ?? "",
      icon: InstagramIcon,
    },
  ].filter((link) => link.url);

  return (
    <div
      className={variant === "compact" ? "hero-socials" : "contact-socials"}
      aria-label={label}
    >
      {links.map(({ label, url, icon: Icon }) => (
        <a
          className={variant === "compact" ? "hero-social-link" : "contact-action"}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          key={label}
        >
          <Icon className={variant === "compact" ? "size-4" : "size-5"} />
          <span>{label}</span>
        </a>
      ))}
    </div>
  );
}
