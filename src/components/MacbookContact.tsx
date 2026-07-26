"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X } from "lucide-react";

interface MacbookContactProps {
  className?: string;
}

export default function MacbookContact({ className }: MacbookContactProps) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isClickedOpen, setIsClickedOpen] = useState(false);
  const [isManuallyClosed, setIsManuallyClosed] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Submit Handler connecting to `/api/contact`
  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatusMessage({ type: "error", text: "Please fill in all fields." });
      setTimeout(() => setStatusMessage(null), 5000);
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setStatusMessage({ type: "error", text: "Please enter a valid email address." });
      setTimeout(() => setStatusMessage(null), 5000);
      return;
    }

    setIsSubmitting(true);
    setStatusMessage(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
        }),
        signal: AbortSignal.timeout(15000),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setStatusMessage({ type: "success", text: "Message sent successfully!" });
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => {
          setStatusMessage(null);
        }, 6000);
      } else {
        const errorText = data.error || "Failed to send message. Please try again.";
        setStatusMessage({ type: "error", text: errorText });
        setTimeout(() => setStatusMessage(null), 8000);
      }
    } catch (error: unknown) {
      const err = error as { name?: string } | undefined;
      if (err?.name === "AbortError" || err?.name === "TimeoutError") {
        setStatusMessage({ type: "error", text: "Request timed out. Please try again." });
      } else {
        console.error("Contact form error:", error);
        setStatusMessage({ type: "error", text: "Something went wrong. Please try again later." });
      }
      setTimeout(() => setStatusMessage(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    setTimeout(() => {
      if (document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
        setIsFocused(false);
      }
    }, 150);
  };

  const isTyping = Boolean(formData.name.trim() || formData.email.trim() || formData.message.trim());
  const isOpen = (isHovered || isFocused || isTyping || isSubmitting || Boolean(statusMessage) || isClickedOpen) && !isManuallyClosed;

  // Mock keyboard rows to match design
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
      className={`relative w-full max-w-[420px] sm:max-w-[440px] lg:max-w-[460px] mx-auto py-1 cursor-pointer select-none ${className}`}
      onMouseEnter={() => {
        setIsHovered(true);
        setIsManuallyClosed(false);
      }}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        if (isManuallyClosed) {
          setIsManuallyClosed(false);
        } else {
          setIsClickedOpen((prev) => !prev);
        }
      }}
    >
      {/* 3D Scene Wrapper */}
      <div 
        className="relative w-full aspect-[16/11] mx-auto flex items-center justify-center"
        style={{
          perspective: "1400px",
        }}
      >
        {/* Ambient shadow underneath the laptop */}
        <div 
          className="absolute bottom-1 w-[92%] h-[12%] bg-slate-500/25 dark:bg-black/60 blur-2xl rounded-full transition-transform duration-700 pointer-events-none"
          style={{
            transform: isOpen ? "scale(1.02, 0.9)" : "scale(0.95, 0.8)",
          }}
        />

        {/* ─── MACBOOK LID (Rotates on Hinge) ─── */}
        <motion.div
          animate={{
            rotateX: isOpen ? (isFocused ? 0 : -10) : -90,
            y: isOpen ? 6 : 18,
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
          className="absolute bottom-[40%] w-[88%] h-[74%] bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 dark:from-[#1d1d1f] dark:via-[#1d1d1f] dark:to-[#1d1d1f] rounded-[14px] border-b-[3px] border-slate-400/70 dark:border-[#0e0e0f] z-20 shadow-[0_-12px_30px_rgba(15,23,42,0.16),0_18px_45px_rgba(15,23,42,0.12)] dark:shadow-[0_-15px_30px_rgba(0,0,0,0.6)]"
        >
          {/* Back side of lid (Metallic Lid Top with Apple-style Logo) */}
          <div 
            className="absolute inset-0 rounded-[14px] bg-gradient-to-br from-slate-50 via-slate-200 to-slate-300 dark:from-[#1d1d1f] dark:via-[#1d1d1f] dark:to-[#1d1d1f] border border-white/80 dark:border-white/5 flex flex-col items-center justify-center overflow-hidden"
            style={{
              transform: "rotateY(180deg)",
              backfaceVisibility: "hidden",
            }}
          >
            <div className="absolute inset-x-4 top-2 h-px bg-white/90 dark:bg-white/10" />
            <div className="w-8 h-8 rounded-full bg-white/60 dark:bg-white/5 border border-slate-300/70 dark:border-white/10 flex items-center justify-center shadow-inner">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/60 blur-[1px]" />
            </div>
          </div>

          {/* Front side of screen (display bezel & window content) */}
          <div 
            className="absolute inset-0 rounded-[14px] bg-slate-100 dark:bg-black p-[6px] flex flex-col border border-slate-300 dark:border-[#2d2d30] pointer-events-auto z-30 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] dark:shadow-none"
            style={{
              backfaceVisibility: "hidden",
            }}
          >
            {/* Camera Dot */}
            <div className="w-full h-3 flex items-center justify-center shrink-0">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-[#0d0d0d] border border-slate-400/50 dark:border-white/5 flex items-center justify-center">
                <div className="w-0.5 h-0.5 rounded-full bg-red-500/80" />
              </div>
            </div>

            {/* Screen Inner Display Area */}
            <div className="flex-1 w-full bg-white dark:bg-[#0c0c0e] rounded-[8px] overflow-hidden border border-slate-200 dark:border-white/[0.05] relative flex flex-col text-left pointer-events-auto z-30 transition-colors shadow-[inset_0_0_0_1px_rgba(255,255,255,0.8)]">
              {/* macOS Style Window Titlebar */}
              <div className="h-6 w-full bg-slate-100 dark:bg-[#18181b] border-b border-slate-200 dark:border-white/[0.04] px-3 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsManuallyClosed(true);
                    }}
                    title="Close Macbook Lid"
                    className="w-2.5 h-2.5 rounded-full bg-[#ef4444] hover:bg-[#dc2626] transition-colors cursor-pointer border-none flex items-center justify-center p-0 group"
                  >
                    <X className="w-1.5 h-1.5 text-black opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#10b981]/80" />
                </div>
                <span className="text-[9px] font-sans font-medium text-slate-600 dark:text-neutral-500 tracking-wider">
                  mail://varunkumar.dev
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsManuallyClosed(true);
                  }}
                  className="flex items-center gap-1 text-[8px] font-mono font-bold text-slate-600 dark:text-neutral-400 hover:text-red-500 dark:hover:text-red-400 transition-colors cursor-pointer px-1.5 py-0.5 rounded bg-white dark:bg-neutral-800/80 border border-slate-200 dark:border-white/10 shadow-sm"
                >
                  <X className="w-2.5 h-2.5" />
                  <span>Close</span>
                </button>
              </div>

              {/* Display Content: Form */}
              <div className="flex-1 p-3 flex flex-col justify-between relative overflow-y-auto scrollbar-none pointer-events-auto z-30">
                <form onSubmit={handleSubmit} className="space-y-2 flex flex-col justify-between h-full relative z-30">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-0.5">
                      <label className="text-[8px] font-bold text-slate-600 dark:text-neutral-500 uppercase tracking-widest block">
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
                        className="w-full bg-white dark:bg-neutral-900/60 border border-slate-200 dark:border-white/[0.06] rounded-md px-2 py-1 text-[10px] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-neutral-600 focus:outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-500/10 focus:bg-white dark:focus:bg-neutral-900 hover:border-slate-300 transition-all font-sans relative z-30 shadow-sm"
                      />
                    </div>
                    <div className="space-y-0.5">
                      <label className="text-[8px] font-bold text-slate-600 dark:text-neutral-500 uppercase tracking-widest block">
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
                        className="w-full bg-white dark:bg-neutral-900/60 border border-slate-200 dark:border-white/[0.06] rounded-md px-2 py-1 text-[10px] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-neutral-600 focus:outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-500/10 focus:bg-white dark:focus:bg-neutral-900 hover:border-slate-300 transition-all font-sans relative z-30 shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-0.5 flex-1 flex flex-col">
                    <label className="text-[8px] font-bold text-slate-600 dark:text-neutral-500 uppercase tracking-widest block">
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
                      className="w-full flex-1 min-h-[44px] bg-white dark:bg-neutral-900/60 border border-slate-200 dark:border-white/[0.06] rounded-md px-2 py-1 text-[10px] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-neutral-600 focus:outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-500/10 focus:bg-white dark:focus:bg-neutral-900 hover:border-slate-300 transition-all font-sans resize-none relative z-30 shadow-sm"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSubmit(e);
                    }}
                    disabled={isSubmitting}
                    className="w-full py-1.5 rounded-md bg-red-600 hover:bg-red-500 text-white font-semibold text-[10px] uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer border-none relative z-50 pointer-events-auto"
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

                {/* Status Toast */}
                <AnimatePresence>
                  {statusMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      className={`absolute bottom-2 left-2 right-2 z-50 rounded-md px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-wider text-center border backdrop-blur-sm shadow-md ${
                        statusMessage.type === "success"
                          ? "bg-emerald-950/90 border-emerald-500/40 text-emerald-300"
                          : "bg-red-950/90 border-red-500/40 text-red-300"
                      }`}
                    >
                      {statusMessage.text}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ─── MACBOOK BASE (Chassis) ─── */}
        <div 
          className="absolute bottom-[1%] w-[94%] h-[48%] bg-gradient-to-br from-slate-100 via-slate-200 to-slate-400 dark:from-[#1d1d1f] dark:via-[#1d1d1f] dark:to-[#1d1d1f] rounded-t-[4px] rounded-b-[24px] origin-bottom shadow-[0_28px_55px_rgba(15,23,42,0.22),inset_0_1px_0_rgba(255,255,255,0.85)] dark:shadow-[0_25px_50px_rgba(0,0,0,0.8)] z-10 border-t border-white/80 dark:border-[#3a3a3c] border-b border-slate-500 dark:border-black flex flex-col justify-between pointer-events-none"
          style={{
            transform: "rotateX(62deg)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Keyboard Recess */}
          <div className="w-[94%] h-[68%] mx-auto mt-2 rounded-[10px] bg-slate-300/80 dark:bg-[#101011] p-1 shadow-[inset_0_2px_8px_rgba(15,23,42,0.18)] dark:shadow-[inset_0_4px_12px_rgba(0,0,0,0.9)] flex flex-col justify-between pointer-events-none">
            {keyboardRows.map((row, rowIdx) => (
              <div key={rowIdx} className="flex w-full justify-between gap-[1.5px] pointer-events-none">
                {row.map((key, keyIdx) => {
                  const isSpace = key === "space";
                  const isShift = key === "shift";
                  
                  return (
                    <div
                      key={keyIdx}
                      style={{
                        flexGrow: isSpace ? 5 : isShift ? 1.8 : 1,
                        boxShadow: isOpen 
                          ? "0 0 1px rgba(255,255,255,0.08), inset 0 -1px 1px rgba(255,255,255,0.05)" 
                          : "none",
                      }}
                      className={`
                        h-[12px] rounded-[1.5px] bg-slate-50 dark:bg-[#18181b] border-t border-white/70 dark:border-white/[0.04] text-[4px] font-sans flex items-center justify-center text-slate-500 dark:text-neutral-400 select-none pointer-events-none
                        ${isSpace ? "w-28" : ""}
                        ${isOpen ? "shadow-[0_1px_2px_rgba(15,23,42,0.12)] dark:shadow-[0_0_2px_rgba(255,255,255,0.25)] border-white/80 dark:border-white/[0.08] text-slate-700 dark:text-neutral-300" : "text-slate-400 dark:text-neutral-600 border-none"}
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
          <div className="w-[28%] h-[24%] mx-auto mb-1 rounded-t-[4px] rounded-b-[8px] border border-slate-400/40 dark:border-white/[0.04] bg-slate-300/80 dark:bg-[#222224] shadow-[inset_0_1px_4px_rgba(15,23,42,0.12)] dark:shadow-[inset_0_1px_4px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center shrink-0 pointer-events-none">
            <div className="w-full h-[1px] bg-white/40 dark:bg-white/[0.02]" />
          </div>
        </div>

        {/* ─── MACBOOK FRONT EDGE LIP ─── */}
        <div 
          className="absolute bottom-[1%] w-[94%] h-[6px] bg-slate-400 dark:bg-[#0c0c0e] rounded-b-[24px] border-t border-white/50 dark:border-[#3a3a3c]/30 z-10 pointer-events-none"
          style={{
            transform: "translateY(19.5px) translateZ(10px)",
          }}
        />
      </div>
      
      {/* Help tooltip underneath */}
      <div className="text-center mt-2 h-4 pointer-events-none">
        <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-slate-500 dark:text-neutral-500 font-semibold">
          {isOpen ? (isFocused ? "Typing Mode Active" : "Hovering Screen Open") : "Hover to open Macbook screen"}
        </span>
      </div>
    </div>
  );
}
