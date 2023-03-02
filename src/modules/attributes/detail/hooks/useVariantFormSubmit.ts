import { useCallback } from 'react';
import { VariantPatchData, VariantPostData, VariantFormValues } from '../types';
import { useCreateVariant } from './useCreateVariant';
import { useUpdateVariant } from './useUpdateVariant';

type UseVariantFormSubmitProps = {
  attributeId?: string;
  variantId?: string;
};

type UseVariantFormSubmit = (props: UseVariantFormSubmitProps) => {
  handleFormSubmit: (values: VariantFormValues) => Promise<void>;
};

export const useVariantFormSubmit: UseVariantFormSubmit = ({
  attributeId,
  variantId,
}) => {
  const { createVariant } = useCreateVariant();
  const { updateVariant } = useUpdateVariant();

  const handleFormSubmit = useCallback(
    async (values: VariantFormValues) => {
      if (variantId) {
        const patchData: VariantPatchData = {
          ...values,
          variantId,
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
