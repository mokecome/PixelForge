# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application called "PixelForge" - an AI-powered visual tools platform for creators. The project uses React 19, TypeScript, and Tailwind CSS v4 with shadcn/ui components.

## Development Commands

```bash
# Install dependencies (requires --legacy-peer-deps due to React 19 compatibility)
npm install --legacy-peer-deps

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Architecture

### Project Structure

- **`app/`** - Next.js App Router pages and layouts
  - `layout.tsx` - Root layout with Geist fonts and analytics
  - `page.tsx` - Home page composed of section components
  - `apis/page.tsx` - API documentation page
  - `pricing/page.tsx` - Pricing page
  - `globals.css` - Global styles with Tailwind v4 and CSS variables

- **`components/`** - React components
  - `header.tsx`, `hero-section.tsx`, `tools-section.tsx`, `api-section.tsx`, `faq-section.tsx` - Page section components
  - `theme-provider.tsx` - Theme context provider
  - `ui/` - shadcn/ui component library (extensive collection)

- **`lib/`** - Utility functions
  - `utils.ts` - Contains the `cn()` helper for class merging (clsx + tailwind-merge)

- **`hooks/`** - Custom React hooks
  - `use-mobile.ts` - Mobile detection hook
  - `use-toast.ts` - Toast notification hook

### Key Technologies

- **Next.js 15.2.4** with App Router
- **React 19** (note: some dependencies have peer dependency warnings)
- **Tailwind CSS v4** (using `@tailwindcss/postcss`)
- **shadcn/ui** components (New York style variant)
- **Radix UI primitives** for accessible components
- **Lucide React** for icons
- **Geist font** (Sans and Mono variants)
- **Zod** for schema validation
- **React Hook Form** with resolvers
- **Vercel Analytics** for tracking

### Styling System

- Uses Tailwind CSS v4 with the new `@import "tailwindcss"` syntax
- CSS variables in OKLCH color space for theme colors
- Dark mode via `.dark` class
- Custom radius tokens (sm, md, lg, xl)
- Path alias `@/*` maps to project root

### Component Patterns

- Components use the `cn()` utility from `@/lib/utils` for conditional classes
- UI components follow shadcn/ui patterns with forwardRef and variants
- Form validation with react-hook-form + zod resolvers
- Icons from lucide-react library

## Build Configuration

### Next.js Config (`next.config.mjs`)

```javascript
{
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true }
}
```

**Important**: Build-time type checking and linting are disabled. Run these manually during development.

### TypeScript Config

- Target: ES6
- Module resolution: bundler
- Strict mode enabled
- Path alias: `@/*` → `./*`

## Important Notes

### Dependency Management

- **Must use `npm install --legacy-peer-deps`** due to React 19 incompatibility with some packages (notably `vaul@0.9.9`)
- Consider upgrading incompatible packages or downgrading to React 18 if issues arise

### Code Quality

- TypeScript and ESLint errors are ignored during builds
- Manually run `npm run lint` to check for issues
- Check types with `tsc --noEmit`

### Shadcn/ui Components

- Configuration in `components.json`
- Style: "new-york" variant
- Base color: neutral
- Uses CSS variables for theming
- RSC (React Server Components) enabled
