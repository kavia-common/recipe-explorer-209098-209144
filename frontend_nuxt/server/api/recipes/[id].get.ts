import { defineEventHandler, getRouterParam, createError } from 'h3';
import type { Recipe } from '@/types/recipe';
import { MOCK_RECIPES } from '@/server/utils/mockRecipes';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id') as string;
  const recipe = MOCK_RECIPES.find(r => r.id === id);
  if (!recipe) {
    throw createError({ statusCode: 404, statusMessage: 'Recipe not found' });
  }
  return recipe as Recipe;
});
