# Alvin MS — Ultra-Premium Engineering Portfolio & Systems Showcase

[![Next.js 16](https://img.shields.io/badge/Next.js-16.2+-black.svg?logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.2+-blue.svg?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC.svg?logo=tailwind-css)](https://tailwindcss.com/)
[![CI Workflow](https://img.shields.io/badge/CI-Passing-brightgreen.svg)]()
[![Production: Vercel](https://img.shields.io/badge/Deployed-Vercel-black.svg?logo=vercel)](https://alvinms.vercel.app)

> **Official software engineering portfolio of Alvin MS**  
> Computer Science & Artificial Intelligence Student • Java Enterprise Developer • Full Stack Engineer • Founder @ NEXAURON & HELIX.  
> **GitHub:** [@Soulofghost](https://github.com/Soulofghost) | **LinkedIn:** [alvin-ms-b812a836b](https://www.linkedin.com/in/alvin-ms-b812a836b/)

---

## 🌟 Key Architecture & Upgrades

### 1. Fast Website Experience (60+ FPS & Instant Scrolling)
- **Zero Scroll Jank**: Passive scroll listeners throttled using `requestAnimationFrame`.
- **Scroll Progress Indicator**: Top-docked ambient gradient bar tracking viewport reading progression.
- **Fast Back-to-Top**: Smooth scroll-to-top floating button appearing at 400px scroll threshold.
- **Header Offset Alignment**: `scroll-padding-top: 5.5rem` prevents fixed navigation from obscuring section headings.
- **Reduced-Motion Compliant**: Auto-detects `prefers-reduced-motion` and pauses particle loops and transforms.
- **Dynamic Code-Splitting**: Below-the-fold components and heavy modals (Command Palette, Chatbot, Resume Modal, Admin Dashboard, Particles) are split via `next/dynamic`.

### 2. Advanced Quick Access System (Ctrl+K / ⌘K)
- **Universal Keyboard Navigation**: Always-active keydown listener at page level.
  - `Ctrl + K` / `Cmd + K`: Toggle Command Palette from any position.
  - `Escape`: Close open palettes and drawers.
  - `Arrow Up` / `Arrow Down`: Navigate action list with auto-scroll focus.
  - `Enter`: Execute highlighted action immediately.
  - `Home`: Jump to top of portfolio.
  - `End`: Jump to contact section.
- **Mobile Quick Navigation Bar**: 6-item glassmorphic dock (`Home`, `Projects`, `GitHub`, `About`, `Contact`, `More`) with slide-up quick actions drawer.
- **Instant Search**: Search through 18+ actions, featured projects, sections, and external profiles.

### 3. Automated GitHub Repository Synchronization
- **Endpoint**: `/api/github/repos` fetching all public repositories for `@Soulofghost`.
- **Full Catalogue Retrieval**: Automatic pagination (100 per page) retrieving **all public repositories** (42+ repos) with zero synthetic metrics.
- **Multi-Level Caching**: Server-side 1-hour cache with stale-while-revalidate and on-demand refresh (`?refresh=true`).
- **Comprehensive Filtering**: Real-time search by repository name/description, language filter, category tags (AI, Machine Learning, Full Stack, Java, Blockchain, Security), and multi-criteria sorting (Recently Updated, Most Stars, Forks, Alphabetical).
- **Verified Offline Snapshot**: Gracefully falls back to authentic repository data if GitHub rate limits occur.

### 4. LinkedIn Network & Project Sharing
- **1-Click Project Announcement Generator**: Individual share button on every project card and GitHub repository card.
- **Pre-Formatted Announcement Copy**: Prepares professional LinkedIn post text with project title, problem/solution summary, GitHub URL, live demo URL, and tailored technology hashtags.
- **Live Preview & Editing**: Review and tweak post text before sharing.
- **Direct Web Share & Official OAuth API**: Supports standard LinkedIn Web Share intent and server-side OAuth 2.0 flow (`/api/linkedin/auth`, `/api/linkedin/callback`, `/api/linkedin/share`).
- **LinkedIn Profile Showcase**: Profile card featuring headline, follower action, and one-click portfolio sharing.

### 5. Automated Project Showcase & SENTRIX Case Study
- **Featured Flagships**:
  - ⭐ **SENTRIX — Smart Disaster Response & SEM Platform**: Civil defense command system computing Peak Ground Acceleration ($g$), Modified Mercalli Intensity (MMI), dynamic radial evacuation geo-fences, and Haversine geodesic emergency unit transit routing.
  - ⭐ **CIVIX — Smart Civic Issue Reporting System**: Citizen engagement platform with GPS geolocation, photo verification, and municipal resolution workflows.
  - ⭐ **NexaAPIX — AI API Marketplace & Governance Platform**: Token consumption tracking, cryptographic API key management, and developer playground.
  - **NeuralDesk**: Enterprise hybrid vector & BM25 retrieval platform with grounded citations.
  - **TaskForge**: Enterprise project management SaaS with RBAC and immutable audit trails.
  - **MultiSafe**: Solidity smart contract M-of-N multisig treasury wallet.
  - **LogSentinel**: SIEM log analytics platform detecting brute-force attacks and privilege anomalies.
- **Case Study Modal**: Tabbed deep dive covering Executive Overview, The Problem, Engineering Solution, System Architecture, and Core Features.

### 6. Private Automation & Maintenance Console
- **Owner-Protected Admin Area**: Accessible via Command Palette or secret footer console trigger, protected by security PIN (`alvin2026`).
- **Sync Diagnostics**: View live GitHub sync status, rate limit quota remaining, total repositories indexed, and trigger force syncs.
- **LinkedIn Hub**: Check OAuth connection state and test generated project announcements.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Framework** | Next.js 16 (App Router), React 19, TypeScript 5 |
| **Styling** | Tailwind CSS v4, PostCSS, Responsive Fluid Layouts |
| **Motion & UX** | Framer Motion, Canvas Particle Physics |
| **Icons & Badges** | React Icons, Lucide Icons |
| **Backend & APIs** | Next.js Serverless Routes, GitHub REST API, LinkedIn OAuth 2.0 |
| **Deployment** | Vercel (Production: `https://alvinms.vercel.app`), Netlify, Docker |

---

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory:

```env
# GitHub API Token (Optional - Increases rate limit from 60 to 5,000 req/hour)
GITHUB_TOKEN=ghp_your_personal_access_token_here

# LinkedIn Official API (Optional - For automated OAuth publishing)
LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret
LINKEDIN_REDIRECT_URI=https://alvinms.vercel.app/api/linkedin/callback

# Admin Security PIN (Optional - Defaults to alvin2026)
ADMIN_SECRET_PIN=alvin2026
```

---

## 🚀 Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Soulofghost/portfolio_x64.git
   cd portfolio_x64
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Run production build**:
   ```bash
   npm run build
   ```

---

## 🚢 Deployment

### Vercel (Recommended)
This repository is configured out-of-the-box for zero-configuration Vercel deployment:
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Environment Variables**: Add `GITHUB_TOKEN` in your Vercel project settings for high-throughput GitHub sync.

### Netlify
Configured via `netlify.toml` with `@netlify/plugin-nextjs`.

---

## 📄 License

MIT License © 2026 Alvin MS (@Soulofghost).
