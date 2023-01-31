import { useCallback } from 'react';
import { updateCategoryApi } from '../api';
import { CategoryPatchData } from '../types';

type UseUpdateCategory = () => {
  updateCategory: (data: CategoryPatchData) => Promise<void>;
};

export const useUpdateCategory: UseUpdateCategory = () => {
  const updateCategory = useCallback(async (data: CategoryPatchData) => {
    await updateCategoryApi(data);
  }, []);

  return { updateCategory };
};
