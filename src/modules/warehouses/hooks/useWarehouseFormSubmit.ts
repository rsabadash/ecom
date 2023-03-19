import { useCallback } from 'react';
import { WarehouseFormValues } from '../types';
import { useCreateWarehouse } from './useCreateWarehouse';

type UseWarehouseFormSubmitReturn = {
  handleFormSubmit: (values: WarehouseFormValues) => Promise<void>;
};

export const useWarehouseFormSubmit = (): UseWarehouseFormSubmitReturn => {
  const { createWarehouse } = useCreateWarehouse();

  const handleFormSubmit = useCallback(
    async (values: WarehouseFormValues) => {
      await createWarehouse({
        ...values,
        type: values.type.id,
      });
    },
    [createWarehouse],
  );

  return {
    handleFormSubmit,
  };
};
