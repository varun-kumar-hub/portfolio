import { useEffect, useRef, useState, useCallback } from 'react';

export interface HoldState {
  /** Whether the user is currently holding */
  isHolding: boolean;
  /** Whether the user has ever started holding (for prompt dismiss) */
  hasStarted: boolean;
}

/**
 * Tracks mouse/touch hold state across the entire viewport.
 */
export function useHoldInteraction(): HoldState {
  const [isHolding, setIsHolding] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const holdingRef = useRef(false);

  const startHold = useCallback(() => {
    if (!holdingRef.current) {
      holdingRef.current = true;
      setIsHolding(true);
      setHasStarted(true);
    }
  }, []);

  const endHold = useCallback(() => {
    if (holdingRef.current) {
      holdingRef.current = false;
      setIsHolding(false);
    }
  }, []);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      // Only primary button
      if (e.button === 0) startHold();
    };
    const handleMouseUp = () => endHold();
    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      startHold();
    };
    const handleTouchEnd = () => endHold();
    const handleBlur = () => endHold();
    const handleContextMenu = (e: Event) => {
      e.preventDefault();
      endHold();
    };
    const handleVisibilityChange = () => {
      if (document.hidden) endHold();
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('touchcancel', handleTouchEnd);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [startHold, endHold]);

  return { isHolding, hasStarted };
}
