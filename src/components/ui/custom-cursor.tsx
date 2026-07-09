"use client";

import React, { useEffect, useRef } from "react";

interface Satellite {
  angle: number;
  angularSpeed: number;
  radius: number;
  color: string;
  size: number;
  orbitPhase: number;
}

interface BurstParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  opacity: number;
  color: string;
  size: number;
}

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const mousePos = useRef({ x: -100, y: -100 });
  const trailPoints = useRef<{ x: number; y: number; age: number }[]>([]);
  const satellites = useRef<Satellite[]>(
    Array.from({ length: 10 }).map((_, i) => {
      const angle = (i * Math.PI * 2) / 10;
      const colors = [
        "rgba(96, 165, 250, 0.8)",  // light blue
        "rgba(129, 140, 248, 0.8)", // indigo
        "rgba(59, 130, 246, 0.8)",  // blue
        "rgba(147, 197, 253, 0.8)", // ice blue
        "rgba(99, 102, 241, 0.8)",  // royal indigo
        "rgba(196, 181, 253, 0.8)"  // pastel purple
      ];
      return {
        angle: angle,
        angularSpeed: 0.02 + Math.random() * 0.025, // varied speeds
        radius: 15 + i * 1.6, // layered orbits
        color: colors[i % colors.length],
        size: Math.random() * 0.5 + 1.2, // varied sizes
        orbitPhase: i * 36
      };
    })
  );
  const burstParticles = useRef<BurstParticle[]>([]);

  useEffect(() => {
    // Detect touch devices — disable custom cursor entirely
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const dot = dotRef.current;
    const canvas = canvasRef.current;

    if (!dot || !canvas) return;

    // Track states without React re-renders for max performance
    let isVisible = false;
    let isHovering = false;
    let isClicking = false;

    // Handle high-DPI canvas resizing
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
        canvas.style.opacity = "1";
      }

      // Add trail point
      trailPoints.current.push({ x: e.clientX, y: e.clientY, age: 0 });
      if (trailPoints.current.length > 20) {
        trailPoints.current.shift();
      }
    };

    const handleMouseDown = () => {
      isClicking = true;
      dot.classList.add("clicking");

      // Spawn satellite burst particles on click!
      const colors = ["#60a5fa", "#818cf8", "#3b82f6", "#ffffff"];
      for (let i = 0; i < 12; i++) {
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 4 + 3; // explosive speed
        burstParticles.current.push({
          x: mousePos.current.x,
          y: mousePos.current.y,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          opacity: 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 1.8 + 1,
        });
      }
    };

    const handleMouseUp = () => {
      isClicking = false;
      dot.classList.remove("clicking");
    };

    const handleMouseLeave = () => {
      isVisible = false;
      dot.classList.remove("visible");
      canvas.style.opacity = "0";
    };

    const handleMouseEnter = () => {
      isVisible = true;
      dot.classList.add("visible");
      canvas.style.opacity = "1";
    };

    // Listen for hovering over interactive targets
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
        }
      } else {
        if (isHovering) {
          isHovering = false;
          dot.classList.remove("hovering");
        }
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleMouseOver);

    // Animation Loop
    let animFrame: number;
    
    const animate = () => {
      animFrame = requestAnimationFrame(animate);

      // Core dot translate (Follow mouse immediately)
      dot.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate3d(-50%, -50%, 0)`;

      if (canvas && isVisible) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // 1. Draw Mouse Motion Dust Trail
          for (let i = trailPoints.current.length - 1; i >= 0; i--) {
            trailPoints.current[i].age += 1;
            if (trailPoints.current[i].age > 16) {
              trailPoints.current.splice(i, 1);
            }
          }

          trailPoints.current.forEach((point) => {
            const alpha = Math.max(0, 1 - point.age / 16) * 0.2;
            const size = Math.max(0.4, (1 - point.age / 16) * 1.5);
            ctx.beginPath();
            ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(96, 165, 250, ${alpha})`;
            ctx.fill();
          });

          // 2. Render and Orbit Satellites
          let targetRadius = 18;
          let speedMultiplier = 1;

          if (isClicking) {
            targetRadius = 4; // collapse tight on click core
            speedMultiplier = 1.8;
          } else if (isHovering) {
            targetRadius = 3; // charge up core on hover
            speedMultiplier = 3.6; // spin hyper fast!
          } else {
            // Subtle breathing radius expansion
            targetRadius = 18 + Math.sin(Date.now() * 0.003) * 2;
          }

          satellites.current.forEach((sat) => {
            // Smoothly ease current radius to target state
            sat.radius += (targetRadius - sat.radius) * 0.12;

            // Increment angle
            sat.angle += sat.angularSpeed * speedMultiplier;

            // Calculate 3D-like elliptical coordinates centered at mousePos
            const satX = mousePos.current.x + Math.cos(sat.angle) * sat.radius;
            // Compress Y coordinate slightly to create an angled orbital plane perspective
            const satY = mousePos.current.y + Math.sin(sat.angle) * sat.radius * 0.85;

            // Orbit path lines (draw fine faint orbital connection ring)
            if (sat.radius > 6 && !isHovering) {
              ctx.beginPath();
              ctx.ellipse(
                mousePos.current.x, mousePos.current.y,
                sat.radius, sat.radius * 0.85,
                0, 0, Math.PI * 2
              );
              ctx.strokeStyle = `rgba(96, 165, 250, 0.025)`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }

            // Draw satellite
            ctx.beginPath();
            ctx.arc(satX, satY, sat.size, 0, Math.PI * 2);
            ctx.fillStyle = sat.color;
            ctx.shadowColor = sat.color;
            ctx.shadowBlur = isHovering ? 4 : 2;
            ctx.fill();
            ctx.shadowBlur = 0; // reset
          });

          // 3. Render and animate Click Burst Particles
          for (let i = burstParticles.current.length - 1; i >= 0; i--) {
            const p = burstParticles.current[i];
            p.x += p.vx;
            p.y += p.vy;
            p.opacity -= 0.038; // quick decay

            if (p.opacity <= 0) {
              burstParticles.current.splice(i, 1);
            } else {
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
              ctx.fillStyle = p.color + Math.floor(p.opacity * 255).toString(16).padStart(2, '0');
              ctx.fill();
            }
          }
        }
      }
    };

    animate();

    // Disable default system cursor
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
        width: 6.5px;
        height: 6.5px;
        box-shadow: 0 0 10px rgba(96, 165, 250, 0.8), 0 0 20px rgba(96, 165, 250, 0.4);
      }
      
      .custom-cursor-dot.clicking {
        width: 2.5px;
        height: 2.5px;
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

  // SSR Safe Check
  if (typeof window !== "undefined" && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  return (
    <>
      {/* Canvas for motion trail, satellite orbits and click burst particles */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-[9998] pointer-events-none transition-opacity duration-300"
        style={{ opacity: 0 }}
      />

      {/* Main Cursor Core Dot */}
      <div ref={dotRef} className="custom-cursor-dot" />
    </>
  );
}
