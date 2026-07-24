"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Sparkles, Terminal, X } from 'lucide-react';


interface NavbarProps {
  onReturnToIntro: () => void;
}

const AnimatedNavLink = ({
  href,
  children,
  isActive = false,
}: {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}) => {
  const defaultTextColor = isActive
    ? 'text-[var(--accent)]'
    : 'text-gray-500 hover:text-gray-950 dark:text-gray-400 dark:hover:text-white';
  const hoverTextColor = 'text-[var(--accent)]';
  const textSizeClass = 'text-xs font-semibold tracking-wide';

  return (
    <a href={href} className={`group relative inline-block overflow-hidden h-[18px] leading-[18px] ${textSizeClass}`}>
      <div className="flex flex-col transition-transform duration-300 ease-out transform group-hover:-translate-y-[18px]">
        <span className={`${defaultTextColor} h-[18px] leading-[18px] block transition-colors duration-300`}>{children}</span>
        <span className={`${hoverTextColor} h-[18px] leading-[18px] block`}>{children}</span>
      </div>
      {isActive && (
        <span
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--accent)] transition-all duration-300"
          style={{ boxShadow: '0 0 6px var(--accent-glow)' }}
        />
      )}
    </a>
  );
};

export function Navbar({ onReturnToIntro }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [headerShapeClass, setHeaderShapeClass] = useState('rounded-full');
  const [activeSection, setActiveSection] = useState('home');
  const shapeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = ['home', 'skills', 'projects', 'experience', 'contact'];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isOpen && menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Close mobile menu on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) setIsOpen(false);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  useEffect(() => {
    if (shapeTimeoutRef.current) {
      clearTimeout(shapeTimeoutRef.current);
    }

    if (isOpen) {
      // On desktop the shape change is irrelevant since the mobile menu is hidden
      shapeTimeoutRef.current = setTimeout(() => {
        setHeaderShapeClass('rounded-2xl sm:rounded-full');
      }, 0);
    } else {
      shapeTimeoutRef.current = setTimeout(() => {
        setHeaderShapeClass('rounded-full');
      }, 300);
    }

    return () => {
      if (shapeTimeoutRef.current) {
        clearTimeout(shapeTimeoutRef.current);
      }
    };
  }, [isOpen]);

  const logoElement = (
    <div className="relative w-6 h-6 flex items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.2)] dark:bg-blue-500/5">
      <Terminal className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" strokeWidth={2.5} />
      {/* Subtle pulsing background glow */}
      <span className="absolute inset-0 rounded-lg bg-blue-500/15 animate-pulse" />
    </div>
  );

  const navLinksData = [
    { label: 'Home', href: '#home' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  const introButtonElement = (
    <button
      onClick={onReturnToIntro}
      className="px-4 py-2 sm:px-3 text-xs font-semibold border border-gray-250/30 bg-white/20 dark:border-[#333] dark:bg-[rgba(31,31,31,0.62)] text-gray-800 dark:text-gray-300 rounded-full hover:border-gray-400 hover:text-gray-950 dark:hover:border-white/50 dark:hover:text-white transition-colors duration-200 w-full sm:w-auto cursor-pointer"
    >
      Intro
    </button>
  );

  const resumeButtonElement = (
    <div className="relative group w-full sm:w-auto overflow-hidden rounded-full p-[1px]">
       {/* Ambient Glow */}
       <div className="absolute inset-0 -m-1 rounded-full
                     hidden sm:block
                     bg-gradient-to-r from-blue-500 to-indigo-500
                     opacity-40 filter blur-md pointer-events-none
                     transition-all duration-300 ease-out
                     group-hover:opacity-75 group-hover:blur-lg group-hover:-m-2.5"></div>
       
       {/* Sliding Shimmer Highlight */}
       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none z-20" />
       
       <a
         href="/resume.pdf"
         target="_blank"
         rel="noopener noreferrer"
         className="relative z-10 block text-center px-4.5 py-2 sm:px-3.5 text-xs font-bold text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-full transition-all duration-200 w-full sm:w-auto cursor-pointer shadow-sm"
       >
         Resume
       </a>
    </div>
  );

  return (
    <>
      <div ref={menuRef} className="fixed top-4 sm:top-6 left-1/2 transform -translate-x-1/2 z-50 w-[calc(100%-1.5rem)] sm:w-auto max-w-4xl flex flex-col items-center">
        {/* ─── Top Bar (always visible) ─── */}
        <header className={`w-full flex items-center
                           px-4 sm:pl-6 sm:pr-6 py-2.5 backdrop-blur-md
                           ${headerShapeClass}
                           navbar-shimmer-border
                           border border-blue-500/10 bg-white/80 dark:border-blue-500/15 dark:bg-[#07070a7a]
                           shadow-[0_8px_32px_0_rgba(0,0,0,0.08),_0_0_15px_rgba(59,130,246,0.04)]
                           transition-[border-radius] duration-300 ease-in-out`}>

          {/* Gloss reflection line across top edge */}
          <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent pointer-events-none" />

          <div className="flex items-center justify-between w-full gap-x-6 sm:gap-x-8">
            <div className="flex items-center gap-2">
               {logoElement}
               <span className="text-xs font-bold tracking-[0.15em] text-gray-950 dark:text-white select-none">
                 VARUN
               </span>
            </div>

            {/* Desktop nav links */}
            <nav className="hidden sm:flex items-center space-x-4 sm:space-x-5 text-sm">
              {navLinksData.map((link) => (
                <AnimatedNavLink key={link.href} href={link.href}>
                  {link.label}
                </AnimatedNavLink>
              ))}
            </nav>

            {/* Desktop action buttons */}
            <div className="hidden sm:flex items-center gap-2.5">
              {introButtonElement}
              {resumeButtonElement}
            </div>

            {/* Mobile hamburger / close */}
            <button
              className="sm:hidden flex items-center justify-center w-9 h-9 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-white/5 transition-colors focus:outline-none cursor-pointer"
              onClick={toggleMenu}
              aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
            >
              <div className="relative w-5 h-5">
                {/* Top line */}
                <span className={`absolute left-0 h-[2px] w-5 bg-current rounded-full transition-all duration-300 ease-out ${isOpen ? 'top-[9px] rotate-45' : 'top-[3px] rotate-0'}`} />
                {/* Middle line */}
                <span className={`absolute left-0 top-[9px] h-[2px] w-5 bg-current rounded-full transition-all duration-300 ease-out ${isOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'}`} />
                {/* Bottom line */}
                <span className={`absolute left-0 h-[2px] w-5 bg-current rounded-full transition-all duration-300 ease-out ${isOpen ? 'top-[9px] -rotate-45' : 'top-[15px] rotate-0'}`} />
              </div>
            </button>
          </div>
        </header>
      </div>

      {/* ─── Mobile Fullscreen 2-Column Overlay Menu (rendered at root level) ─── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="sm:hidden fixed inset-0 z-[9999] bg-[#060709]/95 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-8 overflow-y-auto"
          >
            {/* Subtle Top Blue Ambient Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

            {/* Top Bar inside Menu */}
            <div className="relative z-10 flex justify-between items-center w-full pb-5 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
                <span className="text-sm font-bold tracking-widest text-white uppercase font-heading">VARUN KUMAR</span>
              </div>

              {/* Minimal Circular Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white flex items-center justify-center transition-all duration-300 active:scale-95 cursor-pointer shadow-lg"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 2-Column Navigation Links */}
            <div className="relative z-10 flex-1 flex flex-col justify-start pt-6 pb-4 pl-2">
              <nav className="grid grid-cols-2 gap-y-7 gap-x-4 w-full">
                {navLinksData.map((link, idx) => {
                  const isActive = activeSection === link.href.slice(1);

                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.04, duration: 0.3 }}
                    >
                      <a
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`inline-flex items-center gap-2.5 text-2xl sm:text-3xl font-extrabold tracking-tight font-heading transition-all duration-300 ${
                          isActive
                            ? "text-blue-400 translate-x-1"
                            : "text-gray-400 hover:text-white hover:translate-x-1"
                        }`}
                      >
                        <span>{link.label}</span>
                        {isActive && (
                          <span className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.9)]" />
                        )}
                      </a>
                    </motion.div>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Actions & Status Footer */}
            <div className="relative z-10 w-full pt-5 border-t border-white/10 flex flex-col gap-5">
              {/* Action Buttons Row */}
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <button
                    onClick={() => {
                      onReturnToIntro();
                      setIsOpen(false);
                    }}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 text-xs font-bold border border-white/10 bg-white/5 hover:bg-white/10 text-gray-200 hover:text-white rounded-full transition-all duration-300 cursor-pointer shadow-sm active:scale-95"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                    Intro Portal
                  </button>
                </div>
                <div className="flex-1">
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 text-xs font-bold text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-full transition-all duration-300 cursor-pointer shadow-md active:scale-95"
                  >
                    <FileText className="w-3.5 h-3.5 text-white" />
                    Resume.PDF
                  </a>
                </div>
              </div>

              {/* Status footer bar */}
              <div className="flex justify-between items-center text-[11px] text-gray-400 font-medium">
                <span>AI & ML Engineer</span>
                <span className="flex items-center gap-1.5 text-blue-400 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse shadow-[0_0_6px_rgba(96,165,250,0.8)]" />
                  Available for Roles
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
