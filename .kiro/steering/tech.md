---
inclusion: always
---

# FashionOS Technology Stack

## Frontend Architecture
- **Frontend (Admin):** Refine + Mantine v5.x + Vite
- **Frontend (Public):** Next.js 15.3.3 + Mantine v8.1.2 + App Router
- **UI Components:** Mantine Core with fashion-focused theming
- **Icons:** Tabler Icons React v3.34.0

## Backend & Database
- **Backend:** Supabase (PostgreSQL + Auth + Real-time)
- **Database:** PostgreSQL with Row Level Security (RLS)
- **Authentication:** Supabase Auth with JWT tokens
- **File Storage:** Supabase Storage for media assets

## AI & Automation
- **AI Orchestration:** LangGraph, CopilotKit, CrewAI flows
- **Automations:** n8n for webhooks & data sync
- **AI Models:** OpenAI GPT integration for recommendations

## Development Tools
- **Package Manager:** pnpm (required - do not use npm/yarn)
- **Build System:** Next.js 15 with App Router
- **TypeScript:** v5.8.3 with strict mode enabled
- **Styling:** PostCSS with `postcss-preset-mantine`
- **State Management:** React Query + Zustand

## Testing & Quality
- **Unit Testing:** Jest with React Testing Library
- **E2E Testing:** Playwright
- **Linting:** ESLint with Next.js config
- **Formatting:** Prettier with consistent rules

## Deployment & CI/CD
- **Hosting:** Vercel for Next.js website
- **Database:** Supabase cloud
- **CI/CD:** GitHub Actions
- **Monitoring:** Built-in Vercel analytics