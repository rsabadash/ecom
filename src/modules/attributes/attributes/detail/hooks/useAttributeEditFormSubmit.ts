import { useCallback } from 'react';

import {
  AttributeFormSubmitAction,
  AttributeFormValues,
  AttributePatchData,
} from '../../common/types';
import { useUpdateAttribute } from '../../detail/hooks';

type UseAttributeEditFormSubmitProps = {
  id: string | undefined;
  name: string | undefined;
  onFormUpdated: () => void;
};

type UseAttributeEditFormSubmitReturn = {
  handleFormSubmit: AttributeFormSubmitAction;
};

export const useAttributeEditFormSubmit = ({
  id,
  name,
  onFormUpdated,
}: UseAttributeEditFormSubmitProps): UseAttributeEditFormSubmitReturn => {
  const { updateAttribute } = useUpdateAttribute({ name, onSuccess: onFormUpdated });

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
