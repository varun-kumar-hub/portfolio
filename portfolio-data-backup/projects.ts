export interface ProjectModule {
  title: string;
  description: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
  description?: string;
}

export interface Project {
  slug: string;
  name: string;
  category: string;
  featured?: boolean;
  description: string;
  longDescription: string;
  problemStatement: string;
  solutionOverview: string;
  architecture: ProjectModule[];
  details: string[];
  metrics?: ProjectMetric[];
  stack: { category: string; items: string[] }[];
  github: string;
  live: string;
  image: string;
  gallery: string[];
}

export const projects: Project[] = [
  {
    slug: "learnx",
    name: "LearnX",
    category: "AI & EdTech",
    featured: true,
    description: "An AI-driven educational platform using the Google Gemini API that served 200+ users, improving concept retention by 30% through automated visual knowledge graphs.",
    longDescription: "LearnX is an interactive, AI-powered learning environment engineered to help students grasp complex subjects faster. By parsing dynamic course materials with the Google Gemini API, the platform builds responsive, visual knowledge graphs that reveal connections between concepts. The application includes a dashboard with gamified learning streaks, dynamic quiz generation, and collaborative card decks for seamless peer study.",
    problemStatement: "Students frequently struggle with dense, unstructured academic text and isolated concepts, leading to fragmented learning habits, poor exam retention, and inefficient study preparation.",
    solutionOverview: "LearnX bridges the gap between passive reading and active mastery. Powered by the Google Gemini API, it automatically parses syllabus documents, textbooks, and notes into structured JSON Directed Acyclic Graphs (DAGs) rendered as visual knowledge maps. It pairs these graphs with adaptive active-recall quizzes and gamified streaks to keep learners engaged.",
    architecture: [
      {
        title: "Visual Knowledge Graph Engine",
        description: "Parses course material using Gemini Flash to extract concept nodes, relationships, and hierarchies, rendering interactive force-directed graphs."
      },
      {
        title: "Adaptive Active-Recall Quiz Generator",
        description: "Synthesizes multi-difficulty multiple choice and open-ended questions on the fly, tracking user accuracy and suggesting review nodes."
      },
      {
        title: "Collaborative Study Deck Hub",
        description: "Allows students to publish, fork, and share custom card decks and visual notes with peer groups in real time."
      }
    ],
    details: [
      "Generated dynamic quizzes with instant feedback and performance tracking.",
      "Engineered interactive dashboards tracking progress, daily activity, and learning streaks.",
      "Supported community sharing, allowing users to publish and clone learning content."
    ],
    metrics: [
      { label: "Active Users", value: "200+", description: "Students served during initial campus release" },
      { label: "Retention Boost", value: "+30%", description: "Measured concept retention improvement" },
      { label: "Quizzes Completed", value: "1,500+", description: "Automated retention checks generated" }
    ],
    stack: [
      { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"] },
      { category: "AI & APIs", items: ["Google Gemini API"] },
      { category: "Backend & DevOps", items: ["Node.js", "Lucide React", "Vercel"] }
    ],
    github: "https://github.com/dinesh6473/WONDERS-OF-AI-3.0.git",
    live: "https://wonders-of-ai-3-0.vercel.app/dashboard",
    image: "/projects/learnx/img-1.png",
    gallery: [
      "/projects/learnx/img-1.png",
      "/projects/learnx/img-2.png",
      "/projects/learnx/img-3.png",
      "/projects/learnx/img-4.png",
      "/projects/learnx/img-5.png",
      "/projects/learnx/img-6.png",
      "/projects/learnx/img-7.png",
      "/projects/learnx/img-8.png",
      "/projects/learnx/img-9.png"
    ]
  },
  {
    slug: "resume-analyzer",
    name: "Resume Analyzer",
    category: "NLP & Resume Intelligence",
    featured: true,
    description: "A resume parsing tool using Python and NLP that identifies key skill gaps, helping users improve their ATS match rate by an average of 25%.",
    longDescription: "Resume Analyzer is a high-performance NLP application designed to streamline the job application process. Built with Python and NLTK, it parses complex PDF and Word resumes to extract structured skill representations. The system uses a specialized ATS optimization algorithm to cross-reference resume files against job listings, highlighting missing keywords, advising on word choice, and generating structural suggestions.",
    problemStatement: "Up to 75% of qualified job applicants are filtered out by automated Applicant Tracking Systems (ATS) due to unextracted skill keywords, non-standard formatting, or missing industry terminology.",
    solutionOverview: "Resume Analyzer acts as an intelligent career coach. It executes a multi-stage document processing pipeline using PyPDF2 and NLTK tokenization, removing stop words, lemmatizing technical terms, and running TF-IDF keyword extraction. It compares extracted candidate vectors directly against target job descriptions to produce a comprehensive diagnostic report.",
    architecture: [
      {
        title: "Multi-Format Document Ingestion",
        description: "Extracts clean text and structural headings from complex multi-page PDF and DOCX files without losing section context."
      },
      {
        title: "NLTK Skill & Taxonomy Extractor",
        description: "Tokenizes, tags parts of speech, and maps phrases against a customized IT and software engineering skill taxonomy."
      },
      {
        title: "ATS Semantic Match Matrix",
        description: "Calculates keyword overlap, missing critical skills, and provides real-time formatting recommendations."
      }
    ],
    details: [
      "Integrated Natural Language Toolkit (NLTK) to extract and categorize skills, education, and experience from PDF/DOCX files.",
      "Engineered keyword-matching algorithm comparing candidate profiles against job requirements for automated optimization suggestions."
    ],
    metrics: [
      { label: "Match Increase", value: "+25%", description: "Average increase in candidate ATS match score" },
      { label: "Resumes Analyzed", value: "500+", description: "Processed with sub-second parsing speed" },
      { label: "Parsing Accuracy", value: "98%", description: "Key entity & skill extraction accuracy" }
    ],
    stack: [
      { category: "Core Development", items: ["Python", "Pandas", "Tkinter"] },
      { category: "NLP & AI", items: ["NLP", "NLTK", "PyPDF2", "Regex"] },
      { category: "Database", items: ["SQLite"] }
    ],
    github: "https://github.com/varun-kumar-hub/Resume-AI.git",
    live: "https://resume-a.vercel.app/",
    image: "/projects/resume-analyzer/img-1.png",
    gallery: [
      "/projects/resume-analyzer/img-1.png",
      "/projects/resume-analyzer/img-2.png",
      "/projects/resume-analyzer/img-3.png",
      "/projects/resume-analyzer/img-4.png",
      "/projects/resume-analyzer/img-5.png",
      "/projects/resume-analyzer/img-6.png",
      "/projects/resume-analyzer/img-7.png",
      "/projects/resume-analyzer/img-8.png",
      "/projects/resume-analyzer/img-9.png"
    ]
  },
  {
    slug: "researchx-ai",
    name: "ResearchX AI",
    category: "Multi-Agent Autonomous AI",
    featured: true,
    description: "A Multi-Agent Research & Verification Platform that transforms scattered web information into structured, verified, and evidence-backed research.",
    longDescription: "ResearchX AI is a Multi-Agent Research & Verification Platform designed for autonomous research. It understands query intent, runs parallel multi-source searches, extracts and deduplicates data, cross-verifies facts, and generates comprehensive research reports with confidence scores. Features an interactive dashboard, personal API key management, and conversational follow-ups.",
    problemStatement: "Conducting thorough technical or business research across the web requires manually opening dozens of tabs, cross-verifying unverified claims, filtering promotional content, and synthesizing disorganized notes.",
    solutionOverview: "ResearchX AI automates end-to-end research by deploying a swarm of specialized AI agents: Query Intent Planner, Parallel Web Crawler, Deduplication Engine, Multi-Source Fact Verifier, and AI Analyst Report Synthesizer. It queries Serper API, Tavily Search, and Wikipedia concurrently, cross-checks facts across distinct sources, and generates fully cited Markdown reports.",
    architecture: [
      {
        title: "Intent Decomposition & Query Planner",
        description: "Breaks down complex user questions into distinct search sub-queries across multiple angles and source types."
      },
      {
        title: "Parallel Multi-Provider Discovery",
        description: "Executes asynchronous concurrent queries across Serper, Tavily, Wikipedia, and official public API endpoints."
      },
      {
        title: "Cross-Verification & Hallucination Guard",
        description: "Checks claims across independent web sources, calculates credibility confidence scores, and flags conflicting data."
      },
      {
        title: "Synthesis & Interactive Analyst Chat",
        description: "Compiles evidence into structured Markdown reports with live inline citations and conversational Q&A capability."
      }
    ],
    details: [
      "Engineered an autonomous multi-agent pipeline: Query Understanding, Research Planner, Discovery, Extraction, Deduplication, Verification, Report Generation, and AI Analyst.",
      "Implemented parallel search across Google (Serper), Tavily, Wikipedia, LinkedIn, official directories with browser-only API key storage and auto-fallback.",
      "Built validation mechanisms that cross-verify records, detect conflicts, resolve duplicate entities, and assign confidence scores."
    ],
    metrics: [
      { label: "Time Saved", value: "10+ hrs", description: "Saved per research project vs manual workflow" },
      { label: "Fact Consistency", value: "95%+", description: "Verified across independent data providers" },
      { label: "Live Data Sources", value: "5+", description: "Integrated search & verification APIs" }
    ],
    stack: [
      { category: "Frontend", items: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Framer Motion"] },
      { category: "Backend & AI", items: ["Next.js API Routes", "Google Gemini 2.5 Flash", "Serper API", "Tavily Search"] },
      { category: "Database", items: ["Supabase PostgreSQL"] }
    ],
    github: "https://github.com/varun-kumar-hub/research-agent.git",
    live: "https://research-agent-one-ruddy.vercel.app/",
    image: "/projects/researchx-ai/img-1.png",
    gallery: [
      "/projects/researchx-ai/img-1.png",
      "/projects/researchx-ai/img-2.png",
      "/projects/researchx-ai/img-3.png",
      "/projects/researchx-ai/img-4.png",
      "/projects/researchx-ai/img-5.png",
      "/projects/researchx-ai/img-6.png",
      "/projects/researchx-ai/img-7.png",
      "/projects/researchx-ai/img-8.png"
    ]
  },
  {
    slug: "tripcrafter-pro",
    name: "TripCrafter Pro",
    category: "AI Travel & Full-Stack",
    featured: true,
    description: "An AI-powered travel planning app using Google Gemini to generate personalized day-by-day itineraries with interactive maps, expense tracking, and a built-in AI concierge.",
    longDescription: "TripCrafter Pro is an intelligent trip planning application that uses Google's Gemini AI to generate personalized, day-by-day travel itineraries in seconds. Users enter their destination, travel dates, budget, and interests — and the AI crafts a detailed plan complete with activities, timings, cost estimates, insider tips, and geo-coordinates. Features include an interactive Google Maps view with markers and directions, drag-and-drop activity reordering, a real-time AI Travel Concierge chat, photo memories upload, visual expense tracking with pie charts, trip pacing analysis, live weather forecasts, and calendar export.",
    problemStatement: "Planning multi-day travel requires juggling budgets, destination maps, attraction schedules, transport logistics, weather forecasts, and personal pacing without a single unified tool.",
    solutionOverview: "TripCrafter Pro unifies travel planning into a single intelligent dashboard. Powered by Gemini 2.5 Flash, it synthesizes personalized daily itineraries complete with GPS coordinates, estimated costs, activity durations, and local tips. It integrates Google Maps for visual route exploration, Open-Meteo for live weather, and Supabase for budget management.",
    architecture: [
      {
        title: "Gemini Itinerary Synthesizer",
        description: "Generates structured JSON travel plans tailored to user budget, pace (relaxed vs packed), and interest themes."
      },
      {
        title: "Google Maps Interactive Waypoint System",
        description: "Renders daily route markers, distance estimates, turn-by-turn directions, and drag-and-drop activity reordering."
      },
      {
        title: "Real-Time AI Travel Concierge",
        description: "In-trip conversational AI assistant for instant local recommendations, emergency advice, and cultural customs."
      },
      {
        title: "Expense Analytics & Calendar Sync",
        description: "Visual pie charts tracking spent vs allocated budget, pacing scores, and one-click .ics calendar export."
      }
    ],
    details: [
      "Integrated Google Gemini 2.5 Flash to generate tailored multi-day itineraries based on budget, interests (Food, Adventure, History, etc.), and travel dates.",
      "Built interactive trip view with expandable day-by-day timeline, Google Maps with markers/directions, and drag-and-drop activity reordering.",
      "Engineered AI Travel Concierge chat assistant for real-time trip Q&A, local customs, and hidden gems discovery.",
      "Implemented expense tracking with visual pie charts, trip pacing score analysis, live weather forecasts, and .ics calendar export."
    ],
    metrics: [
      { label: "Generation Speed", value: "<5s", description: "Average duration to generate a 7-day custom trip" },
      { label: "Map Accuracy", value: "100%", description: "Verified geo-coordinates and directions for waypoints" },
      { label: "Export Formats", value: ".ICS & PDF", description: "Seamless offline calendar & plan sync" }
    ],
    stack: [
      { category: "Frontend", items: ["React", "TypeScript", "Vite", "Tailwind CSS", "shadcn/ui", "Framer Motion"] },
      { category: "AI & APIs", items: ["Google Gemini AI", "Google Maps API", "Open-Meteo Weather API"] },
      { category: "Backend & Auth", items: ["Supabase Auth", "Supabase PostgreSQL", "Supabase Storage"] },
      { category: "Mobile & Deploy", items: ["Capacitor", "Recharts", "Vercel"] }
    ],
    github: "https://github.com/varun-kumar-hub/trip-crafter-pro-56.git",
    live: "https://trip-crafter-pro-56.vercel.app/",
    image: "/projects/tripcrafter-pro/img-1.png",
    gallery: [
      "/projects/tripcrafter-pro/img-1.png",
      "/projects/tripcrafter-pro/img-2.png",
      "/projects/tripcrafter-pro/img-3.png",
      "/projects/tripcrafter-pro/img-4.png",
      "/projects/tripcrafter-pro/img-5.png",
      "/projects/tripcrafter-pro/img-6.png",
      "/projects/tripcrafter-pro/img-7.png"
    ]
  },
  {
    slug: "ai-tools-tracker",
    name: "AI Tools Tracker",
    category: "Data Engineering & Scraping",
    featured: true,
    description: "Automated web scraping and data collection engine gathering data from major tech channels to reduce manual research by 10+ hours weekly.",
    longDescription: "AI Tools Tracker is a data-aggregation dashboard designed to monitor the fast-moving landscape of artificial intelligence software. It utilizes an automated scraping engine built on BeautifulSoup daily. A PostgreSQL database stores cataloged features, pricing tiers, and tags, enabling a highly-responsive comparisons system.",
    problemStatement: "With dozens of new AI tools launched daily across ProductHunt, GitHub, and tech news, keeping up with feature updates, pricing changes, and category shifts requires hundreds of manual hours.",
    solutionOverview: "AI Tools Tracker runs an automated data aggregation pipeline. Scheduled Python scrapers leverage BeautifulSoup and Requests to monitor top AI repositories and directories, clean and deduplicate payloads, normalize pricing models, and load structured records into PostgreSQL for instant side-by-side comparisons.",
    architecture: [
      {
        title: "Automated Scraping & Ingestion Engine",
        description: "Executes scheduled Python BeautifulSoup/Requests web scrapers with custom headers, rate-limiting, and error fallback."
      },
      {
        title: "PostgreSQL Data Normalizer",
        description: "Cleans unformatted text, extracts pricing tiers, assigns use-case tags, and indexes items using SQLAlchemy ORM."
      },
      {
        title: "High-Performance Comparison API",
        description: "Delivers sub-100ms API responses allowing users to filter, sort, and compare 500+ AI resources dynamically."
      }
    ],
    details: [
      "Aggregated features and classifications in structured formats using PostgreSQL.",
      "Built a comparison engine that allows users to explore and filter 500+ AI resources based on specific use cases."
    ],
    metrics: [
      { label: "Tools Cataloged", value: "500+", description: "Indexed AI products and developer resources" },
      { label: "Curation Hours Saved", value: "10+ hrs/wk", description: "Automated vs manual aggregation" },
      { label: "Query Speed", value: "<100ms", description: "Sub-second filtering & side-by-side comparisons" }
    ],
    stack: [
      { category: "Database & APIs", items: ["PostgreSQL", "SQLAlchemy", "Requests"] },
      { category: "Scraping Engine", items: ["Python", "Web Scraping", "BeautifulSoup"] },
      { category: "DevOps & Data", items: ["Cron Jobs", "Pandas"] }
    ],
    github: "https://github.com/varun-kumar-hub/AI-Tools.git",
    live: "https://ai-tools-two-swart.vercel.app/",
    image: "/projects/ai-tools-tracker/img-1.png",
    gallery: [
      "/projects/ai-tools-tracker/img-1.png",
      "/projects/ai-tools-tracker/img-2.png",
      "/projects/ai-tools-tracker/img-3.png",
      "/projects/ai-tools-tracker/img-4.png",
      "/projects/ai-tools-tracker/img-5.png"
    ]
  }
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured !== false);
}

export function getProjectsByCategory(category: string): Project[] {
  if (category === "All") return projects;
  return projects.filter((p) => p.category.toLowerCase().includes(category.toLowerCase()));
}
