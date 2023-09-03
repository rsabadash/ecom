import { useCallback } from 'react';

import { createCategoryApi } from '../api';
import { CategoryPostData, CategoryPostResponse } from '../types';

type UseCreateCategoryReturn = {
  createCategory: (
    data: CategoryPostData,
  ) => Promise<CategoryPostResponse | undefined>;
};

export const useCreateCategory = (): UseCreateCategoryReturn => {
  const createCategory = useCallback(async (data: CategoryPostData) => {
    return await createCategoryApi(data);
  }, []);

  return { createCategory };
};
