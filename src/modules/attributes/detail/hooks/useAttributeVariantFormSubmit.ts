import { useCallback } from 'react';
import {
  AttributeUrlParams,
  AttributeVariantPatchData,
  AttributeVariantPostData,
} from '../types';
import { useCreateAttributeVariant } from './useCreateAttributeVariant';
import { useUpdateAttributeVariant } from './useUpdateAttributeVariant';
import { AttributeVariantFormValues } from '../types';
import { useParams } from 'react-router-dom';

type UseAttributeVariantFormSubmit = (props: { variantId?: string }) => {
  handleFormSubmit: (values: AttributeVariantFormValues) => Promise<void>;
};

export const useAttributeVariantFormSubmit: UseAttributeVariantFormSubmit = ({
  variantId,
}) => {
  const { attributeId } = useParams<AttributeUrlParams>();

  const { createAttributeVariant } = useCreateAttributeVariant();
  const { updateAttributeVariant } = useUpdateAttributeVariant();

  const handleFormSubmit = useCallback(
    async (values: AttributeVariantFormValues) => {
      const patchData: AttributeVariantPatchData = {
        ...values,
        variantId,
      };

      const postData: AttributeVariantPostData = {
        ...values,
        attributeId,
      };

      if (variantId) {
        await updateAttributeVariant(patchData);
      }

      if (attributeId) {
        await createAttributeVariant(postData);
      }
    },
    [variantId, attributeId, updateAttributeVariant, createAttributeVariant],
  );

  return {
    handleFormSubmit,
  };
};
