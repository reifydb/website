# ReifyDB Website - Clean Brutalist Design System

## Overview
This document outlines the clean, professional design system applied to the ReifyDB website, inspired by MotherDuck's minimalist brutalist aesthetic. The system features sharp corners, distinctive shadow effects, bold borders, and a light color palette that ensures excellent readability while maintaining a modern, technical appearance.

## Design Principles

### 1. Brutalist Borders
- **Primary borders**: 3px solid using `#383838` (dark gray)
- **Sharp corners**: All elements use `border-radius: 0` for rectangular appearance
- **Section separators**: 3px horizontal lines between major sections
- **Consistent thickness**: Uniform 3px borders throughout

### 2. Minimalist Interactions
- **Transform effects**: `translate(7px, -7px)` for buttons, `translate(5px, -5px)` for cards
- **Timing function**: `cubic-bezier(0.4, 0, 0.2, 1)` for smooth transitions
- **Duration**: 0.3s for hover transitions, 0.2s for button interactions
- **No rotations**: Clean, professional movement without playful rotations

### 3. Brutalist Shadow System
- **Primary shadow**: `-5px 5px 0px 0px #383838` for static elements
- **Hover shadow**: `-7px 7px 0px 0px #383838` for interactive states
- **No blur**: Sharp, distinctive shadows that reinforce the brutalist aesthetic
- **Consistent direction**: All shadows offset down and to the right

## CSS Variables

### Color Tokens - Light Professional Palette
```css
/* Light Mode - Clean, Readable Colors */
--ifm-color-primary: #383838;           /* Dark Gray */
--ifm-color-primary-dark: #2A2A2A;      /* Darker Gray */
--ifm-color-primary-darker: #1A1A1A;    /* Almost Black */
--ifm-color-primary-darkest: #0A0A0A;   /* Black */
--ifm-color-primary-light: #4A4A4A;     /* Medium Gray */
--ifm-color-primary-lighter: #5A5A5A;   /* Light Gray */
--ifm-color-primary-lightest: #F4EFEA;  /* Warm Beige */

--warm-bg: #F4EFEA;                     /* Main background - warm beige */
--warm-surface: #F8F8F7;                /* Light gray surface */
--accent-yellow: #FFDE00;               /* Accent yellow (unused) */
--accent-teal: #53DBC9;                 /* Accent teal (unused) */
--accent-blue: #6FC2FF;                 /* Accent blue (unused) */
--accent-dark: #383838;                 /* Primary dark gray */
--border-dark: #383838;                 /* Border color */
--border-light: #E5E5E5;                /* Light borders */
--text-muted: #555555;                  /* Muted text - dark enough for readability */
--ifm-font-color-base: #1a1a1a;        /* Base text - very dark for contrast */

/* Dark Mode - High Contrast */
--border-dark: #F8F8F7;                 /* Light borders in dark mode */
--warm-surface: #2A2A2A;                /* Dark surface */
--text-muted: #808080;                  /* Muted text in dark mode */
```

### Shadow Tokens
```css
--shadow-brutalist: -5px 5px 0px 0px #383838;  /* Standard brutalist shadow */
/* Hover state uses -7px 7px offset */
```

### Border Radius
```css
--radius-soft: 0;    /* No rounding */
--radius-medium: 0;  /* No rounding */
--radius-small: 0;   /* No rounding */
```

## Component Patterns

### 1. Button Components
```css
.btn-primary {
  padding: 16.5px 22px;
  border-radius: 0;
  background: #383838;
  color: white;
  font-weight: 500;
  font-size: 16px;
  border: 3px solid #383838;
  box-shadow: -5px 5px 0px 0px #383838;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

.btn-primary:hover {
  transform: translate(7px, -7px);
  box-shadow: -7px 7px 0px 0px #383838;
}

.btn-secondary {
  /* Same structure but with white background */
  background: white;
  color: #383838;
  border: 3px solid #383838;
}

.btn-secondary:hover {
  background: #F4EFEA; /* Subtle background change */
}
```

### 2. Card Components
```css
.card-clean {
  background: white;
  border-radius: 0;
  border: 3px solid #383838;
  box-shadow: -5px 5px 0px 0px #383838;
  padding: 2rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-clean:hover {
  transform: translate(5px, -5px);
  box-shadow: -7px 7px 0px 0px #383838;
}

[data-theme='dark'] .card-clean {
  background: #2A2A2A;
  border-color: #F8F8F7;
  box-shadow: -5px 5px 0px 0px #F8F8F7;
}
```

### 3. Feature Cards
```css
.feature-card {
  background: white;
  border-radius: 0;
  border: 3px solid #383838;
  box-shadow: -5px 5px 0px 0px #383838;
  padding: 2rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.feature-card:hover {
  transform: translate(5px, -5px);
  box-shadow: -7px 7px 0px 0px #383838;
}
```

### 4. Section Backgrounds
```css
/* Light, pastel backgrounds for all sections */
.hero-section {
  background: #F4EFEA;  /* Warm beige */
  border-bottom: 3px solid #383838;
}

.quick-example-section {
  background: #FEFEFE;  /* Very light gray */
  border-top: 3px solid #383838;
  border-bottom: 3px solid #383838;
}

/* Section separator class */
.section-separator {
  border-bottom: 3px solid #383838;
}
```

### 5. Navigation Bar
```css
.navbar {
  background: #F4EFEA !important;
  border-bottom: 3px solid #383838;
}

.navbar__item {
  border-radius: 0;
  border: 2px solid transparent;
}

.navbar__item:hover {
  border-color: #383838;
  transform: translateY(-2px);
}
```

### 6. Typography
```css
/* Ensure text readability */
h1, h2, h3, h4, h5, h6 {
  color: #1a1a1a !important;  /* Very dark for maximum contrast */
  text-transform: uppercase;    /* Professional, technical appearance */
  font-weight: bold;
}

p, span, div {
  color: #1a1a1a;  /* Dark text by default */
}

/* Text utility classes with proper contrast */
.text-gray-600 { color: #4a4a4a !important; }
.text-gray-700 { color: #333333 !important; }
.text-gray-800 { color: #1a1a1a !important; }
.text-gray-900 { color: #000000 !important; }
```

## Implementation Guidelines

### 1. Applying to New Components
1. Use `border-radius: 0` for all elements
2. Add `3px solid #383838` borders
3. Use `-5px 5px 0px 0px #383838` shadow pattern
4. Include hover transforms without rotation
5. Maintain consistent transition timing

### 2. Hover State Requirements
- **Lift**: `translate(7px, -7px)` for buttons, `translate(5px, -5px)` for cards
- **No rotation**: Keep elements aligned and professional
- **Shadow enhancement**: Increase offset to `-7px 7px`
- **Border consistency**: Maintain same border color and thickness
- **Background changes**: Subtle shifts for secondary elements

### 3. Animation Standards
- **Duration**: 0.3s for cards, 0.2s for buttons
- **Easing**: `cubic-bezier(0.4, 0, 0.2, 1)`
- **Transform only**: Use translate, avoid scale or rotate
- **Shadow transitions**: Smooth offset changes

### 4. Color Contrast Requirements
- **Text on light backgrounds**: Minimum `#4a4a4a` for body text
- **Headings**: Use `#1a1a1a` or darker
- **Interactive elements**: Clear visual distinction on hover
- **Accessibility**: WCAG AA compliance for all text

## Section Layout

### Homepage Sections
1. **Hero Section**: `#F4EFEA` background with bottom border
2. **Quick Example**: `#FEFEFE` background with separator
3. **Features**: `#F8F8F7` background with separator
4. **Use Cases**: `#FDF9F5` background with separator
5. **Installation**: `#FEFEFE` background with separator
6. **Community**: `#F9F6F2` background (no separator - last section)

Each section uses:
- Light, pastel background colors for readability
- 3px solid black horizontal separators
- Consistent padding (`py-20`)
- Centered container with responsive width

## Usage Examples

### Creating a New Button
```css
.new-button {
  /* Base styling */
  padding: 16.5px 22px;
  background: #383838;
  color: white;
  
  /* Brutalist styling */
  border: 3px solid #383838;
  border-radius: 0;
  box-shadow: -5px 5px 0px 0px #383838;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Typography */
  text-transform: uppercase;
  letter-spacing: 0.025em;
  font-weight: 500;
}

.new-button:hover {
  transform: translate(7px, -7px);
  box-shadow: -7px 7px 0px 0px #383838;
}
```

### Creating a New Card
```css
.new-card {
  /* Base styling */
  padding: 2rem;
  background: white;
  
  /* Brutalist styling */
  border: 3px solid #383838;
  border-radius: 0;
  box-shadow: -5px 5px 0px 0px #383838;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.new-card:hover {
  transform: translate(5px, -5px);
  box-shadow: -7px 7px 0px 0px #383838;
}
```

## Dark Mode Considerations
- Borders invert to light colors (`#F8F8F7`)
- Shadows use light colors instead of dark
- Backgrounds shift to dark grays (`#2A2A2A`)
- Text becomes light for contrast
- Maintain same interaction patterns

## Files Modified
- `/src/css/tailwind.css` - Complete design system overhaul
- `/src/pages/index.tsx` - Homepage component updates
- `/src/css/custom.css` - Global token definitions

## Key Changes from Previous Design
1. **Removed rounded corners**: All `border-radius` set to 0
2. **Simplified color palette**: Focus on grays and beige
3. **Brutalist shadows**: Sharp offsets without blur
4. **Professional typography**: Uppercase headings, clean fonts
5. **Light backgrounds**: All sections use light/pastel colors
6. **Section separators**: 3px horizontal lines between sections
7. **Improved contrast**: Dark text on light backgrounds for readability

---
*This style guide ensures consistency across the entire ReifyDB website while maintaining a clean, professional aesthetic inspired by MotherDuck's minimalist brutalist design approach.*