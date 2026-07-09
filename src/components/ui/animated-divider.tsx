"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function AnimatedDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  return (
    <div ref={ref} className="relative w-full h-[1px] overflow-hidden">
      {/* Base line */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300/30 to-transparent dark:via-gray-700/30" />

      {/* Animated shimmer streak */}
      <motion.div
        className="absolute inset-y-0 w-[200px]"
        initial={{ left: "-200px" }}
        animate={isInView ? { left: "calc(100% + 200px)" } : {}}
        transition={{
          duration: 1.5,
          delay: 0.2,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--accent), transparent)",
          opacity: 0.6,
        }}
      />

      {/* Center glow dot */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full"
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.8 }}
        style={{
          backgroundColor: "var(--accent)",
          boxShadow: "0 0 8px var(--accent-glow), 0 0 20px var(--accent-glow)",
        }}
      />
    </div>
  );
}
