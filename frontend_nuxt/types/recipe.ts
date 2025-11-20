export interface Ingredient {
  name: string;
  quantity?: string;
}

export interface RecipeStep {
  order: number;
  text: string;
}

export interface RecipeTimes {
  prep: number;   // minutes
  cook: number;   // minutes
  total: number;  // minutes
}

export interface Recipe {
  id: string;
  title: string;
  description?: string;
  image: string;
  category: string;
  servings: number;
  times: RecipeTimes;
  ingredients: Ingredient[];
  steps: RecipeStep[];
  rating?: number;
}

/**
 * PUBLIC_INTERFACE
 * Query options for filtering and sorting recipes.
 */
export interface RecipeQuery {
  q?: string;
  category?: string;
  sort?: 'title' | 'time' | 'rating';
  page?: number;
  pageSize?: number;
}

/**
 * PUBLIC_INTERFACE
 * Generic API envelope for lists.
 */
export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}
