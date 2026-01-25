# Copilot Instructions for PaginaGeorge

## Project Overview
A presentation website for George, a tour guide offering free walking tours in Amsterdam. This is a simple, static site built with vanilla HTML, CSS, and minimal JavaScript focused on showcasing George's services and redirecting visitors to his social media channels.

## Tech Stack
- **HTML5** - Semantic markup for structure
- **CSS3** - Styling (consider using CSS Grid/Flexbox for layout)
- **Vanilla JavaScript** - Minimal JS for interactions (no frameworks needed)
- **Static hosting** - No backend required (suitable for GitHub Pages, Netlify, Vercel)

## Project Purpose & Constraints
- **Primary goal**: Present George's tour guide services professionally
- **Secondary goal**: Drive traffic to Instagram (single social platform focus)
- **Architecture**: Single Page Application (SPA) - all content on one scrolling page
- **No booking system**: Site redirects to Instagram for inquiries/bookings
- **Keep it simple**: No build process, no dependencies, lightweight and fast
- **Mobile-first**: Many tourists browse on phones while traveling

## File Structure (Recommended)
```
/
├── index.html           # Single page with all sections
├── css/
│   └── styles.css       # Main stylesheet
├── js/
│   └── main.js          # Smooth scrolling, mobile menu toggle
├── images/              # Tour photos, George's photo, Amsterdam scenes
└── .github/
    └── copilot-instructions.md
```

## Design Considerations
- **Hero section**: Eye-catching intro with George's photo and tagline
- **About section**: Brief bio highlighting experience and tour style
- **Tours section**: Showcase tour types/routes (if applicable)
- **Instagram CTA**: Prominent "Follow on Instagram" button/link throughout
- **Contact**: Instagram DM as primary contact method
- **Visuals**: Amsterdam imagery, tour photos (can embed Instagram feed if desired)

## Development Workflow
- Open `index.html` directly in browser for testing (no build step needed)
- Use Live Server extension in VS Code for auto-refresh during development
- Test on mobile viewport sizes (Chrome DevTools responsive mode)
- Optimize images before adding (use WebP format or compressed JPEGs)

## Code Conventions
- Use semantic HTML5 tags (`<header>`, `<section>`, `<nav>`, `<footer>`)
- CSS: Use custom properties (CSS variables) for colors/spacing
- Keep CSS organized: layout → components → utilities
- JS: Use ES6+ features (const/let, arrow functions, template literals)
- Add meaningful `alt` text for images (accessibility & SEO)
- External links to social media should use `target="_blank" rel="noopener noreferrer"`

## Key Features to Implement
- Smooth scroll navigation between sections
- Responsive navigation menu (hamburger for mobile)
- Instagram link/button with hover effects (use Instagram brand colors)
- Instagram icon in header/footer and as sticky CTA
- Simple image gallery/carousel for tour photos
- No contact form needed - direct to Instagram DM
- No booking integration - keep it simple

## Performance & SEO
- Minify CSS/JS before deployment
- Lazy load images below the fold
- Include meta tags: description, Open Graph for social sharing
- Add favicon and app icons
- Keep total page weight under 1-2MB for fast mobile loading

## Deployment
Suitable platforms (all support custom domains):
- GitHub Pages (free, easy from repo)
- Netlify (drag & drop or git integration)
- Vercel (fast CDN)
- Any basic web host (no special requirements)
