# Project Brief: SceneIt

## Purpose

SceneIt is a cinema community website with three main pillars: Riot Reel (Forum & Voting), Flick Feed (Reviews & News), and Binge Buddy (Quizzes & Tests). The main page is a cinematic presentation/landing page designed to look like a AAA game or Hollywood blockbuster marketing site.

## Target Users

- Cinema enthusiasts worldwide
- Film critics and reviewers
- Casual movie fans looking for recommendations
- Cinema students and professionals

## Core Use Case

A community platform where users can:
1. Debate films in forums and participate in community polls (Riot Reel)
2. Read expert reviews and stay up-to-date with cinema news (Flick Feed)
3. Test their film knowledge through interactive quizzes (Binge Buddy)

## Key Requirements

### Must Have

- Modern Next.js 16 setup with App Router
- TypeScript for type safety
- Tailwind CSS 4 for styling
- ESLint for code quality
- AAA-quality cinematic presentation design
- English language interface
- Dark theme with amber/gold accents
- Responsive design (mobile-first)
- Three distinct content sections with unique visual identity
- User registration
- Smooth animations and transitions

### Nice to Have

- User authentication (login/logout)
- Database persistence for users and content
- Forum thread system
- Voting/poll mechanism
- Quiz engine with scoring
- Leaderboard system

## Design Direction

- Near-black base (#07070a) — deeper than typical dark themes
- Amber/gold accent color (#d4a853)
- Section-specific colors: violet (Riot Reel), rose (Flick Feed), amber (Binge Buddy)
- Geist Sans typography
- Film strip borders, scan lines, dot-grid overlays
- Parallax mouse-tracking gradient orbs
- CSS keyframe staggered entrance animations
- Intersection Observer scroll-triggered reveals
- Custom scrollbar with amber tint
- Glass-effect header on scroll

## Constraints

- Framework: Next.js 16 + React 19 + Tailwind CSS 4
- Package manager: Bun
- Language: English
- No external UI libraries — custom components only
- No external animation libraries — CSS + Intersection Observer only
