"use client";
import React, { useEffect, useRef, useState, memo } from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { cn } from "@/lib/utils";

export const TextRevealCard = ({
  text,
  revealText,
  children,
  className,
}: {
  text: string;
  revealText: string;
  children?: React.ReactNode;
  className?: string;
}) => {
  const [widthPercentage, setWidthPercentage] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const [left, setLeft] = useState(0);
  const [localWidth, setLocalWidth] = useState(0);
  const [isMouseOver, setIsMouseOver] = useState(false);

  useEffect(() => {
    if (cardRef.current) {
      const { left, width: localWidth } =
        cardRef.current.getBoundingClientRect();
      setLeft(left);
      setLocalWidth(localWidth);
    }
  }, []);

  function mouseMoveHandler(event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) {
    event.preventDefault();

    const clientX = "touches" in event ? event.touches[0]?.clientX : event.clientX;
    if (cardRef.current && clientX !== undefined) {
      const relativeX = clientX - left;
      const percentage = (relativeX / localWidth) * 100;
      setWidthPercentage(Math.min(112, Math.max(0, percentage)));
    }
  }

  function mouseLeaveHandler() {
    setIsMouseOver(false);
    setWidthPercentage(0);
  }
  function mouseEnterHandler() {
    setIsMouseOver(true);
  }
  function touchMoveHandler(event: React.TouchEvent<HTMLDivElement>) {
    event.preventDefault();
    const clientX = event.touches[0]!.clientX;
    if (cardRef.current) {
      const relativeX = clientX - left;
      const percentage = (relativeX / localWidth) * 100;
      setWidthPercentage(Math.min(112, Math.max(0, percentage)));
    }
  }

  const rotateDeg = (widthPercentage - 50) * 0.1;
  return (
    <div
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      onMouseMove={mouseMoveHandler}
      onTouchStart={mouseEnterHandler}
      onTouchEnd={mouseLeaveHandler}
      onTouchMove={touchMoveHandler}
      ref={cardRef}
      className={cn(
        "bg-[#1d1c20]/40 backdrop-blur-md border border-white/[0.08] w-[40rem] rounded-lg p-8 relative overflow-hidden",
        className
      )}
    >
      {children}

      <div className="h-16 sm:h-24 md:h-32 relative flex items-center overflow-hidden">
        <motion.div
          style={{
            width: "100%",
          }}
          animate={
            isMouseOver
              ? {
                  opacity: widthPercentage > 0 ? 1 : 0,
                  clipPath: `inset(0 ${Math.max(0, 100 - widthPercentage)}% 0 0)`,
                }
              : {
                  clipPath: `inset(0 ${Math.max(0, 100 - widthPercentage)}% 0 0)`,
                }
          }
          transition={isMouseOver ? { duration: 0 } : { duration: 0.4 }}
          className="absolute bg-transparent z-20 will-change-transform"
        >
          <p
            style={{
              textShadow: "4px 4px 15px rgba(0,0,0,0.5)",
            }}
            className="text-lg sm:text-2xl md:text-4xl lg:text-5xl py-2 sm:py-4 md:py-6 font-extrabold bg-gradient-to-r from-red-400 via-rose-500 to-red-600 bg-clip-text text-transparent select-none whitespace-nowrap font-heading tracking-tight leading-none"
          >
            {revealText}
          </p>
        </motion.div>
        <motion.div
          animate={{
            left: `${widthPercentage}%`,
            rotate: `${rotateDeg}deg`,
            opacity: widthPercentage > 0 ? 1 : 0,
          }}
          transition={isMouseOver ? { duration: 0 } : { duration: 0.4 }}
          className="h-16 sm:h-24 md:h-32 w-[8px] bg-gradient-to-b from-transparent via-neutral-800 to-transparent absolute z-50 will-change-transform"
        ></motion.div>

        <motion.div
          animate={{
            clipPath: `inset(0 0 0 ${widthPercentage}%)`,
          }}
          transition={isMouseOver ? { duration: 0 } : { duration: 0.4 }}
          className="overflow-hidden w-full [mask-image:linear-gradient(to_bottom,transparent,white,transparent)]"
        >
          <p className="text-xl sm:text-3xl md:text-5xl lg:text-6xl py-2 sm:py-4 md:py-6 font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-200 select-none whitespace-nowrap font-heading tracking-tight leading-none">
            {text}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export const TextRevealCardTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h2 className={twMerge("text-white text-lg mb-2", className)}>
      {children}
    </h2>
  );
};

export const TextRevealCardDescription = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p className={twMerge("text-[#a9a9a9] text-sm", className)}>{children}</p>
  );
};

interface StarData {
  top: number;
  left: number;
  moveX: number;
  moveY: number;
  opacity: number;
  duration: number;
}

const Stars = () => {
  const [stars] = useState<StarData[]>(() =>
    Array.from({ length: 80 }, (_, idx) => ({
      top: (idx * 17) % 100,
      left: (idx * 29) % 100,
      moveX: (idx % 5) - 2,
      moveY: ((idx * 3) % 5) - 2,
      opacity: (((idx * 7) % 10) + 1) / 10,
      duration: (idx % 10) + 20,
    }))
  );

  return (
    <div className="absolute inset-0">
      {stars.map((star, i) => (
        <motion.span
          key={`star-${i}`}
          animate={{
            top: `calc(${star.top}% + ${star.moveY}px)`,
            left: `calc(${star.left}% + ${star.moveX}px)`,
            opacity: star.opacity,
            scale: [1, 1.2, 0],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: `2px`,
            height: `2px`,
            backgroundColor: "white",
            borderRadius: "50%",
            zIndex: 1,
          }}
          className="inline-block"
        ></motion.span>
      ))}
    </div>
  );
};

export const MemoizedStars = memo(Stars);
