'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Starfield } from '@/components/ui/starfield-1';
import { useTheme } from '@/components/ThemeProvider';

type SpaceBackgroundProps = React.ComponentProps<'div'>;

export function SpaceBackground({ className, style, ...props }: SpaceBackgroundProps) {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === 'light';

  return (
    <div
      aria-hidden="true"
      style={style}
      {...props}
      className={cn(
        'pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#f6f6f8] dark:bg-[#040406] transition-colors duration-500',
        className
      )}
    >
      <div className="absolute inset-0 bg-[#f6f6f8] dark:bg-[#040406] transition-colors duration-500" />
      
      {/* Soft Crimson & Slate Radial Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(239,68,68,0.06)_0%,rgba(245,245,247,0.95)_60%,#f6f6f8_100%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(239,68,68,0.05)_0%,rgba(15,17,23,0.98)_60%,#040406_100%)] transition-colors duration-500" />

      {/* Subtle Micro-Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.035)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(239,68,68,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(239,68,68,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Minimal Faint Starfield Particles */}
      <Starfield
        starColor={isLight ? "rgba(225, 29, 72, 0.28)" : "rgba(248, 113, 113, 0.4)"}
        bgColor="transparent"
        quantity={160}
        speed={0.2}
        opacity={isLight ? 0.18 : 0.12}
        mouseAdjust
        easing={12}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(246,246,248,0.2)_60%,rgba(246,246,248,0.85)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,rgba(4,4,6,0.3)_60%,rgba(4,4,6,0.85)_100%)] transition-colors duration-500" />
    </div>
  );
}
