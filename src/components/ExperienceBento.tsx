"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Monitor, Shield, Users, Briefcase, Calendar, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { MotionSpotlightCard } from "@/components/ui/spotlight-card";

// Experience breakdown data
const contributionCards = [
  {
    title: "Frontend Optimization",
    subtitle: "React & Tailwind Performance",
    icon: <Monitor className="w-5 h-5 text-blue-500" />,
    details: "Optimized performance for 3+ secure web applications, reducing page load times by 20% using React and Tailwind CSS. Engineered responsive, accessible UI elements for 500+ student chapter members.",
    tag: "Performance",
    glowColor: "rgba(59, 130, 246, 0.08)",
  },
  {
    title: "Security Workshops",
    subtitle: "OWASP Top 10 & Secure Coding",
    icon: <Shield className="w-5 h-5 text-emerald-500" />,
    details: "Spearheaded web security awareness campaigns. Educated the student community on OWASP Top 10 vulnerabilities, mitigation patterns, and defensive programming standards.",
    tag: "Web Security",
    glowColor: "rgba(16, 185, 129, 0.08)",
  },
  {
    title: "Technical Coordination",
    subtitle: "Logistics & Exam Operations",
    icon: <Users className="w-5 h-5 text-indigo-500" />,
    details: "Coordinated logistics and operations for large-scale technical assessments. Structured venue mapping, system checks, and exam operations to deliver 100% smooth event delivery.",
    tag: "Leadership",
    glowColor: "rgba(99, 102, 241, 0.08)",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 15,
    },
  },
};

export default function ExperienceBento() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6 py-12 max-w-5xl mx-auto"
    >
      {/* 1. Main Executive Summary Card - Spans all 3 columns */}
      <MotionSpotlightCard
        variants={cardVariants}
        whileHover={{ y: -3 }}
        transition={{ duration: 0.3 }}
        className="relative md:col-span-3 overflow-hidden rounded-3xl border border-gray-200/40 bg-white/30 p-6 sm:p-8 dark:border-gray-800/30 dark:bg-black/15 backdrop-blur-md flex flex-col md:flex-row justify-between gap-6 group hover:border-gray-300 dark:hover:border-gray-700/80"
      >
        <div className="flex-1 text-left space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/80 dark:bg-gray-950/80 border border-gray-200/40 dark:border-gray-800/40 shadow-sm shrink-0">
              <Briefcase className="w-5 h-5 text-[var(--accent)]" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                Web Development Team Member
              </h3>
              <p className="text-sm font-bold text-[var(--accent)] tracking-wide">
                OWASP Student Chapter
              </p>
            </div>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-300 font-medium leading-relaxed max-w-3xl">
            Contributing to the campus tech ecosystem by designing secure, accessible, and fast web applications under the OWASP Student Chapter. Driving both engineering efforts and educational initiatives to raise web standards across the campus.
          </p>
        </div>

        {/* Metadata Details Right Side */}
        <div className="flex flex-col justify-center gap-3 md:items-end text-xs font-semibold text-gray-400 dark:text-gray-500 border-t md:border-t-0 md:border-l border-gray-100 dark:border-gray-950 pt-4 md:pt-0 md:pl-8 shrink-0">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>Aug 2024 - Present</span>
          </div>
          <div className="flex items-center gap-1.5 md:text-right">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span>Krishnankoil, TN, India</span>
          </div>
        </div>
      </MotionSpotlightCard>

      {/* 2. Specialized Contribution Cards - 1 column each */}
      {contributionCards.map((card, idx) => (
        <MotionSpotlightCard
          key={idx}
          variants={cardVariants}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3 }}
          style={{
            // Radial highlight centered on the card
            backgroundImage: `radial-gradient(280px circle at 50% 30%, ${card.glowColor}, transparent 80%)`,
          }}
          className={cn(
            "relative overflow-hidden rounded-3xl border border-gray-200/40 bg-white/30 p-6 sm:p-8 dark:border-gray-800/30 dark:bg-black/15 backdrop-blur-md flex flex-col justify-between hover:shadow-2xl hover:shadow-gray-200/5 dark:hover:shadow-none hover:border-gray-350 dark:hover:border-gray-700/80 group text-left"
          )}
        >
          {/* Card Head */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/80 dark:bg-gray-950/80 border border-gray-200/40 dark:border-gray-800/40 shadow-sm shrink-0 transition-transform duration-300 group-hover:scale-105">
                {card.icon}
              </div>
              <span className="rounded-full bg-[var(--accent-glow)] px-3 py-1 text-[10px] font-bold text-[var(--accent)] select-none">
                {card.tag}
              </span>
            </div>
            
            <h4 className="text-base font-extrabold text-gray-900 dark:text-white tracking-tight">
              {card.title}
            </h4>
            <p className="text-[11px] font-bold text-gray-400 dark:text-gray-500 mb-4 uppercase tracking-wider">
              {card.subtitle}
            </p>
          </div>

          {/* Details body */}
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
            {card.details}
          </p>
        </MotionSpotlightCard>
      ))}
    </motion.div>
  );
}
