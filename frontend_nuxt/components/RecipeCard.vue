<template>
  <article class="surface" style="overflow:hidden;">
    <NuxtLink :to="`/recipes/${recipe.id}`" aria-label="Open recipe details">
      <img
        :src="recipe.image"
        :alt="`Image of ${recipe.title}`"
        style="width: 100%; height: 160px; object-fit: cover;"
      />
      <div style="padding: 0.75rem;">
        <h3 style="margin: 0 0 0.25rem; font-size: 1rem;">{{ recipe.title }}</h3>
        <p class="badge">{{ recipe.category }}</p>
        <p style="margin: 0.5rem 0 0; color: var(--color-muted); font-size: 0.9rem;">
          {{ recipe.times.total }}m • Serves {{ recipe.servings }}
        </p>
      </div>
    </NuxtLink>
  </article>
</template>

<script setup lang="ts">
import type { Recipe } from '@/types/recipe';

defineProps<{
  recipe: Recipe
}>();
</script>
