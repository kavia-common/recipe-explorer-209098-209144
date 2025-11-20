<template>
  <div class="page-home">
    <section class="hero surface" style="padding: 2rem; margin: 1rem 0; background: linear-gradient(90deg, rgba(37,99,235,0.08), #fff)">
      <h1 style="margin: 0 0 0.5rem;">Find your next favorite recipe</h1>
      <p style="margin: 0; color: var(--color-muted)">Explore carefully curated recipes with a modern, ocean-inspired design.</p>
    </section>

    <FiltersBar
      :initial-category="route.query.category as string || ''"
      :initial-sort="(route.query.sort as string) || 'title'"
      @change="onFiltersChange"
    />

    <section aria-live="polite" aria-busy="loading">
      <RecipeList
        :query="computedQuery"
        :loading="loading"
        :error="error"
        :recipes="recipes?.items || []"
        @retry="refetch"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import FiltersBar from '@/components/FiltersBar.vue';
import RecipeList from '@/components/RecipeList.vue';
import type { RecipeQuery } from '@/types/recipe';
import { useRecipes } from '@/composables/useRecipes';

const route = useRoute();
const router = useRouter();
const { fetchList, loading, error } = useRecipes();

const computedQuery = computed<RecipeQuery>(() => ({
  q: (route.query.q as string) || '',
  category: (route.query.category as string) || '',
  sort: ((route.query.sort as string) || 'title') as RecipeQuery['sort'],
  page: Number(route.query.page || 1),
  pageSize: 24,
}));

const { data: recipes, refresh } = await useAsyncData(
  'home-recipes',
  async () => await fetchList(computedQuery.value),
  { watch: [computedQuery] }
);

function onFiltersChange(payload: { category: string; sort: string }) {
  router.push({
    query: {
      ...route.query,
      category: payload.category || undefined,
      sort: payload.sort || undefined,
    },
  });
}

async function refetch() {
  await refresh();
}
</script>
