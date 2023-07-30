import { useCallback } from 'react';

import { updateVariantApi } from '../api';
import { VariantPatchData } from '../types';

type UseUpdateAttributeReturn = {
  updateVariant: (data: VariantPatchData) => Promise<void>;
};

export const useUpdateVariant = (): UseUpdateAttributeReturn => {
  const updateVariant = useCallback(async (data: VariantPatchData) => {
    await updateVariantApi(data);
  }, []);

  return { updateVariant };
};
