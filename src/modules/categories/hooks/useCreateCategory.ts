import { useCallback } from 'react';
import { createCategoryApi } from '../api';
import { CategoryPostData } from '../types';

type UseCreateCategory = () => {
  createCategory: (data: CategoryPostData) => void;
};

export const useCreateCategory: UseCreateCategory = () => {
  const createCategory = useCallback(async (data: CategoryPostData) => {
    await createCategoryApi(data);
  }, []);

  return { createCategory };
};
