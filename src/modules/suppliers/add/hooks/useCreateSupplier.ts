import { useCallback } from 'react';

import { createSupplierApi } from '../api';
import { SupplierPostData, SupplierPostResponse } from '../types';

type UseCreateSupplierReturn = {
  createSupplier: (
    data: SupplierPostData,
  ) => Promise<SupplierPostResponse | undefined>;
};

export const useCreateSupplier = (): UseCreateSupplierReturn => {
  const createSupplier = useCallback(async (data: SupplierPostData) => {
    return await createSupplierApi(data);
  }, []);

  return { createSupplier };
};
