import { useCallback } from 'react';
import { updateCategoryApi } from '../api';
import { CategoryPatchData } from '../types';

type UseUpdateCategoryReturn = {
  updateCategory: (data: CategoryPatchData) => Promise<void>;
};

export const useUpdateCategory = (): UseUpdateCategoryReturn => {
  const updateCategory = useCallback(async (data: CategoryPatchData) => {
    await updateCategoryApi(data);
  }, []);

  return { updateCategory };
};
