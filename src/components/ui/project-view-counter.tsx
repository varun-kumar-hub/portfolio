"use client";

import { useEffect, useState } from "react";

interface ProjectViewCounterProps {
  slug?: string;
  className?: string;
}

export function ProjectViewCounter({
  slug = "portfolio",
  className = "",
}: ProjectViewCounterProps) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const targetSlug = slug || "portfolio";
    const sessionKey = "viewed_portfolio_intro";
    const hasViewed = typeof window !== "undefined" && sessionStorage.getItem(sessionKey);

    // If visitor has not been counted yet in this session, increment
    const shouldIncrement = !hasViewed;

    const query = new URLSearchParams({
      slug: targetSlug,
      ...(shouldIncrement ? { increment: "true" } : {}),
    }).toString();

    let isMounted = true;

    fetch(`/api/views?${query}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (isMounted && data && typeof data.count === "number") {
          setCount(data.count);
          if (shouldIncrement) {
            sessionStorage.setItem(sessionKey, "true");
          }
        }
      })
      .catch((err) => {
        console.warn("View counter notice:", err);
      });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (count === null) return null;

  return (
    <span
      className={`font-mono text-base sm:text-lg font-extrabold text-slate-700 dark:text-neutral-300 tracking-wider ${className}`}
    >
      {count.toLocaleString()}
    </span>
  );
}
