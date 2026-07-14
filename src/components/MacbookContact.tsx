"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Send } from "lucide-react";

interface MacbookContactProps {
  className?: string;
}

export default function MacbookContact({ className }: MacbookContactProps) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Submit Handler connecting to `/api/contact`
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      alert("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        // Automatically close lid after successful submission
        setTimeout(() => {
          setIsSubmitted(false);
          setIsFocused(false);
          setIsHovered(false);
        }, 3000);
      } else {
        alert(data.error || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    // Small delay to allow clicking elsewhere or submitting
    setTimeout(() => {
      if (document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
        setIsFocused(false);
      }
    }, 150);
  };

  const isOpen = isHovered || isFocused;

  // Mock keyboard rows to match the screenshot
  const keyboardRows = [
    ["esc", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "power"],
    ["~", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "delete"],
    ["tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\"],
    ["caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "return"],
    ["shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "shift"],
    ["fn", "ctrl", "opt", "cmd", "space", "cmd", "opt", "◀", "▲▼", "▶"]
  ];

  return (
    <div 
      className={`relative w-full max-w-[620px] mx-auto py-12 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Scene Wrapper */}
      <div 
        className="relative w-full aspect-[16/12] mx-auto flex items-center justify-center select-none"
        style={{
          perspective: "1400px",
        }}
      >
        {/* Ambient shadow underneath the laptop */}
        <div 
          className="absolute bottom-1 w-[92%] h-[12%] bg-black/55 blur-2xl rounded-full transition-transform duration-700 pointer-events-none"
          style={{
            transform: isOpen ? "scale(1.02, 0.9)" : "scale(0.95, 0.8)",
          }}
        />

        {/* ─── MACBOOK LID (Rotates on Hinge) ─── */}
        <motion.div
          animate={{
            // Closed: rotateX(-90deg) flat against base
            // Open: rotateX(0deg) perfectly upright for editing, or -12deg for depth
            rotateX: isOpen ? (isFocused ? -5 : -14) : -90,
            y: isOpen ? -8 : 12,
            z: isOpen ? 10 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 110,
            damping: 18,
          }}
          style={{
            transformOrigin: "bottom center",
            transformStyle: "preserve-3d",
          }}
          className="absolute bottom-[42%] w-[88%] h-[74%] bg-[#1d1d1f] rounded-[18px] border-b-[4px] border-[#0e0e0f] z-20 shadow-[0_-20px_40px_rgba(0,0,0,0.6)]"
        >
          {/* Back side of screen (outer shell) - visible when closed */}
          <div 
            className="absolute inset-0 rounded-[18px] bg-gradient-to-b from-[#2d2d30] to-[#121213] flex items-center justify-center border border-white/[0.04]"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            {/* Glowing Logo */}
            <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.3)] flex items-center justify-center animate-pulse">
              <span className="text-[10px] font-sans text-blue-400 font-bold uppercase tracking-wider">VK</span>
            </div>
          </div>

          {/* Front side of screen (display bezel & window content) */}
          <div 
            className="absolute inset-0 rounded-[18px] bg-black p-[7px] flex flex-col border border-[#2d2d30]"
            style={{
              backfaceVisibility: "hidden",
            }}
          >
            {/* Camera / Mic Dot */}
            <div className="w-full h-4 flex items-center justify-center shrink-0">
              <div className="w-1.5 h-1.5 rounded-full bg-[#0d0d0d] border border-white/5 flex items-center justify-center">
                <div className="w-0.5 h-0.5 rounded-full bg-blue-500/80" />
              </div>
            </div>

            {/* Screen Inner Display Area */}
            <div className="flex-1 w-full bg-[#0c0c0e] rounded-[10px] overflow-hidden border border-white/[0.05] relative flex flex-col text-left">
              {/* macOS Style Window Titlebar */}
              <div className="h-6 w-full bg-[#18181b] border-b border-white/[0.04] px-3 flex items-center justify-between shrink-0">
                {/* Traffic Lights */}
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#10b981]/80" />
                </div>
                {/* Title */}
                <span className="text-[9px] font-sans font-medium text-neutral-500 tracking-wider">
                  mail://varunkumar.dev
                </span>
                <div className="w-12" />
              </div>

              {/* Display Content: Contact Form */}
              <div className="flex-1 p-3.5 flex flex-col justify-center relative overflow-y-auto scrollbar-none">
                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-black/90 z-30"
                    >
                      <div className="w-10 h-10 rounded-full bg-emerald-950/60 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.15)] mb-3 animate-bounce">
                        <Check size={20} />
                      </div>
                      <h4 className="text-xs font-bold text-white tracking-wide uppercase">Message Transmitted!</h4>
                      <p className="text-[10px] text-neutral-400 mt-1 max-w-[200px]">
                        Hinge locking. Returning connection online...
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>

                {/* Form Elements */}
                <form onSubmit={handleSubmit} className="space-y-2 flex flex-col justify-between h-full">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-0.5">
                      <label className="text-[8px] font-bold text-neutral-500 uppercase tracking-widest block">
                        Name
                      </label>
                      <input
                        required
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        placeholder="Your name"
                        className="w-full bg-neutral-900/60 border border-white/[0.06] rounded-md px-2 py-1 text-[10px] text-white placeholder-neutral-600 focus:outline-none focus:border-blue-500/50 focus:bg-neutral-900 transition-all font-sans"
                      />
                    </div>
                    <div className="space-y-0.5">
                      <label className="text-[8px] font-bold text-neutral-500 uppercase tracking-widest block">
                        Email Address
                      </label>
                      <input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        placeholder="your.email@example.com"
                        className="w-full bg-neutral-900/60 border border-white/[0.06] rounded-md px-2 py-1 text-[10px] text-white placeholder-neutral-600 focus:outline-none focus:border-blue-500/50 focus:bg-neutral-900 transition-all font-sans"
                      />
                    </div>
                  </div>

                  <div className="space-y-0.5 flex-1 flex flex-col">
                    <label className="text-[8px] font-bold text-neutral-500 uppercase tracking-widest block">
                      Message
                    </label>
                    <textarea
                      required
                      name="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      placeholder="Type your message here..."
                      className="w-full flex-1 min-h-[50px] bg-neutral-900/60 border border-white/[0.06] rounded-md px-2 py-1 text-[10px] text-white placeholder-neutral-600 focus:outline-none focus:border-blue-500/50 focus:bg-neutral-900 transition-all font-sans resize-none"
                    />
                  </div>

                  {/* Submit Button inside Screen */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-1.5 rounded-md bg-blue-600 hover:bg-blue-500 text-white font-semibold text-[10px] uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer border-none"
                  >
                    {isSubmitting ? (
                      <span className="w-3 h-3 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    ) : (
                      <>
                        <Send size={10} />
                        Transmit Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ─── MACBOOK BASE (Chassis) ─── */}
        <div 
          className="absolute bottom-[1%] w-[94%] h-[48%] bg-[#1d1d1f] rounded-t-[4px] rounded-b-[24px] origin-bottom shadow-[0_25px_50px_rgba(0,0,0,0.8)] z-10 border-t border-[#3a3a3c] border-b border-black flex flex-col justify-between"
          style={{
            transform: "rotateX(62deg)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Keyboard Recess */}
          <div className="w-[94%] h-[68%] mx-auto mt-2 rounded-[10px] bg-[#101011] p-1 shadow-[inset_0_4px_12px_rgba(0,0,0,0.9)] flex flex-col justify-between">
            {keyboardRows.map((row, rowIdx) => (
              <div key={rowIdx} className="flex w-full justify-between gap-[1.5px]">
                {row.map((key, keyIdx) => {
                  const isSpace = key === "space";
                  const isShift = key === "shift";
                  const isCmd = key === "cmd";
                  const isOpt = key === "opt";
                  
                  return (
                    <div
                      key={keyIdx}
                      style={{
                        flexGrow: isSpace ? 5 : isShift ? 1.8 : 1,
                        // Keyboard light glow when screen is open
                        boxShadow: isOpen 
                          ? "0 0 1px rgba(255,255,255,0.08), inset 0 -1px 1px rgba(255,255,255,0.05)" 
                          : "none",
                      }}
                      className={`
                        h-[12px] rounded-[1.5px] bg-[#18181b] border-t border-white/[0.04] text-[4px] font-sans flex items-center justify-center text-neutral-400 select-none
                        ${isSpace ? "w-28" : ""}
                        ${isOpen ? "shadow-[0_0_2px_rgba(255,255,255,0.25)] border-white/[0.08] text-neutral-300" : "text-neutral-600 border-none"}
                        transition-all duration-300
                      `}
                    >
                      <span className="scale-[0.8]">{key}</span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Trackpad Container */}
          <div className="w-[28%] h-[24%] mx-auto mb-1 rounded-t-[4px] rounded-b-[8px] border border-white/[0.04] bg-[#222224] shadow-[inset_0_1px_4px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center shrink-0">
            {/* Click spacer hinge */}
            <div className="w-full h-[1px] bg-white/[0.02]" />
          </div>
        </div>

        {/* ─── MACBOOK FRONT EDGE LIP ─── */}
        <div 
          className="absolute bottom-[1%] w-[94%] h-[6px] bg-[#0c0c0e] rounded-b-[24px] border-t border-[#3a3a3c]/30 z-30"
          style={{
            transform: "translateY(19.5px) translateZ(10px)",
          }}
        />
      </div>
      
      {/* Help tooltip underneath */}
      <div className="text-center mt-3 h-4">
        <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-neutral-600">
          {isOpen ? (isFocused ? "Typing Mode Active" : "Hovering Screen Open") : "Hover to open Macbook screen"}
        </span>
      </div>
    </div>
  );
}
