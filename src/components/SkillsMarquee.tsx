"use client";

import React, { useState } from "react";
import { getSkillMeta } from "./icons/SkillIcons";
import { cn } from "@/lib/utils";

const row1Skills = [
  "React",
  "Next.js",
  "Tailwind CSS",
  "Node.js",
  "Java",
  "Python",
  "C Programming",
  "HTML5",
  "CSS3",
];

const row2Skills = [
  "PostgreSQL",
  "Supabase",
  "Relational Databases",
  "Big Data",
  "Data Warehousing",
  "Git",
  "GitHub",
  "Docker",
  "CI/CD Pipelines",
  "Artificial Intelligence (AI)",
  "Machine Learning (ML)",
  "Internet of Things (IoT)",
];

interface SkillCardProps {
  name: string;
  uniqueId: string;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
}

function SkillCard({ name, uniqueId, hoveredId, setHoveredId }: SkillCardProps) {
  const { icon, color } = getSkillMeta(name);
  const isHovered = hoveredId === uniqueId;

  return (
    <div
      onMouseEnter={() => setHoveredId(uniqueId)}
      onMouseLeave={() => setHoveredId(null)}
      style={{
        borderColor: isHovered ? color : "var(--border-color, rgba(229, 231, 235, 0.5))",
        boxShadow: isHovered ? `0 0 25px ${color}` : "none",
      }}
      className={cn(
        "flex items-center gap-3 rounded-2xl border border-gray-200/50 bg-white/70 px-6 py-4 text-base font-semibold text-gray-800 transition-all duration-300 hover:-translate-y-1 dark:border-gray-800/40 dark:bg-gray-900/40 dark:text-gray-200 select-none cursor-default",
        isHovered
          ? "bg-white dark:bg-gray-900/80 border-opacity-100"
          : "hover:border-gray-300 dark:hover:border-gray-700"
      )}
    >
      <div className="flex h-7 w-7 items-center justify-center shrink-0 transition-transform duration-300">
        {icon}
      </div>
      <span>{name}</span>
    </div>
  );
}

export default function SkillsMarquee() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Duplicating the lists multiple times ensures the track is wider than any screen, preventing empty gaps
  const row1 = [...row1Skills, ...row1Skills, ...row1Skills, ...row1Skills];
  const row2 = [...row2Skills, ...row2Skills, ...row2Skills, ...row2Skills];

  return (
    <div className="relative w-full overflow-hidden py-10 marquee-container">
      {/* Glow Effect / Gradient Fade Overlays */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white via-white/80 to-transparent dark:from-[#0a0a0a] dark:via-[#0a0a0a]/80" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white via-white/80 to-transparent dark:from-[#0a0a0a] dark:via-[#0a0a0a]/80" />

      <div className="space-y-8">
        {/* Row 1: Right to Left */}
        <div className="relative flex w-full overflow-hidden py-1">
          <div className="animate-marquee flex gap-5 whitespace-nowrap">
            {row1.map((skill, idx) => {
              const uniqueId = `row1-${skill}-${idx}`;
              return (
                <SkillCard
                  key={uniqueId}
                  name={skill}
                  uniqueId={uniqueId}
                  hoveredId={hoveredId}
                  setHoveredId={setHoveredId}
                />
              );
            })}
          </div>
        </div>

        {/* Row 2: Left to Right */}
        <div className="relative flex w-full overflow-hidden py-1">
          <div className="animate-marquee-reverse flex gap-5 whitespace-nowrap">
            {row2.map((skill, idx) => {
              const uniqueId = `row2-${skill}-${idx}`;
              return (
                <SkillCard
                  key={uniqueId}
                  name={skill}
                  uniqueId={uniqueId}
                  hoveredId={hoveredId}
                  setHoveredId={setHoveredId}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
