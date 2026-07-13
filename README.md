# Vishnu R — Portfolio

Futuristic personal portfolio for an AI Engineer & Full Stack Developer. Dark glassmorphism, aurora backgrounds, and premium motion design.

**Stack:** Next.js 15 · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide Icons

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (fully static)
```

## Editing content

All portfolio content lives in **`lib/data.ts`** — profile info, skills, projects, experience, timeline, and nav links. Edit that one file to update the site.

Things to personalize:

- [x] `public/resume.pdf` — done
- [x] `lib/data.ts` → `web3formsKey` — done (contact form live)
- [ ] `lib/data.ts` → `goatcounter` — free analytics: sign up at goatcounter.com, paste your site code
- [ ] `lib/data.ts` → confirm `profile.linkedin` handle
- [ ] `lib/data.ts` → per-project `github` / `demo` URLs (buttons fall back to profile/contact until set)
- [ ] `components/sections/About.tsx` — swap the "VR" monogram circle for a photo if you like

## Features

- Typing hero animation, magnetic buttons, mouse parallax
- Aurora + particle + grid animated background (canvas, GPU-friendly)
- Command palette (⌘K / Ctrl+K), scroll progress bar, active-section navbar
- Project filtering with 3D tilt + spotlight cards
- Scroll-driven timeline, animated counters, infinite tech marquee
- Fully responsive, keyboard accessible, respects `prefers-reduced-motion`
