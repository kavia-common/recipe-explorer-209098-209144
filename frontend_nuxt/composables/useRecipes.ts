import { ref, computed } from 'vue';
import type { Recipe, Paginated, RecipeQuery } from '@/types/recipe';
import { useRuntime } from './useRuntime';

/**
 * PUBLIC_INTERFACE
 * Provides methods to list and retrieve recipes with caching across SSR/CSR.
 */
export function useRecipes() {
  const { apiBase } = useRuntime();
  const listCache = useState<Record<string, Paginated<Recipe>>>('recipe-list-cache', () => ({}));
  const itemCache = useState<Record<string, Recipe>>('recipe-item-cache', () => ({}));
  const loading = ref(false);
  const error = ref<string | null>(null);

  const base = computed(() => apiBase.value || '');

  function queryKey(q?: RecipeQuery) {
    const params = new URLSearchParams();
    if (q?.q) params.set('q', q.q);
    if (q?.category) params.set('category', q.category);
    if (q?.sort) params.set('sort', q.sort);
    if (q?.page) params.set('page', String(q.page));
    if (q?.pageSize) params.set('pageSize', String(q.pageSize));
    return params.toString();
  }

  async function fetchList(q?: RecipeQuery) {
    const key = queryKey(q);
    if (listCache.value[key]) {
      return listCache.value[key];
    }
    loading.value = true;
    error.value = null;
    try {
      const { data, error: fetchErr } = await useAsyncData<Paginated<Recipe>>(
        `recipes-${key || 'all'}`,
        async () => {
          // When apiBase is not set, rely on mock server routes
          const endpoint = base.value
            ? `${base.value.replace(/\/$/, '')}/recipes?${key}`
            : `/api/recipes?${key}`;
          return await $fetch<Paginated<Recipe>>(endpoint);
        },
        { server: true }
      );
      if (fetchErr.value) throw fetchErr.value;
      const result = data.value as Paginated<Recipe>;
      listCache.value[key] = result;
      return result;
    } catch (e: any) {
      error.value = e?.message || 'Failed to fetch recipes';
      throw e;
    } finally {
      loading.value = false;
    }
  }

  async function fetchById(id: string) {
    if (itemCache.value[id]) return itemCache.value[id];
    loading.value = true;
    error.value = null;
    try {
      const { data, error: fetchErr } = await useAsyncData<Recipe>(
        `recipe-${id}`,
        async () => {
          const endpoint = base.value
            ? `${base.value.replace(/\/$/, '')}/recipes/${encodeURIComponent(id)}`
            : `/api/recipes/${encodeURIComponent(id)}`;
          return await $fetch<Recipe>(endpoint);
        },
        { server: true }
      );
      if (fetchErr.value) throw fetchErr.value;
      const result = data.value as Recipe;
      itemCache.value[id] = result;
      return result;
    } catch (e: any) {
      error.value = e?.message || 'Failed to fetch recipe';
      throw e;
    } finally {
      loading.value = false;
    }
  }

  return {
    loading,
    error,
    fetchList,
    fetchById,
  };
}
