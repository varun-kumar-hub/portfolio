"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const taglines = [
  "Engineering the AI-Driven Future",
  "Building Full-Stack Web Products",
  "Architecting Intelligent Systems",
  "Crafting Scalable Digital Solutions",
];

export default function TypingTagline() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const currentTagline = taglines[currentIndex];

    if (isTyping) {
      if (displayedText.length < currentTagline.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayedText(currentTagline.slice(0, displayedText.length + 1));
        }, 55 + Math.random() * 35);
      } else {
        // Finished typing, wait before deleting
        timeoutRef.current = setTimeout(() => {
          setIsTyping(false);
        }, 2400);
      }
    } else {
      if (displayedText.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, 28);
      } else {
        // Finished deleting, move to next tagline
        setCurrentIndex((prev) => (prev + 1) % taglines.length);
        setIsTyping(true);
      }
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [displayedText, isTyping, currentIndex]);

  // Extract the highlighted word (first word that has special meaning)
  const parts = displayedText.split(" ");
  const highlightWords = ["AI-Driven", "Full-Stack", "Intelligent", "Scalable"];
  
  const renderText = () => {
    const words = displayedText.split(" ");
    return words.map((word, idx) => {
      const isHighlight = highlightWords.some((hw) => word.startsWith(hw.slice(0, word.length)) && word === hw.slice(0, word.length)) || highlightWords.includes(word);
      return (
        <span key={idx}>
          {idx > 0 && " "}
          {isHighlight ? (
            <span
              className="text-blue-400/90"
              style={{ textShadow: "0 0 12px rgba(96, 165, 250, 0.3)" }}
            >
              {word}
            </span>
          ) : (
            word
          )}
        </span>
      );
    });
  };

  return (
    <h2 className="text-base sm:text-lg md:text-2xl font-medium text-gray-400 tracking-wide min-h-[1.8em]">
      {renderText()}
      <motion.span
        className="inline-block w-[2px] h-[1em] bg-blue-400 ml-0.5 align-middle"
        animate={{ opacity: [1, 0] }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
    </h2>
  );
}
