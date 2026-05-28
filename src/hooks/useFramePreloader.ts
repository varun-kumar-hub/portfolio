import { useEffect, useRef, useState } from 'react';
import { FRAME_PATHS, TOTAL_FRAMES } from '../utils/frameConfig';

export interface PreloaderState {
  /** All decoded ImageBitmap frames in playback order */
  frames: (ImageBitmap | null)[];
  /** 0 → 1 loading progress */
  progress: number;
  /** True when all frames are ready */
  ready: boolean;
}

/**
 * Preloads all frame images as ImageBitmaps for GPU-accelerated canvas drawing.
 * Loads in sequential order (seq1 → seq2 → seq3) so playback can begin
 * as soon as the first sequence is ready if needed.
 */
export function useFramePreloader(): PreloaderState {
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const framesRef = useRef<(ImageBitmap | null)[]>(new Array(TOTAL_FRAMES).fill(null));

  useEffect(() => {
    let cancelled = false;
    let loadedCount = 0;

    async function loadFrame(index: number): Promise<void> {
      if (cancelled) return;

      try {
        const response = await fetch(FRAME_PATHS[index]);
        const blob = await response.blob();

        if (cancelled) return;

        // createImageBitmap gives us a GPU-ready decoded texture
        const bitmap = await createImageBitmap(blob);

        if (cancelled) {
          bitmap.close();
          return;
        }

        framesRef.current[index] = bitmap;
      } catch (err) {
        console.warn(`Failed to load frame ${index}:`, err);
        // On failure, try plain Image fallback
        if (!cancelled) {
          try {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            await new Promise<void>((resolve, reject) => {
              img.onload = () => resolve();
              img.onerror = reject;
              img.src = FRAME_PATHS[index];
            });
            if (!cancelled) {
              const bitmap = await createImageBitmap(img);
              if (!cancelled) {
                framesRef.current[index] = bitmap;
              } else {
                bitmap.close();
              }
            }
          } catch {
            console.error(`Frame ${index} failed completely`);
          }
        }
      }

      loadedCount++;
      if (!cancelled) {
        setProgress(loadedCount / TOTAL_FRAMES);
      }
    }

    async function preloadAll() {
      // Load in batches of 6 for parallel fetching without overwhelming the browser
      const BATCH_SIZE = 6;
      for (let i = 0; i < TOTAL_FRAMES; i += BATCH_SIZE) {
        if (cancelled) break;
        const batch = [];
        for (let j = i; j < Math.min(i + BATCH_SIZE, TOTAL_FRAMES); j++) {
          batch.push(loadFrame(j));
        }
        await Promise.all(batch);
      }

      if (!cancelled) {
        setReady(true);
      }
    }

    preloadAll();

    return () => {
      cancelled = true;
      // Clean up ImageBitmaps
      framesRef.current.forEach((bmp) => {
        if (bmp) bmp.close();
      });
      framesRef.current = new Array(TOTAL_FRAMES).fill(null);
    };
  }, []);

  return {
    frames: framesRef.current,
    progress,
    ready,
  };
}
