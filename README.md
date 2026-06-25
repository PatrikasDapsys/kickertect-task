# Sports Standings App

A Single Page Application (SPA) to manage sports tournaments. It hosts three
standings tables — **Premier League**, **Eurobasket**, and **Wimbledon** — where
users can add teams/players, record match results, and see a standings table
that auto-updates and sorts by points.

## Tech Stack

- **React 18 + TypeScript + Vite**
- **State:** Redux Toolkit (one slice per tournament)
- **Persistence:** `redux-persist` with a localStorage `WebStorage` adapter
- **Styling:** SCSS with CSS variables per theme, mobile-first
- **Fonts:** `@fontsource` (Inter/Roboto, Montserrat, Space Mono)
- **Icons:** FontAwesome; **Flags:** `flag-icons` CSS library
- **Tooling:** ESLint + Prettier

## Getting Started

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev

# Type-check and build for production
npm run build

# Preview the production build
npm run preview
```

## Scripts

| Script            | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start the Vite dev server                |
| `npm run build`   | Type-check and build for production      |
| `npm run preview` | Preview the production build locally     |
| `npm run lint`    | Run ESLint                               |
| `npm run format`  | Format source files with Prettier        |

## Project Structure

```
src/
  app/                  # composition root: App.tsx, main.tsx, store, hooks, storage
  features/
    scoreboards/        # scoreboards feature
      components/        # scoreboard UI (per tournament + shared)
      store/            # Redux Toolkit slices, selectors, standings logic, initial state
  styles/               # global SCSS: tokens, mixins, breakpoints, fonts
```
