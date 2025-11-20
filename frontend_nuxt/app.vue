<template>
  <NuxtLayout>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
  titleTemplate: (title) => title ? `${title} · Ocean Recipes` : 'Ocean Recipes',
  meta: [
    { name: 'description', content: 'Browse, search and view delicious recipes with a modern Nuxt 3 interface.' },
  ],
  bodyAttrs: {
    class: 'ocean-theme'
  }
});
</script>
