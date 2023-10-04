import { useCallback } from 'react';

import {
  AttributeFormSubmitAction,
  AttributeFormValues,
} from '../../common/types';
import { useCreateAttribute } from './useCreateAttribute';

type UseAttributeAddFormSubmitReturn = {
  handleFormSubmit: AttributeFormSubmitAction;
};

export const useAttributeAddFormSubmit =
  (): UseAttributeAddFormSubmitReturn => {
    const { createAttribute } = useCreateAttribute();

    const handleFormSubmit = useCallback(
      async (values: AttributeFormValues) => {
        await createAttribute(values);
      },
      [createAttribute],
    );

    return {
      handleFormSubmit,
    };
  };
