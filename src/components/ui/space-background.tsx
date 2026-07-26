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
      
      {/* Footer-Style Soft Red Radial Aurora Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(239,68,68,0.03)_0%,transparent_60%)] dark:bg-[radial-gradient(circle_at_50%_25%,rgba(239,68,68,0.04)_0%,transparent_60%)] transition-colors duration-500" />

      {/* Footer-Style Grid (60px × 60px in Dark Mode, 56px × 56px in Light Mode) - Dimmed */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.025)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:56px_56px] dark:bg-[size:60px_60px]" />

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
