---
inclusion: fileMatch
fileMatchPattern: "**/*.tsx"
---

# React Component Conventions

## Client Components
- **Always start with `'use client';`** if you use hooks or browser APIs
- Required for: useState, useEffect, event handlers, browser-only APIs
- Server components by default in Next.js App Router

## Folder Structure
```
components/
├── layout/          # Header, Footer, Navigation
├── ui/              # Reusable UI primitives
├── sections/        # Page sections (Hero, Features)
├── forms/           # Form components
└── features/        # Feature-specific components
```

## Styling Guidelines
- **Prefer Mantine's `sx` prop** or `styles` object over inline CSS
- Use Mantine theme tokens for consistency
- Fashion-focused color palette: `theme.colors.fashion`
- Responsive design with Mantine breakpoints

## Accessibility Standards
- **Always add `alt` to `<Image>`** components
- Use semantic HTML (`<header>`, `<main>`, `<footer>`)
- Proper ARIA labels for interactive elements
- Keyboard navigation support
- Color contrast compliance (WCAG AA)

## Component Structure
```tsx
'use client'; // If using hooks/browser APIs

import { ComponentProps } from 'react';
import { Box, Title } from '@mantine/core';

interface MyComponentProps {
  title: string;
  children?: React.ReactNode;
}

export function MyComponent({ title, children }: MyComponentProps) {
  return (
    <Box>
      <Title order={2}>{title}</Title>
      {children}
    </Box>
  );
}
```

## Testing
- Place tests alongside components in `__tests__/`
- Use `.test.tsx` extension
- Test user interactions, not implementation details