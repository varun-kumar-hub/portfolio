"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface StatItem {
  value: string;
  suffix?: string;
  label: string;
}

const stats: StatItem[] = [
  { value: "5", suffix: "+", label: "Projects Built" },
  { value: "9.37", label: "CGPA Score" },
  { value: "200", suffix: "+", label: "Users Served" },
  { value: "1", label: "Patent Filed" },
];

function CountUp({
  target,
  suffix = "",
  isDecimal = false,
}: {
  target: string;
  suffix?: string;
  isDecimal?: boolean;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    const targetNum = parseFloat(target);
    const duration = 1800;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = eased * targetNum;
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, target]);

  const displayValue = isDecimal ? count.toFixed(2) : Math.round(count);

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue}
      {suffix}
    </span>
  );
}

export default function AnimatedStats() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 w-full max-w-2xl mx-auto md:mx-0 mt-8"
    >
      {stats.map((stat, idx) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.5,
            delay: 0.4 + idx * 0.1,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="flex flex-col items-center md:items-start gap-1 px-3 py-3 rounded-xl border border-gray-800/30 bg-white/[0.02] backdrop-blur-sm"
        >
          <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            <CountUp
              target={stat.value}
              suffix={stat.suffix}
              isDecimal={stat.value.includes(".")}
            />
          </span>
          <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
            {stat.label}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}
