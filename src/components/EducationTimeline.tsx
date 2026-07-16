"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { GraduationCap, Calendar, MapPin, Award, CheckCircle2 } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { education } from "@/lib/education";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants: Variants = {
  hidden: { x: 30, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 15
    }
  }
};

export default function EducationTimeline() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-2">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="relative border-l border-gray-200/60 dark:border-gray-800/60 ml-4 sm:ml-6 pl-8 sm:pl-10 space-y-12"
      >
        {education.map((item, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            className="relative"
          >
            {/* Timeline Milestone Node */}
            <span className="absolute -left-[49px] sm:-left-[57px] top-1.5 flex h-9 w-9 items-center justify-center rounded-full bg-white dark:bg-gray-950 border-2 border-[var(--accent)] text-[var(--accent)] shadow-md shadow-[var(--accent-glow)] z-10">
              <GraduationCap className="w-4.5 h-4.5" />
              {idx === 0 && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-20"></span>
              )}
            </span>

            {/* Timeline Card */}
            <SpotlightCard className="relative overflow-hidden rounded-3xl border border-gray-200/40 bg-white/30 p-6 sm:p-8 dark:border-gray-800/30 dark:bg-black/15 backdrop-blur-md transition-all duration-300 hover:shadow-xl hover:border-gray-300 dark:hover:border-gray-700/80 group">
              
              {/* Top Row: Degree & Duration */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                    {item.degree}
                  </h3>
                  <p className="text-sm font-bold text-[var(--accent)] mt-1 tracking-wide">
                    {item.institution}
                  </p>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-0.5">
                    {item.specialization}
                  </p>
                </div>
                
                {/* Score Badge */}
                <div className="inline-flex items-center gap-1.5 rounded-full bg-[var(--accent-glow)] px-3.5 py-1.5 text-xs font-bold text-[var(--accent)] md:self-center">
                  <Award className="w-3.5 h-3.5" />
                  <span>{item.score}</span>
                </div>
              </div>

              {/* Meta Details Row */}
              <div className="flex flex-wrap gap-x-5 gap-y-2 mb-6 text-xs font-semibold text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-900 pb-4">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  <span>{item.duration}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  <span>{item.location}</span>
                </div>
              </div>

              {/* Highlights Bullet List */}
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">
                  Academic Focus & Key Takeaways
                </h4>
                <ul className="space-y-2.5">
                  {item.highlights.map((bullet, bulletIdx) => (
                    <li key={bulletIdx} className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </SpotlightCard>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
