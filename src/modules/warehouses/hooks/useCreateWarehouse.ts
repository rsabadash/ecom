import { useCallback } from 'react';

import { createWarehouseApi } from '../api';
import { WarehousePostData, WarehousePostResponse } from '../types';

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
