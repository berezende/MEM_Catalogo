# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev              # Start Vite dev server at http://localhost:5173
npm run build            # Generate sitemap then build production bundle to dist/
npm run generate-sitemap # Pull university URLs from Supabase and write public/sitemap.xml
npm run lint             # Run ESLint
npm start                # Preview the production build
```

Docker:
```bash
docker-compose up        # Build and serve via Nginx + Cloudflare tunnel
```

There are no automated tests. `scripts/test-supabase.js` is a manual connectivity check for Supabase.

## Environment Setup

Copy `.env.example` to `.env` and fill in:
```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

## Architecture

This is a **client-side SPA** (React 18 + Vite + TypeScript). Note: `vike`, `vike-react`, and `vike-server` are installed and `pages/+config.ts` exists, but SSR is **not integrated** — there is no Vike plugin in `vite.config.ts` and no renderer directory. Whether to enable SSR is an open decision.

### Routing

`src/App.tsx` defines two top-level routes via React Router:
- `/` → `HomePage`
- `/cursos/*` → `CatalogRouter` (lazy-loaded)

`src/components/CatalogRouter.tsx` parses the wildcard path segment and dispatches to either `UniversityCatalog` (listing) or `UniversityDetail` (single university), based on URL shape:

| URL pattern | Renders |
|---|---|
| `/cursos` | Full catalog |
| `/cursos/publica` or `/cursos/particular` | Type-filtered catalog |
| `/cursos/:state` | State-filtered catalog |
| `/cursos/:state/:city` | State + city filtered |
| `/cursos/:state/:city/:slug` | University detail |
| `/cursos/q=:search` | Search results |

### Data

- **Supabase client**: `src/lib/supabase.ts` — queries the `Instituicoes` table (fields: `id`, `name`, `cidade`, `estado`, `tipo`, `logo`, `ranking`)
- **IBGE API**: `UniversityCatalog` fetches city lists dynamically from Brazil's public IBGE API based on selected state
- **URL helpers**: `src/utils/urlHelpers.ts` — `slugify()` for accent-safe URL slugs, `isBrazilianState()` / `getOriginalStateName()` for validating and mapping the 27 Brazilian state names used in URL segments

### Path Alias

`@/` resolves to `src/` (configured in `vite.config.ts` and `tsconfig.app.json`).

### Build Output

Vite splits vendor chunks into `vendor-react`, `vendor-supabase`, and `vendor-ui` (framer-motion + lucide-react) for caching efficiency. Output goes to `dist/`, served by Nginx in Docker or as a static SPA on Vercel.
