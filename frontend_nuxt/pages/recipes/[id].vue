<template>
  <article v-if="recipe" class="surface" style="padding: 1rem; margin: 1rem 0;">
    <nav style="margin-bottom: 1rem;">
      <NuxtLink :to="backHref" class="btn ghost" aria-label="Back to results">
        ← Back
      </NuxtLink>
    </nav>

    <div style="display: grid; gap: 1rem; grid-template-columns: 1fr; align-items: start;">
      <img
        :src="recipe.image"
        :alt="`Image of ${recipe.title}`"
        style="width: 100%; max-height: 360px; object-fit: cover; border-radius: 0.5rem;"
      />
      <header>
        <h1 style="margin: 0 0 0.25rem;">{{ recipe.title }}</h1>
        <p class="badge" aria-label="Category badge">{{ recipe.category }}</p>
        <p style="color: var(--color-muted); margin-top: 0.5rem;">{{ recipe.description }}</p>
      </header>

      <section class="surface" style="padding: 1rem;">
        <h2>At a glance</h2>
        <ul style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 0.5rem; list-style: none; padding: 0; margin: 0;">
          <li><strong>Prep:</strong> {{ recipe.times.prep }}m</li>
          <li><strong>Cook:</strong> {{ recipe.times.cook }}m</li>
          <li><strong>Total:</strong> {{ recipe.times.total }}m</li>
          <li><strong>Servings:</strong> {{ recipe.servings }}</li>
          <li v-if="recipe.rating !== undefined"><strong>Rating:</strong> {{ recipe.rating?.toFixed(1) }}</li>
        </ul>
      </section>

      <section>
        <h2>Ingredients</h2>
        <ul>
          <li v-for="(ing, idx) in recipe.ingredients" :key="idx">
            <span v-if="ing.quantity" aria-label="quantity">{{ ing.quantity }}</span>
            <span> {{ ing.name }}</span>
          </li>
        </ul>
      </section>

      <section>
        <h2>Steps</h2>
        <ol>
          <li v-for="step in recipe.steps" :key="step.order">
            {{ step.text }}
          </li>
        </ol>
      </section>
    </div>
  </article>

  <div v-else class="surface" style="padding: 1rem; margin: 1rem 0;">
    <div v-if="loading" class="skeleton" style="height: 200px;"></div>
    <p v-else-if="error" role="alert">Failed to load recipe. <button class="btn ghost" @click="reload">Retry</button></p>
    <p v-else>No recipe found.</p>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useRecipes } from '@/composables/useRecipes';
import type { Recipe } from '@/types/recipe';

const route = useRoute();
const router = useRouter();
const id = route.params.id as string;

const { fetchById, loading, error } = useRecipes();

const { data: recipeData, refresh } = await useAsyncData(
  () => `recipe-detail-${id}`,
  async () => await fetchById(id)
);

const recipe = computed<Recipe | null>(() => recipeData.value || null);
const backHref = computed(() => {
  // back to search if q present, else home
  const hasSearch = !!route.query.q || !!route.query.category;
  return hasSearch ? { path: '/search', query: route.query } : { path: '/' };
});

function reload() {
  refresh();
}
</script>
