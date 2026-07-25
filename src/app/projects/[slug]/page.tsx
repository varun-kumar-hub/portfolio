"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  AlertCircle,
  CheckCircle2,
  Zap,
  Sparkles,
  Layers,
  BookOpen,
  Code2,
} from "lucide-react";
import { Github } from "@/components/icons/BrandIcons";
import { projects } from "@/lib/projects";
import { SpaceBackground } from "@/components/ui/space-background";
import { getSkillMeta } from "@/components/icons/SkillIcons";
import { cn } from "@/lib/utils";
import { ProjectCardStack } from "@/components/ui/project-card-stack";

/* ─── Scroll-triggered fade-in wrapper ─── */
function FadeSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Section number label ─── */
function SectionLabel({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="text-xs font-mono font-bold text-red-500/80 tracking-wider">
        {number}
      </span>
      <div className="h-px flex-1 max-w-16 bg-gradient-to-r from-red-500/40 to-transparent" />
      <span className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-500">
        {title}
      </span>
    </div>
  );
}

/* ─── Sidebar section definitions ─── */
const SIDEBAR_SECTIONS = [
  { id: "hero", label: "Overview", number: "00" },
  { id: "problem", label: "Problem", number: "01" },
  { id: "showcase", label: "Showcase", number: "02" },
  { id: "features", label: "Features", number: "03" },
  { id: "architecture", label: "Architecture", number: "04" },
  { id: "stack", label: "Tech Stack", number: "05" },
  { id: "learnings", label: "Learnings", number: "06" },
];

/* ═══════════════════════════════════════ */
/* ─── MAIN PAGE COMPONENT ─── */
/* ═══════════════════════════════════════ */

export default function ProjectDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const project = projects.find((p) => p.slug === slug) || null;
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // Register a section ref
  const setSectionRef = useCallback(
    (id: string) => (el: HTMLElement | null) => {
      sectionRefs.current[id] = el;
    },
    []
  );

  // IntersectionObserver for active section tracking
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    // Small delay to ensure all section elements are in the DOM
    const timer = setTimeout(() => {
      for (const sec of SIDEBAR_SECTIONS) {
        const el = document.getElementById(sec.id);
        if (!el) continue;
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setActiveSection(sec.id);
            }
          },
          { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
        );
        observer.observe(el);
        observers.push(observer);
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      observers.forEach((o) => o.disconnect());
    };
  }, [project]);

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

  const galleryImages =
    project.gallery && project.gallery.length > 0
      ? project.gallery
      : [project.image];

  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const prevProject =
    projects[(currentIndex - 1 + projects.length) % projects.length];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen bg-[#040406] text-white selection:bg-red-500/30 selection:text-red-200 overflow-x-hidden lg:pl-52 xl:pl-56">
      <SpaceBackground />

      {/* ═════════════════════════════════════════════════════════════ */}
      {/* ─── FULL-HEIGHT FIXED SIDEBAR ───                            */}
      {/* ═════════════════════════════════════════════════════════════ */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 z-40 w-52 xl:w-56 flex-col items-center border-r border-white/[0.04] bg-[#040406]/80 backdrop-blur-2xl">
        {/* Back Button — top */}
        <div className="pt-6 pb-8 px-4 w-full">
          <Link
            href="/?entered=true#projects"
            scroll={false}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.03] border border-neutral-800/60 text-xs font-bold text-neutral-400 hover:text-white hover:border-neutral-600 transition-all duration-300 group w-full justify-center"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform duration-300" />
            Back
          </Link>
        </div>

        {/* Section Nav — vertically centered */}
        <nav className="flex-1 flex flex-col justify-center gap-2.5 px-4 w-full">
          {SIDEBAR_SECTIONS.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                className={`group flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-300 cursor-pointer w-full ${
                  isActive
                    ? "bg-red-500/10 border border-red-500/30"
                    : "border border-transparent hover:bg-white/[0.04]"
                }`}
              >
                {/* Dot indicator */}
                <span
                  className={`w-2.5 h-2.5 rounded-full shrink-0 transition-all duration-300 ${
                    isActive
                      ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.7)] scale-110"
                      : "bg-neutral-700 group-hover:bg-neutral-500"
                  }`}
                />
                {/* Label */}
                <span
                  className={`text-xs font-bold tracking-wide transition-all duration-300 ${
                    isActive
                      ? "text-red-400"
                      : "text-neutral-600 group-hover:text-neutral-400"
                  }`}
                >
                  {sec.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Decorative bottom line */}
        <div className="pb-6 px-4 w-full">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />
        </div>
      </aside>

      {/* Mobile-only back button (visible below lg) */}
      <div className="fixed top-6 left-6 z-50 lg:hidden">
        <Link
          href="/?entered=true#projects"
          scroll={false}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-neutral-950/80 border border-neutral-800/80 backdrop-blur-xl text-xs font-bold text-neutral-400 hover:text-white hover:border-neutral-600 transition-all duration-300 group shadow-2xl"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform duration-300" />
          Back
        </Link>
      </div>

      {/* ─── Floating Category Badge ─── */}
      <div className="fixed top-6 right-6 z-50">
        <span className="px-4 py-2 rounded-full bg-neutral-950/80 border border-red-500/30 backdrop-blur-xl text-xs font-mono font-bold uppercase tracking-widest text-red-400 shadow-2xl">
          {project.category}
        </span>
      </div>

      {/* ════════════════════════════════════════════════════════ */}
      {/* SECTION 0 — CINEMATIC HERO                             */}
      {/* ════════════════════════════════════════════════════════ */}
      <section ref={setSectionRef("hero")} id="hero" className="relative z-10 min-h-[85vh] flex flex-col justify-center px-6 sm:px-12 lg:px-20 xl:px-28 pt-24 pb-16 max-w-7xl mx-auto">
        <FadeSection>
          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.7)]" />
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-neutral-500">
              Featured Case Study
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight text-white leading-[0.95] mb-6">
            {project.name}
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-neutral-400 leading-relaxed font-light max-w-3xl mb-8">
            {project.description}
          </p>

          {/* Metric Badges */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="flex flex-wrap items-center gap-3 mb-10">
              {project.metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="group relative flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md hover:border-red-500/40 hover:bg-red-500/[0.04] transition-all duration-300"
                >
                  <span className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                    {metric.value}
                  </span>
                  <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-red-600 hover:bg-red-500 font-bold text-sm tracking-wide text-white transition-all duration-300 shadow-[0_0_30px_rgba(239,68,68,0.25)] hover:shadow-[0_0_40px_rgba(239,68,68,0.4)] cursor-pointer"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            )}
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full border border-white/[0.12] bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/[0.2] font-bold text-sm tracking-wide text-neutral-300 hover:text-white backdrop-blur-md transition-all duration-300 cursor-pointer"
            >
              <Github className="w-4 h-4" />
              View Code
            </a>
          </div>
        </FadeSection>
      </section>

      {/* ════════════════════════════════════════════════════════ */}
      {/* SECTION 1 — THE PROBLEM                                */}
      {/* ════════════════════════════════════════════════════════ */}
      <section ref={setSectionRef("problem")} id="problem" className="relative z-10 px-6 sm:px-12 lg:px-20 xl:px-28 py-24 max-w-7xl mx-auto">
        <FadeSection>
          <SectionLabel number="01" title="The Problem" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Problem */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 rounded-2xl bg-red-500/10 border border-red-500/20">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  The Challenge
                </h2>
              </div>
              <p className="text-base sm:text-lg text-neutral-400 font-light leading-relaxed">
                {project.problemStatement}
              </p>
            </div>

            {/* Solution */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  The Solution
                </h2>
              </div>
              <p className="text-base sm:text-lg text-neutral-400 font-light leading-relaxed">
                {project.solutionOverview}
              </p>
            </div>
          </div>
        </FadeSection>
      </section>

      {/* ════════════════════════════════════════════════════════ */}
      {/* SECTION 2 — PROJECT SHOWCASE (3D CardStack)            */}
      {/* ════════════════════════════════════════════════════════ */}
      <section ref={setSectionRef("showcase")} id="showcase" className="relative z-10 px-6 sm:px-12 lg:px-20 xl:px-28 py-16 max-w-7xl mx-auto">
        <FadeSection>
          <SectionLabel number="02" title="Project Showcase" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-10">
            Visual Highlights
          </h2>

          <ProjectCardStack
            images={galleryImages}
            projectName={project.name}
            activeImgIndex={activeImgIndex}
            onIndexChange={setActiveImgIndex}
          />

          {/* Thumbnail Strip */}
          {galleryImages.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-6 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
              {galleryImages.map((imgSrc, index) => {
                const isSelected = index === activeImgIndex;
                return (
                  <button
                    key={imgSrc}
                    onClick={() => setActiveImgIndex(index)}
                    className={`relative shrink-0 w-20 h-12 sm:w-24 sm:h-14 rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? "border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)] scale-105"
                        : "border-neutral-800/60 opacity-40 hover:opacity-100 hover:border-neutral-600"
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
        </FadeSection>
      </section>

      {/* ════════════════════════════════════════════════════════ */}
      {/* SECTION 3 — CORE FEATURES (Bento Cards)                */}
      {/* ════════════════════════════════════════════════════════ */}
      <section ref={setSectionRef("features")} id="features" className="relative z-10 px-6 sm:px-12 lg:px-20 xl:px-28 py-24 max-w-7xl mx-auto">
        <FadeSection>
          <SectionLabel number="03" title="Core Features" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-12">
            What It Does
          </h2>
        </FadeSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {project.details.slice(0, 6).map((detail, idx) => {
            const colonIdx = detail.indexOf(":");
            const title = colonIdx !== -1 ? detail.slice(0, colonIdx).trim() : detail.split(".")[0].trim();
            const body = colonIdx !== -1 ? detail.slice(colonIdx + 1).trim() : detail;

            const featureIcons = [
              <Zap key="zap" className="w-5 h-5" />,
              <Sparkles key="spark" className="w-5 h-5" />,
              <BookOpen key="book" className="w-5 h-5" />,
              <Layers key="layers" className="w-5 h-5" />,
              <Code2 key="code" className="w-5 h-5" />,
              <CheckCircle2 key="check" className="w-5 h-5" />,
            ];

            return (
              <FadeSection key={idx} delay={idx * 0.08}>
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ duration: 0.3 }}
                  className="group relative p-6 rounded-3xl bg-white/[0.02] border border-white/[0.06] hover:border-red-500/30 hover:bg-red-500/[0.02] backdrop-blur-sm transition-all duration-500 h-full"
                >
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 mb-4 group-hover:bg-red-500/15 group-hover:border-red-500/30 transition-all duration-300">
                    {featureIcons[idx % 6]}
                  </div>

                  {/* Feature Title */}
                  <h3 className="text-base font-bold text-white tracking-tight mb-2 group-hover:text-red-300 transition-colors duration-300">
                    {title}
                  </h3>

                  {/* Feature Description */}
                  <p className="text-sm text-neutral-400 font-light leading-relaxed">
                    {body}
                  </p>

                  {/* Subtle index watermark */}
                  <span className="absolute top-4 right-5 text-6xl font-black text-white/[0.02] select-none pointer-events-none group-hover:text-white/[0.04] transition-all duration-500">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </motion.div>
              </FadeSection>
            );
          })}
        </div>

        {/* Remaining features as compact list */}
        {project.details.length > 6 && (
          <FadeSection delay={0.3} className="mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.details.slice(6).map((detail, idx) => {
                const colonIdx = detail.indexOf(":");
                const title = colonIdx !== -1 ? detail.slice(0, colonIdx).trim() : "";
                const body = colonIdx !== -1 ? detail.slice(colonIdx + 1).trim() : detail;

                return (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.015] border border-white/[0.05] text-sm leading-relaxed"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500/60 mt-2 shrink-0" />
                    <div>
                      {title && <span className="font-bold text-white tracking-wide">{title}: </span>}
                      <span className="text-neutral-400 font-light">{body}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </FadeSection>
        )}
      </section>

      {/* ════════════════════════════════════════════════════════ */}
      {/* SECTION 4 — ARCHITECTURE                               */}
      {/* ════════════════════════════════════════════════════════ */}
      <section ref={setSectionRef("architecture")} id="architecture" className="relative z-10 px-6 sm:px-12 lg:px-20 xl:px-28 py-24 max-w-7xl mx-auto">
        <FadeSection>
          <SectionLabel number="04" title="Architecture" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-12">
            System Design
          </h2>
        </FadeSection>

        {/* Architecture Pipeline Cards */}
        <div className="space-y-4">
          {project.architecture.map((mod, idx) => (
            <FadeSection key={idx} delay={idx * 0.1}>
              <div className="group flex items-start gap-6 p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/[0.06] hover:border-red-500/25 hover:bg-red-500/[0.015] backdrop-blur-sm transition-all duration-500">
                {/* Step Number */}
                <div className="shrink-0 w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                  <span className="text-sm font-extrabold text-red-400 font-mono">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-2 group-hover:text-red-300 transition-colors duration-300">
                    {mod.title}
                  </h3>
                  <p className="text-sm sm:text-base text-neutral-500 font-light leading-relaxed">
                    {mod.description}
                  </p>
                </div>

                {/* Connector Arrow (not on last) */}
                {idx < project.architecture.length - 1 && (
                  <div className="hidden sm:flex items-center shrink-0 self-center">
                    <ArrowRight className="w-4 h-4 text-neutral-700" />
                  </div>
                )}
              </div>
            </FadeSection>
          ))}
        </div>

        {/* Visual Pipeline Flow */}
        <FadeSection delay={0.3} className="mt-12">
          <div className="flex flex-wrap items-center justify-center gap-3 p-6 rounded-3xl bg-white/[0.015] border border-white/[0.05]">
            {project.stack
              .flatMap((g) => g.items)
              .slice(0, 6)
              .map((tech, idx, arr) => (
                <React.Fragment key={tech}>
                  <span className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs font-bold text-neutral-300 tracking-wide">
                    {tech}
                  </span>
                  {idx < arr.length - 1 && (
                    <span className="text-neutral-700 text-xs">→</span>
                  )}
                </React.Fragment>
              ))}
          </div>
        </FadeSection>
      </section>

      {/* ════════════════════════════════════════════════════════ */}
      {/* SECTION 5 — TECH STACK                                 */}
      {/* ════════════════════════════════════════════════════════ */}
      <section ref={setSectionRef("stack")} id="stack" className="relative z-10 px-6 sm:px-12 lg:px-20 xl:px-28 py-24 max-w-7xl mx-auto">
        <FadeSection>
          <SectionLabel number="05" title="Tech Stack" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-12">
            Built With
          </h2>
        </FadeSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {project.stack.map((group, idx) => (
            <FadeSection key={idx} delay={idx * 0.1}>
              <TechStackCard group={group} index={idx} />
            </FadeSection>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════ */}
      {/* SECTION 6 — KEY LEARNINGS                              */}
      {/* ════════════════════════════════════════════════════════ */}
      <section ref={setSectionRef("learnings")} id="learnings" className="relative z-10 px-6 sm:px-12 lg:px-20 xl:px-28 py-24 max-w-7xl mx-auto">
        <FadeSection>
          <SectionLabel number="06" title="Key Learnings" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-10">
            Insights & Challenges
          </h2>

          <div className="p-8 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md space-y-6">
            <p className="text-base sm:text-lg text-neutral-400 font-light leading-relaxed">
              {project.longDescription}
            </p>

            {/* Visual Gallery Descriptions as Insights */}
            {project.galleryDescriptions &&
              Object.keys(project.galleryDescriptions).length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/[0.05]">
                  {Object.entries(project.galleryDescriptions)
                    .slice(0, 4)
                    .map(([, info], idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 text-sm"
                      >
                        <span className="w-6 h-6 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-[10px] font-mono font-bold text-red-400 shrink-0 mt-0.5">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <h4 className="font-bold text-white text-sm mb-0.5">
                            {info.title}
                          </h4>
                          <p className="text-neutral-500 font-light leading-relaxed text-xs">
                            {info.description}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              )}
          </div>
        </FadeSection>
      </section>

      {/* ════════════════════════════════════════════════════════ */}
      {/* BOTTOM NAVIGATION                                      */}
      {/* ════════════════════════════════════════════════════════ */}
      <section className="relative z-10 px-6 sm:px-12 lg:px-20 xl:px-28 pt-8 pb-20 max-w-7xl mx-auto">
        <FadeSection>
          <div className="border-t border-white/[0.06] pt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Previous */}
            <Link
              href={`/projects/${prevProject.slug}`}
              className="group flex items-center gap-4 p-4 px-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-neutral-600/50 hover:bg-white/[0.04] transition-all duration-300 min-w-[200px]"
            >
              <ArrowLeft className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:-translate-x-1 transition-all duration-300 shrink-0" />
              <div className="text-left">
                <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-600 font-bold">
                  Previous
                </p>
                <p className="text-sm font-bold text-neutral-300 group-hover:text-white transition-colors truncate">
                  {prevProject.name}
                </p>
              </div>
            </Link>

            {/* Back to Projects */}
            <Link
              href="/?entered=true#projects"
              scroll={false}
              className="px-6 py-3 rounded-full border border-white/[0.08] bg-white/[0.02] text-xs font-bold text-neutral-500 hover:text-white hover:border-white/[0.15] transition-all duration-300"
            >
              All Projects
            </Link>

            {/* Next */}
            <Link
              href={`/projects/${nextProject.slug}`}
              className="group flex items-center gap-4 p-4 px-6 rounded-2xl bg-red-500/[0.03] border border-red-500/20 hover:border-red-500/40 hover:bg-red-500/[0.06] transition-all duration-300 min-w-[200px]"
            >
              <div className="text-left flex-1">
                <p className="text-[10px] font-mono uppercase tracking-widest text-red-500/60 font-bold">
                  Next
                </p>
                <p className="text-sm font-bold text-white group-hover:text-red-300 transition-colors truncate">
                  {nextProject.name}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-red-400 group-hover:translate-x-1 transition-transform duration-300 shrink-0" />
            </Link>
          </div>
        </FadeSection>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/* ─── TECH STACK CARD COMPONENT                               ─── */
/* ═══════════════════════════════════════════════════════════════ */

function TechStackCard({
  group,
  index,
}: {
  group: { category: string; items: string[] };
  index: number;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="group relative overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-7 backdrop-blur-sm hover:border-red-500/25 hover:bg-red-500/[0.015] transition-all duration-500"
    >
      {/* Watermark */}
      <span className="absolute bottom-[-12px] right-3 text-7xl font-black text-white/[0.02] select-none pointer-events-none tracking-tighter group-hover:text-white/[0.04] transition-all duration-500">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Category Header */}
      <div className="flex items-center gap-3 mb-5 relative z-10">
        <div className="w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
          <Code2 className="w-4 h-4 text-red-400" />
        </div>
        <h3 className="text-base font-extrabold text-white tracking-tight">
          {group.category}
        </h3>
      </div>

      {/* Tech Chips */}
      <div className="relative z-10 flex flex-wrap gap-2">
        {group.items.map((tech) => (
          <TechChip key={tech} name={tech} />
        ))}
      </div>
    </motion.div>
  );
}

function TechChip({ name }: { name: string }) {
  const { icon, color } = getSkillMeta(name);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -2, scale: 1.03 }}
      transition={{ duration: 0.2 }}
      style={{
        borderColor: isHovered ? color : undefined,
        boxShadow: isHovered ? `0 0 12px ${color}` : "none",
      }}
      className={cn(
        "flex items-center gap-2 rounded-xl border px-3 py-1.5 text-xs font-semibold select-none cursor-default transition-all duration-300",
        "text-neutral-300 border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06]"
      )}
    >
      <div className="flex h-4 w-4 items-center justify-center shrink-0">
        {icon}
      </div>
      <span>{name}</span>
    </motion.div>
  );
}
