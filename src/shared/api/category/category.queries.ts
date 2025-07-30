import { useQuery } from '@tanstack/react-query';

import { getCategories, getCategoryById } from 'shared/api/category/category.api';

export const GET_CATEGORIES_QUERY_KEY = 'CATEGORIES';
export const GET_CATEGORY_BY_ID_QUERY_KEY = 'CATEGORY_BY_ID';

export function useCategoriesQuery() {
  return useQuery({
    queryKey: [GET_CATEGORIES_QUERY_KEY],
    queryFn: getCategories
  });
}

export function useGetCategoryByIdQuery(categoryId: string) {
  return useQuery({
    queryKey: [GET_CATEGORY_BY_ID_QUERY_KEY, categoryId],
    queryFn: () => getCategoryById(categoryId)
  });
}
