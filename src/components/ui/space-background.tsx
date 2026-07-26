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
        'pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#fafafb] dark:bg-[#040406] transition-colors duration-500',
        className
      )}
    >
      <div className="absolute inset-0 bg-[#fafafb] dark:bg-[#040406] transition-colors duration-500" />
      
      {/* Soft Crimson & Ambient Radial Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(239,68,68,0.03)_0%,rgba(250,250,251,0.6)_60%,#fafafb_100%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(239,68,68,0.05)_0%,rgba(15,17,23,0.98)_60%,#040406_100%)] transition-colors duration-500" />

      {/* Unified 64px × 64px Engineering Micro-Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.035)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(239,68,68,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(239,68,68,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Minimal Faint Starfield Particles */}
      <Starfield
        starColor={isLight ? "rgba(225, 29, 72, 0.25)" : "rgba(248, 113, 113, 0.4)"}
        bgColor="transparent"
        quantity={140}
        speed={0.2}
        opacity={isLight ? 0.16 : 0.12}
        mouseAdjust
        easing={12}
      />
    </div>
  );
}
