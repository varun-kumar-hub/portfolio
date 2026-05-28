import { useRef, useCallback, useEffect, useState } from 'react';
import { TOTAL_FRAMES, BASE_FRAME_INTERVAL_MS, RELEASE_DECEL_MS, HOLD_ACCEL_MS } from '../utils/frameConfig';

export interface PlaybackState {
  /** Current fractional frame index (0 → TOTAL_FRAMES - 1) */
  currentFrame: number;
  /** Normalized progress 0 → 1 */
  progress: number;
  /** Whether the sequence is complete */
  isComplete: boolean;
  /** Current playback speed multiplier (0 → 1) */
  speed: number;
}

/**
 * Core rAF-driven playback engine.
 * Advances a fractional frame counter when holding, with smooth
 * acceleration/deceleration for natural cinematic pacing.
 */
export function usePlaybackEngine(
  isHolding: boolean,
  isReady: boolean,
): PlaybackState {
  const frameRef = useRef(0); // fractional frame position
  const speedRef = useRef(0); // current speed (0→1)
  const lastTimeRef = useRef(0);
  const rafRef = useRef<number>(0);

  const [state, setState] = useState<PlaybackState>({
    currentFrame: 0,
    progress: 0,
    isComplete: false,
    speed: 0,
  });

  const tick = useCallback(
    (timestamp: number) => {
      if (!isReady) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      if (lastTimeRef.current === 0) {
        lastTimeRef.current = timestamp;
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const dt = Math.min(timestamp - lastTimeRef.current, 50); // cap delta to prevent jumps
      lastTimeRef.current = timestamp;

      // Smooth speed ramp
      const targetSpeed = isHolding ? 1 : 0;
      const rampTime = isHolding ? HOLD_ACCEL_MS : RELEASE_DECEL_MS;
      const rampRate = dt / rampTime;

      if (targetSpeed > speedRef.current) {
        speedRef.current = Math.min(speedRef.current + rampRate, 1);
      } else {
        speedRef.current = Math.max(speedRef.current - rampRate, 0);
      }

      // Apply easing to speed for cinematic feel
      const easedSpeed = easeInOutCubic(speedRef.current);

      // Advance frame position
      if (easedSpeed > 0.001 && frameRef.current < TOTAL_FRAMES - 1) {
        const framesPerMs = 1 / BASE_FRAME_INTERVAL_MS;
        const advance = dt * framesPerMs * easedSpeed;
        frameRef.current = Math.min(frameRef.current + advance, TOTAL_FRAMES - 1);
      }

      const progress = frameRef.current / (TOTAL_FRAMES - 1);
      const isComplete = frameRef.current >= TOTAL_FRAMES - 1;

      setState({
        currentFrame: frameRef.current,
        progress,
        isComplete,
        speed: easedSpeed,
      });

      if (!isComplete || speedRef.current > 0.001) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        // Final state update
        rafRef.current = requestAnimationFrame(tick);
      }
    },
    [isHolding, isReady],
  );

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [tick]);

  return state;
}

/** Cubic ease-in-out for smooth speed transitions */
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
