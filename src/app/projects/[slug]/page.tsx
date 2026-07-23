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
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  AlertCircle,
  Compass,
} from "lucide-react";
import { Github } from "@/components/icons/BrandIcons";
import { projects, Project } from "@/lib/projects";
import { SpaceBackground } from "@/components/ui/space-background";
import CustomCursor from "@/components/ui/custom-cursor";

/* ─── Tab Definitions ─── */
interface TabDef {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const TABS: TabDef[] = [
  { id: "overview",      label: "Overview",      icon: <Sparkles className="w-4 h-4" /> },
  { id: "architecture",  label: "Architecture",  icon: <Code2 className="w-4 h-4" /> },
  { id: "deliverables",  label: "Deliverables",  icon: <Award className="w-4 h-4" /> },
  { id: "stack",         label: "Tech Stack",    icon: <Layers className="w-4 h-4" /> },
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
  const [project, setProject] = useState<Project | null>(null);
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");
  const [[tabDirection, prevTabIdx], setTabMeta] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    if (slug) {
      const found = projects.find((p) => p.slug === slug);
      if (found) {
        setProject(found);
      } else {
        router.push("/");
      }
    }
  }, [slug, router]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#040406] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  const galleryImages = project.gallery && project.gallery.length > 0 ? project.gallery : [project.image];
  const currentImage = galleryImages[activeImgIndex] || project.image;

  // Find next project for bottom navigation
  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  const handlePrevImage = () => {
    setActiveImgIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setActiveImgIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  const handleTabChange = (tabId: string) => {
    const newIdx = TABS.findIndex((t) => t.id === tabId);
    const oldIdx = TABS.findIndex((t) => t.id === activeTab);
    setTabMeta([newIdx > oldIdx ? 1 : -1, oldIdx]);
    setActiveTab(tabId);
  };

  return (
    <>
      {/* Custom cursor animation */}
      <CustomCursor />

      {/* Space Starfield Sibling Background */}
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
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600/20 to-indigo-600/15 border border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.1)]"
                        transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
                      />
                    )}
                    {isActive && (
                      <motion.div
                        layoutId="activeTabEdge"
                        className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"
                        transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
                      />
                    )}
                    <span className={`relative z-10 ${isActive ? "text-blue-400" : ""}`}>
                      {tab.icon}
                    </span>
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Divider */}
            <div className="hidden md:block my-5 h-px bg-gradient-to-r from-blue-500/15 via-gray-800/40 to-transparent" />

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
                        ? "border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] scale-[1.02]"
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
                className="group flex items-center gap-3 p-3 rounded-xl hover:bg-blue-500/5 transition-all duration-300"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] font-mono uppercase tracking-widest text-blue-400 font-bold">Next</p>
                  <p className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors truncate">{nextProject.name}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-blue-400 shrink-0 group-hover:translate-x-0.5 transition-transform" />
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
            <span className="text-xs uppercase font-mono font-bold tracking-widest text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
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
              <div className="hidden md:flex items-center gap-2">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-neutral-400">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                  Featured Case Study
                </div>
              </div>
              <span className="hidden md:block text-xs uppercase font-mono font-bold tracking-widest text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                {project.category}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight mb-4">
              {project.name}
            </h1>
            <p className="text-base sm:text-lg text-neutral-400 leading-relaxed font-light max-w-4xl mb-6">
              {project.description}
            </p>

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
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 font-bold text-xs uppercase tracking-wider text-white transition-all duration-300 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] cursor-pointer"
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
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-900 shadow-[0_0_50px_rgba(0,0,0,0.7)] group">
              {/* Ambient background glow */}
              <div className="absolute inset-0 opacity-25">
                <Image
                  src={currentImage}
                  alt={`${project.name} background`}
                  className="w-full h-full object-cover blur-2xl scale-110"
                  width={1920}
                  height={1080}
                  unoptimized
                />
              </div>

              {/* Main crisp display */}
              <div className="relative z-10 w-full h-full p-2.5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImage}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25 }}
                    className="w-full h-full"
                  >
                    <Image
                      src={currentImage}
                      alt={`${project.name} screenshot ${activeImgIndex + 1}`}
                      className="rounded-xl w-full h-full object-contain bg-black/50"
                      width={1920}
                      height={1080}
                      unoptimized
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Prev / Next Controls */}
              {galleryImages.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/80 border border-white/10 text-white hover:bg-blue-600 hover:border-blue-400 transition-all duration-200 cursor-pointer shadow-xl"
                    aria-label="Previous screenshot"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/80 border border-white/10 text-white hover:bg-blue-600 hover:border-blue-400 transition-all duration-200 cursor-pointer shadow-xl"
                    aria-label="Next screenshot"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  <div className="absolute bottom-3 right-3 z-20 px-3 py-1 rounded-full bg-black/85 border border-white/10 text-xs font-mono font-bold text-blue-400 backdrop-blur-md">
                    {activeImgIndex + 1} / {galleryImages.length}
                  </div>
                </>
              )}
            </div>

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
                          ? "border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)] scale-105"
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
                className="group flex items-center justify-between gap-4 p-4 px-6 rounded-2xl border border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 hover:border-blue-500/40 transition-all duration-300 min-w-[240px]"
              >
                <div className="text-left">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-blue-400 font-bold">Next Case Study</p>
                  <p className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">{nextProject.name}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition-transform shrink-0" />
              </Link>
            </section>
          </div>

        </main>

      </div>
    </>
  );
}


/* ═══════════════════════════════════════════════════════════════ */
/* ─── TAB PANEL COMPONENTS ─── */
/* ═══════════════════════════════════════════════════════════════ */

function OverviewPanel({ project }: { project: Project }) {
  return (
    <div className="space-y-10">
      {/* Executive Summary */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b border-gray-800 pb-3">
          <Sparkles className="w-5 h-5 text-blue-400" />
          <h2 className="text-2xl font-bold text-white tracking-tight">Executive Summary</h2>
        </div>
        <p className="text-base text-neutral-300 leading-relaxed font-light max-w-4xl">
          {project.longDescription}
        </p>
      </section>

      {/* Problem & Solution */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-neutral-900/40 border border-gray-800/80 space-y-3 relative overflow-hidden group hover:border-red-500/30 transition-colors duration-300">
          {/* Subtle corner glow */}
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-red-500/5 rounded-full blur-2xl group-hover:bg-red-500/10 transition-all duration-500" />
          <div className="flex items-center gap-2 text-red-400 font-mono font-bold text-xs uppercase tracking-wider">
            <AlertCircle className="w-4 h-4" />
            The Challenge & Problem Statement
          </div>
          <p className="text-sm text-neutral-300 leading-relaxed font-light relative z-10">
            {project.problemStatement}
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-neutral-900/40 border border-gray-800/80 space-y-3 relative overflow-hidden group hover:border-emerald-500/30 transition-colors duration-300">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-all duration-500" />
          <div className="flex items-center gap-2 text-emerald-400 font-mono font-bold text-xs uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4" />
            The Engineering Solution
          </div>
          <p className="text-sm text-neutral-300 leading-relaxed font-light relative z-10">
            {project.solutionOverview}
          </p>
        </div>
      </section>

      {/* Key Performance Metrics */}
      {project.metrics && project.metrics.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-3">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            <h2 className="text-2xl font-bold text-white tracking-tight">Key Performance Outcomes</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {project.metrics.map((metric, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                className="p-6 rounded-3xl bg-blue-500/5 border border-blue-500/15 text-center space-y-2 hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.08)] transition-all duration-300"
              >
                <p className="text-4xl font-extrabold text-blue-400 font-mono tracking-tight">{metric.value}</p>
                <p className="text-sm font-bold text-white">{metric.label}</p>
                {metric.description && (
                  <p className="text-xs text-neutral-400 font-light">{metric.description}</p>
                )}
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function ArchitecturePanel({ project }: { project: Project }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 border-b border-gray-800 pb-3">
        <Code2 className="w-5 h-5 text-blue-400" />
        <h2 className="text-2xl font-bold text-white tracking-tight">System Architecture & Core Modules</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {project.architecture.map((mod, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08, duration: 0.4 }}
            className="group p-6 rounded-3xl border border-gray-800/80 bg-neutral-900/40 space-y-3 hover:border-blue-500/40 transition-all duration-300 relative overflow-hidden"
          >
            {/* Hover glow */}
            <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-blue-500/0 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-all duration-500" />
            
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/20">
                Module 0{idx + 1}
              </span>
            </div>
            <h3 className="text-lg font-bold text-white">{mod.title}</h3>
            <p className="text-xs text-neutral-400 leading-relaxed font-light relative z-10">
              {mod.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Connection diagram hint */}
      <div className="flex items-center gap-3 pt-4">
        <Compass className="w-4 h-4 text-neutral-500" />
        <p className="text-xs text-neutral-500 font-mono">
          {project.architecture.length} core modules working in concert
        </p>
      </div>
    </div>
  );
}

function DeliverablesPanel({ project }: { project: Project }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 border-b border-gray-800 pb-3">
        <Award className="w-5 h-5 text-blue-400" />
        <h2 className="text-2xl font-bold text-white tracking-tight">Key Deliverables & Capabilities</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {project.details.map((detail, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.08, duration: 0.35 }}
            className="flex items-start gap-3.5 p-5 rounded-2xl border border-gray-800/60 bg-neutral-900/30 text-sm text-neutral-300 leading-relaxed group hover:border-blue-500/30 hover:bg-blue-500/[0.03] transition-all duration-300"
          >
            <div className="shrink-0 mt-0.5 w-7 h-7 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-blue-400" />
            </div>
            <span>{detail}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function TechStackPanel({ project }: { project: Project }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 border-b border-gray-800 pb-3">
        <Layers className="w-5 h-5 text-blue-400" />
        <h2 className="text-2xl font-bold text-white tracking-tight">Technology Stack Breakdown</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {project.stack.map((group, gIdx) => (
          <motion.div
            key={gIdx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: gIdx * 0.1, duration: 0.4 }}
            className="p-6 rounded-3xl border border-gray-800/80 bg-neutral-900/40 space-y-4 hover:border-blue-500/30 transition-all duration-300"
          >
            <h3 className="text-xs uppercase font-mono font-bold tracking-widest text-blue-400 flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-2 pt-1">
              {group.items.map((tech, tIdx) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: gIdx * 0.1 + tIdx * 0.04, duration: 0.3 }}
                  className="rounded-full bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 text-xs font-semibold text-blue-300 hover:bg-blue-500/20 hover:border-blue-500/30 transition-all duration-200"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
