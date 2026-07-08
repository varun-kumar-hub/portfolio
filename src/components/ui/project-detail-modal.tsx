"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { X, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Github } from "@/components/icons/BrandIcons";

interface Project {
  name: string;
  description: string;
  longDescription?: string;
  details: string[];
  stack: { category: string; items: string[] }[];
  github: string;
  live: string;
}

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectDetailModal({
  project,
  onClose,
}: ProjectDetailModalProps) {
  // Listen for escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Modal Container */}
      <motion.div
        className="relative z-10 w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row overflow-hidden rounded-3xl border border-gray-200/50 bg-white/95 dark:border-gray-800/50 dark:bg-gray-950/95 shadow-2xl text-left"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", duration: 0.5 }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 rounded-full border border-gray-200/55 bg-white/80 p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800 dark:border-gray-885/50 dark:bg-gray-900/80 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200 cursor-pointer"
          aria-label="Close details"
        >
          <X size={18} />
        </button>

        {/* Left Section: Visual Preview & Stack Info */}
        <div className="w-full md:w-[45%] bg-gray-50/50 dark:bg-gray-900/20 border-r border-gray-100 dark:border-gray-900/50 flex flex-col justify-between p-6 sm:p-8">
          <div>
            {/* Visual Frame */}
            <div className="flex aspect-[16/10] items-center justify-center rounded-xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-gray-900 shadow-inner overflow-hidden mb-6">
              {/* Custom mock browser inside the modal */}
              <div className="w-[85%] rounded-md border border-gray-200 bg-white p-3.5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <div className="mb-2.5 flex items-center gap-1.5 border-b border-gray-100 pb-2 dark:border-gray-700">
                  <span className="h-2 w-2 rounded-full bg-red-400" />
                  <span className="h-2 w-2 rounded-full bg-yellow-400" />
                  <span className="h-2 w-2 rounded-full bg-green-400" />
                </div>
                <div className="space-y-2">
                  <div className="h-2.5 w-1/3 rounded-full bg-gray-900 dark:bg-gray-200" />
                  <div className="h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-600" />
                  <div className="h-1.5 w-5/6 rounded-full bg-gray-200 dark:bg-gray-600" />
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <div className="h-6 rounded border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/60" />
                    <div className="h-6 rounded border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/60" />
                  </div>
                </div>
              </div>
            </div>

            {/* Tech Stack Heading */}
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4">
              Technologies Used
            </h4>
            <div className="space-y-4">
              {project.stack.map((group) => (
                <div key={group.category}>
                  <h5 className="text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                    {group.category}
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((tech) => (
                      <span
                        key={tech}
                        className="rounded bg-gray-100 dark:bg-gray-900 px-2 py-0.5 text-[10px] font-semibold text-gray-700 dark:text-gray-300 border border-gray-200/40 dark:border-gray-800/40"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="hidden md:block mt-6 pt-4 border-t border-gray-150 dark:border-gray-800/50 text-[11px] text-gray-400 dark:text-gray-500">
            Press Esc or click backdrop to close
          </div>
        </div>

        {/* Right Section: Details & Long Description */}
        <div className="flex-1 flex flex-col justify-between p-6 sm:p-8 md:p-10 overflow-y-auto max-h-[50vh] md:max-h-[90vh]">
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-950 dark:text-white mb-4 pr-6">
              {project.name}
            </h3>
            
            {/* Long Description */}
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300 mb-6">
              {project.longDescription || project.description}
            </p>

            {/* Bullet Points */}
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">
              Key Achievements & Features
            </h4>
            <ul className="space-y-3 mb-8">
              {project.details.map((detail, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-300">
                  <CheckCircle2 size={16} className="mt-0.5 text-[var(--accent)] shrink-0" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Links */}
          <div className="pt-6 border-t border-gray-100 dark:border-gray-800/60 flex flex-wrap items-center gap-3">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-800 transition hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800 shrink-0 cursor-pointer"
            >
              GitHub Code
              <Github size={16} />
            </a>

            {project.live && (
              <a
                href={project.live}
                target={project.live === "#" ? undefined : "_blank"}
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center gap-1.5 rounded-lg px-5 py-2.5 text-sm font-semibold transition shrink-0 ${
                  project.live === "#"
                    ? "bg-gray-150 dark:bg-gray-900 text-gray-400 dark:text-gray-600 border border-gray-250/20 dark:border-gray-800/40 cursor-not-allowed pointer-events-none select-none"
                    : "bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] hover:shadow-[0_0_15px_var(--accent-glow)] cursor-pointer"
                }`}
              >
                Launch Live Demo
                <ArrowUpRight size={16} />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
