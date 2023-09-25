import { useCallback } from 'react';

import {
  VariantPostData,
  VariantFormSubmitAction,
  VariantFormValues,
} from '../../common/types';
import { useCreateVariant } from './useCreateVariant';

type UseVariantFormSubmitProps = {
  attributeId: string | undefined;
};

type UseVariantFormSubmitReturn = {
  handleFormSubmit: VariantFormSubmitAction;
};

export const useVariantAddFormSubmit = ({
  attributeId,
}: UseVariantFormSubmitProps): UseVariantFormSubmitReturn => {
  const { createVariant } = useCreateVariant();

  const handleFormSubmit = useCallback(
    async (values: VariantFormValues) => {
      if (attributeId) {
        const postData: VariantPostData = {
          ...values,
          attributeId,
        };

        await createVariant(postData);
      }
    },
    [attributeId, createVariant],
  );

  return {
    handleFormSubmit,
  };
};
