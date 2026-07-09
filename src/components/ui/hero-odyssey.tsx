"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

import { cn } from "@/lib/utils";


interface ElasticHueSliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
}

export const ElasticHueSlider: React.FC<ElasticHueSliderProps> = ({
  value,
  onChange,
  min = 0,
  max = 360,
  step = 1,
  label = "Adjust Hue",
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const progress = (value - min) / (max - min);
  const thumbPosition = progress * 100; // Percentage

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  return (
    <div className="scale-90 md:scale-100 relative w-full max-w-xs flex flex-col items-center z-40" ref={sliderRef}>
      {label && (
        <label htmlFor="hue-slider-native" className="text-gray-400 dark:text-gray-300 text-sm font-medium mb-2">
          {label}
        </label>
      )}
      <div className="relative w-full h-6 flex items-center">
        {/* Native input: Handles interaction, but visually hidden */}
        <input
          id="hue-slider-native"
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchEnd={handleMouseUp}
          className="absolute inset-0 w-full h-full appearance-none bg-transparent cursor-pointer z-20"
          style={{ WebkitAppearance: "none" }}
        />

        {/* Custom Track with dynamic hue gradient */}
        <div className="absolute left-0 w-full h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full z-0 overflow-hidden">
          <div
            className="h-full w-full opacity-60 dark:opacity-40"
            style={{
              background: "linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)",
            }}
          />
        </div>

        {/* Custom Fill showing path to current hue value */}
        <div
          className="absolute left-0 h-1.5 rounded-full z-10 opacity-80"
          style={{
            width: `${thumbPosition}%`,
            backgroundColor: `hsl(${value}, 85%, 55%)`,
            boxShadow: `0 0 10px hsl(${value}, 85%, 55%)`,
          }}
        />

        {/* Custom Thumb (Animated) */}
        <motion.div
          className="absolute w-5 h-5 rounded-full border-2 border-white shadow-md z-30 cursor-pointer pointer-events-none"
          style={{
            left: `calc(${thumbPosition}% - 10px)`,
            backgroundColor: `hsl(${value}, 85%, 55%)`,
            boxShadow: `0 0 12px hsl(${value}, 85%, 60%)`,
          }}
          animate={{ scale: isDragging ? 1.3 : 1 }}
          transition={{ type: "spring", stiffness: 500, damping: isDragging ? 20 : 30 }}
        />
      </div>

      {/* Value Indicator */}
      <AnimatePresence mode="wait">
        <motion.div
          key={value}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          transition={{ duration: 0.15 }}
          className="text-xs font-semibold mt-2 px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
        >
          {value}°
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

interface FeatureItemProps {
  name: string;
  value: string;
  position: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ name, value, position }) => {
  return (
    <div className={cn("absolute z-30 group transition-all duration-300 hover:scale-105 hidden md:block", position)}>
      <div className="flex items-center gap-3 relative rounded-2xl border border-gray-200/40 bg-white/40 p-3.5 backdrop-blur-md dark:border-gray-800/40 dark:bg-black/40 shadow-sm transition-colors duration-300 hover:bg-white/80 dark:hover:bg-black/70">
        {/* Dynamic theme glow dot */}
        <div className="relative">
          <div className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] animate-pulse" />
          <div className="absolute -inset-1 rounded-full bg-[var(--accent)] opacity-40 blur-sm group-hover:opacity-80 transition-opacity duration-300" />
        </div>
        <div className="text-left select-none">
          <div className="font-bold text-gray-950 dark:text-white text-sm transition-colors duration-300">
            {name}
          </div>
          <div className="text-gray-500 dark:text-gray-400 text-xs transition-colors duration-300">
            {value}
          </div>
        </div>
      </div>
    </div>
  );
};

interface LightningProps {
  hue?: number;
  xOffset?: number;
  speed?: number;
  intensity?: number;
  size?: number;
}

export const Lightning: React.FC<LightningProps> = ({
  hue = 230,
  xOffset = 0,
  speed = 1,
  intensity = 1,
  size = 1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const paramsRef = useRef({ hue, xOffset, speed, intensity, size });
  const animationFrameRef = useRef<number | null>(null);

  // Sync parameters instantly to the mutable ref on props change
  useEffect(() => {
    paramsRef.current = { hue, xOffset, speed, intensity, size };
  }, [hue, xOffset, speed, intensity, size]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Explicitly request alpha support for transparent overlays
    const gl = canvas.getContext("webgl", { alpha: true });
    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    const vertexShaderSource = `
      attribute vec2 aPosition;
      void main() {
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

    const fragmentShaderSource = `
      precision mediump float;
      uniform vec2 iResolution;
      uniform float iTime;
      uniform float uHue;
      uniform float uXOffset;
      uniform float uSpeed;
      uniform float uIntensity;
      uniform float uSize;
      
      #define OCTAVE_COUNT 8

      vec3 hsv2rgb(vec3 c) {
          vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0,4.0,2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
          return c.z * mix(vec3(1.0), rgb, c.y);
      }

      float hash11(float p) {
          p = fract(p * .1031);
          p *= p + 33.33;
          p *= p + p;
          return fract(p);
      }

      float hash12(vec2 p) {
          vec3 p3 = fract(vec3(p.xyx) * .1031);
          p3 += dot(p3, p3.yzx + 33.33);
          return fract((p3.x + p3.y) * p3.z);
      }

      mat2 rotate2d(float theta) {
          float c = cos(theta);
          float s = sin(theta);
          return mat2(c, -s, s, c);
      }

      float noise(vec2 p) {
          vec2 ip = floor(p);
          vec2 fp = fract(p);
          float a = hash12(ip);
          float b = hash12(ip + vec2(1.0, 0.0));
          float c = hash12(ip + vec2(0.0, 1.0));
          float d = hash12(ip + vec2(1.0, 1.0));
          
          vec2 t = smoothstep(0.0, 1.0, fp);
          return mix(mix(a, b, t.x), mix(c, d, t.x), t.y);
      }

      float fbm(vec2 p) {
          float value = 0.0;
          float amplitude = 0.5;
          for (int i = 0; i < OCTAVE_COUNT; ++i) {
              value += amplitude * noise(p);
              p *= rotate2d(0.45);
              p *= 2.0;
              amplitude *= 0.5;
          }
          return value;
      }

      void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
          vec2 uv = fragCoord / iResolution.xy;
          uv = 2.0 * uv - 1.0;
          uv.x *= iResolution.x / iResolution.y;
          uv.x += uXOffset;
          
          uv += 1.8 * fbm(uv * uSize + 0.6 * iTime * uSpeed) - 0.9;
          
          float dist = abs(uv.x);
          vec3 baseColor = hsv2rgb(vec3(uHue / 360.0, 0.75, 0.85));
          vec3 col = baseColor * pow(mix(0.0, 0.07, hash11(iTime * uSpeed)) / dist, 1.1) * uIntensity;
          
          // Make background transparent away from the bolt
          float alpha = max(col.r, max(col.g, col.b));
          fragColor = vec4(col, clamp(alpha * 2.2, 0.0, 1.0));
      }

      void main() {
          mainImage(gl_FragColor, gl_FragCoord.xy);
      }
    `;

    const compileShader = (source: string, type: number): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program linking error:", gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const aPosition = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    const iResolutionLocation = gl.getUniformLocation(program, "iResolution");
    const iTimeLocation = gl.getUniformLocation(program, "iTime");
    const uHueLocation = gl.getUniformLocation(program, "uHue");
    const uXOffsetLocation = gl.getUniformLocation(program, "uXOffset");
    const uSpeedLocation = gl.getUniformLocation(program, "uSpeed");
    const uIntensityLocation = gl.getUniformLocation(program, "uIntensity");
    const uSizeLocation = gl.getUniformLocation(program, "uSize");

    const startTime = performance.now();
    const render = () => {
      if (!canvasRef.current) return;
      resizeCanvas();
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(iResolutionLocation, canvas.width, canvas.height);
      const currentTime = performance.now();
      gl.uniform1f(iTimeLocation, (currentTime - startTime) / 1000.0);
      
      // Pull dynamic progress directly from the document custom property to avoid React re-renders!
      const progressStr = document.documentElement.style.getPropertyValue("--hold-progress") || "0";
      const progress = parseFloat(progressStr) || 0;

      gl.uniform1f(uHueLocation, paramsRef.current.hue);
      gl.uniform1f(uXOffsetLocation, paramsRef.current.xOffset);
      gl.uniform1f(uSpeedLocation, paramsRef.current.speed + progress * 1.5);
      gl.uniform1f(uIntensityLocation, paramsRef.current.intensity + progress * 0.55);
      gl.uniform1f(uSizeLocation, paramsRef.current.size);
      
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameRef.current = requestAnimationFrame(render);
    };
    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []); // Compile and run loop ONCE on mount!

  return <canvas ref={canvasRef} className="w-full h-full relative" />;
};

export function HeroSection() {


  // State for lightning hue
  const [lightningHue, setLightningHue] = useState(220); // Default to blue

  // Sync state change to custom property on mount and updates
  useEffect(() => {
    document.documentElement.style.setProperty("--theme-hue", lightningHue.toString());
  }, [lightningHue]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="home"
      className="relative w-full min-h-[92vh] md:min-h-screen flex items-center justify-center overflow-hidden py-16 md:py-24"
    >
      {/* Dynamic Background Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        {/* Theme-based subtle grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        {/* Dynamic Glow Center Backdrop */}
        <div
          className="absolute top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] md:w-[1000px] h-[700px] md:h-[1000px] rounded-full blur-[100px] opacity-40 dark:opacity-20 transition-all duration-300"
          style={{
            background: `radial-gradient(circle, hsla(${lightningHue}, 75%, 55%, 0.15) 0%, hsla(${lightningHue}, 60%, 45%, 0.05) 50%, transparent 100%)`,
          }}
        />

        {/* Central WebGL Lightning Canvas */}
        <div className="absolute top-0 w-full left-1/2 transform -translate-x-1/2 h-full opacity-70 dark:opacity-50">
          <Lightning hue={lightningHue} xOffset={0} speed={1.3} intensity={0.7} size={1.8} />
        </div>

        {/* Futuristic Planet/Sphere Core */}
        <div
          className="absolute top-[50%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full transition-all duration-500 border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.4)]"
          style={{
            background: `radial-gradient(circle at 35% 25%, hsl(${lightningHue}, 40%, 15%) 0%, #050508ee 60%, #000000 100%)`,
          }}
        />
      </motion.div>

      {/* Floating features */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="absolute inset-0 pointer-events-none"
      >
        <FeatureItem name="Next.js" value="Full-stack architecture" position="left-10 md:left-24 top-[22%]" />
        <FeatureItem name="Tailwind v4" value="Highly responsive styling" position="left-[15%] md:left-[18%] bottom-[32%]" />
        <FeatureItem name="Gemini API" value="AI & Machine Learning models" position="right-10 md:right-24 top-[22%]" />
        <FeatureItem name="Docker" value="Containerized deployments" position="right-[15%] md:right-[18%] bottom-[32%]" />
      </motion.div>

      {/* Main hero content container */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center select-none">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Welcome Tag */}
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            className="flex items-center space-x-2 px-4 py-1.5 rounded-full border border-gray-200/50 bg-white/40 text-xs font-semibold text-gray-700 backdrop-blur-md transition-all duration-300 hover:bg-white/80 dark:border-gray-800/40 dark:bg-black/30 dark:text-gray-300 dark:hover:bg-black/60 shadow-sm cursor-default"
          >
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
            <span>AI & Machine Learning Specialization</span>
          </motion.button>

          {/* Main Title */}
          <motion.h1
            variants={itemVariants}
            className="mt-6 text-5xl md:text-7xl font-bold tracking-tight text-gray-950 dark:text-white"
          >
            Challa Varun Kumar
          </motion.h1>

          {/* Subheading */}
          <motion.h2
            variants={itemVariants}
            className="mt-3 text-2xl md:text-4xl font-semibold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-gray-100 dark:to-gray-400"
          >
            Engineering the AI-Driven Future
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="mt-6 text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-2xl leading-relaxed"
          >
            Dedicated Computer Science student at Kalasalingam Academy of Research and Education. 
            Skilled in developing complex full-stack web products with React & Next.js, implementing machine learning models, 
            and configuring scalable DevOps pipelines.
          </motion.p>

          {/* Elastic Hue Slider */}
          <motion.div variants={itemVariants} className="mt-8 w-full max-w-xs flex justify-center">
            <ElasticHueSlider
              value={lightningHue}
              onChange={setLightningHue}
              label="Interactive Lightning Hue"
            />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="mt-10 flex flex-col sm:flex-row gap-4">
            <a
              className="inline-flex items-center justify-center rounded-xl bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[var(--accent-hover)] hover:shadow-[0_0_20px_var(--accent-glow)] shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
              href="#projects"
            >
              View Projects
            </a>
            <a
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200/80 bg-white/40 px-6 py-3 text-sm font-semibold text-gray-800 transition-all duration-300 hover:border-gray-300 hover:bg-white/80 dark:border-gray-800/80 dark:bg-black/30 dark:text-gray-200 dark:hover:border-gray-700 dark:hover:bg-black/60 shadow-sm hover:-translate-y-0.5 active:translate-y-0 active:scale-95 backdrop-blur-md"
              href="#contact"
            >
              Get in Touch
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
