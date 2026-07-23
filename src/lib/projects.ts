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
  galleryDescriptions?: Record<string, { title: string; description: string }>;
}

export const projects: Project[] = [
  {
    slug: "learnx",
    name: "LearnX",
    category: "AI & EdTech",
    featured: true,
    description: "An AI-powered learning platform that brings everything together in one place — creating structured learning paths for any subject with interactive knowledge graphs, AI-guided study, and community collaboration.",
    longDescription: "Learning a new topic usually means switching between YouTube videos, blogs, PDFs, documentation, and many different websites. Since the information is scattered, learning becomes confusing and unorganized. LearnX solves this by bringing everything together in one intelligent platform. Instead of searching across multiple resources, LearnX creates structured learning paths for any subject — making learning simpler, faster, and more effective. It features AI-powered knowledge graphs, adaptive quizzes, flashcards, a learning analytics dashboard, and community-driven content sharing.",
    problemStatement: "Learning a new topic usually means switching between YouTube videos, blogs, PDFs, documentation, and many different websites. This takes a lot of time, and since the information is scattered, learning can become confusing and unorganized.",
    solutionOverview: "LearnX is an AI-powered learning platform that brings everything together in one place. Instead of searching across multiple resources, LearnX creates a structured learning path for any subject, making learning simpler, faster, and more effective. It gives students one intelligent platform where they can learn, practice, revise, track their progress, and truly understand concepts in a structured way.",
    architecture: [
      {
        title: "AI Knowledge Graph Engine",
        description: "Converts any topic into an interactive visual map, helping students understand how concepts are connected through force-directed graph rendering."
      },
      {
        title: "Structured Learning Paths",
        description: "Generates detailed explanations, diagrams, images, and examples so learners always know what to study next in a logical progression."
      },
      {
        title: "AI Learning Assistant",
        description: "Answers questions, explains difficult concepts, clears doubts, and guides students throughout their learning journey with contextual help."
      },
      {
        title: "Quiz & Flashcard Engine",
        description: "AI-generated quizzes with multiple difficulty levels and instant feedback, plus flashcards for quick revision and better memory retention through active recall."
      },
      {
        title: "Learning Analytics Dashboard",
        description: "Tracks quiz scores, accuracy, learning history, strengths, weaknesses, completed topics, mastered concepts, and overall progress."
      },
      {
        title: "Community Learning Hub",
        description: "Users can publish, discover, and clone learning paths and knowledge graphs shared by others, enabling collaborative learning at scale."
      }
    ],
    details: [
      "AI Knowledge Graph that converts any topic into an interactive visual map showing how concepts are connected.",
      "Structured Learning Paths with detailed explanations, diagrams, images, and examples.",
      "AI Learning Assistant that answers questions, explains difficult concepts, and guides students throughout their journey.",
      "AI-Generated Quizzes with multiple difficulty levels and instant feedback to test understanding.",
      "Flashcards for quick revision and better memory retention through active recall.",
      "Learning Analytics Dashboard to track quiz scores, accuracy, learning history, strengths, and weaknesses.",
      "Progress Tracking showing completed topics, mastered concepts, topics in progress, and overall completion percentage.",
      "Community Learning where users can publish, discover, and clone learning paths and knowledge graphs shared by others.",
      "Subject Management to create unlimited subjects, organize learning materials, and build a personalized learning library.",
      "Personal API Key Integration allowing users to securely add their own AI API key for more control and personalized AI-powered learning."
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
      "/projects/learnx/img-8.png"
    ],
    galleryDescriptions: {
      "/projects/learnx/img-1.png": { title: "LearnX Landing Page & Hero Header", description: "Landing hero featuring the tagline 'Turn Any Topic Into a Structured Knowledge Graph', platform navigation, 'Go to Dashboard' CTA, and PWA mobile app install prompt." },
      "/projects/learnx/img-2.png": { title: "My Subjects Dashboard & Learning Library", description: "User dashboard organizing active learning subjects ('Curriculum SDG Mapping', 'predictive analysis', 'Software engineering', 'Binomial theorem', 'sql') with public visibility toggles and 'Ask AI Tutor' widget." },
      "/projects/learnx/img-3.png": { title: "Subject Analytics & Learning Overview", description: "Detailed Subject Overview for 'Curriculum SDG Mapping' tracking unlocked topics (12 total), learning status, weekly study activity chart, and 'Up Next' recommended modules." },
      "/projects/learnx/img-4.png": { title: "Structured Learning Topic Reader", description: "In-depth concept lesson reader featuring numbered sub-sections ('1. Understanding SDGs', '2. What is Curriculum SDG Mapping?'), highlighted callouts, real-world examples, and AI assistant." },
      "/projects/learnx/img-5.png": { title: "Comparative Matrix & Analytical Content", description: "Lesson reader comparison table contrasting 'Traditional Curriculum' vs 'SDG-Mapped Curriculum' across Primary Focus, Relevance, Outcomes, and Student Role." },
      "/projects/learnx/img-6.png": { title: "Interactive Flashcard Revision Deck", description: "Flip-to-reveal flashcard revision mode for active recall, card counter ('Card 2 / 7'), and instant self-assessment controls." },
      "/projects/learnx/img-7.png": { title: "Quiz Performance Analytics & Score Hub", description: "Comprehensive Quiz Dashboard showing recorded attempts (5), average score (43%), best score (60%), difficulty rating (2.8/5), recent score bar chart, and 'Attempt Quiz' trigger." },
      "/projects/learnx/img-8.png": { title: "Community Sharing & Knowledge Path Cloning", description: "Public Community Hub where users search, explore, and clone public knowledge graphs shared by peer learners ('DBMS', 'HTML', 'Software Engineering')." }
    }
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
    ],
    galleryDescriptions: {
      "/projects/resume-analyzer/img-1.png": { title: "Resume AI Landing Page", description: "Landing hero featuring the tagline 'Optimize your resume for ATS & Humans', feature callouts ('ATS Parsing', 'Skill Gap Analysis', 'Instant Feedback'), and 'Analyze My Resume' CTA." },
      "/projects/resume-analyzer/img-2.png": { title: "Resume AI Dashboard & Upload Portal", description: "User dashboard displaying total parsed resumes (11), average ATS score (73%), drag-and-drop file upload interface supporting PDF and DOCX formats." },
      "/projects/resume-analyzer/img-3.png": { title: "ATS Compatibility Score & Improvement Areas", description: "ATS Compatibility Score report (75/100) detailing completeness, keywords, formatting rating, improvement warnings (missing phone number/LinkedIn), and section highlights." },
      "/projects/resume-analyzer/img-4.png": { title: "Extracted Resume Sections & Skill Tags", description: "NLP text extraction breakdown showing Summary, Experience, Education, and parsed skill badges with character counts." },
      "/projects/resume-analyzer/img-5.png": { title: "My Resumes Library & Scan History", description: "Grid view of saved user resume scans ('varun resume.pdf', 'Professional_Resume', 'Sample_AI_ML_Resume') showing ATS score badges and scan timestamps." },
      "/projects/resume-analyzer/img-6.png": { title: "Job Application Kanban Tracker", description: "Job Application Tracker categorizing applications into Applied, Interviewing, Offer, and Rejected columns with salary target markers." },
      "/projects/resume-analyzer/img-7.png": { title: "AI Resume Tailor & Cover Letter Generator", description: "AI Resume Tailor comparing candidate resume against a target job description to generate bullet point rewrites and AI cover letters." },
      "/projects/resume-analyzer/img-8.png": { title: "Generative AI Cover Letter Synthesis", description: "Cover letter generator crafting a custom application cover letter tailored specifically to the target role's key technical requirements." },
      "/projects/resume-analyzer/img-9.png": { title: "Target Job Description Match & Missing Keywords", description: "Job Description Vector Matcher detailing JD Match Score (31%), Matched Skills (5), Missing Skills (11), and explicit missing keyword tags ('adobe', 'backend', 'html', 'javascript', 'sql')." }
    }
  },
  {
    slug: "researchx-ai",
    name: "ResearchX AI",
    category: "Multi-Agent Autonomous AI",
    featured: true,
    description: "A Multi-Agent Research & Verification Platform that transforms scattered web information into structured, verified, and evidence-backed research with confidence scores and source citations.",
    longDescription: "ResearchX AI is a Multi-Agent Research & Verification Platform built for the AI Business Research Challenge. Unlike traditional web scrapers, it understands user intent, performs parallel multi-source research, extracts structured information, verifies facts, resolves conflicting data, removes duplicate records, and generates comprehensive research reports with confidence scores and source citations. It supports Company, Founder, Person, Product, Technology, Local Business, Industry, Competitor, and Organization research — all through an interactive dashboard with conversational AI follow-ups.",
    problemStatement: "Conducting thorough technical or business research across the web requires manually opening dozens of tabs, cross-verifying unverified claims, filtering promotional content, and synthesizing disorganized notes — a process that wastes 10+ hours per research project.",
    solutionOverview: "ResearchX AI automates end-to-end research by deploying a pipeline of 8 specialized AI agents. From query understanding to final report generation, each agent handles a distinct phase: intent classification, research planning, multi-source discovery, data extraction, deduplication, cross-verification, confidence scoring, and report synthesis. It queries Serper API, Tavily Search, and Wikipedia concurrently, cross-checks facts across independent sources, and generates fully cited Markdown reports with an interactive AI Analyst for follow-up questions.",
    architecture: [
      {
        title: "Query Understanding Agent",
        description: "Intent classification, entity detection, query validation, and research planning to understand exactly what the user needs."
      },
      {
        title: "Research Planner Agent",
        description: "Breaks complex queries into targeted research tasks and selects the most trusted sources for each sub-query."
      },
      {
        title: "Discovery Agent",
        description: "Performs parallel searches across Google (Serper), Tavily, Wikipedia, LinkedIn, official sites, and public directories simultaneously."
      },
      {
        title: "Extraction Agent",
        description: "Extracts structured information from raw web content, cleans data, normalizes formats, and preserves source attribution."
      },
      {
        title: "Deduplication Agent",
        description: "Detects duplicate entities across multiple sources and intelligently merges records to eliminate redundancy."
      },
      {
        title: "Verification Agent",
        description: "Cross-verifies facts across independent web sources, detects conflicts, and assigns credibility confidence scores."
      },
      {
        title: "Report Generation Agent",
        description: "Generates executive summaries and structured research reports with inline citations, evidence links, and confidence metrics."
      },
      {
        title: "AI Analyst Agent",
        description: "Answers follow-up questions with evidence-backed responses, source citations, and conversational Q&A capability."
      }
    ],
    details: [
      "Engineered an autonomous 8-agent pipeline: Query Understanding → Research Planner → Discovery → Extraction → Deduplication → Verification → Report Generation → AI Analyst.",
      "Implemented parallel search across Google (Serper), Tavily, Wikipedia, LinkedIn, official directories with browser-only API key storage and auto-fallback.",
      "Built cross-verification mechanisms that validate facts across independent sources, detect conflicts, resolve duplicate entities, and assign confidence scores.",
      "Supports 9 research types: Company, Founder, Person, Product, Technology, Local Business, Industry, Competitor, and Organization research.",
      "Personal API Key Management — Bring Your Own Gemini API Key with browser-only storage (never stored in DB), auto-fallback to server key, and seamless secure management.",
      "Interactive dashboard with real-time research progress tracking and conversational AI Analyst for evidence-backed follow-up Q&A."
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
      "/projects/researchx-ai/img-7.png"
    ],
    galleryDescriptions: {
      "/projects/researchx-ai/img-1.png": { title: "ResearchX Landing Command Center", description: "Landing interface featuring 'What will you research today?', Gemini 2.5 Flash active model badge, sample query prompts, and research launcher." },
      "/projects/researchx-ai/img-2.png": { title: "Executive Intelligence Brief & Metrics", description: "Research Campaign Intelligence Brief for 'OSI layers of computer network' showing 140 Facts Found, 136 High Confidence facts, 98% Average Confidence, and Pexels reference image gallery." },
      "/projects/researchx-ai/img-3.png": { title: "Verified Fact Overview Matrix", description: "Grid breakdown of verified atomic facts extracted from multi-source web scraping with deduplication tags." },
      "/projects/researchx-ai/img-4.png": { title: "Structured Analytical Categorization", description: "Research breakdown organized by 'Purpose & Significance', 'Comparison with TCP/IP Model', and 'Advantages & Disadvantages'." },
      "/projects/researchx-ai/img-5.png": { title: "Verification Consensus Audit & Confidence Gauges", description: "Verification Consensus Audit showing overall 98% Score Consensus Gauge, individual verified claims, 95% Confidence rating badges, and citation links." },
      "/projects/researchx-ai/img-6.png": { title: "Source Verification & Citation Index", description: "Directory of external sources (GeeksforGeeks, Cloudflare, Imperva, AWS, IBM) with domain reliability scores (95%-100%) and direct link triggers." },
      "/projects/researchx-ai/img-7.png": { title: "Real-Time Agent Execution Console & Pipeline Status", description: "Multi-agent pipeline status window showing 5-step progress (Query → Search → Scrape → Merge → Verify), active campaign target parameters, and live console terminal execution log." }
    }
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
    ],
    galleryDescriptions: {
      "/projects/tripcrafter-pro/img-1.png": { title: "TripCrafter Hero & Travel Architect Landing", description: "Immersive landing hero featuring 'Explore the World Your Way' tagline, mountain background visual, and 'Start Planning' quick trigger." },
      "/projects/tripcrafter-pro/img-2.png": { title: "AI-Powered Smart Planner Form", description: "Smart trip planner input form taking destination ('Kodaikanal'), start/end dates, currency (INR), budget level ('Medium'), group size ('Group of Friends'), and activity interests." },
      "/projects/tripcrafter-pro/img-3.png": { title: "Custom Generated Trip Itinerary Header", description: "AI-generated trip title ('Misty Peaks & Culinary Heights: Kodaikanal Friends' Escape'), estimated cost range (INR 12,000-18,000/person), pacing info, and Day 1 weather preview." },
      "/projects/tripcrafter-pro/img-4.png": { title: "Day-by-Day Hour Schedule & Activity Timelines", description: "Hourly breakdown view with time tags (11:30 AM Check-in, 1:00 PM South Indian Lunch, 2:30 PM Boating & Cycling at Kodaikanal Lake), cost estimates, location markers, and photo upload memory capture." },
      "/projects/tripcrafter-pro/img-5.png": { title: "Interactive Route Map & Multi-Day Geospatial Pinning", description: "Interactive Mapbox route view displaying color-coded pins for each day's route ('Day 1: Lakeside Charm', 'Day 2: Trekking Thrills', 'Day 3: Wilderness Waterfalls')." },
      "/projects/tripcrafter-pro/img-6.png": { title: "Live Destination Weather & Travel Forecast Widget", description: "Weather Forecast overlay presenting live conditions (12° Sunny/Partly Cloudy), 3-day temperature preview, and AI Travel Tips." },
      "/projects/tripcrafter-pro/img-7.png": { title: "AI Trip Concierge & Smart Packing Checklist", description: "Trip Concierge floating assistant for on-the-go queries, Smart Packing Suggestions checklist (warm layers, rain gear, trekking shoes, power bank), and multi-day accordion schedule." }
    }
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
    ],
    galleryDescriptions: {
      "/projects/ai-tools-tracker/img-1.png": { title: "FutureTech AI Tools Hero & Metrics Dashboard", description: "Landing hero featuring 'Discover the Best AI Tools Daily', real-time statistics (15,327 Total Tools, 9+ Categories, 105 Added Today, 324+ Tags Tracked), search bar, and Latest Arrivals feed." },
      "/projects/ai-tools-tracker/img-2.png": { title: "Scraped Latest Arrivals Directory", description: "Grid view of freshly scraped tools and articles across Data & Analytics, Code & Development, Productivity & Automation with source domain badges ('Dev.to')." },
      "/projects/ai-tools-tracker/img-3.png": { title: "Detailed Tool Metadata & External Source Inspector", description: "Individual Tool Details modal for 'a RAG Chatbot with FastAPI and ChromaDB' displaying parsed tags (#ai, #python, #tutorial), category, date added, and 'Visit Website' outbound link." },
      "/projects/ai-tools-tracker/img-4.png": { title: "Direct Source Web Redirection (Dev.to / ProductHunt)", description: "Seamless web routing directly launching the original publisher page ('Dev.to - Building a RAG Chatbot with FastAPI and ChromaDB') upon clicking." },
      "/projects/ai-tools-tracker/img-5.png": { title: "Category Navigation Hub & Tool Counts", description: "Explore AI Tools grid organizing tools by category ('Productivity' 42 tools, 'Marketing & Sales' 247, 'Code & Development' 249, 'Design & Creative' 78)." }
    }
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
