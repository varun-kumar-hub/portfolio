"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EncryptedText } from "@/components/ui/encrypted-text";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import { profile } from "@/lib/profile";

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
    holdProgress?: number;
  }
}

// ─── Web Audio API Sound Engine ──────────────────────────────────
function useSoundEngine() {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const lastTickRef = useRef(0);

  const getCtx = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioContextCtor = window.AudioContext ?? window.webkitAudioContext;
      if (!AudioContextCtor) {
        throw new Error("Web Audio API is not supported in this browser.");
      }
      audioCtxRef.current = new AudioContextCtor();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  const playGlitchTick = useCallback(() => {
    const now = performance.now();
    if (now - lastTickRef.current < 80) return;
    lastTickRef.current = now;

    try {
      const ctx = getCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "square";
      osc.frequency.setValueAtTime(1800 + Math.random() * 2400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.05);
    } catch { /* Silently fail */ }
  }, [getCtx]);

  const playSuccessChime = useCallback(() => {
    try {
      const ctx = getCtx();
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        const startTime = ctx.currentTime + i * 0.1;
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.08, startTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.6);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.65);
      });
    } catch { /* Silently fail */ }
  }, [getCtx]);

  return { playGlitchTick, playSuccessChime };
}

interface PortfolioIntroProps {
  onEnter: () => void;
  onProgressChange: (progress: number) => void;
}

// ─── Apple-Inspired Dedicated Light Theme Intro ───────────────────
function LightPortfolioIntro({
  progress,
  isHolding,
  isCompleted,
  handleHoldStart,
  handleHoldEnd,
}: {
  progress: number;
  isHolding: boolean;
  isCompleted: boolean;
  handleHoldStart: () => void;
  handleHoldEnd: () => void;
}) {
  const getStatusMessage = () => {
    if (isCompleted) return "INITIALIZATION COMPLETE. WELCOME.";
    if (progress > 0.75) return "Finalizing System Interface...";
    if (progress > 0.50) return "Synchronizing Interactive Toolkit...";
    if (progress > 0.25) return "Loading Engineering Architecture & Projects...";
    if (progress > 0) return "Initializing System Modules...";
    return "PRESS & HOLD ANYWHERE TO INITIALIZE";
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -25, scale: 0.98 }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#f8f9fb] text-slate-900 select-none p-6 overflow-hidden cursor-pointer"
      onMouseDown={handleHoldStart}
      onMouseUp={handleHoldEnd}
      onMouseLeave={handleHoldEnd}
      onTouchStart={handleHoldStart}
      onTouchEnd={handleHoldEnd}
    >
      {/* Premium Ambient Background Lighting */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.045)_0%,rgba(248,249,251,0.85)_65%,#f8f9fb_100%)]" />

      {/* Subtle Micro Grid Pattern */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage: `linear-gradient(rgba(15,23,42,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.03) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(circle at center, #000 0%, #000 60%, transparent 90%)",
          WebkitMaskImage: "radial-gradient(circle at center, #000 0%, #000 60%, transparent 90%)",
        }}
      />

      {/* Interactive Expandable Ripple Ring */}
      <AnimatePresence>
        {isHolding && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1.25 }}
            exit={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
            className="absolute z-0 w-96 h-96 rounded-full border border-red-500/20 bg-red-500/[0.02] pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center justify-between h-full py-12 sm:py-16 pointer-events-none">
        
        {/* Top Header Badge */}
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-red-500/20 shadow-[0_4px_20px_rgba(15,23,42,0.04)] backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[10px] sm:text-xs font-mono font-extrabold uppercase tracking-widest text-red-600">
            ✦ INITIALIZING WORKSPACE ✦
          </span>
        </div>

        {/* Center Typography Showcase */}
        <div className="flex-1 flex flex-col items-center justify-center space-y-4 sm:space-y-6 text-center max-w-3xl my-auto">
          
          {/* Main Name */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-950 leading-tight"
          >
            {profile.name.full}
          </motion.h1>

          {/* Subtitle Role */}
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-red-600 leading-tight"
          >
            AI &amp; ML Engineer
          </motion.h2>

          {/* Bio Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs sm:text-base text-slate-600 font-medium leading-relaxed max-w-xl px-4"
          >
            Architecting autonomous AI systems &amp; high-performance cloud platforms.
          </motion.p>
        </div>

        {/* Bottom Progress Capsule & Status Indicator */}
        <div className="w-full flex flex-col items-center justify-center space-y-3 mt-auto">
          
          {/* Apple-style Horizontal Progress Capsule */}
          <div className="relative w-64 sm:w-80 h-3 rounded-full bg-white border border-slate-200/90 p-0.5 shadow-[0_2px_8px_rgba(15,23,42,0.06)] overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-red-500 via-rose-500 to-red-600 shadow-[0_0_12px_rgba(239,68,68,0.4)]"
              style={{ width: `${Math.max(4, progress * 100)}%` }}
              transition={{ ease: "easeOut", duration: 0.1 }}
            />
          </div>

          {/* Percentage & Live Message */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-red-600">
              {Math.round(progress * 100)}%
            </span>
            <span className="text-slate-400 text-xs font-mono">•</span>
            <span className={`text-xs font-mono font-bold tracking-wide uppercase transition-colors ${progress > 0 ? "text-red-600 animate-pulse" : "text-slate-500"}`}>
              {getStatusMessage()}
            </span>
          </div>

        </div>

      </div>
    </motion.div>
  );
}

// ─── Main Intro Component ────────────────────────────────────────
export function PortfolioIntro({ onEnter, onProgressChange }: PortfolioIntroProps) {
  const [progress, setProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);

  const progressRef = useRef(0);
  const completedRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const hasPlayedChimeRef = useRef(false);

  const { playGlitchTick, playSuccessChime } = useSoundEngine();

  // Theme Detection & Observer
  useEffect(() => {
    const checkTheme = () => {
      if (typeof window !== "undefined") {
        setIsLightMode(document.documentElement.classList.contains("light"));
      }
    };
    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    completedRef.current = isCompleted;
  }, [isCompleted]);

  useEffect(() => {
    onProgressChange(progress);
  }, [progress, onProgressChange]);

  // Hold-to-Initialize loop
  useEffect(() => {
    if (completedRef.current) return;

    let lastTimestamp: number | null = null;
    let isCancelled = false;
    let tickAccumulator = 0;

    const loop = (timestamp: number) => {
      if (isCancelled) return;
      if (lastTimestamp === null) {
        lastTimestamp = timestamp;
      }
      const deltaTime = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      let nextProgress = progressRef.current;
      if (isHolding) {
        nextProgress = Math.min(1, nextProgress + deltaTime / 1400);

        tickAccumulator += deltaTime;
        if (tickAccumulator > 60 + Math.random() * 80) {
          if (!isLightMode) playGlitchTick();
          tickAccumulator = 0;
        }
      } else {
        nextProgress = Math.max(0, nextProgress - deltaTime / 500);
      }

      progressRef.current = nextProgress;
      setProgress(nextProgress);

      document.documentElement.style.setProperty("--hold-progress", nextProgress.toString());
      if (typeof window !== "undefined") {
        window.holdProgress = nextProgress;
      }

      if (nextProgress >= 1) {
        setIsCompleted(true);

        if (!hasPlayedChimeRef.current) {
          hasPlayedChimeRef.current = true;
          playSuccessChime();
        }

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
  }, [isHolding, isLightMode, onEnter, playGlitchTick, playSuccessChime]);

  const handleHoldStart = () => {
    if (isCompleted) return;
    setIsHolding(true);
  };

  const handleHoldEnd = () => {
    setIsHolding(false);
  };

  // Render Light Mode Intro if theme is light
  if (isLightMode) {
    return (
      <LightPortfolioIntro
        progress={progress}
        isHolding={isHolding}
        isCompleted={isCompleted}
        handleHoldStart={handleHoldStart}
        handleHoldEnd={handleHoldEnd}
      />
    );
  }

  // Render Dark Mode Decryption Intro if theme is dark
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -40, scale: 0.98 }}
      transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050607] text-white select-none p-6 overflow-hidden cursor-pointer"
      style={{
        background: isHolding
          ? "radial-gradient(circle at center, rgba(96, 165, 250, 0.035) 0%, transparent 32rem), #050607"
          : "#050607",
      }}
      onMouseDown={handleHoldStart}
      onMouseUp={handleHoldEnd}
      onMouseLeave={handleHoldEnd}
      onTouchStart={handleHoldStart}
      onTouchEnd={handleHoldEnd}
    >
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-[0.14] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 220 220' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='5' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)' opacity='0.78'/%3E%3C/svg%3E")`,
          backgroundSize: "220px 220px",
        }}
      />
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-[0.09] mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 520 520' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='mottle'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.018' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='table' tableValues='0 0.55'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23mottle)'/%3E%3C/svg%3E")`,
          backgroundSize: "520px 520px",
        }}
      />
      <div className="absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.18)_70%,rgba(0,0,0,0.48)_100%)]" />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center justify-between h-full py-10 sm:py-16 pointer-events-none">
        
        <div className="h-6" />

        <div className="flex-1 flex flex-col items-center justify-center space-y-6 sm:space-y-8 w-full max-w-4xl text-center">
          
          <div className="h-8 flex items-center justify-center mb-2">
            {!isCompleted && (
              <span className="text-[10px] font-sans text-neutral-600 tracking-[0.2em] uppercase animate-pulse">
                {isHolding ? "DECRYPTING IDENTITY..." : "CLICK & HOLD ANYWHERE"}
              </span>
            )}
          </div>

          <div className="flex flex-col space-y-2 sm:space-y-3 font-sans max-w-3xl">
            <div className="min-h-[40px] sm:min-h-[60px] md:min-h-[70px] lg:min-h-[85px] flex items-center justify-center">
              <EncryptedText
                text="Challa Varun Kumar"
                progress={Math.min(1, progress * 1.5)}
                className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-neutral-100 to-neutral-500 select-none block leading-[1.05] whitespace-nowrap"
                encryptedClassName="text-neutral-800 font-bold"
                revealedClassName="text-neutral-100"
              />
            </div>

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

          <div className="h-8 flex items-center justify-center mt-2">
            {isCompleted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <ContainerTextFlip
                  words={["Tech Innovator", "AI & ML Enthusiast", "B.Tech Student", "Full Stack Developer"]}
                  interval={4000}
                  className="py-1 px-4 text-[11px] border border-red-500/30 bg-red-500/10 text-red-200 font-sans rounded-full tracking-wide shadow-none"
                />
              </motion.div>
            )}
          </div>

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

        {/* Bottom: Progress Ring + Status */}
        <div className="w-full flex flex-col items-center justify-center min-h-[100px] mt-4">
          <AnimatePresence mode="wait">
            {!isCompleted ? (
              <motion.div
                key="hold-indicator"
                initial={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="text-center select-none space-y-3"
              >
                <div className="flex items-center justify-center">
                  <svg width="48" height="48" viewBox="0 0 48 48" className="transform -rotate-90">
                    <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="2" />
                    <circle
                      cx="24" cy="24" r="20"
                      fill="none"
                      stroke={progress > 0 ? "rgba(96, 165, 250, 0.7)" : "transparent"}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 20}`}
                      strokeDashoffset={`${2 * Math.PI * 20 * (1 - progress)}`}
                      style={{
                        transition: "stroke-dashoffset 0.1s linear",
                        filter: progress > 0 ? "drop-shadow(0 0 4px rgba(239, 68, 68, 0.5))" : "none",
                      }}
                    />
                  </svg>
                  <span className="absolute text-[9px] font-bold text-red-400/80 tabular-nums">
                    {progress > 0 ? `${Math.round(progress * 100)}%` : ""}
                  </span>
                </div>
                <p className={`text-xs sm:text-sm uppercase tracking-[0.25em] font-sans font-medium transition-all duration-300 ${progress > 0 ? "text-red-400 animate-pulse font-semibold" : "text-neutral-600"}`}>
                  {progress > 0 ? "DECRYPTING IDENTITY..." : "HOLD ANYWHERE TO START DECRYPTION"}
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
