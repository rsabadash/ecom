import { useCallback } from 'react';
import { AttributeVariantPatchData } from '../types';
import { updateAttributeVariantApi } from '../api';

type UseUpdateAttribute = () => {
  updateAttributeVariant: (data: AttributeVariantPatchData) => Promise<void>;
};

export const useUpdateAttributeVariant: UseUpdateAttribute = () => {
  const updateAttributeVariant = useCallback(
    async (data: AttributeVariantPatchData) => {
      await updateAttributeVariantApi(data);
    },
    [],
  );

  return { updateAttributeVariant };
};
