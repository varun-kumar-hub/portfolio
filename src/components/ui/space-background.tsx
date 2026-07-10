'use client';

import React, { useEffect, useRef } from 'react';

interface SpaceBackgroundProps extends React.ComponentProps<'div'> {}

interface Star {
  x: number;
  y: number;
  originX: number;
  originY: number;
  size: number;
  opacity: number;
  baseOpacity: number;
  speedX: number;
  speedY: number;
  depth: number; // 1 (far), 2 (medium), 3 (close)
  twinkleSpeed: number;
  twinklePhase: number;
}

interface ShootingStar {
  x: number;
  y: number;
  dx: number;
  dy: number;
  length: number;
  speed: number;
  opacity: number;
  color: string;
  size: number;
}

interface Nebula {
  x: number;
  y: number;
  radius: number;
  color: string;
  dx: number;
  dy: number;
  targetX: number;
  targetY: number;
}

export function SpaceBackground({ ...props }: SpaceBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const targetMousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high DPI screens
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth || document.documentElement.clientWidth || 1024;
      const height = window.innerHeight || document.documentElement.clientHeight || 768;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);



    // Generate Stars with Depth Layers
    const starCount = 220;
    const stars: Star[] = [];

    for (let i = 0; i < starCount; i++) {
      const rx = Math.random(); // 0 to 1
      const ry = Math.random(); // 0 to 1
      
      // Determine depth layer (1: distant, 2: mid, 3: close)
      const rand = Math.random();
      let depth = 1;
      let size = Math.random() * 0.6 + 0.3; // Distant stars (tiny)
      let baseOpacity = Math.random() * 0.4 + 0.15;
      
      if (rand > 0.85) {
        depth = 3;
        size = Math.random() * 1.0 + 1.2; // Close stars (large & glowing)
        baseOpacity = Math.random() * 0.4 + 0.6;
      } else if (rand > 0.5) {
        depth = 2;
        size = Math.random() * 0.5 + 0.8; // Mid stars
        baseOpacity = Math.random() * 0.4 + 0.35;
      }

      stars.push({
        x: rx,
        y: ry,
        originX: rx,
        originY: ry,
        size: size,
        opacity: baseOpacity,
        baseOpacity: baseOpacity,
        speedX: (Math.random() * 0.03 + 0.01) * (Math.random() > 0.5 ? 1 : -1),
        speedY: (Math.random() * 0.03 + 0.01) * (Math.random() > 0.5 ? 1 : -1),
        depth: depth,
        twinkleSpeed: Math.random() * 0.015 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }

    // Generate Shifting Cosmic Nebulae (Ambient color dust) with percentage coordinates
    const nebulae = [
      {
        xPercent: 0.25,
        yPercent: 0.3,
        radiusPercent: 0.45,
        color: 'rgba(79, 70, 229, 0.04)', // soft indigo
        dx: 0.05,
        dy: 0.03,
        offsetX: 0,
        offsetY: 0,
      },
      {
        xPercent: 0.75,
        yPercent: 0.65,
        radiusPercent: 0.5,
        color: 'rgba(59, 130, 246, 0.035)', // soft cyan/blue
        dx: -0.04,
        dy: 0.05,
        offsetX: 0,
        offsetY: 0,
      },
      {
        xPercent: 0.5,
        yPercent: 0.45,
        radiusPercent: 0.6,
        color: 'rgba(124, 58, 237, 0.025)', // soft purple
        dx: 0.03,
        dy: -0.04,
        offsetX: 0,
        offsetY: 0,
      }
    ];

    // Shooting stars list
    const shootingStars: ShootingStar[] = [];
    
    const spawnShootingStar = () => {
      const startX = Math.random() * (window.innerWidth * 0.95);
      const startY = Math.random() * (window.innerHeight * 0.3);
      const speed = Math.random() * 16 + 18; // faster, sudden meteor flash (18 to 34px/frame)
      shootingStars.push({
        x: startX,
        y: startY,
        dx: speed,
        dy: speed * (Math.random() * 0.2 + 0.35), // realistic angled fall
        length: Math.random() * 160 + 100, // longer trailing dust
        speed: speed,
        opacity: 1,
        color: Math.random() > 0.45 ? '#3b82f6' : '#818cf8', // bright electric blue / neon indigo
        size: Math.random() * 1.6 + 1.2, // slightly larger core size
      });
    };

    // Spawn meteor every 1.5 seconds
    const spawnTimer = setInterval(() => {
      if (Math.random() < 0.85) {
        spawnShootingStar();
      }
    }, 1500);

    let animationFrameId: number;

    const render = () => {
      const width = window.innerWidth || document.documentElement.clientWidth || 1024;
      const height = window.innerHeight || document.documentElement.clientHeight || 768;

      if (canvas.width === 0 || canvas.height === 0) {
        resizeCanvas();
      }

      ctx.clearRect(0, 0, width, height);



      // 1. Draw Cosmic Nebulae Gas Clouds
      nebulae.forEach((neb) => {
        // Slow float
        neb.offsetX += neb.dx;
        neb.offsetY += neb.dy;
        
        // Bounce bounds
        if (Math.abs(neb.offsetX) > 50) neb.dx *= -1;
        if (Math.abs(neb.offsetY) > 50) neb.dy *= -1;

        const x = neb.xPercent * width + neb.offsetX;
        const y = neb.yPercent * height + neb.offsetY;
        const radius = Math.min(width, height) * neb.radiusPercent;

        const radialGlow = ctx.createRadialGradient(
          x, y, 0,
          x, y, radius
        );
        radialGlow.addColorStop(0, neb.color);
        radialGlow.addColorStop(0.5, neb.color.replace(/[\d.]+\)$/, '0.005)'));
        radialGlow.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = radialGlow;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Render and animate Stars
      stars.forEach((star) => {
        // Slow idle drift (convert pixel speed to percentage offset)
        star.originX += star.speedX / width;
        star.originY += star.speedY / height;

        // Wrap edges (0 to 1)
        if (star.originX < 0) star.originX = 1;
        if (star.originX > 1) star.originX = 0;
        if (star.originY < 0) star.originY = 1;
        if (star.originY > 1) star.originY = 0;

        const drawX = star.originX * width;
        const drawY = star.originY * height;

        // Twinkling animation (Breathe opacity)
        star.twinklePhase += star.twinkleSpeed;
        const twinkleFactor = Math.sin(star.twinklePhase);
        
        // Stars twinkle differently depending on depth
        let currentOpacity = star.baseOpacity;
        if (star.depth === 1) {
          currentOpacity = star.baseOpacity * (0.6 + twinkleFactor * 0.4);
        } else if (star.depth === 3) {
          currentOpacity = star.baseOpacity * (0.85 + twinkleFactor * 0.15);
        }

        // Draw star core
        ctx.beginPath();
        ctx.arc(drawX, drawY, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(248, 250, 252, ${currentOpacity})`; // clean slate-50 white
        ctx.fill();

        // Draw glow aura for foreground stars
        if (star.depth === 3 && currentOpacity > 0.5) {
          ctx.beginPath();
          ctx.arc(drawX, drawY, star.size * 2.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(147, 197, 253, ${currentOpacity * 0.18})`; // subtle sapphire blue glow aura
          ctx.fill();
        }
      });

      // 3. Render and animate Shooting Stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        
        // --- 3a. Draw Wide Ambient Glow Trail (Atmospheric Friction) ---
        ctx.beginPath();
        const glowGradient = ctx.createLinearGradient(
          ss.x, ss.y, 
          ss.x - ss.dx, ss.y - ss.dy
        );
        glowGradient.addColorStop(0, ss.color + Math.floor(ss.opacity * 120).toString(16).padStart(2, '0'));
        glowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.strokeStyle = glowGradient;
        ctx.lineWidth = ss.size * 3.2; // wider glow envelope
        ctx.lineCap = 'round';
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(ss.x - ss.dx * (ss.length / ss.speed), ss.y - ss.dy * (ss.length / ss.speed));
        ctx.stroke();

        // --- 3b. Draw Sharp Bright Core Trail ---
        ctx.beginPath();
        const coreGradient = ctx.createLinearGradient(
          ss.x, ss.y, 
          ss.x - ss.dx, ss.y - ss.dy
        );
        coreGradient.addColorStop(0, `rgba(255, 255, 255, ${ss.opacity})`);
        coreGradient.addColorStop(0.2, ss.color + Math.floor(ss.opacity * 255).toString(16).padStart(2, '0'));
        coreGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.strokeStyle = coreGradient;
        ctx.lineWidth = ss.size;
        ctx.lineCap = 'round';
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(ss.x - ss.dx * (ss.length / ss.speed), ss.y - ss.dy * (ss.length / ss.speed));
        ctx.stroke();

        // --- 3c. Draw Intense Burning Meteor Head ---
        ctx.beginPath();
        ctx.arc(ss.x, ss.y, ss.size * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${ss.opacity})`;
        ctx.shadowColor = ss.color;
        ctx.shadowBlur = 18; // intense glowing aura
        ctx.fill();
        ctx.shadowBlur = 0; // reset shadow blur

        // Move shooting star
        ss.x += ss.dx;
        ss.y += ss.dy;
        ss.opacity -= 0.024; // realistic rapid atmospheric burnout

        // Clean up when faded out or exit screen
        if (ss.opacity <= 0 || ss.x > width + 100 || ss.y > height + 100) {
          shootingStars.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);

      cancelAnimationFrame(animationFrameId);
      clearInterval(spawnTimer);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1, // behind layout (z-2)
        pointerEvents: 'none',
        opacity: 0.8,
      }}
      {...props}
    >
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
    </div>
  );
}
