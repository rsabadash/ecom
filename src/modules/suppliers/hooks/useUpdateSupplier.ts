import { useCallback } from 'react';

import { updateSupplierApi } from '../api';
import { SupplierPatchData } from '../types';

type UseUpdateSupplierReturn = {
  updateSupplier: (data: SupplierPatchData) => Promise<void>;
};

export const useUpdateSupplier = (): UseUpdateSupplierReturn => {
  const updateSupplier = useCallback(async (data: SupplierPatchData) => {
    await updateSupplierApi(data);
  }, []);

  return { updateSupplier };
};
