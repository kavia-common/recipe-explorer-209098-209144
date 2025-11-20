<template>
  <div>
    <header class="surface" style="position: sticky; top: 0; z-index: 40;">
      <nav class="container" style="display: flex; align-items: center; gap: 1rem; padding: 0.75rem 0;">
        <NuxtLink to="/" aria-label="Home" class="brand" style="display:flex; align-items:center; gap:0.5rem;">
          <span aria-hidden="true" style="width: 10px; height: 10px; border-radius: 9999px; background: var(--color-primary); box-shadow: 0 0 0 4px rgba(37,99,235,0.15);"></span>
          <strong style="font-size: 1.1rem;">Ocean Recipes</strong>
        </NuxtLink>
        <div style="flex:1;"></div>
        <SearchBar aria-label="Search recipes" />
      </nav>
    </header>
    <main class="container" style="padding: 1rem 0 2rem;">
      <slot />
    </main>
    <footer class="container" style="padding: 2rem 0; color: var(--color-muted);">
      <p>© {{ new Date().getFullYear() }} Ocean Recipes</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import '@/assets/css/theme.css';
import SearchBar from '@/components/SearchBar.vue';
</script>
