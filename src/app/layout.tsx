import type { Metadata, Viewport } from "next";
import {
  Outfit,
  Inter,
  Syne,
  Space_Grotesk,
  Orbitron,
  Plus_Jakarta_Sans,
  Fira_Code,
  Playfair_Display,
} from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Resume - Varun Kumar",
  description:
    "A clean, professional software engineer portfolio focused on web development, AI, projects, and contact information.",
  keywords: [
    "Software Engineer",
    "Portfolio",
    "Web Developer",
    "AI Developer",
    "Next.js",
    "React",
  ],
  authors: [{ name: "C.Varun Kumar" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark scroll-smooth antialiased ${outfit.variable} ${inter.variable} ${syne.variable} ${spaceGrotesk.variable} ${orbitron.variable} ${plusJakarta.variable} ${firaCode.variable} ${playfair.variable}`}
    >
      <body suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
