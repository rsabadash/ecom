import { useCallback } from 'react';
import { createCategoryApi } from '../api';
import { CategoryPostData, CategoryPostResponse } from '../types';

type UseCreateCategory = () => {
  createCategory: (
    data: CategoryPostData,
  ) => Promise<CategoryPostResponse | undefined>;
};

export const useCreateCategory: UseCreateCategory = () => {
  const createCategory = useCallback(async (data: CategoryPostData) => {
    return await createCategoryApi(data);
  }, []);

  return { createCategory };
};
