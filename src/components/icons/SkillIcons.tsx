import React from "react";
import {
  Brain,
  Cpu,
  Database,
  GitBranch,
  Network,
  RefreshCw,
  Server,
  Terminal,
  Layers,
  Container,
} from "lucide-react";

interface IconProps {
  className?: string;
  size?: number;
}

// Custom brand SVGs

export function ReactIcon({ className, size = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-11.5 -10.23174 23 20.46348"
      width={size}
      height={size}
      className={className}
      fill="none"
    >
      <title>React Logo</title>
      <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
      <g stroke="#61dafb" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

export function NextjsIcon({ className, size = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 180 180"
      width={size}
      height={size}
      className={className}
    >
      <path
        fill="currentColor"
        d="M136.5 137.5L84.2 70.3V137.5H71V42.5H84.2L136.5 109.7V42.5H149.7V137.5H136.5Z"
      />
      <rect
        x="63.5"
        y="42.5"
        width="1.2"
        height="95"
        fill="currentColor"
        opacity="0.15"
      />
    </svg>
  );
}

export function TailwindIcon({ className, size = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M24 9.75c0-1.85-1.12-3.15-3.36-3.15-2.24 0-3.36 1.3-3.36 3.15v.9c0 1.85 1.12 3.15 3.36 3.15 2.24 0 3.36-1.3 3.36-3.15v-.9z"
        fill="#38bdf8"
        stroke="none"
      />
      <path
        d="M14.88 12.9c0-1.85-1.12-3.15-3.36-3.15-2.24 0-3.36 1.3-3.36 3.15v.9c0 1.85 1.12 3.15 3.36 3.15 2.24 0 3.36-1.3 3.36-3.15v-.9z"
        fill="#38bdf8"
        stroke="none"
      />
      <path
        d="M12 4.5C7.2 4.5 4 7.5 4 12c0 2.25.9 4.25 2.5 5.5l1.5-3c-1-1-1.5-2.25-1.5-3.5 0-3 2-5 5.5-5 1.5 0 2.75.5 3.5 1.5l3-1.5C17.25 5.4 15 4.5 12 4.5z"
        fill="#38bdf8"
        stroke="none"
      />
      <path
        d="M12 19.5c4.8 0 8-3 8-7.5 0-2.25-.9-4.25-2.5-5.5l-1.5 3c1 1 1.5 2.25 1.5 3.5 0 3-2 5-5.5 5-1.5 0-2.75-.5-3.5-1.5l-3 1.5c1.25 2.1 3.5 3 6.5 3z"
        fill="#38bdf8"
        stroke="none"
      />
    </svg>
  );
}

export function NodejsIcon({ className, size = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 284"
      width={size}
      height={size}
      className={className}
      fill="currentColor"
    >
      <path
        fill="#339933"
        d="M152.1 0l-91 52.5c-4.9 2.8-8 8.1-8 13.8v105c0 5.7 3.1 11 8 13.8l91 52.5c4.9 2.8 11 2.8 15.9 0l91-52.5c4.9-2.8 8-8.1 8-13.8v-105c0-5.7-3.1-11-8-13.8l-91-52.5c-5-2.8-11-2.8-15.9 0z"
        opacity="0.1"
      />
      <path
        fill="#339933"
        d="M141.5 12.3l-81.8 47.2c-5 2.9-8.1 8.2-8.1 14v94.4c0 5.8 3.1 11.1 8.1 14l81.8 47.2c5 2.9 11.2 2.9 16.2 0l81.8-47.2c5-2.9 8.1-8.2 8.1-14v-94.4c0-5.8-3.1-11.1-8.1-14l-81.8-47.2c-5-2.8-11.1-2.8-16.2 0z"
      />
    </svg>
  );
}

export function PythonIcon({ className, size = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 110 110"
      width={size}
      height={size}
      className={className}
    >
      <path
        fill="#3776AB"
        d="M55 2.1c-14.7 0-26.6 1.8-26.6 15.4V29h27v3.8H18.7C8.3 32.8 2.1 39 2.1 49.3v13.5c0 10.3 7.8 16.2 16.6 16.2h9.7v-13.6c0-9.2 7.7-16.8 16.9-16.8H72V22c0-11-9-19.9-17-19.9zm-13.5 9.7c2.4 0 4.4 2 4.4 4.4s-2 4.4-4.4 4.4-4.4-2-4.4-4.4 2-4.4 4.4-4.4z"
      />
      <path
        fill="#FFE873"
        d="M55 107.9c14.7 0 26.6-1.8 26.6-15.4V81h-27v-3.8h36.7c10.4 0 16.6-6.2 16.6-16.5V47.2c0-10.3-7.8-16.2-16.6-16.2h-9.7v13.6c0 9.2-7.7 16.8-16.9 16.8H38v26.6c0 11 9 19.9 17 19.9zm13.5-9.7c-2.4 0-4.4-2-4.4-4.4s2-4.4 4.4-4.4 4.4 2 4.4 4.4-2 4.4-4.4 4.4z"
      />
    </svg>
  );
}

export function JavaIcon({ className, size = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M6 15c-1 0-2 .5-2 1.5S5 18 6 18c2 0 4-1.5 6-1.5s4 1.5 6 1.5c1 0 2-.5 2-1.5s-1-1.5-2-1.5"
        stroke="#ea2d2e"
        strokeWidth="2"
      />
      <path
        d="M8 18c-1 0-2 .5-2 1.5S7 21 8 21c2 0 4-1.5 6-1.5s4 1.5 6 1.5c1 0 2-.5 2-1.5s-1-1.5-2-1.5"
        stroke="#ea2d2e"
        strokeWidth="2"
      />
      <path
        d="M10 11c-1-1-1-3 0-5s3-4 4-5c0 1-.5 3-1.5 4s-1.5 2-1.5 3 0 2 1 3c1 1 1.5 2 1 3s-2.5 1-3 0"
        stroke="#00748f"
        strokeWidth="2"
      />
      <path
        d="M14 11c-1-1-1-3 0-5s3-4 4-5c0 1-.5 3-1.5 4s-1.5 2-1.5 3 0 2 1 3c1 1 1.5 2 1 3s-2.5 1-3 0"
        stroke="#00748f"
        strokeWidth="2"
      />
    </svg>
  );
}

export function CIcon({ className, size = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
      width={size}
      height={size}
      className={className}
    >
      <path
        fill="#A8B9CC"
        d="M117.5 33.5L68.8 5.4c-3-1.7-6.7-1.7-9.7 0L10.5 33.5c-3 1.7-4.8 4.9-4.8 8.4v56.2c0 3.5 1.8 6.7 4.8 8.4l48.6 28.1c3 1.7 6.7 1.7 9.7 0l48.6-28.1c3-1.7 4.8-4.9 4.8-8.4V41.9c.1-3.5-1.7-6.7-4.7-8.4z"
      />
      <path
        fill="#ffffff"
        d="M87.5 86.1c-6.8 6.8-15.5 10.3-25.1 10.3-19.1 0-33.8-13-33.8-32.4 0-19.3 14.8-32.4 33.8-32.4 9.6 0 18.2 3.5 25.1 10.3l12.4-12.4C90.3 22.1 77.8 17 62.4 17 31.4 17 12 37.6 12 64s19.4 47 50.4 47c15.4 0 27.9-5.1 37.5-14.8L87.5 86.1z"
      />
    </svg>
  );
}

export function HTML5Icon({ className, size = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={size}
      height={size}
      className={className}
    >
      <path fill="#E34F26" d="M71 469.3L37.4 92h437.2L441 469.3 256 520z" />
      <path fill="#EF652A" d="M256 481V123.7h151.7L383 435z" />
      <path
        fill="#EFEFEF"
        d="M109 175.7h294l-6.8 76.3H189.7l6.8 76.3h188.5l-13.5 151-115.5 32.2-115.5-32.2-7.8-87.3h51.5l4 44.8 60 16.8 60-16.8 6.3-70.6H122.5z"
      />
    </svg>
  );
}

export function CSS3Icon({ className, size = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={size}
      height={size}
      className={className}
    >
      <path fill="#264DE4" d="M71 469.3L37.4 92h437.2L441 469.3 256 520z" />
      <path fill="#2965F1" d="M256 481V123.7h151.7L383 435z" />
      <path
        fill="#EFEFEF"
        d="M109 175.7h294l-6.8 76.3H189.7l6.8 76.3h188.5l-13.5 151-115.5 32.2-115.5-32.2-7.8-87.3h51.5l4 44.8 60 16.8 60-16.8 6.3-70.6H122.5z"
      />
    </svg>
  );
}

export function PostgreSQLIcon({ className, size = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
      width={size}
      height={size}
      className={className}
    >
      <path
        d="M105.7 64.9c1.9 4.3 2.9 8.9 2.9 13.5 0 18-14.7 32.7-32.7 32.7S43.2 96.4 43.2 78.4c0-4.6 1-9.2 2.9-13.5M60 48.7c0-11-9-20-20-20H12c0 23.3 14.8 43.2 35.6 50.8M68 48.7c0-11 9-20 20-20h28c0 23.3-14.8 43.2-35.6 50.8"
        stroke="#336791"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="64" cy="78" r="12" fill="#336791" />
    </svg>
  );
}

export function SupabaseIcon({ className, size = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
    >
      <path
        fill="#3ECF8E"
        d="M21.36 10.74l-9-9a2 2 0 0 0-2.83 0l-7 7a2 2 0 0 0-.42 2.21l3 6a2 2 0 0 0 2.21.94l4.63-1.54a.5.5 0 0 1 .53.18l3.16 3.8a2 2 0 0 0 3.23-.42l3-6a2 2 0 0 0-.51-2.17z"
      />
    </svg>
  );
}

export function GitIcon({ className, size = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 18a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 18a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" stroke="#F05032" />
      <path d="M9 15h6M6 9v3" stroke="#F05032" />
    </svg>
  );
}

export function GitHubIcon({ className, size = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export function DockerIcon({ className, size = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M2 12a10 10 0 0 0 20 0c0-2-1.5-4-3.5-4H20v-1a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v1h-3v-4H9V5H7v2H4V5H2v7z"
        stroke="#2496ed"
      />
      <rect x="7" y="10" width="2" height="2" fill="#2496ed" stroke="none" />
      <rect x="10" y="10" width="2" height="2" fill="#2496ed" stroke="none" />
      <rect x="13" y="10" width="2" height="2" fill="#2496ed" stroke="none" />
    </svg>
  );
}

// Master component/function to resolve skill name to its custom icon and glowing color
export function getSkillMeta(skillName: string): {
  icon: React.ReactNode;
  color: string; // Tailwind ring/glow color or Hex color
} {
  const normalized = skillName.trim().toLowerCase();

  switch (normalized) {
    case "react":
      return { icon: <ReactIcon size={24} />, color: "rgba(97, 218, 251, 0.4)" };
    case "next.js":
      return { icon: <NextjsIcon size={24} className="text-gray-900 dark:text-white" />, color: "rgba(128, 128, 128, 0.4)" };
    case "tailwind css":
      return { icon: <TailwindIcon size={24} />, color: "rgba(56, 189, 248, 0.4)" };
    case "node.js":
      return { icon: <NodejsIcon size={24} />, color: "rgba(51, 153, 51, 0.4)" };
    case "python":
      return { icon: <PythonIcon size={24} />, color: "rgba(55, 118, 171, 0.4)" };
    case "java":
      return { icon: <JavaIcon size={24} />, color: "rgba(234, 45, 46, 0.4)" };
    case "c programming":
      return { icon: <CIcon size={24} />, color: "rgba(168, 185, 204, 0.4)" };
    case "html5":
      return { icon: <HTML5Icon size={24} />, color: "rgba(227, 79, 38, 0.4)" };
    case "css3":
      return { icon: <CSS3Icon size={24} />, color: "rgba(38, 77, 228, 0.4)" };
    case "postgresql":
      return { icon: <PostgreSQLIcon size={24} />, color: "rgba(51, 103, 145, 0.4)" };
    case "supabase":
      return { icon: <SupabaseIcon size={24} />, color: "rgba(62, 207, 142, 0.4)" };
    case "git":
      return { icon: <GitIcon size={24} />, color: "rgba(240, 80, 50, 0.4)" };
    case "github":
      return { icon: <GitHubIcon size={24} className="text-gray-900 dark:text-white" />, color: "rgba(128, 128, 128, 0.4)" };
    case "docker":
      return { icon: <DockerIcon size={24} />, color: "rgba(36, 150, 237, 0.4)" };

    // Concepts / Lucide icons
    case "artificial intelligence (ai)":
    case "ai":
      return { icon: <Brain size={24} className="text-purple-500" />, color: "rgba(168, 85, 247, 0.4)" };
    case "machine learning (ml)":
    case "ml":
      return { icon: <Network size={24} className="text-pink-500" />, color: "rgba(236, 72, 153, 0.4)" };
    case "internet of things (iot)":
    case "iot":
      return { icon: <Cpu size={24} className="text-amber-500" />, color: "rgba(245, 158, 11, 0.4)" };
    case "relational databases":
      return { icon: <Database size={24} className="text-blue-500" />, color: "rgba(59, 130, 246, 0.4)" };
    case "big data":
      return { icon: <Server size={24} className="text-teal-500" />, color: "rgba(20, 184, 166, 0.4)" };
    case "data warehousing":
      return { icon: <Layers size={24} className="text-indigo-500" />, color: "rgba(99, 102, 241, 0.4)" };
    case "ci/cd pipelines":
      return { icon: <RefreshCw size={24} className="text-emerald-500" />, color: "rgba(16, 185, 129, 0.4)" };

    default:
      return { icon: <Terminal size={24} className="text-gray-500" />, color: "rgba(107, 114, 128, 0.4)" };
  }
}
