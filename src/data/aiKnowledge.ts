import { PERSONAL_INFO, PROJECTS, SKILL_CATEGORIES, EXPERIENCES, EDUCATION, CERTIFICATES } from '@/data/portfolioData';

export const AI_KNOWLEDGE = `
System Identity:
You are "AM-AI", the personal AI assistant for Alvin MS's portfolio. You respond in a professional, ultra-friendly, tech-savvy, and sleek tone.

Profile of Alvin MS:
- Name: ${PERSONAL_INFO.name}
- Title: ${PERSONAL_INFO.title}
- Roles: ${PERSONAL_INFO.roles.join(', ')}
- Tagline: "${PERSONAL_INFO.tagline}"
- Bio: ${PERSONAL_INFO.bio}
- Location: ${PERSONAL_INFO.location}
- Availability: ${PERSONAL_INFO.availability}
- Email: ${PERSONAL_INFO.email}
- GitHub: ${PERSONAL_INFO.githubUrl} (Username: @${PERSONAL_INFO.githubUsername})
- LinkedIn: ${PERSONAL_INFO.linkedinUrl}
- Instagram: ${PERSONAL_INFO.instagramUrl}

Top Engineering Skills:
- Java & Spring Boot: Enterprise backend architectures, Spring Security, Hibernate, Microservices, REST APIs, high concurrency.
- Artificial Intelligence & Machine Learning: FastAPI, Python, RAG pipelines, dense vector retrieval, LLM orchestration, model governance.
- Full Stack Web: Next.js (App Router), React 19, TypeScript, Tailwind CSS v4, Framer Motion, Node.js.
- Databases & Systems: PostgreSQL, MySQL, SQLite with WAL mode, Supabase, Docker, Linux administration.
- Blockchain & FinTech: Solidity smart contracts, Hardhat, Ethers.js, M-of-N multisignature treasuries, escrow protocols.

Key Featured Projects:
1. SENTRIX: Smart Disaster Response & SEM Monitoring Platform. Structural & Environmental Monitoring command platform computing Peak Ground Acceleration (PGA in g), Modified Mercalli Intensity, radial evacuation geo-fencing, and Haversine first-responder transit routing.
2. CIVIX: Smart Civic Issue Reporting System. Modern citizen engagement application with GPS geolocation tagging, complaint lifecycles, and municipal resolution workflows.
3. NexaAPIX: AI API Marketplace & Governance Platform. Token consumption tracking, cryptographic API key management, and developer sandbox.
4. NeuralDesk: AI-Powered Semantic Knowledge Platform. Hybrid vector & lexical BM25 retrieval engine with grounded citations.
5. TaskForge: Enterprise Project Management SaaS. Zero-lag Kanban workspace with granular RBAC and immutable audit trails.
6. MultiSafe: Smart Contract Multisignature Treasury. M-of-N consensus protocol with gas-optimized execution.
7. LogSentinel: SIEM Log Analytics Platform. High-throughput real-time security log parser and brute-force threat detector.
8. Smart Disaster Management: Java Spring Boot & MySQL emergency SOS and shelter mapping platform.

Startups & Ventures:
- NEXAURON: FinTech & AI software startup founded by Alvin MS, focusing on high-performance digital tools (MVP in development).
- HELIX: Co-founded early-stage technology startup focusing on modern software solutions, intelligent applications, and scalable SaaS.

Experience & Leadership:
- Business Development Partner at TekLearn (2024 - Present): Managing educational tech outreach, strategic partnerships, student workshops, and growth pipelines.
- B.Tech in Computer Science & Artificial Intelligence at MBC College of Engineering & Technology (2025–Present).

Instructions:
- Keep answers informative, polite, concise (2-4 sentences max), and enthusiastic.
- Highlight Alvin's passion for software engineering, AI, Java development, and startup collaborations.
- If asked how to hire or contact Alvin, suggest sending a message through the Contact Form or emailing ${PERSONAL_INFO.email}.
`;

export function generateAiResponse(userMessage: string): string {
  const query = userMessage.toLowerCase();

  if (query.includes('sentrix') || query.includes('sem') || query.includes('emergency') || query.includes('seismic')) {
    return `SENTRIX is Alvin MS's flagship civil defense & Structural & Environmental Monitoring (SEM) platform. It ingests triaxial accelerometer telemetry to compute Peak Ground Acceleration (PGA), evaluates hydraulic dam surge thresholds, and optimizes rescue dispatch via Haversine geodesic routing!`;
  }

  if (query.includes('civix') || query.includes('civic') || query.includes('infrastructure')) {
    return `CIVIX is a citizen engagement platform built by Alvin MS that empowers citizens to report public infrastructure issues with precise GPS geotagging, photo proof, and automated municipal resolution lifecycles.`;
  }

  if (query.includes('nexa') || query.includes('api') || query.includes('marketplace')) {
    return `NexaAPIX is a full-stack AI API marketplace and governance hub engineered for token consumption metering, cryptographic API key issuance, and live endpoint sandbox testing.`;
  }

  if (query.includes('who is') || query.includes('about') || query.includes('background') || query.includes('bio')) {
    return `Alvin MS is a Computer Science & AI student, Java Developer, Full Stack Engineer, and Entrepreneur based in Trivandrum, Kerala, India. He engineers high-reliability distributed systems, AI platforms, and enterprise software!`;
  }

  if (query.includes('skill') || query.includes('java') || query.includes('stack') || query.includes('technolog')) {
    return `Alvin specializes in Java Spring Boot backend engineering, Python & FastAPI for AI systems, Next.js / React 19 for modern UI/UX, and relational/vector storage systems including PostgreSQL, MySQL, and SQLite (WAL mode).`;
  }

  if (query.includes('project') || query.includes('work') || query.includes('portfolio')) {
    return `Alvin has engineered an extensive open-source software ecosystem featuring flagship platforms like SENTRIX (Civil Defense SEM), CIVIX (Civic Geotagging), NexaAPIX (AI Governance), NeuralDesk (Semantic RAG), and MultiSafe (Multisig Treasury). Check out the Projects section!`;
  }

  if (query.includes('startup') || query.includes('venture') || query.includes('nexauron') || query.includes('helix') || query.includes('entrepreneur')) {
    return `Alvin is currently building two technology startups: NEXAURON (FinTech & AI products) and HELIX (intelligent digital solutions & SaaS). Both are currently in active development.`;
  }

  if (query.includes('hire') || query.includes('contact') || query.includes('email') || query.includes('freelance') || query.includes('intern')) {
    return `Alvin is available for Software Engineering Internships, Full Stack Roles, Freelance Projects, and Startup Collaborations! You can reach him at ${PERSONAL_INFO.email} or use the Contact section on this page.`;
  }

  if (query.includes('education') || query.includes('college') || query.includes('study') || query.includes('degree')) {
    return `Alvin is pursuing his B.Tech in Computer Science & Artificial Intelligence at MBC College of Engineering & Technology (2025–Present).`;
  }

  if (query.includes('experience') || query.includes('teklearn') || query.includes('job')) {
    return `Alvin serves as Business Development Partner at TekLearn, where he leads tech outreach, organizes developer workshops, and drives community partnerships across engineering colleges.`;
  }

  if (query.includes('resume') || query.includes('cv')) {
    return `You can view and download Alvin's official resume by clicking "Download Resume" in the Hero section or pressing Ctrl+K to open the Quick Access Command Palette!`;
  }

  return `Thanks for asking! Alvin MS is a Computer Science & AI engineer specializing in Java Spring Boot, Next.js, and Distributed Systems. Feel free to explore the interactive sections or reach out via ${PERSONAL_INFO.email}!`;
}
