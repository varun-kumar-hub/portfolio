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
  IconMail,
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
  
  --pill-bg-1: rgba(255, 255, 255, 0.05);
  --pill-bg-2: rgba(255, 255, 255, 0.02);
  --pill-shadow: rgba(0, 0, 0, 0.5);
  --pill-highlight: rgba(255, 255, 255, 0.12);
  --pill-inset-shadow: rgba(0, 0, 0, 0.8);
  --pill-border: rgba(255, 255, 255, 0.1);
  
  --pill-bg-1-hover: rgba(59, 130, 246, 0.15);
  --pill-bg-2-hover: rgba(59, 130, 246, 0.05);
  --pill-border-hover: rgba(96, 165, 250, 0.4);
  --pill-shadow-hover: rgba(59, 130, 246, 0.25);
  --pill-highlight-hover: rgba(255, 255, 255, 0.25);
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

/* Theme-adaptive Aurora Glow */
.footer-aurora {
  background: radial-gradient(
    circle at 50% 50%, 
    rgba(59, 130, 246, 0.18) 0%, 
    rgba(99, 102, 241, 0.12) 40%, 
    transparent 70%
  );
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

/* Metallic Text Glow */
.footer-text-glow {
  background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0.4) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 0px 15px rgba(59, 130, 246, 0.3));
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

        element.addEventListener("mousemove", handleMouseMove as any);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          element.removeEventListener("mousemove", handleMouseMove as any);
          element.removeEventListener("mouseleave", handleMouseLeave);
        };
      }, element);

      return () => ctx.revert();
    }, []);

    return (
      <Component
        ref={(node: HTMLElement) => {
          (localRef as any).current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) (forwardedRef as any).current = node;
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
    <span>AI ENGINEER & DEVELOPER</span> <span className="text-blue-400">✦</span>
    <span>FULL STACK SYSTEMS</span> <span className="text-indigo-400">✦</span>
    <span>NEXT.JS & MACHINE LEARNING</span> <span className="text-blue-400">✦</span>
    <span>OPEN TO OPPORTUNITIES</span> <span className="text-indigo-400">✦</span>
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

export default function Footer({ profileName }: FooterProps = {}) {
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

    return () => ctx.revert();
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
        <footer className="fixed bottom-0 left-0 flex h-screen w-full flex-col justify-between overflow-hidden bg-[#05070a] text-white cinematic-footer-wrapper pt-16 md:pt-20 pb-3">
          
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
          <div className="relative mb-2 left-0 w-full overflow-hidden border-y border-white/10 bg-black/60 backdrop-blur-md py-2 z-10 -rotate-1 scale-105 shadow-xl shrink-0">
            <div className="flex w-max animate-footer-scroll-marquee text-[11px] font-bold tracking-[0.25em] text-neutral-400 uppercase">
              <MarqueeItem />
              <MarqueeItem />
            </div>
          </div>

          {/* 2. Main Section Content - Dual Column Clean Layout */}
          <div className="relative z-20 flex flex-1 items-center justify-center px-4 sm:px-6 lg:px-8 w-full max-w-6xl mx-auto my-auto">
            
            <div ref={contentRef} className="w-full grid lg:grid-cols-[1.1fr_0.9fr] gap-6 lg:gap-12 items-center">
              
              {/* Left Column: Standalone 3D Laptop Contact Form */}
              <div className="flex flex-col items-center justify-center w-full">
                <MacbookContact />
              </div>

              {/* Right Column: Section Heading + Directory Cards & Social Pills */}
              <div className="flex flex-col gap-3.5">
                
                {/* Header inside Right Column */}
                <div>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse shadow-[0_0_6px_rgba(96,165,250,0.8)]" />
                    Get In Touch
                  </span>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black footer-text-glow tracking-tighter mt-1 leading-tight">
                    Let&apos;s Connect & Build
                  </h2>
                  <p className="mt-1 text-xs text-neutral-400">
                    Have an internship, collaboration, or opportunity? Drop me a line directly.
                  </p>
                </div>

                {/* Directory Cards */}
                <div className="space-y-2 mt-1">
                  {/* Email Card */}
                  <MagneticButton
                    as="a"
                    href={`mailto:${profile.contact.email}`}
                    className="footer-glass-pill p-3 rounded-xl flex items-center justify-between group text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover:scale-110 transition-transform">
                        <IconMail size={16} />
                      </div>
                      <div>
                        <p className="text-[8px] font-bold text-neutral-500 uppercase tracking-wider">Email</p>
                        <p className="text-xs font-semibold text-neutral-200 group-hover:text-blue-400 transition-colors">
                          {profile.contact.email}
                        </p>
                      </div>
                    </div>
                    <span className="text-[9px] font-bold text-blue-400 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                      Send ↗
                    </span>
                  </MagneticButton>

                  {/* Location Card */}
                  <div className="footer-glass-pill p-3 rounded-xl flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
                      <IconMapPin size={16} />
                    </div>
                    <div>
                      <p className="text-[8px] font-bold text-neutral-500 uppercase tracking-wider">Location</p>
                      <p className="text-xs font-semibold text-neutral-200">
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
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover:scale-110 transition-transform">
                        <IconFileText size={16} />
                      </div>
                      <div>
                        <p className="text-[8px] font-bold text-neutral-500 uppercase tracking-wider">Resume</p>
                        <p className="text-xs font-semibold text-neutral-200 group-hover:text-blue-400 transition-colors">
                          View Official PDF
                        </p>
                      </div>
                    </div>
                    <span className="text-[9px] font-bold text-blue-400 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
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
                    className="footer-glass-pill px-4 py-2 rounded-lg text-neutral-300 font-semibold text-xs flex items-center gap-2"
                  >
                    <IconBrandGithub className="w-3.5 h-3.5 text-blue-400" />
                    GitHub
                  </MagneticButton>

                  <MagneticButton
                    as="a"
                    href={profile.socials.linkedin.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-glass-pill px-4 py-2 rounded-lg text-neutral-300 font-semibold text-xs flex items-center gap-2"
                  >
                    <IconBrandLinkedin className="w-3.5 h-3.5 text-blue-400" />
                    LinkedIn
                  </MagneticButton>

                  <MagneticButton
                    as="a"
                    href={profile.socials.instagram.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-glass-pill px-4 py-2 rounded-lg text-neutral-300 font-semibold text-xs flex items-center gap-2"
                  >
                    <IconBrandInstagram className="w-3.5 h-3.5 text-pink-400" />
                    Instagram
                  </MagneticButton>
                </div>

              </div>

            </div>
          </div>

          {/* 3. Bottom Bar / Credits */}
          <div className="relative z-20 w-full py-2.5 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-3 border-t border-white/10 shrink-0 bg-black/50 backdrop-blur-md">
            
            {/* Copyright */}
            <div className="text-neutral-400 text-[10px] md:text-xs font-semibold tracking-widest uppercase order-2 md:order-1">
              © {currentYear} {profile.name.full}. All rights reserved.
            </div>

            {/* "Engineered & Built" Badge */}
            <div className="footer-glass-pill px-4 py-1.5 rounded-full flex items-center gap-2 order-1 md:order-2 cursor-default border-white/10">
              <span className="text-neutral-400 text-[10px] md:text-xs font-bold uppercase tracking-widest">Engineered & Built by</span>
              <span className="text-white font-black text-xs tracking-normal ml-0.5">{profile.name.short}</span>
            </div>

            {/* Back to top */}
            <MagneticButton
              as="button"
              onClick={scrollToTop}
              className="w-9 h-9 rounded-full footer-glass-pill flex items-center justify-center text-neutral-400 hover:text-white group order-3"
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
