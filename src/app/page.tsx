"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  Mail,
  MoveUp,
  Briefcase,
  GraduationCap,
  Wrench,
  FolderGit2,
  MapPin,
  FileText,
  Copy,
  Check,
  Cpu,
  Terminal,
} from "lucide-react";
import { Github, Linkedin, Instagram } from "@/components/icons/BrandIcons";
import { SpaceBackground } from "@/components/ui/space-background";
import SkillsBento from "@/components/SkillsBento";
import MacbookContact from "@/components/MacbookContact";
import ExperienceBento from "@/components/ExperienceBento";
import { AnimatePresence, motion } from "framer-motion";
import { PortfolioIntro } from "@/components/ui/portfolio-intro";
import { Navbar } from "@/components/ui/mini-navbar";

import CustomCursor from "@/components/ui/custom-cursor";
import { FloatingDock } from "@/components/ui/floating-dock";
import { TextRevealCard } from "@/components/ui/text-reveal-card";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandInstagram,
  IconMail,
  IconFileText,
} from "@tabler/icons-react";
import Link from "next/link";
import { Project, projects } from "@/lib/projects";
import { profile } from "@/lib/profile";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Projects dataset is imported from '@/lib/projects'

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
  "learnx": <GraduationCap className="w-5 h-5 text-blue-400" />,
  "resume-analyzer": <FileText className="w-5 h-5 text-emerald-400" />,
  "researchx-ai": <Cpu className="w-5 h-5 text-purple-400" />,
  "tripcrafter-pro": <MapPin className="w-5 h-5 text-amber-400" />,
  "ai-tools-tracker": <Wrench className="w-5 h-5 text-cyan-400" />
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = projectIconMap[project.slug] || <FolderGit2 className="w-5 h-5 text-blue-400" />;
  const stackItems = project.stack.flatMap((group) => group.items);

  return (
    <Link 
      href={`/projects/${project.slug}`} 
      onClick={() => {
        if (typeof window !== "undefined") {
          sessionStorage.setItem("portfolio-scroll-y", window.scrollY.toString());
        }
      }}
      className="block w-full max-w-[320px] select-none text-left"
    >
      <motion.div 
        className='w-full min-h-[460px] bg-black/80 backdrop-blur-sm rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] flex flex-col p-3 gap-3 overflow-hidden border border-gray-800 hover:border-blue-500/20 transition-colors duration-300 relative'
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.08 }}
        whileHover={{ 
          y: -4,
          scale: 1.005,
          boxShadow: "0 25px 50px rgba(59,130,246,0.08)",
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Top action row */}
        <div className='flex justify-between items-center px-1'>
          <div className="flex items-center gap-2">
            {Icon}
            <span className="text-[9px] uppercase tracking-widest text-neutral-500 font-semibold font-mono">
              Project {index + 1}
            </span>
          </div>
        </div>

        {/* Title & brief */}
        <div className='flex flex-col gap-2 flex-1'>
          <h3 className="title text-lg font-bold tracking-tight text-white leading-tight min-h-[40px] flex items-center">
            {project.name}
          </h3>
          
          {/* Image with cool blurred background glow */}
          <div className="image relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-neutral-950 border border-neutral-900">
            <div className="absolute inset-0 rounded-xl opacity-20 z-0">
              <motion.div
                animate={{ scale: isHovered ? 1.05 : 1 }}
                transition={{ duration: 3, ease: "easeInOut" }}
                className="w-full h-full"
              >
                <Image 
                  src={project.image} 
                  alt={`${project.name} background`} 
                  className="w-full h-full object-cover blur-md scale-120"
                  width={360}
                  height={200}
                  unoptimized
                />
              </motion.div>
            </div>
            <motion.div 
              className="relative z-10 w-full h-full p-1"
              whileHover={{ scale: 1.015 }}
              transition={{ ease: "easeInOut" }}
            >
              <Image 
                src={project.image} 
                alt={project.name} 
                className="rounded-lg w-full h-full object-cover shadow-inner"
                width={360}
                height={200}
                unoptimized
              />
            </motion.div>
          </div>

          {/* Small brief description */}
          <p className="desc text-xs text-neutral-400 font-light leading-relaxed mt-2.5 flex-1">
            {project.description}
          </p>

          {/* Tech stack capsules */}
          <div className="flex flex-wrap gap-1 mt-auto pt-3 border-t border-neutral-800/50">
            {stackItems.slice(0, 3).map((tech) => (
              <span 
                className="rounded-full bg-blue-500/5 border border-blue-500/10 px-2 py-0.5 text-[8.5px] font-semibold text-blue-300/80 backdrop-blur-sm" 
                key={tech}
              >
                {tech}
              </span>
            ))}
            {stackItems.length > 3 && (
              <span className="rounded-full bg-neutral-900 border border-neutral-800 px-2 py-0.5 text-[8.5px] font-semibold text-neutral-400">
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
  const lightningHue = 220; // Default to blue


  // Clipboard state
  const [isCopied, setIsCopied] = useState(false);

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(profile.contact.email);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

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
        
        const storedScrollY = sessionStorage.getItem("portfolio-scroll-y");
        if (storedScrollY !== null) {
          const scrollY = parseInt(storedScrollY, 10);
          setTimeout(() => {
            window.scrollTo(0, scrollY);
            setIsScrollPositioning(false);
            sessionStorage.removeItem("portfolio-scroll-y");
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
            onProgressChange={() => {}}
          />
        ) : isIntroReady ? (
          <motion.main 
            id="top" 
            key="portfolio" 
            className={`relative z-[2] min-h-screen overflow-hidden bg-transparent text-gray-900 dark:text-gray-100 transition-colors duration-500 ${isScrollPositioning ? "opacity-0" : "opacity-100 transition-opacity duration-300"}`}
          >

      {/* ─── Header ─── */}
      <Navbar onReturnToIntro={() => setHasEntered(false)} />

      {/* ─── Hero ─── */}
      <section
        id="home"
        className="relative w-full min-h-[92vh] md:min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-12 md:py-24"
      >
        {/* Main Content — floating on the starfield */}
        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-6">
          <div className="grid w-full items-center gap-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16">

            {/* ── Text Side ── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex w-full flex-col space-y-5 text-center sm:space-y-6 md:text-left"
            >
              {/* Specialization tag */}
              <div className="flex justify-center md:justify-start">
                <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-3 py-1 sm:px-4 sm:py-1.5 text-[11px] sm:text-xs font-semibold text-blue-300/80 backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse shadow-[0_0_6px_rgba(96,165,250,0.6)]" />
                  {profile.specialization}
                </span>
              </div>

              {/* Name & Title in TextRevealCard */}
              <div className="flex justify-center md:justify-start w-full my-2 overflow-x-hidden">
                <TextRevealCard
                  text={profile.name.short}
                  revealText={profile.role}
                  className="bg-transparent border-none p-0 w-full shadow-none max-w-4xl lg:max-w-5xl"
                />
              </div>

              {/* Animated Flipping Subtitles */}
              <div className="flex justify-center md:justify-start w-full my-2">
                <ContainerTextFlip
                  words={profile.subtitles}
                  interval={2500}
                />
              </div>

              {/* Bio */}
              <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-3xl mx-auto md:mx-0">
                {profile.bio}
              </p>

              {/* Ghost-style CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 justify-center md:justify-start">
                <a
                  href="#projects"
                  className="group inline-flex items-center justify-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-6 py-2.5 text-sm font-semibold text-blue-300 transition-all duration-300 hover:bg-blue-500/20 hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(96,165,250,0.15)] active:scale-95"
                >
                  View Projects
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-700/50 px-6 py-2.5 text-sm font-semibold text-gray-400 transition-all duration-300 hover:border-gray-600 hover:text-gray-300 hover:bg-white/[0.03] active:scale-95"
                >
                  Get in Touch
                </a>
              </div>
            </motion.div>

            <motion.aside
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto w-full max-w-sm rounded-2xl border border-white/10 bg-black/35 p-5 text-left shadow-[0_24px_80px_rgba(0,0,0,0.32)] backdrop-blur-md lg:mx-0"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-300/70">
                    Current Status
                  </p>
                  <h2 className="mt-1 text-lg font-bold tracking-tight text-white">
                    {profile.status.headline}
                  </h2>
                </div>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/10">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-300 shadow-[0_0_14px_rgba(110,231,183,0.55)]" />
                </span>
              </div>

              <div className="space-y-4 py-5">
                {[
                  { label: "Focus", value: profile.status.focus, icon: <Cpu size={15} /> },
                  { label: "Location", value: profile.status.location, icon: <MapPin size={15} /> },
                  { label: "Availability", value: profile.status.availability, icon: <Briefcase size={15} /> },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-blue-300">
                      {item.icon}
                    </span>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-500">
                        {item.label}
                      </p>
                      <p className="mt-0.5 text-sm font-semibold text-neutral-200">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-500">
                  Core Stack
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {profile.status.coreStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-blue-400/15 bg-blue-400/5 px-2.5 py-1 text-[10px] font-semibold text-blue-200/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.aside>

          </div>
        </div>
      </section>

      {/* ─── Skills ─── */}
      <section className="lazy-section border-t border-gray-200/40 dark:border-gray-800/40 bg-transparent px-5 py-24 sm:px-6 lg:px-8 relative z-10" id="skills">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="Skills" title="Technical Toolkit" icon={<Wrench size={16} />}>
            Languages, frameworks, database managers, and DevOps tools in my stack.
          </SectionHeading>
          <SkillsBento />
        </div>
      </section>

      {/* ─── Projects ─── */}
      <section className="lazy-section border-t border-gray-200/40 dark:border-gray-800/40 mx-auto max-w-6xl px-5 py-24 sm:px-6 lg:px-8 relative z-10" id="projects">
        <SectionHeading eyebrow="Projects" title="Featured Work" icon={<FolderGit2 size={16} />}>
          Practical implementations demonstrating AI engineering, IoT systems, and full-stack development.
        </SectionHeading>
        <div className="w-full flex justify-center items-center mt-12">
          <style>{`
            .projects-swiper {
              width: 100%;
              padding-top: 10px;
              padding-bottom: 50px;
              perspective: 1200px;
            }
            .projects-swiper .swiper-wrapper {
              transform-style: preserve-3d;
            }
            .projects-swiper .swiper-slide {
              background-position: center;
              background-size: cover;
              height: auto;
              opacity: 0.45;
              transform-style: preserve-3d;
              transition: opacity 0.3s ease;
            }
            .projects-swiper .swiper-slide-active {
              opacity: 1;
            }
            .projects-swiper .swiper-pagination-bullet-active {
              background: var(--accent) !important;
            }
            .projects-swiper .swiper-button-next,
            .projects-swiper .swiper-button-prev {
              color: var(--accent);
            }
          `}</style>
          <div className="w-full max-w-5xl">
            <Swiper
              className="projects-swiper"
              spaceBetween={20}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
              }}
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              loop={true}
              slidesPerView={1.2}
              breakpoints={{
                640: {
                  slidesPerView: 1.8,
                  spaceBetween: 25,
                },
                768: {
                  slidesPerView: 2.4,
                  spaceBetween: 30,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                }
              }}
              coverflowEffect={{
                rotate: 25,
                stretch: -15,
                depth: 150,
                modifier: 1,
                slideShadows: false,
              }}
              pagination={{ clickable: true }}
              navigation={true}
              modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
            >
              {[...projects, ...projects].map((project, idx) => (
                <SwiperSlide key={`${project.slug}-${idx}`}>
                  <ProjectCard project={project} index={idx % projects.length} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* ─── Experience ─── */}
      <section className="lazy-section border-t border-gray-200/40 dark:border-gray-800/40 bg-transparent px-5 py-24 sm:px-6 lg:px-8 relative z-10" id="experience">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="Experience" title="Work History" icon={<Briefcase size={16} />}>
            Professional contributions and developer roles in tech groups.
          </SectionHeading>
          <ExperienceBento />
        </div>
      </section>

      {/* ─── Contact ─── */}
      <section className="lazy-section relative z-10 py-24 px-5 sm:px-6 lg:px-8 border-t border-gray-800/30 bg-transparent" id="contact">
        <div className="max-w-5xl mx-auto">

          {/* Section header — centered */}
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-400/80">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse shadow-[0_0_6px_rgba(96,165,250,0.6)]" />
              Get In Touch
            </span>
            <h2
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.05] mt-3"
              style={{ textShadow: '0 0 40px rgba(96, 165, 250, 0.1)' }}
            >
              Let&apos;s Connect
            </h2>
            <p className="mt-4 text-base text-gray-500 max-w-lg mx-auto leading-relaxed">
              Have an internship, collaboration, or opportunity? Drop me a line directly.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-start">

            {/* Left Column: 3D Laptop Contact Form */}
            <div className="flex items-center justify-center lg:pt-4 w-full overflow-hidden">
              <MacbookContact />
            </div>

            {/* Right Column: Directory */}
            <div className="space-y-5">
              <div className="mb-2">
                <h3 className="text-lg font-bold text-white tracking-tight">Directory</h3>
                <p className="text-[11px] text-gray-600 uppercase tracking-widest mt-0.5 font-semibold">
                  Connect directly or view resume
                </p>
              </div>

              {/* Email */}
              <div className="group flex items-center justify-between p-4 rounded-xl border border-gray-800/40 bg-white/[0.02] hover:border-blue-500/30 hover:bg-blue-500/[0.03] transition-all duration-300">
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${profile.contact.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 flex-grow"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-800/60 bg-white/[0.03] text-blue-400 group-hover:border-blue-500/30 group-hover:shadow-[0_0_12px_rgba(96,165,250,0.1)] transition-all duration-300">
                    <Mail size={18} />
                  </div>
                  <div className="text-left">
                    <p className="text-[9px] font-bold text-gray-600 uppercase tracking-wider leading-none mb-1">Email</p>
                    <p className="text-sm font-semibold text-gray-300 group-hover:text-blue-400 transition-colors">
                      {profile.contact.email}
                    </p>
                  </div>
                </a>
                <button
                  onClick={copyEmailToClipboard}
                  className="relative ml-2 p-2 rounded-lg border border-gray-800/60 bg-white/[0.03] hover:bg-white/[0.06] text-gray-500 hover:text-white transition-all cursor-pointer"
                  aria-label="Copy email address"
                >
                  <AnimatePresence mode="wait">
                    {isCopied ? (
                      <motion.div key="copied" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} transition={{ duration: 0.15 }}>
                        <Check size={14} className="text-green-400" />
                      </motion.div>
                    ) : (
                      <motion.div key="copy" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} transition={{ duration: 0.15 }}>
                        <Copy size={14} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {isCopied && (
                    <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-white text-[10px] font-bold text-gray-900 shadow-md whitespace-nowrap animate-fade-up">
                      Copied!
                    </span>
                  )}
                </button>
              </div>

              {/* Social Grid */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { name: profile.socials.linkedin.label, handle: profile.socials.linkedin.handle, href: profile.socials.linkedin.href, Icon: Linkedin, color: "text-[#378fe9]", glow: "rgba(56, 143, 233, 0.15)" },
                  { name: profile.socials.github.label, handle: profile.socials.github.handle, href: profile.socials.github.href, Icon: Github, color: "text-gray-300", glow: "rgba(255, 255, 255, 0.08)" },
                  { name: profile.socials.instagram.label, handle: profile.socials.instagram.handle, href: profile.socials.instagram.href, Icon: Instagram, color: "text-[#f85c96]", glow: "rgba(248, 92, 150, 0.15)" },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/s flex flex-col justify-between p-3.5 rounded-xl border border-gray-800/40 bg-white/[0.02] hover:border-gray-700/60 hover:bg-white/[0.04] transition-all duration-300 min-h-[90px]"
                  >
                    <div className="flex justify-between items-start w-full">
                      <div className={`flex items-center justify-center w-8 h-8 rounded-lg border border-gray-800/60 bg-white/[0.03] ${social.color} transition-all duration-300`}>
                        <social.Icon size={16} />
                      </div>
                      <ArrowUpRight size={12} className="text-gray-700 group-hover/s:text-blue-400 transition-colors" />
                    </div>
                    <div className="text-left mt-2">
                      <p className="text-xs font-bold text-gray-300 leading-tight">{social.name}</p>
                      <p className="text-[9px] text-gray-600 truncate mt-0.5">{social.handle}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Location */}
              <div className="flex items-center gap-3 text-xs text-gray-500 px-1 pt-1">
                <div className="relative flex h-3 w-3 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-40"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-400 shadow-[0_0_6px_rgba(96,165,250,0.5)]"></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin size={13} className="text-gray-600" />
                  <span>{profile.contact.location}</span>
                </div>
              </div>

              {/* View Resume */}
              <a
                href={profile.contact.resumeHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn flex items-center justify-center gap-2 w-full py-3.5 rounded-xl border border-gray-800/40 bg-white/[0.02] text-gray-400 font-bold hover:border-blue-500/30 hover:text-blue-400 hover:bg-blue-500/[0.03] hover:shadow-[0_0_20px_rgba(96,165,250,0.06)] transition-all duration-300 cursor-pointer"
              >
                <FileText size={15} className="group-hover/btn:scale-110 transition-transform duration-200" />
                VIEW RESUME
                <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200" />
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="px-5 py-10 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 border-t border-gray-200 pt-8 text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400 md:flex-row">
          <p>Copyright {new Date().getFullYear()} {profile.name.full}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <FloatingDock
              items={socialDockItems}
              desktopClassName="mx-0 h-14 pb-2 bg-transparent border-none shadow-none"
            />
            {/* Cybernetic Capsule Back to Top Button */}
            <a
              className="group ml-2 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/5 px-5 py-2 font-bold text-blue-300 transition-all duration-300 hover:bg-blue-500/15 hover:border-blue-400/60 hover:text-blue-200 hover:shadow-[0_0_20px_rgba(96,165,250,0.25)] text-xs uppercase tracking-wider relative overflow-hidden"
              href="#top"
            >
              <span>Back to Top</span>
              <div className="relative overflow-hidden w-3 h-3 flex items-center justify-center">
                <div className="flex flex-col items-center justify-center absolute transition-transform duration-300 group-hover:-translate-y-[100%]" style={{ height: "200%" }}>
                  <div className="h-3 flex items-center justify-center">
                    <MoveUp size={12} strokeWidth={2.8} />
                  </div>
                  <div className="h-3 flex items-center justify-center">
                    <MoveUp size={12} strokeWidth={2.8} />
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </footer>
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
            className="relative w-full max-w-lg bg-black/90 border border-blue-500/25 rounded-3xl p-6 md:p-8 shadow-[0_0_50px_rgba(59,130,246,0.15)] overflow-hidden"
          >
            {/* Cyber Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.01)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

            {/* Corner Brackets */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-blue-500/40 pointer-events-none" />
            <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-blue-500/40 pointer-events-none" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-blue-500/40 pointer-events-none" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-blue-500/40 pointer-events-none" />

            {/* Title & Info */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
                <Terminal className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold tracking-tight text-white uppercase font-mono">
                Holographic Auth Router
              </h3>
              <p className="text-xs text-neutral-400 mt-2 max-w-sm leading-relaxed">
                We detected a security callback redirect. This happens when an external project (like Resume AI) is configured to redirect authorization requests to <code className="text-blue-400 bg-blue-500/5 px-1.5 py-0.5 rounded font-mono">localhost:3000</code>.
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
                className="group flex items-center justify-between p-3.5 rounded-xl border border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 hover:border-blue-400 text-left transition-all duration-300"
              >
                <div>
                  <p className="text-sm font-bold text-white leading-tight">Resume AI</p>
                  <p className="text-[10px] text-neutral-400 mt-1">Route login to resume-a.vercel.app</p>
                </div>
                <ArrowUpRight size={16} className="text-blue-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
