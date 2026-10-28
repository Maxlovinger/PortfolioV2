# maxlovinger

My personal portfolio site: CS + Applied Math at Haverford, MEng Data Science at Penn.

Live: [maxlovinger.vercel.app](https://maxlovinger.vercel.app)

## Sections

1. **Hero**
2. **Projects** - The Holmes Project, NQ Futures Trading System, OpenClaw, Bayes AI Assistant, Schemer, Aperture Ratings
3. **About** - background, skill matrix, relevant coursework
4. **Experience** - Capital One, Penn, FINRA, TAMID, Athletes Untapped
5. **Contact**

Behind everything is a light Three.js background (slow-moving particles and faint chart-style grid lines that follow the mouse).

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- Framer Motion for scroll and reveal animations
- Three.js via React Three Fiber, Drei, and postprocessing
- Fonts: BTC Diamond Wood (self-hosted), Playfair Display, Dancing Script

## Run it

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Layout

```
app/                    layout (metadata, fonts) and the single page
components/sections/    Hero, Projects, About, Experience, Contact
components/three/       3D background
components/Nav.tsx      top navigation
lib/motion.ts           shared animation presets
public/fonts/           BTC Diamond Wood
```
