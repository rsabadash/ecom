import { useCallback } from 'react';
import { VariantPatchData } from '../types';
import { updateVariantApi } from '../api';

type UseUpdateAttributeReturn = {
  updateVariant: (data: VariantPatchData) => Promise<void>;
};

export const useUpdateVariant = (): UseUpdateAttributeReturn => {
  const updateVariant = useCallback(async (data: VariantPatchData) => {
    await updateVariantApi(data);
  }, []);

  return { updateVariant };
};
