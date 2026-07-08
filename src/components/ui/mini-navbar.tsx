"use client";

import React, { useState, useEffect, useRef } from 'react';
import ThemeToggle from '@/components/ThemeToggle';

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

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (shapeTimeoutRef.current) {
      clearTimeout(shapeTimeoutRef.current);
    }

    if (isOpen) {
      setHeaderShapeClass('rounded-2xl');
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
      <span className="absolute w-1.5 h-1.5 rounded-full bg-[var(--accent)] top-0 left-1/2 transform -translate-x-1/2 opacity-90"></span>
      <span className="absolute w-1.5 h-1.5 rounded-full bg-gray-400 left-0 top-1/2 transform -translate-y-1/2 opacity-70"></span>
      <span className="absolute w-1.5 h-1.5 rounded-full bg-gray-400 right-0 top-1/2 transform -translate-y-1/2 opacity-70"></span>
      <span className="absolute w-1.5 h-1.5 rounded-full bg-[var(--accent)] bottom-0 left-1/2 transform -translate-x-1/2 opacity-90 animate-pulse"></span>
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
    <div className="relative group w-full sm:w-auto">
       {/* Glow effect */}
       <div className="absolute inset-0 -m-1.5 rounded-full
                     hidden sm:block
                     bg-[var(--accent)]
                     opacity-35 filter blur-md pointer-events-none
                     transition-all duration-300 ease-out
                     group-hover:opacity-55 group-hover:blur-lg group-hover:-m-2.5"></div>
       <a
         href="/resume.pdf"
         target="_blank"
         rel="noopener noreferrer"
         className="relative z-10 block text-center px-4.5 py-2 sm:px-3.5 text-xs font-bold text-white bg-[var(--accent)] hover:bg-[var(--accent-hover)] rounded-full transition-all duration-200 w-full sm:w-auto cursor-pointer"
       >
         Resume
       </a>
    </div>
  );

  return (
    <header className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50
                       flex flex-col items-center
                       pl-6 pr-6 py-2.5 backdrop-blur-md
                       ${headerShapeClass}
                       border border-gray-200/30 bg-white/70 dark:border-gray-800/45 dark:bg-[#1f1f1f57]
                       w-[calc(100%-2rem)] sm:w-auto max-w-4xl
                       transition-[border-radius] duration-300 ease-in-out pointer-events-none`}>

      <div className="flex items-center justify-between w-full gap-x-6 sm:gap-x-8 pointer-events-auto">
        <div className="flex items-center gap-2">
           {logoElement}
           <span className="hidden lg:inline text-xs font-bold tracking-[0.15em] text-gray-950 dark:text-white select-none">
             VARUN
           </span>
        </div>

        <nav className="hidden sm:flex items-center space-x-4 sm:space-x-5 text-sm">
          {navLinksData.map((link) => (
            <AnimatedNavLink key={link.href} href={link.href}>
              {link.label}
            </AnimatedNavLink>
          ))}
        </nav>

        <div className="hidden sm:flex items-center gap-2.5">
          {introButtonElement}
          <ThemeToggle />
          {resumeButtonElement}
        </div>

        <button className="sm:hidden flex items-center justify-center w-8 h-8 text-gray-700 dark:text-gray-300 focus:outline-none" onClick={toggleMenu} aria-label={isOpen ? 'Close Menu' : 'Open Menu'}>
          {isOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
          ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <div className={`sm:hidden flex flex-col items-center w-full transition-all ease-in-out duration-300 overflow-hidden pointer-events-auto
                       ${isOpen ? 'max-h-[1000px] opacity-100 pt-4 pb-2' : 'max-h-0 opacity-0 pt-0 pb-0 pointer-events-none'}`}>
        <nav className="flex flex-col items-center space-y-3.5 text-sm w-full">
          {navLinksData.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="text-gray-500 dark:text-gray-400 hover:text-gray-950 dark:hover:text-white font-semibold transition-colors w-full text-center">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex flex-col items-center space-y-3 mt-4 w-full border-t border-gray-150 dark:border-gray-800/60 pt-4">
          <div className="flex items-center justify-center gap-4 w-full">
            {introButtonElement}
            <ThemeToggle />
          </div>
          {resumeButtonElement}
        </div>
      </div>
    </header>
  );
}
