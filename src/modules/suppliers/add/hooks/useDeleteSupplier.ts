import { useCallback } from 'react';

import { deleteSupplierApi } from '../api';

type UseDeleteSupplierReturn = {
  deleteSupplier: () => Promise<void>;
};

export const useDeleteSupplier = (
  id: string | undefined,
): UseDeleteSupplierReturn => {
  const deleteSupplier = useCallback(async () => {
    if (id) {
      await deleteSupplierApi(id);
    }
  }, [id]);

  return { deleteSupplier };
};
