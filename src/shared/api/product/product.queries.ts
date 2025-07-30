import { useQuery } from '@tanstack/react-query';

import { getProductById, getProducts } from 'shared/api/product/product.api';

export const GET_PRODUCTS_QUERY_KEY = 'PRODUCTS';
export const GET_PRODUCT_BY_ID_QUERY_KEY = 'PRODUCT_BY_ID';

export function useProductsQuery() {
  return useQuery({
    queryKey: [GET_PRODUCTS_QUERY_KEY],
    queryFn: getProducts
  });
}

export function useGetProductByIdQuery(productId: string) {
  return useQuery({
    queryKey: [GET_PRODUCT_BY_ID_QUERY_KEY, productId],
    queryFn: () => getProductById(productId)
  });
}
