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
} from "lucide-react";
import { SpaceBackground } from "@/components/ui/space-background";
import SkillsBento from "@/components/SkillsBento";
import ExperienceBento from "@/components/ExperienceBento";
import { AnimatePresence, motion } from "framer-motion";
import { PortfolioIntro } from "@/components/ui/portfolio-intro";
import { Navbar } from "@/components/ui/mini-navbar";
import Footer from "@/components/Footer";

import CustomCursor from "@/components/ui/custom-cursor";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import { ParticleHero } from "@/components/ui/particle-hero";
import { FullScreenScrollFX, FXSection } from "@/components/ui/full-screen-scroll-fx";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandInstagram,
  IconMail,
  IconFileText,
} from "@tabler/icons-react";
import Link from "next/link";
import { Project, projects } from "@/lib/projects";

const heroFxSections: FXSection[] = [
  {
    leftLabel: "NEURAL NETWORKS",
    title: "AI & Machine Learning",
    subtitle: "Architecting Deep Learning Models & Intelligent Vision Pipelines",
    tags: ["PyTorch", "TensorFlow", "Scikit-Learn", "OpenCV"],
    rightLabel: "LLM & VISION",
    bgGradient: "radial-gradient(circle at 50% 50%, rgba(239, 68, 68, 0.18) 0%, rgba(15, 17, 23, 0.95) 60%, #040406 100%)",
    glowColor: "#ef4444",
  },
  {
    leftLabel: "MULTI-AGENT",
    title: "Agentic Frameworks",
    subtitle: "Orchestrating Autonomous Task Automation & Complex Reasoning",
    tags: ["LangChain", "LlamaIndex", "AutoGen", "Tool Calling"],
    rightLabel: "AUTONOMOUS FLOWS",
    bgGradient: "radial-gradient(circle at 50% 50%, rgba(225, 29, 72, 0.18) 0%, rgba(15, 17, 23, 0.95) 60%, #040406 100%)",
    glowColor: "#e11d48",
  },
  {
    leftLabel: "NEXT.JS & TURBOPACK",
    title: "Full-Stack Architecture",
    subtitle: "Building Ultra-Fast, Responsive Production Web Applications",
    tags: ["Next.js 16", "React 19", "Node.js", "Supabase", "Tailwind"],
    rightLabel: "SCALABLE WEB",
    bgGradient: "radial-gradient(circle at 50% 50%, rgba(244, 63, 94, 0.18) 0%, rgba(15, 17, 23, 0.95) 60%, #040406 100%)",
    glowColor: "#f43f5e",
  },
  {
    leftLabel: "PRODUCTION READY",
    title: "Real-World Engineering",
    subtitle: "Deploying Enterprise AI & High-Throughput Data Infrastructure",
    tags: ["REST & GraphQL", "Cloud Architecture", "Docker", "Edge AI"],
    rightLabel: "DEPLOYED IMPACT",
    bgGradient: "radial-gradient(circle at 50% 50%, rgba(248, 113, 113, 0.18) 0%, rgba(15, 17, 23, 0.95) 60%, #040406 100%)",
    glowColor: "#f87171",
  },
];
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
  "learnx": <GraduationCap className="w-5 h-5 text-red-400" />,
  "resume-analyzer": <FileText className="w-5 h-5 text-emerald-400" />,
  "researchx-ai": <Cpu className="w-5 h-5 text-purple-400" />,
  "tripcrafter-pro": <MapPin className="w-5 h-5 text-amber-400" />,
  "ai-tools-tracker": <Wrench className="w-5 h-5 text-cyan-400" />
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = projectIconMap[project.slug] || <FolderGit2 className="w-5 h-5 text-red-400" />;
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
        className='w-full min-h-[480px] bg-black/80 backdrop-blur-md rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col p-4 gap-3 overflow-hidden border border-gray-800/80 hover:border-red-500/40 hover:shadow-[0_0_30px_rgba(239,68,68,0.15)] transition-all duration-300 relative group'
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.08 }}
        whileHover={{ y: -6, scale: 1.01 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Top header row */}
        <div className='flex justify-between items-center px-1'>
          <div className="flex items-center gap-2">
            {Icon}
            <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full border border-red-500/20">
              {project.category}
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs text-neutral-400 group-hover:text-red-400 font-bold transition-colors">
            <span>Explore</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>

        {/* Title & Image */}
        <div className='flex flex-col gap-2.5 flex-1 mt-1'>
          <h3 className="title text-xl font-bold tracking-tight text-white leading-tight flex items-center group-hover:text-red-300 transition-colors">
            {project.name}
          </h3>

          {/* Image with ambient background glow */}
          <div className="image relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-900 shadow-md">
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
          <p className="desc text-xs text-neutral-400 font-light leading-relaxed line-clamp-2 mt-1">
            {project.description}
          </p>

          {/* Tech stack capsules */}
          <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-neutral-800/60">
            {stackItems.slice(0, 3).map((tech) => (
              <span
                className="rounded-full bg-red-500/10 border border-red-500/20 px-2.5 py-0.5 text-[9px] font-semibold text-red-300 backdrop-blur-sm"
                key={tech}
              >
                {tech}
              </span>
            ))}
            {stackItems.length > 3 && (
              <span className="rounded-full bg-neutral-900 border border-neutral-800 px-2 py-0.5 text-[9px] font-semibold text-neutral-500">
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
            onProgressChange={() => { }}
          />
        ) : isIntroReady ? (
          <motion.main
            id="top"
            key="portfolio"
            className={`relative z-[2] min-h-screen overflow-hidden bg-transparent text-gray-900 dark:text-gray-100 transition-colors duration-500 ${isScrollPositioning ? "opacity-0" : "opacity-100 transition-opacity duration-300"}`}
          >

            {/* ─── Solid Portfolio Content Wrapper (Curtain Page) ─── */}
            <div className="relative z-20 bg-[#050607] shadow-[0_35px_60px_rgba(0,0,0,0.95)] border-b border-white/10">
              {/* ─── Header ─── */}
              <Navbar onReturnToIntro={() => setHasEntered(false)} />

              {/* ─── 1st Section: Full Screen Scroll FX Showcase ─── */}
              <div id="home" className="w-full relative z-10">
                <FullScreenScrollFX
                  sections={heroFxSections}
                  header={
                    <div className="flex flex-col items-center justify-center space-y-1 max-w-4xl mx-auto px-4">
                      <span className="text-red-400 text-xs sm:text-sm font-mono tracking-[0.35em] font-bold block mb-1 opacity-90">
                        ✦ ENGINEERING HORIZON & DISCIPLINES ✦
                      </span>
                      <span className="text-white/60 text-xs tracking-widest font-sans font-medium uppercase">
                        Scroll to explore technical capabilities
                      </span>
                    </div>
                  }
                  showProgress
                  durations={{ change: 0.6, snap: 700 }}
                />
              </div>

              {/* ─── 2nd Section: Personal Hero / About Me ─── */}
              <div id="about" className="w-full border-t border-red-500/10">
                <ParticleHero particleCount={15}>
                  <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 w-full">
                    <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-5xl w-full">

                      {/* ── Text Side ── */}
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="flex w-full flex-col space-y-6 text-center md:text-left"
                      >
                        {/* Specialization tag */}
                        <div className="flex justify-center md:justify-start">
                          <span className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-xs font-semibold text-red-200/90 backdrop-blur-md shadow-[0_0_15px_rgba(239,68,68,0.15)]">
                            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse shadow-[0_0_8px_rgba(248,113,113,0.8)]" />
                            {profile.specialization}
                          </span>
                        </div>

                        {/* Main Hero Headline using ParticleHero Gradient Title with Space Grotesk Font */}
                        <div className="flex justify-center md:justify-start w-full my-2">
                          <h1 className="font-space text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none my-2">
                            <span className="bg-gradient-to-b from-red-300 via-red-500 to-red-800 bg-clip-text text-transparent drop-shadow-2xl">
                              {profile.name.short}
                            </span>
                          </h1>
                        </div>

                        {/* Animated Flipping Subtitles */}
                        <div className="space-y-3 w-full">
                          <div className="flex justify-center md:justify-start w-full my-2">
                            <ContainerTextFlip
                              words={profile.subtitles}
                              interval={4000}
                            />
                          </div>
                          <div className="w-24 h-px bg-gradient-to-r from-transparent via-red-400 to-transparent mx-auto md:mx-0"></div>
                        </div>

                        {/* Bio */}
                        <p className="text-sm sm:text-base md:text-lg text-red-100/70 font-light max-w-3xl leading-relaxed mx-auto md:mx-0">
                          {profile.bio}
                        </p>

                        {/* Call to Action Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-4 w-full">
                          <a
                            href="#projects"
                            className="group relative px-8 py-3.5 bg-transparent border border-red-500/40 hover:border-red-400 text-red-200 hover:text-white font-medium text-sm tracking-wider uppercase transition-all duration-500 overflow-hidden rounded-xl shadow-[0_0_20px_rgba(239,68,68,0.2)] flex items-center justify-center gap-2"
                          >
                            <span className="relative z-10 flex items-center gap-2">
                              View Projects
                              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-red-600/0 via-red-500/25 to-red-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                          </a>

                          <a
                            href="#contact"
                            className="px-8 py-3.5 border border-white/20 hover:border-red-400 text-white hover:text-red-300 font-semibold text-sm tracking-wider uppercase rounded-xl transition-all duration-300 backdrop-blur-sm bg-black/40 flex items-center justify-center"
                          >
                            Get in Touch
                          </a>
                        </div>

                        {/* Interactive hint */}
                        <div className="flex items-center justify-center md:justify-start gap-6 text-red-400/40 text-xs uppercase tracking-[0.3em] pt-6">
                          <div className="w-12 h-px bg-gradient-to-r from-transparent to-red-500/30"></div>
                          <span className="animate-pulse">Move Cursor to Create Light Flow</span>
                          <div className="w-12 h-px bg-gradient-to-l from-transparent to-red-500/30"></div>
                        </div>
                      </motion.div>

                    </div>
                  </div>
                </ParticleHero>
              </div>

              {/* ─── Projects Directory Portal ─── */}
              <section className="lazy-section border-t border-gray-200/40 dark:border-gray-800/40 mx-auto max-w-6xl px-5 py-24 sm:px-6 lg:px-8 relative z-10" id="projects">
                <SectionHeading eyebrow="Project Directory" title="Categorized Engineering Work" icon={<FolderGit2 size={16} />}>
                  Explore dedicated case studies for AI systems, multi-agent frameworks, NLP tools, and data engineering pipelines.
                </SectionHeading>

                {/* Horizontal Swiper Carousel for Project Cards */}
                <div className="w-full flex justify-center items-center">
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
                height: auto;
                opacity: 0.45;
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
                      spaceBetween={25}
                      autoplay={{
                        delay: 3500,
                        disableOnInteraction: false,
                      }}
                      effect={"coverflow"}
                      grabCursor={true}
                      centeredSlides={true}
                      loop={projects.length > 1}
                      slidesPerView={1.1}
                      breakpoints={{
                        640: {
                          slidesPerView: 1.6,
                          spaceBetween: 25,
                        },
                        768: {
                          slidesPerView: 2.2,
                          spaceBetween: 30,
                        },
                        1024: {
                          slidesPerView: 2.8,
                          spaceBetween: 30,
                        }
                      }}
                      coverflowEffect={{
                        rotate: 15,
                        stretch: -10,
                        depth: 120,
                        modifier: 1,
                        slideShadows: false,
                      }}
                      pagination={{ clickable: true }}
                      navigation={true}
                      modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
                    >
                      {projects.map((project, idx) => (
                        <SwiperSlide key={project.slug}>
                          <ProjectCard project={project} index={idx} />
                        </SwiperSlide>
                      ))}
                    </Swiper>
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

              {/* ─── Experience ─── */}
              <section className="lazy-section border-t border-gray-200/40 dark:border-gray-800/40 bg-transparent px-5 py-24 sm:px-6 lg:px-8 relative z-10" id="experience">
                <div className="mx-auto max-w-6xl">
                  <SectionHeading eyebrow="Experience" title="Work History" icon={<Briefcase size={16} />}>
                    Professional contributions and developer roles in tech groups.
                  </SectionHeading>
                  <ExperienceBento />
                </div>
              </section>
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
