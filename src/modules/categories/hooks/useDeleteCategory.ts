import { useCallback } from 'react';
import { deleteCategoryApi } from '../api';

type UseDeleteCategoryReturn = {
  deleteCategory: () => Promise<void>;
};

export const useDeleteCategory = (
  id: string | undefined,
): UseDeleteCategoryReturn => {
  const deleteCategory = useCallback(async () => {
    if (id) {
      await deleteCategoryApi(id);
    }
  }, [id]);

  return { deleteCategory };
};
