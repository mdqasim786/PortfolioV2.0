# Design System — Muhammad Qasim Portfolio

## Color Palette

### Backgrounds
| Token | Hex | Usage |
|-------|-----|-------|
| `bg-page` | `#0a0a0f` | Root, scrollbar track |
| `bg-nav` | `rgba(10,10,15,0.85)` | Nav (scrolled) |
| `bg-mobile` | `rgba(10,10,15,0.97)` | Mobile menu overlay |
| `bg-card` | `rgba(255,255,255,0.02)` | Cards (default) |
| `bg-card-hover` | `rgba(255,255,255,0.04)` | Cards (hover) |
| `bg-footer` | `rgba(0,0,0,0.3)` | Footer |

### Text
| Token | Hex | Usage |
|-------|-----|-------|
| `text-primary` | `#ffffff` | Headings, logos |
| `text-body` | `#e2e2e8` | Body text |
| `text-nav-inactive` | `#a0a0b0` | Inactive nav |
| `text-muted` | `#5a5a6e` | Muted body (bio, footer) |
| `text-description` | `#6b6b7e` | Experience descriptions |
| `text-fineprint` | `#3a3a4e` | Copyright |

### Accent (Indigo Primary)
| Token | Hex | Usage |
|-------|-----|-------|
| `accent-primary` | `#6366f1` | Active nav, buttons, timeline |
| `accent-secondary` | `#8b5cf6` | Gradients |
| `accent-green` | `#10b981` | Status badge, Backend category |

### Category Colors (Skills)
| Category | Primary | Secondary |
|----------|---------|-----------|
| Frontend | `#6366f1` | `#8b5cf6` |
| Backend | `#10b981` | `#34d399` |
| Database | `#06b6d4` | `#22d3ee` |
| AI & Tools | `#f59e0b` | `#f97316` |

### Experience Timeline Colors
| Entry | Color | Hex |
|-------|-------|-----|
| DMU | Pink | `#ec4899` |
| Exeton | Indigo | `#6366f1` |
| Elevvo | Peach | `#fda085` |
| AppVerse | Teal | `#5bc0e5` |

### Project Colors
| Project | Hex |
|---------|-----|
| Apex Kick | `#c30010` |
| Exeton Website | `#8b5cf6` |
| Quick-Bill SaaS | `#10b981` |

## Typography

### Fonts
- **Primary**: `'Sora', sans-serif` (300, 400, 500, 600, 700, 800)
- **Brand/Logo**: `'Orbitron', sans-serif` (400, 700, 900)

### Sizes
| Element | Size | Weight |
|---------|------|--------|
| Hero h1 | `clamp(42px, 8vw, 82px)` | 800 |
| Section h2 | `clamp(32px, 5vw, 46px)` | 800 |
| Role subtitle | `clamp(18px, 3vw, 24px)` | 300 |
| Experience title | `21px` | 700 |
| Project title | `19px` | 700 |
| Nav items | `13px` | 500 |
| Section subtitle | `11px` | 500 |
| Body | `14.5px – 15.5px` | 300 |
| Tags/badges | `11px – 13px` | 500 |

### Letter Spacing
- `-2px`: Hero h1
- `-1px`: Section h2
- `2px`: Logo
- `4px`: Section subtitle
- `3px`: Skill category label

## Spacing

### Section Padding
- All sections: `120px 24px`
- Hero: `120px 24px 80px`
- Footer: `60px 24px 40px`

### Cards
- Experience: `32px` padding, `16px` border-radius
- Project: `28px` padding, `18px` border-radius
- Skill: `20px` padding, `14px` border-radius
- Certification: `24px 28px`, `14px` border-radius

### Max Widths
- `900px`: Experience, Certifications, Resume Banner
- `1000px`: Skills, Footer
- `1100px`: Projects
- `700px`: Contact

## Layout

### Navigation
- Fixed top, z-index 100
- Transparent → `rgba(10,10,15,0.85)` + blur(20px) on scroll
- Active section highlighted via IntersectionObserver (closest to top:100px)
- Mobile: Full-screen overlay, hamburger → X animation

### Experience Timeline
- Left-aligned vertical line (2px, gradient)
- Dots (16px, colored, 3px page-bg border cutout)
- Cards offset `64px` right of line
- 2px gradient accent bar at card top

### Skills
- Auto-fill grid, `minmax(200px, 1fr)`, `12px` gap
- Progress bars with animated width (1.2s cubic-bezier)

### Projects
- Auto-fill grid, `minmax(320px, 1fr)`, `24px` gap
- Image: 180px height, zoom to 1.05 on hover
- Dynamic accent color per project

### Footer
- 3-column grid (`minmax(220px, 1fr)`, `48px` gap)
- Columns: Brand, Quick Links, Connect

## Animations

### Keyframes
| Name | Purpose |
|------|---------|
| `fadeInUp` | Entry animations (0→1 opacity, +24px Y) |
| `fadeInDown` | Status badge (-16px Y) |
| `blink` | "Available" dot |
| `scrollPulse` | Scroll indicator line |
| `floatOrb` | Background ambient orbs |
| `spinSlow` | Hero decorative ring (40s) |
| `pulse` | Center orb |

### Transitions
- Cards/buttons: `0.3s ease`
- Section visibility: `0.7s cubic-bezier(0.4,0,0.2,1)`
- Skill bars: `1.2s cubic-bezier(0.4,0,0.2,1)` with 0.08s stagger

### Hover Effects
- Buttons: translateY(-2px), stronger shadow
- Project cards: translateY(-4px), colored shadow
- Footer links: translateX(4px), color to accent
- Skill cards: background to `rgba(99,102,241,0.08)`

## Responsive

### Breakpoint: 768px
- Desktop nav hidden, hamburger shown
- Mobile menu text: 20px
- Experience descriptions: 3-line clamp

### Fluid Behavior
- Typography via `clamp()`
- Grids via `auto-fill`/`auto-fit` + `minmax()`
- Flex containers use `flexWrap: "wrap"`

## Component Tree
```
Portfolio
├── Ambient Background (3 orbs + grid pattern)
├── Nav (fixed)
│   ├── Logo
│   ├── Desktop Links (6 items)
│   └── Hamburger (mobile)
├── Mobile Menu (full-screen overlay)
├── Home (hero)
│   ├── Spinning Ring
│   ├── Status Badge
│   ├── Headline + Name
│   ├── Bio
│   ├── CTA Buttons
│   └── Scroll Indicator
├── Experience (timeline, 4 entries)
│   ├── SectionHeader
│   └── 4× Timeline cards
├── Projects (grid, 3 cards)
│   ├── SectionHeader
│   └── 3× ProjectCard
├── Certifications (list, 3 entries)
│   ├── SectionHeader
│   └── 3× Certification rows
├── Skills (4 categories)
│   ├── SectionHeader
│   └── 4× Category groups (N skill cards each)
├── Resume Banner
├── Contact
├── Footer
│   ├── Brand Column
│   ├── Quick Links Column
│   └── Connect Column (GitHub, LinkedIn, Email)
└── Global Styles (@keyframes, media queries, scrollbar)
```
