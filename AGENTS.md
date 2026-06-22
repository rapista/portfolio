# Harvie — App Development Portfolio

## Project Overview
A professional single-page portfolio website for an app development studio called "Harvie." Built with zero external frameworks — only plain HTML, CSS, and JavaScript.

## Tech Stack
- **HTML5** — semantic structure with `section[id]` for scroll-based nav
- **CSS3** — custom properties, flexbox, grid, keyframe animations, transitions, canvas styling
- **JavaScript (Vanilla ES6)** — DOM manipulation, Canvas API, IntersectionObserver, touch events

## File Structure
```
/ (root)
├── index.html        # Single-page portfolio HTML
├── style.css         # All styles (responsive, animations, dark theme)
├── script.js         # All JS (particles, carousel, form, effects)
└── AGENTS.md         # This file — agent instructions
```

## Architecture & Conventions

### HTML
- All content is in a single `index.html` file
- Sections: Hero (#home), Services (#services), Process, Work (#work), Skills (#skills), Testimonials, Contact (#contact), Footer
- Navigation links use `href="#section-id"` for smooth scrolling
- `data-tilt` attribute on elements that get 3D hover effect
- `data-delay` attribute on reveal elements for staggered animation timing
- `data-target` on stat counters for the count-up animation
- `data-width` on skill-fill bars for the width percentage
- Form uses `novalidate` so custom validation in JS takes over

### CSS
- Dark theme with purple accent: `#7c5cfc`
- All class names are lowercase with hyphens (e.g., `.hero-stats`, `.service-card`)
- Sections are padded: `120px 0`
- Base font: system-ui stack, sans-serif
- Media breakpoints: 1024px (tablet), 768px (mobile), 480px (small mobile)
- Animations use `cubic-bezier(0.4, 0, 0.2, 1)` for premium feel
- Reveal classes: `.reveal-text` (fade + translateY), `.reveal-scale` (scale in), `.stagger-children` (sequential children)

### JavaScript
- All logic wrapped in `DOMContentLoaded`
- No external libraries or CDN scripts
- ES6+ features: `const/let`, arrow functions, template literals, `class`, `forEach`

### Key Interactive Features
| Feature | Implementation |
|---------|---------------|
| Particle system | `<canvas>` in hero, ~80 particles with connecting lines |
| Custom cursor | `.cursor` + `.cursor-follower` divs, hidden on mobile |
| Scroll progress | Fixed bar at top, width = scroll percentage |
| Typing effect | Cycles through words: Beautiful, Fast, Scalable, User-Friendly, Innovative |
| Animated counters | Eased cubic-out animation on stat numbers |
| Skill bars | Animate width on scroll into view, with shine effect |
| Work carousel | Flex track, prev/next buttons, dots, auto-play 5s, touch swipe |
| 3D tilt | `rotateX/rotateY` on mouseover for phone mockup and service cards |
| Magnetic buttons | Buttons follow cursor position with 0.3x offset |
| Form validation | Custom JS validation, floating labels, error states |
| Parallax | Hero text fades + visual shifts on scroll |
| Staggered reveals | Children animate in sequence with CSS transition-delays |

### Responsive Behavior
- Desktop: standard layout
- Tablet (≤1024px): services 2-col, process 2-col, testimonials 2-col, work 2-col, contact stacks
- Mobile (≤768px): all grids 1-col, hamburger menu, no cursor, smaller headings
- Small mobile (≤480px): even smaller headings and stats

### Naming Conventions
- **CSS classes**: lowercase-hyphenated (`.hero-stats`, `.service-card`, `.work-meta`)
- **Data attributes**: lowercase-hyphenated (`data-tilt`, `data-delay`, `data-target`, `data-width`)
- **IDs**: camelCase (`#contactForm`)

## Common Tasks

### Add a new section
1. Add `<section id="name" class="name">` in `index.html`
2. Add corresponding styles in `style.css`
3. Add nav link in `.nav-menu` if needed
4. Add reveal class (`.reveal-text`) for scroll animation

### Add a new animation
- Keyframe animations go in `style.css` under the relevant section
- JS-driven animations go in `script.js` (usually inside a scroll observer or event listener)

### Modify colors
- Primary accent: `#7c5cfc` (purple)
- Backgrounds: `#0a0a0a`, `#0c0c0c`, `#0e0e0e`
- Text: `#fff` (headings), `#e0e0e0` (body), `#777`/`#888`/`#999` (secondary)
- Borders: `#111`, `#181818`, `#1a1a1a`, `#222`

### Testing
- Open `index.html` directly in any modern browser (no build step)
- Test responsive: use browser DevTools device mode
- Test animations: scroll through all sections
- Test form: submit with empty/invalid fields, submit with valid fields
- Test carousel: swipe on touch devices, click prev/next/dots
