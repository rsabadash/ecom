import { useCallback } from 'react';
import { VariantPatchData } from '../types';
import { updateVariantApi } from '../api';

type UseUpdateAttribute = () => {
  updateVariant: (data: VariantPatchData) => Promise<void>;
};

export const useUpdateVariant: UseUpdateAttribute = () => {
  const updateVariant = useCallback(async (data: VariantPatchData) => {
    await updateVariantApi(data);
  }, []);

  return { updateVariant };
};
