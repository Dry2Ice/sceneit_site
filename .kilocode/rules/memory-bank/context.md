# Active Context: SceneIt

## Current State

**Project Status**: Interactive presentation page with expandable sections and founder toggle complete

## Recently Completed

- [x] Base Next.js 16 setup with App Router, TypeScript, Tailwind CSS 4, ESLint
- [x] Full redesign to SceneIt — AAA cinematic presentation
- [x] SceneIt SVG logo as React component
- [x] **Hero**: Large centered logo (#hero anchor), project description, parallax orbs, film strips, staggered CSS animations
- [x] **Header**: Logo animates from hidden (center in hero) to visible in top-left when scrolled past 60% of hero height; glass backdrop on scroll
- [x] **Sections (Riot Reel / Flick Feed / Binge Buddy)**: Click-to-expand strips with smooth height animation. Each shows section name, tagline, short description collapsed; extended description + feature cards expanded
- [x] **Founders**: Two large photo cards (gradient placeholders with initials). Click one to expand details; the other shrinks/fades. Includes bio, details, and stats
- [x] **Registration**: Form with success state animation
- [x] AnimatedSection utility (Intersection Observer for scroll reveals)
- [x] Custom scrollbar, selection color, CSS keyframe animations

## Current Structure

| File | Purpose |
|------|---------|
| `src/app/page.tsx` | Home page — Hero, Sections, Founders, Registration |
| `src/app/layout.tsx` | Root layout + Header + Footer |
| `src/app/globals.css` | Tailwind, animations, scrollbar |
| `src/components/ui/Logo.tsx` | SceneIt SVG logo |
| `src/components/ui/AnimatedSection.tsx` | Scroll-triggered animation wrapper |
| `src/components/sections/Hero.tsx` | Large centered logo, parallax, staggered entrance |
| `src/components/sections/Sections.tsx` | Three expandable section strips (client component) |
| `src/components/sections/Founders.tsx` | Two interactive founder photo cards (client component) |
| `src/components/sections/Registration.tsx` | Registration form |
| `src/components/layout/Header.tsx` | Scroll-aware logo transition (center→top-left) |
| `src/components/layout/Footer.tsx` | Minimal footer |

## Key Interaction Patterns

1. **Logo transition**: Header logo starts at `opacity-0` + center position via translate. On scroll past 60% hero height, transitions to `opacity-100` + top-left with duration-700
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
