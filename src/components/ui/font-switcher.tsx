"use client";

import React, { useState, useEffect, useRef } from "react";
import { Type, Check, Sparkles, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export type FontOption = {
  id: string;
  name: string;
  variable: string;
  category: string;
  sample: string;
};

export const FONT_OPTIONS: FontOption[] = [
  {
    id: "space",
    name: "Space Grotesk",
    variable: "var(--font-space), sans-serif",
    category: "Futuristic & Cyber-Tech",
    sample: "Challa Varun Kumar — AI & Full Stack",
  },
  {
    id: "inter",
    name: "Inter",
    variable: "var(--font-inter), sans-serif",
    category: "Ultra-Clean Modern Swiss UI",
    sample: "Challa Varun Kumar — AI & Full Stack",
  },
  {
    id: "outfit",
    name: "Outfit",
    variable: "var(--font-outfit), sans-serif",
    category: "Sleek Geometric Luxury",
    sample: "Challa Varun Kumar — AI & Full Stack",
  },
  {
    id: "syne",
    name: "Syne",
    variable: "var(--font-syne), sans-serif",
    category: "Bold Avant-Garde Editorial",
    sample: "Challa Varun Kumar — AI & Full Stack",
  },
  {
    id: "jakarta",
    name: "Plus Jakarta Sans",
    variable: "var(--font-jakarta), sans-serif",
    category: "Modern Tech Enterprise",
    sample: "Challa Varun Kumar — AI & Full Stack",
  },
  {
    id: "fira",
    name: "Fira Code",
    variable: "var(--font-fira), monospace",
    category: "Pro Developer Monospace",
    sample: "Challa Varun Kumar — AI & Full Stack",
  },
  {
    id: "lucida",
    name: "Lucida Console",
    variable: '"Lucida Console", "Lucida Sans Typewriter", "Lucida Grande", monospace',
    category: "Classic High-Tech Terminal",
    sample: "Challa Varun Kumar — AI & Full Stack",
  },
  {
    id: "playfair",
    name: "Playfair Display",
    variable: "var(--font-playfair), serif",
    category: "High-End Editorial Serif",
    sample: "Challa Varun Kumar — AI & Full Stack",
  },
];

export function FontSwitcher() {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const applyFont = (fontVariable: string) => {
    if (typeof document !== "undefined") {
      document.documentElement.style.setProperty("--active-font", fontVariable);
      document.body.style.fontFamily = fontVariable;
    }
  };

  const [activeFontId, setActiveFontId] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("portfolio-font-id");
      if (saved && FONT_OPTIONS.some((f) => f.id === saved)) {
        return saved;
      }
    }
    return "space";
  });

  // Apply font to DOM when activeFontId changes
  useEffect(() => {
    const match = FONT_OPTIONS.find((f) => f.id === activeFontId);
    if (match) {
      applyFont(match.variable);
    }
  }, [activeFontId]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (font: FontOption) => {
    setActiveFontId(font.id);
    applyFont(font.variable);
    localStorage.setItem("portfolio-font-id", font.id);
    setIsOpen(false);
  };

  const currentFont = FONT_OPTIONS.find((f) => f.id === activeFontId) || FONT_OPTIONS[0];

  return (
    <div ref={dropdownRef} className="relative z-[60] inline-block">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change Portfolio Font"
        className="group relative flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-full border border-red-500/30 bg-black/70 hover:bg-red-950/40 text-red-200 hover:text-white text-xs font-mono font-medium backdrop-blur-md transition-all duration-300 shadow-[0_0_15px_rgba(239,68,68,0.2)] cursor-pointer"
      >
        <Type className="w-3.5 h-3.5 text-red-400 group-hover:scale-110 transition-transform" />
        <span className="hidden sm:inline font-sans text-[11px] font-semibold tracking-wide">
          Font: <span className="text-white font-bold">{currentFont.name}</span>
        </span>
        <span className="sm:hidden font-sans text-[11px] font-bold text-white">
          {currentFont.name.split(" ")[0]}
        </span>
        <ChevronDown className={`w-3 h-3 text-neutral-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-red-400" : ""}`} />
      </button>

      {/* Font Options Modal / Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 mt-2 w-72 sm:w-80 rounded-2xl bg-neutral-950/95 border border-red-500/30 shadow-[0_15px_40px_rgba(0,0,0,0.9)] backdrop-blur-xl p-3 z-[100] text-left"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-2 pb-2 mb-2 border-b border-red-500/20">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-red-300 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-red-400 animate-pulse" />
                <span>Select Typography</span>
              </div>
              <span className="text-[10px] font-mono text-neutral-500">8 Distinct Styles</span>
            </div>

            {/* List of 7 Fonts */}
            <div className="space-y-1 max-h-72 overflow-y-auto custom-scrollbar pr-1">
              {FONT_OPTIONS.map((font) => {
                const isSelected = font.id === activeFontId;
                return (
                  <button
                    key={font.id}
                    onClick={() => handleSelect(font)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all duration-200 group cursor-pointer ${
                      isSelected
                        ? "bg-gradient-to-r from-red-950/70 to-rose-950/70 border border-red-500/40 text-white shadow-md"
                        : "hover:bg-neutral-900/80 border border-transparent text-neutral-300 hover:text-white"
                    }`}
                  >
                    <div className="space-y-0.5 overflow-hidden pr-2">
                      <div className="flex items-center gap-2">
                        <span
                          className="text-sm font-bold tracking-tight block truncate"
                          style={{ fontFamily: font.variable }}
                        >
                          {font.name}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-neutral-400 block truncate">
                        {font.category}
                      </span>
                    </div>

                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-red-500/30 border border-red-400 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-red-200" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
