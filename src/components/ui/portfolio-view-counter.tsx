"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye } from "lucide-react";
import { getPortfolioViews } from "@/lib/firebase";

interface PortfolioViewCounterProps {
  className?: string;
  compact?: boolean;
}

/**
 * Formats view count into readable string
 * Examples: 532, 1,248 (or 1.2K), 12.8K, 128K, 1.3M
 */
export function formatViewCount(num: number, compact: boolean = false): string {
  if (num < 1000) {
    return num.toLocaleString();
  }
  if (compact || num >= 10000) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    }
  }
  return num.toLocaleString();
}

export function PortfolioViewCounter({
  className = "",
  compact = false,
}: PortfolioViewCounterProps) {
  const [count, setCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchViews() {
      try {
        const views = await getPortfolioViews();
        if (isMounted) {
          if (views !== null) {
            setCount(views);
            setIsError(false);
          } else {
            setIsError(true);
          }
          setIsLoading(false);
        }
      } catch (err) {
        console.warn("PortfolioViewCounter notice:", err);
        if (isMounted) {
          setIsError(true);
          setIsLoading(false);
        }
      }
    }

    fetchViews();

    return () => {
      isMounted = false;
    };
  }, []);

  const formattedValue =
    isLoading ? "..." : isError || count === null ? "--" : formatViewCount(count, compact);

  return (
    <div
      aria-label="Portfolio Views"
      className={`group relative inline-flex min-w-[5.75rem] items-center justify-center gap-2 rounded-lg bg-slate-100/80 px-3.5 py-2 shadow-sm backdrop-blur-md border border-slate-200/80 transition-all duration-300 hover:border-red-500/50 hover:bg-slate-200/60 hover:shadow-[0_0_20px_rgba(239,68,68,0.2)] dark:bg-white/[0.04] dark:border-white/[0.08] dark:hover:bg-red-950/30 select-none cursor-default ${className}`}
    >
      <div className="relative flex items-center justify-center">
        <Eye className="w-4 h-4 text-red-500 dark:text-red-400 transition-colors duration-300" />
        <span className="absolute inset-0 rounded-full bg-red-500/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>

      <div className="flex min-w-[2.25rem] items-center justify-end font-mono">
        <AnimatePresence mode="wait">
          <motion.span
            key={formattedValue}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="text-xs sm:text-sm font-extrabold text-slate-800 dark:text-neutral-100 group-hover:text-red-600 dark:group-hover:text-red-300 transition-colors duration-300"
          >
            {formattedValue}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default PortfolioViewCounter;
