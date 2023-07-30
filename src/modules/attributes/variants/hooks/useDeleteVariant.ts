import { useCallback } from 'react';
import { deleteVariantApi } from '../api';

type UseDeleteVariantProps = {
  attributeId: string | undefined;
  variantId: string | undefined;
};

type UseDeleteVariantReturn = {
  deleteVariant: () => Promise<void>;
};

export const useDeleteVariant = ({
  attributeId,
  variantId,
}: UseDeleteVariantProps): UseDeleteVariantReturn => {
  const deleteVariant = useCallback(async () => {
    if (attributeId && variantId) {
      await deleteVariantApi({ attributeId, variantId });
    }
  }, [attributeId, variantId]);

  return { deleteVariant };
};
