# System Patterns: SceneIt

## Architecture Overview

```
src/
├── app/                         # Next.js App Router
│   ├── layout.tsx               # Root layout + Header + Footer
│   ├── page.tsx                 # Home page (assembles sections)
│   ├── globals.css              # Tailwind, animations, custom scrollbar
│   └── favicon.ico              # Site icon
├── components/
│   ├── ui/
│   │   ├── Logo.tsx             # SceneIt SVG logo
│   │   └── AnimatedSection.tsx  # Intersection Observer animation wrapper
│   ├── layout/
│   │   ├── Header.tsx           # Fixed header, scroll-aware glass effect (client)
│   │   └── Footer.tsx           # Minimal footer
│   └── sections/
│       ├── Hero.tsx             # Cinematic hero with parallax + staggered animations (client)
│       ├── Sections.tsx         # Three colored section strips
│       ├── Founders.tsx         # Team cards with hover effects
│       └── Registration.tsx     # Registration form (client)
```

## Key Design Patterns

### 1. Scroll-Triggered Animations (AnimatedSection)

```tsx
// Intersection Observer wrapper for reveal-on-scroll
<AnimatedSection delay={200} direction="up">
  <Content />
</AnimatedSection>
```

Uses IntersectionObserver to add CSS transition classes when elements enter viewport. Supports `up`, `down`, `left`, `right`, `none` directions and staggered `delay`.

### 2. CSS Keyframe Entrance Animations

```css
.hero-entrance {
  animation: heroEntrance 1s ease-out forwards;
}
```

Hero elements use CSS `@keyframes` with `animation-delay` for staggered reveal. No React state needed — pure CSS.

### 3. Mouse Parallax (Hero)

```tsx
const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
// Tracks mouse position, applies to gradient orbs via transform
```

### 4. Server vs Client Components

| Component | Type | Why |
|-----------|------|-----|
| Hero | Client | Mouse tracking |
| Header | Client | Scroll detection, mobile menu |
| Registration | Client | Form state |
| Sections | Server | Static content |
| Founders | Server | Static content |
| Footer | Server | Static content |
| AnimatedSection | Client | Intersection Observer |
| Logo | Server | Pure SVG |

### 5. Section Color System

Each section has a unique identity:
```tsx
{
  gradient: "from-[#2d1b69] via-[#1a1145] to-[#0d0b1a]",
  accentColor: "#a78bfa",
  accentGlow: "rgba(167, 139, 250, 0.15)",
  borderGlow: "border-violet-500/20",
}
```

## Styling Conventions

### Tailwind CSS v4
- Base: `#07070a` (near-black)
- Accent: `amber-500` / gold tones
- Section colors: violet, rose, amber gradients
- `@theme` block in globals.css for font configuration
- Custom scrollbar via `::-webkit-scrollbar`

### Animation Patterns
| Pattern | Usage |
|---------|-------|
| `hero-entrance` | Fade-up staggered reveal |
| `hero-entrance-scale` | Scale-in for dividers |
| `AnimatedSection` | Scroll-triggered reveals |
| `animate-pulse` | Status indicators |
| `animate-bounce` | Scroll indicator |
| `transition-all duration-500` | Hover effects |

## File Naming Conventions

- Components: PascalCase (`Hero.tsx`, `Logo.tsx`)
- Utilities: camelCase (`AnimatedSection.tsx`)
- Pages/Routes: lowercase (`page.tsx`, `layout.tsx`)
- Directories: lowercase (`components/`, `ui/`, `layout/`, `sections/`)
