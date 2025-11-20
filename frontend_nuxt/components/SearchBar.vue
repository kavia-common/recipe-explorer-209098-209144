<template>
  <form class="search surface" @submit.prevent="onSubmit" role="search" aria-label="Recipe search" style="display:flex; gap:0.5rem; padding:0.25rem;">
    <label for="search-input" class="visually-hidden">Search</label>
    <input
      id="search-input"
      v-model="term"
      class="input"
      :placeholder="placeholder"
      aria-label="Search recipes"
      :aria-invalid="false"
    />
    <button type="submit" :class="btnClass('primary')" aria-label="Submit search">
      Search
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { btnClass } from '@/utils/theme';

const props = withDefaults(defineProps<{
  placeholder?: string
}>(), {
  placeholder: 'Search recipes...'
});

const route = useRoute();
const router = useRouter();

const term = ref<string>((route.query.q as string) || '');

function onSubmit() {
  router.push({
    path: '/search',
    query: {
      q: term.value || undefined,
      category: route.query.category || undefined,
      sort: route.query.sort || 'title',
    }
  });
}
</script>

<style>
.visually-hidden {
  position: absolute !important;
  height: 1px; width: 1px;
  overflow: hidden;
  clip: rect(1px,1px,1px,1px);
  white-space: nowrap;
}
</style>
