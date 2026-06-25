# Sports Standings App

Manage three tournaments — **Premier League**, **Eurobasket**, and **Wimbledon** — from a single page. Add teams or players, enter match results, and watch the standings update in real time.

**Repository:** [github.com/PatrikasDapsys/kickertech-task](https://github.com/PatrikasDapsys/kickertech-task)

## Overview

The app renders three independent scoreboards side by side (stacked on mobile). Each has its own Redux slice, visual theme, and UI layout, but they all share the same underlying forms, standings logic, and persistence layer.

On first visit, each tournament loads with sample teams/players and matches. After that, state is kept in `localStorage` and restored on refresh.

## Scoreboards

### Premier League

Neutral palette with Inter/Roboto. The add-team and add-score forms are always visible above a full standings table (P, W, D, L, Pts).

### Eurobasket

Green and orange styling with Montserrat. Teams are picked from a country list and shown with flag icons. Add forms open from toggle buttons; recorded matches appear in a results list above the standings.

### Wimbledon

Monospace Space Mono typography with a compact layout. Players are added by name. The standings table uses win/loss icons instead of a draws column (M, W, L, Pts).

## Scoring

| Result | Points |
| ------ | ------ |
| Win    | 3      |
| Draw   | 1      |
| Loss   | 0      |

Each pairing can only be played once. Standings sort by points, then wins.

## Tech Stack

- React 19, TypeScript, Vite
- Redux Toolkit + `redux-persist`
- SCSS with per-tournament design tokens
- Font Awesome, `flag-icons`, `@fontsource`
- Vitest + React Testing Library
- ESLint, Prettier

## Getting Started

Requires Node.js 18+.

```bash
git clone git@github.com:PatrikasDapsys/kickertech-task.git
cd kickertech-task
npm install
npm run dev
```

The dev server runs at `http://localhost:5173` by default.

```bash
npm run build    # type-check + production build
npm run preview  # serve dist/ locally
```

## Scripts

| Script | Description |
| ------ | ----------- |
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run test` | Tests in watch mode |
| `npm run test:run` | Single test run |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |

## Project Structure

```
src/
  app/                    # Store, persist config, typed hooks
  features/scoreboards/
    components/
      premier-league/
      eurobasket/
      wimbledon/
      shared/             # ScoreboardTable, TournamentForm
    store/
      slices/             # One slice per tournament
      initialState/       # Seed data
      computeStandings.ts
      selectors.ts
  styles/                 # Global SCSS tokens and mixins
  test/                   # Vitest setup and helpers
```

Standings are derived on read — slices store only `teams` and `matches`, and selectors run `computeStandings` to produce the table rows.

## Deployment

Build the static output and deploy `dist/` to any static host (Vercel, Netlify, GitHub Pages, etc.). If serving from a subpath, set the `base` option in `vite.config.ts`.

```bash
npm run build
```
