"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailCanvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const trailPoints = useRef<{ x: number; y: number; age: number }[]>([]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mousePos.current = { x: e.clientX, y: e.clientY };
    if (!isVisible) setIsVisible(true);

    // Add trail point
    trailPoints.current.push({ x: e.clientX, y: e.clientY, age: 0 });
    if (trailPoints.current.length > 30) {
      trailPoints.current.shift();
    }
  }, [isVisible]);

  const handleMouseDown = useCallback(() => setIsClicking(true), []);
  const handleMouseUp = useCallback(() => setIsClicking(false), []);
  const handleMouseLeave = useCallback(() => setIsVisible(false), []);
  const handleMouseEnter = useCallback(() => setIsVisible(true), []);

  useEffect(() => {
    // Detect touch devices — disable custom cursor
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Track hover on interactive elements
    const updateHoverState = () => {
      const hoveredEl = document.elementFromPoint(mousePos.current.x, mousePos.current.y);
      if (hoveredEl) {
        let isInteractive = hoveredEl.closest('a, button, [role="button"], input, textarea, select, [data-cursor-hover]');
        
        // Traverse up parent tree to detect custom pointer cursors or cards
        if (!isInteractive) {
          let curr = hoveredEl as HTMLElement | null;
          while (curr && curr !== document.body) {
            const style = window.getComputedStyle(curr);
            if (style.cursor === 'pointer' || curr.classList.contains('cursor-pointer')) {
              isInteractive = curr;
              break;
            }
            const className = curr.className;
            if (
              typeof className === 'string' &&
              (className.includes('card') ||
               className.includes('bento') ||
               className.includes('swiper-slide') ||
               className.includes('timeline') ||
               className.includes('group/item') ||
               className.includes('group/s') ||
               className.includes('hover:'))
            ) {
              isInteractive = curr;
              break;
            }
            curr = curr.parentElement;
          }
        }
        setIsHovering(!!isInteractive);
      }
    };

    // Animation loop
    let animFrame: number;
    let rotationAngle = 0;
    const animate = () => {
      animFrame = requestAnimationFrame(animate);

      // Smooth ring follow (elastic lag)
      const lag = 0.18;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lag;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lag;

      // Rotate when hovering
      const targetHovering = (ringRef.current as any)?.__isHovering || false;
      if (targetHovering) {
        rotationAngle = (rotationAngle + 1.2) % 360;
      } else {
        rotationAngle = 0;
      }

      // Apply positions
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mousePos.current.x}px, ${mousePos.current.y}px) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        (ringRef.current as any).__isHovering = isHovering;
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%) rotate(${rotationAngle}deg)`;
      }

      // Draw trail on canvas
      const canvas = trailCanvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // Age trail points
          for (let i = trailPoints.current.length - 1; i >= 0; i--) {
            trailPoints.current[i].age += 1;
            if (trailPoints.current[i].age > 20) {
              trailPoints.current.splice(i, 1);
            }
          }

          // Draw trail dots
          trailPoints.current.forEach((point) => {
            const alpha = Math.max(0, 1 - point.age / 20) * 0.3;
            const size = Math.max(0.5, (1 - point.age / 20) * 1.5);
            ctx.beginPath();
            ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(96, 165, 250, ${alpha})`;
            ctx.fill();
          });
        }
      }

      updateHoverState();
    };

    animate();

    // Hide default cursor
    document.body.style.cursor = "none";

    // Also add cursor:none to all interactive elements
    const style = document.createElement("style");
    style.id = "custom-cursor-style";
    style.textContent = `*, *::before, *::after { cursor: none !important; }`;
    document.head.appendChild(style);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(animFrame);
      document.body.style.cursor = "";
      const el = document.getElementById("custom-cursor-style");
      if (el) el.remove();
    };
  }, [handleMouseMove, handleMouseDown, handleMouseUp, handleMouseLeave, handleMouseEnter, isHovering]);

  // Don't render on touch devices (SSR safe)
  if (typeof window !== "undefined" && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  return (
    <>
      {/* Trail canvas */}
      <canvas
        ref={trailCanvasRef}
        className="fixed inset-0 z-[9998] pointer-events-none"
        style={{ opacity: isVisible ? 1 : 0 }}
      />

      {/* Dot (main cursor) */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none transition-[width,height,opacity] duration-150 ease-out"
        style={{
          width: isHovering ? 6 : isClicking ? 3 : 4.5,
          height: isHovering ? 6 : isClicking ? 3 : 4.5,
          borderRadius: "50%",
          backgroundColor: "rgb(96, 165, 250)",
          boxShadow: `0 0 ${isHovering ? 10 : 6}px rgba(96, 165, 250, ${isHovering ? 0.8 : 0.6}), 0 0 ${isHovering ? 20 : 15}px rgba(96, 165, 250, ${isHovering ? 0.3 : 0.15})`,
          opacity: isVisible ? 1 : 0,
        }}
      />

      {/* Ring (trailing circle) */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none transition-[width,height,border-color,background-color,opacity] duration-200 ease-out flex items-center justify-center"
        style={{
          width: isHovering ? 40 : isClicking ? 18 : 24,
          height: isHovering ? 40 : isClicking ? 18 : 24,
          borderRadius: "50%",
          border: isHovering ? "1px dashed rgba(96, 165, 250, 0.65)" : "1px solid rgba(96, 165, 250, 0.2)",
          backgroundColor: isHovering ? "rgba(96, 165, 250, 0.03)" : "transparent",
          opacity: isVisible ? 1 : 0,
        }}
      >
        {isHovering && (
          <div className="absolute inset-1 rounded-full border border-dotted border-blue-400/25 animate-[spin_10s_linear_infinite_reverse]" />
        )}
      </div>
    </>
  );
}
