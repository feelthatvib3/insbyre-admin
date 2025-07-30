import { useMutation } from '@tanstack/react-query';

import {
  createCategory,
  deleteCategoryById,
  updateCategoryById
} from 'shared/api/category/category.api';
import {
  GET_CATEGORIES_QUERY_KEY,
  GET_CATEGORY_BY_ID_QUERY_KEY
} from 'shared/api/category/category.queries';
import { queryClient } from 'shared/api/query-client';
import type { Category, CategoryWithoutId, PartialCategoryWithoutId } from 'shared/types/category';

interface UseCreateCategoryMutationParams {
  options?: {
    onSuccess?: (c: Category) => void;
    onError?: (e: Error) => void;
  };
}

export function useCreateCategoryMutation({ options }: UseCreateCategoryMutationParams) {
  return useMutation({
    mutationFn: async (c: CategoryWithoutId) => await createCategory(c),
    onSuccess: (c: Category) => {
      queryClient.invalidateQueries({ queryKey: [GET_CATEGORIES_QUERY_KEY] });
      options?.onSuccess?.(c);
    },
    onError: (err) => {
      options?.onError?.(err instanceof Error ? err : new Error('Произошла неизвестная ошибка.'));
    }
  });
}

interface UseUpdateCategoryMutationParams {
  categoryId: Category['id'];
  options?: {
    onSuccess?: (c: Category) => void;
    onError?: (e: Error) => void;
  };
}

export function useUpdateCategoryMutation({
  categoryId,
  options
}: UseUpdateCategoryMutationParams) {
  return useMutation({
    mutationFn: (newData: PartialCategoryWithoutId) => updateCategoryById({ categoryId, newData }),
    onSuccess: (newCategory: Category) => {
      queryClient.invalidateQueries({ queryKey: [GET_CATEGORIES_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [GET_CATEGORY_BY_ID_QUERY_KEY, categoryId] });
      options?.onSuccess?.(newCategory);
    },
    onError: (err) => {
      options?.onError?.(err instanceof Error ? err : new Error('Произошла неизвестная ошибка.'));
    }
  });
}

interface UseDeleteCategoryByIdMutationParams {
  options?: {
    onSuccess?: () => void;
    onError?: (e: Error) => void;
  };
}

export function useDeleteCategoryById({ options }: UseDeleteCategoryByIdMutationParams) {
  return useMutation({
    mutationFn: (categoryId: Category['id']) => deleteCategoryById(categoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_CATEGORIES_QUERY_KEY] });
      options?.onSuccess?.();
    },
    onError: (err) => {
      options?.onError?.(err instanceof Error ? err : new Error('Произошла неизвестная ошибка.'));
    }
  });
}
