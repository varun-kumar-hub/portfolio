"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

type EncryptedTextProps = {
  text: string;
  className?: string;
  /**
   * Time in milliseconds between revealing each subsequent real character.
   * Lower is faster. Defaults to 50ms per character.
   */
  revealDelayMs?: number;
  /** Optional custom character set to use for the gibberish effect. */
  charset?: string;
  /**
   * Time in milliseconds between gibberish flips for unrevealed characters.
   * Lower is more jittery. Defaults to 50ms.
   */
  flipDelayMs?: number;
  /** CSS class for styling the encrypted/scrambled characters */
  encryptedClassName?: string;
  /** CSS class for styling the revealed characters */
  revealedClassName?: string;
  /** Optional external progress controller (0 to 1) */
  progress?: number;
};

const DEFAULT_CHARSET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-={}[];:,.<>/?";

function generateRandomCharacter(charset: string): string {
  const index = Math.floor(Math.random() * charset.length);
  return charset.charAt(index);
}



export const EncryptedText: React.FC<EncryptedTextProps> = ({
  text,
  className,
  revealDelayMs = 50,
  charset = DEFAULT_CHARSET,
  flipDelayMs = 50,
  encryptedClassName,
  revealedClassName,
  progress,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  const [revealCount, setRevealCount] = useState<number>(0);
  const [scrambleChars, setScrambleChars] = useState<string[]>(() => {
    if (!text) return [];
    return text.split("").map((ch) => (ch === " " ? " " : generateRandomCharacter(charset)));
  });
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const lastFlipTimeRef = useRef<number>(0);

  useEffect(() => {
    if (!text || !isInView) return;

    startTimeRef.current = performance.now();
    lastFlipTimeRef.current = performance.now();

    if (progress !== undefined) {
      // If progress is controlled externally, we don't increment it by time, we just scramble
      let isCancelled = false;
      const update = (now: number) => {
        if (isCancelled) return;

        const timeSinceLastFlip = now - lastFlipTimeRef.current;
        if (timeSinceLastFlip >= Math.max(0, flipDelayMs)) {
          const totalLength = text.length;
          const currentRevealCount = Math.floor(progress * totalLength);

          setScrambleChars((prev) => {
            const next = [...prev];
            for (let index = 0; index < totalLength; index += 1) {
              if (index >= currentRevealCount) {
                next[index] = text[index] === " " ? " " : generateRandomCharacter(charset);
              }
            }
            return next;
          });
          lastFlipTimeRef.current = now;
          setRevealCount(currentRevealCount);
        }
        animationFrameRef.current = requestAnimationFrame(update);
      };

      animationFrameRef.current = requestAnimationFrame(update);
      return () => {
        isCancelled = true;
        if (animationFrameRef.current !== null) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    } else {
      // Time-based auto reveal
      let isCancelled = false;

      const update = (now: number) => {
        if (isCancelled) return;

        const elapsedMs = now - startTimeRef.current;
        const totalLength = text.length;
        const currentRevealCount = Math.min(
          totalLength,
          Math.floor(elapsedMs / Math.max(1, revealDelayMs)),
        );

        const timeSinceLastFlip = now - lastFlipTimeRef.current;

        if (timeSinceLastFlip >= Math.max(0, flipDelayMs)) {
          setScrambleChars((prev) => {
            const next = [...prev];
            for (let index = 0; index < totalLength; index += 1) {
              if (index >= currentRevealCount) {
                next[index] = text[index] === " " ? " " : generateRandomCharacter(charset);
              }
            }
            return next;
          });
          lastFlipTimeRef.current = now;
        }

        setRevealCount(currentRevealCount);

        if (currentRevealCount < totalLength) {
          animationFrameRef.current = requestAnimationFrame(update);
        }
      };

      animationFrameRef.current = requestAnimationFrame(update);
      return () => {
        isCancelled = true;
        if (animationFrameRef.current !== null) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }
  }, [isInView, text, revealDelayMs, flipDelayMs, charset, progress]);

  if (!text) return null;

  const currentRevealCount = progress !== undefined ? Math.floor(progress * text.length) : revealCount;

  return (
    <motion.span
      ref={ref}
      className={cn(className)}
      aria-label={text}
      role="text"
    >
      {text.split("").map((char, index) => {
        const isRevealed = index < currentRevealCount;
        const displayChar = isRevealed
          ? char
          : char === " "
            ? " "
            : (scrambleChars[index] ?? generateRandomCharacter(charset));

        return (
          <span
            key={index}
            className={cn(isRevealed ? revealedClassName : encryptedClassName)}
          >
            {displayChar}
          </span>
        );
      })}
    </motion.span>
  );
};
