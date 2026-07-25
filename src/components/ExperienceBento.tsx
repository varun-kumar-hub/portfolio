"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Shield,
  Zap,
  Cpu,
  Database,
  Cloud,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

export interface Milestone {
  id: string;
  number: string;
  category: string;
  title: string;
  subtitle: string;
  timeline: string;
  location?: string;
  description: string;
  responsibilities: string[];
  architecture: string[];
  metrics: { value: string; label: string }[];
  learnings: string[];
  skills: string[];
  link?: string;
  linkText?: string;
  visualType: "shield" | "speed" | "ai" | "data" | "cloud";
}

const milestones: Milestone[] = [
  {
    id: "owasp",
    number: "01",
    category: "Leadership & Web Security",
    title: "OWASP Student Chapter",
    subtitle: "Web Development Team Member & Technical Coordinator",
    timeline: "Aug 2024 - Present",
    location: "Krishnankoil, TN, India",
    description:
      "Architecting secure web infrastructure for OWASP Student Chapter. Leading technical workshops on OWASP Top 10 web vulnerabilities, implementing WCAG accessibility standards, and orchestrating logistics for campus-wide developer hackathons.",
    responsibilities: [
      "Engineered secure, responsive web applications and campus event management portals.",
      "Coordinated venue mapping, system diagnostics, and server readiness logistics for campus assessments.",
      "Mentored student developers on web security hygiene and clean UI code practices."
    ],
    architecture: [
      "Facilitated hands-on workshops explaining OWASP Top 10 web vulnerabilities (XSS, CSRF, SQLi).",
      "Enforced WCAG 2.1 AA accessibility standards across team repositories to eliminate design barriers.",
      "Formulated secure client-side form validation and defensive API request handling."
    ],
    metrics: [
      { value: "100%", label: "System & Exam Readiness" },
      { value: "OWASP 10", label: "Defensive Coding Standards" },
      { value: "WCAG", label: "Accessibility-First Design" },
    ],
    learnings: [
      "Accessibility-first UI & WCAG compliance standards",
      "OWASP Top 10 web vulnerability mitigation & defensive programming",
      "Venue mapping, system diagnostics & technical assessment logistics",
      "Campus developer mentorship & technical team coordination",
    ],
    skills: ["React", "Tailwind CSS", "Web Security", "OWASP Top 10", "Event Logistics"],
    link: "#projects",
    linkText: "View Featured Projects",
    visualType: "shield",
  },
  {
    id: "researchx",
    number: "02",
    category: "Autonomous AI Systems",
    title: "ResearchX AI Platform",
    subtitle: "Multi-Agent Autonomous Research & Verification Engine",
    timeline: "2025",
    description:
      "Engineered an 8-agent autonomous research swarm powered by Gemini 2.5 Flash. Executes parallel multi-provider web scraping, deduplicates claims, and cross-verifies facts across independent sources with 95%+ confidence ratings.",
    responsibilities: [
      "Designed an 8-agent autonomous swarm converting query intent into verified business intelligence reports.",
      "Implemented parallel search execution across Google (Serper), Tavily Search, and Wikipedia APIs.",
      "Built an interactive progress console with real-time multi-agent execution status tracking."
    ],
    architecture: [
      "Built an 8-agent state machine (Query Intent → Research Plan → Scrape → Deduplicate → Verify → Report).",
      "Implemented zero-knowledge client-side Gemini API key storage in local browser storage.",
      "Engineered consensus cross-verification assigning 0–100% empirical confidence scores to claims."
    ],
    metrics: [
      { value: "95%+", label: "Fact Verification Rate" },
      { value: "8 Agents", label: "Autonomous Swarm Pipeline" },
      { value: "10+ hrs", label: "Time Saved Per Project" },
    ],
    learnings: [
      "Multi-agent autonomous system design & state machine orchestration",
      "Parallel web scraping, deduplication & empirical claim verification",
      "Zero-knowledge client-side API key encryption & browser security",
      "High-throughput Gemini API streaming & structured JSON schema synthesis",
    ],
    skills: ["Next.js 16", "Gemini 2.5 Flash", "Serper API", "Tavily Search", "Supabase", "TypeScript"],
    link: "/projects/researchx-ai",
    linkText: "Explore ResearchX AI Case Study",
    visualType: "ai",
  },
  {
    id: "learnx",
    number: "03",
    category: "AI & EdTech Systems",
    title: "LearnX Knowledge Platform",
    subtitle: "Interactive Knowledge Graphs & Adaptive Study Engine",
    timeline: "2025",
    description:
      "Built an AI-orchestrated learning engine converting complex technical subjects into 2D force-directed knowledge graphs at 60 FPS. Synthesizes structured lesson paths, active-recall flashcards, and adaptive diagnostic quizzes.",
    responsibilities: [
      "Engineered force-directed 2D canvas graphs rendering complex concept hierarchies smoothly at 60 FPS.",
      "Synthesized AI lesson generators creating structured modules, flashcards, and diagnostic quizzes.",
      "Designed interactive concept nodes with real-time mastery tracking and progress persistence."
    ],
    architecture: [
      "Implemented Canvas2D node-link physics simulation with smooth zoom and pan controls.",
      "Structured Gemini API prompts for deterministic JSON concept node tree generation.",
      "Optimized React component re-renders during high-frequency graph drag-and-drop interactions."
    ],
    metrics: [
      { value: "60 FPS", label: "Graph Render Speed" },
      { value: "+30%", label: "Concept Retention Boost" },
      { value: "Adaptive", label: "Quiz Diagnostics Engine" },
    ],
    learnings: [
      "Interactive 2D canvas physics & high-performance graph visualization",
      "Prompt engineering for deterministic tree structures & JSON schema validation",
      "Active-recall flashcard algorithms & spaced-repetition data modeling",
      "Responsive state management for complex nested interactive UI components",
    ],
    skills: ["React", "Next.js 16", "Force Graph 2D", "Gemini API", "Tailwind CSS", "Vercel"],
    link: "/projects/learnx",
    linkText: "Explore LearnX Case Study",
    visualType: "speed",
  },
  {
    id: "resume-analyzer",
    number: "04",
    category: "NLP & Document Intelligence",
    title: "Resume Analyzer Engine",
    subtitle: "NLP Document Parsing & ATS Compatibility Optimizer",
    timeline: "2024 - 2025",
    description:
      "Architected an NLP document intelligence engine using Python & NLTK. Parses PDF/DOCX resumes, tokenizes skill entities, and calculates mathematical TF-IDF vector similarity to boost candidate ATS match scores by 25%.",
    responsibilities: [
      "Engineered NLTK text processing pipelines extracting skills, experience timelines, and qualifications.",
      "Built TF-IDF vector similarity comparison engines scoring candidate resumes against job descriptions.",
      "Designed clean desktop and web UI interfaces presenting actionable ATS optimization recommendations."
    ],
    architecture: [
      "Developed PyPDF2 and docx document extraction with regex sanitization.",
      "Implemented TF-IDF cosine similarity scoring to measure semantic keyword alignment.",
      "Built structured SQLite database schemas storing candidate history and evaluation benchmarks."
    ],
    metrics: [
      { value: "+25%", label: "Average ATS Match Gain" },
      { value: "98%", label: "NLP Skill Extraction Rate" },
      { value: "TF-IDF", label: "Cosine Vector Matcher" },
    ],
    learnings: [
      "Natural Language Processing (NLP), tokenization & entity extraction",
      "Mathematical vector space models (TF-IDF, Cosine Similarity)",
      "Document parsing algorithms for unstructured text in PDF/DOCX formats",
      "Designing actionable feedback dashboards for automated analysis tools",
    ],
    skills: ["Python", "NLTK", "PyPDF2", "TF-IDF", "Tkinter", "SQLite", "React"],
    link: "/projects/resume-analyzer",
    linkText: "Explore Resume Analyzer Case Study",
    visualType: "data",
  },
  {
    id: "tripcrafter-tools",
    number: "05",
    category: "Cloud Systems & Data Aggregation",
    title: "TripCrafter Pro & AI Tools",
    subtitle: "Full-Stack Cloud Architecture & Scraping Infrastructure",
    timeline: "2024 - Present",
    description:
      "Architected TripCrafter Pro (Gemini 2.5 Flash travel planner with interactive Google Maps waypoints & live weather) and automated Python scrapers indexing emerging AI tech tools into PostgreSQL with zero downtime.",
    responsibilities: [
      "Architected TripCrafter Pro with Gemini 2.5 Flash AI itinerary generation under 5 seconds.",
      "Built automated Python scrapers indexing emerging AI tech tools into structured PostgreSQL databases.",
      "Integrated Google Maps JavaScript API with custom marker clustering and route polyline rendering."
    ],
    architecture: [
      "Engineered serverless API routes with caching layers to keep response times under 100ms.",
      "Implemented BeautifulSoup & Selenium web scraping pipelines with proxy rotation.",
      "Configured Supabase PostgreSQL database tables with optimized indexes for fast search queries."
    ],
    metrics: [
      { value: "<5s", label: "Itinerary Synthesis Time" },
      { value: "<100ms", label: "API Query Latency" },
      { value: "100%", label: "Serverless Cloud Uptime" },
    ],
    learnings: [
      "Full-stack serverless architecture & edge caching strategies",
      "Robust web scraping pipelines with dynamic JavaScript rendering & error handling",
      "Interactive mapping APIs, custom marker rendering & geospatial visualization",
      "Relational database schema optimization & SQL index design for fast search",
    ],
    skills: ["TripCrafter Pro", "Google Maps API", "BeautifulSoup", "PostgreSQL", "Supabase", "Vercel"],
    link: "/projects/tripcrafter-pro",
    linkText: "Explore TripCrafter Pro Case Study",
    visualType: "cloud",
  },
];

/* ── 3D Apple-Style Glass Sculpture Component ── */
function GlassSculpture({ visualType }: { visualType: Milestone["visualType"] }) {
  return (
    <div className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-[26rem] lg:h-[26rem] flex items-center justify-center select-none shrink-0">
      {/* Background Soft Aura Ring */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-red-600/15 via-transparent to-red-500/10 blur-3xl pointer-events-none" />

      {/* Main 3D Orbit Base Ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 25, ease: "linear", repeat: Infinity }}
        className="absolute inset-2 sm:inset-4 rounded-full border border-white/10 [transform-style:preserve-3d] [transform:rotateX(65deg)_rotateY(-15deg)] shadow-[0_0_60px_rgba(239,68,68,0.2)] pointer-events-none"
      >
        <span className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-red-500/80 shadow-[0_0_18px_rgba(239,68,68,0.9)]" />
      </motion.div>

      {/* Inner Counter-Rotating Ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 18, ease: "linear", repeat: Infinity }}
        className="absolute inset-8 sm:inset-12 rounded-full border border-red-500/20 [transform-style:preserve-3d] [transform:rotateX(-55deg)_rotateY(25deg)] pointer-events-none"
      >
        <span className="absolute bottom-0 right-1/2 translate-x-1/2 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-rose-400 shadow-[0_0_12px_rgba(244,63,94,0.9)]" />
      </motion.div>

      {/* Central Glass Object Container */}
      <motion.div
        animate={{
          y: [-8, 8, -8],
          rotateY: [-10, 10, -10],
          rotateX: [4, -4, 4],
        }}
        transition={{
          duration: 6,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        className="relative z-10 w-32 h-32 sm:w-44 sm:h-44 lg:w-56 lg:h-56 rounded-3xl border border-white/15 bg-white/[0.03] backdrop-blur-2xl shadow-[0_25px_70px_rgba(0,0,0,0.85)] flex items-center justify-center group overflow-hidden"
      >
        {/* Glass Reflection Highlight Lines */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-transparent pointer-events-none" />
        <div className="absolute -top-12 -left-12 w-28 h-28 sm:w-36 sm:h-36 bg-red-500/20 rounded-full blur-xl pointer-events-none" />

        {/* Dynamic Icon Core Based on Visual Type */}
        <AnimatePresence mode="wait">
          <motion.div
            key={visualType}
            initial={{ opacity: 0, scale: 0.7, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.7, rotate: 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative z-20 flex items-center justify-center text-red-400"
          >
            {visualType === "shield" && (
              <div className="flex flex-col items-center gap-1.5 sm:gap-2.5">
                <Shield className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 stroke-[1.25] text-red-400 drop-shadow-[0_0_24px_rgba(239,68,68,0.6)]" />
                <span className="text-[10px] sm:text-xs font-mono text-neutral-400 tracking-widest uppercase font-semibold">SECURE CORE</span>
              </div>
            )}
            {visualType === "speed" && (
              <div className="flex flex-col items-center gap-1.5 sm:gap-2.5">
                <Zap className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 stroke-[1.25] text-red-400 drop-shadow-[0_0_24px_rgba(239,68,68,0.6)]" />
                <span className="text-[10px] sm:text-xs font-mono text-neutral-400 tracking-widest uppercase font-semibold">EDTECH AI</span>
              </div>
            )}
            {visualType === "ai" && (
              <div className="flex flex-col items-center gap-1.5 sm:gap-2.5">
                <Cpu className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 stroke-[1.25] text-purple-400 drop-shadow-[0_0_24px_rgba(168,85,247,0.6)]" />
                <span className="text-[10px] sm:text-xs font-mono text-neutral-400 tracking-widest uppercase font-semibold">RESEARCH AI</span>
              </div>
            )}
            {visualType === "data" && (
              <div className="flex flex-col items-center gap-1.5 sm:gap-2.5">
                <Database className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 stroke-[1.25] text-emerald-400 drop-shadow-[0_0_24px_rgba(16,185,129,0.6)]" />
                <span className="text-[10px] sm:text-xs font-mono text-neutral-400 tracking-widest uppercase font-semibold">NLP RESUME</span>
              </div>
            )}
            {visualType === "cloud" && (
              <div className="flex flex-col items-center gap-1.5 sm:gap-2.5">
                <Cloud className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 stroke-[1.25] text-amber-400 drop-shadow-[0_0_24px_rgba(245,158,11,0.6)]" />
                <span className="text-[10px] sm:text-xs font-mono text-neutral-400 tracking-widest uppercase font-semibold">CLOUD STACK</span>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Ambient Corner Accents */}
        <div className="absolute top-3 left-3 w-2.5 h-2.5 border-t border-l border-white/30" />
        <div className="absolute bottom-3 right-3 w-2.5 h-2.5 border-b border-r border-white/30" />
      </motion.div>
    </div>
  );
}

/* ── Motion Variants ── */
const cardVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    y: direction > 0 ? 28 : -28,
    filter: "blur(6px)",
  }),
  center: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
  exit: (direction: number) => ({
    opacity: 0,
    y: direction > 0 ? -28 : 28,
    filter: "blur(6px)",
  }),
};

type ScrollState = "IDLE_BEFORE" | "LOCKED" | "IDLE_AFTER";

export default function ExperienceBento() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [scrollState, setScrollState] = useState<ScrollState>("IDLE_BEFORE");

  const wrapperRef = useRef<HTMLDivElement>(null);
  const accumulatedDeltaRef = useRef<number>(0);
  const touchStartYRef = useRef<number>(0);
  const isAnimatingRef = useRef<boolean>(false);
  const activeIndexRef = useRef<number>(0);
  const scrollStateRef = useRef<ScrollState>("IDLE_BEFORE");
  const lastTriggerTimeRef = useRef<number>(0);
  const resetAccumulatorTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const total = milestones.length;

  // Sync refs for event handlers
  useEffect(() => {
    isAnimatingRef.current = isAnimating;
  }, [isAnimating]);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    scrollStateRef.current = scrollState;
  }, [scrollState]);

  /* ── Deep Linking & URL State Restoring ── */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const urlParams = new URLSearchParams(window.location.search);
    const expParam = urlParams.get("experience") || urlParams.get("item");
    if (expParam) {
      const parsed = parseInt(expParam, 10);
      if (!isNaN(parsed) && parsed >= 0 && parsed < total) {
        setActiveIndex(parsed);
      }
    } else {
      const hash = window.location.hash;
      if (hash.includes("item=")) {
        const hashVal = parseInt(hash.split("item=")[1], 10);
        if (!isNaN(hashVal) && hashVal >= 0 && hashVal < total) {
          setActiveIndex(hashVal);
        }
      }
    }
  }, [total]);

  const updateUrlState = useCallback((idx: number) => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    url.searchParams.set("experience", idx.toString());
    window.history.replaceState(null, "", url.toString());
  }, []);

  /* ── Smooth Center Scroll Alignment ── */
  const centerSectionInViewport = useCallback(() => {
    if (!wrapperRef.current || typeof window === "undefined") return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const targetTop = rect.top + scrollTop - (window.innerHeight - rect.height) / 2;
    window.scrollTo({ top: Math.max(0, targetTop), behavior: "smooth" });
  }, []);

  /* ── Step Transition Core Function ── */
  const goToIndex = useCallback((targetIndex: number, newDir?: number) => {
    if (targetIndex < 0 || targetIndex >= total) return;
    if (targetIndex === activeIndexRef.current) return;

    const calcDir = newDir ?? (targetIndex > activeIndexRef.current ? 1 : -1);
    setDirection(calcDir);
    setIsAnimating(true);
    isAnimatingRef.current = true;
    setActiveIndex(targetIndex);
    updateUrlState(targetIndex);

    // Lock buffer duration
    setTimeout(() => {
      setIsAnimating(false);
      isAnimatingRef.current = false;
    }, 450);
  }, [total, updateUrlState]);

  const handleNext = useCallback(() => {
    if (activeIndexRef.current < total - 1) {
      goToIndex(activeIndexRef.current + 1, 1);
    }
  }, [goToIndex, total]);

  const handlePrev = useCallback(() => {
    if (activeIndexRef.current > 0) {
      goToIndex(activeIndexRef.current - 1, -1);
    }
  }, [goToIndex]);

  /* ── Lock / Unlock Page Body Scroll Engine ── */
  const lockPageScroll = useCallback(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
  }, []);

  const unlockPageScroll = useCallback(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = "";
    document.body.style.touchAction = "";
  }, []);

  /* ── Intersection Observer (Finite State Machine Trigger - Narrative Entry Phase) ── */
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el || typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Require section to be fully in view (>= 75% ratio) before locking
          if (entry.isIntersecting && entry.intersectionRatio >= 0.75) {
            if (scrollStateRef.current !== "LOCKED") {
              const top = entry.boundingClientRect.top;
              if (top > 0) {
                setActiveIndex(0);
                activeIndexRef.current = 0;
              } else {
                setActiveIndex(total - 1);
                activeIndexRef.current = total - 1;
              }
              setScrollState("LOCKED");
              scrollStateRef.current = "LOCKED";
              lockPageScroll();
              centerSectionInViewport();
            }
          }
        });
      },
      { threshold: [0.75, 0.9] }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      unlockPageScroll();
    };
  }, [total, lockPageScroll, unlockPageScroll, centerSectionInViewport]);

  /* ── Global Wheel Event Engine (Active When LOCKED) ── */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleWheel = (e: WheelEvent) => {
      if (scrollStateRef.current !== "LOCKED") return;
      e.preventDefault();

      const now = Date.now();
      const COOLDOWN_MS = 450;

      if (now - lastTriggerTimeRef.current < COOLDOWN_MS || isAnimatingRef.current) return;

      accumulatedDeltaRef.current += e.deltaY;
      if (resetAccumulatorTimeoutRef.current) clearTimeout(resetAccumulatorTimeoutRef.current);
      resetAccumulatorTimeoutRef.current = setTimeout(() => { accumulatedDeltaRef.current = 0; }, 160);

      const THRESHOLD = 25;
      if (accumulatedDeltaRef.current > THRESHOLD) {
        accumulatedDeltaRef.current = 0;
        lastTriggerTimeRef.current = now;
        if (activeIndexRef.current < total - 1) {
          goToIndex(activeIndexRef.current + 1, 1);
        } else {
          setScrollState("IDLE_AFTER");
          scrollStateRef.current = "IDLE_AFTER";
          unlockPageScroll();
          window.scrollBy({ top: 350, behavior: "smooth" });
        }
      } else if (accumulatedDeltaRef.current < -THRESHOLD) {
        accumulatedDeltaRef.current = 0;
        lastTriggerTimeRef.current = now;
        if (activeIndexRef.current > 0) {
          goToIndex(activeIndexRef.current - 1, -1);
        } else {
          setScrollState("IDLE_BEFORE");
          scrollStateRef.current = "IDLE_BEFORE";
          unlockPageScroll();
          window.scrollBy({ top: -350, behavior: "smooth" });
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [total, goToIndex, unlockPageScroll]);

  /* ── Touch Vertical Swipe Engine ── */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleTouchStart = (e: TouchEvent) => { touchStartYRef.current = e.touches[0].clientY; };
    const handleTouchMove = (e: TouchEvent) => {
      if (scrollStateRef.current !== "LOCKED") return;
      if (e.cancelable) e.preventDefault();
      const diff = touchStartYRef.current - e.touches[0].clientY;
      const now = Date.now();
      if (now - lastTriggerTimeRef.current < 450 || isAnimatingRef.current) return;
      const SWIPE_THRESHOLD = 35;
      if (diff > SWIPE_THRESHOLD) {
        touchStartYRef.current = e.touches[0].clientY;
        lastTriggerTimeRef.current = now;
        if (activeIndexRef.current < total - 1) goToIndex(activeIndexRef.current + 1, 1);
        else { setScrollState("IDLE_AFTER"); scrollStateRef.current = "IDLE_AFTER"; unlockPageScroll(); window.scrollBy({ top: 300, behavior: "smooth" }); }
      } else if (diff < -SWIPE_THRESHOLD) {
        touchStartYRef.current = e.touches[0].clientY;
        lastTriggerTimeRef.current = now;
        if (activeIndexRef.current > 0) goToIndex(activeIndexRef.current - 1, -1);
        else { setScrollState("IDLE_BEFORE"); scrollStateRef.current = "IDLE_BEFORE"; unlockPageScroll(); window.scrollBy({ top: -300, behavior: "smooth" }); }
      }
    };
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    return () => { window.removeEventListener("touchstart", handleTouchStart); window.removeEventListener("touchmove", handleTouchMove); };
  }, [total, goToIndex, unlockPageScroll]);

  /* ── Keyboard Accessibility Engine ── */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (scrollStateRef.current !== "LOCKED" || isAnimatingRef.current) return;
      if (e.key === "ArrowDown" || e.key === "PageDown" || (e.key === " " && !e.shiftKey)) {
        e.preventDefault();
        if (activeIndexRef.current < total - 1) goToIndex(activeIndexRef.current + 1, 1);
        else { setScrollState("IDLE_AFTER"); scrollStateRef.current = "IDLE_AFTER"; unlockPageScroll(); window.scrollBy({ top: 350, behavior: "smooth" }); }
      } else if (e.key === "ArrowUp" || e.key === "PageUp" || (e.key === " " && e.shiftKey)) {
        e.preventDefault();
        if (activeIndexRef.current > 0) goToIndex(activeIndexRef.current - 1, -1);
        else { setScrollState("IDLE_BEFORE"); scrollStateRef.current = "IDLE_BEFORE"; unlockPageScroll(); window.scrollBy({ top: -350, behavior: "smooth" }); }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [total, goToIndex, unlockPageScroll]);

  const activeMilestone = milestones[activeIndex];

  return (
    <div ref={wrapperRef} className="sticky top-0 h-screen max-h-screen w-full overflow-hidden select-none flex flex-col justify-center items-center">
      <div className="w-full h-full [perspective:1200px] z-10 flex flex-col justify-center">
        <motion.div className="relative h-full max-h-screen w-full bg-[#040406] text-white flex flex-col justify-between py-6 sm:py-8 px-6 sm:px-12 lg:px-16 selection:bg-red-500/30 selection:text-white overflow-hidden rounded-3xl border border-white/10 hover:border-red-500/30 transition-colors duration-500 shadow-[0_30px_100px_rgba(0,0,0,0.9)] origin-center">
          {/* Ambient Radial Background Aura */}
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[450px] sm:h-[600px] bg-gradient-to-b from-red-600/10 via-rose-950/5 to-transparent rounded-full blur-[160px]" />
          </div>

          {/* ── MOBILE ONLY: Top Horizontal Milestone Selector ── */}
          <div className="lg:hidden relative z-20 w-full mb-6 pb-3 border-b border-white/10 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-red-400 font-bold">
                ✦ Engineering Journey ✦
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handlePrev}
                  disabled={activeIndex === 0}
                  className="p-2 rounded-lg border border-white/10 bg-white/5 text-neutral-300 active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono text-neutral-400 px-1.5">
                  {activeIndex + 1}/{total}
                </span>
                <button
                  onClick={handleNext}
                  disabled={activeIndex === total - 1}
                  className="p-2 rounded-lg border border-white/10 bg-white/5 text-neutral-300 active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scrollable Milestone Pills */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {milestones.map((milestone, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={milestone.id}
                    onClick={() => goToIndex(idx)}
                    className={cn(
                      "px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-mono font-bold whitespace-nowrap transition-all duration-300 shrink-0",
                      isActive
                        ? "bg-red-500/20 border border-red-500/50 text-red-300 shadow-[0_0_12px_rgba(239,68,68,0.3)]"
                        : "bg-white/[0.03] border border-white/10 text-neutral-400 hover:text-white"
                    )}
                  >
                    {milestone.number}. {milestone.title.split(" ")[0]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main 3-Column Storytelling Grid (Desktop & Tablet) */}
          <div className="relative z-10 max-w-[90rem] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center flex-1 py-4 sm:py-8">
            
            {/* ── LEFT COLUMN: Vertical Navigation Timeline (Desktop Only 3 Cols) ── */}
            <div className="hidden lg:flex lg:col-span-3 flex-col justify-center space-y-7 text-left border-r border-white/10 pr-10">
              <div className="space-y-1.5">
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-red-400/90 font-bold block">
                  ✦ Engineering Journey ✦
                </span>
                <p className="text-xs sm:text-sm text-neutral-400 font-light">
                  Scroll or click to explore tracks
                </p>
              </div>

              {/* Timeline Nodes */}
              <div className="relative space-y-5">
                <div className="absolute left-[17px] top-4 bottom-4 w-px bg-white/10" />

                {milestones.map((milestone, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={milestone.id}
                      onClick={() => goToIndex(idx)}
                      className={cn(
                        "group relative flex items-center gap-4.5 w-full text-left transition-all duration-500 py-2 focus:outline-none",
                        isActive ? "opacity-100" : "opacity-40 hover:opacity-80"
                      )}
                    >
                      <div className="relative z-10 flex h-9 w-9 items-center justify-center shrink-0">
                        <div
                          className={cn(
                            "h-4 w-4 rounded-full transition-all duration-500",
                            isActive
                              ? "bg-red-400 shadow-[0_0_20px_rgba(239,68,68,0.9)] scale-125"
                              : "bg-neutral-600 group-hover:bg-neutral-400"
                          )}
                        />
                        {isActive && (
                          <span className="absolute inset-0 rounded-full border border-red-500/60 animate-ping opacity-75" />
                        )}
                      </div>

                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs font-mono text-red-400/90 font-bold uppercase tracking-wider">
                          {milestone.number} • {milestone.category}
                        </span>
                        <span
                          className={cn(
                            "text-sm sm:text-base font-semibold tracking-tight transition-colors duration-300 line-clamp-1",
                            isActive ? "text-white font-extrabold" : "text-neutral-300"
                          )}
                        >
                          {milestone.title}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center gap-3.5 pt-4">
                <button
                  onClick={handlePrev}
                  disabled={activeIndex === 0}
                  aria-label="Previous Milestone"
                  className="p-2.5 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.08] hover:border-white/20 text-neutral-300 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronUp className="w-4.5 h-4.5" />
                </button>
                <button
                  onClick={handleNext}
                  disabled={activeIndex === total - 1}
                  aria-label="Next Milestone"
                  className="p-2.5 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.08] hover:border-white/20 text-neutral-300 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronDown className="w-4.5 h-4.5" />
                </button>
                <span className="text-xs font-mono text-neutral-400 font-semibold">
                  {activeIndex + 1} / {total}
                </span>
              </div>
            </div>

            {/* ── CENTER COLUMN: Cinematic Storytelling Area (5 Cols on Desktop) ── */}
            <div className="lg:col-span-5 flex flex-col justify-center text-left space-y-5 sm:space-y-7">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeMilestone.id}
                  custom={direction}
                  variants={cardVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  onAnimationComplete={() => {
                    setIsAnimating(false);
                    isAnimatingRef.current = false;
                  }}
                  className="space-y-5 sm:space-y-7"
                >
                  {/* Header Meta */}
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-3.5">
                      <span className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-mono text-red-500/90 tracking-tighter">
                        {activeMilestone.number}
                      </span>
                      <div className="h-8 sm:h-10 w-px bg-white/10" />
                      <div>
                        <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-red-400 font-bold block">
                          {activeMilestone.category}
                        </span>
                        <span className="text-xs sm:text-sm text-neutral-400 font-mono">
                          {activeMilestone.timeline}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight pt-1">
                      {activeMilestone.title}
                    </h3>
                    <p className="text-sm sm:text-base lg:text-lg font-semibold text-neutral-300 tracking-wide">
                      {activeMilestone.subtitle}
                    </p>
                  </div>

                  {/* Mobile Embedded Visual Sculpture Accent */}
                  <div className="lg:hidden flex justify-center py-2">
                    <GlassSculpture visualType={activeMilestone.visualType} />
                  </div>

                  {/* Brief Concise Story Description */}
                  <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed max-w-2xl">
                    {activeMilestone.description}
                  </p>

                  {/* Minimalist Qualitative Metrics */}
                  <div className="grid grid-cols-3 gap-3 sm:gap-6 border-y border-white/10 py-4 sm:py-6 my-2">
                    {activeMilestone.metrics.map((metric, mIdx) => (
                      <div key={mIdx} className="space-y-1 text-left">
                        <span className="block text-xl sm:text-3xl lg:text-4xl font-extrabold font-mono text-white tracking-tight">
                          {metric.value}
                        </span>
                        <span className="block text-xs sm:text-sm text-neutral-400 font-medium leading-snug">
                          {metric.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Skill Badges & Direct Case Study Link Trigger */}
                  <div className="space-y-3.5 pt-1">
                    <div className="flex flex-wrap gap-2">
                      {activeMilestone.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full bg-white/[0.04] border border-white/10 px-3 sm:px-3.5 py-1 text-xs sm:text-sm font-mono text-neutral-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {activeMilestone.link && (
                      <div className="pt-2">
                        <Link
                          href={activeMilestone.link}
                          className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/25 text-red-300 hover:text-white text-xs sm:text-sm font-bold font-mono transition-all duration-300 shadow-[0_0_24px_rgba(239,68,68,0.18)] group"
                        >
                          <span>{activeMilestone.linkText || "Explore Project Case Study"}</span>
                          <ArrowUpRight className="w-4 h-4 text-red-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ── RIGHT COLUMN: Minimal 3D Glass Sculpture (Desktop Only 4 Cols) ── */}
            <div className="hidden lg:flex lg:col-span-4 items-center justify-center">
              <GlassSculpture visualType={activeMilestone.visualType} />
            </div>

          </div>

          {/* ── BOTTOM QUOTE: Full-Width Glass Strip ── */}
          <div className="relative z-10 max-w-[90rem] mx-auto w-full pt-4 sm:pt-6">
            <div className="w-full rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md px-6 sm:px-8 py-4 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-3.5 text-center sm:text-left">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-red-400 shrink-0" />
                <p className="text-sm sm:text-base text-neutral-300 font-light tracking-wide italic">
                  &ldquo;Every experience became a lesson. Every lesson became better engineering.&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400 shrink-0">
                <span>VARUN KUMAR</span>
                <span>•</span>
                <span className="text-red-400 font-semibold">AI &amp; FULL-STACK</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
