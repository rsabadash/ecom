import { useCallback } from 'react';

import { createWarehouseProductsApi } from '../api';
import {
  WarehouseProductsPostData,
  WarehouseProductsPostResponse,
} from '../types';

type UseCreateWarehouseProducts = () => {
  createWarehouseProducts: (
    data: WarehouseProductsPostData,
  ) => Promise<WarehouseProductsPostResponse | undefined>;
};

export const useCreateWarehouseProducts: UseCreateWarehouseProducts = () => {
  const createWarehouseProducts = useCallback(
    async (data: WarehouseProductsPostData) => {
      return await createWarehouseProductsApi(data);
    },
    [],
  );

  return { createWarehouseProducts };
};
