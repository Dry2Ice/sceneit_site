# Active Context: SceneIt

## Current State

**Project Status**: AAA-quality cinematic presentation page complete

SceneIt (wordplay on "scene" + "seen it") is a cinema community platform with three main sections: Riot Reel (forum & voting), Flick Feed (reviews & news), and Binge Buddy (quizzes & tests). The main page serves as a cinematic presentation/landing page with registration.

## Recently Completed

- [x] Base Next.js 16 setup with App Router
- [x] TypeScript configuration with strict mode
- [x] Tailwind CSS 4 integration
- [x] ESLint configuration
- [x] Full redesign to cinematic AAA presentation quality
- [x] SceneIt SVG logo as React component
- [x] Hero section with parallax mouse-tracking orbs, film strip borders, scan lines, staggered CSS animations
- [x] Three section strips (Riot Reel / Flick Feed / Binge Buddy) with unique gradients, accent colors, dot-grid patterns
- [x] AnimatedSection utility (Intersection Observer for scroll-triggered reveals)
- [x] Founders section with hover-enhanced cards
- [x] Registration form with success state
- [x] Header with scroll-aware blur backdrop
- [x] Custom scrollbar, selection color, smooth scrolling
- [x] Memory bank updated

## Current Structure

| File/Directory | Purpose | Status |
|----------------|---------|--------|
| `src/app/page.tsx` | Home page — assembles all sections | ✅ Ready |
| `src/app/layout.tsx` | Root layout + Header + Footer | ✅ Ready |
| `src/app/globals.css` | Tailwind, custom scrollbar, keyframe animations | ✅ Ready |
| `src/components/ui/Logo.tsx` | SceneIt SVG logo | ✅ Ready |
| `src/components/ui/AnimatedSection.tsx` | Intersection Observer scroll animation wrapper | ✅ Ready |
| `src/components/sections/Hero.tsx` | Cinematic hero with parallax + staggered animations | ✅ Ready |
| `src/components/sections/Sections.tsx` | Three colored section strips (Riot Reel, Flick Feed, Binge Buddy) | ✅ Ready |
| `src/components/sections/Founders.tsx` | Founders team cards | ✅ Ready |
| `src/components/sections/Registration.tsx` | Registration form (client component) | ✅ Ready |
| `src/components/layout/Header.tsx` | Fixed header with scroll-aware glass effect | ✅ Ready |
| `src/components/layout/Footer.tsx` | Minimal site footer | ✅ Ready |

## Design System

- **Base**: #07070a (near-black)
- **Accent**: amber-500 (#d4a853) / gold tones
- **Riot Reel**: violet/indigo gradients (#2d1b69)
- **Flick Feed**: rose/deep red gradients (#4a1528)
- **Binge Buddy**: amber/orange gradients (#451a03)
- **Typography**: Geist Sans
- **Animations**: CSS keyframes (heroEntrance), Intersection Observer (AnimatedSection), mouse parallax (Hero orbs)
- **Patterns**: Film strip borders, scan lines, dot-grid overlays, gradient orbs

## Current Focus

Presentation landing page is complete. Next steps:
1. Build individual section pages (Riot Reel, Flick Feed, Binge Buddy)
2. Add database for user persistence
3. Add authentication system
4. Build forum/discussion features
5. Create quiz engine

## Session History

| Date | Changes |
|------|---------|
| Initial | Template created with base setup |
| 2026-03-20 | Built КиноМир main page — hero, sections, founders, registration |
| 2026-03-20 | Full redesign to SceneIt — AAA cinematic presentation, SVG logos, animations, new branding |
