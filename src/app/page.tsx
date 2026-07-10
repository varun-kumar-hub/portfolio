"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  Download,
  Mail,
  MoveUp,
  Briefcase,
  GraduationCap,
  Wrench,
  FolderGit2,
  Award,
  ExternalLink,
  BookOpen,
  User,
  MapPin,
  FileText,
  Copy,
  Check,
  Send,
  Cpu,
  Terminal,
} from "lucide-react";
import { Github, Linkedin, Twitter, Instagram } from "@/components/icons/BrandIcons";
import { DottedSurface } from "@/components/ui/dotted-surface";
import { SpaceBackground } from "@/components/ui/space-background";
import SkillsBento from "@/components/SkillsBento";
import EducationTimeline from "@/components/EducationTimeline";
import ExperienceBento from "@/components/ExperienceBento";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { PortfolioIntro } from "@/components/ui/portfolio-intro";
import { Navbar } from "@/components/ui/mini-navbar";
import { Lightning, ElasticHueSlider } from "@/components/ui/hero-odyssey";

import CustomCursor from "@/components/ui/custom-cursor";
import Link from "next/link";
import { projects } from "@/lib/projects";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

const navItems = ["Home", "Education", "Skills", "Projects", "Experience", "Contact"];

const skillGroups = [
  {
    title: "Programming Languages",
    skills: ["Java", "Python", "C Programming", "HTML5", "CSS3"],
  },
  {
    title: "Disruptive Technologies",
    skills: ["Artificial Intelligence (AI)", "Machine Learning (ML)", "Internet of Things (IoT)"],
  },
  {
    title: "Web Frameworks & Libraries",
    skills: ["React", "Next.js", "Node.js", "Tailwind CSS"],
  },
  {
    title: "Database Management",
    skills: ["PostgreSQL", "Supabase", "Relational Databases", "Big Data", "Data Warehousing"],
  },
  {
    title: "Tools & DevOps",
    skills: ["Git", "GitHub", "Docker", "CI/CD Pipelines"],
  },
];

// Projects dataset is imported from '@/lib/projects'

const publications = [
  {
    title: "Smart Irrigation System featuring AI-based decision making",
    type: "Government Patent Application (Filed)",
    description:
      "Filed a patent application with the Government for a Smart Irrigation System featuring AI-based decision making, soil moisture sensors, and automated irrigation control.",
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

function ProjectVisual({ index }: { index: number }) {
  return (
    <div className="flex aspect-[16/6] items-center justify-center border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50">
      <div className="w-[90%] rounded-md border border-gray-200 bg-white p-3 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="mb-2 flex items-center gap-1.5 border-b border-gray-100 pb-1.5 dark:border-gray-700">
          <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
          <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
          <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
        </div>
        <div className="space-y-2">
          <div className="h-2.5 w-1/3 rounded-full bg-gray-900 dark:bg-gray-200" />
          <div className="h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-600" />
          <div className="h-1.5 w-5/6 rounded-full bg-gray-200 dark:bg-gray-600" />
        </div>
      </div>
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

function ProjectCard({ project, index }: { project: any; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = projectIconMap[project.slug] || <FolderGit2 className="w-5 h-5 text-blue-400" />;

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
            {project.stack.flatMap((s: any) => s.items).slice(0, 3).map((tech: string) => (
              <span 
                className="rounded-full bg-blue-500/5 border border-blue-500/10 px-2 py-0.5 text-[8.5px] font-semibold text-blue-300/80 backdrop-blur-sm" 
                key={tech}
              >
                {tech}
              </span>
            ))}
            {project.stack.flatMap((s: any) => s.items).length > 3 && (
              <span className="rounded-full bg-neutral-900 border border-neutral-800 px-2 py-0.5 text-[8.5px] font-semibold text-neutral-400">
                +{project.stack.flatMap((s: any) => s.items).length - 3} more
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default function Home() {
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
  const [lightningHue, setLightningHue] = useState(220); // Default to blue


  // Contact Form & Clipboard States
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      alert("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert(data.error || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText("cvarunkumar455@gmail.com");
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

      if (code) {
        setHasEntered(true);
        setAuthParams(window.location.search);
        setShowAuthModal(true);
      } else if (storedScrollY !== null || entered === "true" || hash === "#projects" || hash.length > 1) {
        setHasEntered(true);
      }
      setIsIntroReady(true);
    }
  }, []);

  useEffect(() => {
    if (hasEntered) {
      document.documentElement.style.setProperty("--hold-progress", "0");
      document.documentElement.style.setProperty("--sphere-opacity", "0");
      document.documentElement.style.setProperty("--lightning-opacity", "0");
      if (typeof window !== "undefined") {
        (window as any).holdProgress = 0;
        
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
          setIsScrollPositioning(false);
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

      {/* Global Starfield Backgrounds */}
      {isIntroReady && (
        !hasEntered ? (
          <DottedSurface />
        ) : (
          <SpaceBackground />
        )
      )}
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
        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 w-full">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 md:gap-16 items-center">

            {/* ── Text Side ── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col space-y-5 sm:space-y-6 order-2 md:order-1 text-center md:text-left"
            >
              {/* Specialization tag */}
              <div className="flex justify-center md:justify-start">
                <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-3 py-1 sm:px-4 sm:py-1.5 text-[11px] sm:text-xs font-semibold text-blue-300/80 backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse shadow-[0_0_6px_rgba(96,165,250,0.6)]" />
                  AI & Machine Learning Specialization
                </span>
              </div>

              {/* Name — floating with glow */}
              <h1
                className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1]"
                style={{
                  textShadow: '0 0 40px rgba(96, 165, 250, 0.15), 0 0 80px rgba(96, 165, 250, 0.05)',
                }}
              >
                Challa Varun{' '}
                <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-indigo-400 bg-clip-text text-transparent">
                  Kumar
                </span>
              </h1>

              {/* Tagline */}
              <h2 className="text-base sm:text-lg md:text-2xl font-medium text-gray-400 tracking-wide">
                Engineering the{' '}
                <span className="text-blue-400/90" style={{ textShadow: '0 0 12px rgba(96, 165, 250, 0.3)' }}>
                  AI-Driven
                </span>{' '}
                Future
              </h2>

              {/* Bio */}
              <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-lg mx-auto md:mx-0">
                Dedicated Computer Science student at Kalasalingam Academy of Research and Education.
                Skilled in developing complex full-stack web products with React & Next.js, implementing
                machine learning models, and configuring scalable DevOps pipelines.
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

            {/* ── Photo Side — Floating with neon ring ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex justify-center order-1 md:order-2"
            >
              <div className="relative">
                {/* Outer glow aura */}
                <div
                  className="absolute -inset-4 rounded-3xl opacity-30 blur-2xl pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle, rgba(96, 165, 250, 0.3) 0%, transparent 70%)',
                  }}
                />
                {/* Neon border wrapper (Portrait Rectangle aspect-[4/5]) */}
                <div className="relative w-[180px] sm:w-[220px] md:w-[280px] aspect-[4/5] rounded-3xl p-[2.5px] bg-gradient-to-br from-blue-500/40 via-blue-400/20 to-indigo-500/40 shadow-[0_0_30px_rgba(96,165,250,0.12)]">
                  <div className="w-full h-full rounded-[22px] overflow-hidden bg-gray-950">
                    <Image
                      alt="Varun Kumar"
                      className="w-full h-full object-cover"
                      height={700}
                      priority
                      src="/profile-varun.png"
                      width={560}
                    />
                  </div>
                </div>
                 {/* CSS Motion Path style for orbiting along the exact rounded rectangle border shape */}
                 <style>{`
                   @keyframes orbitRectTravel {
                     0% { offset-distance: 0%; }
                     100% { offset-distance: 100%; }
                   }
                 `}</style>
                 <div className="absolute -inset-[6px] rounded-[28px] pointer-events-none">
                   <div
                     style={{
                       position: 'absolute',
                       width: '10px',
                       height: '10px',
                       borderRadius: '50%',
                       backgroundColor: 'rgba(96, 165, 250, 0.95)',
                       boxShadow: '0 0 6px rgba(96, 165, 250, 0.6), 0 0 12px rgba(59, 130, 246, 0.3)',
                       offsetPath: 'border-box',
                       offsetAnchor: 'center',
                       animation: 'orbitRectTravel 10s linear infinite',
                     }}
                   />
                 </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ─── Education ─── */}
      <section className="border-t border-gray-200/40 dark:border-gray-800/40 mx-auto max-w-6xl px-5 py-24 sm:px-6 lg:px-8 relative z-10" id="education">
        <SectionHeading eyebrow="Education" title="Academic Background" icon={<GraduationCap size={16} />}>
          Academic records and core computer science studies.
        </SectionHeading>
        <EducationTimeline />
      </section>

      {/* ─── Skills ─── */}
      <section className="border-t border-gray-200/40 dark:border-gray-800/40 bg-transparent px-5 py-24 sm:px-6 lg:px-8 relative z-10" id="skills">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="Skills" title="Technical Toolkit" icon={<Wrench size={16} />}>
            Languages, frameworks, database managers, and DevOps tools in my stack.
          </SectionHeading>
          <SkillsBento />
        </div>
      </section>

      {/* ─── Projects ─── */}
      <section className="border-t border-gray-200/40 dark:border-gray-800/40 mx-auto max-w-6xl px-5 py-24 sm:px-6 lg:px-8 relative z-10" id="projects">
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
      <section className="border-t border-gray-200/40 dark:border-gray-800/40 bg-transparent px-5 py-24 sm:px-6 lg:px-8 relative z-10" id="experience">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="Experience" title="Work History" icon={<Briefcase size={16} />}>
            Professional contributions and developer roles in tech groups.
          </SectionHeading>
          <ExperienceBento />
        </div>
      </section>

      {/* ─── Contact ─── */}
      <section className="relative z-10 py-24 px-5 sm:px-6 lg:px-8 border-t border-gray-800/30 bg-transparent" id="contact">
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

            {/* Left Column: Contact Form */}
            <div className="space-y-6">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 rounded-2xl border border-green-500/20 bg-green-500/5 backdrop-blur-sm text-center space-y-4"
                >
                  <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-green-950/50 text-green-400 shadow-[0_0_20px_rgba(74,222,128,0.15)]">
                    <Check size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
                  <p className="text-sm text-gray-400 max-w-sm mx-auto">
                    Thank you for reaching out. I&apos;ll respond to your email shortly.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-2 text-xs font-semibold text-blue-400 hover:underline focus:outline-none cursor-pointer"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5 text-left">
                      <label htmlFor="contact-name" className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                        Name
                      </label>
                      <input
                        type="text"
                        id="contact-name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your name"
                        className="w-full px-4 py-3 rounded-xl border border-gray-800/60 bg-white/[0.03] text-sm text-white focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 focus:bg-white/[0.05] outline-none transition-all placeholder:text-gray-600"
                      />
                    </div>
                    <div className="space-y-1.5 text-left">
                      <label htmlFor="contact-email" className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="contact-email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your.email@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-gray-800/60 bg-white/[0.03] text-sm text-white focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 focus:bg-white/[0.05] outline-none transition-all placeholder:text-gray-600"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label htmlFor="contact-message" className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Type your message here..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-800/60 bg-white/[0.03] text-sm text-white focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 focus:bg-white/[0.05] outline-none transition-all placeholder:text-gray-600 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold text-sm hover:from-blue-600 hover:to-indigo-700 hover:shadow-[0_0_30px_rgba(96,165,250,0.25)] disabled:opacity-60 transition-all duration-300 cursor-pointer shadow-md active:scale-95"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
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
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=cvarunkumar455@gmail.com"
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
                      cvarunkumar455@gmail.com
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
                  { name: "LinkedIn", handle: "c-varun-kumar", href: "https://www.linkedin.com/in/c-varun-kumar-281b73361", Icon: Linkedin, color: "text-[#378fe9]", glow: "rgba(56, 143, 233, 0.15)" },
                  { name: "GitHub", handle: "varun-kumar-hub", href: "https://github.com", Icon: Github, color: "text-gray-300", glow: "rgba(255, 255, 255, 0.08)" },
                  { name: "Instagram", handle: "v_a_r_u_n_13_9", href: "https://www.instagram.com/v_a_r_u_n_13_9?igsh=Y3lnMDA2M3ZoZ2p0", Icon: Instagram, color: "text-[#f85c96]", glow: "rgba(248, 92, 150, 0.15)" },
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
                  <span>Anantapur, Andhra Pradesh, India</span>
                </div>
              </div>

              {/* View Resume */}
              <a
                href="/resume.pdf"
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
          <p>Copyright {new Date().getFullYear()} Challa Varun Kumar. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <a
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#24292e] text-white hover:scale-110 active:scale-95 transition-all shadow-md"
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0a66c2] text-white hover:scale-110 active:scale-95 transition-all shadow-md"
              href="https://www.linkedin.com/in/c-varun-kumar-281b73361"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#ea4335] text-white hover:scale-110 active:scale-95 transition-all shadow-md"
              href="https://mail.google.com/mail/?view=cm&fs=1&to=cvarunkumar455@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Email via Gmail"
            >
              <Mail size={20} />
            </a>

            <a
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e1306c] text-white hover:scale-110 active:scale-95 transition-all shadow-md"
              href="https://www.instagram.com/v_a_r_u_n_13_9?igsh=Y3lnMDA2M3ZoZ2p0"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
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
