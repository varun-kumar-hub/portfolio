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
      className={cn('pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#040406]', className)}
    >
      <div className="absolute inset-0 bg-[#040406]" />
      
      {/* Ambient Crimson Radial Mesh Glow matching Hero Section */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(239,68,68,0.12)_0%,rgba(15,17,23,0.9)_50%,#040406_100%)]" />

      {/* Cyber Grid Lines matching Hero */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(239,68,68,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(239,68,68,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Crimson/Rose Starfield */}
      <Starfield
        starColor="rgba(248, 113, 113, 0.65)"
        bgColor="rgba(4, 4, 6, 0.3)"
        quantity={280}
        speed={0.28}
        opacity={0.18}
        mouseAdjust
        easing={12}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(4,4,6,0.2)_62%,rgba(4,4,6,0.75)_100%)]" />
    </div>
  );
}
