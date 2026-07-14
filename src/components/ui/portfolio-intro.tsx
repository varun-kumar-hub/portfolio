"use client";

import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EncryptedText } from "@/components/ui/encrypted-text";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";

interface PortfolioIntroProps {
  onEnter: () => void;
  onProgressChange: (progress: number) => void;
}

export function PortfolioIntro({ onEnter, onProgressChange }: PortfolioIntroProps) {
  const [progress, setProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const progressRef = useRef(0);
  const completedRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    completedRef.current = isCompleted;
  }, [isCompleted]);

  useEffect(() => {
    onProgressChange(progress);
  }, [progress, onProgressChange]);

  // Hold-to-Decrypt animation loop
  useEffect(() => {
    if (completedRef.current) return;

    let lastTimestamp: number | null = null;
    let isCancelled = false;

    const loop = (timestamp: number) => {
      if (isCancelled) return;
      if (lastTimestamp === null) {
        lastTimestamp = timestamp;
      }
      const deltaTime = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      let nextProgress = progressRef.current;
      if (isHolding) {
        // Fills up in 1.5 seconds (1500ms)
        nextProgress = Math.min(1, nextProgress + deltaTime / 1500);
      } else {
        // Drains down in 500ms
        nextProgress = Math.max(0, nextProgress - deltaTime / 500);
      }

      progressRef.current = nextProgress;
      setProgress(nextProgress);

      document.documentElement.style.setProperty("--hold-progress", nextProgress.toString());
      if (typeof window !== "undefined") {
        (window as any).holdProgress = nextProgress;
      }

      // If progress reaches 100%, trigger completion and transition immediately
      if (nextProgress >= 1) {
        setIsCompleted(true);
        // Wait 300ms to let the user see the 100% completion state, then enter
        setTimeout(() => {
          onEnter();
        }, 300);
        return;
      }

      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animationFrameRef.current = requestAnimationFrame(loop);

    return () => {
      isCancelled = true;
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isHolding, onEnter]);

  const handleHoldStart = () => {
    if (isCompleted) return;
    setIsHolding(true);
  };

  const handleHoldEnd = () => {
    setIsHolding(false);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -40, scale: 0.98 }}
      transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#07070a] text-white select-none p-6 overflow-hidden cursor-pointer"
      style={{
        // Studio spotlight glow from the top center - changes color/strength when holding!
        background: isHolding
          ? "radial-gradient(circle at center, rgba(59, 130, 246, 0.08) 0%, transparent 70%), radial-gradient(circle at top, rgba(255, 255, 255, 0.045) 0%, transparent 65%), #07070a"
          : "radial-gradient(circle at top, rgba(255, 255, 255, 0.035) 0%, transparent 65%), #07070a",
      }}
      onMouseDown={handleHoldStart}
      onMouseUp={handleHoldEnd}
      onMouseLeave={handleHoldEnd}
      onTouchStart={handleHoldStart}
      onTouchEnd={handleHoldEnd}
    >
      {/* Drifting subtle blue/indigo ambient glow in the back */}
      <motion.div 
        animate={{
          x: [0, 20, -20, 0],
          y: [0, -30, 30, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/[0.03] blur-[120px] rounded-full pointer-events-none z-0" 
      />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center justify-between h-full py-10 sm:py-16 pointer-events-none">
        
        {/* Simple top spacer to balance layout */}
        <div className="h-6" />

        {/* Central Display Area: Proactiv-like Premium Typography */}
        <div className="flex-1 flex flex-col items-center justify-center space-y-6 sm:space-y-8 w-full max-w-4xl text-center">
          
          {/* Top spacer / loading status */}
          <div className="h-8 flex items-center justify-center mb-2">
            {!isCompleted && (
              <span className="text-[10px] font-sans text-neutral-600 tracking-[0.2em] uppercase animate-pulse">
                {isHolding ? "DECRYPTING IDENTITY..." : "CLICK & HOLD ANYWHERE"}
              </span>
            )}
          </div>

          {/* Heading Lines */}
          <div className="flex flex-col space-y-2 sm:space-y-3 font-sans max-w-3xl">
            {/* Line 1: Name (Gray-to-white gradient) */}
            <div className="min-h-[40px] sm:min-h-[60px] md:min-h-[70px] lg:min-h-[85px] flex items-center justify-center">
              <EncryptedText
                text="Challa Varun Kumar"
                progress={Math.min(1, progress * 1.5)}
                className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-neutral-100 to-neutral-500 select-none block leading-[1.05] whitespace-nowrap"
                encryptedClassName="text-neutral-800 font-bold"
                revealedClassName="text-neutral-100"
              />
            </div>

            {/* Line 2: Role (White) */}
            <div className="min-h-[40px] sm:min-h-[60px] md:min-h-[70px] lg:min-h-[85px] flex items-center justify-center">
              <EncryptedText
                text="AI & ML Engineer"
                progress={Math.max(0, Math.min(1, (progress - 0.3) * 1.5))}
                className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white select-none block leading-[1.05] whitespace-nowrap"
                encryptedClassName="text-neutral-900 font-bold"
                revealedClassName="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]"
              />
            </div>
          </div>

          {/* Flipping Tags (Below Role) */}
          <div className="h-8 flex items-center justify-center mt-2">
            {isCompleted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <ContainerTextFlip
                  words={["Tech Innovator", "AI & ML Enthusiast", "B.Tech Student", "Full Stack Developer"]}
                  interval={2500}
                  className="py-1 px-4 text-[11px] border border-blue-500/20 bg-blue-500/5 text-blue-300 font-sans rounded-full tracking-wide shadow-none"
                />
              </motion.div>
            )}
          </div>

          {/* Subtitle / Description Text */}
          <div className="min-h-[45px] sm:min-h-[60px] max-w-2xl px-4 pt-2">
            <EncryptedText
              text="Exploring the limitless potential of Artificial Intelligence while building modern web applications to create impactful solutions."
              progress={Math.max(0, Math.min(1, (progress - 0.6) * 2.5))}
              className="text-sm sm:text-base md:text-lg text-neutral-450 leading-relaxed font-sans font-normal block"
              encryptedClassName="text-neutral-800/40"
              revealedClassName="text-neutral-400"
            />
          </div>

        </div>

        {/* Bottom Interactive Area: Hold Status Indicator */}
        <div className="w-full flex flex-col items-center justify-center min-h-[100px] mt-4">
          <AnimatePresence mode="wait">
            {!isCompleted ? (
              <motion.div
                key="hold-indicator"
                initial={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="text-center select-none"
              >
                <p className={`text-xs sm:text-sm uppercase tracking-[0.25em] font-sans font-medium transition-all duration-300 ${progress > 0 ? "text-blue-400 animate-pulse font-semibold" : "text-neutral-600"}`}>
                  {progress > 0 ? `DECRYPTING IDENTITY... [${Math.round(progress * 100)}%]` : "HOLD ANYWHERE TO START DECRYPTION"}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="complete-status"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-emerald-500/80 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                ACCESS GRANTED. ENTERING PORTFOLIO...
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </motion.div>
  );
}
