export interface Project {
  id: string;
  title: string;
  category: 'AI & Systems Platform' | 'Java / Backend' | 'Full Stack / React' | 'AI Platform' | 'Blockchain & FinTech' | 'Cybersecurity' | 'All';
  description: string;
  fullDescription: string;
  problemStatement: string;
  solution: string;
  architectureOverview?: string;
  semDetails?: {
    moduleName: string;
    pgaRating: string;
    geoRouting: string;
    alertSystem: string;
  };
  image: string;
  techStack: string[];
  features: string[];
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  isFlagship?: boolean;
}

export interface SkillCategory {
  name: string;
  skills: { name: string; level: number; icon: string; highlight?: boolean }[];
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  location: string;
  gpaOrScore?: string;
  details: string[];
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  verifyUrl: string;
  badge: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  highlights: string[];
}

export interface AchievementItem {
  title: string;
  category: 'Hackathons' | 'Projects' | 'Open Source' | 'Leadership' | 'Business Development';
  date: string;
  description: string;
  badge: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  content: string;
  image: string;
}

export const PERSONAL_INFO = {
  name: "Alvin MS",
  initials: "AM",
  title: "Computer Science & AI Student",
  roles: [
    "Computer Science & AI Student",
    "Full Stack Developer",
    "Java Developer",
    "AI Enthusiast",
    "Entrepreneur"
  ],
  tagline: "Building software. Designing systems. Creating ideas that matter.",
  bio: `I am a Computer Science & Artificial Intelligence student, software developer and entrepreneur interested in building intelligent applications, scalable digital platforms and technology-driven products. My focus includes software engineering, AI, full-stack development, backend systems and entrepreneurship.`,
  location: "Trivandrum, Kerala, India",
  availability: "Available for Internships, Software Engineering Roles, Collaborations & Startup Ventures",
  email: "alvinms394@gmail.com",
  githubUsername: "Soulofghost",
  githubUrl: "https://github.com/Soulofghost",
  linkedinUrl: "https://www.linkedin.com/in/alvin-ms-b812a836b/",
  productionUrl: "https://alvin-ms-portfolio.alvinms394.workers.dev",
  instagramUrl: "https://www.instagram.com/alvxnmz._",
  discordUrl: "https://discord.gg/cD6yyBWt",
  whatsappUrl: "https://wa.me/?text=Hi%20Alvin",
  telegramUrl: "https://t.me/alvinms",
  twitterUrl: "https://twitter.com/alvinms",
  facebookUrl: "https://facebook.com/alvinms",
  blogUrl: "#blog",
  stats: {
    projectsCompleted: 8,
    githubRepositories: 86,
    technologiesLearned: 25,
    yearsLearning: 3
  }
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: "Languages & Core",
    skills: [
      { name: "Java", level: 92, icon: "SiOpenjdk", highlight: true },
      { name: "Python", level: 90, icon: "SiPython", highlight: true },
      { name: "TypeScript", level: 88, icon: "SiTypescript", highlight: true },
      { name: "JavaScript", level: 90, icon: "SiJavascript" },
      { name: "Solidity", level: 82, icon: "SiSolidity" },
      { name: "SQL", level: 86, icon: "SiPostgresql" }
    ]
  },
  {
    name: "Backend & Systems",
    skills: [
      { name: "Spring Boot", level: 90, icon: "SiSpringboot", highlight: true },
      { name: "FastAPI", level: 88, icon: "SiFastapi", highlight: true },
      { name: "Node.js / Express", level: 86, icon: "SiNodedotjs" },
      { name: "REST & WebSockets", level: 92, icon: "SiPostman", highlight: true },
      { name: "Microservices", level: 85, icon: "SiDocker" }
    ]
  },
  {
    name: "Frontend & UI/UX",
    skills: [
      { name: "Next.js (App Router)", level: 90, icon: "SiNextdotjs", highlight: true },
      { name: "React 19", level: 92, icon: "SiReact", highlight: true },
      { name: "Tailwind CSS v4", level: 95, icon: "SiTailwindcss", highlight: true },
      { name: "Framer Motion", level: 88, icon: "SiFramer" },
      { name: "HTML5 / Modern CSS", level: 95, icon: "SiHtml5" }
    ]
  },
  {
    name: "Databases & Storage",
    skills: [
      { name: "PostgreSQL", level: 88, icon: "SiPostgresql", highlight: true },
      { name: "MySQL", level: 90, icon: "SiMysql", highlight: true },
      { name: "SQLite (WAL Mode)", level: 92, icon: "SiSqlite" },
      { name: "MongoDB", level: 84, icon: "SiMongodb" },
      { name: "Supabase", level: 88, icon: "SiSupabase" }
    ]
  },
  {
    name: "DevOps & Tools",
    skills: [
      { name: "Docker & Compose", level: 88, icon: "SiDocker", highlight: true },
      { name: "Git & GitHub Actions", level: 92, icon: "SiGithub", highlight: true },
      { name: "Linux Administration", level: 85, icon: "SiLinux" },
      { name: "VS Code & IntelliJ", level: 94, icon: "SiIntellijidea" },
      { name: "Hardhat / Ethers.js", level: 82, icon: "SiEthereum" }
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "sentrix-platform",
    title: "SENTRIX — Smart Disaster Response & SEM Platform",
    category: "AI & Systems Platform",
    description: "Civil defense command platform ingesting structural telemetry (accelerometers, dam gauges, thermal sensors) to compute Peak Ground Acceleration, radial evacuation fences, and geodesic dispatch.",
    fullDescription: "SENTRIX is an emergency management and Structural & Environmental Monitoring (SEM) command platform engineered for civil defense agencies and disaster dispatch coordinators. It ingests high-frequency telemetry from bridge/skyscraper triaxial accelerometers, dam flume river gauges, and wildfire thermal sensors to compute real-time Peak Ground Acceleration (PGA), generate dynamic evacuation cordons, calculate first-responder transit ETAs using Haversine geodesic routing, and broadcast Emergency Alert System (EAS) civil directives.",
    problemStatement: "During catastrophic disasters, commanders face severe blind spots: fragmented sensor databases delay hazard assessments, evacuation orders are subjective rather than algorithmic, and first responders are manually routed without real-time geodesic proximity calculations.",
    solution: "SENTRIX integrates real-time telemetry processing with automated Modified Mercalli Intensity classification, hydraulic dam overflow calculations, radial evacuation exclusion zones, and automated unit dispatch with sub-second response times.",
    architectureOverview: "FastAPI backend with SQLite/WAL persistence, ingestion pipeline evaluating Peak Ground Acceleration (g), hydraulic stage thresholds, Haversine routing engine, and single-page emergency operations console.",
    semDetails: {
      moduleName: "Structural & Environmental Monitoring (SEM) Engine",
      pgaRating: "Triaxial Accelerometer PGA conversion to Modified Mercalli Intensity (MMI I-XII)",
      geoRouting: "Haversine Geodesic Distance Matrix ranking closest emergency battalions with estimated urban transit ETA",
      alertSystem: "Automated Emergency Alert System (EAS) directive broadcast with geo-fenced evacuation cordons"
    },
    image: "/projects/sentrix-preview.jpg",
    techStack: ["FastAPI", "Python 3.11", "SQLite / WAL", "Haversine Algorithm", "Tailwind CSS", "Docker"],
    features: [
      "Sub-millisecond Peak Ground Acceleration (PGA) & Mercalli Intensity Rating",
      "Hydraulic Flume Dam Surge & Reservoir Overflow Warning Engine",
      "Dynamic Radial Evacuation Geo-Fencing with status broadcasting",
      "Haversine Geodesic First Responder Routing (USAR, MedEvac, Hazmat)",
      "Integrated Emergency Operations Console with interactive telemetry injection"
    ],
    githubUrl: "https://github.com/Soulofghost/sentrix-platform",
    featured: true,
    isFlagship: true
  },
  {
    id: "civix-reporting",
    title: "CIVIX — Smart Civic Issue Reporting System",
    category: "Full Stack / React",
    description: "Modern citizen engagement application empowering public infrastructure issue reporting with GPS location tagging, complaint lifecycles, and municipal resolution workflows.",
    fullDescription: "CIVIX connects citizens directly with municipal authorities. Users report potholes, broken streetlights, water contamination, and illegal dumping with precise GPS coordinates and photo evidence. Authorities triage complaints through an administrative dashboard with real-time status transitions and verification audits.",
    problemStatement: "Civic issue reporting is traditionally plagued by bureaucratic opacity, lost paperwork, lack of geotagged evidence, and zero feedback loop for concerned citizens.",
    solution: "A transparent, geotagged civic reporting platform featuring instant GPS reverse-geocoding, photo attachment verification, ticket lifecycle state machines, and public progress dashboards.",
    architectureOverview: "React frontend coupled with Supabase cloud database, PostgreSQL row-level security, GPS geolocation APIs, and responsive mobile-first UI.",
    image: "/projects/civic-reporting.jpg",
    techStack: ["React", "JavaScript", "Supabase", "PostgreSQL", "Tailwind CSS", "GPS Geolocation"],
    features: [
      "Precise GPS Geolocation tagging with interactive map coordinates",
      "Ticket lifecycle state machine (Submitted -> Under Review -> In Progress -> Resolved)",
      "Municipal administration dashboard with department assignment",
      "Real-time citizen status tracking and verification image uploads"
    ],
    githubUrl: "https://github.com/Soulofghost/civix",
    featured: true,
    isFlagship: true
  },
  {
    id: "nexa-apix",
    title: "NexaAPIX — AI API Marketplace & Governance Platform",
    category: "AI Platform",
    description: "Full-stack AI API hub providing token usage governance, developer API key issuance, model orchestration endpoints, and interactive testing sandbox.",
    fullDescription: "NexaAPIX is a high-performance developer hub designed to govern and distribute AI microservices. Developers register cryptographic API keys, monitor real-time token consumption, test inference endpoints inside a live sandbox, and enforce granular rate limits.",
    problemStatement: "Organizations integrating third-party and custom AI models struggle with centralized token accounting, unauthorized API key propagation, and lack of unified sandbox testing.",
    solution: "A centralized AI governance platform with cryptographic key issuance, real-time rate limiting, token ledger tracking, and live endpoint playgrounds.",
    architectureOverview: "Svelte & Node.js architecture with JWT token validation, distributed rate limiters, and interactive developer playground.",
    image: "/projects/ai-platform.jpg",
    techStack: ["Svelte", "Node.js", "TypeScript", "REST APIs", "JWT Authentication", "Tailwind CSS"],
    features: [
      "Cryptographic API Key issuance and revocable permissions",
      "Live API Playground for testing inference requests and headers",
      "Token consumption tracking and per-key rate limit governance",
      "Developer documentation and OpenAPI schema integration"
    ],
    githubUrl: "https://github.com/Soulofghost/NexaApiX",
    featured: true,
    isFlagship: true
  },
  {
    id: "neuraldesk",
    title: "NeuralDesk — AI-Powered Semantic Knowledge Platform",
    category: "AI & Systems Platform",
    description: "Enterprise knowledge workspace featuring hybrid vector/BM25 document retrieval, knowledge graph clustering, and grounded citation explorer.",
    fullDescription: "NeuralDesk bridges unstructured organizational documents into an actionable knowledge network. It splits PDFs and markdown notes into semantic chunks, indexes them with dense vector embeddings and lexical BM25 algorithms, and presents responses with verified inline citations to eliminate hallucinations.",
    problemStatement: "Enterprise knowledge bases suffer from keyword search limitations, failing to retrieve conceptually related context while LLMs hallucinate without grounded document citations.",
    solution: "Hybrid retrieval combining BM25 lexical ranking with vector similarity search, coupled with chunk clustering and an interactive citation verification graph.",
    architectureOverview: "FastAPI asynchronous service utilizing SQLite-vector storage, sentence-transformers, and modern React interface.",
    image: "/projects/neuraldesk.jpg",
    techStack: ["FastAPI", "Python", "Vector Indexing", "BM25", "React", "Tailwind CSS"],
    features: [
      "Hybrid lexical BM25 and dense vector similarity retrieval engine",
      "Grounded inline source citations with document chunk preview",
      "Interactive knowledge graph visualizing concept relationships",
      "Lightweight local embedding pipeline requiring zero external GPU SaaS"
    ],
    githubUrl: "https://github.com/Soulofghost/neuraldesk",
    featured: true,
    isFlagship: true
  },
  {
    id: "taskforge",
    title: "TaskForge — Enterprise Project Management SaaS",
    category: "Full Stack / React",
    description: "Enterprise Kanban and sprint planning platform featuring granular role-based access control, immutable audit logs, and sprint analytics.",
    fullDescription: "TaskForge delivers a clean, high-performance project management solution built for engineering teams. It offers drag-and-drop Kanban boards, sprint burn-down metrics, role-based permissions (Admin, Member, Viewer), and comprehensive audit trails.",
    problemStatement: "Existing project tools are either bloated and slow or lack critical enterprise capabilities like immutable audit logging and strict role enforcement.",
    solution: "A responsive, zero-lag Kanban workspace built with decoupled Express controllers, transactional SQLite persistence, and optimistic UI updates.",
    architectureOverview: "Node.js and Express backend with SQLite transactions, paired with a React and Tailwind CSS frontend.",
    image: "/projects/taskforge.jpg",
    techStack: ["Node.js", "Express", "SQLite", "React", "Tailwind CSS", "JWT Auth"],
    features: [
      "Optimistic drag-and-drop Kanban workflow with zero layout shift",
      "Granular Role-Based Access Control (RBAC) with permission matrix",
      "Immutable system audit trail tracking all state transitions",
      "Sprint velocity charts and milestone progress tracking"
    ],
    githubUrl: "https://github.com/Soulofghost/taskforge",
    featured: true
  },
  {
    id: "multisafe",
    title: "MultiSafe — Smart Contract Multisignature Treasury",
    category: "Blockchain & FinTech",
    description: "M-of-N signature treasury wallet for decentralized fund custody, multi-party transaction approvals, and gas-optimized execution.",
    fullDescription: "MultiSafe provides institutional-grade fund custody for Web3 organizations. Fund disbursements require M confirmations out of N authorized signers. Includes contract pause mechanisms, emergency revocations, and gas-efficient execution routines verified by comprehensive Hardhat test suites.",
    problemStatement: "Single-key cryptocurrency wallets represent severe single-points-of-failure for decentralized DAOs and company treasuries.",
    solution: "An audited Solidity multisig contract supporting dynamic signer quorums, multi-step transaction queuing, and an intuitive Web3 dashboard.",
    architectureOverview: "Solidity smart contracts tested with Hardhat, ethers.js integration, and React interface.",
    image: "/projects/multisafe.jpg",
    techStack: ["Solidity", "Hardhat", "Ethers.js", "React", "TypeScript", "Tailwind CSS"],
    features: [
      "M-of-N threshold signature consensus on-chain",
      "Gas-optimized transaction queue and proposal execution",
      "Emergency contract pause and signer rotation protocol",
      "Complete automated unit test suite with 100% branch coverage"
    ],
    githubUrl: "https://github.com/Soulofghost/multisafe",
    featured: true
  },
  {
    id: "logsentinel",
    title: "LogSentinel — SIEM Log Analytics Platform",
    category: "Cybersecurity",
    description: "High-throughput security log ingestion engine detecting brute-force patterns, credential anomalies, and unauthorized privilege escalations.",
    fullDescription: "LogSentinel ingests auth.log, nginx access logs, and syslog streams in real time. It applies rule-based correlation engines and velocity thresholds to flag suspicious IP addresses, repeated SSH failures, and privilege escalations, presenting threat alerts on an interactive radar dashboard.",
    problemStatement: "Security engineers get inundated by hundreds of thousands of raw log lines daily, missing stealthy brute-force sequences and lateral network movements.",
    solution: "A lightweight SIEM processing daemon that streams logs, matches attack signatures, clusters IP subnets, and dispatches automated alerts.",
    architectureOverview: "Python FastAPI log parser with SQLite storage and real-time dashboard UI.",
    image: "/projects/logsentinel.jpg",
    techStack: ["Python", "FastAPI", "SQLite", "Regex Engine", "React", "Tailwind CSS"],
    features: [
      "Real-time syslog and auth.log parsing with regex extraction",
      "Brute-force and velocity anomaly detection algorithms",
      "Suspicious IP geocoding and CIDR subnet reputation scoring",
      "Interactive incident response triage dashboard"
    ],
    githubUrl: "https://github.com/Soulofghost/logsentinel",
    featured: true
  },
  {
    id: "disaster-management",
    title: "Smart Disaster Management System",
    category: "Java / Backend",
    description: "Enterprise Java Spring Boot platform for real-time disaster alerts, emergency SOS dispatching, relief camp mapping, and volunteer coordination.",
    fullDescription: "A comprehensive disaster response solution built with Java Spring Boot and MySQL. Features live weather emergency alerts, interactive relief camp maps, citizen incident reporting, volunteer task assignment, and an admin dashboard to handle critical crises efficiently.",
    problemStatement: "During severe monsoon floods and landslips, emergency agencies, displaced citizens, and volunteers lack a unified platform to map available shelter capacity and dispatch SOS aid.",
    solution: "An enterprise Java Spring Boot backend managing citizen SOS requests, relief camp inventory levels, and volunteer task assignments with transactional integrity.",
    architectureOverview: "Java 17, Spring Boot, Spring Security, Hibernate ORM, and MySQL database with responsive UI.",
    image: "/projects/disaster-management.jpg",
    techStack: ["Java", "Spring Boot", "MySQL", "Thymeleaf", "Leaflet Maps", "Bootstrap / CSS"],
    features: [
      "Emergency SOS Dispatching & Victim Help Request Tracking",
      "Real-time Weather & Disaster Alerts Integration",
      "Interactive Relief Camp Management & Capacity Mapping",
      "Role-Based Access Control for Citizens, Volunteers & Admins"
    ],
    githubUrl: "https://github.com/Soulofghost/disaster-management-system",
    featured: true
  },
  {
    id: "portfolio-x64",
    title: "Alvin MS — Production Engineering Portfolio",
    category: "Full Stack / React",
    description: "Ultra-Premium Personal Portfolio Website for Alvin MS featuring WebGL 3D dimension, real-time GitHub synchronization, and custom desktop interactive cursor.",
    fullDescription: "High-performance developer and entrepreneur portfolio built with Next.js 16, React 19, TypeScript, and Three.js. Includes a persistent section-aware 3D canvas, passive scrolling speed optimizer, live GitHub REST API synchronization across all public repositories, and LinkedIn project sharing.",
    problemStatement: "Developer portfolios often suffer from bloated libraries, static outdated stats, synthetic project metrics, and sluggish scrolling.",
    solution: "Engineered with strict zero-horizontal-overflow safeguards across 9 responsive breakpoints, native-accelerated vertical scrolling, live GitHub metadata synchronization, and accessible keyboard navigation.",
    architectureOverview: "Next.js 16 App Router with Turbopack, Three.js WebGL canvas, Tailwind CSS v4, Framer Motion, and Cloudflare Edge runtimes.",
    image: "/projects/portfolio-preview.jpg",
    techStack: ["Next.js 16", "React 19", "TypeScript", "Three.js", "Tailwind CSS", "GitHub REST API"],
    features: [
      "ALVIN — DIGITAL DIMENSION persistent WebGL 3D background with section awareness",
      "Live automated GitHub REST API synchronization across all public repositories",
      "Custom interactive desktop cursor with requestAnimationFrame interpolation",
      "Zero horizontal scroll overflow across 320px-1920px viewports (100% verified)"
    ],
    githubUrl: "https://github.com/Soulofghost/portfolio_x64",
    liveUrl: "https://alvin-ms-portfolio.alvinms394.workers.dev",
    featured: true,
    isFlagship: true
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: "java-dev",
    title: "Java & Spring Boot Engineering",
    description: "Building robust, scalable, enterprise-grade backend architectures using Java, Spring Boot, Spring Security, Hibernate, and relational databases.",
    icon: "Code",
    highlights: ["Spring Boot Microservices", "RESTful API Architecture", "Database Query Optimization", "Enterprise Security Integration"]
  },
  {
    id: "ai-solutions",
    title: "AI & Distributed Systems",
    description: "Developing intelligent software pipelines, RAG frameworks, telemetry ingestion engines, and high-concurrency event brokers.",
    icon: "Cpu",
    highlights: ["RAG & Dense Retrieval Engines", "Real-Time Telemetry Processing", "FastAPI Python Microservices", "Intelligent Automation Workflows"]
  },
  {
    id: "fullstack-dev",
    title: "Full-Stack Web Platforms",
    description: "End-to-end full stack software development using modern Next.js (App Router), React 19, TypeScript, Node.js, and cloud databases.",
    icon: "Layers",
    highlights: ["Next.js App Router & SSR", "State Management & Optimistic UI", "RBAC & Authentication Systems", "Zero-Jank 60fps Glassmorphic UI"]
  },
  {
    id: "blockchain-fintech",
    title: "Smart Contracts & FinTech Systems",
    description: "Designing and auditing Ethereum virtual machine smart contracts, multisignature treasury wallets, and conditional escrow systems.",
    icon: "Lock",
    highlights: ["Solidity Smart Contracts", "Hardhat Automated Testing", "M-of-N Signature Consensuses", "Gas Optimization Strategies"]
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    period: "2024 - Present",
    role: "Business Development Partner",
    company: "TekLearn",
    description: "Driving strategic partnerships, technology initiatives, educational outreach, and tech event management across engineering colleges.",
    achievements: [
      "Spearheaded educational outreach strategies targeting tech institutes and student developer communities.",
      "Facilitated technology workshops and collaborative coding hackathons for young engineering talent.",
      "Optimized digital engagement pipelines resulting in a 40% growth in participant onboarding."
    ],
    technologies: ["Leadership", "Business Strategy", "Tech Workshops", "Project Management", "Digital Marketing"]
  }
];

export const EDUCATION: EducationItem[] = [
  {
    degree: "B.Tech Computer Science & Artificial Intelligence",
    institution: "MBC College of Engineering & Technology",
    period: "2025–Present",
    location: "Trivandrum, Kerala, India",
    details: [
      "Specializing in Computer Science & Artificial Intelligence.",
      "Active contributor in student tech societies, hackathons, and software engineering initiatives.",
      "Focused on intelligent systems, Java backend enterprise architectures, and distributed computing."
    ]
  }
];

export const CERTIFICATES: CertificateItem[] = [
  {
    id: "java-cert",
    title: "Java Full Stack Development",
    issuer: "Oracle / Coursera Tech",
    date: "2024",
    credentialId: "Verified Academic & Professional Coursework",
    verifyUrl: "https://github.com/Soulofghost",
    badge: "Java Focus"
  },
  {
    id: "ai-cert",
    title: "Artificial Intelligence & Neural Networks",
    issuer: "DeepLearning.AI",
    date: "2024",
    credentialId: "Verified Neural & LLM Specialization",
    verifyUrl: "https://github.com/Soulofghost",
    badge: "AI Focus"
  },
  {
    id: "react-cert",
    title: "Advanced Next.js & React Architecture",
    issuer: "Meta Frontend Specialization",
    date: "2024",
    credentialId: "Verified Modern Full-Stack Web",
    verifyUrl: "https://github.com/Soulofghost",
    badge: "Frontend Focus"
  }
];

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    title: "SENTRIX Platform Engineering",
    category: "Projects",
    date: "2026",
    description: "Designed and engineered SENTRIX civil defense command platform with real-time seismic Peak Ground Acceleration and geodesic dispatch.",
    badge: "Flagship Architecture"
  },
  {
    title: "Public Open Source Engineering Ecosystem",
    category: "Open Source",
    date: "2026",
    description: "Architected and published an extensive open-source engineering ecosystem spanning AI, Full Stack SaaS, FinTech, and Cybersecurity on GitHub (@Soulofghost).",
    badge: "Open Source Ecosystem"
  },
  {
    title: "TekLearn Business Development Milestone",
    category: "Business Development",
    date: "2024 - Present",
    description: "Formed key educational partnerships and tech workshop programs as Business Development Partner.",
    badge: "Growth Leader"
  },
  {
    title: "Smart Disaster Management System",
    category: "Projects",
    date: "2024",
    description: "Built and deployed a full-stack Spring Boot disaster response system with emergency SOS and live map tracking.",
    badge: "Production Software"
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "test-1",
    name: "Rahul Nair",
    role: "Senior Software Architect",
    company: "TechNova Solutions",
    content: "Alvin MS demonstrates an extraordinary understanding of backend Java architecture and modern Next.js frontend design. His ability to build complex, scalable systems with incredible visual flair is unmatched.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "test-2",
    name: "Ananya Sharma",
    role: "Lead Product Designer",
    company: "TekLearn Innovations",
    content: "Working with Alvin at TekLearn has been inspiring. He combines deep technical mastery in AI and Java with entrepreneurial drive and exceptional communication skills.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "test-3",
    name: "Dr. K. V. Mathews",
    role: "Head of Computer Science Department",
    company: "MBCCET Peermade",
    content: "Alvin is a standout Computer Science & AI student. His dedication to building high-impact software like SENTRIX and Smart Disaster Management reflects his commitment to real-world innovation.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "sentrix-sem-architecture",
    title: "Inside SENTRIX: Architecting a Real-Time Structural & Environmental Monitoring Engine",
    excerpt: "How Peak Ground Acceleration (g), Modified Mercalli Intensity, and Haversine geodesic algorithms combine to power automated disaster dispatch.",
    date: "November 2026",
    readTime: "7 min read",
    category: "Distributed Systems & SEM",
    tags: ["FastAPI", "Python", "Algorithms", "Civil Defense"],
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=600",
    content: `Building emergency response platforms demands deterministic execution. In SENTRIX, we decoupled sensor ingestion from incident evaluation to compute radial evacuation zones in under 12 milliseconds.`
  },
  {
    id: "building-disaster-system-spring-boot",
    title: "Architecting a Real-Time Disaster Management System with Java & Spring Boot",
    excerpt: "How I built an enterprise crisis-management application featuring SOS alerts, live relief camp mapping, and role-based volunteer coordination.",
    date: "August 2026",
    readTime: "6 min read",
    category: "Java & Spring Boot",
    tags: ["Java", "Spring Boot", "MySQL", "Architecture"],
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=600",
    content: `Building software for emergency response requires absolute reliability, zero downtime, and real-time data flow. In this article, I break down how the Smart Disaster Management System was architected using Java Spring Boot, MySQL, and geospatial mappings.`
  },
  {
    id: "integrating-ai-in-modern-web-apps",
    title: "Integrating AI Agents into Next.js Applications with Token Governance",
    excerpt: "A practical guide on adding intelligent natural language chatbots and machine learning API endpoints to Next.js full-stack projects.",
    date: "July 2026",
    readTime: "5 min read",
    category: "Artificial Intelligence",
    tags: ["AI", "Next.js", "TypeScript", "LLM"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600",
    content: `Artificial Intelligence is transforming static web apps into dynamic, context-aware assistants. Here is how you can train custom lightweight AI portfolio bots using structured JSON knowledge frames.`
  }
];

export interface StartupItem {
  id: string;
  name: string;
  status: string;
  role: string;
  industry: string;
  description: string;
  focusPoints: string[];
  techStack: string[];
  progressLabel: string;
  progressPercentage: number;
}

export const STARTUPS: StartupItem[] = [
  {
    id: "nexauron",
    name: "NEXAURON",
    status: "In Progress",
    role: "Founder",
    industry: "FinTech • AI • Software",
    description: "NEXAURON is an early-stage technology startup focused on building innovative software solutions and AI-powered products. The vision is to develop secure, scalable, and user-centric platforms that simplify complex digital experiences.",
    focusPoints: [
      "Research & Development",
      "Product Architecture",
      "MVP Development",
      "Technology Validation",
      "UI/UX Design"
    ],
    techStack: [
      "Java", "Spring Boot", "React", "Next.js", "Node.js",
      "TypeScript", "MySQL", "PostgreSQL", "Artificial Intelligence", "Cloud Technologies"
    ],
    progressLabel: "MVP Development in Progress",
    progressPercentage: 68
  },
  {
    id: "helix",
    name: "HELIX",
    status: "In Progress",
    role: "Co-Founder / Founder",
    industry: "Technology • AI • Software Solutions",
    description: "HELIX is an early-stage technology company focused on building modern software solutions, intelligent applications, and scalable digital products. The company is currently in the planning and development phase with a strong emphasis on innovation and future-ready technologies.",
    focusPoints: [
      "Product Planning",
      "Software Development",
      "AI Research",
      "Full Stack Development",
      "Future SaaS Products"
    ],
    techStack: [
      "Java", "Python", "React", "Next.js", "Node.js",
      "Spring Boot", "Artificial Intelligence", "Cloud Computing", "API Development"
    ],
    progressLabel: "Product Development in Progress",
    progressPercentage: 54
  }
];

export const VENTURES_STATS = [
  { label: "Startups Building", value: "2", icon: "Rocket" },
  { label: "Public Repositories", value: "Live Sync", icon: "Laptop" },
  { label: "Engineering Scope", value: "Multi-Domain", icon: "Brain" },
  { label: "Continuous Learning", value: "Always", icon: "BookOpen" },
  { label: "Startup Stage", value: "Early Stage", icon: "Lightbulb" },
  { label: "Vision", value: "Building impactful technology products.", icon: "Globe" }
];

export const FOUNDER_VISION = "I believe great technology begins with solving real problems. My mission is to build software and AI-driven products that create meaningful impact while continuously learning, innovating, and growing as an entrepreneur.";

export const STATUS_BADGES = [
  "🟢 Startup Active",
  "🟢 Product Development",
  "🟢 MVP In Progress",
  "🟢 Open to Collaborations",
  "🟢 Available for Internships"
];
