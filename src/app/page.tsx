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
} from "lucide-react";
import { Github, Linkedin, Twitter, Instagram } from "@/components/icons/BrandIcons";
import { DottedSurface } from "@/components/ui/dotted-surface";
import SkillsBento from "@/components/SkillsBento";
import EducationTimeline from "@/components/EducationTimeline";
import ExperienceBento from "@/components/ExperienceBento";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { PortfolioIntro } from "@/components/ui/portfolio-intro";
import { Navbar } from "@/components/ui/mini-navbar";
import { Lightning, ElasticHueSlider } from "@/components/ui/hero-odyssey";

import ProjectDetailModal from "@/components/ui/project-detail-modal";
import CustomCursor from "@/components/ui/custom-cursor";

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

const projects = [
  {
    name: "LearnX",
    description:
      "An AI-driven educational platform using the Google Gemini API that served 200+ users, improving concept retention by 30% through automated visual knowledge graphs.",
    longDescription:
      "LearnX is an interactive, AI-powered learning environment engineered to help students grasp complex subjects faster. By parsing dynamic course materials with the Google Gemini API, the platform builds responsive, visual knowledge graphs that reveal connections between concepts. The application includes a dashboard with gamified learning streaks, dynamic quiz generation, and collaborative card decks for seamless peer study.",
    details: [
      "Generated dynamic quizzes with instant feedback and performance tracking.",
      "Engineered interactive dashboards tracking progress, daily activity, and learning streaks.",
      "Supported community sharing, allowing users to publish and clone learning content.",
    ],
    stack: [
      { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"] },
      { category: "AI & APIs", items: ["Google Gemini API"] },
      { category: "Backend & DevOps", items: ["Node.js", "Lucide React", "Vercel"] }
    ],
    github: "https://github.com/dinesh6473/WONDERS-OF-AI-3.0.git",
    live: "https://wonders-of-ai-3-0.vercel.app/dashboard",
  },
  {
    name: "Resume Analyzer",
    description:
      "A resume parsing tool using Python and NLP that identifies key skill gaps, helping users improve their ATS match rate by an average of 25%.",
    longDescription:
      "Resume Analyzer is a high-performance NLP application designed to streamline the job application process. Built with Python and NLTK, it parses complex PDF and Word resumes to extract structured skill representations. The system uses a specialized ATS optimization algorithm to cross-reference resume files against job listings, highlighting missing keywords, advising on word choice, and generating structural suggestions.",
    details: [
      "Integrated Natural Language Toolkit (NLTK) to extract and categorize skills, education, and experience from PDF/DOCX files.",
      "Engineered keyword-matching algorithm comparing candidate profiles against job requirements for automated optimization suggestions.",
    ],
    stack: [
      { category: "Core Development", items: ["Python", "Pandas", "Tkinter"] },
      { category: "NLP & AI", items: ["NLP", "NLTK", "PyPDF2", "Regex"] },
      { category: "Database", items: ["SQLite"] }
    ],
    github: "https://github.com/varun-kumar-hub",
    live: "https://resume-a.vercel.app/",
  },
  {
    name: "ResearchX AI",
    description:
      "A Multi-Agent Research & Verification Platform that transforms scattered web information into structured, verified, and evidence-backed research.",
    longDescription:
      "ResearchX AI is a Multi-Agent Research & Verification Platform designed for autonomous research. It understands query intent, runs parallel multi-source searches, extracts and deduplicates data, cross-verifies facts, and generates comprehensive research reports with confidence scores. Features an interactive dashboard, personal API key management, and conversational follow-ups.",
    details: [
      "Engineered an autonomous multi-agent pipeline: Query Understanding, Research Planner, Discovery, Extraction, Deduplication, Verification, Report Generation, and AI Analyst.",
      "Implemented parallel search across Google (Serper), Tavily, Wikipedia, LinkedIn, official directories with browser-only API key storage and auto-fallback.",
      "Built validation mechanisms that cross-verify records, detect conflicts, resolve duplicate entities, and assign confidence scores.",
    ],
    stack: [
      { category: "Frontend", items: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Framer Motion"] },
      { category: "Backend & AI", items: ["Next.js API Routes", "Google Gemini 2.5 Flash", "Serper API", "Tavily Search"] },
      { category: "Database", items: ["Supabase PostgreSQL"] }
    ],
    github: "https://github.com/varun-kumar-hub/research-agent.git",
    live: "https://research-agent-one-ruddy.vercel.app/",
  },
  {
    name: "TripCrafter Pro",
    description:
      "An AI-powered travel planning app using Google Gemini to generate personalized day-by-day itineraries with interactive maps, expense tracking, and a built-in AI concierge.",
    longDescription:
      "TripCrafter Pro is an intelligent trip planning application that uses Google's Gemini AI to generate personalized, day-by-day travel itineraries in seconds. Users enter their destination, travel dates, budget, and interests — and the AI crafts a detailed plan complete with activities, timings, cost estimates, insider tips, and geo-coordinates. Features include an interactive Google Maps view with markers and directions, drag-and-drop activity reordering, a real-time AI Travel Concierge chat, photo memories upload, visual expense tracking with pie charts, trip pacing analysis, live weather forecasts, and calendar export.",
    details: [
      "Integrated Google Gemini 2.5 Flash to generate tailored multi-day itineraries based on budget, interests (Food, Adventure, History, etc.), and travel dates.",
      "Built interactive trip view with expandable day-by-day timeline, Google Maps with markers/directions, and drag-and-drop activity reordering.",
      "Engineered AI Travel Concierge chat assistant for real-time trip Q&A, local customs, and hidden gems discovery.",
      "Implemented expense tracking with visual pie charts, trip pacing score analysis, live weather forecasts, and .ics calendar export.",
    ],
    stack: [
      { category: "Frontend", items: ["React", "TypeScript", "Vite", "Tailwind CSS", "shadcn/ui", "Framer Motion"] },
      { category: "AI & APIs", items: ["Google Gemini AI", "Google Maps API", "Open-Meteo Weather API"] },
      { category: "Backend & Auth", items: ["Supabase Auth", "Supabase PostgreSQL", "Supabase Storage"] },
      { category: "Mobile & Deploy", items: ["Capacitor", "Recharts", "Vercel"] },
    ],
    github: "https://github.com/varun-kumar-hub/trip-crafter-pro-56.git",
    live: "https://trip-crafter-pro-56.vercel.app/",
  },
  {
    name: "AI Tools Tracker",
    description:
      "Automated web scraping and data collection engine gathering data from major tech channels to reduce manual research by 10+ hours weekly.",
    longDescription:
      "AI Tools Tracker is a data-aggregation dashboard designed to monitor the fast-moving landscape of artificial intelligence software. It utilizes an automated scraping engine built on BeautifulSoup daily. A PostgreSQL database stores cataloged features, pricing tiers, and tags, enabling a highly-responsive comparisons system.",
    details: [
      "Aggregated features and classifications in structured formats using PostgreSQL.",
      "Built a comparison engine that allows users to explore and filter 500+ AI resources based on specific use cases.",
    ],
    stack: [
      { category: "Database & APIs", items: ["PostgreSQL", "SQLAlchemy", "Requests"] },
      { category: "Scraping Engine", items: ["Python", "Web Scraping", "BeautifulSoup"] },
      { category: "DevOps & Data", items: ["Cron Jobs", "Pandas"] }
    ],
    github: "https://github.com/varun-kumar-hub/AI-Tools.git",
    live: "https://ai-tools-two-swart.vercel.app/",
  },
  {
    name: "Smart Irrigation System",
    description:
      "An AI-driven smart irrigation system integrating soil moisture sensors with Firebase, enabling real-time monitoring and reducing water wastage by ~40%.",
    longDescription:
      "The Smart Irrigation System is a production-grade IoT solution that automates agricultural water management. The system interfaces physical moisture, temperature, and rainfall sensors with a central microprocessor, feeding telemetry data to a Firebase Realtime Database. By evaluating real-time local conditions alongside weather forecast APIs, its decision-making algorithm optimizes irrigation cycles, preventing overwatering.",
    details: [
      "Automated motor control based on sensor data, eliminating manual intervention.",
      "Designed data-driven decision logic to dynamically adjust irrigation schedules based on environmental conditions.",
      "Serves as the basis for a filed patent application with the Government for AI-based decision making.",
    ],
    stack: [
      { category: "IoT & Hardware", items: ["IoT", "Arduino C++", "ESP8266 Wi-Fi", "Soil Moisture Sensors", "Relay Modules"] },
      { category: "Cloud & Database", items: ["Firebase Realtime DB"] },
      { category: "System Architecture", items: ["Embedded Systems"] }
    ],
    github: "https://github.com/varun-kumar-hub",
    live: "#",
  },
];

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

export default function Home() {
  const [hasEntered, setHasEntered] = useState(false);
  const [lightningHue, setLightningHue] = useState(220); // Default to blue
  const [selectedProject, setSelectedProject] = useState<any>(null);


  // Contact Form & Clipboard States
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
    if (hasEntered) {
      document.documentElement.style.setProperty("--hold-progress", "0");
      document.documentElement.style.setProperty("--sphere-opacity", "0");
      document.documentElement.style.setProperty("--lightning-opacity", "0");
      if (typeof window !== "undefined") {
        (window as any).holdProgress = 0;
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

      {/* Global WebGL animated particle background */}
      <DottedSurface />

      {/* Root-mounted continuous Odyssey backgrounds */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_80%,transparent_100%)] opacity-40" />

        {/* Dynamic Glow Center Backdrop */}
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] md:w-[1000px] h-[700px] md:h-[1000px] rounded-full blur-[100px] transition-all duration-300 pointer-events-none"
          style={{
            opacity: "var(--sphere-opacity, 0.25)",
            background: `radial-gradient(circle, hsla(${lightningHue}, 75%, 55%, 0.15) 0%, hsla(${lightningHue}, 60%, 45%, 0.05) 50%, transparent 100%)`,
          }}
        />

        {/* Central WebGL Lightning Canvas */}
        <div
          className="absolute top-0 w-full left-1/2 transform -translate-x-1/2 h-full pointer-events-none transition-opacity duration-300"
          style={{ opacity: "var(--lightning-opacity, 0.85)" }}
        >
          {/* Main central bolt */}
          <Lightning hue={lightningHue} xOffset={0} speed={1.0} intensity={0.75} size={1.8} />
          
          {/* Secondary left bolt */}
          <div className="absolute inset-0 opacity-40">
            <Lightning hue={lightningHue} xOffset={-0.5} speed={0.65} intensity={0.5} size={1.4} />
          </div>
          
          {/* Secondary right bolt */}
          <div className="absolute inset-0 opacity-40">
            <Lightning hue={lightningHue} xOffset={0.5} speed={0.8} intensity={0.5} size={1.4} />
          </div>
        </div>

        {/* Planet/Sphere Core */}
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.4)] pointer-events-none transition-all duration-500"
          style={{
            transform: "translate(-50%, -50%) scale(calc(1 + var(--hold-progress, 0) * 0.12))",
            opacity: "var(--sphere-opacity, 0.25)",
            background: `radial-gradient(circle at 35% 25%, hsl(${lightningHue}, 40%, 15%) 0%, #050508ee 60%, #000000 100%)`,
          }}
        />
      </div>

      <AnimatePresence mode="wait">
        {!hasEntered ? (
          <PortfolioIntro
            key="intro"
            onEnter={() => setHasEntered(true)}
            onProgressChange={() => {}}
          />
        ) : (
          <main id="top" key="portfolio" className="relative min-h-screen overflow-hidden bg-transparent text-gray-900 dark:text-gray-100 transition-colors duration-500">

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
                  className="absolute -inset-4 rounded-full opacity-30 blur-2xl pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle, rgba(96, 165, 250, 0.3) 0%, transparent 70%)',
                  }}
                />
                {/* Neon ring border */}
                <div className="relative w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] md:w-[280px] md:h-[280px] rounded-full p-[2px] bg-gradient-to-br from-blue-500/40 via-blue-400/20 to-indigo-500/40 shadow-[0_0_30px_rgba(96,165,250,0.12)]">
                  <div className="w-full h-full rounded-full overflow-hidden bg-gray-950">
                    <Image
                      alt="Varun Kumar"
                      className="w-full h-full object-cover"
                      height={560}
                      priority
                      src="/profile-varun.png"
                      width={560}
                    />
                  </div>
                </div>
                {/* Orbiting accent dot */}
                <div className="absolute -inset-3 rounded-full animate-[spin_12s_linear_infinite] pointer-events-none">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.8)]" />
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
        <div className="w-full flex justify-center items-center">
          <style>{`
            .projects-swiper {
              width: 100%;
              padding-top: 10px;
              padding-bottom: 50px;
            }
            .projects-swiper .swiper-slide {
              background-position: center;
              background-size: cover;
              width: 300px;
              height: auto;
              opacity: 0.3;
              transition: opacity 0.3s ease, transform 0.3s ease;
            }
            .projects-swiper .swiper-slide-active {
              opacity: 1;
            }
            @media (min-width: 640px) {
              .projects-swiper .swiper-slide {
                width: 440px;
              }
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
              spaceBetween={30}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
              }}
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              loop={true}
              slidesPerView={"auto"}
              coverflowEffect={{
                rotate: 10,
                stretch: 0,
                depth: 100,
                modifier: 1.8,
                slideShadows: false,
              }}
              pagination={{ clickable: true }}
              navigation={true}
              modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
            >
              {projects.map((project, index) => (
                <SwiperSlide key={project.name}>
                  <article
                    className="overflow-hidden rounded-2xl border border-gray-200/50 bg-white/70 shadow-md backdrop-blur-md dark:border-gray-800/40 dark:bg-gray-900/30 flex flex-col justify-between h-full select-none text-left"
                  >
                    <div>
                      <ProjectVisual index={index} />
                      <div className="p-5 sm:p-6">
                        <h3 className="text-lg font-bold text-gray-950 dark:text-white">{project.name}</h3>
                        <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
                          {project.description}
                        </p>
                        
                        {/* Specific bullets for projects from resume */}
                        <ul className="mt-3 space-y-1.5 list-disc pl-4 text-xs text-gray-500 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-gray-800 pt-3">
                          {project.details.map((detail, dIdx) => (
                            <li key={dIdx}>{detail}</li>
                          ))}
                        </ul>

                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {project.stack.flatMap(s => s.items).map((tech) => (
                            <span className="rounded bg-gray-100 dark:bg-gray-800 px-2 py-0.5 text-[10px] font-medium text-gray-600 dark:text-gray-400" key={tech}>
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-5 sm:p-6 pt-0">
                      <button
                        className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg bg-[var(--accent)] px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-[var(--accent-hover)] hover:shadow-[0_0_15px_var(--accent-glow)] cursor-pointer"
                        onClick={() => setSelectedProject(project)}
                      >
                        View Details
                        <ArrowUpRight aria-hidden="true" size={15} />
                      </button>
                    </div>
                  </article>
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
            <a
              className="ml-2 inline-flex items-center gap-1.5 rounded-md border border-gray-200 px-3.5 py-2 font-semibold text-gray-700 transition hover:border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:bg-gray-800 text-sm"
              href="#top"
            >
              Back to Top
              <MoveUp aria-hidden="true" size={15} />
            </a>
          </div>
        </div>
      </footer>
        </main>
      )}
    </AnimatePresence>

    <AnimatePresence>
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </AnimatePresence>
    </>
  );
}
