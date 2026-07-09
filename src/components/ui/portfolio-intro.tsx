"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, Variants } from "framer-motion";
import { Lightning } from "@/components/ui/hero-odyssey";

interface PortfolioIntroProps {
  onEnter: () => void;
  onProgressChange: (progress: number) => void;
}

export function PortfolioIntro({ onEnter, onProgressChange }: PortfolioIntroProps) {
  const [progress, setProgress] = useState(0);
  const [isPressing, setIsPressing] = useState(false);
  const lightningHue = 220; // Pure electric sapphire blue
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

  // Animation Loop (Synchronized with Hold Progress)
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
        (window as unknown as { holdProgress: number }).holdProgress = current;
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

  // Easing function for text fade-in (creates a cinematic delay)
  const textOpacity = Math.max(0, (progress - 0.15) / 0.85);
  const tagOpacity = Math.pow(textOpacity, 1.8);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -40, scale: 0.98 }}
      transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
      onMouseDown={handleStart}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={handleStart}
      onTouchEnd={handleEnd}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white cursor-pointer select-none"
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none">
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/90"></div>

        {/* Ambient Glow centered behind the planet - Reactive to progress */}
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px] transition-all duration-300"
          style={{
            opacity: 0.12 + progress * 0.48,
            width: `${700 + progress * 600}px`,
            height: `${700 + progress * 600}px`,
            background: `radial-gradient(circle, hsla(${lightningHue}, 75%, 55%, 0.18) 0%, hsla(${lightningHue}, 60%, 45%, 0.06) 50%, transparent 100%)`,
          }}
        />

        {/* Central WebGL Lightning Canvas - Speed, intensity and size reactive to progress to spread out */}
        <div className="absolute top-0 w-full left-1/2 transform -translate-x-1/2 h-full">
          <Lightning
            hue={lightningHue}
            xOffset={0}
            speed={0.4 + progress * 2.2}
            intensity={0.08 + progress * 1.62}
            size={1.8 - progress * 1.4}
          />
        </div>

        {/* Planet/Sphere core centered in the background */}
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[320px] md:w-[500px] h-[320px] md:h-[500px] rounded-full border border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.3)] transition-all duration-300"
          style={{
            background: `radial-gradient(circle at 35% 25%, hsl(${lightningHue}, 40%, ${10 + progress * 8}%) 0%, #050508ee 60%, #000000 100%)`,
          }}
        />
      </div>

      {/* Main UI Overlay */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center select-none w-full h-full flex flex-col items-center justify-between py-12 md:py-16">
        
        {/* Top Spacer */}
        <div className="h-10" />

        {/* Middle content: Name & Tagline + Hold Button */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center justify-center space-y-8 w-full"
        >
          {/* Header titles & Tagline grouped inside a single container to prevent Framer Motion override */}
          <div 
            className="space-y-8 flex flex-col items-center justify-center transition-all duration-150"
            style={{ 
              opacity: tagOpacity, 
              transform: `scale(${0.96 + 0.04 * progress})` 
            }}
          >
            {/* Header titles */}
            <div className="space-y-4">
              <motion.h1
                variants={itemVariants}
                className="text-5xl sm:text-7xl font-extralight tracking-tight text-white"
              >
                C. Varun Kumar
              </motion.h1>

              <motion.div
                variants={itemVariants}
                className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-gray-400"
              >
                <span>Tech Innovator</span>
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: `hsl(${lightningHue}, 85%, 65%)` }} />
                <span>AI & Machine Learning Enthusiast</span>
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: `hsl(${lightningHue}, 85%, 65%)` }} />
                <span>Full Stack Developer</span>
              </motion.div>
            </div>

            {/* Tagline */}
            <p className="text-base sm:text-lg text-gray-400 max-w-xl font-light leading-relaxed tracking-wide">
              &ldquo;Transforming ideas into intelligent digital experiences through innovation, creativity, and code.&rdquo;
            </p>
          </div>

        </motion.div>

        {/* Bottom content: Interactive Mainframe Boot Status */}
        <div 
          className="h-10 text-[10px] font-bold uppercase tracking-[0.25em] transition-all duration-150 flex flex-col items-center justify-center select-none pointer-events-none gap-2"
          style={{ 
            opacity: 0.35 + progress * 0.65,
            color: progress === 0 ? "rgba(156, 163, 175, 0.6)" : `hsl(${lightningHue}, 85%, 65%)`
          }}
        >
          {progress === 0 ? (
            <span className="animate-pulse">Press and hold anywhere to unlock</span>
          ) : (
            <span className="font-extrabold">Syncing Quantum Core: {Math.round(progress * 100)}%</span>
          )}
        </div>

      </div>
    </motion.div>
  );
}
