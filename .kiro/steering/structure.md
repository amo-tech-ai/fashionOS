---
inclusion: always
---

# FashionOS Project Structure

## Current Directory Layout
```
/home/sk25/fx/fashionos/
├── src/                        # Refine admin dashboard app
│   ├── app/                    # Dashboard pages
│   ├── components/             # Admin UI components
│   ├── providers/              # Context providers
│   └── types/                  # TypeScript definitions
├── website/                    # Next.js public website
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout with MantineProvider
│   │   ├── page.tsx            # Homepage
│   │   ├── events/             # Events section
│   │   ├── designers/          # Designers showcase
│   │   ├── sponsors/           # Sponsors page
│   │   ├── tickets/            # Ticketing system
│   │   ├── media/              # Media gallery
│   │   ├── contact/            # Contact forms
│   │   └── about/              # About page
│   ├── components/             # Reusable UI components
│   ├── theme.ts                # Mantine theme configuration
│   └── package.json            # @fashionos/website
├── supabase/                   # Database configuration
│   ├── migrations/             # SQL migration files
│   └── config.toml             # Supabase settings
├── .kiro/                      # Kiro IDE configuration
│   ├── specs/                  # Project specifications
│   └── steering/               # Development guidance
└── [config files]
```

## Naming Conventions
- **React components:** `PascalCase.tsx`
- **Hooks:** `useXxx.ts`
- **Utility functions:** `camelCase.ts`
- **API routes:** `app/api/[resource]/route.ts`
- **Database tables:** `snake_case`
- **Environment variables:** `UPPER_SNAKE_CASE`

## Import Patterns
- **Absolute imports:** Use `@/` root alias for clean imports
- **Shared UI:** Components in `@/components/ui/`
- **Utilities:** Helper functions in `@/lib/utils/`
- **Types:** Centralized in `@/types/`

## File Organization Rules
- Keep related files together (component + styles + tests)
- Use index files for clean exports
- Separate business logic from UI components
- Group by feature, not by file type