"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Send } from "lucide-react";

interface MacbookContactProps {
  className?: string;
}

export default function MacbookContact({ className }: MacbookContactProps) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
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
        setStatusMessage({ type: "success", text: "Message sent! Confirmation email sent." });
        setTimeout(() => {
          setStatusMessage(null);
        }, 6000);
      } else {
        setStatusMessage({ type: "error", text: data.error || "Failed to send message. Please try again." });
        setTimeout(() => setStatusMessage(null), 5000);
      }
    } catch (error: any) {
      if (error?.name === "AbortError" || error?.name === "TimeoutError") {
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

  const [isHovered, setIsHovered] = useState(false);

  const isTyping = Boolean(formData.name.trim() || formData.email.trim() || formData.message.trim());

  // Screen starts closed initially, and opens smoothly when hovered, focused, typing, or submitting
  const isOpen = isHovered || isFocused || isTyping || isSubmitting || Boolean(statusMessage);

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
      className={`relative w-full max-w-[500px] sm:max-w-[520px] lg:max-w-[540px] mx-auto pt-4 pb-0 mt-3 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Scene Wrapper */}
      <div 
        className="relative w-full aspect-[16/11] mx-auto flex items-center justify-center"
        style={{
          perspective: "1200px",
        }}
      >
        {/* Ambient shadow underneath the laptop */}
        <div 
          className="absolute bottom-1 w-[92%] h-[12%] bg-black/55 blur-2xl rounded-full transition-transform duration-700 pointer-events-none"
          style={{
            transform: "scale(1.02, 0.9)",
          }}
        />

        {/* ─── MACBOOK LID (Rotates on Hinge) ─── */}
        <motion.div
          animate={{
            rotateX: isFocused ? 0 : -8,
            y: -6,
            z: 8,
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
          className="absolute bottom-[40%] w-[88%] h-[74%] bg-[#1d1d1f] rounded-[14px] border-b-[3px] border-[#0e0e0f] z-30 shadow-[0_-15px_30px_rgba(0,0,0,0.6)] pointer-events-auto"
        >
          {/* Front side of screen (display bezel & window content) */}
          <div 
            className="absolute inset-0 rounded-[14px] bg-black p-[5px] flex flex-col border border-[#2d2d30] pointer-events-auto z-30"
          >
            {/* Camera Dot */}
            <div className="w-full h-3 flex items-center justify-center shrink-0">
              <div className="w-1.5 h-1.5 rounded-full bg-[#0d0d0d] border border-white/5 flex items-center justify-center">
                <div className="w-0.5 h-0.5 rounded-full bg-blue-500/80" />
              </div>
            </div>

            {/* Screen Inner Display Area */}
            <div className="flex-1 w-full bg-[#0c0c0e] rounded-[8px] overflow-hidden border border-white/[0.05] relative flex flex-col text-left pointer-events-auto z-30">
              {/* macOS Style Window Titlebar */}
              <div className="h-5 w-full bg-[#18181b] border-b border-white/[0.04] px-2.5 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-[#ef4444]/80" />
                  <div className="w-2 h-2 rounded-full bg-[#f59e0b]/80" />
                  <div className="w-2 h-2 rounded-full bg-[#10b981]/80" />
                </div>
                <span className="text-[8px] font-sans font-medium text-neutral-500 tracking-wider">
                  mail://varunkumar.dev
                </span>
                <div className="w-8" />
              </div>

              {/* Display Content: Contact Form */}
              <div className="flex-1 p-2.5 flex flex-col justify-between relative overflow-y-auto scrollbar-none pointer-events-auto z-30">
                <form onSubmit={handleSubmit} className="space-y-1.5 flex flex-col justify-between h-full relative z-30">
                  <div className="grid grid-cols-2 gap-1.5">
                    <div className="space-y-0.5">
                      <label className="text-[7.5px] font-bold text-neutral-500 uppercase tracking-widest block">
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
                        className="w-full bg-neutral-900/70 border border-white/[0.06] rounded px-1.5 py-0.5 text-[9px] text-white placeholder-neutral-600 focus:outline-none focus:border-blue-500/50 transition-all font-sans relative z-30"
                      />
                    </div>
                    <div className="space-y-0.5">
                      <label className="text-[7.5px] font-bold text-neutral-500 uppercase tracking-widest block">
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
                        className="w-full bg-neutral-900/70 border border-white/[0.06] rounded px-1.5 py-0.5 text-[9px] text-white placeholder-neutral-600 focus:outline-none focus:border-blue-500/50 transition-all font-sans relative z-30"
                      />
                    </div>
                  </div>

                  <div className="space-y-0.5 flex-1 flex flex-col">
                    <label className="text-[7.5px] font-bold text-neutral-500 uppercase tracking-widest block">
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
                      className="w-full flex-1 min-h-[38px] bg-neutral-900/70 border border-white/[0.06] rounded px-1.5 py-0.5 text-[9px] text-white placeholder-neutral-600 focus:outline-none focus:border-blue-500/50 transition-all font-sans resize-none relative z-30"
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
                    className="w-full py-1 rounded bg-blue-600 hover:bg-blue-500 text-white font-semibold text-[9px] uppercase tracking-wider flex items-center justify-center gap-1 transition-colors cursor-pointer border-none relative z-50 pointer-events-auto"
                  >
                    {isSubmitting ? (
                      <span className="w-2.5 h-2.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    ) : (
                      <>
                        <Send size={9} />
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
                      className={`absolute bottom-1 left-1 right-1 z-50 rounded px-2 py-1 text-[8px] font-bold uppercase tracking-wider text-center border backdrop-blur-sm shadow-md ${
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
          className="absolute bottom-[1%] w-[94%] h-[46%] bg-[#1d1d1f] rounded-t-[3px] rounded-b-[20px] origin-bottom shadow-[0_20px_40px_rgba(0,0,0,0.8)] z-10 border-t border-[#3a3a3c] border-b border-black flex flex-col justify-between pointer-events-none"
          style={{
            transform: "rotateX(60deg)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Keyboard Recess */}
          <div className="w-[94%] h-[68%] mx-auto mt-1.5 rounded-[8px] bg-[#101011] p-1 shadow-[inset_0_4px_10px_rgba(0,0,0,0.9)] flex flex-col justify-between pointer-events-none">
            {keyboardRows.map((row, rowIdx) => (
              <div key={rowIdx} className="flex w-full justify-between gap-[1px] pointer-events-none">
                {row.map((key, keyIdx) => {
                  const isSpace = key === "space";
                  const isShift = key === "shift";
                  
                  return (
                    <div
                      key={keyIdx}
                      style={{
                        flexGrow: isSpace ? 5 : isShift ? 1.8 : 1,
                        boxShadow: "0 0 1px rgba(255,255,255,0.08), inset 0 -1px 1px rgba(255,255,255,0.05)",
                      }}
                      className={`
                        h-[10px] rounded-[1px] bg-[#18181b] border-t border-white/[0.04] text-[3.5px] font-sans flex items-center justify-center text-neutral-300 select-none pointer-events-none
                        ${isSpace ? "w-24" : ""}
                        transition-all duration-300
                      `}
                    >
                      <span className="scale-[0.75]">{key}</span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Trackpad Container */}
          <div className="w-[28%] h-[24%] mx-auto mb-1 rounded-t-[3px] rounded-b-[6px] border border-white/[0.04] bg-[#222224] shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center shrink-0 pointer-events-none">
            <div className="w-full h-[1px] bg-white/[0.02]" />
          </div>
        </div>

        {/* ─── MACBOOK FRONT EDGE LIP ─── */}
        <div 
          className="absolute bottom-[1%] w-[94%] h-[5px] bg-[#0c0c0e] rounded-b-[20px] border-t border-[#3a3a3c]/30 z-10 pointer-events-none"
          style={{
            transform: "translateY(16px) translateZ(8px)",
          }}
        />
      </div>
    </div>
  );
}
