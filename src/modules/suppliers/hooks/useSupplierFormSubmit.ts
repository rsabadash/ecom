import { useCallback } from 'react';
import { SupplierFormValues } from '../types';
import { useCreateSupplier } from './useCreateSupplier';
import { useUpdateSupplier } from './useUpdateSupplier';

type UseSupplierFormSubmitReturn = {
  handleFormSubmit: (values: SupplierFormValues) => Promise<void>;
};

export const useSupplierFormSubmit = (
  id: string | undefined,
): UseSupplierFormSubmitReturn => {
  const { createSupplier } = useCreateSupplier();
  const { updateSupplier } = useUpdateSupplier();

  const handleFormSubmit = useCallback(
    async (values: SupplierFormValues) => {
      if (id) {
        await updateSupplier({ ...values, id });
      } else {
        await createSupplier(values);
      }
    },
    [createSupplier, id, updateSupplier],
  );

  return { handleFormSubmit };
};
