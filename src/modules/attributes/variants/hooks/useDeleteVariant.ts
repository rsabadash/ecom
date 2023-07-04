import { useCallback } from 'react';

import { deleteVariantApi } from '../api';

type UseDeleteVariantReturn = {
  deleteVariant: () => Promise<void>;
};

export const useDeleteVariant = (
  variantId: string | undefined,
): UseDeleteVariantReturn => {
  const deleteVariant = useCallback(async () => {
    if (variantId) {
      await deleteVariantApi(variantId);
    }
  }, [variantId]);

  return { deleteVariant };
};
