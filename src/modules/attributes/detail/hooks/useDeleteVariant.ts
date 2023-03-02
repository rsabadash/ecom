import { useCallback } from 'react';
import { deleteVariantApi } from '../api';

type UseDeleteVariant = (variantId: string | undefined) => {
  deleteVariant: () => Promise<void>;
};

export const useDeleteVariant: UseDeleteVariant = (
  variantId: string | undefined,
) => {
  const deleteVariant = useCallback(async () => {
    if (variantId) {
      await deleteVariantApi(variantId);
    }
  }, [variantId]);

  return { deleteVariant };
};
