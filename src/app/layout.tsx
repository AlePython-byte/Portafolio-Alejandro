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
    try {
      const storedTheme = localStorage.getItem('portfolio-theme');
      const theme = storedTheme === 'light' || storedTheme === 'dark'
        ? storedTheme
        : (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      const storedLanguage = localStorage.getItem('portfolio-language');
      document.documentElement.dataset.theme = theme;
      document.documentElement.style.colorScheme = theme;
      if (storedLanguage === 'es' || storedLanguage === 'en') {
        document.documentElement.lang = storedLanguage;
      }
    } catch (_) {}
  })();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
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
