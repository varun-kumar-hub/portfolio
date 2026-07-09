"use client";

import React, { useState, useEffect, useRef } from 'react';

interface NavbarProps {
  onReturnToIntro: () => void;
}

const AnimatedNavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const defaultTextColor = 'text-gray-500 hover:text-gray-950 dark:text-gray-400 dark:hover:text-white';
  const hoverTextColor = 'text-[var(--accent)]';
  const textSizeClass = 'text-xs font-semibold tracking-wide';

  return (
    <a href={href} className={`group relative inline-block overflow-hidden h-[18px] leading-[18px] ${textSizeClass}`}>
      <div className="flex flex-col transition-transform duration-300 ease-out transform group-hover:-translate-y-[18px]">
        <span className={`${defaultTextColor} h-[18px] leading-[18px] block`}>{children}</span>
        <span className={`${hoverTextColor} h-[18px] leading-[18px] block`}>{children}</span>
      </div>
    </a>
  );
};

export function Navbar({ onReturnToIntro }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [headerShapeClass, setHeaderShapeClass] = useState('rounded-full');
  const shapeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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
      setHeaderShapeClass('rounded-2xl sm:rounded-full');
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
    <div className="relative w-5 h-5 flex items-center justify-center">
      <span className="absolute w-2 h-2 rounded-full bg-blue-500 opacity-95 filter blur-[1px]"></span>
      <span className="absolute w-1 h-1 rounded-full bg-white opacity-100"></span>
      {/* Outer spinning radar tracks */}
      <span className="absolute inset-0 rounded-full border border-blue-500/30 animate-[spin_8s_linear_infinite]" />
      <span className="absolute inset-[3px] rounded-full border border-dashed border-blue-400/40 animate-[spin_4s_linear_infinite_reverse]" />
    </div>
  );

  const navLinksData = [
    { label: 'Home', href: '#home' },
    { label: 'Education', href: '#education' },
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
            className="sm:hidden flex items-center justify-center w-9 h-9 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-white/5 transition-colors focus:outline-none"
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

      {/* ─── Mobile Dropdown Menu ─── */}
      <div
        className={`sm:hidden w-[calc(100%-1rem)] mt-2 rounded-2xl overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
                     border border-blue-500/10 bg-white/90 dark:border-blue-500/15 dark:bg-[#0a0a12]/90
                     backdrop-blur-xl shadow-[0_16px_48px_rgba(0,0,0,0.15),_0_0_20px_rgba(59,130,246,0.06)]
                     ${isOpen ? 'max-h-[500px] opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2 pointer-events-none border-transparent shadow-none'}`}
      >
        <div className="p-4">
          {/* Nav links grid — 2 columns for compact layout */}
          <nav className="grid grid-cols-2 gap-1">
            {navLinksData.map((link, idx) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-950 dark:hover:text-white hover:bg-gray-100/60 dark:hover:bg-white/5 transition-all duration-200"
                style={{
                  transitionDelay: isOpen ? `${idx * 40}ms` : '0ms',
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? 'translateY(0)' : 'translateY(-8px)',
                }}
              >
                {/* Link icon indicator */}
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] opacity-50" />
                {link.label}
              </a>
            ))}
          </nav>

          {/* Divider */}
          <div className="my-3 h-[1px] bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700/50 to-transparent" />

          {/* Action buttons row */}
          <div className="flex items-center gap-2">
            <div className="flex-1">
              {introButtonElement}
            </div>
            <div className="flex-1">
              {resumeButtonElement}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
