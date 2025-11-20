import type { Recipe } from '@/types/recipe';

export const MOCK_RECIPES: Recipe[] = [
  {
    id: '1',
    title: 'Lemon Herb Grilled Salmon',
    description: 'Bright and zesty salmon with fresh herbs, perfect for a quick dinner.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop',
    category: 'Dinner',
    servings: 2,
    times: { prep: 10, cook: 12, total: 22 },
    ingredients: [
      { name: 'Salmon fillets', quantity: '2' },
      { name: 'Lemon', quantity: '1' },
      { name: 'Olive oil', quantity: '2 tbsp' },
      { name: 'Fresh dill', quantity: '1 tbsp' },
      { name: 'Salt & pepper' }
    ],
    steps: [
      { order: 1, text: 'Preheat grill to medium-high heat.' },
      { order: 2, text: 'Brush salmon with olive oil, season with salt, pepper, and dill.' },
      { order: 3, text: 'Grill 5–6 minutes per side until flaky.' }
    ],
    rating: 4.7
  },
  {
    id: '2',
    title: 'Blueberry Breakfast Parfait',
    description: 'Creamy yogurt layered with fresh blueberries and granola.',
    image: 'https://images.unsplash.com/photo-1473091534298-04dcbce3278c?q=80&w=1200&auto=format&fit=crop',
    category: 'Breakfast',
    servings: 1,
    times: { prep: 5, cook: 0, total: 5 },
    ingredients: [
      { name: 'Greek yogurt', quantity: '1 cup' },
      { name: 'Blueberries', quantity: '1/2 cup' },
      { name: 'Granola', quantity: '1/3 cup' },
      { name: 'Honey', quantity: '1 tbsp' }
    ],
    steps: [
      { order: 1, text: 'Layer yogurt, blueberries, and granola in a cup.' },
      { order: 2, text: 'Drizzle with honey and serve.' }
    ],
    rating: 4.5
  },
  {
    id: '3',
    title: 'Citrus Shrimp Tacos',
    description: 'Tangy shrimp with fresh slaw and avocado in warm tortillas.',
    image: 'https://images.unsplash.com/photo-1565299729374-4b3b1b0e2d5e?q=80&w=1200&auto=format&fit=crop',
    category: 'Lunch',
    servings: 2,
    times: { prep: 15, cook: 10, total: 25 },
    ingredients: [
      { name: 'Shrimp', quantity: '250g' },
      { name: 'Tortillas', quantity: '4' },
      { name: 'Cabbage slaw', quantity: '1 cup' },
      { name: 'Lime', quantity: '1' },
      { name: 'Avocado', quantity: '1' }
    ],
    steps: [
      { order: 1, text: 'Sauté shrimp with a squeeze of lime until pink.' },
      { order: 2, text: 'Warm tortillas and assemble with slaw and sliced avocado.' }
    ],
    rating: 4.6
  },
  {
    id: '4',
    title: 'Dark Chocolate Mousse',
    description: 'Rich, silky mousse with a hint of espresso.',
    image: 'https://images.unsplash.com/photo-1605478371321-1ef8f0f3e975?q=80&w=1200&auto=format&fit=crop',
    category: 'Dessert',
    servings: 4,
    times: { prep: 20, cook: 5, total: 25 },
    ingredients: [
      { name: 'Dark chocolate', quantity: '200g' },
      { name: 'Heavy cream', quantity: '1 cup' },
      { name: 'Eggs', quantity: '2' },
      { name: 'Espresso', quantity: '1 tsp' }
    ],
    steps: [
      { order: 1, text: 'Melt chocolate and whisk with espresso.' },
      { order: 2, text: 'Fold in whipped cream and beaten eggs, chill until set.' }
    ],
    rating: 4.8
  }
];

export function filterAndSort(recipes: Recipe[], q?: string, category?: string, sort?: string): Recipe[] {
  let items = recipes.slice();
  if (q) {
    const needle = q.toLowerCase();
    items = items.filter(r =>
      r.title.toLowerCase().includes(needle) ||
      (r.description || '').toLowerCase().includes(needle) ||
      r.ingredients.some(i => i.name.toLowerCase().includes(needle))
    );
  }
  if (category) {
    items = items.filter(r => r.category === category);
  }
  if (sort === 'time') {
    items.sort((a, b) => a.times.total - b.times.total);
  } else if (sort === 'rating') {
    items.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  } else {
    items.sort((a, b) => a.title.localeCompare(b.title));
  }
  return items;
}
