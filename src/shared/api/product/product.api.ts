import { supabase } from 'shared/api/supabase';
import type { Product, ProductWithoutIdAndDate } from 'shared/types/product';

export async function createProduct(product: ProductWithoutIdAndDate): Promise<Product> {
  const { data, error } = await supabase
    .from('products')
    .insert<ProductWithoutIdAndDate>(product)
    .select()
    .single<Product>();
  if (error) {
    if (error.code === '23505') {
      throw new Error('Такой товар уже существует.');
    }
    throw new Error('Ошибка при создании товара. Попробуйте позже.');
  }
  return data;
}

export async function getProductById(productId: string): Promise<Product> {
  const { data, error } = await supabase
    .from('products')
    .select()
    .eq('id', productId)
    .single<Product>();
  if (error) {
    throw new Error('Произошла ошибка при получении товара. Попробуйте позже.');
  }
  return data;
}

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase.from('products').select();
  if (error) {
    throw new Error('Произошла ошибка при получении списка товаров. Попробуйте позже.');
  }
  return data;
}

export async function updateProductById({
  productId,
  newData
}: {
  productId: string;
  newData: Partial<ProductWithoutIdAndDate>;
}): Promise<Product> {
  const { data, error } = await supabase
    .from('products')
    .update<Partial<ProductWithoutIdAndDate>>(newData)
    .eq('id', productId)
    .select()
    .single<Product>();
  if (error) {
    throw new Error('Ошибка при обновлении товара. Попробуйте позже.');
  }
  return data;
}

export async function deleteProductById(productId: string): Promise<void> {
  const { error } = await supabase.from('products').delete().eq('id', productId);

  if (error) {
    if (error.code === '23503') {
      throw new Error('Невозможно удалить товар — он используется в других данных.');
    }
    throw new Error('Ошибка при удалении товара. Попробуйте позже.');
  }
}
