/**
 * Nuxt configuration for the Recipe app (Ocean Professional theme).
 * - Exposes runtimeConfig.public.apiBase derived from NUXT_PUBLIC_API_BASE or '' for mock fallback.
 */
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '',
    },
  },
  nitro: {
    routeRules: {
      "/**": {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      },
    },
  },
  vite: {
    server: {
      host: '0.0.0.0',
      allowedHosts: true,
      port: 3000,
    },
  },
});
