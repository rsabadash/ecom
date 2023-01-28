import { useCallback } from 'react';
import { createSupplierApi } from '../api';
import { SupplierPostData, SupplierPostResponse } from '../types';

type UseCreateSupplier = () => {
  createSupplier: (
    data: SupplierPostData,
  ) => Promise<SupplierPostResponse | undefined>;
};

export const useCreateSupplier: UseCreateSupplier = () => {
  const createSupplier = useCallback(async (data: SupplierPostData) => {
    return await createSupplierApi(data);
  }, []);

  return { createSupplier };
};
