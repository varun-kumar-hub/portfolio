import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Portfolio - Varun Kumar",
  description:
    "A clean, professional software engineer portfolio focused on web development, AI, projects, education, and contact information.",
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
    <html lang="en" className={`dark scroll-smooth antialiased ${spaceGrotesk.variable} ${plusJakartaSans.variable}`}>
      <body suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
