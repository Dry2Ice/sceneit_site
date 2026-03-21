# Active Context: SceneIt

## Current State

**Project Status**: Interactive presentation page with expandable sections and founder toggle complete

## Recently Completed

- [x] Base Next.js 16 setup with App Router, TypeScript, Tailwind CSS 4, ESLint
- [x] Full redesign to SceneIt — AAA cinematic presentation
- [x] SceneIt SVG logo as React component (amber-to-violet gradient)
- [x] **Hero**: Large centered logo (#hero anchor), project description, parallax orbs, film strips, staggered CSS animations
- [x] **Header**: Fixed header with logo + nav; glass backdrop on scroll past 50% of viewport
- [x] **Sections (Riot Reel / Flick Feed / Binge Buddy)**: Click-to-expand strips with smooth height animation. Each shows section name, tagline, short description collapsed; extended description + feature cards expanded
- [x] **Founders**: Two large photo cards (gradient placeholders with initials). Click one to expand details; the other shrinks/fades. Includes bio, details, and stats
- [x] **Registration**: Form with success state animation
- [x] AnimatedSection utility (Intersection Observer for scroll reveals)
- [x] Custom scrollbar, selection color, CSS keyframe animations
- [x] **Section pages**: /forums (Riot Reel), /news (Flick Feed), /quizzes (Binge Buddy) — each with centered SVG logo, section-themed gradient background, ambient glow, tagline, description, and "Coming Soon" badge
- [x] **Navigation**: Header and Footer updated with `<Link>` to section pages; Sections.tsx "Enter" links route to dedicated pages

## Current Structure

| File | Purpose |
|------|---------|
| `src/app/page.tsx` | Home page — Hero, Sections, Founders, Registration |
| `src/app/forums/page.tsx` | Riot Reel main — weekly highlights of discussions & polls |
| `src/app/forums/discussions/page.tsx` | Discussions list with search, sort (popular/newest/discussed), category filters |
| `src/app/forums/votes/page.tsx` | Polls list with search, sort (popular/newest/most-voted), category filters |
| `src/app/news/page.tsx` | Flick Feed section page — rose gradient, centered SVG logo |
| `src/app/quizzes/page.tsx` | Binge Buddy section page — amber gradient, centered SVG logo |
| `src/app/layout.tsx` | Root layout + Header + Footer |
| `src/app/globals.css` | Tailwind, animations, scrollbar |
| `src/data/forums.ts` | Mock data for discussions and polls with helper functions |
| `src/components/ui/Logo.tsx` | SceneIt SVG logo with amber→violet gradient |
| `src/components/ui/AnimatedSection.tsx` | Scroll-triggered animation wrapper |
| `src/components/sections/Hero.tsx` | Large centered logo (colorful gradient), parallax, staggered entrance |
| `src/components/sections/Sections.tsx` | Three expandable section strips with links to dedicated pages |
| `src/components/sections/Founders.tsx` | Two interactive founder photo cards (client component) |
| `src/components/sections/Registration.tsx` | Registration form |
| `src/components/layout/Header.tsx` | Fixed header with logo + nav; glass backdrop on scroll |
| `src/components/layout/Footer.tsx` | Footer with links to section pages |

## Key Interaction Patterns

1. **Header scroll**: Header background transitions from transparent to glass (backdrop-blur + semi-transparent bg) when scrolled past 50% viewport height
2. **Section expand**: Each `SectionBlock` manages `expanded` state. Click toggles `max-h-[600px]`/`max-h-0` with `ease-[cubic-bezier(0.4,0,0.2,1)]` and opacity
3. **Founder toggle**: `activeFounder` state tracks which card is expanded. Active card gets `max-h-[400px]`; other card gets `opacity-50 scale-[0.97]`

## Design System

- Base: #07070a, Accent: amber-500 (#d4a853)
- Riot Reel: violet (#2d1b69 → #a78bfa)
- Flick Feed: rose (#4a1528 → #fb7185)
- Binge Buddy: amber (#451a03 → #fbbf24)
- Typography: Geist Sans
- Animations: CSS keyframes + Intersection Observer + mouse parallax

## Session History

| Date | Changes |
|------|---------|
| Initial | Template created |
| 2026-03-20 | Built КиноМир main page |
| 2026-03-20 | Full redesign to SceneIt — AAA cinematic, SVG logos, animations |
| 2026-03-20 | Large hero logo, scroll-transition header, expandable sections, interactive founder toggle |
| 2026-03-21 | Created section pages (/forums, /news, /quizzes) with centered SVG logos; updated navigation to use `<Link>` components |
| 2026-03-21 | Removed scroll-driven logo animation from Header; added amber→violet gradient fill to Logo component |
| 2026-03-21 | Added Riot Reel forums: /forums/discussions and /forums/votes with search, sort filters, category chips; /forums shows weekly highlights |
