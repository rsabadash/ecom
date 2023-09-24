import { useCallback } from 'react';

import {
  AttributeFormSubmitAction,
  AttributeFormValues,
} from '../../common/types';
import { useUpdateAttribute } from '../../detail/hooks';
import { AttributePatchData } from '../types';

type UseAttributeEditFormSubmitProps = {
  id?: string;
  onFormUpdated: () => void;
};

type UseAttributeEditFormSubmitReturn = {
  handleFormSubmit: AttributeFormSubmitAction;
};

export const useAttributeEditFormSubmit = ({
  id,
  onFormUpdated,
}: UseAttributeEditFormSubmitProps): UseAttributeEditFormSubmitReturn => {
  const { updateAttribute } = useUpdateAttribute({ onFormUpdated });

  const handleFormSubmit = useCallback(
    async (values: AttributeFormValues) => {
      if (id) {
        const data: AttributePatchData = {
          id,
          ...values,
        };

        await updateAttribute(data);
      }
    },
    [id, updateAttribute],
  );

  return {
    handleFormSubmit,
  };
};
