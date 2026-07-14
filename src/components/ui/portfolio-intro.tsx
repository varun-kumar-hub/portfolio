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
  const [isDecrypting, setIsDecrypting] = useState(false);
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

  // Automatic Decryption animation loop when triggered
  useEffect(() => {
    if (!isDecrypting || completedRef.current) return;

    let startTimestamp: number | null = null;
    let isCancelled = false;

    const loop = (timestamp: number) => {
      if (isCancelled) return;
      if (startTimestamp === null) {
        startTimestamp = timestamp;
      }
      const elapsed = timestamp - startTimestamp;
      
      // Decrypt over 1.8 seconds (1800ms)
      const nextProgress = Math.min(1, elapsed / 1800);
      
      progressRef.current = nextProgress;
      setProgress(nextProgress);

      document.documentElement.style.setProperty("--hold-progress", nextProgress.toString());
      if (typeof window !== "undefined") {
        (window as any).holdProgress = nextProgress;
      }

      if (nextProgress >= 1) {
        setIsCompleted(true);
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
  }, [isDecrypting]);

  const handleStartDecryption = () => {
    setIsDecrypting(true);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -40, scale: 0.98 }}
      transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#07070a] text-white select-none p-6 overflow-hidden"
      style={{
        // Studio spotlight glow from the top center
        background: "radial-gradient(circle at top, rgba(255, 255, 255, 0.035) 0%, transparent 65%), #07070a",
      }}
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
      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center justify-between h-full py-10 sm:py-16">
        
        {/* Simple top spacer to balance layout */}
        <div className="h-6" />

        {/* Central Display Area: Proactiv-like Premium Typography */}
        <div className="flex-1 flex flex-col items-center justify-center space-y-6 sm:space-y-8 w-full max-w-4xl text-center">
          
          {/* Top Flipping Badge */}
          <div className="h-8 flex items-center justify-center mb-2">
            {isCompleted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <ContainerTextFlip
                  words={["Tech Innovator", "AI & ML Enthusiast", "B.Tech Student", "Full Stack Developer"]}
                  interval={2500}
                  className="py-1 px-4 text-[11px] border border-blue-500/20 bg-blue-950/10 text-blue-300 font-sans rounded-full tracking-wide shadow-none"
                />
              </motion.div>
            ) : (
              <span className="text-[10px] font-sans text-neutral-600 tracking-[0.2em] uppercase animate-pulse">
                INITIALIZING CONNECTION...
              </span>
            )}
          </div>

          {/* Heading Lines */}
          <div className="flex flex-col space-y-2 sm:space-y-3 font-sans max-w-3xl">
            {/* Line 1: Name (Gray-to-white gradient) */}
            <div className="min-h-[50px] sm:min-h-[75px] md:min-h-[85px] lg:min-h-[105px] flex items-center justify-center">
              <EncryptedText
                text="Challa Varun Kumar"
                progress={Math.min(1, progress * 1.5)}
                className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-neutral-100 to-neutral-500 select-none block leading-[1.05]"
                encryptedClassName="text-neutral-800 font-bold"
                revealedClassName="text-neutral-100"
              />
            </div>

            {/* Line 2: Role (White) */}
            <div className="min-h-[50px] sm:min-h-[75px] md:min-h-[85px] lg:min-h-[105px] flex items-center justify-center">
              <EncryptedText
                text="AI & ML Engineer"
                progress={Math.max(0, Math.min(1, (progress - 0.3) * 1.5))}
                className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white select-none block leading-[1.05]"
                encryptedClassName="text-neutral-900 font-bold"
                revealedClassName="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]"
              />
            </div>
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

        {/* Bottom Interactive Area */}
        <div className="w-full flex flex-col items-center justify-center min-h-[100px] mt-4">
          <AnimatePresence mode="wait">
            {!isDecrypting && !isCompleted && (
              <motion.button
                key="decrypt-btn"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onClick={handleStartDecryption}
                className="px-8 py-3.5 rounded-full text-blue-400 font-semibold text-xs sm:text-sm uppercase tracking-[0.2em] border border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer z-50 font-sans shadow-[0_0_15px_rgba(59,130,246,0.05)]"
              >
                DECRYPT CREDENTIALS
              </motion.button>
            )}

            {isDecrypting && !isCompleted && (
              <motion.div
                key="progress-bar"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center space-y-3"
              >
                {/* Horizontal Progress Bar */}
                <div className="w-56 sm:w-64 h-[3px] bg-neutral-900 rounded-full overflow-hidden relative">
                  <div 
                    className="absolute top-0 left-0 h-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.6)] transition-all duration-75"
                    style={{ width: `${progress * 100}%` }}
                  />
                </div>
                <div className="text-[10px] font-sans font-medium uppercase tracking-[0.25em] text-blue-400 animate-pulse">
                  DECRYPTING: {Math.round(progress * 100)}%
                </div>
              </motion.div>
            )}

            {isCompleted && (
              <motion.button
                key="enter-btn"
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                onClick={onEnter}
                className="relative px-8 py-3.5 rounded-full text-white font-semibold text-xs sm:text-sm uppercase tracking-[0.2em] border border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20 backdrop-blur-md shadow-[0_0_30px_rgba(96,165,250,0.25)] hover:shadow-[0_0_50px_rgba(96,165,250,0.55)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer z-50 font-sans"
              >
                ENTER PORTFOLIO
              </motion.button>
            )}
          </AnimatePresence>
        </div>

      </div>
    </motion.div>
  );
}
