"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { RotateCcw, Shuffle, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import Image from "next/image";

export interface ProjectCardItem {
  id: number;
  src: string;
  alt: string;
  title: string;
  description: string;
}

interface ProjectCardStackProps {
  images: string[];
  projectName: string;
  activeImgIndex?: number;
  onIndexChange?: (index: number) => void;
}

export function ProjectCardStack({
  images,
  projectName,
  activeImgIndex = 0,
  onIndexChange,
}: ProjectCardStackProps) {
  const initialCards: ProjectCardItem[] = images.map((src, idx) => ({
    id: idx + 1,
    src,
    alt: `${projectName} Showcase ${idx + 1}`,
    title: `${projectName} — Highlight ${idx + 1}`,
    description: `Interactive preview ${idx + 1} of ${images.length}`,
  }));

  const [cards, setCards] = useState<ProjectCardItem[]>(initialCards);
  const [dragDirection, setDragDirection] = useState<"up" | "down" | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(activeImgIndex);

  // Sync cards when activeImgIndex changes from external thumbnail click
  useEffect(() => {
    const targetCardId = activeImgIndex + 1;
    const timer = setTimeout(() => {
      setCards((prev) => {
        if (prev[0]?.id === targetCardId) return prev;
        const targetCard = initialCards.find((c) => c.id === targetCardId);
        if (!targetCard) return prev;
        const remaining = prev.filter((c) => c.id !== targetCardId);
        return [targetCard, ...remaining];
      });
      setCurrentIndex(activeImgIndex);
    }, 0);
    return () => clearTimeout(timer);
  }, [activeImgIndex, initialCards]);

  const dragY = useMotionValue(0);
  const rotateX = useTransform(dragY, [-200, 0, 200], [15, 0, -15]);

  // Configuration
  const offset = 8;
  const scaleStep = 0.05;
  const dimStep = 0.12;
  const stiff = 170;
  const damp = 26;
  const borderRadius = 16;
  const swipeThreshold = 50;

  const spring = {
    type: "spring" as const,
    stiffness: stiff,
    damping: damp,
  };

  const moveToEnd = () => {
    if (cards.length <= 1) return;
    const nextArr = [...cards.slice(1), cards[0]];
    const newFrontId = nextArr[0].id - 1;
    setCards(nextArr);
    setCurrentIndex(newFrontId);
    onIndexChange?.(newFrontId);
  };

  const moveToStart = () => {
    if (cards.length <= 1) return;
    const last = cards[cards.length - 1];
    const nextArr = [last, ...cards.slice(0, -1)];
    const newFrontId = nextArr[0].id - 1;
    setCards(nextArr);
    setCurrentIndex(newFrontId);
    onIndexChange?.(newFrontId);
  };

  const shuffleCards = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    if (shuffled.length > 0) {
      const newFrontId = shuffled[0].id - 1;
      setCurrentIndex(newFrontId);
      onIndexChange?.(newFrontId);
    }
  };

  const resetCards = () => {
    setCards(initialCards);
    setCurrentIndex(0);
    onIndexChange?.(0);
  };

  const handleDragEnd = (
    _: unknown,
    info: { velocity: { y: number }; offset: { y: number } }
  ) => {
    const velocity = info.velocity.y;
    const offsetVal = info.offset.y;

    if (Math.abs(offsetVal) > swipeThreshold || Math.abs(velocity) > 500) {
      if (offsetVal < 0 || velocity < 0) {
        setDragDirection("up");
        setTimeout(() => {
          moveToEnd();
          setDragDirection(null);
        }, 150);
      } else {
        setDragDirection("down");
        setTimeout(() => {
          moveToStart();
          setDragDirection(null);
        }, 150);
      }
    }
    dragY.set(0);
  };

  return (
    <div className="relative w-full aspect-[16/9] min-h-[380px] sm:min-h-[460px] md:min-h-[520px] rounded-2xl bg-neutral-950 border border-neutral-800/80 shadow-[0_0_50px_rgba(0,0,0,0.9)] flex items-center justify-center p-4 sm:p-8 overflow-hidden group select-none">
      {/* Background Animated Subtle Grid */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#ef4444_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      {/* Top Bar Controls */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-30 pointer-events-auto">
        <div className="flex items-center gap-2">
          <motion.button
            onClick={resetCards}
            className="p-2.5 rounded-full bg-neutral-900/80 border border-neutral-700/80 hover:bg-neutral-800 hover:border-red-500/50 text-neutral-300 hover:text-white backdrop-blur-md transition-colors cursor-pointer shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Reset Stack"
          >
            <RotateCcw className="w-4 h-4 text-red-400" />
          </motion.button>

          <motion.button
            onClick={shuffleCards}
            className="p-2.5 rounded-full bg-neutral-900/80 border border-neutral-700/80 hover:bg-neutral-800 hover:border-red-500/50 text-neutral-300 hover:text-white backdrop-blur-md transition-colors cursor-pointer shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Shuffle Stack"
          >
            <Shuffle className="w-4 h-4 text-red-400" />
          </motion.button>
        </div>

        {/* Counter Badge */}
        <div className="px-3.5 py-1.5 rounded-full bg-black/80 border border-red-500/30 text-xs font-mono font-bold text-red-300 backdrop-blur-md shadow-lg flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-red-400 animate-pulse" />
          <span>
            {currentIndex + 1} / {initialCards.length}
          </span>
        </div>
      </div>

      {/* Left Navigation Arrow */}
      {cards.length > 1 && (
        <motion.button
          onClick={moveToStart}
          aria-label="Previous Slide"
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/80 border border-red-500/30 hover:border-red-400 text-white hover:bg-red-950/60 backdrop-blur-md transition-all z-30 cursor-pointer shadow-2xl"
          whileHover={{ scale: 1.1, x: -3 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft className="w-5 h-5 text-red-400" />
        </motion.button>
      )}

      {/* Right Navigation Arrow */}
      {cards.length > 1 && (
        <motion.button
          onClick={moveToEnd}
          aria-label="Next Slide"
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/80 border border-red-500/30 hover:border-red-400 text-white hover:bg-red-950/60 backdrop-blur-md transition-all z-30 cursor-pointer shadow-2xl"
          whileHover={{ scale: 1.1, x: 3 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight className="w-5 h-5 text-red-400" />
        </motion.button>
      )}

      {/* 3D Card Stack Container */}
      <div className="relative w-full max-w-2xl aspect-video overflow-visible z-10 flex items-center justify-center">
        <ul className="relative w-full h-full m-0 p-0">
          <AnimatePresence>
            {cards.map(({ id, src, alt, title, description }, i) => {
              const isFront = i === 0;
              const brightness = Math.max(0.35, 1 - i * dimStep);
              const baseZ = cards.length - i;

              return (
                <motion.li
                  key={id}
                  className="absolute inset-0 list-none overflow-hidden border-2 border-neutral-700/80 hover:border-red-500/50 transition-colors shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
                  style={{
                    borderRadius: `${borderRadius}px`,
                    cursor: isFront ? "grab" : "auto",
                    touchAction: "none",
                    rotateX: isFront ? rotateX : 0,
                    transformPerspective: 1000,
                  }}
                  animate={{
                    top: `${i * -offset}%`,
                    scale: 1 - i * scaleStep,
                    filter: `brightness(${brightness})`,
                    zIndex: baseZ,
                    opacity: dragDirection && isFront ? 0 : 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.8,
                    transition: { duration: 0.2 },
                  }}
                  transition={spring}
                  drag={isFront ? "y" : false}
                  dragConstraints={{ top: 0, bottom: 0 }}
                  dragElastic={0.7}
                  onDrag={(_, info) => {
                    if (isFront) {
                      dragY.set(info.offset.y);
                    }
                  }}
                  onDragEnd={handleDragEnd}
                  whileDrag={
                    isFront
                      ? {
                          zIndex: cards.length + 1,
                          cursor: "grabbing",
                          scale: 1.03,
                        }
                      : {}
                  }
                  onHoverStart={() => isFront && setShowInfo(true)}
                  onHoverEnd={() => setShowInfo(false)}
                >
                  <Image
                    src={src}
                    alt={alt}
                    className="w-full h-full object-cover pointer-events-none select-none"
                    width={1280}
                    height={720}
                    unoptimized
                    draggable={false}
                  />

                  {/* Card Info Gradient Overlay on Hover */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/95 via-black/80 to-transparent pointer-events-none"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: isFront && showInfo ? 1 : 0,
                      y: isFront && showInfo ? 0 : 20,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className="text-white font-bold text-base sm:text-lg tracking-tight">
                      {title}
                    </h3>
                    <p className="text-red-300/80 text-xs sm:text-sm font-mono mt-0.5">
                      {description} • Drag up/down to swipe
                    </p>
                  </motion.div>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
}
