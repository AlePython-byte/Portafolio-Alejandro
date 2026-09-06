export type Language = "es" | "en";

export type LocalizedText = Record<Language, string>;

export type SocialLink = {
  id: "instagram";
  label: string;
  url: string;
};

export type Profile = {
  name: string;
  initials: string;
  email: string;
  github: string;
  linkedin: string;
  otherNetworks: SocialLink[];
  role: LocalizedText;
  introduction: LocalizedText;
};

export const profile: Profile = {
  name: "Alejandro Parra",
  initials: "AP",
  email: "jorgealejandroparrab@outlook.com",
  github: "https://github.com/AlePython-byte",
  linkedin: "https://www.linkedin.com/in/alejandro-parra-91ab55319/",
  otherNetworks: [
    {
      id: "instagram",
      label: "Instagram",
      url: "https://www.instagram.com/aleeee.p_m/",
    },
  ],
  role: {
    es: "Estudiante de Ingeniería de Software · Quinto semestre",
    en: "Software Engineering student · Fifth semester",
  },
  introduction: {
    es: "Me interesan el desarrollo de software, las interfaces y los datos.",
    en: "I am interested in software development, interfaces, and data.",
  },
};
