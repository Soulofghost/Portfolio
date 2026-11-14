# Alvin MS — Engineering Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-149eca?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?logo=tailwindcss)](https://tailwindcss.com/)
[![CI](https://github.com/Soulofghost/portfolio_x64/actions/workflows/ci.yml/badge.svg)](https://github.com/Soulofghost/portfolio_x64/actions/workflows/ci.yml)

A personal portfolio for **Alvin MS**, a Computer Science and Artificial Intelligence student interested in software engineering, full-stack development, AI, backend systems and entrepreneurship.

The site brings together selected projects, ventures, technical skills, experience, GitHub activity and professional contact links in one place.

- **Portfolio:** https://alvinms.vercel.app
- **GitHub:** https://github.com/Soulofghost
- **LinkedIn:** https://www.linkedin.com/in/alvin-ms-b812a836b/
- **Location:** Kerala, India

---

## Table of contents

- [What's in the portfolio](#whats-in-the-portfolio)
- [Interactive experience](#interactive-experience)
- [GitHub integration](#github-integration)
- [LinkedIn integration](#linkedin-integration)
- [Technology stack](#technology-stack)
- [Project structure](#project-structure)
- [Run locally](#run-locally)
- [Environment variables](#environment-variables)
- [Quality checks](#quality-checks)
- [Deployment](#deployment)
- [Security and data notes](#security-and-data-notes)
- [Roadmap](#roadmap)
- [Contact](#contact)

## What's in the portfolio

The homepage is composed from dedicated sections so that each part of the portfolio can be maintained independently:

| Section | Purpose |
|---|---|
| Hero / Engineering Universe | Introduces Alvin and highlights SENTRIX, NexaAPIX, open-source work and the technology stack. |
| About | Background, interests and profile information. |
| Ventures | Startup and product initiatives. |
| Skills | Programming languages, frameworks, databases and tools. |
| Projects | Curated projects with descriptions, technology stacks and repository/demo links. |
| Services | Areas of development and technical work. |
| Experience | Professional and business-development experience. |
| Education | Academic background. |
| Certificates | Certificate information and verification links, where available. |
| GitHub | Public repository catalogue, repository details and profile statistics. |
| LinkedIn | Professional profile link and project/portfolio sharing. |
| Achievements, Testimonials and Blog | Additional profile content. |
| Contact | Contact options and enquiry form. |

## Interactive experience

### Engineering Universe hero

The hero includes an interactive project-node layout for:

- **SENTRIX** — smart disaster-response and civic-technology concept, including the Smart Emergency Module (SEM).
- **NexaAPIX** — AI API marketplace and LLM orchestration concept.
- **Open Source** — links into the GitHub repository catalogue.
- **Tech Matrix** — a shortcut to the skills section.

The hero's visual environment uses layered CSS gradients, SVG grid/circuit artwork, pointer-responsive parallax and interactive project boxes.

### Ambient background

A lightweight Canvas 2D particle network is mounted at the page level. The hero also has its own section background with gradients, SVG connections and motion effects. These are ambient 2D/CSS/SVG effects; the current implementation should not be described as a site-wide Three.js/WebGL 3D scene.

### Navigation and utilities

- Fixed desktop navigation and mobile quick navigation.
- Command palette with `Ctrl + K` / `Cmd + K` shortcut.
- Scroll progress indicator and back-to-top control.
- Resume modal.
- AI chatbot.
- Optional Matrix visual effect.
- Owner maintenance console UI.

## GitHub integration

The portfolio reads public profile and repository information for [`@Soulofghost`](https://github.com/Soulofghost) through a Next.js API route:

`GET /api/github/repos`

The integration currently supports:

- Public profile information: repository count, followers and following.
- Repository details: name, description, language, topics, stars, forks, update time and homepage URL.
- Paginated public repository retrieval (up to five pages of 100 repositories per page).
- Repository search by name and description.
- Category and programming-language filters.
- Sorting by recent activity, stars, forks and name.
- Incremental display of repository cards.
- A manual refresh path using `GET /api/github/repos?refresh=true`.
- Server-side in-memory caching and response caching.

A GitHub token is optional for public repository access, but an authenticated token can provide a higher API rate limit. Set it only as a server-side environment variable.

**Data freshness:** the API route caches responses for about one hour. If GitHub is rate-limited or unavailable, the route can return a bundled fallback snapshot. A fallback snapshot is not a live response and may become outdated; the interface and any downstream use should preserve the `isFallback` state and show the cached/snapshot timestamp accurately.

## LinkedIn integration

LinkedIn features currently include:

- A direct link to Alvin's LinkedIn profile.
- A project/portfolio share modal that generates editable post text.
- Copy-to-clipboard support and a LinkedIn web-share handoff.
- Optional server routes for OAuth and posting:
  - `GET /api/linkedin/auth`
  - `GET /api/linkedin/callback`
  - `GET /api/linkedin/status`
  - `POST /api/linkedin/share`

Direct API publishing requires a LinkedIn Developer App, configured OAuth credentials, the correct redirect URL and the required LinkedIn product/permissions. In particular, member posting permission must be approved and available to the app. Without that access, use the manual share and copy workflow.

The current code does **not** provide an authorized feed-history sync or live follower/connection analytics. Do not display those metrics as live unless a separately approved LinkedIn API integration is implemented and verified.

## Technology stack

| Area | Technologies |
|---|---|
| Framework | Next.js 16 App Router |
| UI | React 19, TypeScript |
| Styling | Tailwind CSS v4, custom CSS |
| Animation | Framer Motion, CSS keyframes |
| Visuals | Canvas 2D, SVG, CSS gradients |
| 3D dependencies available | Three.js, React Three Fiber, Drei (availability in dependencies does not mean every page currently uses WebGL) |
| Icons | React Icons, Lucide React |
| External APIs | GitHub REST API, optional LinkedIn OAuth/API |
| Fonts | Inter, Fira Code via `next/font` |
| Hosting configuration | Next.js-compatible hosting; Netlify configuration is included |

## Project structure

```text
portfolio_x64/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
├── public/
│   ├── profile.jpg
│   ├── hero-poster.jpg
│   └── hero-video.mp4
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── github/repos/route.ts
│   │   │   └── linkedin/
│   │   │       ├── auth/route.ts
│   │   │       ├── callback/route.ts
│   │   │       ├── share/route.ts
│   │   │       └── status/route.ts
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── hero/
│   │   ├── interactive/
│   │   ├── layout/
│   │   └── sections/
│   ├── data/
│   │   ├── aiKnowledge.ts
│   │   └── portfolioData.ts
│   └── utils/
│       ├── emailService.ts
│       ├── githubApi.ts
│       └── variants.ts
├── next.config.ts
├── netlify.toml
├── package.json
└── README.md
```

## Run locally

### Requirements

- Node.js 20 or later.
- npm.
- Git.

### Setup

```bash
git clone https://github.com/Soulofghost/portfolio_x64.git
cd portfolio_x64
npm ci
```

Create a `.env.local` file in the repository root if you want to enable authenticated integrations. See [Environment variables](#environment-variables).

Start the development server:

```bash
npm run dev
```

Open http://localhost:3000.

Build and run the production version:

```bash
npm run build
npm start
```

## Environment variables

All secrets must remain on the server. Never prefix secret values with `NEXT_PUBLIC_` and never commit `.env.local`.

| Variable | Required | Purpose |
|---|---|---|
| `GITHUB_TOKEN` | Optional | Authenticated GitHub API requests and a higher rate limit. |
| `GH_TOKEN` | Optional alternative | Alternate variable accepted by the GitHub API route if `GITHUB_TOKEN` is not set. |
| `LINKEDIN_CLIENT_ID` | Optional | LinkedIn Developer App client ID. |
| `LINKEDIN_CLIENT_SECRET` | Optional | LinkedIn Developer App client secret. |
| `LINKEDIN_REDIRECT_URI` | Recommended for OAuth | Must exactly match the redirect URI configured in the LinkedIn Developer App. |

Example `.env.local`:

```env
GITHUB_TOKEN=your_github_token

LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret
LINKEDIN_REDIRECT_URI=http://localhost:3000/api/linkedin/callback
```

For production, set the corresponding values in the hosting provider's environment-variable settings. The `.gitignore` excludes `.env*` files.

## Quality checks

The repository's CI workflow runs dependency installation, ESLint, TypeScript checking and a Next.js production build on pushes and pull requests targeting `main`.

Run the same checks locally:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

The available npm scripts are:

```bash
npm run dev
npm run lint
npm run build
npm start
```

## Deployment

The project uses the Next.js App Router and can be deployed to a Next.js-compatible host.

### Vercel

1. Import `Soulofghost/portfolio_x64` into Vercel.
2. Keep the framework preset as Next.js.
3. Configure the environment variables required for GitHub and/or LinkedIn integrations.
4. Set the production domain and ensure it matches `metadataBase` in `src/app/layout.tsx` and the LinkedIn OAuth redirect configuration.
5. Deploy and verify the production build, API routes and OAuth callback.

### Netlify

A `netlify.toml` file is included with the Next.js plugin configuration. Connect the repository to Netlify, verify the Next.js plugin is available to the build, set the environment variables and test the deployed API routes.

### GitHub Actions

- `.github/workflows/ci.yml` is the automated CI validation workflow.
- `.github/workflows/deploy.yml` is currently a manually triggered build workflow. Review its steps and hosting requirements before treating it as a complete GitHub Pages deployment pipeline.

## Security and data notes

- Keep GitHub and LinkedIn secrets in server-side environment variables only.
- LinkedIn API publishing is conditional on the permissions granted to the LinkedIn Developer App. Manual sharing remains available as a fallback.
- The maintenance console currently includes a client-side PIN check. A client-side check is not a secure authorization boundary. Do not use it to protect sensitive operations or secrets; replace it with server-side authentication and authorization before relying on the console in production.
- Review OAuth state validation, token lifecycle handling, CSRF protections and access controls before enabling public production publishing or administrative actions.
- GitHub fallback data is a snapshot, not a live API response. Make its status visible and avoid describing fallback figures as live.
- Repository descriptions, project status, certificate issuers and achievement statements should be checked against their source before publication.

## Roadmap

The following are planned enhancements and should only be marked complete after they are implemented and tested:

- A shared, section-aware 3D/WebGL background across the full site, with a graceful CSS fallback.
- A custom desktop cursor with accessible native-cursor behaviour for text and form controls.
- Further performance tuning for low-powered devices and reduced-motion users.
- Verified LinkedIn profile/analytics integration, subject to LinkedIn API access.
- Server-side authentication for the maintenance console.
- Automated deployment verification against the selected production host.

## Contact

- **GitHub:** https://github.com/Soulofghost
- **LinkedIn:** https://www.linkedin.com/in/alvin-ms-b812a836b/
- **Instagram:** https://www.instagram.com/alvxnmz._
- **Email:** alvinms493@gmail.com

---

Built by **Alvin MS** · Kerala, India.
