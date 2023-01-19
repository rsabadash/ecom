import { useCallback } from 'react';
import { updateSupplierApi } from '../api';
import { SupplierPatchData } from '../types';

type UseUpdateSupplier = () => {
  updateSupplier: (data: SupplierPatchData) => void;
};

export const useUpdateSupplier: UseUpdateSupplier = () => {
  const updateSupplier = useCallback(async (data: SupplierPatchData) => {
    await updateSupplierApi(data);
  }, []);

  return { updateSupplier };
};
