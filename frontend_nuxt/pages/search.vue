<template>
  <div class="page-search">
    <h1 style="margin-top: 1rem;">Search results</h1>
    <p class="surface" style="padding: 0.75rem 1rem; color: var(--color-muted);">
      Showing results for: <strong>"{{ q }}"</strong>
    </p>

    <FiltersBar
      :initial-category="category"
      :initial-sort="sort"
      @change="onFiltersChange"
    />

    <section aria-live="polite">
      <RecipeList
        :query="computedQuery"
        :loading="loading"
        :error="error"
        :recipes="recipes?.items || []"
        @retry="refetch"
        empty-message="No recipes matched your search."
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import FiltersBar from '@/components/FiltersBar.vue';
import RecipeList from '@/components/RecipeList.vue';
import { useRecipes } from '@/composables/useRecipes';
import type { RecipeQuery } from '@/types/recipe';

const route = useRoute();
const router = useRouter();
const { fetchList, loading, error } = useRecipes();

const q = computed(() => (route.query.q as string) || '');
const category = computed(() => (route.query.category as string) || '');
const sort = computed(() => ((route.query.sort as string) || 'title') as RecipeQuery['sort']);

const computedQuery = computed<RecipeQuery>(() => ({
  q: q.value,
  category: category.value,
  sort: sort.value,
  page: Number(route.query.page || 1),
  pageSize: 24,
}));

const { data: recipes, refresh } = await useAsyncData(
  () => `search-${q.value}-${category.value}-${sort.value}-${route.query.page || 1}`,
  async () => await fetchList(computedQuery.value),
  { watch: [computedQuery] }
);

function onFiltersChange(payload: { category: string; sort: string }) {
  router.push({
    path: '/search',
    query: {
      q: q.value || undefined,
      category: payload.category || undefined,
      sort: payload.sort || undefined,
      page: route.query.page || undefined,
    },
  });
}

async function refetch() {
  await refresh();
}
</script>
