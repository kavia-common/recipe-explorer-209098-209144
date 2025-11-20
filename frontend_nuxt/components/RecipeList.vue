<template>
  <div>
    <div v-if="loading" class="grid sm-2 md-3 lg-4" role="status" aria-live="polite">
      <div v-for="i in 8" :key="i" class="skeleton" style="height: 240px;"></div>
    </div>

    <div v-else-if="error" class="surface" style="padding: 1rem;">
      <p role="alert">We couldn't load recipes: {{ error }}</p>
      <button :class="btnClass('ghost')" @click="$emit('retry')">Retry</button>
    </div>

    <div v-else-if="recipes.length === 0" class="surface" style="padding: 1rem;">
      <p>{{ emptyMessage }}</p>
    </div>

    <div v-else class="grid sm-2 md-3 lg-4">
      <RecipeCard v-for="r in recipes" :key="r.id" :recipe="r" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Recipe, RecipeQuery } from '@/types/recipe';
import { btnClass } from '@/utils/theme';
import RecipeCard from './RecipeCard.vue';

defineProps<{
  query?: RecipeQuery
  loading?: boolean
  error?: string | null
  recipes: Recipe[]
  emptyMessage?: string
}>();

defineEmits<{
  (e: 'retry'): void
}>();
</script>
