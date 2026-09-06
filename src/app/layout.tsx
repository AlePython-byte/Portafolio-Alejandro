import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alejandro Parra — Portafolio",
  description:
    "Portafolio de Alejandro Parra, estudiante de quinto semestre de Ingeniería de Software interesado en backend, frontend, diseño UX/UI, bases de datos y desarrollo de software.",
};

const themeScript = `
  (() => {
    let theme = 'light';
    let storedLanguage = null;
    try {
      const storedTheme = localStorage.getItem('portfolio-theme');
      if (storedTheme === 'light' || storedTheme === 'dark') {
        theme = storedTheme;
      }
      storedLanguage = localStorage.getItem('portfolio-language');
    } catch (_) {}
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    if (storedLanguage === 'es' || storedLanguage === 'en') {
      document.documentElement.lang = storedLanguage;
    }
  })();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      data-theme="light"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
