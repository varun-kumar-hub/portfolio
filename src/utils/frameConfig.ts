/**
 * Frame sequence configuration.
 * All 120 frames (3 folders × 40) are treated as one continuous sequence.
 */

const FRAMES_PER_SEQUENCE = 40;
const SEQUENCE_COUNT = 3;
export const TOTAL_FRAMES = FRAMES_PER_SEQUENCE * SEQUENCE_COUNT;

/** Base interval between frames in ms (~8.3 FPS native) */
export const BASE_FRAME_INTERVAL_MS = 120;

/** Duration of the hold-to-start prompt fade-out in ms */
export const PROMPT_FADE_MS = 800;

/** Duration of the final transition into portfolio in ms */
export const PORTFOLIO_TRANSITION_MS = 1500;

/** Deceleration duration when user releases hold (ms) */
export const RELEASE_DECEL_MS = 400;

/** Acceleration duration when user re-holds (ms) */
export const HOLD_ACCEL_MS = 250;

/**
 * Build the flat array of all frame paths in playback order.
 * Frames are served from /frames/seq{1,2,3}/ezgif-frame-{001..040}.jpg
 */
function buildFramePaths(): string[] {
  const paths: string[] = [];
  for (let seq = 1; seq <= SEQUENCE_COUNT; seq++) {
    for (let i = 1; i <= FRAMES_PER_SEQUENCE; i++) {
      const padded = String(i).padStart(3, '0');
      paths.push(`/frames/seq${seq}/ezgif-frame-${padded}.jpg`);
    }
  }
  return paths;
}

export const FRAME_PATHS = buildFramePaths();
