# Ocean Recipes — Nuxt 3 Frontend

Ocean Recipes is a Nuxt 3 application that lets users browse, search, and view recipes with a modern “Ocean Professional” theme. It ships with a local mock API for development and can be pointed at a real backend by setting a single environment variable.

## Overview

The app provides:
- A home page with featured browsing and quick filters.
- A search results page with query, category, and sort controls.
- A recipe detail page with ingredients and step-by-step instructions.
- A consistent, accessible UI with keyboard focus styles, ARIA labels, alt text on images, and loading/error states.

Primary code locations:
- Pages: `pages/index.vue`, `pages/search.vue`, `pages/recipes/[id].vue`
- Components: `components/RecipeCard.vue`, `components/RecipeList.vue`, `components/FiltersBar.vue`, `components/SearchBar.vue`
- Composables: `composables/useRecipes.ts`, `composables/useRuntime.ts`
- Theme/CSS: `assets/css/theme.css`, `utils/theme.ts`
- Mock API (Nitro server routes): `server/api/recipes/index.get.ts`, `server/api/recipes/[id].get.ts` with data in `server/utils/mockRecipes.ts`
- Configuration: `nuxt.config.ts` (exposes runtimeConfig.public.apiBase)

## Pages and navigation

- Home (`/`): Shows a hero, optional filters, and a paginated grid of recipe cards. Data is fetched via `useRecipes().fetchList`.
- Search (`/search`): Mirrors the list experience but is driven by the `q` search term and filter query params. Also uses `useRecipes().fetchList`.
- Recipe Detail (`/recipes/:id`): Displays a single recipe via `useRecipes().fetchById`, including metadata, ingredients, and steps. Provides a back link that returns to search results when applicable.

## Theme

The “Ocean Professional” theme uses blue as primary and amber as secondary accents with a clean, modern layout:
- CSS variables and utility classes live in `assets/css/theme.css`.
- Reusable UI helpers (e.g., `btnClass`, `surfaceClass`) live in `utils/theme.ts`.
- The default layout (`layouts/default.vue`) imports the theme CSS, provides a top navigation with search, and wraps content in a container with card-like surfaces and subtle shadows.

## Data fetching and mock API fallback

This app supports two modes of data fetching controlled at runtime:

1) Mock API (default)  
- When no external API base is configured, `useRecipes` falls back to local server routes:
  - GET `/api/recipes` for list and search (supports `q`, `category`, `sort`, `page`, `pageSize`)
  - GET `/api/recipes/:id` for a single recipe
- The handlers are in `server/api/recipes/*.ts` and use `server/utils/mockRecipes.ts` for data.

2) Real API (external)  
- When `NUXT_PUBLIC_API_BASE` is set, `useRecipes` uses that base for requests:
  - List: `${NUXT_PUBLIC_API_BASE}/recipes?...`
  - Detail: `${NUXT_PUBLIC_API_BASE}/recipes/:id`
- With a real API configured, the local mock routes still exist, but the client never calls them because the composable points to the external base. In effect, the mock routes are bypassed by the frontend.

Implementation detail:
- `useRuntime.ts` exposes `apiBase` from `runtimeConfig.public.apiBase`.
- `nuxt.config.ts` maps `runtimeConfig.public.apiBase` to the environment variable `NUXT_PUBLIC_API_BASE` (or an empty string for default mock behavior).
- `useRecipes.ts` builds the request endpoint based on `apiBase`. If empty, it uses local `/api/*`; otherwise, it uses the external base.

## Environment variables

These public environment variables may be defined in `.env` for the frontend:

- NUXT_PUBLIC_API_BASE  
  Optional. When set, the app fetches data from a real API instead of the local mock endpoints. Example:
  ```
  NUXT_PUBLIC_API_BASE=https://api.example.com
  ```

- NUXT_PUBLIC_FEATURE_FLAGS  
  Optional JSON or comma-separated feature flags your deployment may use. While this starter does not currently read specific flags in code, you can add logic using `useRuntimeConfig().public` to toggle experimental UI or behaviors. Example:
  ```
  # JSON-style
  NUXT_PUBLIC_FEATURE_FLAGS={"newSearch":"enabled","animations":"off"}
  # or CSV-style (interpretation up to your app code)
  NUXT_PUBLIC_FEATURE_FLAGS=newSearch,animations
  ```

Other variables that might exist in your environment for broader setups but are not directly used by this app as shipped include:
- NUXT_PUBLIC_BACKEND_URL, NUXT_PUBLIC_FRONTEND_URL, NUXT_PUBLIC_WS_URL
- NUXT_PUBLIC_NODE_ENV, NUXT_PUBLIC_NEXT_TELEMETRY_DISABLED
- NUXT_PUBLIC_ENABLE_SOURCE_MAPS, NUXT_PUBLIC_PORT, NUXT_PUBLIC_TRUST_PROXY
- NUXT_PUBLIC_LOG_LEVEL, NUXT_PUBLIC_HEALTHCHECK_PATH, NUXT_PUBLIC_EXPERIMENTS_ENABLED

Only reference variables supported by your deployment tooling. This app explicitly uses `NUXT_PUBLIC_API_BASE` and can be extended to use `NUXT_PUBLIC_FEATURE_FLAGS`.

## Switching to a real API

To point the app at a real backend and bypass the mock API:
1) Set `NUXT_PUBLIC_API_BASE` to your API base URL (no trailing slash needed):
   ```
   NUXT_PUBLIC_API_BASE=https://api.example.com
   ```
2) Restart the dev server or rebuild for production.  
3) The composables will automatically call the external endpoints:
   - GET `https://api.example.com/recipes?...`
   - GET `https://api.example.com/recipes/:id`
The local mock routes remain available but will not be called when `NUXT_PUBLIC_API_BASE` is set.

## Local development

Install dependencies and run the dev server at http://localhost:3000:

```bash
# install
npm install

# start dev server
npm run dev
```

Nuxt dev server config (from `nuxt.config.ts`):
- Host: 0.0.0.0
- Port: 3000

## Production build and preview

Build a production bundle and preview locally:

```bash
# build
npm run build

# preview (serves the production build)
npm run preview
```

## Project structure (selected)

- `app.vue`: Applies document head and ensures the theme class is on the body.
- `layouts/default.vue`: Top navigation and shared layout structure.
- `pages/*`: Route-based pages (home, search, details).
- `components/*`: UI building blocks.
- `composables/*`: Data fetching and runtime config helpers.
- `assets/css/theme.css`: Theme variables, utilities, and base styles.
- `server/api/*`: Mock endpoints for development and fallback.

## Notes and assumptions

- If your real API requires CORS, ensure it allows the Nuxt dev or deployed origin. The project sets a permissive `Access-Control-Allow-Origin: *` header in `nitro.routeRules` for server responses from this app, but your actual API must also permit requests from the browser.
- The mock API is intentionally minimal and designed for quick iteration. For production, set `NUXT_PUBLIC_API_BASE` and depend on your real backend.
- For feature flags, consider normalizing the format (JSON or CSV) and parsing it at startup to keep behavior predictable across environments.

For detailed feature bullets and accessibility notes, also see `README_FEATURES.md`.
