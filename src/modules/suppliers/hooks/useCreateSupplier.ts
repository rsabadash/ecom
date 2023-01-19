import { useCallback } from 'react';
import { createSupplierApi } from '../api';
import { SupplierPostData } from '../types';

type UseCreateSupplier = () => {
  createSupplier: (data: SupplierPostData) => void;
};

export const useCreateSupplier: UseCreateSupplier = () => {
  const createSupplier = useCallback(async (data: SupplierPostData) => {
    await createSupplierApi(data);
  }, []);

  return { createSupplier };
};
