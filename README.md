# Almond Mom Kitchen

> Elite AI kitchen companion for the modern, health-conscious family. Organic luxury living, powered by Next.js.

## Features

- **Recipe Journal** — 20 clean-eating recipes with search, dietary tag filters, and interactive ingredient checklists
- **Fridge Rescue** — AI-powered pantry audit from a photo
- **Grocery Upgrader** — swap your shopping list for elite organic alternatives
- **Clean Label Verified** — flags hidden gums, seed oils, and artificial sweeteners
- **Dashboard** — personal hub with AI tools and meal finder

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS + custom design tokens |
| Animation | Framer Motion |
| Auth | Supabase Auth |
| CMS | Sanity |
| Analytics | Vercel Analytics + Speed Insights |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

| Route | Description |
|-------|-------------|
| `/` | App home (meal feed) |
| `/welcome` | Marketing landing |
| `/mission` | Brand mission / manifesto |
| `/blog` | Recipe journal with search + filters |
| `/blog/[slug]` | Recipe detail with affiliate shop CTAs |
| `/journal` | Zaya Health Journal (SEO articles) |
| `/journal/[slug]` | Journal article |
| `/dashboard` | Logged-in hub |
| `/fridge-rescue` | AI fridge scanner |
| `/shop` | Grocery upgrader |
| `/desk` | Desk by Seb services |
| `/login` | Auth page |

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_SITE_URL=https://almondmom.online
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
```

Built by Esteban J. Lemus · [almondmom.online](https://almondmom.online)
