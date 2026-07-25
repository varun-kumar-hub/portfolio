"use client";

import React, {
  CSSProperties,
  ReactNode,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type FXSection = {
  id?: string;
  leftLabel?: ReactNode;
  title: string | ReactNode;
  subtitle?: ReactNode;
  tags?: string[];
  customContent?: ReactNode;
  rightLabel?: ReactNode;
  bgGradient?: string;
  glowColor?: string;
  renderBackground?: (active: boolean, previous: boolean) => ReactNode;
};

type Colors = Partial<{
  text: string;
  overlay: string;
  pageBg: string;
  stageBg: string;
}>;

type Durations = Partial<{
  change: number; // section change animation
  snap: number;   // programmatic scroll duration (ms)
}>;

export type FullScreenFXAPI = {
  next: () => void;
  prev: () => void;
  goTo: (index: number) => void;
  getIndex: () => number;
  refresh: () => void;
};

export type FullScreenFXProps = {
  sections: FXSection[];
  className?: string;
  style?: CSSProperties;

  // Layout
  fontFamily?: string;
  header?: ReactNode;
  footer?: ReactNode;
  gap?: number;           // rem
  gridPaddingX?: number;  // rem

  showProgress?: boolean;
  debug?: boolean;

  // Motion
  durations?: Durations;
  reduceMotion?: boolean;

  // Controlled index
  currentIndex?: number;
  onIndexChange?: (index: number) => void;
  initialIndex?: number;

  // Colors
  colors?: Colors;

  // Imperative API
  apiRef?: React.Ref<FullScreenFXAPI>;
  ariaLabel?: string;
};

const clamp = (n: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, n));

// Animated Ambient Particle Canvas Background
const AmbientCanvas = ({ activeIndex }: { activeIndex: number }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particle nodes
    const particleCount = 35;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1,
      alpha: Math.random() * 0.4 + 0.1,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint connections
      for (let i = 0; i < particleCount; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(239, 68, 68, ${p1.alpha})`;
        ctx.fill();

        for (let j = i + 1; j < particleCount; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(239, 68, 68, ${0.12 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, [activeIndex]);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-[2]" />;
};

export const FullScreenScrollFX = forwardRef<HTMLDivElement, FullScreenFXProps>(
  (
    {
      sections,
      className,
      style,

      fontFamily = 'var(--font-outfit), sans-serif',
      header,
      footer,
      gap = 1,
      gridPaddingX = 2,

      showProgress = true,
      debug = false,

      durations = { change: 0.5, snap: 600 },
      reduceMotion,

      currentIndex,
      onIndexChange,
      initialIndex = 0,

      colors = {
        text: "rgba(245,245,245,0.95)",
        overlay: "rgba(4,4,6,0.5)",
        pageBg: "#040406",
        stageBg: "#040406",
      },

      apiRef,
      ariaLabel = "Full screen scroll slideshow",
    },
    ref
  ) => {
    const total = sections.length;
    const [localIndex, setLocalIndex] = useState(clamp(initialIndex, 0, Math.max(0, total - 1)));
    const isControlled = typeof currentIndex === "number";
    const index = isControlled ? clamp(currentIndex!, 0, Math.max(0, total - 1)) : localIndex;

    const rootRef = useRef<HTMLDivElement | null>(null);
    const fixedRef = useRef<HTMLDivElement | null>(null);
    const fixedSectionRef = useRef<HTMLDivElement | null>(null);

    const bgRefs = useRef<HTMLDivElement[]>([]);
    const wordRefs = useRef<HTMLSpanElement[][]>([]);

    const leftTrackRef = useRef<HTMLDivElement | null>(null);
    const rightTrackRef = useRef<HTMLDivElement | null>(null);
    const leftItemRefs = useRef<HTMLDivElement[]>([]);
    const rightItemRefs = useRef<HTMLDivElement[]>([]);

    const progressFillRef = useRef<HTMLDivElement | null>(null);
    const currentNumberRef = useRef<HTMLSpanElement | null>(null);

    const stRef = useRef<ScrollTrigger | null>(null);
    const lastIndexRef = useRef(index);
    const isSnappingRef = useRef(false);
    const sectionTopRef = useRef<number[]>([]);

    // prefers-reduced-motion
    const prefersReduced = useMemo(() => {
      if (typeof window === "undefined") return false;
      return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }, []);
    const motionOff = reduceMotion ?? prefersReduced;

    // Split words for center title
    const splitWords = (text: string) => {
      const words = text.split(/\s+/).filter(Boolean);
      return words.map((w, i) => (
        <span className="fx-word-mask" key={i}>
          <span className="fx-word">{w}</span>
          {i < words.length - 1 ? "\u00A0" : null}
        </span>
      ));
    };

    // Compute scroll snap positions
    const computePositions = () => {
      const el = fixedSectionRef.current;
      if (!el) return;
      const top = el.offsetTop;
      const h = el.offsetHeight;
      const arr: number[] = [];
      const usableHeight = h - window.innerHeight;
      for (let i = 0; i < total; i++) {
        arr.push(top + (usableHeight * i) / (total - 1 || 1));
      }
      sectionTopRef.current = arr;
    };

    // Align lists: center active row
    const measureAndCenterLists = (toIndex = index, animate = true) => {
      const centerTrack = (
        container: HTMLDivElement | null,
        items: HTMLDivElement[],
        trackRef: React.MutableRefObject<HTMLDivElement | null>
      ) => {
        if (!container || items.length === 0 || !trackRef.current) return;
        const targetItem = items[toIndex];
        if (!targetItem) return;

        const contRect = container.getBoundingClientRect();
        const itemRect = targetItem.getBoundingClientRect();
        
        const currentY = (gsap.getProperty(trackRef.current, "y") as number) || 0;
        const itemCenterRel = (itemRect.top - currentY) + itemRect.height / 2;
        const targetY = contRect.height / 2 - itemCenterRel;

        if (animate) {
          gsap.to(trackRef.current, {
            y: targetY,
            duration: 0.45,
            ease: "power2.out",
            overwrite: "auto",
            force3D: true,
          });
        } else {
          gsap.set(trackRef.current, { y: targetY });
        }
      };

      if (typeof window === "undefined") return;
      requestAnimationFrame(() => {
        centerTrack(leftTrackRef.current, leftItemRefs.current, leftTrackRef);
        centerTrack(rightTrackRef.current, rightItemRefs.current, rightTrackRef);
      });
    };

    // Section change visuals
    const changeSection = (to: number) => {
      if (to === lastIndexRef.current) return;
      const from = lastIndexRef.current;
      const down = to > from;
      lastIndexRef.current = to;

      if (!isControlled) setLocalIndex(to);
      onIndexChange?.(to);

      // progress numbers
      if (currentNumberRef.current) {
        currentNumberRef.current.textContent = String(to + 1).padStart(2, "0");
      }
      if (progressFillRef.current) {
        const p = (to / (total - 1 || 1)) * 100;
        progressFillRef.current.style.width = `${p}%`;
      }

      const D = durations.change ?? 0.5;

      // center title word animation (mask slide)
      const outWords = wordRefs.current[from] || [];
      const inWords = wordRefs.current[to] || [];
      if (outWords.length) {
        gsap.to(outWords, {
          yPercent: down ? -100 : 100,
          opacity: 0,
          duration: D * 0.5,
          stagger: down ? 0.02 : -0.02,
          ease: "power3.out",
          overwrite: "auto",
        });
      }
      if (inWords.length) {
        gsap.set(inWords, { yPercent: down ? 100 : -100, opacity: 0 });
        gsap.to(inWords, {
          yPercent: 0,
          opacity: 1,
          duration: D,
          stagger: down ? 0.03 : -0.03,
          ease: "power3.out",
          overwrite: "auto",
        });
      }

      // backgrounds - pure GPU crossfade
      bgRefs.current.forEach((bg, i) => {
        if (!bg) return;
        if (i === to) {
          gsap.to(bg, { opacity: 1, scale: 1, duration: D, ease: "power2.out", overwrite: "auto" });
        } else if (i === from) {
          gsap.to(bg, { opacity: 0, scale: 0.98, duration: D, ease: "power2.out", overwrite: "auto" });
        } else {
          gsap.set(bg, { opacity: 0, scale: 1.02 });
        }
      });

      // lists - center active row and animate active state
      measureAndCenterLists(to, true);

      leftItemRefs.current.forEach((el, i) => {
        if (!el) return;
        el.classList.toggle("active", i === to);
        gsap.to(el, {
          opacity: i === to ? 1 : 0.25,
          x: i === to ? 8 : 0,
          duration: D * 0.6,
          ease: "power3.out",
          overwrite: "auto",
        });
      });
      rightItemRefs.current.forEach((el, i) => {
        if (!el) return;
        el.classList.toggle("active", i === to);
        gsap.to(el, {
          opacity: i === to ? 1 : 0.25,
          x: i === to ? -8 : 0,
          duration: D * 0.6,
          ease: "power3.out",
          overwrite: "auto",
        });
      });
    };

    // ScrollTrigger for pinning + index step detection
    useLayoutEffect(() => {
      if (typeof window === "undefined") return;
      const fixed = fixedRef.current;
      const fs = fixedSectionRef.current;
      const root = rootRef.current;
      if (!fixed || !fs || !root || total === 0) return;

      // Query elements safely inside effect
      bgRefs.current = Array.from(root.querySelectorAll<HTMLDivElement>(".fx-bg"));
      leftItemRefs.current = Array.from(root.querySelectorAll<HTMLDivElement>(".fx-left-item"));
      rightItemRefs.current = Array.from(root.querySelectorAll<HTMLDivElement>(".fx-right-item"));
      wordRefs.current = sections.map((_, sIdx) =>
        Array.from(root.querySelectorAll<HTMLSpanElement>(`.fx-featured-${sIdx} .fx-word`))
      );

      const ctx = gsap.context(() => {
        // initial bg states
        bgRefs.current.forEach((bg, i) => {
          if (!bg) return;
          gsap.set(bg, { opacity: i === index ? 1 : 0, scale: i === index ? 1 : 1.05 });
        });

        // initial center words
        wordRefs.current.forEach((words, sIdx) => {
          words.forEach((w) => {
            gsap.set(w, {
              yPercent: sIdx === index ? 0 : 100,
              opacity: sIdx === index ? 1 : 0,
            });
          });
        });

        computePositions();
        measureAndCenterLists(index, false);

        const st = ScrollTrigger.create({
          trigger: fs,
          start: "top top",
          end: "bottom bottom",
          pin: fixed,
          pinSpacing: true,
          onUpdate: (self) => {
            if (motionOff || isSnappingRef.current) return;
            const prog = self.progress;
            const target = clamp(Math.floor(prog * total), 0, total - 1);
            if (target !== lastIndexRef.current) {
              changeSection(target);
            }
            if (progressFillRef.current) {
              const p = (lastIndexRef.current / (total - 1 || 1)) * 100;
              progressFillRef.current.style.width = `${p}%`;
            }
          },
        });

        stRef.current = st;
      }, rootRef);

      // handle resize
      const ro = new ResizeObserver(() => {
        computePositions();
        measureAndCenterLists(lastIndexRef.current, false);
        ScrollTrigger.refresh();
      });
      ro.observe(fs);

      return () => {
        ro.disconnect();
        ctx.revert();
        stRef.current = null;
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [total, motionOff]);

    // programmatic navigation
    const goTo = (to: number, withScroll = true) => {
      const clamped = clamp(to, 0, total - 1);
      isSnappingRef.current = true;
      changeSection(clamped);

      const pos = sectionTopRef.current[clamped] ?? 0;
      const snapMs = durations.snap ?? 600;

      if (withScroll && typeof window !== "undefined") {
        window.scrollTo({ top: pos, behavior: "smooth" });
        setTimeout(() => (isSnappingRef.current = false), snapMs);
      } else {
        setTimeout(() => (isSnappingRef.current = false), 10);
      }
    };

    const next = () => goTo(index + 1);
    const prev = () => goTo(index - 1);

    useImperativeHandle(apiRef, () => ({
      next,
      prev,
      goTo,
      getIndex: () => index,
      refresh: () => ScrollTrigger.refresh(),
    }));

    // click on list items
    const handleJump = (i: number) => goTo(i);

    // mount entrance
    useEffect(() => {
      measureAndCenterLists(index, false);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // CSS vars
    const cssVars: CSSProperties = {
      ["--fx-font" as string]: fontFamily,
      ["--fx-text" as string]: colors.text ?? "rgba(245,245,245,0.95)",
      ["--fx-overlay" as string]: colors.overlay ?? "rgba(4,4,6,0.5)",
      ["--fx-page-bg" as string]: colors.pageBg ?? "#040406",
      ["--fx-stage-bg" as string]: colors.stageBg ?? "#040406",
      ["--fx-gap" as string]: `${gap}rem`,
      ["--fx-grid-px" as string]: `${gridPaddingX}rem`,
      ["--fx-row-gap" as string]: "14px",
    };

    return (
      <div
        ref={(node) => {
          rootRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={["fx", className].filter(Boolean).join(" ")}
        style={{ ...cssVars, ...style }}
        aria-label={ariaLabel}
      >
        {debug && <div className="fx-debug">Section: {index}</div>}

        <div className="fx-scroll">
          <div className="fx-fixed-section" ref={fixedSectionRef}>
            <div className="fx-fixed" ref={fixedRef}>
              {/* Dynamic Animated Ambient Canvas */}
              <AmbientCanvas activeIndex={index} />

              {/* Dark Ambient Gradient Backgrounds */}
              <div className="fx-bgs" aria-hidden="true">
                {sections.map((s, i) => (
                  <div
                    className="fx-bg"
                    key={s.id ?? i}
                  >
                    {s.renderBackground ? (
                      s.renderBackground(index === i, false)
                    ) : (
                      <div className="relative w-full h-full bg-[#040406] overflow-hidden">
                        {/* Dynamic Radial Mesh Glow */}
                        <div
                          className="absolute inset-0 transition-all duration-700"
                          style={{
                            background: s.bgGradient || (i === 0
                              ? "radial-gradient(circle at 50% 50%, rgba(239, 68, 68, 0.22) 0%, rgba(15, 17, 23, 0.95) 55%, #040406 100%)"
                              : i === 1
                              ? "radial-gradient(circle at 50% 50%, rgba(225, 29, 72, 0.22) 0%, rgba(15, 17, 23, 0.95) 55%, #040406 100%)"
                              : i === 2
                              ? "radial-gradient(circle at 50% 50%, rgba(244, 63, 94, 0.22) 0%, rgba(15, 17, 23, 0.95) 55%, #040406 100%)"
                              : "radial-gradient(circle at 50% 50%, rgba(248, 113, 113, 0.22) 0%, rgba(15, 17, 23, 0.95) 55%, #040406 100%)"),
                          }}
                        />

                        {/* Animated Glowing Cyber Grid Overlay */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.04)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-50" />

                        {/* Central Pulsing Plasma Core */}
                        <div
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full blur-[140px] pointer-events-none opacity-40 animate-pulse"
                          style={{ backgroundColor: s.glowColor || "#ef4444" }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Grid Layout */}
              <div className="fx-grid">
                {/* Header */}
                {header && <div className="fx-header">{header}</div>}

                {/* Content (lists + center) */}
                <div className="fx-content">
                  {/* Left list */}
                  <div className="fx-left" role="list">
                    <div className="fx-track" ref={leftTrackRef}>
                      {sections.map((s, i) => (
                        <div
                          key={`L-${s.id ?? i}`}
                          className={`fx-item fx-left-item ${i === index ? "active" : ""}`}
                          onClick={() => handleJump(i)}
                          role="button"
                          tabIndex={0}
                          aria-pressed={i === index}
                        >
                          {s.leftLabel}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Center title (masked words + custom visual content) */}
                  <div className="fx-center">
                    {sections.map((s, sIdx) => {
                      const isString = typeof s.title === "string";
                      return (
                        <div key={`C-${s.id ?? sIdx}`} className={`fx-featured fx-featured-${sIdx} ${sIdx === index ? "active" : ""}`}>
                          <h2 className="fx-featured-title">
                            {isString ? splitWords(s.title as string) : s.title}
                          </h2>
                          {s.subtitle && (
                            <p className="text-xs sm:text-sm text-red-200/80 font-medium tracking-wide mt-2 max-w-xl mx-auto drop-shadow-md">
                              {s.subtitle}
                            </p>
                          )}
                          {s.tags && s.tags.length > 0 && (
                            <div className="flex flex-wrap items-center justify-center gap-1.5 mt-2.5">
                              {s.tags.map((tag, tIdx) => (
                                <span
                                  key={tIdx}
                                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-mono font-medium bg-red-500/10 border border-red-500/30 text-red-300 backdrop-blur-md shadow-[0_0_10px_rgba(239,68,68,0.15)]"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                          {s.customContent && (
                            <div className="mt-3.5 w-full flex justify-center">{s.customContent}</div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Right list */}
                  <div className="fx-right" role="list">
                    <div className="fx-track" ref={rightTrackRef}>
                      {sections.map((s, i) => (
                        <div
                          key={`R-${s.id ?? i}`}
                          className={`fx-item fx-right-item ${i === index ? "active" : ""}`}
                          onClick={() => handleJump(i)}
                          role="button"
                          tabIndex={0}
                          aria-pressed={i === index}
                        >
                          {s.rightLabel}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer + progress */}
                <div className="fx-footer">
                  {footer && <div className="fx-footer-title">{footer}</div>}
                  {showProgress && (
                    <div className="fx-progress">
                      <div className="fx-progress-numbers">
                        <span ref={currentNumberRef} className="text-red-400 font-bold">{String(index + 1).padStart(2, "0")}</span>
                        <span className="text-neutral-500 font-medium">{String(total).padStart(2, "0")}</span>
                      </div>
                      <div className="fx-progress-bar">
                        <div className="fx-progress-fill" ref={progressFillRef} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .fx {
            width: 100%;
            overflow: hidden;
            background: var(--fx-page-bg);
            color: var(--fx-text);
            font-family: var(--fx-font);
            text-transform: uppercase;
            letter-spacing: -0.02em;
          }

          .fx-debug {
            position: fixed; bottom: 10px; right: 10px; z-index: 9999;
            background: rgba(0,0,0,0.8); color: #ef4444; padding: 6px 8px; font: 12px/1 monospace; border-radius: 4px; border: 1px solid rgba(239,68,68,0.3);
          }

          .fx-fixed-section { height: 400vh; position: relative; }
          .fx-fixed { position: sticky; top: 0; height: 100vh; width: 100%; overflow: hidden; background: var(--fx-page-bg); }
          .fx-fixed::after {
            content: "";
            position: absolute;
            bottom: 0; left: 0; right: 0;
            height: 100px;
            background: linear-gradient(to bottom, transparent, rgba(4, 4, 6, 0.95));
            pointer-events: none;
            z-index: 15;
          }

          .fx-grid {
            display: grid;
            grid-template-columns: repeat(12, 1fr);
            gap: var(--fx-gap);
            padding: 0 var(--fx-grid-px);
            position: relative;
            height: 100%;
            z-index: 2;
          }

          .fx-bgs { position: absolute; inset: 0; background: var(--fx-stage-bg); z-index: 1; }
          .fx-bg { position: absolute; inset: 0; opacity: 0; will-change: opacity, transform; }

          .fx-header {
            grid-column: 1 / 13; align-self: start; padding-top: 85px;
            text-align: center; color: var(--fx-text); z-index: 20;
          }
          .fx-header > * { display: block; }

          .fx-content {
            grid-column: 1 / 13;
            position: absolute; inset: 0;
            display: grid; 
            grid-template-columns: 22% 56% 22%;
            align-items: center;
            height: 100%;
            padding: 0 var(--fx-grid-px);
            z-index: 10;
          }

          .fx-left, .fx-right {
            height: 50vh;
            overflow: hidden;
            display: grid; align-content: center;
            z-index: 20;
          }
          .fx-left { justify-items: start; }
          .fx-right { justify-items: end; }
          .fx-track { will-change: transform; }

          .fx-item {
            color: var(--fx-text);
            font-weight: 700;
            letter-spacing: 0.08em;
            line-height: 1.3;
            margin: calc(var(--fx-row-gap) / 2) 0;
            opacity: 0.25;
            transition: opacity 0.3s ease, transform 0.3s ease, color 0.3s ease;
            position: relative;
            font-size: clamp(0.7rem, 1.1vw, 0.95rem);
            user-select: none;
            cursor: pointer;
            white-space: nowrap;
          }
          .fx-left-item.active, .fx-right-item.active { opacity: 1; color: #ffffff; }
          .fx-left-item.active { transform: translateX(8px); padding-left: 14px; }
          .fx-right-item.active { transform: translateX(-8px); padding-right: 14px; }

          .fx-left-item.active::before,
          .fx-right-item.active::after {
            content: "";
            position: absolute; top: 50%; transform: translateY(-50%);
            width: 6px; height: 6px; background: #ef4444; border-radius: 50%;
            box-shadow: 0 0 8px rgba(239, 68, 68, 0.8);
          }
          .fx-left-item.active::before { left: 0; }
          .fx-right-item.active::after { right: 0; }

          .fx-center {
            display: grid; place-items: center; text-align: center; height: 55vh; overflow: hidden;
            padding: 0 0.5rem;
            z-index: 10;
          }
          .fx-featured { position: absolute; opacity: 0; visibility: hidden; width: 100%; max-width: 100%; }
          .fx-featured.active { opacity: 1; visibility: visible; }
          .fx-featured-title {
            margin: 0; color: var(--fx-text);
            font-weight: 900; letter-spacing: -0.02em;
            font-size: clamp(1.4rem, 3.2vw, 3.2rem);
            line-height: 1.15;
            padding: 0 0.5rem;
            text-wrap: balance;
            word-break: normal;
            background: linear-gradient(180deg, #ffffff 0%, #d4d4d4 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .fx-word-mask { display: inline-block; overflow: hidden; vertical-align: middle; }
          .fx-word { display: inline-block; vertical-align: middle; will-change: transform, opacity; }

          .fx-footer {
            grid-column: 1 / 13; align-self: end; padding-bottom: 3.5vh; text-align: center; z-index: 20;
          }
          .fx-footer-title { color: var(--fx-text); font-size: clamp(1.2rem, 3.5vw, 3.5rem); font-weight: 800; letter-spacing: -0.01em; line-height: 0.9; }
          .fx-progress { width: 180px; height: 2px; margin: 0.8rem auto 0; background: rgba(255,255,255,0.12); position: relative; border-radius: 999px; }
          .fx-progress-fill { position: absolute; inset: 0 auto 0 0; width: 0%; background: linear-gradient(90deg, #ef4444, #f43f5e); height: 100%; transition: width 0.3s ease; border-radius: 999px; }
          .fx-progress-numbers { position: absolute; inset: auto 0 100% 0; display: flex; justify-content: space-between; font-size: 0.75rem; padding-bottom: 6px; font-family: monospace; }

          @media (max-width: 900px) {
            .fx-header { padding-top: 75px; }
            .fx-content {
              grid-template-columns: 1fr; row-gap: 2vh;
              place-items: center;
            }
            .fx-left, .fx-right, .fx-center { height: auto; }
            .fx-left, .fx-right { justify-items: center; }
            .fx-track { transform: none !important; }
            .fx-featured-title { font-size: clamp(1.6rem, 6vw, 2.5rem); }
          }
        `}</style>
      </div>
    );
  }
);

FullScreenScrollFX.displayName = "FullScreenScrollFX";
