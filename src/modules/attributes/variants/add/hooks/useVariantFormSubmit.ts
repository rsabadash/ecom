import { useCallback } from 'react';

import { VariantFormValues, VariantPatchData, VariantPostData } from '../types';
import { useCreateVariant } from './useCreateVariant';
import { useUpdateVariant } from './useUpdateVariant';

type UseVariantFormSubmitProps = {
  attributeId?: string;
  variantId?: string;
};

type UseVariantFormSubmitReturn = {
  handleFormSubmit: (values: VariantFormValues) => Promise<void>;
};

export const useVariantFormSubmit = ({
  attributeId,
  variantId,
}: UseVariantFormSubmitProps): UseVariantFormSubmitReturn => {
  const { createVariant } = useCreateVariant();
  const { updateVariant } = useUpdateVariant();

  const handleFormSubmit = useCallback(
    async (values: VariantFormValues) => {
      if (variantId && attributeId) {
        const patchData: VariantPatchData = {
          ...values,
          variantId,
          attributeId,
        };

        return await updateVariant(patchData);
      }

      if (attributeId) {
        const postData: VariantPostData = {
          ...values,
          attributeId,
        };

        await createVariant(postData);
      }
    },
    [variantId, attributeId, updateVariant, createVariant],
  );

  return {
    handleFormSubmit,
  };
};
