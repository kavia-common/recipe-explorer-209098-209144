<template>
  <div class="surface" style="padding: 0.75rem 1rem; display: flex; gap: 0.75rem; align-items: center; margin: 1rem 0;">
    <div style="display:flex; gap:0.5rem; align-items:center;">
      <label for="category" style="color: var(--color-muted);">Category</label>
      <select id="category" class="input" v-model="localCategory" aria-label="Filter by category" style="min-width: 10rem;">
        <option value="">All</option>
        <option v-for="opt in categories" :key="opt" :value="opt">{{ opt }}</option>
      </select>
    </div>

    <div style="display:flex; gap:0.5rem; align-items:center;">
      <label for="sort" style="color: var(--color-muted);">Sort</label>
      <select id="sort" class="input" v-model="localSort" aria-label="Sort recipes" style="min-width: 10rem;">
        <option value="title">Title</option>
        <option value="time">Total Time</option>
        <option value="rating">Rating</option>
      </select>
    </div>

    <div style="flex:1;"></div>

    <button :class="btnClass('ghost')" @click="apply" aria-label="Apply filters">Apply</button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { btnClass } from '@/utils/theme';

const props = defineProps<{
  initialCategory?: string
  initialSort?: string
}>();

const emit = defineEmits<{
  (e: 'change', payload: { category: string; sort: string }): void
}>();

const categories = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack'];

const localCategory = ref(props.initialCategory || '');
const localSort = ref(props.initialSort || 'title');

watch(() => props.initialCategory, (v) => localCategory.value = v || '');
watch(() => props.initialSort, (v) => localSort.value = v || 'title');

function apply() {
  emit('change', { category: localCategory.value, sort: localSort.value });
}
</script>
