import { useCallback } from 'react';
import { deleteWarehouseApi } from '../api';

type UseDeleteWarehouseReturn = {
  deleteWarehouse: () => Promise<void>;
};

export const useDeleteWarehouse = (
  id: string | undefined,
): UseDeleteWarehouseReturn => {
  const deleteWarehouse = useCallback(async () => {
    if (id) {
      await deleteWarehouseApi(id);
    }
  }, [id]);

  return { deleteWarehouse };
};
