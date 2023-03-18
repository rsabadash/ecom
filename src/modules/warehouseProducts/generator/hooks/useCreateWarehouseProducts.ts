import { useCallback } from 'react';
import {
  WarehouseProductsPostData,
  WarehouseProductsPostResponse,
} from '../types';
import { createWarehouseProductsApi } from '../api';

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
