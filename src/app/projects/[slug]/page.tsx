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
  Calendar,
  User,
  Compass,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  AlertCircle,
  Check,
  FolderGit2
} from "lucide-react";
import { Github } from "@/components/icons/BrandIcons";
import { projects, Project } from "@/lib/projects";
import { SpaceBackground } from "@/components/ui/space-background";
import CustomCursor from "@/components/ui/custom-cursor";

export default function ProjectDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const [project, setProject] = useState<Project | null>(null);
  const [activeImgIndex, setActiveImgIndex] = useState(0);

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

  return (
    <>
      {/* Custom cursor animation */}
      <CustomCursor />

      {/* Space Starfield Sibling Background */}
      <SpaceBackground />

      <div className="relative z-10 min-h-screen text-gray-100 py-12 px-5 sm:px-8 max-w-6xl mx-auto space-y-16">
        
        {/* ─── Top Navigation Bar ─── */}
        <div className="flex items-center justify-between">
          <Link
            href="/?entered=true#projects"
            scroll={false}
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-white transition-colors duration-300 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Projects
          </Link>

          <span className="text-xs uppercase font-mono font-bold tracking-widest text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
            {project.category}
          </span>
        </div>

        {/* ─── Hero Header Section ─── */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 text-center md:text-left"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-gray-800/80 pb-8">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-neutral-400">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                Featured Case Study
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
                {project.name}
              </h1>
              <p className="text-base sm:text-lg text-neutral-400 leading-relaxed font-light">
                {project.description}
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3 shrink-0">
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
          </div>
        </motion.div>

        {/* ─── Interactive Image Showcase & Ordered Screenshot Gallery ─── */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-4"
        >
          <div className="relative aspect-[16/9] md:aspect-[21/9] w-full rounded-3xl overflow-hidden bg-neutral-950 border border-neutral-900 shadow-[0_0_50px_rgba(0,0,0,0.7)] group">
            {/* Ambient background glow */}
            <div className="absolute inset-0 opacity-25">
              <Image 
                src={currentImage} 
                alt={`${project.name} background`} 
                className="w-full h-full object-cover blur-2xl scale-110"
                width={1200}
                height={675}
                unoptimized
              />
            </div>

            {/* Main crisp display */}
            <div className="relative z-10 w-full h-full p-3">
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
                    className="rounded-2xl w-full h-full object-contain bg-black/50"
                    width={1200}
                    height={675}
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
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/80 border border-white/10 text-white hover:bg-blue-600 hover:border-blue-400 transition-all duration-200 cursor-pointer shadow-xl"
                  aria-label="Previous screenshot"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/80 border border-white/10 text-white hover:bg-blue-600 hover:border-blue-400 transition-all duration-200 cursor-pointer shadow-xl"
                  aria-label="Next screenshot"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                <div className="absolute bottom-4 right-4 z-20 px-3.5 py-1.5 rounded-full bg-black/85 border border-white/10 text-xs font-mono font-bold text-blue-400 backdrop-blur-md">
                  {activeImgIndex + 1} / {galleryImages.length}
                </div>
              </>
            )}
          </div>

          {/* Ordered Thumbnail Strip */}
          {galleryImages.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-2 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
              {galleryImages.map((imgSrc, index) => {
                const isSelected = index === activeImgIndex;
                return (
                  <button
                    key={imgSrc}
                    onClick={() => setActiveImgIndex(index)}
                    className={`relative shrink-0 w-28 h-18 rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                      isSelected 
                        ? "border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)] scale-105" 
                        : "border-gray-800/80 opacity-50 hover:opacity-100 hover:border-gray-600"
                    }`}
                  >
                    <Image 
                      src={imgSrc} 
                      alt={`Thumbnail ${index + 1}`} 
                      className="w-full h-full object-cover"
                      width={120}
                      height={75}
                      unoptimized
                    />
                    <span className="absolute bottom-1 right-1 px-1.5 py-0.5 text-[9px] font-mono font-bold bg-black/80 text-white rounded">
                      {index + 1}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </motion.section>

        {/* ─── Executive Summary & Domain Context ─── */}
        <section className="space-y-6 pt-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-3">
            <Sparkles className="w-5 h-5 text-blue-400" />
            <h2 className="text-2xl font-bold text-white tracking-tight">Executive Summary</h2>
          </div>
          <p className="text-base text-neutral-300 leading-relaxed font-light max-w-4xl">
            {project.longDescription}
          </p>
        </section>

        {/* ─── Problem Statement & Engineering Solution ─── */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="p-6 rounded-3xl bg-neutral-900/40 border border-gray-800/80 space-y-3 relative overflow-hidden">
            <div className="flex items-center gap-2 text-red-400 font-mono font-bold text-xs uppercase tracking-wider">
              <AlertCircle className="w-4 h-4" />
              The Challenge & Problem Statement
            </div>
            <p className="text-sm text-neutral-300 leading-relaxed font-light">
              {project.problemStatement}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-neutral-900/40 border border-gray-800/80 space-y-3 relative overflow-hidden">
            <div className="flex items-center gap-2 text-emerald-400 font-mono font-bold text-xs uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              The Engineering Solution
            </div>
            <p className="text-sm text-neutral-300 leading-relaxed font-light">
              {project.solutionOverview}
            </p>
          </div>
        </section>

        {/* ─── Key Performance & Empirical Impact Metrics ─── */}
        {project.metrics && project.metrics.length > 0 && (
          <section className="space-y-6 pt-4">
            <div className="flex items-center gap-2 border-b border-gray-800 pb-3">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              <h2 className="text-2xl font-bold text-white tracking-tight">Key Performance Outcomes</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {project.metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-blue-500/5 border border-blue-500/15 text-center space-y-2 hover:border-blue-500/30 transition-colors"
                >
                  <p className="text-4xl font-extrabold text-blue-400 font-mono tracking-tight">{metric.value}</p>
                  <p className="text-sm font-bold text-white">{metric.label}</p>
                  {metric.description && (
                    <p className="text-xs text-neutral-400 font-light">{metric.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ─── System Architecture & Core Modules ─── */}
        <section className="space-y-6 pt-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-3">
            <Code2 className="w-5 h-5 text-blue-400" />
            <h2 className="text-2xl font-bold text-white tracking-tight">System Architecture & Core Modules</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.architecture.map((mod, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl border border-gray-800/80 bg-neutral-900/40 space-y-3 hover:border-blue-500/40 transition-all duration-300"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/20">
                    Module 0{idx + 1}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white">{mod.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed font-light">
                  {mod.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Key Deliverables & Feature Checklist ─── */}
        <section className="space-y-6 pt-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-3">
            <Award className="w-5 h-5 text-blue-400" />
            <h2 className="text-2xl font-bold text-white tracking-tight">Key Deliverables & Capabilities</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.details.map((detail, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3.5 p-4 rounded-2xl border border-gray-800/60 bg-neutral-900/30 text-sm text-neutral-300 leading-relaxed"
              >
                <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <span>{detail}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Technology Stack Breakdown ─── */}
        <section className="space-y-6 pt-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-3">
            <Layers className="w-5 h-5 text-blue-400" />
            <h2 className="text-2xl font-bold text-white tracking-tight">Technology Stack Breakdown</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.stack.map((group, gIdx) => (
              <div key={gIdx} className="p-6 rounded-3xl border border-gray-800/80 bg-neutral-900/40 space-y-3">
                <h3 className="text-xs uppercase font-mono font-bold tracking-widest text-blue-400 flex items-center gap-2">
                  <Code2 className="w-4 h-4" />
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2 pt-1">
                  {group.items.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-blue-500/10 border border-blue-500/20 px-3.5 py-1 text-xs font-semibold text-blue-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Bottom Navigation & Next Project Portal ─── */}
        <section className="pt-12 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-6">
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
            className="group flex items-center gap-4 p-4 px-6 rounded-2xl border border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 hover:border-blue-500/40 transition-all duration-300"
          >
            <div className="text-right">
              <p className="text-[10px] font-mono uppercase tracking-widest text-blue-400 font-bold">Next Case Study</p>
              <p className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">{nextProject.name}</p>
            </div>
            <ArrowRight className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </section>

      </div>
    </>
  );
}
