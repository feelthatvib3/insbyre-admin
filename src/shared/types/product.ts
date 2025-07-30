export interface Product {
  id: string;
  slug: string;
  sku: string;
  name: string;
  price: number;
  thumbnail: string;
  images: string[];
  in_stock: boolean;
  description: string;
  care: string | null;
  materials: string | null;
  fit: string | null;
  shipping: string | null;
  returns: string | null;
  sizes: string[] | null;
  categories: string[];
  created_at: string;
  updated_at: string;
}

export type ProductWithoutIdAndDate = Omit<Product, 'id' | 'created_at' | 'updated_at'>;
export type PartialProductWithoutIdAndDate = Partial<ProductWithoutIdAndDate>;
