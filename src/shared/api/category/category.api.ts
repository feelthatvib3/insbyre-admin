import { supabase } from 'shared/api/supabase';
import type { Category, CategoryWithoutId } from 'shared/types/category';

export async function createCategory({ name, slug }: CategoryWithoutId): Promise<Category> {
  const { data, error } = await supabase
    .from('categories')
    .insert<CategoryWithoutId>({ name, slug })
    .select()
    .single<Category>();
  if (error) {
    if (error.code === '23505') {
      throw new Error('Такая категория уже существует. Попробуйте другое имя или слаг.');
    }
    throw new Error('Ошибка при создании категории. Попробуйте позже.');
  }
  return data;
}

export async function getCategoryById(categoryId: string): Promise<Category> {
  const { data, error } = await supabase
    .from('categories')
    .select()
    .eq('id', categoryId)
    .single<Category>();
  if (error) {
    throw new Error('Произошла ошибка при получении категории. Попробуйте позже.');
  }
  return data;
}

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase.from('categories').select();
  if (error) {
    throw new Error('Произошла ошибка при получении списка категорий. Попробуйте позже.');
  }
  return data;
}

export async function updateCategoryById({
  categoryId,
  newData
}: {
  categoryId: string;
  newData: Partial<CategoryWithoutId>;
}): Promise<Category> {
  const { data, error } = await supabase
    .from('categories')
    .update(newData)
    .eq('id', categoryId)
    .select()
    .single<Category>();
  if (error) {
    throw new Error('Произошла ошибка при обновлении категории. Попробуйте позже.');
  }
  return data;
}

export async function deleteCategoryById(categoryId: string): Promise<void> {
  const { error } = await supabase.from('categories').delete().eq('id', categoryId);

  if (error) {
    if (error.code === '23503') {
      throw new Error('Невозможно удалить категорию — она используется в других данных.');
    }
    throw new Error('Ошибка при удалении категории. Попробуйте позже.');
  }
}
