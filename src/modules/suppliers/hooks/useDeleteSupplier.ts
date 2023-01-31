import { useCallback } from 'react';
import { deleteSupplierApi } from '../api';

type UseDeleteSupplier = (id: string | undefined) => {
  deleteSupplier: () => Promise<void>;
};

export const useDeleteSupplier: UseDeleteSupplier = (
  id: string | undefined,
) => {
  const deleteSupplier = useCallback(async () => {
    if (id) {
      await deleteSupplierApi(id);
    }
  }, [id]);

  return { deleteSupplier };
};
