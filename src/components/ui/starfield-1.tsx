'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

type Star = {
  x: number;
  y: number;
  z: number;
  prevX: number;
  prevY: number;
  nextX: number;
  nextY: number;
  visible: boolean;
};

type StarfieldProps = React.ComponentProps<'div'> & {
  starColor?: string;
  bgColor?: string;
  mouseAdjust?: boolean;
  tiltAdjust?: boolean;
  easing?: number;
  clickToWarp?: boolean;
  hyperspace?: boolean;
  warpFactor?: number;
  opacity?: number;
  speed?: number;
  quantity?: number;
};

type StarfieldData = {
  w: number;
  h: number;
  ctx: CanvasRenderingContext2D | null;
  cx: number;
  cy: number;
  z: number;
  stars: Star[];
  colorRatio: number;
};

const createStars = (quantity: number, data: StarfieldData): Star[] =>
  Array.from({ length: quantity }, () => ({
    x: Math.random() * data.w * 2 - data.cx * 2,
    y: Math.random() * data.h * 2 - data.cy * 2,
    z: Math.max(1, Math.round(Math.random() * data.z)),
    prevX: 0,
    prevY: 0,
    nextX: 0,
    nextY: 0,
    visible: true,
  }));

export function Starfield({
  starColor = 'rgba(255,255,255,1)',
  bgColor = 'rgba(0,0,0,1)',
  mouseAdjust = false,
  tiltAdjust = false,
  easing = 1,
  clickToWarp = false,
  hyperspace = false,
  warpFactor = 10,
  opacity = 0.1,
  speed = 1,
  quantity = 512,
  className,
  style,
  ...props
}: StarfieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const cursorRef = useRef({ x: 0, y: 0 });
  const mouseRef = useRef({ x: 0, y: 0 });
  const warpRef = useRef(hyperspace);
  const dataRef = useRef<StarfieldData>({
    w: 0,
    h: 0,
    ctx: null,
    cx: 0,
    cy: 0,
    z: 0,
    stars: [],
    colorRatio: 0,
  });

  useEffect(() => {
    warpRef.current = hyperspace;
  }, [hyperspace]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    const data = dataRef.current;
    const measureViewport = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = parent.clientWidth;
      const height = parent.clientHeight;

      data.w = width;
      data.h = height;
      data.cx = Math.round(width / 2);
      data.cy = Math.round(height / 2);
      data.z = Math.max(1, (width + height) / 2);
      data.colorRatio = 1 / data.z;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        data.ctx = ctx;
      }

      if (cursorRef.current.x === 0 && cursorRef.current.y === 0) {
        cursorRef.current.x = data.cx;
        cursorRef.current.y = data.cy;
      }
    };

    const resetStars = () => {
      measureViewport();
      data.stars = createStars(quantity, data);
    };

    const update = () => {
      const activeSpeed = warpRef.current ? speed * warpFactor : speed;
      const ratio = quantity / 2;
      mouseRef.current.x = (cursorRef.current.x - data.cx) / easing;
      mouseRef.current.y = (cursorRef.current.y - data.cy) / easing;

      data.stars.forEach((star) => {
        star.visible = true;
        star.prevX = star.nextX;
        star.prevY = star.nextY;
        star.x += mouseRef.current.x / 16;
        star.y += mouseRef.current.y / 16;

        if (star.x > data.cx * 2) {
          star.x -= data.w * 2;
          star.visible = false;
        }
        if (star.x < -data.cx * 2) {
          star.x += data.w * 2;
          star.visible = false;
        }
        if (star.y > data.cy * 2) {
          star.y -= data.h * 2;
          star.visible = false;
        }
        if (star.y < -data.cy * 2) {
          star.y += data.h * 2;
          star.visible = false;
        }

        star.z -= activeSpeed;
        if (star.z > data.z) {
          star.z -= data.z;
          star.visible = false;
        }
        if (star.z < 1) {
          star.z += data.z;
          star.visible = false;
        }

        star.nextX = data.cx + (star.x / star.z) * ratio;
        star.nextY = data.cy + (star.y / star.z) * ratio;
      });
    };

    const draw = () => {
      const ctx = data.ctx;
      if (!ctx) return;

      ctx.fillStyle = warpRef.current ? `rgba(0,0,0,${opacity})` : bgColor;
      ctx.fillRect(0, 0, data.w, data.h);
      ctx.strokeStyle = starColor;

      data.stars.forEach((star) => {
        if (
          star.prevX > 0 &&
          star.prevX < data.w &&
          star.prevY > 0 &&
          star.prevY < data.h &&
          star.visible
        ) {
          ctx.lineWidth = Math.max(0.2, (1 - data.colorRatio * star.z) * 2);
          ctx.beginPath();
          ctx.moveTo(star.prevX, star.prevY);
          ctx.lineTo(star.nextX, star.nextY);
          ctx.stroke();
        }
      });
    };

    const animate = () => {
      measureViewport();
      update();
      draw();
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      cursorRef.current.x = event.clientX - rect.left;
      cursorRef.current.y = event.clientY - rect.top;
    };

    const handleTilt = (event: DeviceOrientationEvent) => {
      if (event.beta === null || event.gamma === null) return;
      cursorRef.current.x = data.w / 2 + event.gamma * 5;
      cursorRef.current.y = data.h / 2 + event.beta * 5;
    };

    const handlePointerDown = () => {
      warpRef.current = true;
    };

    const handlePointerUp = () => {
      warpRef.current = hyperspace;
    };

    resetStars();
    animate();

    if (mouseAdjust) parent.addEventListener('mousemove', handleMouseMove);
    if (tiltAdjust) window.addEventListener('deviceorientation', handleTilt);
    if (clickToWarp) {
      parent.addEventListener('pointerdown', handlePointerDown);
      parent.addEventListener('pointerup', handlePointerUp);
      parent.addEventListener('pointerleave', handlePointerUp);
    }

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (mouseAdjust) parent.removeEventListener('mousemove', handleMouseMove);
      if (tiltAdjust) window.removeEventListener('deviceorientation', handleTilt);
      if (clickToWarp) {
        parent.removeEventListener('pointerdown', handlePointerDown);
        parent.removeEventListener('pointerup', handlePointerUp);
        parent.removeEventListener('pointerleave', handlePointerUp);
      }
      data.stars = [];
      data.ctx = null;
    };
  }, [
    bgColor,
    clickToWarp,
    easing,
    hyperspace,
    mouseAdjust,
    opacity,
    quantity,
    speed,
    starColor,
    tiltAdjust,
    warpFactor,
  ]);

  return (
    <div
      className={cn('absolute inset-0 h-full w-full', className)}
      style={style}
      {...props}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
