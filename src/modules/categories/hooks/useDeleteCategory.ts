import { useCallback } from 'react';
import { deleteCategoryApi } from '../api';

type UseDeleteCategory = (id: string | undefined) => {
  deleteCategory: () => void;
};

export const useDeleteCategory: UseDeleteCategory = (
  id: string | undefined,
) => {
  const deleteCategory = useCallback(async () => {
    if (id) {
      await deleteCategoryApi(id);
    }
  }, [id]);

  return { deleteCategory };
};
