import { useCallback } from 'react';

import {
  SupplierFormSubmitAction,
  SupplierFormValues,
} from '../../common/types';
import { useCreateSupplier } from './useCreateSupplier';

type UseSupplierAddFormSubmitReturn = {
  handleFormSubmit: SupplierFormSubmitAction;
};

export const useSupplierAddFormSubmit = (): UseSupplierAddFormSubmitReturn => {
  const { createSupplier } = useCreateSupplier();

  const handleFormSubmit = useCallback(
    async (values: SupplierFormValues) => {
      await createSupplier(values);
    },
    [createSupplier],
  );

  return { handleFormSubmit };
};
