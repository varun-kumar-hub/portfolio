"use client";

import React, { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailCanvasRef = useRef<HTMLCanvasElement>(null);
  
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const trailPoints = useRef<{ x: number; y: number; age: number }[]>([]);

  useEffect(() => {
    // Detect touch devices — disable custom cursor entirely
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const canvas = trailCanvasRef.current;

    if (!dot || !ring) return;

    // Track state without React re-renders
    let isVisible = false;
    let isHovering = false;
    let isClicking = false;

    // Setup canvas size once and handle resize performantly
    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      if (!isVisible) {
        isVisible = true;
        dot.classList.add("visible");
        ring.classList.add("visible");
        if (canvas) canvas.style.opacity = "1";
      }

      // Add trail point
      trailPoints.current.push({ x: e.clientX, y: e.clientY, age: 0 });
      if (trailPoints.current.length > 25) {
        trailPoints.current.shift();
      }
    };

    const handleMouseDown = () => {
      isClicking = true;
      dot.classList.add("clicking");
      ring.classList.add("clicking");
    };

    const handleMouseUp = () => {
      isClicking = false;
      dot.classList.remove("clicking");
      ring.classList.remove("clicking");
    };

    const handleMouseLeave = () => {
      isVisible = false;
      dot.classList.remove("visible");
      ring.classList.remove("visible");
      if (canvas) canvas.style.opacity = "0";
    };

    const handleMouseEnter = () => {
      isVisible = true;
      dot.classList.add("visible");
      ring.classList.add("visible");
      if (canvas) canvas.style.opacity = "1";
    };

    // Performance-friendly event delegation to detect interactive element hovering
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInteractive = target.closest('a, button, [role="button"], input, textarea, select, [data-cursor-hover]');
      
      let cursorPointer = false;
      if (!isInteractive) {
        let curr = target;
        while (curr && curr !== document.body) {
          if (curr.classList.contains('cursor-pointer') || window.getComputedStyle(curr).cursor === 'pointer') {
            cursorPointer = true;
            break;
          }
          // Detect hover structures (cards/timelines/bento/swiper)
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
            cursorPointer = true;
            break;
          }
          curr = curr.parentElement as HTMLElement;
        }
      }

      if (isInteractive || cursorPointer) {
        if (!isHovering) {
          isHovering = true;
          dot.classList.add("hovering");
          ring.classList.add("hovering");
        }
      } else {
        if (isHovering) {
          isHovering = false;
          dot.classList.remove("hovering");
          ring.classList.remove("hovering");
        }
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleMouseOver);

    // Animation loop (hardware accelerated)
    let animFrame: number;
    let rotationAngle = 0;
    
    const animate = () => {
      animFrame = requestAnimationFrame(animate);

      // Smooth ring follow (elastic lag)
      const lag = 0.18;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lag;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lag;

      // Rotate when hovering
      if (isHovering) {
        rotationAngle = (rotationAngle + 1.5) % 360;
      } else {
        rotationAngle = 0;
      }

      // Apply positions directly to styling (Zero React overhead)
      dot.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate3d(-50%, -50%, 0)`;
      ring.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate3d(-50%, -50%, 0) rotate3d(0, 0, 1, ${rotationAngle}deg)`;

      // Render custom trail on canvas
      if (canvas && isVisible) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // Age trail points
          for (let i = trailPoints.current.length - 1; i >= 0; i--) {
            trailPoints.current[i].age += 1;
            if (trailPoints.current[i].age > 16) {
              trailPoints.current.splice(i, 1);
            }
          }

          // Draw trailing dots
          trailPoints.current.forEach((point) => {
            const alpha = Math.max(0, 1 - point.age / 16) * 0.25;
            const size = Math.max(0.4, (1 - point.age / 16) * 1.5);
            ctx.beginPath();
            ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(96, 165, 250, ${alpha})`;
            ctx.fill();
          });
        }
      }
    };

    animate();

    // Hide default system cursor
    document.body.style.cursor = "none";

    const style = document.createElement("style");
    style.id = "custom-cursor-style";
    style.textContent = `
      *, *::before, *::after { cursor: none !important; }
      
      .custom-cursor-dot {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9999;
        pointer-events: none;
        width: 4.5px;
        height: 4.5px;
        border-radius: 50%;
        background-color: rgb(96, 165, 250);
        box-shadow: 0 0 6px rgba(96, 165, 250, 0.6), 0 0 15px rgba(96, 165, 250, 0.15);
        opacity: 0;
        will-change: transform;
        transition: width 0.15s ease-out, height 0.15s ease-out, opacity 0.15s ease-out, box-shadow 0.15s ease-out;
      }
      
      .custom-cursor-dot.visible {
        opacity: 1;
      }
      
      .custom-cursor-dot.hovering {
        width: 6px;
        height: 6px;
        box-shadow: 0 0 10px rgba(96, 165, 250, 0.8), 0 0 20px rgba(96, 165, 250, 0.3);
      }
      
      .custom-cursor-dot.clicking {
        width: 3px;
        height: 3px;
      }
      
      .custom-cursor-ring {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9998;
        pointer-events: none;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 1px solid rgba(96, 165, 250, 0.2);
        background-color: transparent;
        opacity: 0;
        will-change: transform;
        transition: width 0.2s ease-out, height 0.2s ease-out, border-color 0.2s ease-out, background-color 0.2s ease-out, opacity 0.2s ease-out;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .custom-cursor-ring.visible {
        opacity: 1;
      }
      
      .custom-cursor-ring.hovering {
        width: 40px;
        height: 40px;
        border: 1px dashed rgba(96, 165, 250, 0.65);
        background-color: rgba(96, 165, 250, 0.03);
      }
      
      .custom-cursor-ring.clicking {
        width: 18px;
        height: 18px;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animFrame);
      document.body.style.cursor = "";
      const el = document.getElementById("custom-cursor-style");
      if (el) el.remove();
    };
  }, []);

  // Don't render on touch devices (SSR safe)
  if (typeof window !== "undefined" && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  return (
    <>
      {/* Trail canvas */}
      <canvas
        ref={trailCanvasRef}
        className="fixed inset-0 z-[9998] pointer-events-none transition-opacity duration-300"
        style={{ opacity: 0 }}
      />

      {/* Dot (main cursor) */}
      <div ref={dotRef} className="custom-cursor-dot" />

      {/* Ring (trailing circle) */}
      <div ref={ringRef} className="custom-cursor-ring">
        <div className="inner-radar absolute inset-1 rounded-full border border-dotted border-blue-400/0 transition-all duration-200" />
      </div>
    </>
  );
}
