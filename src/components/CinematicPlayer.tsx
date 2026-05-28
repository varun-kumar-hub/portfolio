import React, { useRef, useEffect, useCallback } from 'react';

interface CinematicPlayerProps {
  frames: (ImageBitmap | null)[];
  currentFrame: number;
  speed: number;
  isComplete: boolean;
  onTransitionStart: () => void;
}

/**
 * Full-viewport canvas that renders frame sequences with sub-frame
 * crossfade interpolation for ultra-smooth perceived motion.
 * Renders at full native device resolution for maximum sharpness.
 */
const CinematicPlayer: React.FC<CinematicPlayerProps> = ({
  frames,
  currentFrame,
  speed,
  isComplete,
  onTransitionStart,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const transitionTriggered = useRef(false);
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 });

  /** One-time canvas sizing (also called on resize) */
  const syncCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;

    // Only resize if dimensions actually changed
    if (sizeRef.current.w === w && sizeRef.current.h === h && sizeRef.current.dpr === dpr) return;
    sizeRef.current = { w, h, dpr };

    // Set the backing store to full native device pixels
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    // Re-acquire context after resize (resets transform)
    const ctx = canvas.getContext('2d', { alpha: false });
    if (ctx) {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctxRef.current = ctx;
    }
  }, []);

  // Init canvas + listen for resize
  useEffect(() => {
    syncCanvasSize();
    window.addEventListener('resize', syncCanvasSize);
    return () => window.removeEventListener('resize', syncCanvasSize);
  }, [syncCanvasSize]);

  // Draw loop — fires every time currentFrame changes
  useEffect(() => {
    const ctx = ctxRef.current;
    if (!ctx) {
      // Canvas may not be sized yet on first mount
      syncCanvasSize();
      if (!ctxRef.current) return;
    }
    const context = ctxRef.current!;
    const { w, h, dpr } = sizeRef.current;
    const canvasW = Math.round(w * dpr);
    const canvasH = Math.round(h * dpr);

    // Calculate frame indices and interpolation factor
    const floorIdx = Math.floor(currentFrame);
    const ceilIdx = Math.min(floorIdx + 1, frames.length - 1);
    const alpha = currentFrame - floorIdx;

    const frameCurrent = frames[floorIdx];
    const frameNext = frames[ceilIdx];

    // Clear to black
    context.fillStyle = '#000000';
    context.fillRect(0, 0, canvasW, canvasH);

    if (frameCurrent) {
      // Draw current frame at full native resolution (no CSS-pixel scaling)
      drawCoverFit(context, frameCurrent, canvasW, canvasH);

      // Sub-frame crossfade blending with next frame
      if (frameNext && alpha > 0.01 && floorIdx !== ceilIdx) {
        context.globalAlpha = alpha;
        drawCoverFit(context, frameNext, canvasW, canvasH);
        context.globalAlpha = 1;
      }
    }

    // Trigger portfolio transition when complete
    if (isComplete && !transitionTriggered.current) {
      transitionTriggered.current = true;
      setTimeout(() => onTransitionStart(), 500);
    }
  }, [currentFrame, frames, isComplete, onTransitionStart, speed, syncCanvasSize]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'block',
        zIndex: 10,
      }}
    />
  );
};

/**
 * Draws an image with cover-fit scaling at native canvas-pixel resolution.
 * All coordinates are in device pixels (not CSS pixels).
 */
function drawCoverFit(
  ctx: CanvasRenderingContext2D,
  img: ImageBitmap,
  canvasW: number,
  canvasH: number,
) {
  const imgRatio = img.width / img.height;
  const canvasRatio = canvasW / canvasH;

  let drawW: number, drawH: number, offsetX: number, offsetY: number;

  if (imgRatio > canvasRatio) {
    // Image is wider — fit height, crop sides
    drawH = canvasH;
    drawW = canvasH * imgRatio;
    offsetX = (canvasW - drawW) / 2;
    offsetY = 0;
  } else {
    // Image is taller — fit width, crop top/bottom
    drawW = canvasW;
    drawH = canvasW / imgRatio;
    offsetX = 0;
    offsetY = (canvasH - drawH) / 2;
  }

  ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
}

export default CinematicPlayer;
