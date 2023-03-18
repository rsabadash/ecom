import { useCallback } from 'react';
import { SupplierFormValues } from '../types';
import { useCreateSupplier } from './useCreateSupplier';
import { useUpdateSupplier } from './useUpdateSupplier';

type UseSupplierFormSubmitReturn = {
  handleFormSubmit: (data: SupplierFormValues) => void;
};

export const useSupplierFormSubmit = (
  id: string | undefined,
): UseSupplierFormSubmitReturn => {
  const { createSupplier } = useCreateSupplier();
  const { updateSupplier } = useUpdateSupplier();

  const handleFormSubmit = useCallback(
    async (value: SupplierFormValues) => {
      if (id) {
        await updateSupplier({ ...value, id });
      } else {
        await createSupplier(value);
      }
    },
    [createSupplier, id, updateSupplier],
  );

  return { handleFormSubmit };
};
