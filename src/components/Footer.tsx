"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { profile } from "@/lib/profile";
import MacbookContact from "@/components/MacbookContact";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandInstagram,
  IconFileText,
  IconMapPin,
} from "@tabler/icons-react";

// Register ScrollTrigger safely for React
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// -------------------------------------------------------------------------
// 1. THEME-ADAPTIVE INLINE STYLES
// -------------------------------------------------------------------------
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');

.cinematic-footer-wrapper {
  font-family: 'Plus Jakarta Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  --footer-primary: #ffffff;
  --footer-secondary: rgba(212, 212, 216, 0.82);
  --footer-muted: rgba(161, 161, 170, 0.86);
  --footer-bg: #040406;
  --footer-marquee-bg: rgba(4, 4, 6, 0.9);
  --footer-bar-bg: rgba(4, 4, 6, 0.95);
  --footer-border: rgba(239, 68, 68, 0.2);
  
  --pill-bg-1: rgba(255, 255, 255, 0.05);
  --pill-bg-2: rgba(255, 255, 255, 0.02);
  --pill-shadow: rgba(0, 0, 0, 0.5);
  --pill-highlight: rgba(255, 255, 255, 0.12);
  --pill-inset-shadow: rgba(0, 0, 0, 0.8);
  --pill-border: rgba(255, 255, 255, 0.1);
  
  --pill-bg-1-hover: rgba(239, 68, 68, 0.15);
  --pill-bg-2-hover: rgba(239, 68, 68, 0.05);
  --pill-border-hover: rgba(248, 113, 113, 0.4);
  --pill-shadow-hover: rgba(239, 68, 68, 0.25);
  --pill-highlight-hover: rgba(255, 255, 255, 0.25);
}

.light .cinematic-footer-wrapper {
  --footer-primary: #0f172a;
  --footer-secondary: #475569;
  --footer-muted: #64748b;
  --footer-bg: #f6f6f8;
  --footer-marquee-bg: rgba(255, 255, 255, 0.78);
  --footer-bar-bg: rgba(255, 255, 255, 0.76);
  --footer-border: rgba(15, 23, 42, 0.08);
  --pill-bg-1: rgba(255, 255, 255, 0.95);
  --pill-bg-2: rgba(248, 250, 252, 0.94);
  --pill-shadow: rgba(15, 23, 42, 0.09);
  --pill-highlight: rgba(255, 255, 255, 0.9);
  --pill-inset-shadow: rgba(0, 0, 0, 0.03);
  --pill-border: rgba(0, 0, 0, 0.08);
  
  --pill-bg-1-hover: rgba(239, 68, 68, 0.12);
  --pill-bg-2-hover: rgba(239, 68, 68, 0.04);
  --pill-border-hover: rgba(239, 68, 68, 0.4);
  --pill-shadow-hover: rgba(239, 68, 68, 0.15);
  --pill-highlight-hover: rgba(255, 255, 255, 1);
}

@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
  100% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
}

@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes footer-heartbeat {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 5px rgba(239, 68, 68, 0.5)); }
  15%, 45% { transform: scale(1.2); filter: drop-shadow(0 0 10px rgba(239, 68, 68, 0.8)); }
  30% { transform: scale(1); }
}

.animate-footer-breathe {
  animation: footer-breathe 8s ease-in-out infinite alternate;
}

.animate-footer-scroll-marquee {
  animation: footer-scroll-marquee 40s linear infinite;
}

.animate-footer-heartbeat {
  animation: footer-heartbeat 2s cubic-bezier(0.25, 1, 0.5, 1) infinite;
}

/* Theme-adaptive Grid Background */
.footer-bg-grid {
  background-size: 60px 60px;
  background-image: 
    linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
}

.light .footer-bg-grid {
  background-size: 56px 56px;
  background-image:
    linear-gradient(to right, rgba(15, 23, 42, 0.045) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(15, 23, 42, 0.045) 1px, transparent 1px);
  mask-image: radial-gradient(circle at 48% 46%, black 0%, black 52%, transparent 86%);
  -webkit-mask-image: radial-gradient(circle at 48% 46%, black 0%, black 52%, transparent 86%);
}

/* Theme-adaptive Aurora Glow */
.footer-aurora {
  background: radial-gradient(
    circle at 50% 50%, 
    rgba(239, 68, 68, 0.18) 0%, 
    rgba(244, 63, 94, 0.12) 40%, 
    transparent 70%
  );
}

.light .footer-aurora {
  background:
    radial-gradient(circle at 62% 34%, rgba(239, 68, 68, 0.16) 0%, rgba(239, 68, 68, 0.07) 34%, transparent 68%),
    radial-gradient(circle at 24% 68%, rgba(15, 23, 42, 0.08) 0%, transparent 44%);
  opacity: 0.95;
}

/* Glass Pill Theming */
.footer-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow: 
      0 10px 30px -10px var(--pill-shadow), 
      inset 0 1px 1px var(--pill-highlight), 
      inset 0 -1px 2px var(--pill-inset-shadow);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.footer-glass-pill:hover {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2-hover) 100%);
  border-color: var(--pill-border-hover);
  box-shadow: 
      0 20px 40px -10px var(--pill-shadow-hover), 
      inset 0 1px 1px var(--pill-highlight-hover);
  color: #ffffff;
}

.light .footer-glass-pill {
  color: var(--footer-secondary);
}

.light .footer-glass-pill:hover {
  color: #dc2626;
  transform: translateY(-2px);
}

/* Giant Background Text Masking */
.footer-giant-bg-text {
  font-size: 18vw;
  line-height: 0.75;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.05);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, transparent 60%);
  -webkit-background-clip: text;
  background-clip: text;
}

.light .footer-giant-bg-text {
  -webkit-text-stroke: 1px rgba(15, 23, 42, 0.07);
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.06) 0%, rgba(15, 23, 42, 0.018) 58%, transparent 100%);
  -webkit-background-clip: text;
  background-clip: text;
}

/* Metallic Text Glow */
.footer-text-glow {
  background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0.4) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 0px 15px rgba(239, 68, 68, 0.3));
}

.light .footer-text-glow {
  background: linear-gradient(180deg, #0f172a 0%, #334155 62%, #64748b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 14px 28px rgba(15, 23, 42, 0.1));
}

.footer-label { color: var(--footer-muted); }
.footer-copy { color: var(--footer-secondary); }
.footer-strong { color: var(--footer-primary); }
.footer-marquee-shell {
  border-color: var(--footer-border);
  background: var(--footer-marquee-bg);
}
.footer-bottom-bar {
  border-color: var(--footer-border);
  background: var(--footer-bar-bg);
}
`;

// -------------------------------------------------------------------------
// 2. MAGNETIC BUTTON PRIMITIVE
// -------------------------------------------------------------------------
export type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & 
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: React.ElementType;
    target?: string;
    rel?: string;
  };

const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = "button", ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (typeof window === "undefined") return;
      const element = localRef.current;
      if (!element) return;

      const ctx = gsap.context(() => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = element.getBoundingClientRect();
          const h = rect.width / 2;
          const w = rect.height / 2;
          const x = e.clientX - rect.left - h;
          const y = e.clientY - rect.top - w;

          gsap.to(element, {
            x: x * 0.3,
            y: y * 0.3,
            rotationX: -y * 0.1,
            rotationY: x * 0.1,
            scale: 1.03,
            ease: "power2.out",
            duration: 0.3,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(element, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            ease: "elastic.out(1, 0.3)",
            duration: 1,
          });
        };

        const listener: EventListener = (e) => handleMouseMove(e as MouseEvent);

        element.addEventListener("mousemove", listener);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          element.removeEventListener("mousemove", listener);
          element.removeEventListener("mouseleave", handleMouseLeave);
        };
      }, element);

      return () => ctx.revert();
    }, []);

    return (
      <Component
        ref={(node: HTMLElement | null) => {
          (localRef as React.MutableRefObject<HTMLElement | null>).current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLElement | null>).current = node;
        }}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

// -------------------------------------------------------------------------
// 3. MAIN COMPONENT
// -------------------------------------------------------------------------
const MarqueeItem = () => (
  <div className="flex items-center space-x-8 px-4">
    <span>AI ENGINEER & DEVELOPER</span> <span className="text-red-400">✦</span>
    <span>FULL STACK SYSTEMS</span> <span className="text-rose-400">✦</span>
    <span>NEXT.JS & MACHINE LEARNING</span> <span className="text-red-400">✦</span>
    <span>OPEN TO OPPORTUNITIES</span> <span className="text-rose-400">✦</span>
  </div>
);

export interface FooterProps {
  profileName?: string;
  socialDockItems?: Array<{
    title: string;
    icon: React.ReactNode;
    href: string;
  }>;
}

export default function Footer({ profileName = profile.name.full }: FooterProps = {}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!wrapperRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax Background Text Reveal
      gsap.fromTo(
        giantTextRef.current,
        { y: "10vh", scale: 0.8, opacity: 0 },
        {
          y: "0vh",
          scale: 1,
          opacity: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 80%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );

      // Staggered Content Elevation Reveal
      gsap.fromTo(
        contentRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 40%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );
    }, wrapperRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      
      {/* 
        The Original "Curtain Reveal" Scroll Wrapper:
        Sits in document flow with clip-path, revealing the fixed Cinematic Footer underneath as you scroll down.
      */}
      <div
        id="contact"
        ref={wrapperRef}
        className="relative h-screen w-full z-10"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        {/* Fixed Footer underneath revealed by curtain scroll */}
        <footer className="fixed bottom-0 left-0 flex h-screen w-full flex-col justify-between overflow-hidden bg-[var(--footer-bg)] text-[var(--footer-primary)] cinematic-footer-wrapper pt-24 sm:pt-28 md:pt-32 pb-3">
          
          {/* Ambient Light & Grid Background */}
          <div className="footer-aurora absolute left-1/2 top-1/2 h-[50vh] w-[70vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] blur-[90px] pointer-events-none z-0" />
          <div className="footer-bg-grid absolute inset-0 z-0 pointer-events-none" />

          {/* Giant background text */}
          <div
            ref={giantTextRef}
            className="footer-giant-bg-text absolute bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none select-none"
          >
            VARUN
          </div>

          {/* 1. Sleek Top Marquee Banner */}
          <div className="footer-marquee-shell relative mb-2 left-0 w-full overflow-hidden border-y backdrop-blur-md py-2 z-10 -rotate-1 scale-105 shadow-xl shrink-0">
            <div className="footer-label flex w-max animate-footer-scroll-marquee text-[11px] font-bold tracking-[0.25em] uppercase">
              <MarqueeItem />
              <MarqueeItem />
            </div>
          </div>

          {/* 2. Main Section Content - Dual Column Clean Layout */}
          <div className="relative z-20 flex-1 flex flex-col justify-start pt-4 sm:pt-8 px-4 sm:px-6 lg:px-8 w-full max-w-6xl mx-auto overflow-y-auto lg:overflow-hidden pb-8 lg:pb-0">
            
            <div ref={contentRef} className="w-full grid lg:grid-cols-[1.1fr_0.9fr] gap-6 lg:gap-12 items-center">
              
              {/* Standalone 3D Laptop Contact Form */}
              <div className="flex flex-col items-center justify-center w-full order-2 lg:order-1">
                <MacbookContact />
              </div>

              {/* Section Heading + Directory Cards & Social Pills */}
              <div className="flex flex-col gap-3.5 order-1 lg:order-2">
                
                {/* Header inside Right Column */}
                <div>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-red-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse shadow-[0_0_6px_rgba(248,113,113,0.8)]" />
                    Get In Touch
                  </span>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black footer-text-glow tracking-tighter mt-1 leading-tight">
                    Let&apos;s Connect & Build
                  </h2>
                  <p className="footer-copy mt-1 text-xs">
                    Have an internship, collaboration, or opportunity for {profileName}? Drop me a line directly.
                  </p>
                </div>

                {/* Directory Cards */}
                <div className="space-y-2 mt-1">

                  {/* Location Card */}
                  <div className="footer-glass-pill p-3 rounded-xl flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
                      <IconMapPin size={16} />
                    </div>
                    <div>
                      <p className="footer-label text-[8px] font-bold uppercase tracking-wider">Location</p>
                      <p className="footer-strong text-xs font-semibold">
                        {profile.contact.location}
                      </p>
                    </div>
                  </div>

                  {/* Resume Card */}
                  <MagneticButton
                    as="a"
                    href={profile.contact.resumeHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-glass-pill p-3 rounded-xl flex items-center justify-between group text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 group-hover:scale-110 transition-transform">
                        <IconFileText size={16} />
                      </div>
                      <div>
                        <p className="footer-label text-[8px] font-bold uppercase tracking-wider">Resume</p>
                        <p className="footer-strong text-xs font-semibold group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors">
                          View Official PDF
                        </p>
                      </div>
                    </div>
                    <span className="text-[9px] font-bold text-red-400 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                      Open ↗
                    </span>
                  </MagneticButton>
                </div>

                {/* Magnetic Social Links */}
                <div className="flex flex-wrap items-center gap-2.5 mt-1">
                  <MagneticButton
                    as="a"
                    href={profile.socials.github.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-glass-pill px-4 py-2 rounded-lg font-semibold text-xs flex items-center gap-2"
                  >
                    <IconBrandGithub className="w-3.5 h-3.5 text-red-400" />
                    GitHub
                  </MagneticButton>

                  <MagneticButton
                    as="a"
                    href={profile.socials.linkedin.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-glass-pill px-4 py-2 rounded-lg font-semibold text-xs flex items-center gap-2"
                  >
                    <IconBrandLinkedin className="w-3.5 h-3.5 text-red-400" />
                    LinkedIn
                  </MagneticButton>

                  <MagneticButton
                    as="a"
                    href={profile.socials.instagram.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-glass-pill px-4 py-2 rounded-lg font-semibold text-xs flex items-center gap-2"
                  >
                    <IconBrandInstagram className="w-3.5 h-3.5 text-pink-400" />
                    Instagram
                  </MagneticButton>
                </div>

              </div>

            </div>
          </div>

          {/* 3. Bottom Bar / Credits */}
          <div className="footer-bottom-bar relative z-20 w-full py-2.5 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-3 border-t shrink-0 backdrop-blur-md">
            
            {/* Copyright */}
            <div className="footer-label text-[10px] md:text-xs font-semibold tracking-widest uppercase order-2 md:order-1">
              © {currentYear} {profile.name.full}. All rights reserved.
            </div>

            {/* "Engineered & Built" Badge */}
            <div className="footer-glass-pill px-4 py-1.5 rounded-full flex items-center gap-2 order-1 md:order-2 cursor-default">
              <span className="footer-label text-[10px] md:text-xs font-bold uppercase tracking-widest">Engineered & Built by</span>
              <span className="footer-strong font-black text-xs tracking-normal ml-0.5">{profile.name.short}</span>
            </div>

            {/* Back to top */}
            <MagneticButton
              as="button"
              onClick={scrollToTop}
              className="w-9 h-9 rounded-full footer-glass-pill flex items-center justify-center group order-3"
            >
              <svg className="w-4 h-4 transform group-hover:-translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
              </svg>
            </MagneticButton>

          </div>
        </footer>
      </div>
    </>
  );
}
