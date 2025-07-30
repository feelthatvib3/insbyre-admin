export interface Category {
  id: string;
  slug: string;
  name: string;
}

export type CategoryWithoutId = Omit<Category, 'id'>;
export type PartialCategoryWithoutId = Partial<CategoryWithoutId>;
