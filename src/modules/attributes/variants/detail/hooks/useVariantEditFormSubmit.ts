import { useCallback } from 'react';

import { VariantFormValues, VariantPatchData } from '../../common/types';
import { useUpdateVariant } from '../../detail/hooks';

type UseVariantFormSubmitProps = {
  name: string | undefined;
  variantId: string | undefined;
  attributeId: string | undefined;
  onFormUpdated: () => void;
};

type UseVariantFormSubmitReturn = {
  handleFormSubmit: (values: VariantFormValues) => Promise<void>;
};

export const useVariantEditFormSubmit = ({
  name,
  variantId,
  attributeId,
  onFormUpdated,
}: UseVariantFormSubmitProps): UseVariantFormSubmitReturn => {
  const { updateVariant } = useUpdateVariant({
    name,
    onSuccess: onFormUpdated,
  });

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
    },
    [variantId, attributeId, updateVariant],
  );

  return {
    handleFormSubmit,
  };
};
