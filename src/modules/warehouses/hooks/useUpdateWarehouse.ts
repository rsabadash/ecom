import { useCallback } from 'react';
import { updateWarehouseApi } from '../api';
import { WarehousePatchData } from '../types';

type UseUpdateCategoryReturn = {
  updateWarehouse: (data: WarehousePatchData) => Promise<void>;
};

export const useUpdateWarehouse = (): UseUpdateCategoryReturn => {
  const updateWarehouse = useCallback(async (data: WarehousePatchData) => {
    await updateWarehouseApi(data);
  }, []);

  return { updateWarehouse };
};
