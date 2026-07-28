# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install          # required on a fresh clone — node_modules is not committed
npm run dev          # dev server on http://localhost:3000
npm run build        # production build
npm run start        # serve the production build (run build first)
npm run lint         # eslint
npx tsc --noEmit     # typecheck (no npm script for this)
npx prettier --write .   # format (no npm script for this)
```

There is no test framework installed — no test runner, no test files, no `npm test`.

## Architecture

Next.js 16 App Router + React 19 + TypeScript (strict) + Tailwind CSS v4. Client-side only; there is no database, no ORM, and no auth.

**Two top-level source roots**, which is easy to trip over:

- `app/` — routes only (`/`, `/about`, `/projects`, `/resume`, `/contact`, `/learnings`), plus `layout.tsx`, `globals.css`, and `app/api/`.
- `src/` — all components and libs. The `@/*` path alias maps to `./src/*` (**not** to the repo root), so `@/components/Header` resolves to `src/components/Header`.

Pages are self-contained: each `app/*/page.tsx` is a 120–320 line `'use client'` component that inlines its own data (project lists, timeline entries, skill lists) as local `const` arrays. There is no shared content/data layer. To change portfolio content, edit the page that renders it.

`app/layout.tsx` renders `<Header />` and `<ChatBot />` around every page, so the nav and the floating chat widget exist on all routes without per-page wiring.

**The header is `fixed` and `<main>` has no top padding**, so every page must clear it itself. Two coupled constants:

- `Header.tsx` pins the nav to `h-16 sm:h-20`. `MobileMenu.tsx` anchors its backdrop and panel to `top-16 sm:top-20`. Change one and you must change the other, or the mobile menu detaches from the header.
- Each page carries its own `pt-24 sm:pt-28 lg:pt-32` (the landing page uses more, `pt-28 sm:pt-36 lg:pt-40`, because its hero is vertically centred). A new route with no top padding will render underneath the header.

### Theming

The site is **dark-first**. `app/globals.css` defines the dark palette on `:root` and overrides it inside `@media (prefers-color-scheme: light)`; both are exposed as Tailwind utilities through `@theme inline`.

**Never use raw Tailwind greys (`bg-white`, `text-gray-600`, `border-gray-200`) or `dark:` variants.** They only work in one mode. Style against the semantic tokens instead, and both modes stay correct for free:

| Token | Use |
|---|---|
| `bg-bg` | page background |
| `bg-surface` / `bg-surface-2` | cards, raised panels |
| `bg-surface-hover` | hover state on a surface |
| `border-border` / `border-border-strong` | hairlines, outlines (also `ring-border`) |
| `text-fg-strong` / `text-fg` / `text-muted` | headings / body / secondary |
| `text-accent`, `bg-accent`, `bg-accent-soft` | the orange accent |
| `text-accent-contrast` | text sitting *on* an accent fill |

Two things that bite on a dark background:

- **Gradient-filled text** (`from-orange-600 to-orange-800 bg-clip-text text-transparent`) renders nearly black. Headings use solid `text-fg-strong` with an accent word.
- **Pale decorative tints** (`orange-100`/`orange-200`) turn into grey smudges. Use `accent/20`-style alpha instead.

Fonts: Geist Sans/Mono are loaded in `layout.tsx` and applied via `font-sans` on `<body>`. `globals.css` previously hardcoded `font-family: Arial`, which silently overrode them — don't reintroduce a `font-family` on `body`.

### Component conventions

- Folder-per-component under `src/components/` with an `index.ts` re-export (`Header/`, `Footer/`, `ChatBot/`, `UI/`). Import via the folder: `@/components/ChatBot`.
- Tailwind classes are composed with `cn()` from `@/lib/utils` (clsx + tailwind-merge) — use it rather than template-string concatenation so conflicting classes merge correctly.
- Animation is Framer Motion (`motion`, `AnimatePresence`); icons are `lucide-react`. Both are already the established choice — don't introduce a second library for either.
- Most components need `'use client'` because nearly everything uses hooks or Framer Motion.
- Hover-only affordances need a touch fallback. Cards use the `[@media(hover:hover)]:` variant to show a hover overlay on pointer devices and an inline equivalent everywhere else — see the tech-stack list in `app/projects/page.tsx`.
- Modals render through `createPortal(…, document.body)` with a `mounted` state guard to avoid SSR hydration mismatch — see `src/components/EmailModal.tsx`. Follow that pattern for new overlays.

### ChatBot

`src/components/ChatBot/` is UI-complete but has **no backend**. `ChatBot.tsx` holds all state and, on send, does a `setTimeout(1000)` lookup against `presetResponses.ts` — a `Record<string, {content, action?}>` keyed by the **exact preset question string**. Anything not matching that map returns a hardcoded placeholder. Preset answers are markdown strings rendered by `react-markdown`; an optional `action` (`"contact" | "view-resume" | "projects"`) renders a CTA button via `ActionButton.tsx`.

So: editing a preset question label without editing the matching key in `presetResponses.ts` silently breaks that response.

`docs/chatbot-plan.md` is a 30-step aspirational plan (FastAPI, LangGraph, RAG, voice, MCP). None of it is implemented. Treat it as a roadmap, not a description of the code.

### Resume flow

- `GET /api/resume/download` (`app/api/resume/download/route.ts`) streams `public/documents/Jalaj_Sharma_Resume.pdf` with a `Content-Disposition: attachment` header.
- `src/components/Header/NavMenu.tsx` also POSTs to `/api/resume/send` from the email-capture modal — **that route does not exist**, so email requests currently 404. `RESUME_REQUESTS.md` documents the intended DB-backed behavior and an `npm run resume-requests` CLI; neither the route, the database, nor the script exists yet.

## Known documentation drift

Several docs describe things that are not in the repo. Verify against `package.json` before relying on them:

- `README.md` claims Neon DB, Prisma, LangGraph/LangChain, a Timeline component, and Contact/About/Projects component folders. None are installed or present. Actual deps: next, react, framer-motion, lucide-react, react-markdown, clsx, tailwind-merge.
- `Steps.md` (20 phases) and `docs/chatbot-plan.md` are forward-looking plans.
- `src/components/Footer/Footer.tsx` exists but is never rendered — `layout.tsx` does not include it.
- `.gitignore` ignores `/src/generated/prisma`, left over from the planned Prisma setup.

## Style

Prettier is configured with `singleQuote: true`, `semi: true`, `printWidth: 80`, plus `prettier-plugin-tailwindcss` for class sorting. The existing code is inconsistent about this — `app/` files largely use double quotes and long lines. Match the file you're editing rather than reformatting it wholesale.
