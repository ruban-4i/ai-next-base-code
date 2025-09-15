# Career Page Implementation Task

**Date**: 12-09-25  
**Status**: Pending Approval

## Requirements Summary

### Page Overview

Create a single static marketing career page at `/app/career` based on the Figma design with 100% accuracy. This is a comprehensive career page featuring:

1. **Header Section** - Navigation with logo and sign in/register links
2. **Hero Section** - Main tagline with community focus and team illustration
3. **Join Our Team** - Call to action section
4. **Why Choose Us** - 4 feature cards with icons
5. **Our Premise** - Company culture section with team photo
6. **How to Apply** - Application process section
7. **Contact Us** - Contact information and email
8. **Our Locations** - Horizontal scrolling location cards (9 global locations)
9. **Footer** - Newsletter subscription and social media links

### Assets Required

All SVG and image assets extracted from Figma design:

- Hero illustration components (characters, background, desk, etc.)
- Location icons (India Gate, Burj Al Arab, Qatar building, etc.)
- Feature icons (trending up, assignment, spinner, category)
- Social media icons (Facebook, Twitter, Instagram)
- Background images and decorative elements

### Technical Requirements

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS (following existing project patterns)
- **Components**: Reusable components in appropriate folders
- **Assets**: Organized in `/public/assets/career/` folder
- **Navigation**: Path constants in `paths.ts`
- **Responsive**: Mobile-first responsive design
- **Accessibility**: Full a11y compliance following cursor rules

## Implementation Plan

### 1. Assets Management

- **Folder**: Create `/public/assets/career/` directory structure
  - `/public/assets/career/icons/` - Feature and location icons
  - `/public/assets/career/illustrations/` - Hero section illustrations
  - `/public/assets/career/backgrounds/` - Background images
  - `/public/assets/career/social/` - Social media icons
- **Download**: Extract and save all 50+ SVG/PNG assets from Figma
- **Organization**: Categorize assets by section for easy maintenance

### 2. Path Constants

- **File**: Update `src/route/paths.ts`
- **Addition**: Add CAREER path constant

```typescript
export const PATHS = {
  // ... existing paths
  CAREER: '/career',
} as const
```

### 3. Route Structure

- **File**: `src/app/career/page.tsx`
- **Type**: Server Component (static marketing page)
- **SEO**: Include proper metadata and title

### 4. Component Architecture

#### Main Page Component

- **File**: `src/pages/career/views/career-view.tsx`
- **Structure**: Single comprehensive view component

#### Reusable Components

- **Location**: `src/pages/career/components/`
- **Components**:
  - `career-header.tsx` - Navigation header
  - `hero-section.tsx` - Main hero with illustrations
  - `feature-card.tsx` - Reusable feature cards
  - `location-card.tsx` - Location information cards
  - `contact-section.tsx` - Contact and email section
  - `footer-section.tsx` - Newsletter and social links

### 5. Styling Implementation

- **Approach**: Tailwind CSS classes matching Figma design exactly
- **Typography**: Inter font family (already configured in project)
- **Colors**: Extract exact hex values from Figma design
- **Spacing**: Match exact pixel dimensions and responsive breakpoints
- **Layout**: CSS Grid and Flexbox for complex layouts

### 6. Responsive Design

- **Mobile**: 375px+ (stack cards, adjust typography)
- **Tablet**: 768px+ (2-column layouts)
- **Desktop**: 1024px+ (full design as shown)
- **Large**: 1728px+ (max-width container)

### 7. Key Features Implementation

#### Horizontal Location Scroll

- **Container**: Horizontal scrolling container for 9 location cards
- **Behavior**: Smooth scroll with scroll indicators
- **Cards**: Individual location cards with country flags/icons

#### Interactive Elements

- **Email Link**: `mailto:Recruitment@4iapps.com`
- **Social Links**: External links to social media
- **Navigation**: Internal routing using path constants

#### Asset Integration

- **SVG Icons**: Inline SVG or optimized img tags
- **Illustrations**: Hero section character compositions
- **Backgrounds**: CSS background images for sections

### 8. Content Structure

#### Header Navigation

```
4i Career Signup | Sign in | Register
```

#### Hero Section

```
We're not just building careers
We're building a community
[Team Illustration]
Join our Team !
```

#### Feature Cards (4x)

1. **Innovative Work Environment** (Blue background)
2. **Career Growth** (Light background)
3. **Impactful Projects** (Light blue background)
4. **Comprehensive Benefits** (Dark background)

#### Locations (9x)

1. India - Chennai HQ
2. UAE - Dubai
3. Qatar - Doha
4. Oman - Muscat
5. London - UK
6. USA - Washington DC
7. Canada - Vancouver
8. Malaysia - Kuala Lumpur
9. Singapore
10. Australia

### 9. Quality Assurance Checklist

#### Design Accuracy

- [ ] Exact color matching from Figma
- [ ] Precise typography and spacing
- [ ] All assets properly positioned
- [ ] Responsive behavior matches design intent

#### Code Quality

- [ ] Follows all cursor rules and best practices
- [ ] TypeScript strict mode compliance
- [ ] Accessibility standards met
- [ ] Performance optimized (images, lazy loading)

#### Functionality

- [ ] All links work correctly
- [ ] Email contact functional
- [ ] Social media links open externally
- [ ] Responsive design tested on all breakpoints

### 10. File Structure

```
src/
├── app/
│   └── career/
│       └── page.tsx
├── pages/
│   └── career/
│       ├── components/
│       │   ├── career-header.tsx
│       │   ├── hero-section.tsx
│       │   ├── feature-card.tsx
│       │   ├── location-card.tsx
│       │   ├── contact-section.tsx
│       │   └── footer-section.tsx
│       └── views/
│           └── career-view.tsx
├── route/
│   └── paths.ts (updated)
└── public/
    └── assets/
        └── career/
            ├── icons/
            ├── illustrations/
            ├── backgrounds/
            └── social/
```

## Approval Required

This task will create a complete, pixel-perfect career page implementation following all established project patterns and cursor rules. The page will be fully responsive, accessible, and optimized for performance.

**Review the above plan and respond with "go ahead" to proceed with implementation.**
