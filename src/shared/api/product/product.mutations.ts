import { useMutation } from '@tanstack/react-query';

import {
  createProduct,
  deleteProductById,
  updateProductById
} from 'shared/api/product/product.api';
import {
  GET_PRODUCTS_QUERY_KEY,
  GET_PRODUCT_BY_ID_QUERY_KEY
} from 'shared/api/product/product.queries';
import { queryClient } from 'shared/api/query-client';
import type {
  PartialProductWithoutIdAndDate,
  Product,
  ProductWithoutIdAndDate
} from 'shared/types/product';

interface UseCreateProductMutationParams {
  options?: {
    onSuccess?: (p: Product) => void;
    onError?: (e: Error) => void;
  };
}

export function useCreateProductMutation({ options }: UseCreateProductMutationParams) {
  return useMutation({
    mutationFn: async (p: ProductWithoutIdAndDate) => await createProduct(p),
    onSuccess: (p: Product) => {
      queryClient.invalidateQueries({ queryKey: [GET_PRODUCTS_QUERY_KEY] });
      options?.onSuccess?.(p);
    },
    onError: (err) => {
      options?.onError?.(err instanceof Error ? err : new Error('Произошла неизвестная ошибка.'));
    }
  });
}

interface UseUpdateProductMutationParams {
  productId: Product['id'];
  options?: {
    onSuccess?: (p: Product) => void;
    onError?: (e: Error) => void;
  };
}

export function useUpdateProductMutation({ productId, options }: UseUpdateProductMutationParams) {
  return useMutation({
    mutationFn: (newData: PartialProductWithoutIdAndDate) =>
      updateProductById({ productId, newData }),
    onSuccess: (newProduct: Product) => {
      queryClient.invalidateQueries({ queryKey: [GET_PRODUCTS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [GET_PRODUCT_BY_ID_QUERY_KEY, productId] });
      options?.onSuccess?.(newProduct);
    },
    onError: (err) => {
      options?.onError?.(err instanceof Error ? err : new Error('Произошла неизвестная ошибка.'));
    }
  });
}

interface UseDeleteProductByIdMutationParams {
  options?: {
    onSuccess?: () => void;
    onError?: (e: Error) => void;
  };
}

export function useDeleteProductById({ options }: UseDeleteProductByIdMutationParams) {
  return useMutation({
    mutationFn: (productId: Product['id']) => deleteProductById(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_PRODUCTS_QUERY_KEY] });
      options?.onSuccess?.();
    },
    onError: (err) => {
      options?.onError?.(err instanceof Error ? err : new Error('Произошла неизвестная ошибка.'));
    }
  });
}
