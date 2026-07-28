"use client";

import { PortfolioViewCounter } from "./portfolio-view-counter";

interface ProjectViewCounterProps {
  slug?: string;
  className?: string;
}

export function ProjectViewCounter({
  className = "",
}: ProjectViewCounterProps) {
  return <PortfolioViewCounter className={className} />;
}

export default ProjectViewCounter;
