# Alvin MS — Engineering Portfolio & Technical Universe

[![Next.js 16](https://img.shields.io/badge/Next.js-16.2+-black.svg?logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.2+-blue.svg?logo=react)](https://react.dev/)
[![TypeScript 5](https://img.shields.io/badge/TypeScript-5.0+-3178C6.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC.svg?logo=tailwind-css)](https://tailwindcss.com/)
[![CI Workflow](https://img.shields.io/badge/CI-Passing-brightgreen.svg)](https://github.com/Soulofghost/portfolio_x64/actions/workflows/ci.yml)
[![Production: Cloudflare Workers](https://img.shields.io/badge/Deployed-Cloudflare_Workers-F38020.svg?logo=cloudflare)](https://alvin-ms-portfolio.alvinms394.workers.dev)

A personal portfolio for **Alvin MS**, a Computer Science and Artificial Intelligence student interested in software engineering, full-stack development, AI, backend systems and entrepreneurship.

The site brings together selected projects, ventures, technical skills, experience, GitHub activity and professional contact links in one place.

- **Production Portfolio:** [https://portfolio.alvinms.workers.dev/](https://portfolio.alvinms.workers.dev/)
- **GitHub:** [https://github.com/Soulofghost](https://github.com/Soulofghost)
- **LinkedIn:** [https://www.linkedin.com/in/alvin-ms-b812a836b/](https://www.linkedin.com/in/alvin-ms-b812a836b/)
- **Email:** [alvinms493@gmail.com](mailto:alvinms493@gmail.com)
- **Location:** Trivandrum, Kerala, India
- **Education:** B.Tech Computer Science & Artificial Intelligence, MBC College of Engineering & Technology (2025–Present)

---

## Table of contents

- [What's in the portfolio](#whats-in-the-portfolio)
- [Interactive experience](#interactive-experience)
- [GitHub synchronization](#github-synchronization)
- [LinkedIn integration](#linkedin-integration)
- [Technology stack](#technology-stack)
- [Featured projects](#featured-projects)
- [Project structure](#project-structure)
- [Run locally](#run-locally)
- [Environment variables](#environment-variables)
- [Quality checks](#quality-checks)
- [Deployment](#deployment)
- [Security and data integrity](#security-and-data-integrity)
- [Contact](#contact)

---

## What's in the portfolio

The homepage is composed from dedicated sections so that each part of the portfolio can be maintained independently:

| Section | Purpose |
|---|---|
| **Hero / Engineering Universe** | Introduces Alvin and highlights SENTRIX, NexaAPIX, open-source work and the technology stack. |
| **About** | Background, interests and verified profile information. |
| **Ventures** | Startup and product initiatives (NEXAURON & HELIX). |
| **Skills** | Programming languages, frameworks, databases and tools. |
| **Projects** | Curated projects with descriptions, technology stacks, case studies, and repository/demo links. |
| **Services** | Areas of development and technical work. |
| **Experience** | Professional and business-development experience (TekLearn). |
| **Education** | Academic background at MBC College of Engineering & Technology (2025–Present). |
| **Certificates** | Certificate information and verified credentials. |
| **GitHub** | Live public repository catalogue, dynamic pagination, and profile statistics. |
| **LinkedIn** | Professional profile link, live share modal, and portfolio announcements. |
| **Achievements & Blog** | Technical updates and milestones. |
| **Contact** | Verified contact enquiry form with mailto fallback to `alvinms394@gmail.com`. |

---

## Interactive experience

### Engineering Universe hero

The hero includes an interactive project-node layout for:

- **SENTRIX** — civil defense Structural & Environmental Monitoring (SEM) command platform computing Peak Ground Acceleration ($g$) and Haversine routing.
- **NexaAPIX** — full-stack AI API marketplace and token governance hub.
- **Open Source** — dynamic link into the GitHub repository ecosystem.
- **Tech Matrix** — quick access to core languages and backend frameworks.

The visual environment uses layered CSS gradients, technical circuit elements, pointer-responsive parallax, and multi-effect project boxes.

### Ambient background & performance

- Multi-layer canvas background with particle networking and ambient lighting.
- Reduced-motion compliant (`prefers-reduced-motion` pauses physics loops).
- Passive scroll listeners throttled using `requestAnimationFrame` with `overflow-x: clip` to eliminate horizontal scroll.

### Navigation and utilities

- Fixed desktop navigation and mobile quick navigation dock.
- Command palette with `Ctrl + K` / `Cmd + K` shortcut.
- Scroll progress indicator and back-to-top control.
- Resume modal with verified education details.
- AI assistant ("AM-AI") loaded with verified background knowledge.
- Owner maintenance console with server-side PIN authentication.

---

## GitHub synchronization

The portfolio synchronizes public repository data directly through the Next.js API route:

`GET /api/github/repos`

Key capabilities:
- **Full Catalogue Retrieval:** Multi-page pagination (`per_page=100`) retrieving all public repositories dynamically.
- **Dynamic Metrics:** Real repository count (86+ repos), followers, following, stars, forks, and language classifications.
- **Filtering & Search:** Real-time query search, language filters, and category tags.
- **Multi-Level Caching:** Server-side in-memory 1-hour cache with stale-while-revalidate and on-demand force refresh (`?refresh=true`).
- **Verified Offline Snapshot:** Authentic snapshot with zero synthetic metrics in case of GitHub rate limits.

---

## LinkedIn integration

- **1-Click Project Announcement Generator:** Prepares pre-formatted announcement copy with project title, architecture summary, repository link, and relevant tags.
- **Direct Web Share & Official OAuth 2.0:** Secure OAuth flow (`/api/linkedin/auth`, `/api/linkedin/callback`, `/api/linkedin/share`).
- **CSRF Protection:** Cryptographically secure `state` parameter generated with `crypto.randomUUID()` and validated via HTTP-only cookie.
- **Profile Showcase:** Displays public profile status, headline, and follow action.

---

## Featured projects

1. ⭐ **SENTRIX — Smart Disaster Response & SEM Platform**: Civil defense command system computing Peak Ground Acceleration ($g$), Modified Mercalli Intensity (MMI), dynamic radial evacuation geo-fences, and Haversine geodesic emergency unit transit routing.
2. ⭐ **CIVIX — Smart Civic Issue Reporting System**: Citizen engagement platform with GPS geolocation, photo verification, and municipal resolution workflows.
3. ⭐ **NexaAPIX — AI API Marketplace & Governance Platform**: Token consumption tracking, cryptographic API key management, and developer playground.
4. **NeuralDesk**: Enterprise hybrid vector & BM25 retrieval platform with grounded citations.
5. **TaskForge**: Enterprise project management SaaS with RBAC and immutable audit trails.
6. **MultiSafe**: Solidity smart contract M-of-N multisig treasury wallet.
7. **LogSentinel**: SIEM log analytics platform detecting brute-force attacks and privilege anomalies.
8. **portfolio_x64**: Next.js 16 engineering portfolio with live Cloudflare Workers deployment at [alvin-ms-portfolio.alvinms394.workers.dev](https://alvin-ms-portfolio.alvinms394.workers.dev).

---

## Technology stack

| Layer | Technologies |
|---|---|
| **Framework** | Next.js 16 (App Router), React 19, TypeScript 5 |
| **Styling** | Tailwind CSS v4, PostCSS, Responsive Fluid Layouts |
| **Motion & UX** | Framer Motion, HTML5 Canvas Particle Physics |
| **Icons & Badges** | React Icons, Lucide Icons |
| **Backend & APIs** | Next.js Serverless Routes, GitHub REST API, LinkedIn OAuth 2.0 |
| **Deployment** | Cloudflare Workers (Production: `https://alvin-ms-portfolio.alvinms394.workers.dev`), Vercel, Docker |

---

## Run locally

### Requirements

- Node.js 20 or later.
- npm.
- Git.

### Setup

```bash
git clone https://github.com/Soulofghost/portfolio_x64.git
cd Portfolio
npm ci
```

Create a `.env.local` file in the repository root:

```env
# GitHub API Token (Optional - Increases rate limit from 60 to 5,000 req/hour)
GITHUB_TOKEN=ghp_your_personal_access_token_here

# LinkedIn Official API (Optional - For automated OAuth publishing)
LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret
LINKEDIN_REDIRECT_URI=https://alvin-ms-portfolio.alvinms394.workers.dev/api/linkedin/callback

# Admin Security PIN (Server-side verified)
ADMIN_PIN=your_secret_admin_pin

# Optional Resend API key for automated contact form delivery
RESEND_API_KEY=re_your_api_key_here
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Build and run the production version:

```bash
npm run build
npm start
```

---

## Quality checks

Run the local validation checks before committing:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

---

## Security and data integrity

- **Zero Fabricated Metrics:** All repository counts, stars, and follower metrics are synchronized via the official GitHub REST API with real dynamic pagination.
- **Server-Side PIN Authentication:** The maintenance console authenticates against `/api/admin/auth` with rate limiting and secure HTTP status codes. No hardcoded credentials exist in client bundles.
- **OAuth CSRF State Cookies:** LinkedIn OAuth requests require a cryptographically randomized `state` parameter persisted in an `httpOnly`, `sameSite=lax` cookie and validated upon callback.
- **Transparent Contact Delivery:** The contact route (`/api/contact`) verifies delivery credentials and provides a direct, pre-filled `mailto:alvinms394@gmail.com` fallback if external email services are not configured.

---

## Contact

- **Name:** Alvin MS
- **Location:** Trivandrum, Kerala, India
- **Education:** MBC College of Engineering & Technology (2025–Present)
- **Email:** [alvinms493@gmail.com](mailto:alvinms493@gmail.com)
- **Portfolio:** [https://portfolio.alvinms.workers.dev/](https://portfolio.alvinms.workers.dev/)
- **GitHub:** [https://github.com/Soulofghost](https://github.com/Soulofghost)
- **LinkedIn:** [https://www.linkedin.com/in/alvin-ms-b812a836b/](https://www.linkedin.com/in/alvin-ms-b812a836b/)
- **Instagram:** [https://www.instagram.com/alvxnmz._](https://www.instagram.com/alvxnmz._)

---

Built with pride by **Alvin MS** · Trivandrum, Kerala, India.
