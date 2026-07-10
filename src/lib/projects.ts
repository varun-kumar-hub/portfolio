export interface Project {
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  details: string[];
  stack: { category: string; items: string[] }[];
  github: string;
  live: string;
  image: string;
}

export const projects: Project[] = [
  {
    slug: "learnx",
    name: "LearnX",
    description: "An AI-driven educational platform using the Google Gemini API that served 200+ users, improving concept retention by 30% through automated visual knowledge graphs.",
    longDescription: "LearnX is an interactive, AI-powered learning environment engineered to help students grasp complex subjects faster. By parsing dynamic course materials with the Google Gemini API, the platform builds responsive, visual knowledge graphs that reveal connections between concepts. The application includes a dashboard with gamified learning streaks, dynamic quiz generation, and collaborative card decks for seamless peer study.",
    details: [
      "Generated dynamic quizzes with instant feedback and performance tracking.",
      "Engineered interactive dashboards tracking progress, daily activity, and learning streaks.",
      "Supported community sharing, allowing users to publish and clone learning content."
    ],
    stack: [
      { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"] },
      { category: "AI & APIs", items: ["Google Gemini API"] },
      { category: "Backend & DevOps", items: ["Node.js", "Lucide React", "Vercel"] }
    ],
    github: "https://github.com/dinesh6473/WONDERS-OF-AI-3.0.git",
    live: "https://wonders-of-ai-3-0.vercel.app/dashboard",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop"
  },
  {
    slug: "resume-analyzer",
    name: "Resume Analyzer",
    description: "A resume parsing tool using Python and NLP that identifies key skill gaps, helping users improve their ATS match rate by an average of 25%.",
    longDescription: "Resume Analyzer is a high-performance NLP application designed to streamline the job application process. Built with Python and NLTK, it parses complex PDF and Word resumes to extract structured skill representations. The system uses a specialized ATS optimization algorithm to cross-reference resume files against job listings, highlighting missing keywords, advising on word choice, and generating structural suggestions.",
    details: [
      "Integrated Natural Language Toolkit (NLTK) to extract and categorize skills, education, and experience from PDF/DOCX files.",
      "Engineered keyword-matching algorithm comparing candidate profiles against job requirements for automated optimization suggestions."
    ],
    stack: [
      { category: "Core Development", items: ["Python", "Pandas", "Tkinter"] },
      { category: "NLP & AI", items: ["NLP", "NLTK", "PyPDF2", "Regex"] },
      { category: "Database", items: ["SQLite"] }
    ],
    github: "https://github.com/varun-kumar-hub/Resume-AI.git",
    live: "https://resume-a.vercel.app/",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=600&auto=format&fit=crop"
  },
  {
    slug: "researchx-ai",
    name: "ResearchX AI",
    description: "A Multi-Agent Research & Verification Platform that transforms scattered web information into structured, verified, and evidence-backed research.",
    longDescription: "ResearchX AI is a Multi-Agent Research & Verification Platform designed for autonomous research. It understands query intent, runs parallel multi-source searches, extracts and deduplicates data, cross-verifies facts, and generates comprehensive research reports with confidence scores. Features an interactive dashboard, personal API key management, and conversational follow-ups.",
    details: [
      "Engineered an autonomous multi-agent pipeline: Query Understanding, Research Planner, Discovery, Extraction, Deduplication, Verification, Report Generation, and AI Analyst.",
      "Implemented parallel search across Google (Serper), Tavily, Wikipedia, LinkedIn, official directories with browser-only API key storage and auto-fallback.",
      "Built validation mechanisms that cross-verify records, detect conflicts, resolve duplicate entities, and assign confidence scores."
    ],
    stack: [
      { category: "Frontend", items: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Framer Motion"] },
      { category: "Backend & AI", items: ["Next.js API Routes", "Google Gemini 2.5 Flash", "Serper API", "Tavily Search"] },
      { category: "Database", items: ["Supabase PostgreSQL"] }
    ],
    github: "https://github.com/varun-kumar-hub/research-agent.git",
    live: "https://research-agent-one-ruddy.vercel.app/",
    image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=600&auto=format&fit=crop"
  },
  {
    slug: "tripcrafter-pro",
    name: "TripCrafter Pro",
    description: "An AI-powered travel planning app using Google Gemini to generate personalized day-by-day itineraries with interactive maps, expense tracking, and a built-in AI concierge.",
    longDescription: "TripCrafter Pro is an intelligent trip planning application that uses Google's Gemini AI to generate personalized, day-by-day travel itineraries in seconds. Users enter their destination, travel dates, budget, and interests — and the AI crafts a detailed plan complete with activities, timings, cost estimates, insider tips, and geo-coordinates. Features include an interactive Google Maps view with markers and directions, drag-and-drop activity reordering, a real-time AI Travel Concierge chat, photo memories upload, visual expense tracking with pie charts, trip pacing analysis, live weather forecasts, and calendar export.",
    details: [
      "Integrated Google Gemini 2.5 Flash to generate tailored multi-day itineraries based on budget, interests (Food, Adventure, History, etc.), and travel dates.",
      "Built interactive trip view with expandable day-by-day timeline, Google Maps with markers/directions, and drag-and-drop activity reordering.",
      "Engineered AI Travel Concierge chat assistant for real-time trip Q&A, local customs, and hidden gems discovery.",
      "Implemented expense tracking with visual pie charts, trip pacing score analysis, live weather forecasts, and .ics calendar export."
    ],
    stack: [
      { category: "Frontend", items: ["React", "TypeScript", "Vite", "Tailwind CSS", "shadcn/ui", "Framer Motion"] },
      { category: "AI & APIs", items: ["Google Gemini AI", "Google Maps API", "Open-Meteo Weather API"] },
      { category: "Backend & Auth", items: ["Supabase Auth", "Supabase PostgreSQL", "Supabase Storage"] },
      { category: "Mobile & Deploy", items: ["Capacitor", "Recharts", "Vercel"] }
    ],
    github: "https://github.com/varun-kumar-hub/trip-crafter-pro-56.git",
    live: "https://trip-crafter-pro-56.vercel.app/",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=600&auto=format&fit=crop"
  },
  {
    slug: "ai-tools-tracker",
    name: "AI Tools Tracker",
    description: "Automated web scraping and data collection engine gathering data from major tech channels to reduce manual research by 10+ hours weekly.",
    longDescription: "AI Tools Tracker is a data-aggregation dashboard designed to monitor the fast-moving landscape of artificial intelligence software. It utilizes an automated scraping engine built on BeautifulSoup daily. A PostgreSQL database stores cataloged features, pricing tiers, and tags, enabling a highly-responsive comparisons system.",
    details: [
      "Aggregated features and classifications in structured formats using PostgreSQL.",
      "Built a comparison engine that allows users to explore and filter 500+ AI resources based on specific use cases."
    ],
    stack: [
      { category: "Database & APIs", items: ["PostgreSQL", "SQLAlchemy", "Requests"] },
      { category: "Scraping Engine", items: ["Python", "Web Scraping", "BeautifulSoup"] },
      { category: "DevOps & Data", items: ["Cron Jobs", "Pandas"] }
    ],
    github: "https://github.com/varun-kumar-hub/AI-Tools.git",
    live: "https://ai-tools-two-swart.vercel.app/",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop"
  }
];
