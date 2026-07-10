"use client";

import React, { useState, useEffect, useRef } from "react";

interface BurstParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  opacity: number;
  color: string;
  size: number;
}

interface GravityRipple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  color: string;
  speed: number;
}

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const trailPoints = useRef<{ x: number; y: number; age: number }[]>([]);
  const burstParticles = useRef<BurstParticle[]>([]);
  const ripples = useRef<GravityRipple[]>([]);
  const lastRipplePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Detect touch devices — disable custom cursor entirely
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const canvas = canvasRef.current;

    if (!dot || !ring || !canvas) return;

    let isVisible = false;
    let isHovering = false;
    let isClicking = false;
    let hoverPulseCounter = 0;

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
        ring.classList.add("visible");
        canvas.style.opacity = "1";
      }

      // Spawn motion-based ripple if mouse moves past distance threshold
      const dx = e.clientX - lastRipplePos.current.x;
      const dy = e.clientY - lastRipplePos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 22) {
        ripples.current.push({
          x: e.clientX,
          y: e.clientY,
          radius: 3,
          maxRadius: 38,
          opacity: 0.45,
          color: "rgba(148, 163, 184, 0.4)",
          speed: 1.1,
        });
        lastRipplePos.current = { x: e.clientX, y: e.clientY };
      }

      // Add motion dust trail points
      trailPoints.current.push({ x: e.clientX, y: e.clientY, age: 0 });
      if (trailPoints.current.length > 12) {
        trailPoints.current.shift();
      }
    };

    const handleMouseDown = () => {
      isClicking = true;
      dot.classList.add("clicking");
      ring.classList.add("clicking");

      // Spawn satellite burst particles on click!
      const colors = ["#cbd5e1", "#94a3b8", "#64748b", "#ffffff"];
      for (let i = 0; i < 12; i++) {
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 4 + 3;
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
      ring.classList.remove("clicking");
    };

    const handleMouseLeave = () => {
      isVisible = false;
      dot.classList.remove("visible");
      ring.classList.remove("visible");
      canvas.style.opacity = "0";
    };

    const handleMouseEnter = () => {
      isVisible = true;
      dot.classList.add("visible");
      ring.classList.add("visible");
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
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background-color: rgb(241, 245, 249);
        box-shadow: 0 0 6px rgba(148, 163, 184, 0.7), 0 0 15px rgba(71, 85, 105, 0.35);
        opacity: 0;
        will-change: transform;
        transform: translate3d(-100px, -100px, 0);
        transition: width 0.15s ease-out, height 0.15s ease-out, opacity 0.15s ease-out, background-color 0.15s ease-out;
      }
      
      .custom-cursor-dot.visible {
        opacity: 1;
      }
      
      .custom-cursor-dot.hovering {
        width: 10px;
        height: 10px;
        background-color: rgb(96, 165, 250);
      }
      
      .custom-cursor-dot.clicking {
        width: 4px;
        height: 4px;
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
        border: 1px solid rgba(148, 163, 184, 0.45);
        opacity: 0;
        will-change: transform;
        transform: translate3d(-100px, -100px, 0);
        transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1), height 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.15s ease-out, border-color 0.15s ease-out, background-color 0.15s ease-out;
      }
      
      .custom-cursor-ring.visible {
        opacity: 1;
      }
      
      .custom-cursor-ring.hovering {
        width: 38px;
        height: 38px;
        border-color: rgba(96, 165, 250, 0.6);
        background-color: rgba(96, 165, 250, 0.05);
        box-shadow: 0 0 10px rgba(96, 165, 250, 0.15);
      }
      
      .custom-cursor-ring.clicking {
        width: 14px;
        height: 14px;
        border-color: rgba(96, 165, 250, 0.8);
      }
    `;
    document.head.appendChild(style);

    // Animation Loop
    let animFrame: number;
    
    const animate = () => {
      animFrame = requestAnimationFrame(animate);

      // Lerp ring position for trailing motion
      const lerpFactor = 0.16;
      if (ringPos.current.x === -100 && mousePos.current.x !== -100) {
        ringPos.current = { ...mousePos.current };
      } else {
        ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerpFactor;
        ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerpFactor;
      }

      // Core dot translate
      dot.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate3d(-50%, -50%, 0)`;

      // Ring translate
      ring.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate3d(-50%, -50%, 0)`;

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
            const size = Math.max(0.4, (1 - point.age / 16) * 1.4);
            ctx.beginPath();
            ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(148, 163, 184, ${alpha})`;
            ctx.fill();
          });

          // 2. Pulse Gravity Ripples on Hover
          if (isHovering && !isClicking) {
            hoverPulseCounter++;
            if (hoverPulseCounter % 16 === 0) {
              ripples.current.push({
                x: mousePos.current.x,
                y: mousePos.current.y,
                radius: 4,
                maxRadius: 44,
                opacity: 0.5,
                color: "rgba(100, 116, 139, 0.45)",
                speed: 1.3,
              });
            }
          }

          // 3. Render and animate Gravity ripples
          for (let i = ripples.current.length - 1; i >= 0; i--) {
            const r = ripples.current[i];
            r.radius += r.speed;
            const fade = Math.max(0, 1 - r.radius / r.maxRadius);
            r.opacity = fade * 0.45;

            if (r.radius >= r.maxRadius || r.opacity <= 0) {
              ripples.current.splice(i, 1);
            } else {
              ctx.beginPath();
              ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
              ctx.strokeStyle = r.color.replace(/[\d.]+\)$/, `${r.opacity})`);
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }

          // 4. Render and animate Click Burst Particles
          for (let i = burstParticles.current.length - 1; i >= 0; i--) {
            const p = burstParticles.current[i];
            p.x += p.vx;
            p.y += p.vy;
            p.opacity -= 0.038;

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
  }, [mounted]);

  // Client-side render check
  if (!mounted) return null;

  const isTouchDevice = typeof window !== "undefined" && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
  if (isTouchDevice) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-[9997] pointer-events-none transition-opacity duration-300"
        style={{ opacity: 0 }}
      />
      <div ref={ringRef} className="custom-cursor-ring" />
      <div ref={dotRef} className="custom-cursor-dot" />
    </>
  );
}
