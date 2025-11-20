# Ocean Recipes - Feature Notes

- Ocean Professional theme with blue primary and amber secondary accents.
- Mock API fallback is available at:
  - GET /api/recipes
  - GET /api/recipes/:id
- Configure an external API by setting `NUXT_PUBLIC_API_BASE` in `.env`.
- Composables:
  - `useRuntime` for runtime config.
  - `useRecipes` for fetching and caching with SSR-safe `useAsyncData`.
- Accessibility: ALT text for images, focus-visible styles via ring, ARIA roles/labels for search, alerts, and loading states.
