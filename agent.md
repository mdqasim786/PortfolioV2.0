# Agent Instructions — Qasim Portfolio

## Project Overview
Single-page React portfolio built with Vite, TypeScript, and Tailwind CSS v4. All sections and data are defined in a single file `src/portfolio.tsx` (no routing, no API calls).

## Tech Stack
- **Framework**: React 19, TypeScript
- **Build**: Vite 7
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite` plugin), inline styles in JSX
- **Image Processing**: Sharp (for favicon/favicon processing)

## Key Files
| File | Purpose |
|------|---------|
| `src/portfolio.tsx` | Main component — all sections, data, sub-components |
| `src/main.tsx` | React entry point |
| `index.html` | HTML shell with favicon links |
| `vite.config.ts` | Vite config (React + Tailwind plugins) |
| `public/` | Static assets (images, favicon) |

## Commands
- `npm run dev` — Start dev server
- `npm run build` — Type-check + production build
- `npm run preview` — Preview production build

## Architecture Notes

### Data Flow
- All data is **statically defined** in constants at the top of `portfolio.tsx`
- No state management library — uses React `useState` for UI state
- Section visibility tracked via `IntersectionObserver` → `visibleSections` Set
- Active nav tracked via scroll position → `activeNav` state

### Component Structure
```
Portfolio (single FC in portfolio.tsx)
├── Nav (fixed, z-index 100)
│   ├── Logo (Orbitron font)
│   ├── Desktop links (NAV_ITEMS array)
│   └── Hamburger → Mobile menu overlay
├── Sections (each with id + data-section attribute)
│   ├── Home (hero)
│   ├── Experience (timeline)
│   ├── Projects (card grid)
│   ├── Articles
│   ├── Certifications
│   ├── Skills (categorized with progress bars)
│   ├── Testimonials
│   ├── Resume Banner
│   ├── Contact
│   └── Footer
├── SectionHeader (reusable sub-component)
└── ProjectCard (reusable sub-component)
```

### Navigation
- `NAV_ITEMS` array drives header, mobile menu, and footer Quick Links
- Add/remove items from this array to update all 3 locations
- Active section detection: scroll handler finds closest section to `top: 100px`

### Section Pattern
```tsx
<section id="section-name" data-section="section-name" style={{...}}>
  <SectionHeader title="..." subtitle="..." visible={...} />
  <div style={{ marginTop: "60px" }}>
    {/* content */}
  </div>
</section>
```

### Skill Categories
| Category | Primary | Secondary |
|----------|---------|-----------|
| Frontend | `#6366f1` | `#8b5cf6` |
| Backend | `#10b981` | `#34d399` |
| Database | `#06b6d4` | `#22d3ee` |
| AI & Tools | `#f59e0b` | `#f97316` |

### Design Conventions
- **Cards**: `rgba(255,255,255,0.02)` bg, `1px solid rgba(255,255,255,0.06)` border, 14px radius, `blur(10px)`
- **Buttons**: Gradient `linear-gradient(135deg, #6366f1, #8b5cf6)`, hover `translateY(-2px)` + stronger shadow
- **Experience timeline**: Positioned line + colored dots + offset cards (64px padding-left)
- **Fonts**: Sora (body) + Orbitron (logo) via Google Fonts
- **Responsive**: Single breakpoint at 768px (hamburger nav, 3-line clamp on descriptions)

## Data Sources (all in portfolio.tsx)
- `SKILLS` — Array of `{ name, icon, level, category }`
- `PROJECTS` — Array of `{ title, desc, tags, color, image }`
- `CERTIFICATIONS` — Array of `{ title, issuer, date, placeholder? }`
- `FOOTER_LINKS` — Array of `{ label, icon: ReactNode, href }`
- `NAV_ITEMS` — Array of section name strings

## Build/Deploy
- Output goes to `dist/`
- Static site — deploy `dist/` to any static host
