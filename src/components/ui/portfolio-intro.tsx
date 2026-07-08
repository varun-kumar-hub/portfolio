"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

interface PortfolioIntroProps {
  onEnter: () => void;
  onProgressChange: (progress: number) => void;
}

export function PortfolioIntro({ onEnter, onProgressChange }: PortfolioIntroProps) {
  const [progress, setProgress] = useState(0);
  const [isPressing, setIsPressing] = useState(false);
  const progressRef = useRef(0);
  const pressingRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  // Sync state values to refs for the animation loop
  useEffect(() => {
    pressingRef.current = isPressing;
  }, [isPressing]);

  useEffect(() => {
    onProgressChange(progress);
  }, [progress, onProgressChange]);

  // Press & Hold Loop
  useEffect(() => {
    const loop = (timestamp: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = timestamp;
      }
      const delta = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      let current = progressRef.current;
      if (pressingRef.current) {
        // Increment progress over 1.4 seconds
        current += delta / 1400;
        if (current >= 1) {
          current = 1;
          setProgress(1);
          progressRef.current = 1;
          onEnter(); // Completed hold! Trigger entry!
          return;
        }
      } else {
        // Decrement progress (smooth return) over 800ms
        current -= delta / 800;
        if (current < 0) {
          current = 0;
        }
      }

      progressRef.current = current;
      setProgress(current);
      document.documentElement.style.setProperty("--hold-progress", current.toString());
      if (typeof window !== "undefined") {
        (window as any).holdProgress = current;
      }
      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animationFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [onEnter]);

  const handleStart = () => {
    lastTimeRef.current = null;
    setIsPressing(true);
  };

  const handleEnd = () => {
    lastTimeRef.current = null;
    setIsPressing(false);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.35,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1], // easeOutExpo
      },
    },
  };

  // Circular progress calculations
  const radius = 38;
  const strokeWidth = 3;
  const circumference = 2 * Math.PI * radius; // ~238.76
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -40, scale: 0.98 }}
      transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-transparent text-gray-950 dark:text-white"
    >
      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center select-none">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center justify-center space-y-8"
        >
          {/* Header titles */}
          <div className="space-y-4">
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-7xl font-extralight tracking-tight text-gray-950 dark:text-white"
            >
              C. Varun Kumar
            </motion.h1>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500"
            >
              <span>Tech Innovator</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] opacity-60" />
              <span>AI & Machine Learning Enthusiast</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] opacity-60" />
              <span>Full Stack Developer</span>
            </motion.div>
          </div>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-gray-400 dark:text-gray-500 max-w-xl font-light leading-relaxed tracking-wide"
          >
            "Transforming ideas into intelligent digital experiences through innovation, creativity, and code."
          </motion.p>

          {/* Press and Hold Interactive Unlock button */}
          <motion.div variants={itemVariants} className="pt-6 relative flex items-center justify-center">
            {/* SVG Progress Ring surrounding the button */}
            <svg className="absolute w-28 h-28 transform -rotate-90 pointer-events-none" viewBox="0 0 100 100">
              {/* Static Background circle */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                className="stroke-gray-100 dark:stroke-gray-900 fill-none"
                strokeWidth={strokeWidth}
              />
              {/* Dynamic Progress circle */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                className="stroke-[var(--accent)] fill-none transition-all duration-75"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>

            {/* Glowing Backdrop reactive to hold progress */}
            <div
              className="absolute w-20 h-20 rounded-full bg-[var(--accent)] opacity-0 blur-xl pointer-events-none transition-all duration-200"
              style={{
                opacity: progress * 0.45,
                transform: `scale(${1 + progress * 0.45})`,
                boxShadow: `0 0 30px hsla(220, 80%, 60%, ${progress})`,
              }}
            />

            {/* Interactive Pill Button */}
            <button
              onMouseDown={handleStart}
              onMouseUp={handleEnd}
              onMouseLeave={handleEnd}
              onTouchStart={handleStart}
              onTouchEnd={handleEnd}
              className={`relative z-10 flex flex-col items-center justify-center w-20 h-20 rounded-full font-bold text-xs tracking-wider transition-all duration-300 select-none cursor-pointer outline-none border ${
                isPressing
                  ? "bg-[var(--accent)] border-transparent text-white scale-[1.05]"
                  : "bg-white border-gray-200/60 dark:bg-black/30 dark:border-gray-800 text-gray-800 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-700"
              }`}
              style={{
                boxShadow: isPressing
                  ? "0 4px 20px hsla(220, 80%, 60%, 0.3)"
                  : "0 2px 10px rgba(0, 0, 0, 0.05)",
              }}
            >
              <span>HOLD</span>
              <span className="text-[10px] font-medium opacity-65 mt-0.5">
                {Math.round(progress * 100)}%
              </span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
