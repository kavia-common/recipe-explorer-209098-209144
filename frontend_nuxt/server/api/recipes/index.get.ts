import { defineEventHandler, getQuery } from 'h3';
import type { Paginated, Recipe } from '@/types/recipe';
import { MOCK_RECIPES, filterAndSort } from '@/server/utils/mockRecipes';

export default defineEventHandler(async (event) => {
  // If an external API base is configured, this mock endpoint can still serve,
  // but client-side will call external API via composable. This exists as fallback.
  const query = getQuery(event);
  const q = (query.q as string) || '';
  const category = (query.category as string) || '';
  const sort = (query.sort as string) || 'title';
  const page = Number(query.page || 1);
  const pageSize = Number(query.pageSize || 24);

  const filtered = filterAndSort(MOCK_RECIPES, q, category, sort);
  const start = (page - 1) * pageSize;
  const items = filtered.slice(start, start + pageSize);

  const res: Paginated<Recipe> = {
    items,
    total: filtered.length,
    page,
    pageSize,
  };

  return res;
});
