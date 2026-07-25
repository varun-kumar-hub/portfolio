"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  ArrowRight,
  ExternalLink, 
  Code2, 
  Award, 
  Layers, 
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Compass,
} from "lucide-react";
import { Github } from "@/components/icons/BrandIcons";
import { projects, Project } from "@/lib/projects";
import { SpaceBackground } from "@/components/ui/space-background";
import { getSkillMeta } from "@/components/icons/SkillIcons";
import { cn } from "@/lib/utils";
import { ProjectCardStack } from "@/components/ui/project-card-stack";

/* ─── Tab Definitions ─── */
interface TabDef {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const TABS: TabDef[] = [
  { id: "overview",      label: "Overview",           icon: <Sparkles className="w-4 h-4" /> },
  { id: "visuals",       label: "Visual Highlights",  icon: <Compass className="w-4 h-4" /> },
  { id: "architecture",  label: "Architecture",       icon: <Code2 className="w-4 h-4" /> },
  { id: "deliverables",  label: "Deliverables",       icon: <Award className="w-4 h-4" /> },
  { id: "stack",         label: "Tech Stack",         icon: <Layers className="w-4 h-4" /> },
];

/* ─── Panel animation variants ─── */
const panelVariants = {
  enter: (direction: number) => ({
    y: direction > 0 ? 30 : -30,
    opacity: 0,
  }),
  center: {
    y: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    y: direction > 0 ? -30 : 30,
    opacity: 0,
  }),
};

export default function ProjectDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const project = projects.find((p) => p.slug === slug) || null;
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");
  const [[tabDirection], setTabMeta] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    if (slug && !project) {
      router.push("/");
    }
  }, [slug, project, router]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#040406] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-red-500/20 border-t-red-500 rounded-full animate-spin" />
      </div>
    );
  }

  const galleryImages = project.gallery && project.gallery.length > 0 ? project.gallery : [project.image];

  // Find next project for bottom navigation
  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  const handleTabChange = (tabId: string) => {
    const newIdx = TABS.findIndex((t) => t.id === tabId);
    const oldIdx = TABS.findIndex((t) => t.id === activeTab);
    const dir = newIdx > oldIdx ? 1 : -1;
    setTabMeta([dir, newIdx]);
    setActiveTab(tabId);
  };

  return (
    <div className="relative min-h-screen bg-[#040406] text-white selection:bg-red-500/30 selection:text-red-200 overflow-x-hidden font-sans">
      <SpaceBackground />

      <div className="relative z-10 min-h-screen text-gray-100 flex flex-col md:flex-row">

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* ─── LEFT SIDEBAR — full height, flush left ─── */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <aside className="shrink-0 md:w-60 lg:w-64 md:fixed md:left-0 md:top-0 md:bottom-0 md:z-30 md:border-r md:border-gray-800/50 bg-[#040406]/80 md:backdrop-blur-xl">
          <div className="md:h-full md:flex md:flex-col md:py-6 md:px-4 lg:px-5">

            {/* Back to Projects link */}
            <Link
              href="/?entered=true#projects"
              scroll={false}
              className="hidden md:inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition-colors duration-300 group mb-6 px-1"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform duration-300" />
              Back to Projects
            </Link>

            {/* Section Navigation Tabs */}
            <div className="flex md:flex-col gap-1 p-1.5 rounded-2xl bg-neutral-900/50 border border-gray-800/50 overflow-x-auto md:overflow-x-visible mx-4 md:mx-0 mt-4 md:mt-0">
              {TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`relative flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-300 cursor-pointer w-full text-left ${
                      isActive
                        ? "text-white"
                        : "text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.03]"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTabPill"
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-600/20 to-rose-600/15 border border-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.1)]"
                        transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
                      />
                    )}
                    {isActive && (
                      <motion.div
                        layoutId="activeTabEdge"
                        className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]"
                        transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
                      />
                    )}
                    <span className={`relative z-10 ${isActive ? "text-red-400" : ""}`}>
                      {tab.icon}
                    </span>
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Divider */}
            <div className="hidden md:block my-5 h-px bg-gradient-to-r from-red-500/15 via-gray-800/40 to-transparent" />

            {/* Screenshot Gallery Label */}
            <p className="hidden md:block text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-500 px-1 mb-3">
              Screenshots ({galleryImages.length})
            </p>

            {/* Vertical Gallery Thumbnails */}
            <div className="hidden md:flex flex-col gap-2.5 flex-1 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
              {galleryImages.map((imgSrc, index) => {
                const isSelected = index === activeImgIndex;
                return (
                  <button
                    key={imgSrc}
                    onClick={() => setActiveImgIndex(index)}
                    className={`relative shrink-0 w-full aspect-video rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? "border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)] scale-[1.02]"
                        : "border-gray-800/60 opacity-45 hover:opacity-100 hover:border-gray-600"
                    }`}
                  >
                    <Image
                      src={imgSrc}
                      alt={`Screenshot ${index + 1}`}
                      className="w-full h-full object-cover"
                      width={240}
                      height={135}
                      unoptimized
                    />
                    <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 text-[9px] font-mono font-bold bg-black/80 text-white rounded">
                      {index + 1}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Bottom sidebar nav */}
            <div className="hidden md:block mt-auto pt-4 border-t border-gray-800/40">
              <Link
                href={`/projects/${nextProject.slug}`}
                className="group flex items-center gap-3 p-3 rounded-xl hover:bg-red-500/5 transition-all duration-300"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] font-mono uppercase tracking-widest text-red-400 font-bold">Next</p>
                  <p className="text-sm font-bold text-white group-hover:text-red-300 transition-colors truncate">{nextProject.name}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-red-400 shrink-0 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

          </div>
        </aside>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* ─── MAIN CONTENT AREA — right side ─── */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <main className="flex-1 md:ml-60 lg:ml-64 min-w-0">

          {/* Mobile-only top nav */}
          <div className="flex md:hidden items-center justify-between px-5 pt-6 pb-3">
            <Link
              href="/?entered=true#projects"
              scroll={false}
              className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-white transition-colors duration-300 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
              Back
            </Link>
            <span className="text-xs uppercase font-mono font-bold tracking-widest text-red-400 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
              {project.category}
            </span>
          </div>

          {/* ─── Hero Header ─── */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="px-6 sm:px-10 lg:px-12 pt-8 pb-8"
          >
            <div className="flex items-center justify-between gap-4 mb-2">
              <div className="flex items-center gap-2">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-neutral-400">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
                  Featured Case Study
                </div>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight mb-4">
              {project.name}
            </h1>
            <p className="text-base sm:text-lg text-neutral-400 leading-relaxed font-light max-w-4xl mb-5">
              {project.description}
            </p>

            {/* High-Impact Performance Metric Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-red-500/10 border border-red-500/30 text-red-300 backdrop-blur-md shadow-sm">
                ⚡ 2.5s Gen Latency
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-neutral-900/90 border border-neutral-700/80 text-neutral-300 backdrop-blur-md shadow-sm">
                🤖 Google Gemini 2.5
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-neutral-900/90 border border-neutral-700/80 text-neutral-300 backdrop-blur-md shadow-sm">
                🗺️ Google Maps API
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-rose-500/10 border border-rose-500/30 text-rose-300 backdrop-blur-md shadow-sm">
                ⭐ Production Live
              </span>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gray-700 bg-neutral-900/80 hover:bg-neutral-800 hover:border-gray-600 font-bold text-xs uppercase tracking-wider text-gray-200 hover:text-white transition-all duration-300 cursor-pointer shadow-md"
              >
                <Github className="w-4 h-4" />
                Source Code
              </a>
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 font-bold text-xs uppercase tracking-wider text-white transition-all duration-300 shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:shadow-[0_0_25px_rgba(239,68,68,0.5)] cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Application
                </a>
              )}
            </div>
          </motion.div>

          {/* ─── Main Image Viewer ─── */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="px-6 sm:px-10 lg:px-12 pb-6"
          >
            <ProjectCardStack
              images={galleryImages}
              projectName={project.name}
              activeImgIndex={activeImgIndex}
              onIndexChange={setActiveImgIndex}
            />

            {/* Mobile-only horizontal thumbnail strip */}
            {galleryImages.length > 1 && (
              <div className="flex md:hidden items-center gap-3 overflow-x-auto pb-2 pt-3 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
                {galleryImages.map((imgSrc, index) => {
                  const isSelected = index === activeImgIndex;
                  return (
                    <button
                      key={imgSrc}
                      onClick={() => setActiveImgIndex(index)}
                      className={`relative shrink-0 w-24 h-14 rounded-lg overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                        isSelected
                          ? "border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.6)] scale-105"
                          : "border-gray-800/80 opacity-50 hover:opacity-100 hover:border-gray-600"
                      }`}
                    >
                      <Image
                        src={imgSrc}
                        alt={`Thumb ${index + 1}`}
                        className="w-full h-full object-cover"
                        width={96}
                        height={56}
                        unoptimized
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </motion.section>

          {/* ─── Tab Content Panel ─── */}
          <div className="px-6 sm:px-10 lg:px-12 py-6 min-h-[400px]">
            <AnimatePresence mode="wait" custom={tabDirection}>
              <motion.div
                key={activeTab}
                custom={tabDirection}
                variants={panelVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {activeTab === "overview" && (
                  <OverviewPanel project={project} />
                )}
                {activeTab === "visuals" && (
                  <VisualsPanel project={project} />
                )}
                {activeTab === "architecture" && (
                  <ArchitecturePanel project={project} />
                )}
                {activeTab === "deliverables" && (
                  <DeliverablesPanel project={project} />
                )}
                {activeTab === "stack" && (
                  <TechStackPanel project={project} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ─── Bottom Navigation (mobile & desktop fallback) ─── */}
          <div className="px-6 sm:px-10 lg:px-12 pb-12">
            <section className="pt-8 border-t border-gray-800/80 flex flex-col md:flex-row items-center justify-between gap-4">
              <Link
                href="/?entered=true#projects"
                scroll={false}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gray-800 bg-neutral-900 text-sm font-bold text-gray-300 hover:text-white hover:border-gray-700 transition-all duration-300"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Project Directory
              </Link>
              <Link
                href={`/projects/${nextProject.slug}`}
                className="group flex items-center justify-between gap-4 p-4 px-6 rounded-2xl border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 hover:border-red-500/40 transition-all duration-300 min-w-[240px]"
              >
                <div className="text-left">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-red-400 font-bold">Next Case Study</p>
                  <p className="text-base font-bold text-white group-hover:text-red-300 transition-colors">{nextProject.name}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-red-400 group-hover:translate-x-1 transition-transform shrink-0" />
              </Link>
            </section>
          </div>

        </main>

      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════ */
/* ─── TAB PANEL COMPONENTS (Structured Executive Brief Format) ─── */
/* ═══════════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════════ */
/* ─── TAB PANEL COMPONENTS (Clean Case Study Article Format) ─── */
/* ═══════════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════════ */
/* ─── TAB PANEL COMPONENTS (Pure Unboxed Clean Typography) ─── */
/* ═══════════════════════════════════════════════════════════════ */

function OverviewPanel({ project }: { project: Project }) {
  return (
    <article className="space-y-8 w-full max-w-7xl font-sans">
      {/* Executive Overview Header Card */}
      <header className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-red-500/10 via-neutral-900/60 to-neutral-900/40 border border-red-500/30 backdrop-blur-xl shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-red-400">
            <Sparkles className="w-4 h-4" />
            Executive Summary
          </div>
          <span className="text-xs font-mono font-bold text-neutral-400 bg-neutral-800/80 px-3 py-1 rounded-full border border-gray-700">
            {project.category}
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
          {project.description}
        </h2>
      </header>

      {/* Problem & Solution Glass Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Problem Card */}
        <div className="p-6 rounded-2xl bg-red-500/[0.04] border border-red-500/20 backdrop-blur-md space-y-3 shadow-lg">
          <div className="flex items-center gap-2.5 text-red-400 font-mono font-bold text-xs uppercase tracking-wider">
            <div className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/20">
              <AlertCircle className="w-4 h-4" />
            </div>
            The Challenge
          </div>
          <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
            {project.problemStatement}
          </p>
        </div>

        {/* Solution Card */}
        <div className="p-6 rounded-2xl bg-emerald-500/[0.04] border border-emerald-500/20 backdrop-blur-md space-y-3 shadow-lg">
          <div className="flex items-center gap-2.5 text-emerald-400 font-mono font-bold text-xs uppercase tracking-wider">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            The Engineering Solution
          </div>
          <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
            {project.solutionOverview}
          </p>
        </div>
      </div>

      {/* Core Capabilities Checklist */}
      {project.details && project.details.length > 0 && (
        <div className="p-6 rounded-2xl bg-neutral-900/50 border border-gray-800/80 space-y-4 shadow-lg">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-red-400">
            <CheckCircle2 className="w-4 h-4" />
            Core Platform Capabilities
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            {project.details.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-3 rounded-xl bg-neutral-950/60 border border-gray-800/50 text-xs sm:text-sm text-neutral-300 font-light leading-relaxed"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0 shadow-[0_0_6px_rgba(248,113,113,0.6)]" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

function VisualsPanel({ project }: { project: Project }) {
  if (!project.galleryDescriptions || Object.keys(project.galleryDescriptions).length === 0) {
    return (
      <article className="space-y-4 max-w-4xl font-sans text-neutral-400 text-sm">
        No visual breakdown recorded for this project.
      </article>
    );
  }

  return (
    <article className="space-y-6 w-full max-w-7xl font-sans">
      <header className="space-y-2 border-b border-gray-800/80 pb-5">
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-red-400">
          <Compass className="w-4 h-4" />
          Interface Breakdown
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Visual & Interface Highlights
        </h2>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        {Object.entries(project.galleryDescriptions).map(([imgPath, info], idx) => (
          <div
            key={imgPath}
            className="p-5 rounded-2xl bg-neutral-900/60 border border-gray-800/80 hover:border-red-500/40 transition-all duration-300 space-y-2 group shadow-md"
          >
            <div className="flex items-center gap-2.5 text-xs font-mono font-bold text-red-400">
              <span className="w-6 h-6 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-[10px]">
                0{idx + 1}
              </span>
              <h4 className="text-sm font-bold text-white tracking-tight group-hover:text-red-300 transition-colors">
                {info.title}
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed pl-8">
              {info.description}
            </p>
          </div>
        ))}
      </div>
    </article>
  );
}

function ArchitecturePanel({ project }: { project: Project }) {
  return (
    <article className="space-y-8 w-full max-w-7xl font-sans">
      <header className="space-y-2 border-b border-gray-800/80 pb-6">
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-red-400">
          <Code2 className="w-4 h-4" />
          Technical Design
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          System Architecture
        </h2>
      </header>

      <div className="space-y-8">
        {project.architecture.map((mod, idx) => (
          <div key={idx} className="space-y-2 pb-6 border-b border-gray-800/40 last:border-0">
            <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-widest">
              Module 0{idx + 1}
            </span>
            <h3 className="text-xl font-bold text-white">{mod.title}</h3>
            <p className="text-base text-neutral-300 font-light leading-relaxed">
              {mod.description}
            </p>
          </div>
        ))}
      </div>
    </article>
  );
}

function DeliverablesPanel({ project }: { project: Project }) {
  return (
    <article className="space-y-8 w-full max-w-7xl font-sans">
      <header className="space-y-2 border-b border-gray-800/80 pb-6">
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-red-400">
          <Award className="w-4 h-4" />
          Features & Capabilities
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Key Deliverables
        </h2>
      </header>

      <ul className="space-y-5">
        {project.details.map((detail, idx) => {
          const parts = detail.split(":");
          const hasTitle = parts.length > 1;
          const title = hasTitle ? parts[0].trim() : "";
          const body = hasTitle ? parts.slice(1).join(":").trim() : detail;

          return (
            <li key={idx} className="flex items-start gap-4 text-neutral-300 text-base font-light leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2.5 shrink-0" />
              <div>
                {hasTitle ? (
                  <span>
                    <strong className="font-bold text-white mr-2">{title}:</strong>
                    <span>{body}</span>
                  </span>
                ) : (
                  <span>{detail}</span>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </article>
  );
}

function ProjectSkillChip({ name }: { name: string }) {
  const { icon, color } = getSkillMeta(name);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -2, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      style={{
        borderColor: isHovered ? color : undefined,
        boxShadow: isHovered ? `0 0 14px ${color}` : "none",
      }}
      className={cn(
        "flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-semibold select-none cursor-default transition-all duration-300",
        "text-gray-700 dark:text-gray-300 border-gray-200/50 dark:border-white/10 bg-gray-100/50 dark:bg-white/[0.04] hover:bg-gray-200/50 dark:hover:bg-white/[0.08]"
      )}
    >
      <div className="flex h-5 w-5 items-center justify-center shrink-0 transition-transform duration-300">
        {icon}
      </div>
      <span>{name}</span>
    </motion.div>
  );
}

function BentoTechCard({ group, index }: { group: { category: string; items: string[] }; index: number }) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const categoryGlowColors: Record<number, string> = {
    0: "rgba(59, 130, 246, 0.08)",
    1: "rgba(168, 85, 247, 0.08)",
    2: "rgba(16, 185, 129, 0.08)",
    3: "rgba(245, 158, 11, 0.08)",
  };
  const glowColor = categoryGlowColors[index % 4] || "rgba(59, 130, 246, 0.08)";

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      style={{
        backgroundImage: isHovered
          ? `radial-gradient(320px circle at ${coords.x}px ${coords.y}px, ${glowColor}, transparent 80%)`
          : undefined,
      }}
      className="relative overflow-hidden rounded-3xl border border-gray-800/40 bg-black/25 p-6 sm:p-8 backdrop-blur-md flex flex-col justify-between transition-all duration-300 hover:border-gray-700/80 group"
    >
      {/* Decorative Large Index Number */}
      <div className="absolute bottom-[-16px] right-3 text-8xl font-black text-white/[0.03] select-none pointer-events-none font-sans tracking-tighter transition-all duration-300 group-hover:scale-105 group-hover:text-white/[0.06]">
        0{index + 1}
      </div>

      <div className="relative z-10 mb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gray-950/80 border border-gray-800/40 shadow-sm shrink-0">
            <Code2 className="w-5 h-5 text-red-400" />
          </div>
          <h3 className="text-lg font-extrabold text-white tracking-tight">
            {group.category}
          </h3>
        </div>
      </div>

      {/* Skills Chip Grid */}
      <div className="relative z-10 flex flex-wrap gap-2.5">
        {group.items.map((tech) => (
          <ProjectSkillChip key={tech} name={tech} />
        ))}
      </div>
    </motion.div>
  );
}

function TechStackPanel({ project }: { project: Project }) {
  return (
    <article className="space-y-8 max-w-4xl font-sans">
      <header className="space-y-2 border-b border-gray-800/80 pb-6">
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-red-400">
          <Layers className="w-4 h-4" />
          Technologies
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Technology Stack
        </h2>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {project.stack.map((group, idx) => (
          <BentoTechCard key={idx} group={group} index={idx} />
        ))}
      </div>
    </article>
  );
}
