"use client";

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Sparkles, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

interface NavbarProps {
  onReturnToIntro: () => void;
}

const ThemeToggleControl = () => {
  const { resolvedTheme, toggleTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        toggleTheme(rect.left + rect.width / 2, rect.top + rect.height / 2);
      }}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label="Toggle theme mode"
      className="group relative flex items-center justify-center w-8 h-8 rounded-full border border-slate-200/80 dark:border-red-500/25 bg-white/88 dark:bg-black/70 hover:bg-white dark:hover:bg-red-950/40 text-slate-700 dark:text-neutral-200 hover:text-red-600 dark:hover:text-white backdrop-blur-xl transition-all duration-300 shadow-[0_8px_18px_-14px_rgba(15,23,42,0.32)] cursor-pointer overflow-hidden"
    >
      <motion.div
        animate={{ rotate: isDark ? 0 : 180 }}
        transition={{ type: "spring", stiffness: 350, damping: 22 }}
        className="relative flex h-4 w-4 items-center justify-center"
      >
        <motion.span
          animate={{ opacity: isDark ? 1 : 0, scale: isDark ? 1 : 0.45 }}
          transition={{ type: "spring", stiffness: 350, damping: 22 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Moon className="w-4 h-4 text-rose-300 group-hover:scale-110 transition-transform" />
        </motion.span>
        <motion.span
          animate={{ opacity: isDark ? 0 : 1, scale: isDark ? 0.45 : 1 }}
          transition={{ type: "spring", stiffness: 350, damping: 22 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Sun className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
        </motion.span>
      </motion.div>
    </button>
  );
};

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
  const [activeSection, setActiveSection] = useState('home');
  const menuRef = useRef<HTMLDivElement>(null);
  const headerShapeClass = isOpen ? 'rounded-2xl sm:rounded-3xl' : 'rounded-full';

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'projects', 'skills', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isOpen && menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const logoElement = (
    <div className="relative w-7 h-7 flex items-center justify-center rounded-xl bg-gradient-to-br from-white via-red-50 to-slate-100 dark:from-red-500/25 dark:via-rose-600/15 dark:to-transparent border border-red-500/25 dark:border-red-500/40 shadow-[0_10px_24px_-16px_rgba(220,38,38,0.42)] dark:shadow-[0_0_14px_rgba(239,68,68,0.35)] dark:bg-red-950/40 group cursor-pointer transition-all duration-300 hover:scale-105">
      <span className="text-[11px] font-mono font-black tracking-tighter text-red-500 dark:text-red-200">
        VK
      </span>
      {/* Ambient Pulsing Glow */}
      <span className="absolute inset-0 rounded-xl bg-red-500/10 dark:bg-red-500/20 animate-pulse pointer-events-none" />
    </div>
  );

  const navLinksData = [
    { label: 'Home', href: '#home' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  useEffect(() => {
    if (isResumeModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isResumeModalOpen]);

  const resumeButtonElement = (
    <>
      <div className="relative group w-full sm:w-auto overflow-hidden rounded-full p-[1px]">
        {/* Ambient Glow */}
        <div className="absolute inset-0 -m-1 rounded-full
                      hidden sm:block
                      bg-gradient-to-r from-red-500 to-rose-600
                      opacity-40 filter blur-md pointer-events-none
                      transition-all duration-300 ease-out
                      group-hover:opacity-75 group-hover:blur-lg group-hover:-m-2.5"></div>
        
        {/* Sliding Shimmer Highlight */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none z-20" />
        
        <button
          onClick={() => setIsResumeModalOpen(true)}
          className="relative z-10 block text-center px-4.5 py-2 sm:px-3.5 text-xs font-bold text-white bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 rounded-full transition-all duration-200 w-full sm:w-auto cursor-pointer shadow-sm"
        >
          Resume
        </button>
      </div>

      {/* Resume PDF Viewer Modal */}
      {isResumeModalOpen && typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          <motion.div
            key="resume-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999999] bg-[#f6f6f8]/95 dark:bg-[#040406]/95 backdrop-blur-2xl flex flex-col p-3 sm:p-6"
            onClick={() => setIsResumeModalOpen(false)}
          >
            {/* Modal Header Bar */}
            <div
              className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white/90 dark:bg-neutral-900/90 border border-slate-200 dark:border-white/15 backdrop-blur-md shadow-2xl shrink-0 cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 select-none">
                <div className="p-2 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-wide">
                    Challa Varun Kumar — Resume PDF
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-neutral-400">AI Engineer &amp; Full-Stack Developer</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <a
                  href="/resume.pdf"
                  download="Varun_Kumar_Resume.pdf"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95"
                >
                  <span>Download</span>
                </a>
                <button
                  onClick={() => setIsResumeModalOpen(false)}
                  className="p-2 rounded-full bg-white/10 hover:bg-red-600 text-white transition-all cursor-pointer hover:scale-105 active:scale-95"
                  title="Close (ESC)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* PDF Viewer Body */}
            <div
              className="flex-1 w-full mt-4 rounded-2xl overflow-hidden border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src="/resume.pdf#toolbar=1"
                className="w-full h-full border-none"
                title="Varun Kumar Resume PDF"
              />
            </div>
          </motion.div>
        </AnimatePresence>,
        document.body
      )}
    </>
  );

  return (
    <>
      <div ref={menuRef} className="fixed top-4 sm:top-6 left-1/2 transform -translate-x-1/2 z-50 w-[calc(100%-1.5rem)] sm:w-[92%] md:w-[88%] lg:w-[85%] max-w-6xl flex flex-col items-center">
        {/* ─── Top Bar (always visible) ─── */}
        <header className={`w-full flex items-center
                           px-5 sm:pl-8 sm:pr-8 py-3 backdrop-blur-2xl
                           ${headerShapeClass}
                           navbar-shimmer-border
                            border border-white/80 bg-white/82 dark:border-red-500/15 dark:bg-[#07070a7a]
                            shadow-[0_18px_55px_-34px_rgba(15,23,42,0.36),_0_1px_2px_rgba(15,23,42,0.04),_inset_0_1px_0_rgba(255,255,255,0.92)]
                            dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.08),_0_0_15px_rgba(239,68,68,0.04)]
                           transition-[border-radius] duration-300 ease-in-out`}>

          {/* Gloss reflection line across top edge */}
          <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-white/95 dark:via-red-500/30 to-transparent pointer-events-none" />

          <div className="flex items-center justify-between w-full gap-x-6 sm:gap-x-10 lg:gap-x-14">
            <a href="#home" className="flex items-center gap-2.5 group">
               {logoElement}
               <span className="text-xs sm:text-sm font-black tracking-[0.16em] text-gray-950 dark:text-white select-none transition-colors group-hover:text-red-400">
                 VARUN KUMAR
               </span>
            </a>

            {/* Desktop nav links */}
            <nav className="hidden md:flex items-center space-x-6 sm:space-x-8 lg:space-x-10 text-sm">
              {navLinksData.map((link) => (
                <AnimatedNavLink key={link.href} href={link.href}>
                  {link.label}
                </AnimatedNavLink>
              ))}
            </nav>

            {/* Desktop action buttons */}
            <div className="hidden sm:flex items-center gap-2.5 sm:gap-3">
              <ThemeToggleControl />
              <button
                onClick={onReturnToIntro}
                title="Return to Intro Animation"
                aria-label="Return to Intro Animation"
                className="group relative flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200/80 dark:border-red-500/25 bg-white/88 dark:bg-black/70 hover:bg-white dark:hover:bg-red-950/40 text-slate-700 dark:text-neutral-200 hover:text-red-600 dark:hover:text-white text-xs font-semibold backdrop-blur-xl transition-all duration-300 shadow-[0_8px_18px_-14px_rgba(15,23,42,0.32)] cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-red-400 group-hover:rotate-12 transition-transform" />
                <span className="hidden md:inline">Intro</span>
              </button>
              {resumeButtonElement}
            </div>

            {/* Mobile action button & hamburger */}
            <div className="sm:hidden flex items-center gap-2">
              <ThemeToggleControl />
              <button
                className="flex items-center justify-center w-9 h-9 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-white/5 transition-colors focus:outline-none cursor-pointer"
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
          </div>
        </header>
      </div>

      {/* ─── Mobile Fullscreen 2-Column Overlay Menu ─── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="sm:hidden fixed inset-0 z-[9999] bg-[#f6f6f8]/95 dark:bg-[#060709]/95 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-8 overflow-y-auto"
          >
            {/* Top Bar inside Menu */}
            <div className="relative z-10 flex justify-between items-center w-full pb-5 border-b border-slate-200 dark:border-white/10">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse shadow-[0_0_8px_rgba(248,113,113,0.8)]" />
                <span className="text-sm font-bold tracking-widest text-slate-900 dark:text-white uppercase font-heading">VARUN KUMAR</span>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 rounded-full border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/5 hover:bg-red-50 dark:hover:bg-white/10 text-slate-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-white flex items-center justify-center transition-all duration-300 active:scale-95 cursor-pointer shadow-lg"
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
                            ? "text-red-400 translate-x-1"
                            : "text-slate-500 dark:text-gray-400 hover:text-slate-950 dark:hover:text-white hover:translate-x-1"
                        }`}
                      >
                        <span>{link.label}</span>
                        {isActive && (
                          <span className="w-2 h-2 rounded-full bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.9)]" />
                        )}
                      </a>
                    </motion.div>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Actions & Status Footer */}
            <div className="relative z-10 w-full pt-5 border-t border-slate-200 dark:border-white/10 flex flex-col gap-4">
              {/* Action Buttons Row */}
              <div className="flex items-center justify-between gap-2.5">
                <div className="flex-1">
                  <button
                    onClick={() => {
                      onReturnToIntro();
                      setIsOpen(false);
                    }}
                    className="flex items-center justify-center gap-1.5 w-full px-3 py-2.5 text-xs font-bold border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/5 hover:bg-red-50 dark:hover:bg-white/10 text-slate-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-white rounded-full transition-all duration-300 cursor-pointer shadow-sm active:scale-95"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-red-400" />
                    Intro Portal
                  </button>
                </div>
                <div className="flex-1">
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 rounded-full transition-all duration-300 cursor-pointer shadow-md active:scale-95"
                  >
                    <FileText className="w-3.5 h-3.5 text-white" />
                    Resume.PDF
                  </a>
                </div>
              </div>

              {/* Status footer bar */}
              <div className="flex justify-between items-center text-[11px] text-gray-400 font-medium">
                <span>AI &amp; ML Engineer</span>
                <span className="flex items-center gap-1.5 text-red-400 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse shadow-[0_0_6px_rgba(248,113,113,0.8)]" />
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
