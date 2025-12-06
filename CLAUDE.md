# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

trelea-songs is a YouTube-to-MP3 converter platform. Users can search for YouTube videos, convert them to MP3 format, and download the audio files.

**Guests** can search and download MP3s immediately without an account.

**Registered users** get a personal music library to save, stream, and re-download their converted songs.

## Commands

```bash
yarn dev        # Start development server
yarn build      # Type-check and build for production
yarn lint       # Run ESLint
yarn preview    # Preview production build
```

## Architecture

**Stack**: React 19 + Vite + TypeScript + TailwindCSS v4 + shadcn/ui (new-york style)

**Key features**:
- React Compiler enabled via babel-plugin-react-compiler
- Dark theme by default (next-themes with class strategy)
- Path alias: `@/*` maps to `./src/*`

**Directory structure**:
```
src/
├── core/       # App-wide setup (router.tsx)
├── pages/      # Route components (home, login, register)
├── components/ # Reusable components (theme-provider.tsx)
│   └── ui/     # shadcn/ui components (add via: npx shadcn@latest add <component>)
├── lib/        # Utilities (utils.ts with cn() helper)
└── hooks/      # Custom React hooks
```

**Routing**: React Router v7 with `createBrowserRouter` in `src/core/router.tsx`

**Styling**: Use `cn()` from `@/lib/utils` to merge Tailwind classes. CSS variables defined in `src/index.css` for theming.