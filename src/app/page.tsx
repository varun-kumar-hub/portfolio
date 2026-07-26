"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  Briefcase,
  GraduationCap,
  Wrench,
  FolderGit2,
  MapPin,
  FileText,
  Cpu,
  Terminal,
  ChevronDown,
} from "lucide-react";
import { SpaceBackground } from "@/components/ui/space-background";
import SkillsBento from "@/components/SkillsBento";
import ExperienceBento from "@/components/ExperienceBento";
import { AnimatePresence, motion } from "framer-motion";
import { PortfolioIntro } from "@/components/ui/portfolio-intro";
import { Navbar } from "@/components/ui/mini-navbar";
import Footer from "@/components/Footer";

import CustomCursor from "@/components/ui/custom-cursor";

import { FullScreenScrollFX, FXSection } from "@/components/ui/full-screen-scroll-fx";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandInstagram,
  IconMail,
  IconFileText,
} from "@tabler/icons-react";
import Link from "next/link";
import { profile } from "@/lib/profile";
import { Project, projects } from "@/lib/projects";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

function ProfileSpotlightCard() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative z-10 max-w-5xl mx-auto px-2 sm:px-4 w-full flex flex-col-reverse md:flex-row items-center gap-3 sm:gap-10 mt-0 sm:mt-1">
      {/* Left Column: About Me Bio & Details */}
      <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left space-y-2 sm:space-y-4">
        {/* Subheading */}
        <h4 className="text-xs sm:text-2xl font-bold tracking-tight text-slate-950 dark:text-white leading-snug">
          Architecting <span className="text-red-500 dark:text-red-400">Autonomous AI Systems</span> &amp; <span className="text-red-500 dark:text-red-400">High-Performance Cloud Platforms</span>
        </h4>

        {/* Bio Description with See More toggle */}
        <div className="text-[10px] sm:text-sm text-slate-600 dark:text-neutral-300 font-light leading-relaxed max-w-xl">
          <p className={isExpanded ? "" : "line-clamp-2 sm:line-clamp-none"}>
            {profile.bio}
          </p>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="sm:hidden inline-flex items-center gap-0.5 mt-1 text-[10px] font-bold text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors cursor-pointer"
          >
            <span>{isExpanded ? "See Less ↑" : "See More →"}</span>
          </button>
        </div>

        {/* Quick Highlight Metrics Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 sm:gap-2 w-full max-w-lg pt-0.5">
          <div className="p-1.5 sm:p-3 rounded-lg sm:rounded-2xl bg-white dark:bg-neutral-900/60 border border-red-500/20 dark:border-red-500/20 text-center md:text-left backdrop-blur-xl transition-all shadow-[0_10px_30px_rgba(15,23,42,0.05)] hover:-translate-y-0.5 hover:border-red-500/50 hover:shadow-[0_0_25px_rgba(239,68,68,0.18)]">
            <span className="block text-red-600 dark:text-red-400 text-[10px] sm:text-xs font-mono font-extrabold tracking-wide">8+ Autonomous</span>
            <span className="text-[8px] sm:text-[10px] text-slate-600 dark:text-neutral-400 font-medium">AI &amp; Full-Stack Apps</span>
          </div>
          <div className="p-1.5 sm:p-3 rounded-lg sm:rounded-2xl bg-white dark:bg-neutral-900/60 border border-red-500/20 dark:border-red-500/20 text-center md:text-left backdrop-blur-xl transition-all shadow-[0_10px_30px_rgba(15,23,42,0.05)] hover:-translate-y-0.5 hover:border-red-500/50 hover:shadow-[0_0_25px_rgba(239,68,68,0.18)]">
            <span className="block text-red-600 dark:text-red-400 text-[10px] sm:text-xs font-mono font-extrabold tracking-wide">95%+ Verified</span>
            <span className="text-[8px] sm:text-[10px] text-slate-600 dark:text-neutral-400 font-medium">Multi-Source Accuracy</span>
          </div>
          <div className="p-1.5 sm:p-3 rounded-lg sm:rounded-2xl bg-white dark:bg-neutral-900/60 border border-red-500/20 dark:border-red-500/20 text-center md:text-left col-span-2 sm:col-span-1 backdrop-blur-xl transition-all shadow-[0_10px_30px_rgba(15,23,42,0.05)] hover:-translate-y-0.5 hover:border-red-500/50 hover:shadow-[0_0_25px_rgba(239,68,68,0.18)]">
            <span className="block text-red-600 dark:text-red-400 text-[10px] sm:text-xs font-mono font-extrabold tracking-wide">3rd Year CSE (AI &amp; ML)</span>
            <span className="text-[8px] sm:text-[10px] text-slate-600 dark:text-neutral-400 font-medium">Kalasalingam Academy</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-0.5">
          <a
            href="#projects"
            className="group relative px-3 py-1 sm:px-5 sm:py-2 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-500 hover:to-red-600 text-white font-semibold text-[10px] sm:text-xs tracking-wider transition-all duration-300 rounded-lg sm:rounded-xl shadow-[0_14px_28px_-16px_rgba(220,38,38,0.55)] flex items-center gap-1"
          >
            <span>View Projects →</span>
          </a>

          <a
            href="#contact"
            className="px-3 py-1 sm:px-5 sm:py-2 border border-red-500/25 dark:border-white/20 hover:border-red-500 text-slate-800 dark:text-white hover:text-red-600 dark:hover:text-red-300 font-semibold text-[10px] sm:text-xs tracking-wider rounded-xl transition-all duration-300 backdrop-blur-sm bg-white dark:bg-black/40 shadow-[0_10px_30px_rgba(15,23,42,0.05)] hover:shadow-[0_0_20px_rgba(239,68,68,0.15)]"
          >
            Get in Touch
          </a>
        </div>
      </div>

      {/* Right Column: Scaled Photo Frame for Mobile */}
      <div className="relative z-30 shrink-0 group">
        <div className="absolute -inset-1 sm:-inset-2 rounded-xl sm:rounded-3xl bg-gradient-to-br from-red-500/20 via-rose-500/15 to-red-600/20 blur-xl opacity-80 pointer-events-none transition-opacity" />

        <div className="relative w-24 h-32 sm:w-56 sm:h-72 md:w-72 md:h-88 rounded-xl sm:rounded-3xl overflow-hidden border border-red-500/40 bg-neutral-900 shadow-[0_15px_35px_rgba(15,23,42,0.1),0_0_25px_rgba(239,68,68,0.15)] flex items-center justify-center">
          <Image
            src="/profile-varun.png"
            alt="Varun Kumar"
            width={600}
            height={800}
            className="w-full h-full object-cover object-[center_12%] group-hover:scale-105 transition-transform duration-500"
          />

          <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 w-2.5 h-2.5 sm:w-3 sm:h-3 border-t border-l border-red-500/80 dark:border-red-400/80 pointer-events-none z-10" />
          <div className="absolute bottom-1.5 right-1.5 sm:bottom-2 sm:right-2 w-2.5 h-2.5 sm:w-3 sm:h-3 border-b border-r border-red-500/80 dark:border-red-400/80 pointer-events-none z-10" />
        </div>
      </div>
    </div>
  );
}

const heroFxSections: FXSection[] = [
  // ── 1ST SLIDE: Dominating Name & Role Entrance ──
  {
    leftLabel: "The Creator",
    title: profile.name.full,
    customContent: (
      <div className="flex flex-col items-center justify-center space-y-3 sm:space-y-4 mt-2 max-w-4xl mx-auto text-center px-4">
        {/* Role Headline */}
        <h3 className="text-base sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-wide text-slate-950 dark:text-white leading-tight mt-1 text-center">
          AI Engineer &amp; Tech Innovator
        </h3>

        {/* Status Badge */}
        <div className="inline-flex items-center gap-2.5 rounded-full border border-slate-200/80 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/90 px-6 py-2.5 sm:px-8 sm:py-3 text-sm sm:text-lg font-bold backdrop-blur-xl shadow-sm mt-4">
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500 animate-pulse" />
          <span className="text-slate-900 dark:text-neutral-200 font-bold tracking-wider">B.Tech CSE (AI &amp; ML)</span>
        </div>
      </div>
    ),
    rightLabel: "AI Innovator",
    bgGradient: "#040406",
    glowColor: "transparent",
  },

  // ── 2ND SLIDE: Profile Bio & Photo Spotlight ──
  {
    leftLabel: "About Varun",
    title: "Profile Spotlight",
    customContent: <ProfileSpotlightCard />,
    rightLabel: "Personal Profile",
    bgGradient: "#040406",
    glowColor: "transparent",
  },

  // ── 3RD SLIDE: Portfolio Overview & Roadmap Index ──
  {
    leftLabel: "Portfolio Index",
    title: "Portfolio Overview",
    subtitle: "Here is a roadmap of what you will discover as you explore below",
    customContent: (
      <div className="flex flex-col items-center justify-center space-y-3.5 mt-2 px-3 sm:px-6 max-w-3xl mx-auto w-full">
        {/* Section Roadmap Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full text-left">
          <a href="#projects" className="p-3.5 sm:p-5 rounded-3xl bg-white dark:bg-black/80 border border-red-500/25 dark:border-red-500/30 hover:border-red-500/60 backdrop-blur-xl transition-all group shadow-[0_10px_30px_rgba(15,23,42,0.05)] dark:shadow-xl hover:shadow-[0_0_30px_rgba(239,68,68,0.2),0_12px_28px_rgba(15,23,42,0.06)]">
            <div className="flex items-center justify-between text-red-600 dark:text-red-400 font-mono text-xs sm:text-sm font-bold tracking-wide">
              <span>01. Projects Directory</span>
              <span className="group-hover:translate-x-1.5 transition-transform text-red-500 dark:text-red-300 font-bold text-sm">→</span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-600 dark:text-neutral-300 font-medium mt-1.5 leading-relaxed">
              ResearchX AI (Multi-Agent Verification), LearnX (AI Knowledge Graphs), Resume Analyzer (NLP ATS Engine) &amp; TripCrafter Pro.
            </p>
          </a>

          <a href="#skills" className="p-3.5 sm:p-5 rounded-3xl bg-white dark:bg-black/80 border border-red-500/25 dark:border-red-500/30 hover:border-red-500/60 backdrop-blur-xl transition-all group shadow-[0_10px_30px_rgba(15,23,42,0.05)] dark:shadow-xl hover:shadow-[0_0_30px_rgba(239,68,68,0.2),0_12px_28px_rgba(15,23,42,0.06)]">
            <div className="flex items-center justify-between text-red-600 dark:text-red-400 font-mono text-xs sm:text-sm font-bold tracking-wide">
              <span>02. Technical Toolkit</span>
              <span className="group-hover:translate-x-1.5 transition-transform text-red-500 dark:text-red-300 font-bold text-sm">→</span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-600 dark:text-neutral-300 font-medium mt-1.5 leading-relaxed">
              Python, Google Gemini API, NLTK/PyTorch, Next.js 16, React, TypeScript, PostgreSQL, Supabase &amp; Vercel.
            </p>
          </a>

          <a href="#experience" className="p-3.5 sm:p-5 rounded-3xl bg-white dark:bg-black/80 border border-red-500/25 dark:border-red-500/30 hover:border-red-500/60 backdrop-blur-xl transition-all group shadow-[0_10px_30px_rgba(15,23,42,0.05)] dark:shadow-xl hover:shadow-[0_0_30px_rgba(239,68,68,0.2),0_12px_28px_rgba(15,23,42,0.06)]">
            <div className="flex items-center justify-between text-red-600 dark:text-red-400 font-mono text-xs sm:text-sm font-bold tracking-wide">
              <span>03. Work Experience</span>
              <span className="group-hover:translate-x-1.5 transition-transform text-red-500 dark:text-red-300 font-bold text-sm">→</span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-600 dark:text-neutral-300 font-medium mt-1.5 leading-relaxed">
              OWASP Student Chapter (Web Development &amp; Technical Coordinator), OWASP Top 10 security workshops &amp; AI system design.
            </p>
          </a>

          <a href="#contact" className="p-3.5 sm:p-5 rounded-3xl bg-white dark:bg-black/80 border border-red-500/25 dark:border-red-500/30 hover:border-red-500/60 backdrop-blur-xl transition-all group shadow-[0_10px_30px_rgba(15,23,42,0.05)] dark:shadow-xl hover:shadow-[0_0_30px_rgba(239,68,68,0.2),0_12px_28px_rgba(15,23,42,0.06)]">
            <div className="flex items-center justify-between text-red-600 dark:text-red-400 font-mono text-xs sm:text-sm font-bold tracking-wide">
              <span>04. Connect &amp; Resume</span>
              <span className="group-hover:translate-x-1.5 transition-transform text-red-500 dark:text-red-300 font-bold text-sm">→</span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-600 dark:text-neutral-300 font-medium mt-1.5 leading-relaxed">
              Direct email (cvarun713@gmail.com), LinkedIn, GitHub developer profile &amp; downloadable PDF engineering resume.
            </p>
          </a>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href="#projects"
            className="group relative px-5 py-2.5 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-500 hover:to-red-600 text-white font-semibold text-xs sm:text-sm tracking-wider rounded-xl transition-all duration-300 shadow-[0_18px_34px_-18px_rgba(220,38,38,0.58)] flex items-center gap-1.5"
          >
            <span>Explore Portfolio Below ↓</span>
          </a>

          <a
            href={profile.contact.resumeHref}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 border border-red-500/25 hover:border-red-500 text-red-600 dark:text-red-300 hover:text-red-700 dark:hover:text-white font-semibold text-xs sm:text-sm tracking-wider rounded-xl transition-all duration-300 backdrop-blur-sm bg-white dark:bg-red-950/30 shadow-[0_10px_30px_rgba(15,23,42,0.05)] hover:shadow-[0_0_20px_rgba(239,68,68,0.15)]"
          >
            Download Resume
          </a>
        </div>
      </div>
    ),
    rightLabel: "Overview Roadmap",
    bgGradient: "radial-gradient(circle at 50% 50%, rgba(239, 68, 68, 0.05) 0%, rgba(10, 10, 14, 0.98) 65%, #040406 100%)",
    glowColor: "#e5e7eb",
  },
];

function SectionHeading({
  eyebrow,
  title,
  children,
  icon,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      <div className="flex items-center justify-center gap-2">
        {icon && <span className="text-[var(--accent)]">{icon}</span>}
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
          {eyebrow}
        </p>
      </div>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
        {title}
      </h2>
      {children ? (
        <p className="mt-4 text-base leading-7 text-gray-500 dark:text-gray-400">{children}</p>
      ) : null}
    </div>
  );
}

const projectIconMap: Record<string, React.ReactNode> = {
  "learnx": <GraduationCap className="w-5 h-5 text-red-500" />,
  "resume-analyzer": <FileText className="w-5 h-5 text-emerald-500" />,
  "researchx-ai": <Cpu className="w-5 h-5 text-purple-500" />,
  "tripcrafter-pro": <MapPin className="w-5 h-5 text-amber-500" />,
  "ai-tools-tracker": <Wrench className="w-5 h-5 text-cyan-500" />
};

function ProjectCard({ project }: { project: Project }) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = projectIconMap[project.slug] || <FolderGit2 className="w-5 h-5 text-red-500" />;
  const stackItems = project.stack.flatMap((group) => group.items);

  return (
    <Link
      href={`/projects/${project.slug}`}
      onClick={() => {
        if (typeof window !== "undefined") {
          sessionStorage.setItem("portfolio-scroll-y", window.scrollY.toString());
        }
      }}
      className="block w-full select-none text-left"
    >
      <motion.div
        className="w-full min-h-[480px] bg-white dark:bg-neutral-900/90 backdrop-blur-xl rounded-3xl shadow-[0_10px_30px_rgba(15,23,42,0.05),0_2px_8px_rgba(15,23,42,0.03)] dark:shadow-[0_30px_70px_rgba(0,0,0,0.8)] flex flex-col p-5 gap-3.5 overflow-hidden border border-red-500/25 dark:border-neutral-700/60 hover:border-red-500/60 dark:hover:border-red-500/50 hover:shadow-[0_0_35px_rgba(239,68,68,0.22),0_15px_35px_rgba(15,23,42,0.08)] transition-all duration-300 relative group [transform-style:preserve-3d] [backface-visibility:hidden]"
        whileHover={{ y: -6, scale: 1.01 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Ambient Red Glow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-red-500/[0.03] via-transparent to-transparent pointer-events-none" />

        {/* Top header row */}
        <div className="flex justify-between items-center px-1 relative z-10">
          <div className="flex items-center gap-2">
            {Icon}
            <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-red-600 dark:text-red-400 bg-red-500/10 px-2.5 py-0.5 rounded-full border border-red-500/20">
              {project.category}
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-neutral-400 group-hover:text-red-500 dark:group-hover:text-red-400 font-bold transition-colors">
            <span>Explore</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>

        {/* Title & Image */}
        <div className="flex flex-col gap-2.5 flex-1 mt-1 relative z-10">
          <h3 className="title text-xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight flex items-center group-hover:text-red-600 dark:group-hover:text-red-300 transition-colors">
            {project.name}
          </h3>

          {/* Inset Image with ambient background glow */}
          <div className="image relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-50 dark:bg-neutral-950 border border-slate-200/80 dark:border-neutral-900 shadow-inner">
            <div className="absolute inset-0 rounded-2xl opacity-30 z-0">
              <motion.div
                animate={{ scale: isHovered ? 1.08 : 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full h-full"
              >
                <Image
                  src={project.image}
                  alt={`${project.name} background`}
                  className="w-full h-full object-cover blur-md scale-110"
                  width={400}
                  height={250}
                  unoptimized
                />
              </motion.div>
            </div>
            <motion.div
              className="relative z-10 w-full h-full p-1"
              animate={{ scale: isHovered ? 1.02 : 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Image
                src={project.image}
                alt={project.name}
                className="rounded-xl w-full h-full object-cover shadow-inner"
                width={400}
                height={250}
                unoptimized
              />
            </motion.div>
          </div>

          {/* Brief tagline */}
          <p className="desc text-xs text-slate-600 dark:text-neutral-400 font-light leading-relaxed line-clamp-2 mt-1">
            {project.description}
          </p>

          {/* Architecture Highlight Pill */}
          {project.architecture && project.architecture.length > 0 && (
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-700 dark:text-neutral-300 bg-slate-50 dark:bg-white/[0.03] border border-red-500/20 dark:border-white/10 rounded-xl px-2.5 py-1.5 mt-0.5">
              <Cpu className="w-3.5 h-3.5 text-red-500 shrink-0" />
              <span className="truncate text-slate-700 dark:text-neutral-300 font-medium">
                <strong className="text-red-600 dark:text-red-400 font-bold">Arch:</strong> {project.architecture[0].title}
              </span>
            </div>
          )}

          {/* Tech stack capsules */}
          <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-slate-200/80 dark:border-neutral-800/60">
            {stackItems.slice(0, 3).map((tech) => (
              <span
                className="rounded-full bg-red-500/10 border border-red-500/20 px-2.5 py-0.5 text-[9px] font-semibold text-red-600 dark:text-red-300 backdrop-blur-sm"
                key={tech}
              >
                {tech}
              </span>
            ))}
            {stackItems.length > 3 && (
              <span className="rounded-full bg-slate-100 dark:bg-neutral-900 border border-slate-200/80 dark:border-neutral-800 px-2 py-0.5 text-[9px] font-semibold text-slate-600 dark:text-neutral-500">
                +{stackItems.length - 3} more
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default function Home() {
  const socialDockItems = [
    {
      title: profile.socials.github.label,
      icon: <IconBrandGithub className="w-5 h-5" />,
      href: profile.socials.github.href,
    },
    {
      title: profile.socials.linkedin.label,
      icon: <IconBrandLinkedin className="w-5 h-5 text-[#378fe9]" />,
      href: profile.socials.linkedin.href,
    },
    {
      title: profile.socials.instagram.label,
      icon: <IconBrandInstagram className="w-5 h-5 text-[#f85c96]" />,
      href: profile.socials.instagram.href,
    },
    {
      title: "Email",
      icon: <IconMail className="w-5 h-5 text-red-400" />,
      href: `https://mail.google.com/mail/?view=cm&fs=1&to=${profile.contact.email}`,
    },
    {
      title: "Resume",
      icon: <IconFileText className="w-5 h-5 text-emerald-400" />,
      href: profile.contact.resumeHref,
    },
  ];

  const [hasEntered, setHasEntered] = useState(false);
  const [isIntroReady, setIsIntroReady] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authParams, setAuthParams] = useState("");
  const [isScrollPositioning, setIsScrollPositioning] = useState(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const entered = urlParams.get("entered");
      const hash = window.location.hash;
      return (entered === "true" || hash === "#projects" || hash.length > 1);
    }
    return false;
  });
  const lightningHue = 4; // Default to crimson red

  useEffect(() => {
    document.documentElement.style.setProperty("--theme-hue", lightningHue.toString());
  }, [lightningHue]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const entered = urlParams.get("entered");
      const code = urlParams.get("code") || urlParams.get("state") || urlParams.get("error");
      const hash = window.location.hash;
      const storedScrollY = sessionStorage.getItem("portfolio-scroll-y");

      window.setTimeout(() => {
        if (code) {
          setHasEntered(true);
          setAuthParams(window.location.search);
          setShowAuthModal(true);
        } else if (storedScrollY !== null || entered === "true" || hash === "#projects" || hash.length > 1) {
          setHasEntered(true);
        }
        setIsIntroReady(true);
      }, 0);
    }
  }, []);

  useEffect(() => {
    if (hasEntered) {
      document.documentElement.style.setProperty("--hold-progress", "0");
      document.documentElement.style.setProperty("--sphere-opacity", "0");
      document.documentElement.style.setProperty("--lightning-opacity", "0");
      if (typeof window !== "undefined") {
        window.holdProgress = 0;

        const handleScrollSave = () => {
          sessionStorage.setItem("portfolio-scroll-y", window.scrollY.toString());
        };
        window.addEventListener("scroll", handleScrollSave, { passive: true });
        window.addEventListener("beforeunload", handleScrollSave);

        const storedScrollY = sessionStorage.getItem("portfolio-scroll-y");
        if (storedScrollY !== null) {
          const scrollY = parseInt(storedScrollY, 10);
          setTimeout(() => {
            window.scrollTo(0, scrollY);
            setIsScrollPositioning(false);
          }, 0);
        } else if (window.location.hash) {
          const targetId = window.location.hash.substring(1);
          setTimeout(() => {
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
              targetEl.scrollIntoView({ behavior: "auto", block: "start" });
            }
            setIsScrollPositioning(false);
          }, 0);
        } else {
          setTimeout(() => {
            setIsScrollPositioning(false);
          }, 0);
        }

        return () => {
          window.removeEventListener("scroll", handleScrollSave);
          window.removeEventListener("beforeunload", handleScrollSave);
        };
      }
    } else {
      document.documentElement.style.setProperty("--sphere-opacity", "0.25");
      document.documentElement.style.setProperty("--lightning-opacity", "0.85");
    }
  }, [hasEntered]);

  return (
    <>
      {/* Custom cursor animation */}
      <CustomCursor />

      {/* Global dark surface background */}
      {isIntroReady && <SpaceBackground />}
      <AnimatePresence mode="wait">
        {!hasEntered && isIntroReady ? (
          <PortfolioIntro
            key="intro"
            onEnter={() => setHasEntered(true)}
            onProgressChange={() => { }}
          />
        ) : isIntroReady ? (
          <motion.main
            id="top"
            key="portfolio"
            className={`relative z-[2] min-h-screen overflow-hidden bg-[#f8f9fb] dark:bg-[#040406] text-gray-900 dark:text-gray-100 transition-colors duration-500 ${isScrollPositioning ? "opacity-0" : "opacity-100 transition-opacity duration-300"}`}
          >

            {/* ─── Solid Portfolio Content Wrapper (Curtain Page) ─── */}
            <div className="relative z-20 bg-[#f8f9fb] dark:bg-[#040406] shadow-[0_30px_100px_rgba(15,23,42,0.06)] dark:shadow-[0_30px_100px_rgba(0,0,0,0.95)]">
              {/* ─── Header ─── */}
              <Navbar onReturnToIntro={() => setHasEntered(false)} />

              {/* ─── 1st Section: Full Screen Scroll FX Showcase ─── */}
              <div id="home" className="w-full relative z-10">
                <FullScreenScrollFX
                  sections={heroFxSections}
                  header={
                    <div className="flex flex-col items-center justify-center space-y-1 max-w-4xl mx-auto px-4">
                      <span className="text-red-400 text-xs sm:text-sm font-mono tracking-widest font-bold block mb-1 opacity-90">
                        ✦ Engineering Horizon & Disciplines ✦
                      </span>
                      <span className="text-slate-500 dark:text-neutral-400 text-xs tracking-wide font-sans font-medium">
                        Scroll to explore technical capabilities
                      </span>
                    </div>
                  }
                  showProgress
                  durations={{ change: 0.6, snap: 700 }}
                />
              </div>

              {/* ─── Unique Holographic Portal Transition Bridge: Hero Stage -> Projects Directory ─── */}
              <div className="relative z-30 w-full bg-gradient-to-b from-[#f8f9fb] via-[#f8f9fb] to-[#f8f9fb] dark:from-transparent dark:via-[#040406]/90 dark:to-[#040406] py-10 flex flex-col items-center justify-center overflow-hidden pointer-events-none">
                {/* Horizontal Cyber Beam with Moving Laser Pulse */}
                <div className="relative w-full max-w-5xl h-px bg-gradient-to-r from-transparent via-red-300/45 dark:via-red-500/60 to-transparent">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-red-300/70 dark:via-rose-400 to-transparent blur-[3px] animate-pulse" />
                </div>

                {/* Central Holographic Portal Badge */}
                <div className="relative -mt-3.5 z-10 flex items-center gap-3 bg-white/92 dark:bg-[#040406] border border-red-500/25 dark:border-red-500/40 px-5 py-2 rounded-full shadow-[0_16px_38px_-26px_rgba(220,38,38,0.38)] dark:shadow-[0_0_25px_rgba(239,68,68,0.35)] backdrop-blur-xl">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping shadow-[0_0_10px_rgba(239,68,68,0.55)]" />
                  <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-red-400 font-extrabold">
                    ✦ ENTERING PRODUCTION DIRECTORY ✦
                  </span>
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping shadow-[0_0_10px_rgba(239,68,68,0.55)]" />
                </div>

                {/* Pulsing Directional Indicator */}
                <div className="mt-3 flex flex-col items-center gap-1 opacity-70">
                  <ChevronDown className="w-4 h-4 text-red-400 animate-bounce" />
                </div>
              </div>

              {/* ─── Projects Directory Portal ─── */}
              <section className="lazy-section border-t border-gray-200/40 dark:border-gray-800/40 mx-auto max-w-6xl px-5 py-24 sm:px-6 lg:px-8 relative z-10" id="projects">
                {/* Purely Visual Red Background Micro-Graphic Accents */}
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden z-0">
                  <div className="absolute top-1/4 -left-16 w-64 h-64 bg-red-600/8 rounded-full blur-[90px]" />
                  <div className="absolute bottom-10 -right-16 w-72 h-72 bg-rose-600/8 rounded-full blur-[100px]" />

                  {/* Left & Right Fine Red Accent Lines & Glowing Micro Nodes */}
                  <div className="hidden lg:flex flex-col items-center gap-3 absolute left-3 top-24">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400/60 shadow-[0_0_8px_rgba(239,68,68,0.6)] animate-ping" />
                    <div className="w-px h-28 bg-gradient-to-b from-red-500/30 via-red-500/10 to-transparent" />
                  </div>

                  <div className="hidden lg:flex flex-col items-center gap-3 absolute right-3 bottom-24">
                    <div className="w-px h-28 bg-gradient-to-b from-transparent via-rose-500/10 to-rose-500/30" />
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400/60 shadow-[0_0_8px_rgba(244,63,94,0.6)] animate-pulse" />
                  </div>
                </div>

                <SectionHeading eyebrow="Project Directory" title="Categorized Engineering Work" icon={<FolderGit2 size={16} />}>
                  Explore dedicated case studies for AI systems, multi-agent frameworks, NLP tools, and data engineering pipelines.
                </SectionHeading>

                {/* Horizontal Swiper Carousel for Project Cards (3D Earth Revolving Orbit) */}
                <div className="w-full flex justify-center items-center relative py-6">
                  {/* Glowing 3D Planetary Orbit Ring Graphic Accents */}
                  <div aria-hidden="true" className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[98%] max-w-5xl h-52 sm:h-64 border border-red-500/25 rounded-[100%] blur-[0.5px] shadow-[0_0_40px_rgba(239,68,68,0.15)] z-0 [transform:rotateX(72deg)]" />
                  <div aria-hidden="true" className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[85%] max-w-4xl h-40 sm:h-48 border border-rose-500/15 rounded-[100%] blur-[1px] z-0 [transform:rotateX(75deg)]" />

                  <style>{`
                    .projects-swiper {
                      width: 100%;
                      padding-top: 35px;
                      padding-bottom: 75px;
                      perspective: 1200px;
                    }
                    .projects-swiper .swiper-wrapper {
                      transform-style: preserve-3d;
                    }
                    .projects-swiper .swiper-slide {
                      height: auto;
                      transform-style: preserve-3d;
                      will-change: transform, opacity;
                      transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease;
                    }
                    .projects-swiper.swiper-touching .swiper-slide {
                      transition: none !important;
                    }
                    .projects-swiper .swiper-pagination-bullet-active {
                      background: var(--accent) !important;
                      box-shadow: 0 0 14px var(--accent);
                    }
                    .projects-swiper .swiper-button-next,
                    .projects-swiper .swiper-button-prev {
                      color: var(--accent);
                      transition: transform 0.2s ease, opacity 0.2s ease;
                    }
                    .projects-swiper .swiper-button-next:hover,
                    .projects-swiper .swiper-button-prev:hover {
                      transform: scale(1.15);
                    }
                  `}</style>
                  <div className="w-full max-w-5xl relative z-10">
                    <Swiper
                      className="projects-swiper"
                      watchSlidesProgress={true}
                      spaceBetween={30}
                      autoplay={{
                        delay: 3500,
                        disableOnInteraction: false,
                      }}
                      grabCursor={true}
                      centeredSlides={true}
                      loop={projects.length > 1}
                      slidesPerView={1.1}
                      breakpoints={{
                        640: {
                          slidesPerView: 1.6,
                          spaceBetween: 30,
                        },
                        768: {
                          slidesPerView: 2.2,
                          spaceBetween: 35,
                        },
                        1024: {
                          slidesPerView: 2.7,
                          spaceBetween: 40,
                        }
                      }}
                      onProgress={(swiper) => {
                        swiper.slides.forEach((slideEl) => {
                          const progress = Number((slideEl as HTMLElement & { progress?: number }).progress || 0);
                          const absProgress = Math.abs(progress);
                          
                          // Angle along 3D revolving orbital trajectory (in radians)
                          const angle = progress * 0.55; 
                          
                          // Focus card (progress === 0): rotateY = 0, rotateX = 0 (faces user directly on screen)
                          // Side cards: revolve in 3D spatial orbit (Yaw, Pitch, Roll)
                          const rotateY = progress * 36; 
                          const rotateX = -Math.sin(angle) * 11;
                          const rotateZ = -progress * 2.5; 
                          
                          // 3D Orbital Coordinates (X, Y, Z - Earth Revolving Path)
                          const translateY = Math.sin(angle) * 18 + Math.pow(absProgress, 1.6) * 16;
                          const translateZ = (Math.cos(angle) - 1) * 380 - absProgress * 45;
                          
                          // 3D Scale & Opacity Decay
                          const scale = Math.max(0.72, Math.cos(angle) * 0.98);
                          const opacity = Math.max(0.2, 1 - absProgress * 0.35);
                          const zIndex = Math.round(200 + translateZ);

                          slideEl.style.transform = `translate3d(0px, ${translateY.toFixed(2)}px, ${translateZ.toFixed(2)}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) rotateZ(${rotateZ.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
                          slideEl.style.opacity = opacity.toFixed(3);
                          slideEl.style.zIndex = zIndex.toString();
                        });
                      }}
                      onSetTranslate={(swiper) => {
                        swiper.slides.forEach((slideEl) => {
                          const progress = Number((slideEl as HTMLElement & { progress?: number }).progress || 0);
                          const absProgress = Math.abs(progress);
                          
                          const angle = progress * 0.55; 
                          const rotateY = progress * 36; 
                          const rotateX = -Math.sin(angle) * 11;
                          const rotateZ = -progress * 2.5; 
                          
                          const translateY = Math.sin(angle) * 18 + Math.pow(absProgress, 1.6) * 16;
                          const translateZ = (Math.cos(angle) - 1) * 380 - absProgress * 45;
                          
                          const scale = Math.max(0.72, Math.cos(angle) * 0.98);
                          const opacity = Math.max(0.2, 1 - absProgress * 0.35);
                          const zIndex = Math.round(200 + translateZ);

                          slideEl.style.transform = `translate3d(0px, ${translateY.toFixed(2)}px, ${translateZ.toFixed(2)}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) rotateZ(${rotateZ.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
                          slideEl.style.opacity = opacity.toFixed(3);
                          slideEl.style.zIndex = zIndex.toString();
                        });
                      }}
                      pagination={{ clickable: true }}
                      navigation={true}
                      modules={[Autoplay, Pagination, Navigation]}
                    >
                      {projects.map((project) => (
                        <SwiperSlide key={project.slug}>
                          <ProjectCard project={project} />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </div>
              </section>

              {/* ─── Skills ─── */}
              <section className="lazy-section border-t border-gray-200/40 dark:border-gray-800/40 bg-transparent px-5 py-24 sm:px-6 lg:px-8 relative z-10" id="skills">
                {/* Purely Visual Red Background Micro-Graphic Accents */}
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden z-0">
                  <div className="absolute top-1/3 -right-20 w-72 h-72 bg-red-600/8 rounded-full blur-[100px]" />
                  <div className="absolute bottom-1/4 -left-20 w-64 h-64 bg-rose-600/8 rounded-full blur-[90px]" />

                  {/* Horizontal Fine Accent Trace Lines */}
                  <div className="hidden lg:flex items-center gap-2 absolute left-4 top-16">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400/60 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
                    <div className="w-32 h-px bg-gradient-to-r from-red-500/30 to-transparent" />
                  </div>

                  <div className="hidden lg:flex items-center gap-2 absolute right-4 bottom-16">
                    <div className="w-32 h-px bg-gradient-to-l from-red-500/30 to-transparent" />
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400/60 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
                  </div>
                </div>

                <div className="mx-auto max-w-6xl">
                  <SectionHeading eyebrow="Skills" title="Technical Toolkit" icon={<Wrench size={16} />}>
                    Languages, frameworks, database managers, and DevOps tools in my stack.
                  </SectionHeading>
                  <SkillsBento />
                </div>
              </section>

              {/* ─── Experience ─── */}
              <section className="lazy-section border-t border-gray-200/40 dark:border-gray-800/40 bg-transparent px-5 py-24 sm:px-6 lg:px-8 relative z-10" id="experience">
                {/* Purely Visual Red Background Micro-Graphic Accents */}
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden z-0">
                  <div className="absolute top-1/4 -left-20 w-72 h-72 bg-red-600/8 rounded-full blur-[100px]" />
                  <div className="absolute bottom-12 -right-20 w-64 h-64 bg-rose-600/8 rounded-full blur-[90px]" />

                  <div className="hidden lg:flex flex-col items-center gap-3 absolute left-3 top-20">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400/60 shadow-[0_0_8px_rgba(239,68,68,0.6)] animate-ping" />
                    <div className="w-px h-32 bg-gradient-to-b from-red-500/30 via-red-500/10 to-transparent" />
                  </div>

                  <div className="hidden lg:flex items-center gap-2 absolute right-4 bottom-20">
                    <div className="w-24 h-px bg-gradient-to-l from-red-500/30 to-transparent" />
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400/60 shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
                  </div>
                </div>

                <div className="mx-auto max-w-[92rem] xl:max-w-[96rem]">
                  <SectionHeading eyebrow="Experience & Mastery" title="Work History & Engineering Learnings" icon={<Briefcase size={16} />}>
                    Developer roles in tech chapters alongside practical engineering insights, performance optimizations, and architectural lessons from building production projects.
                  </SectionHeading>
                  <ExperienceBento />
                </div>
              </section>

              {/* ─── Smooth Transition Bridge into Footer ─── */}
              <div className="relative z-20 w-full bg-gradient-to-b from-transparent via-slate-100/80 dark:via-neutral-950/80 to-[#f6f6f8] dark:to-black pt-12 border-t border-red-500/20">
                <div className="flex items-center justify-center gap-4 text-xs font-mono tracking-[0.35em] uppercase text-red-600 dark:text-red-400/60 pb-6">
                  <div className="w-16 h-px bg-gradient-to-r from-transparent to-red-500/40" />
                  <span className="animate-pulse">✦ GET IN TOUCH & CONNECT ✦</span>
                  <div className="w-16 h-px bg-gradient-to-l from-transparent to-red-500/40" />
                </div>
              </div>
            </div>

            {/* ─── Footer with Integrated Contact Section (Curtain Reveal Underneath) ─── */}
            <Footer profileName={profile.name.full} socialDockItems={socialDockItems} />
          </motion.main>
        ) : null}
      </AnimatePresence>

      {/* ─── Holographic Auth Router Modal ─── */}
      <AnimatePresence>
        {showAuthModal && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-lg bg-black/90 border border-red-500/25 rounded-3xl p-6 md:p-8 shadow-[0_0_50px_rgba(239,68,68,0.15)] overflow-hidden"
            >
              {/* Cyber Grid Overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.01)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

              {/* Corner Brackets */}
              <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-red-500/40 pointer-events-none" />
              <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-red-500/40 pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-red-500/40 pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-red-500/40 pointer-events-none" />

              {/* Title & Info */}
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(239,68,68,0.15)]">
                  <Terminal className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-xl font-bold tracking-tight text-white uppercase font-mono">
                  Holographic Auth Router
                </h3>
                <p className="text-xs text-neutral-400 mt-2 max-w-sm leading-relaxed">
                  We detected a security callback redirect. This happens when an external project (like Resume AI) is configured to redirect authorization requests to <code className="text-red-400 bg-red-500/5 px-1.5 py-0.5 rounded font-mono">localhost:3000</code>.
                </p>
              </div>

              {/* Action Routes List */}
              <div className="relative z-10 flex flex-col gap-3 mt-6">
                <span className="text-[9px] uppercase tracking-widest text-neutral-500 font-bold font-mono text-center">
                  Select destination project
                </span>

                <button
                  onClick={() => {
                    window.location.href = `https://resume-a.vercel.app/${authParams}`;
                  }}
                  className="group flex items-center justify-between p-3.5 rounded-xl border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 hover:border-red-400 text-left transition-all duration-300"
                >
                  <div>
                    <p className="text-sm font-bold text-white leading-tight">Resume AI</p>
                    <p className="text-[10px] text-neutral-400 mt-1">Route login to resume-a.vercel.app</p>
                  </div>
                  <ArrowUpRight size={16} className="text-red-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>

                <button
                  onClick={() => {
                    window.location.href = `https://research-agent-one-ruddy.vercel.app/${authParams}`;
                  }}
                  className="group flex items-center justify-between p-3.5 rounded-xl border border-purple-500/20 bg-purple-500/5 hover:bg-purple-500/10 hover:border-purple-400 text-left transition-all duration-300"
                >
                  <div>
                    <p className="text-sm font-bold text-white leading-tight">ResearchX AI</p>
                    <p className="text-[10px] text-neutral-400 mt-1">Route login to research-agent-one-ruddy.vercel.app</p>
                  </div>
                  <ArrowUpRight size={16} className="text-purple-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>

                <button
                  onClick={() => {
                    window.location.href = `https://trip-crafter-pro-56.vercel.app/${authParams}`;
                  }}
                  className="group flex items-center justify-between p-3.5 rounded-xl border border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/10 hover:border-amber-400 text-left transition-all duration-300"
                >
                  <div>
                    <p className="text-sm font-bold text-white leading-tight">TripCrafter Pro</p>
                    <p className="text-[10px] text-neutral-400 mt-1">Route login to trip-crafter-pro-56.vercel.app</p>
                  </div>
                  <ArrowUpRight size={16} className="text-amber-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>

              {/* Close / Dismiss */}
              <div className="relative z-10 flex gap-3 mt-6 pt-4 border-t border-neutral-800">
                <button
                  onClick={() => {
                    setShowAuthModal(false);
                    if (typeof window !== "undefined" && window.history.replaceState) {
                      window.history.replaceState({}, document.title, "/");
                    }
                  }}
                  className="w-full py-2.5 rounded-xl border border-neutral-800 text-xs font-bold text-neutral-400 hover:text-white hover:border-neutral-700 hover:bg-white/[0.02] text-center transition-all duration-200 cursor-pointer"
                >
                  STAY ON PORTFOLIO (DISMISS)
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </>
  );
}
