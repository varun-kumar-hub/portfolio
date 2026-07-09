"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress percentage
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
      
      // Show button after scrolling down 50% of the viewport height
      setIsVisible(window.scrollY > window.innerHeight * 0.5);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on mount to handle initial load/refresh states
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // SVG Circle geometry config: Radius = 19, Circumference = 2 * PI * 19 = 119.38
  const radius = 19;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.75, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.75, y: 15 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-gray-200/40 bg-white/80 text-gray-700 shadow-[0_4px_20px_rgba(0,0,0,0.06)] backdrop-blur-md transition-all duration-300 hover:bg-white hover:shadow-[0_0_22px_var(--accent-glow)] hover:border-[var(--accent)]/40 hover:text-[var(--accent)] dark:border-gray-800/40 dark:bg-gray-950/80 dark:text-gray-300 dark:hover:bg-gray-900/90 dark:hover:text-[var(--accent)] cursor-pointer group"
          aria-label="Scroll to top"
        >
          {/* Circular SVG scroll progress indicator */}
          <svg className="absolute -rotate-90 w-full h-full p-[1px] pointer-events-none" viewBox="0 0 44 44">
            {/* Background ring */}
            <circle
              cx="22"
              cy="22"
              r={radius}
              className="stroke-gray-200/20 dark:stroke-gray-800/30 fill-none"
              strokeWidth="2.2"
            />
            {/* Active glowing progress ring */}
            <circle
              cx="22"
              cy="22"
              r={radius}
              className="stroke-[var(--accent)] fill-none transition-all duration-75"
              strokeWidth="2.2"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>

          {/* Micro-animated Arrow Icon */}
          <div className="relative overflow-hidden w-4 h-4 flex items-center justify-center">
            <motion.div
              className="flex flex-col items-center justify-center absolute transition-transform duration-300 group-hover:-translate-y-[100%]"
              style={{ height: "200%" }}
            >
              {/* Lower arrow (enters from bottom on hover) */}
              <div className="h-4 flex items-center justify-center">
                <ArrowUp size={16} strokeWidth={2.5} />
              </div>
              {/* Upper arrow (exits to top on hover) */}
              <div className="h-4 flex items-center justify-center">
                <ArrowUp size={16} strokeWidth={2.5} />
              </div>
            </motion.div>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
