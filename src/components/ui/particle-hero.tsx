"use client";

import React, { useEffect, useRef, ReactNode } from "react";

interface ParticleHeroProps {
  particleCount?: number;
  className?: string;
  children?: ReactNode;
}

export const ParticleHero: React.FC<ParticleHeroProps> = ({
  particleCount = 15,
  className = "",
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const animationFrameRef = useRef<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const cursorRef = useRef({ x: 0, y: 0 });
  const staticCursorRef = useRef({ x: 0, y: 0 });
  const isAutoModeRef = useRef(true);
  const isStaticAnimationRef = useRef(false);
  const startTimeRef = useRef(0);
  const lastMouseMoveRef = useRef(0);

  const rows = particleCount;
  const totalParticles = rows * rows;

  // Initialize particles DOM elements once
  useEffect(() => {
    if (!containerRef.current) return;
    if (startTimeRef.current === 0) {
      const now = Date.now();
      startTimeRef.current = now;
      lastMouseMoveRef.current = now;
    }

    const container = containerRef.current;
    container.innerHTML = "";
    particlesRef.current = [];

    const centerRow = Math.floor(rows / 2);
    const centerCol = Math.floor(rows / 2);

    for (let i = 0; i < totalParticles; i++) {
      const particle = document.createElement("div");
      particle.className = "particle absolute rounded-full will-change-transform";

      const row = Math.floor(i / rows);
      const col = i % rows;

      const distanceFromCenter = Math.sqrt(
        Math.pow(row - centerRow, 2) + Math.pow(col - centerCol, 2)
      );

      const scale = Math.max(0.1, 1.2 - distanceFromCenter * 0.12);
      const opacity = Math.max(0.05, 1 - distanceFromCenter * 0.1);
      const lightness = Math.max(15, 75 - distanceFromCenter * 6);
      const glowSize = Math.max(0.5, 6 - distanceFromCenter * 0.5);

      particle.style.cssText = `
        width: 0.4rem;
        height: 0.4rem;
        left: ${col * 1.8}rem;
        top: ${row * 1.8}rem;
        transform: scale(${scale});
        opacity: ${opacity};
        background: hsl(4, 85%, ${lightness}%);
        box-shadow: 0 0 ${glowSize * 0.2}rem 0 hsl(4, 85%, 60%);
        mix-blend-mode: screen;
        z-index: ${Math.round(totalParticles - distanceFromCenter * 5)};
        transition: transform 0.05s linear;
      `;

      container.appendChild(particle);
      particlesRef.current.push(particle);
    }
  }, [rows, totalParticles]);

  // Continuous animation loop using rAF (Direct DOM updates for 60fps performance without state lag)
  useEffect(() => {
    const centerRow = Math.floor(rows / 2);
    const centerCol = Math.floor(rows / 2);

    const animate = () => {
      const currentTime = (Date.now() - startTimeRef.current) * 0.001;

      if (isAutoModeRef.current) {
        const x = Math.sin(currentTime * 0.3) * 200 + Math.sin(currentTime * 0.17) * 100;
        const y = Math.cos(currentTime * 0.2) * 150 + Math.cos(currentTime * 0.23) * 80;
        cursorRef.current = { x, y };
      } else if (isStaticAnimationRef.current) {
        const timeSinceLastMove = Date.now() - lastMouseMoveRef.current;

        if (timeSinceLastMove > 200) {
          const animationStrength = Math.min((timeSinceLastMove - 200) / 1000, 1);
          const subtleX = Math.sin(currentTime * 1.5) * 20 * animationStrength;
          const subtleY = Math.cos(currentTime * 1.2) * 16 * animationStrength;

          cursorRef.current = {
            x: staticCursorRef.current.x + subtleX,
            y: staticCursorRef.current.y + subtleY,
          };
        }
      }

      // Update particle positions directly
      const cur = cursorRef.current;
      particlesRef.current.forEach((particle, i) => {
        if (!particle) return;
        const row = Math.floor(i / rows);
        const col = i % rows;
        const distanceFromCenter = Math.sqrt(
          Math.pow(row - centerRow, 2) + Math.pow(col - centerCol, 2)
        );

        const originalScale = Math.max(0.1, 1.2 - distanceFromCenter * 0.12);
        const dampening = Math.max(0.3, 1 - distanceFromCenter * 0.08);

        const moveX = cur.x * dampening;
        const moveY = cur.y * dampening;

        particle.style.transform = `translate(${moveX}px, ${moveY}px) scale(${originalScale})`;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [rows]);

  const handlePointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    const event = "touches" in e ? e.touches[0] : e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const newCursor = {
      x: (event.clientX - centerX) * 0.8,
      y: (event.clientY - centerY) * 0.8,
    };

    cursorRef.current = newCursor;
    staticCursorRef.current = newCursor;
    isAutoModeRef.current = false;
    isStaticAnimationRef.current = false;
    lastMouseMoveRef.current = Date.now();

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      isStaticAnimationRef.current = true;
    }, 500);

    setTimeout(() => {
      if (Date.now() - lastMouseMoveRef.current >= 4000) {
        isAutoModeRef.current = true;
        isStaticAnimationRef.current = false;
        startTimeRef.current = Date.now();
      }
    }, 4000);
  };

  return (
    <section
      className={`relative w-full min-h-screen bg-transparent overflow-hidden flex items-center justify-center ${className}`}
      onMouseMove={handlePointerMove}
      onTouchMove={handlePointerMove}
    >
      {/* Particle Animation Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div
          ref={containerRef}
          className="relative"
          style={{
            width: `${rows * 1.8}rem`,
            height: `${rows * 1.8}rem`,
          }}
        />
      </div>

      {/* Hero Content Overlay */}
      <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center px-6 py-24">
        {children}
      </div>

      {/* Ambient Flame/Inferno Glow Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-20 left-20 w-80 h-80 bg-red-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-20 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120vh] h-[120vh] bg-gradient-radial from-red-900/10 to-transparent rounded-full"></div>
      </div>
    </section>
  );
};
