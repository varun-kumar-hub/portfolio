"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  ExternalLink, 
  Code2, 
  Award, 
  Layers, 
  Sparkles,
  CheckCircle2,
  Calendar,
  User,
  Compass
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
  const [activeTab, setActiveTab] = useState<"overview" | "features" | "tech">("overview");

  useEffect(() => {
    if (slug) {
      const found = projects.find((p) => p.slug === slug);
      if (found) {
        setProject(found);
      } else {
        // If project not found, redirect to home
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

  const tabVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.25 } }
  };

  return (
    <>
      {/* Custom cursor animation */}
      <CustomCursor />

      {/* Space Starfield Sibling Background */}
      <SpaceBackground />

      <main className="relative z-10 min-h-screen text-gray-100 py-16 px-5 sm:px-8 max-w-5xl mx-auto flex flex-col justify-center">
        
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/?entered=true#projects"
            scroll={false}
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-white transition-colors duration-300 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Projects
          </Link>
        </div>

        {/* Card details wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl border border-gray-800/80 bg-black/60 backdrop-blur-md overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] p-5 sm:p-8"
        >
          {/* Header row */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-gray-800/80">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-500 font-bold">Featured Case Study</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-none">
                {project.name}
              </h1>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-700 bg-neutral-900/50 hover:bg-neutral-800 hover:border-gray-600 font-bold text-xs uppercase tracking-wider text-gray-300 hover:text-white transition-all duration-300 cursor-pointer"
              >
                <Github className="w-4 h-4" />
                Source Code
              </a>
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 font-bold text-xs uppercase tracking-wider text-white transition-all duration-300 shadow-[0_0_15px_rgba(59,130,246,0.15)] hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </a>
              )}
            </div>
          </div>

          {/* Media / Image grid */}
          <div className="relative aspect-[21/9] w-full rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-900 my-8 shadow-[0_0_30px_rgba(0,0,0,0.4)]">
            <div className="absolute inset-0 opacity-25">
              <Image 
                src={project.image} 
                alt={`${project.name} background`} 
                className="w-full h-full object-cover blur-lg scale-110"
                width={1000}
                height={500}
                unoptimized
              />
            </div>
            <div className="relative z-10 w-full h-full p-2.5">
              <Image 
                src={project.image} 
                alt={project.name} 
                className="rounded-xl w-full h-full object-cover"
                width={1000}
                height={500}
                unoptimized
              />
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-gray-800/80 mb-6">
            {[
              { id: "overview", label: "Overview", icon: <Compass className="w-4 h-4" /> },
              { id: "features", label: "Achievements", icon: <Award className="w-4 h-4" /> },
              { id: "tech", label: "Tech Stack", icon: <Layers className="w-4 h-4" /> }
            ].map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-6 py-3 border-b-2 font-bold text-sm tracking-wide transition-all duration-300 relative cursor-pointer
                    ${active 
                      ? "border-blue-500 text-blue-400 font-extrabold" 
                      : "border-transparent text-gray-400 hover:text-gray-200"
                    }`}
                >
                  {tab.icon}
                  {tab.label}
                  {active && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Tab Content Panels */}
          <div className="min-h-[220px]">
            <AnimatePresence mode="wait">
              {activeTab === "overview" && (
                <motion.div
                  key="overview"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={tabVariants}
                  className="space-y-4 text-gray-300 text-sm leading-relaxed"
                >
                  <p className="font-light">{project.longDescription}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-800/60 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-lg bg-neutral-900/50 border border-gray-800 text-neutral-400">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-neutral-500 font-bold uppercase tracking-wider">Timeline</p>
                        <p className="text-white font-medium">Completed Case</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-lg bg-neutral-900/50 border border-gray-800 text-neutral-400">
                        <User className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-neutral-500 font-bold uppercase tracking-wider">Contribution</p>
                        <p className="text-white font-medium">Sole Architect / Engineer</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "features" && (
                <motion.div
                  key="features"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={tabVariants}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-400" />
                    Key Milestones & Engineering Deliverables
                  </h3>
                  <ul className="space-y-3.5">
                    {project.details.map((detail, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.08 }}
                        className="flex items-start gap-3 text-sm text-gray-300 leading-relaxed font-light"
                      >
                        <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                        <span>{detail}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {activeTab === "tech" && (
                <motion.div
                  key="tech"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={tabVariants}
                  className="space-y-6"
                >
                  {project.stack.map((group, gIdx) => (
                    <div key={gIdx} className="space-y-2">
                      <h4 className="text-xs uppercase font-mono font-bold tracking-widest text-neutral-500 flex items-center gap-1.5">
                        <Code2 className="w-3.5 h-3.5" />
                        {group.category}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {group.items.map((tech, idx) => (
                          <motion.span
                            key={tech}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.03 }}
                            className="rounded-full bg-blue-500/5 border border-blue-500/10 px-3.5 py-1 text-xs font-semibold text-blue-300/80 backdrop-blur-sm shadow-[0_0_10px_rgba(59,130,246,0.02)]"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </main>
    </>
  );
}
