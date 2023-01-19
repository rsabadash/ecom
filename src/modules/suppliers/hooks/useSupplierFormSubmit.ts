import { useCallback } from 'react';
import { SupplierFormValues } from '../types';
import { useCreateSupplier } from './useCreateSupplier';
import { useUpdateSupplier } from './useUpdateSupplier';

type UseSupplierFormSubmit = (id: string | undefined) => {
  handleFormSubmit: (data: SupplierFormValues) => void;
};

export const useSupplierFormSubmit: UseSupplierFormSubmit = (id) => {
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
