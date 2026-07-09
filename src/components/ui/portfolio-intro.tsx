"use client";

import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { Lightning } from "@/components/ui/hero-odyssey";

interface PortfolioIntroProps {
  onEnter: () => void;
  onProgressChange: (progress: number) => void;
}

export function PortfolioIntro({ onEnter, onProgressChange }: PortfolioIntroProps) {
  const [progress, setProgress] = useState(0);
  const [isPressing, setIsPressing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const lightningHue = 220; // Pure electric sapphire blue
  const progressRef = useRef(0);
  const pressingRef = useRef(false);
  const completedRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  // Sync state values to refs for the animation loop
  useEffect(() => {
    pressingRef.current = isPressing;
  }, [isPressing]);

  useEffect(() => {
    completedRef.current = isCompleted;
  }, [isCompleted]);

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
      if (completedRef.current) {
        current = 1;
      } else if (pressingRef.current) {
        // Increment progress over 1.4 seconds
        current += delta / 1400;
        if (current >= 1) {
          current = 1;
          setProgress(1);
          progressRef.current = 1;
          setIsCompleted(true);
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
    if (completedRef.current) return;
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-transparent text-white cursor-pointer select-none"
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none">
        {/* Dark overlay — semi-transparent so DottedSurface dots show through */}
        <div className="absolute inset-0 bg-[#030303]/40"></div>

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

        {/* Outer Rotating Orbit Ring 1 (Dashed) */}
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed transition-all duration-500 animate-[spin_80s_linear_infinite] pointer-events-none"
          style={{
            width: `calc(clamp(320px, 45vw, 500px) + ${progress * 150}px + 25px)`,
            height: `calc(clamp(320px, 45vw, 500px) + ${progress * 150}px + 25px)`,
            borderColor: `hsla(220, 85%, 65%, ${0.05 + progress * 0.15})`
          }}
        />

        {/* Outer Rotating Orbit Ring 2 (Double) */}
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border border-double transition-all duration-500 animate-[spin_120s_linear_infinite_reverse] pointer-events-none"
          style={{
            width: `calc(clamp(320px, 45vw, 500px) + ${progress * 150}px + 50px)`,
            height: `calc(clamp(320px, 45vw, 500px) + ${progress * 150}px + 50px)`,
            borderColor: `hsla(220, 85%, 65%, ${0.03 + progress * 0.07})`
          }}
        />

        {/* Planet/Sphere core centered in the background - Upgraded to frosted glass refractive core */}
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border backdrop-blur-[16px] transition-all duration-500 shadow-[0_0_50px_rgba(0,0,0,0.6)]"
          style={{
            width: `calc(clamp(320px, 45vw, 500px) + ${progress * 150}px)`,
            height: `calc(clamp(320px, 45vw, 500px) + ${progress * 150}px)`,
            borderColor: `hsla(220, 85%, 65%, ${0.08 + progress * 0.22})`,
            background: `radial-gradient(circle at 35% 25%, rgba(10, 25, 50, ${0.4 + progress * 0.25}) 0%, rgba(2, 6, 12, ${0.75 + progress * 0.1}) 70%, rgba(0, 0, 0, 0.95) 100%)`,
            boxShadow: `
              0 0 50px rgba(0,0,0,0.6),
              inset 0 0 30px hsla(220, 85%, 65%, ${0.05 + progress * 0.22})
            `
          }}
        />
      </div>

      {/* Main UI Overlay */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center select-none w-full h-full flex flex-col items-center justify-between py-12 md:py-16">
        
        {/* Top Spacer */}
        <div className="h-10" />

        {/* Middle content: Name & Tagline revealed ONLY when completed */}
        <div className="flex flex-col items-center justify-center space-y-8 w-full min-h-[300px]">
          <AnimatePresence>
            {isCompleted && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-8 flex flex-col items-center justify-center w-full"
              >
                {/* Header titles */}
                <motion.div variants={itemVariants} className="space-y-5">
                  <h1
                    className="text-3xl xs:text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-wide uppercase bg-gradient-to-r from-white via-blue-100 to-blue-400 bg-clip-text text-transparent select-none transition-all duration-150 whitespace-nowrap"
                    style={{
                      filter: "drop-shadow(0 0 20px hsla(220, 85%, 65%, 0.8))"
                    }}
                  >
                    C. Varun Kumar
                  </h1>

                  {/* Subtitles: Modern tag capsules with glowing borders */}
                  <div className="flex flex-wrap items-center justify-center gap-3 max-w-xl mx-auto">
                    {["Tech Innovator", "AI & Machine Learning Enthusiast", "Full Stack Developer"].map((role, idx) => (
                      <span 
                        key={idx} 
                        className="px-3.5 py-1.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-blue-950/20 border border-blue-500/35 text-blue-300 shadow-[0_0_12px_hsla(220,80%,60%,0.2)] backdrop-blur-md"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Tagline: Custom blue highlights (no slashes) */}
                <motion.p 
                  variants={itemVariants}
                  className="text-base sm:text-lg text-gray-400 max-w-xl font-light leading-relaxed tracking-wide"
                >
                  &ldquo;Transforming ideas into <span className="text-blue-300 font-medium" style={{ textShadow: "0 0 6px hsla(220, 85%, 65%, 0.4)" }}>intelligent digital experiences</span> through <span className="text-blue-300 font-medium" style={{ textShadow: "0 0 6px hsla(220, 85%, 65%, 0.4)" }}>innovation</span>, creativity, and code.&rdquo;
                </motion.p>

                {/* Enter Portfolio Button */}
                <motion.div
                  variants={itemVariants}
                  className="pt-4"
                >
                  <button
                    onClick={onEnter}
                    className="relative px-8 py-3.5 rounded-xl text-white font-bold text-sm uppercase tracking-[0.2em] border border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20 backdrop-blur-md shadow-[0_0_30px_hsla(220,85%,60%,0.3)] hover:shadow-[0_0_50px_hsla(220,85%,60%,0.6)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer z-50"
                  >
                    Enter Portfolio
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom content: Interactive Mainframe Boot Status */}
        <div 
          className="h-10 text-[10px] font-bold uppercase tracking-[0.25em] transition-all duration-150 flex flex-col items-center justify-center select-none pointer-events-none gap-2"
          style={{ 
            opacity: 0.35 + progress * 0.65,
            color: progress === 0 ? "rgba(156, 163, 175, 0.6)" : `hsl(${lightningHue}, 85%, 65%)`
          }}
        >
          {isCompleted ? (
            <span className="font-extrabold" style={{ color: `hsl(${lightningHue}, 85%, 65%)`, textShadow: "0 0 8px hsla(220, 85%, 60%, 0.5)" }}>
              Quantum Alignment Complete
            </span>
          ) : progress === 0 ? (
            <span className="animate-pulse">Press and hold anywhere to unlock</span>
          ) : (
            <span className="font-extrabold">Syncing Quantum Core: {Math.round(progress * 100)}%</span>
          )}
        </div>

      </div>
    </motion.div>
  );
}
