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
      "8-agent pipeline design (Intent → Search → Scrape → Merge → Verify)",
      "Resilient API rate-limit fallbacks across Gemini 2.5 Flash, Tavily & Serper",
      "Zero-knowledge client-side Gemini API key storage in local browser",
      "Supabase PostgreSQL schema architecture for verified research reports",
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
      "Built a unified learning platform that converts multi-topic curricula into structured learning paths.",
      "Developed an adaptive revision flashcard system and difficulty-tiered self-grading quiz generator.",
      "Created a public Community Hub allowing learners to share, star, and clone custom study graphs."
    ],
    architecture: [
      "Integrated 2D force-directed graph physics engine (Force Graph 2D) rendering concept maps at 60 FPS.",
      "Ingested subject themes into Gemini 2.5 Flash to synthesize detailed chapter lessons and comparative matrices.",
      "Designed Supabase PostgreSQL relational schemas tracking student study accuracy and weak spots."
    ],
    metrics: [
      { value: "60 FPS", label: "Graph Render Speed" },
      { value: "+30%", label: "Concept Retention Boost" },
      { value: "Adaptive", label: "Quiz Diagnostics Engine" },
    ],
    learnings: [
      "Force-directed 2D graph engine rendering concept maps at 60fps",
      "In-context AI conversational tutor providing real-time doubt resolution",
      "Adaptive quiz engine with difficulty tiers & conceptual weakness radar",
      "Community hub allowing learners to publish, clone & share study paths",
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
      "Engineered a Python NLP document parsing engine extracting candidate skills, work history, and education.",
      "Developed an ATS compatibility diagnostic score report evaluating keyword density and formatting.",
      "Built an application Kanban board tracking job applications across Applied, Interviewing, and Offer stages."
    ],
    architecture: [
      "Built PyPDF2 text extraction and NLTK tokenization, stop-word filtering, and lemmatization pipeline.",
      "Calculated mathematical TF-IDF cosine similarity between resume vectors and job listing requirements.",
      "Synthesized generative AI bullet point rewrites and tailored cover letters aligning applicant achievements."
    ],
    metrics: [
      { value: "+25%", label: "Average ATS Match Gain" },
      { value: "98%", label: "NLP Skill Extraction Rate" },
      { value: "TF-IDF", label: "Cosine Vector Matcher" },
    ],
    learnings: [
      "PyPDF2 text extraction & NLTK part-of-speech tokenization pipeline",
      "Mathematical TF-IDF cosine similarity for candidate-job vector matching",
      "Generative AI bullet point rewrites & cover letter synthesis",
      "Job application Kanban tracker categorizing application stages",
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
      "Built TripCrafter Pro, synthesizing day-by-day itineraries complete with GPS waypoints and weather forecasts.",
      "Created AI Tools Tracker, an automated web scraping pipeline cataloging tech tools into a searchable database.",
      "Implemented real-time expense tracking with budget pie charts and one-click .ics calendar export."
    ],
    architecture: [
      "Integrated Google Maps API with interactive route markers, distance calculations, and drag-and-drop ordering.",
      "Built BeautifulSoup Python web scrapers with PostgreSQL indexing and automated deduplication.",
      "Configured Supabase Auth, Row Level Security (RLS) policies, and serverless Vercel edge API routes."
    ],
    metrics: [
      { value: "<5s", label: "Itinerary Synthesis Time" },
      { value: "<100ms", label: "API Query Latency" },
      { value: "100%", label: "Serverless Cloud Uptime" },
    ],
    learnings: [
      "Interactive Google Maps route waypoint pinning & drag-and-drop ordering",
      "Automated Python BeautifulSoup scrapers with PostgreSQL indexing",
      "Supabase Auth, PostgreSQL relational schema modeling & RLS security",
      "Serverless API route optimization and Vercel cloud deployment",
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
    <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 flex items-center justify-center select-none shrink-0">
      {/* Background Soft Aura Ring */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-red-600/15 via-transparent to-red-500/10 blur-3xl pointer-events-none" />

      {/* Main 3D Orbit Base Ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 25, ease: "linear", repeat: Infinity }}
        className="absolute inset-2 sm:inset-4 rounded-full border border-white/10 [transform-style:preserve-3d] [transform:rotateX(65deg)_rotateY(-15deg)] shadow-[0_0_50px_rgba(239,68,68,0.15)] pointer-events-none"
      >
        <span className="absolute top-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80 shadow-[0_0_15px_rgba(239,68,68,0.9)]" />
      </motion.div>

      {/* Inner Counter-Rotating Ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 18, ease: "linear", repeat: Infinity }}
        className="absolute inset-8 sm:inset-12 rounded-full border border-red-500/20 [transform-style:preserve-3d] [transform:rotateX(-55deg)_rotateY(25deg)] pointer-events-none"
      >
        <span className="absolute bottom-0 right-1/2 translate-x-1/2 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-rose-400 shadow-[0_0_10px_rgba(244,63,94,0.9)]" />
      </motion.div>

      {/* Central Glass Object Container */}
      <motion.div
        animate={{
          y: [-6, 6, -6],
          rotateY: [-10, 10, -10],
          rotateX: [4, -4, 4],
        }}
        transition={{
          duration: 6,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        className="relative z-10 w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44 rounded-2xl sm:rounded-3xl border border-white/15 bg-white/[0.03] backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex items-center justify-center group overflow-hidden"
      >
        {/* Glass Reflection Highlight Lines */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-transparent pointer-events-none" />
        <div className="absolute -top-12 -left-12 w-24 h-24 sm:w-28 sm:h-28 bg-red-500/20 rounded-full blur-xl pointer-events-none" />

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
              <div className="flex flex-col items-center gap-1 sm:gap-2">
                <Shield className="w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 stroke-[1.25] text-red-400 drop-shadow-[0_0_20px_rgba(239,68,68,0.5)]" />
                <span className="text-[9px] sm:text-[10px] font-mono text-neutral-400 tracking-widest uppercase font-semibold">SECURE CORE</span>
              </div>
            )}
            {visualType === "speed" && (
              <div className="flex flex-col items-center gap-1 sm:gap-2">
                <Zap className="w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 stroke-[1.25] text-red-400 drop-shadow-[0_0_20px_rgba(239,68,68,0.5)]" />
                <span className="text-[9px] sm:text-[10px] font-mono text-neutral-400 tracking-widest uppercase font-semibold">EDTECH AI</span>
              </div>
            )}
            {visualType === "ai" && (
              <div className="flex flex-col items-center gap-1 sm:gap-2">
                <Cpu className="w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 stroke-[1.25] text-purple-400 drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]" />
                <span className="text-[9px] sm:text-[10px] font-mono text-neutral-400 tracking-widest uppercase font-semibold">RESEARCH AI</span>
              </div>
            )}
            {visualType === "data" && (
              <div className="flex flex-col items-center gap-1 sm:gap-2">
                <Database className="w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 stroke-[1.25] text-emerald-400 drop-shadow-[0_0_20px_rgba(16,185,129,0.5)]" />
                <span className="text-[9px] sm:text-[10px] font-mono text-neutral-400 tracking-widest uppercase font-semibold">NLP RESUME</span>
              </div>
            )}
            {visualType === "cloud" && (
              <div className="flex flex-col items-center gap-1 sm:gap-2">
                <Cloud className="w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 stroke-[1.25] text-amber-400 drop-shadow-[0_0_20px_rgba(245,158,11,0.5)]" />
                <span className="text-[9px] sm:text-[10px] font-mono text-neutral-400 tracking-widest uppercase font-semibold">CLOUD STACK</span>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Ambient Corner Accents */}
        <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/30" />
        <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-white/30" />
      </motion.div>
    </div>
  );
}

export default function ExperienceBento() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeMilestone = milestones[activeIndex];

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev < milestones.length - 1 ? prev + 1 : 0));
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : milestones.length - 1));
  }, []);

  // Keyboard Navigation (Up/Down Arrows)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        handlePrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-[85vh] lg:min-h-screen w-full bg-[#040406] text-white flex flex-col justify-between py-6 sm:py-8 px-4 sm:px-8 lg:px-12 selection:bg-red-500/30 selection:text-white overflow-hidden"
    >
      {/* Ambient Radial Background Aura */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[400px] sm:h-[500px] bg-gradient-to-b from-red-600/10 via-rose-950/5 to-transparent rounded-full blur-[140px]" />
      </div>

      {/* ── MOBILE ONLY: Top Horizontal Milestone Selector ── */}
      <div className="lg:hidden relative z-20 w-full mb-6 pb-3 border-b border-white/10 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-red-400 font-bold">
            ✦ Engineering Journey ✦
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrev}
              className="p-1.5 rounded-lg border border-white/10 bg-white/5 text-neutral-300 active:scale-95 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-[11px] font-mono text-neutral-400 px-1">
              {activeIndex + 1}/{milestones.length}
            </span>
            <button
              onClick={handleNext}
              className="p-1.5 rounded-lg border border-white/10 bg-white/5 text-neutral-300 active:scale-95 transition-all"
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
                onClick={() => setActiveIndex(idx)}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all duration-300 shrink-0",
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
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center flex-1 py-2 sm:py-6">
        
        {/* ── LEFT COLUMN: Vertical Navigation Timeline (Desktop Only 3 Cols) ── */}
        <div className="hidden lg:flex lg:col-span-3 flex-col justify-center space-y-6 text-left border-r border-white/10 pr-8">
          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-red-400/90 font-bold block">
              ✦ Engineering Journey ✦
            </span>
            <p className="text-xs text-neutral-400 font-light">
              Select an engineering track to explore
            </p>
          </div>

          {/* Timeline Nodes */}
          <div className="relative space-y-4">
            <div className="absolute left-[15px] top-4 bottom-4 w-px bg-white/10" />

            {milestones.map((milestone, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={milestone.id}
                  onClick={() => setActiveIndex(idx)}
                  className={cn(
                    "group relative flex items-center gap-4 w-full text-left transition-all duration-500 py-1.5 focus:outline-none",
                    isActive ? "opacity-100" : "opacity-40 hover:opacity-80"
                  )}
                >
                  <div className="relative z-10 flex h-8 w-8 items-center justify-center shrink-0">
                    <div
                      className={cn(
                        "h-3.5 w-3.5 rounded-full transition-all duration-500",
                        isActive
                          ? "bg-red-400 shadow-[0_0_16px_rgba(239,68,68,0.9)] scale-125"
                          : "bg-neutral-600 group-hover:bg-neutral-400"
                      )}
                    />
                    {isActive && (
                      <span className="absolute inset-0 rounded-full border border-red-500/60 animate-ping opacity-75" />
                    )}
                  </div>

                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-red-400/90 font-bold uppercase tracking-wider">
                      {milestone.number} • {milestone.category}
                    </span>
                    <span
                      className={cn(
                        "text-sm font-semibold tracking-tight transition-colors duration-300 line-clamp-1",
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
          <div className="flex items-center gap-3 pt-4">
            <button
              onClick={handlePrev}
              aria-label="Previous Milestone"
              className="p-2 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.08] hover:border-white/20 text-neutral-300 transition-all"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next Milestone"
              className="p-2 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.08] hover:border-white/20 text-neutral-300 transition-all"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
            <span className="text-[11px] font-mono text-neutral-500">
              {activeIndex + 1} / {milestones.length}
            </span>
          </div>
        </div>

        {/* ── CENTER COLUMN: Cinematic Storytelling Area (5 Cols on Desktop) ── */}
        <div className="lg:col-span-5 flex flex-col justify-center text-left space-y-4 sm:space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMilestone.id}
              initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4 sm:space-y-6"
            >
              {/* Header Meta */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-mono text-red-500/90 tracking-tighter">
                    {activeMilestone.number}
                  </span>
                  <div className="h-7 sm:h-8 w-px bg-white/10" />
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-red-400 font-bold block">
                      {activeMilestone.category}
                    </span>
                    <span className="text-[11px] sm:text-xs text-neutral-400 font-mono">
                      {activeMilestone.timeline}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug pt-1">
                  {activeMilestone.title}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-neutral-300 tracking-wide">
                  {activeMilestone.subtitle}
                </p>
              </div>

              {/* Mobile Embedded Visual Sculpture Accent */}
              <div className="lg:hidden flex justify-center py-2">
                <GlassSculpture visualType={activeMilestone.visualType} />
              </div>

              {/* Brief Concise Story Description */}
              <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed max-w-xl">
                {activeMilestone.description}
              </p>

              {/* Minimalist Qualitative Metrics */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 border-y border-white/10 py-3.5 sm:py-4 my-2">
                {activeMilestone.metrics.map((metric, mIdx) => (
                  <div key={mIdx} className="space-y-0.5 text-left">
                    <span className="block text-base sm:text-2xl lg:text-3xl font-extrabold font-mono text-white tracking-tight">
                      {metric.value}
                    </span>
                    <span className="block text-[9px] sm:text-xs text-neutral-400 font-medium leading-tight">
                      {metric.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Skill Badges & Direct Case Study Link Trigger */}
              <div className="space-y-3 pt-1">
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {activeMilestone.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-white/[0.04] border border-white/10 px-2.5 sm:px-3 py-0.5 sm:py-1 text-[9px] sm:text-[10px] font-mono text-neutral-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {activeMilestone.link && (
                  <div className="pt-1.5">
                    <Link
                      href={activeMilestone.link}
                      className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/25 text-red-300 hover:text-white text-xs font-bold font-mono transition-all duration-300 shadow-[0_0_20px_rgba(239,68,68,0.15)] group"
                    >
                      <span>{activeMilestone.linkText || "Explore Project Case Study"}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-red-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-4 sm:pt-6">
        <div className="w-full rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-red-400 shrink-0" />
            <p className="text-xs sm:text-sm text-neutral-300 font-light tracking-wide italic">
              &ldquo;Every experience became a lesson. Every lesson became better engineering.&rdquo;
            </p>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-neutral-500 shrink-0">
            <span>VARUN KUMAR</span>
            <span>•</span>
            <span className="text-red-400 font-semibold">AI &amp; FULL-STACK</span>
          </div>
        </div>
      </div>
    </div>
  );
}
