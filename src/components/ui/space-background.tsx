'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Starfield } from '@/components/ui/starfield-1';

type SpaceBackgroundProps = React.ComponentProps<'div'>;

export function SpaceBackground({ className, style, ...props }: SpaceBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      style={style}
      {...props}
      className={cn('pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#050607]', className)}
    >
      <div className="absolute inset-0 bg-[#050607]" />
      <Starfield
        starColor="rgba(190, 215, 255, 0.58)"
        bgColor="rgba(5, 6, 7, 0.28)"
        quantity={260}
        speed={0.28}
        opacity={0.12}
        mouseAdjust
        easing={12}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.18)_62%,rgba(0,0,0,0.62)_100%)]" />
    </div>
  );
}
