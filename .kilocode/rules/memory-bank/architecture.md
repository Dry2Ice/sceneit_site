# System Patterns: КиноМир

## Architecture Overview

```
src/
├── app/                         # Next.js App Router
│   ├── layout.tsx               # Root layout + Header + Footer
│   ├── page.tsx                 # Home page (assembles sections)
│   ├── globals.css              # Tailwind imports + global styles
│   └── favicon.ico              # Site icon
├── components/
│   ├── layout/
│   │   ├── Header.tsx           # Fixed header with mobile nav (client)
│   │   └── Footer.tsx           # Site footer
│   └── sections/
│       ├── Hero.tsx             # Hero/presentation section
│       ├── Sections.tsx         # Three colored section strips
│       ├── Founders.tsx         # Founders team cards
│       └── Registration.tsx     # Registration form (client)
```

## Key Design Patterns

### 1. App Router Pattern

Uses Next.js App Router with file-based routing:
```
src/app/
├── page.tsx           # Route: /
```

### 2. Server vs Client Components

- Server Components by default (Hero, Sections, Founders, Footer)
- Client Components marked with `"use client"` when interactivity is needed (Header, Registration)

### 3. Section-Based Page Composition

The home page is composed of independently-built sections:
```tsx
// src/app/page.tsx
<main>
  <Hero />
  <Sections />
  <Founders />
  <Registration />
</main>
```

### 4. Component Organization

```
src/components/
├── ui/                # (add when needed)
├── layout/            # Header, Footer
├── sections/          # Page sections (Hero, Sections, Founders, Registration)
└── forms/             # (add when needed)
```

## Styling Conventions

### Tailwind CSS v4
- Utility classes directly on elements
- Dark palette: neutral-950/900/800
- Accent: amber-500
- Section colors: indigo-600, red-700, amber-600
- `@theme` block in globals.css for font configuration

### Color System
| Element | Color |
|---------|-------|
| Background | neutral-950 |
| Cards/Surfaces | neutral-900/800 |
| Primary accent | amber-500 |
| Forum section | indigo-600 → indigo-800 |
| Reviews section | red-700 → rose-900 |
| Quizzes section | amber-600 → yellow-700 |
| Text primary | white |
| Text secondary | neutral-400 |

## File Naming Conventions

- Components: PascalCase (`Hero.tsx`, `Header.tsx`)
- Utilities: camelCase (`utils.ts`)
- Pages/Routes: lowercase (`page.tsx`, `layout.tsx`)
- Directories: lowercase (`components/`, `layout/`, `sections/`)
