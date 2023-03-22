import { useCallback } from 'react';
import { WarehousePostData, WarehousePostResponse } from '../types';
import { createWarehouseApi } from '../api';

type UseCreateWarehouseReturn = {
  createWarehouse: (
    data: WarehousePostData,
  ) => Promise<WarehousePostResponse | undefined>;
};

export const useCreateWarehouse = (): UseCreateWarehouseReturn => {
  const createWarehouse = useCallback(async (data: WarehousePostData) => {
    return await createWarehouseApi(data);
  }, []);

  return { createWarehouse };
};
