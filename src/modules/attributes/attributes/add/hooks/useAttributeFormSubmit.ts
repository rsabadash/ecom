import { useCallback } from 'react';

import {
  AttributeFormValues,
  AttributePatchData,
  AttributePostData,
} from '../types';
import { useCreateAttribute } from './useCreateAttribute';
import { useUpdateAttribute } from './useUpdateAttribute';

type UseAttributeFormSubmitProps = {
  id?: string;
};

type UseAttributeFormSubmitReturn = {
  handleFormSubmit: (values: AttributeFormValues) => Promise<void>;
};

export const useAttributeFormSubmit = ({
  id,
}: UseAttributeFormSubmitProps): UseAttributeFormSubmitReturn => {
  const { createAttribute } = useCreateAttribute();
  const { updateAttribute } = useUpdateAttribute();

  const handleFormSubmit = useCallback(
    async (values: AttributeFormValues) => {
      const data: AttributePostData | AttributePatchData = {
        ...values,
      };

      if (id) {
        await updateAttribute({ id, ...data });
      } else {
        await createAttribute(data);
      }
    },
    [createAttribute, id, updateAttribute],
  );

  return {
    handleFormSubmit,
  };
};
