import { useCallback } from 'react';
import { deleteAttributeVariantApi } from '../api';

type UseDeleteAttributeVariant = (variantId: string | undefined) => {
  deleteAttributeVariant: () => Promise<void>;
};

export const useDeleteAttributeVariant: UseDeleteAttributeVariant = (
  variantId: string | undefined,
) => {
  const deleteAttributeVariant = useCallback(async () => {
    if (variantId) {
      await deleteAttributeVariantApi(variantId);
    }
  }, [variantId]);

  return { deleteAttributeVariant };
};
