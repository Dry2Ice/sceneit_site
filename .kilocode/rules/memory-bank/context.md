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
| `src/app/forums/discussions/page.tsx` | Server wrapper — fetches translations, renders DiscussionsPage |
| `src/app/forums/discussions/ClientPage.tsx` | Client discussions list with search, sort, category filters |
| `src/app/forums/votes/page.tsx` | Server wrapper — fetches translations, renders VotesPage |
| `src/app/forums/votes/ClientPage.tsx` | Client polls list with search, sort, category filters |
| `src/app/news/page.tsx` | Flick Feed main — weekly highlights of news, reviews, longreads |
| `src/app/news/articles/page.tsx` | Server wrapper — fetches translations, renders ArticlesPage |
| `src/app/news/articles/ClientPage.tsx` | Client news list with search, sort, category filters |
| `src/app/news/reviews/page.tsx` | Server wrapper — fetches translations, renders ReviewsPage |
| `src/app/news/reviews/ClientPage.tsx` | Client reviews list with search, sort, genre filters, star ratings |
| `src/app/news/longreads/page.tsx` | Server wrapper — fetches translations, renders LongreadsPage |
| `src/app/news/longreads/ClientPage.tsx` | Client longreads list with search, sort, category filters |
| `src/app/quizzes/page.tsx` | Binge Buddy main — weekly highlights of brackets, tests, trivia |
| `src/app/quizzes/brackets/page.tsx` | Server wrapper — fetches translations, renders BracketsPage |
| `src/app/quizzes/brackets/ClientPage.tsx` | Client head-to-head brackets with search, sort, category filters |
| `src/app/quizzes/tests/page.tsx` | Server wrapper — fetches translations, renders TestsPage |
| `src/app/quizzes/tests/ClientPage.tsx` | Client personality tests with search, sort, category filters |
| `src/app/quizzes/trivia/page.tsx` | Server wrapper — fetches translations, renders TriviaPage |
| `src/app/quizzes/trivia/ClientPage.tsx` | Client trivia quizzes with search, sort, category filters, avg score bars |
| `src/app/layout.tsx` | Root layout + Header + Footer |
| `src/app/globals.css` | Tailwind, animations, scrollbar |
| `src/data/forums.ts` | Mock data for discussions and polls with helper functions |
| `src/data/flickfeed.ts` | Mock data for news articles, reviews, and longreads with helper functions |
| `src/data/buddy.ts` | Mock data for brackets, tests, and trivia quizzes with helper functions |
| `src/db/schema.ts` | Drizzle schema: users, sessions, discussions, polls, articles, reviews, longreads, brackets, tests, trivias |
| `src/db/index.ts` | Database client (createDatabase from app-builder-db) |
| `src/db/migrate.ts` | Migration runner script |
| `src/actions/auth.ts` | Server actions: register, login, logout, getCurrentUser |
| `src/actions/content.ts` | Server actions: create/get for discussions, polls, articles, reviews, longreads, brackets, tests, trivia |
| `src/app/register/page.tsx` | Registration form |
| `src/app/login/page.tsx` | Login form |
| `src/app/create/page.tsx` | Content creation hub (8 types) |
| `src/app/create/*/page.tsx` | Individual creation forms (discussion, poll, article, review, longread, bracket, test, trivia) |
| `src/components/ui/AuthButtons.tsx` | Client auth buttons (login/register or user menu) |
| `src/components/ui/CreateForm.tsx` | Reusable creation form component |
| `src/i18n/en.ts` | English translations (full UI dictionary) |
| `src/i18n/ru.ts` | Russian translations (full UI dictionary) |
| `src/i18n/index.ts` | i18n helpers: getLang, setLang, t() |
| `src/actions/lang.ts` | Server action to switch language (sets cookie) |
| `src/components/ui/LangSwitcher.tsx` | Client language switcher (EN/RU toggle) |
| `src/components/ui/Logo.tsx` | SceneIt SVG logo with amber→violet gradient |
| `src/components/ui/AnimatedSection.tsx` | Scroll-triggered animation wrapper |
| `src/components/sections/Hero.tsx` | Large centered logo (colorful gradient), parallax, staggered entrance |
| `src/components/sections/Sections.tsx` | Three expandable section strips with links to dedicated pages |
| `src/components/sections/Founders.tsx` | Two interactive founder photo cards (client component) |
| `src/components/sections/Registration.tsx` | Registration form |
| `src/components/layout/Header.tsx` | Fixed header with logo, nav, lang switcher, auth; glass backdrop on scroll |
| `src/components/layout/Footer.tsx` | Footer with translated links and copyright |

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
| 2026-03-21 | Added Flick Feed sections: /news/articles, /news/reviews, /news/longreads with search, sort, genre/category filters; /news shows weekly highlights; reviews include star ratings |
| 2026-03-21 | Added Binge Buddy quiz sections: /quizzes/brackets (head-to-head tournaments), /quizzes/tests (personality quizzes with multiple results), /quizzes/trivia (knowledge tests with scores); all with search, sort, category filters; /quizzes shows weekly highlights |
| 2026-03-21 | Added database (SQLite + Drizzle ORM), user auth (register/login/logout with cookie sessions), content creation (/create with 8 form types), Header shows auth state |
| 2026-03-21 | Added EN/RU i18n with language switcher in Header; translations for all UI text; design polish: noise texture, 4th orb, glass-card effects, focus styles, shimmer/float/glow-pulse animations |
| 2026-03-21 | Added i18n translations to /news page — replaced all hardcoded English strings with `t.news.*`, `t.nav.*`, and `t.forums.*` keys; SectionHeader accepts `viewAll` prop |
| 2026-03-21 | Converted 8 sub-page files to server component pattern: each split into page.tsx (server wrapper fetching translations via getLang) + ClientPage.tsx ("use client" component with t prop). Covers: discussions, votes, articles, reviews, longreads, brackets, tests, trivia |
