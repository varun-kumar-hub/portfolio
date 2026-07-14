"use client";

import React from "react";
import { getSkillMeta } from "./icons/SkillIcons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const frontendSkills = [
  "React",
  "Next.js",
  "Tailwind CSS",
  "HTML5",
  "CSS3",
  "TypeScript"
];

const backendSkills = [
  "Node.js",
  "Python",
  "Java",
  "C Programming"
];

const databaseSkills = [
  "PostgreSQL",
  "Supabase",
  "Relational Databases",
  "Big Data",
  "Data Warehousing"
];

const otherSkills = [
  "Git",
  "GitHub",
  "Docker",
  "CI/CD Pipelines",
  "Artificial Intelligence (AI)",
  "Machine Learning (ML)",
  "Internet of Things (IoT)"
];

const categories = [
  { title: "Frontend Stack", skills: frontendSkills, reverse: false, speed: 3000 },
  { title: "Backend Systems", skills: backendSkills, reverse: true, speed: 3400 },
  { title: "Database Architecture", skills: databaseSkills, reverse: false, speed: 3200 },
  { title: "DevOps & Intelligent Systems", skills: otherSkills, reverse: true, speed: 3800 }
];

export default function SkillsBento() {
  return (
    <div className="w-full py-8 space-y-12">
      {/* CSS Styles for Continuous Smooth Scrolling & 3D Center Popout */}
      <style>{`
        /* Smooth continuous linear transition */
        .skills-swiper-container .swiper-wrapper {
          transition-timing-function: linear !important;
        }
        
        .skills-swiper {
          width: 100%;
          overflow: visible !important;
          padding-top: 0.75rem;
          padding-bottom: 0.75rem;
        }

        .skills-swiper .swiper-slide {
          display: flex;
          justify-content: center;
          align-items: center;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease, filter 0.5s ease;
          transform: scale(0.85);
          opacity: 0.22;
          filter: blur(1px);
        }

        /* ── Center Active Slide Popout ── */
        .skills-swiper .swiper-slide-active {
          transform: scale(1.2) !important;
          opacity: 1 !important;
          filter: blur(0px) !important;
          z-index: 10;
        }

        /* ── Adjacent Next/Prev Slides ── */
        .skills-swiper .swiper-slide-next,
        .skills-swiper .swiper-slide-prev {
          transform: scale(1.0) !important;
          opacity: 0.6 !important;
          filter: blur(0px) !important;
          z-index: 5;
        }

        /* ── Active Glow and Colors ── */
        .skills-swiper .swiper-slide-active .skill-circle {
          border-color: var(--brand-color) !important;
          box-shadow: 0 0 20px var(--brand-color), inset 0 0 6px rgba(255,255,255,0.02);
          background-color: rgba(10, 10, 14, 0.95);
        }

        .skills-swiper .swiper-slide-next .skill-circle,
        .skills-swiper .swiper-slide-prev .skill-circle {
          border-color: var(--brand-color-dim) !important;
          box-shadow: 0 0 8px var(--brand-color-dim);
          background-color: rgba(10, 10, 14, 0.6);
        }

        /* ── Tooltip Show/Hide Logic ── */
        .skills-swiper .skill-tooltip {
          transform: translateX(-50%) scale(0);
          opacity: 0;
          transform-origin: bottom center;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
        }

        /* Show when parent slide is active */
        .skills-swiper .swiper-slide-active .skill-tooltip {
          transform: translateX(-50%) scale(1) !important;
          opacity: 1 !important;
        }

        /* Show on hover of the circle */
        .skills-swiper .skill-circle:hover .skill-tooltip {
          transform: translateX(-50%) scale(1) !important;
          opacity: 1 !important;
        }
      `}</style>

      <div className="grid grid-cols-1 gap-4 skills-swiper-container overflow-hidden max-w-6xl mx-auto px-4 relative">
        
        {/* Soft edge fade shadows */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#07070a] to-transparent pointer-events-none z-25" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#07070a] to-transparent pointer-events-none z-25" />

        {categories.map((cat, idx) => {
          // Double or triple skills array to prevent loops from having empty gaps
          const repeatedSkills = [...cat.skills, ...cat.skills, ...cat.skills, ...cat.skills];

          return (
            <div key={idx} className="space-y-0.5">
              {/* Category Header Label */}
              <div className="flex items-center gap-3 px-4 mb-0.5">
                <span className="w-1 h-1 rounded-full bg-blue-500 shadow-[0_0_6px_rgba(59,130,246,0.6)]" />
                <h3 className="text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-500 font-sans">
                  {cat.title}
                </h3>
              </div>

              {/* Swiper Marquee Row */}
              <Swiper
                modules={[Autoplay]}
                className="skills-swiper"
                loop={true}
                speed={cat.speed}
                slidesPerView={6}
                spaceBetween={6}
                centeredSlides={true}
                grabCursor={false}
                allowTouchMove={true}
                autoplay={{
                  delay: 0,
                  disableOnInteraction: false,
                  reverseDirection: cat.reverse,
                }}
                breakpoints={{
                  480: {
                    slidesPerView: 8,
                    spaceBetween: 6,
                  },
                  640: {
                    slidesPerView: 10,
                    spaceBetween: 8,
                  },
                  768: {
                    slidesPerView: 12,
                    spaceBetween: 8,
                  },
                  1024: {
                    slidesPerView: 14,
                    spaceBetween: 8,
                  },
                  1280: {
                    slidesPerView: 16,
                    spaceBetween: 10,
                  }
                }}
              >
                {repeatedSkills.map((skillName, skillIdx) => {
                  const { icon, color } = getSkillMeta(skillName);
                  return (
                    <SwiperSlide key={`${skillName}-${skillIdx}`}>
                      <div
                        className="skill-circle flex flex-col items-center justify-center rounded-full bg-[#0d0d11]/45 border border-white/[0.05] w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 transition-all duration-300 relative group cursor-default"
                        style={{
                          "--brand-color": color.replace("0.4", "0.95"),
                          "--brand-color-dim": color.replace("0.4", "0.35"),
                        } as React.CSSProperties}
                      >
                        {/* Custom Brand / Concept Icon */}
                        <div className="scale-65 sm:scale-75 md:scale-[0.85] transition-transform duration-300 text-white shrink-0 flex items-center justify-center">
                          {icon}
                        </div>

                        {/* Hover & Active Tooltip Label */}
                        <div className="skill-tooltip absolute -top-7 left-1/2 bg-neutral-950/95 border border-white/10 px-2 py-0.5 rounded text-[8px] font-bold text-white pointer-events-none whitespace-nowrap tracking-wide z-50 shadow-md shadow-black/60">
                          {skillName}
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          );
        })}
      </div>
    </div>
  );
}
