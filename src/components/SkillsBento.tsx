"use client";

import React, { useState, useRef } from "react";
import { motion, Variants } from "framer-motion";
import { Monitor, Server, Terminal, Brain, GitBranch } from "lucide-react";
import { getSkillMeta } from "./icons/SkillIcons";
import { cn } from "@/lib/utils";

// Categorized skills data
const skillCategories = [
  {
    title: "Frontend Development",
    icon: <Monitor className="w-5 h-5 text-blue-500" />,
    colSpan: "md:col-span-3",
    description: "Building responsive, modern, and fluid interfaces with smooth client-side interactions.",
    skills: ["React", "Next.js", "Tailwind CSS", "HTML5", "CSS3"],
    glowColor: "rgba(59, 130, 246, 0.07)",
  },
  {
    title: "Backend & Databases",
    icon: <Server className="w-5 h-5 text-emerald-500" />,
    colSpan: "md:col-span-3",
    description: "Designing structured relational databases, cloud synchronization pipelines, and robust APIs.",
    skills: ["Node.js", "PostgreSQL", "Supabase", "Relational Databases", "Big Data", "Data Warehousing"],
    glowColor: "rgba(16, 185, 129, 0.07)",
  },
  {
    title: "Programming Languages",
    icon: <Terminal className="w-5 h-5 text-indigo-500" />,
    colSpan: "md:col-span-2",
    description: "Writing compiled and interpreted high-performance systems logic.",
    skills: ["Python", "Java", "C Programming"],
    glowColor: "rgba(99, 102, 241, 0.07)",
  },
  {
    title: "AI & IoT Engineering",
    icon: <Brain className="w-5 h-5 text-purple-500" />,
    colSpan: "md:col-span-2",
    description: "Autonomous agent pipelines, semantic search engines, and integrated hardware networks.",
    skills: ["Artificial Intelligence (AI)", "Machine Learning (ML)", "Internet of Things (IoT)"],
    glowColor: "rgba(168, 85, 247, 0.07)",
  },
  {
    title: "DevOps & Tooling",
    icon: <GitBranch className="w-5 h-5 text-amber-500" />,
    colSpan: "md:col-span-2",
    description: "Continuous integration pipelines, version control workflows, and container runtimes.",
    skills: ["Git", "GitHub", "Docker", "CI/CD Pipelines"],
    glowColor: "rgba(245, 158, 11, 0.07)",
  },
];

const cardVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

interface SkillChipProps {
  name: string;
}

function SkillChip({ name }: SkillChipProps) {
  const { icon, color } = getSkillMeta(name);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -2, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      style={{
        borderColor: isHovered ? color : "rgba(229, 231, 235, 0.2)",
        boxShadow: isHovered ? `0 0 16px ${color}` : "none",
        backgroundColor: isHovered ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0.25)",
      }}
      className={cn(
        "flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold select-none cursor-default transition-all duration-300",
        "text-gray-800 dark:text-gray-200 border-gray-200/20 dark:border-gray-800/20 dark:bg-gray-900/10 dark:hover:bg-gray-900/40"
      )}
    >
      <div className="flex h-5 w-5 items-center justify-center shrink-0 transition-transform duration-300">
        {icon}
      </div>
      <span>{name}</span>
    </motion.div>
  );
}

interface BentoCardProps {
  category: typeof skillCategories[number];
  index: number;
}

function BentoCard({ category, index }: BentoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
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

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      variants={cardVariants}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      style={{
        backgroundImage: isHovered
          ? `radial-gradient(320px circle at ${coords.x}px ${coords.y}px, ${category.glowColor}, transparent 80%)`
          : undefined,
      }}
      className={cn(
        "relative overflow-hidden rounded-3xl border border-gray-200/40 bg-white/30 p-6 sm:p-8 dark:border-gray-800/30 dark:bg-black/15 backdrop-blur-md flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-gray-200/5 dark:hover:shadow-none hover:border-gray-300 dark:hover:border-gray-700/80 group",
        category.colSpan
      )}
    >
      {/* Decorative Large Index Number */}
      <div className="absolute bottom-[-16px] right-2 text-8xl font-black text-gray-900/[0.03] dark:text-white/[0.03] select-none pointer-events-none font-sans tracking-tighter transition-all duration-300 group-hover:scale-105 group-hover:text-gray-900/[0.05] dark:group-hover:text-white/[0.05]">
        0{index + 1}
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_60%,rgba(0,0,0,0.015))] dark:bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0)_60%,rgba(255,255,255,0.008))] pointer-events-none" />

      <div className="relative z-10">
        {/* Category Header */}
        <div className="flex items-center gap-3.5 mb-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/80 dark:bg-gray-950/80 border border-gray-200/40 dark:border-gray-800/40 shadow-sm shrink-0 transition-transform duration-300 group-hover:scale-105">
            {category.icon}
          </div>
          <h3 className="text-lg font-extrabold text-gray-900 dark:text-white tracking-tight">
            {category.title}
          </h3>
        </div>
        
        <p className="text-xs text-gray-400 dark:text-gray-500 font-medium mb-6 max-w-xs leading-relaxed">
          {category.description}
        </p>
      </div>

      {/* Skills Grid */}
      <div className="relative z-10 flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <SkillChip key={skill} name={skill} />
        ))}
      </div>
    </motion.div>
  );
}

export default function SkillsBento() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
      className="grid grid-cols-1 md:grid-cols-6 gap-6 py-12"
    >
      {skillCategories.map((category, index) => (
        <BentoCard key={index} category={category} index={index} />
      ))}
    </motion.div>
  );
}
