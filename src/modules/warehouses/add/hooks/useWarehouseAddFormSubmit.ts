import { useCallback } from 'react';

import { WarehouseFormValues } from '../../common/types';
import { WarehousePostData } from '../types';
import { useCreateWarehouse } from './useCreateWarehouse';

type UseWarehouseFormSubmitReturn = {
  handleFormSubmit: (values: WarehouseFormValues) => Promise<void>;
};

export const useWarehouseAddFormSubmit = (): UseWarehouseFormSubmitReturn => {
  const { createWarehouse } = useCreateWarehouse();

  const handleFormSubmit = useCallback(
    async (values: WarehouseFormValues) => {
      const data: WarehousePostData = {
        ...values,
        type: values.type.id,
      };

      await createWarehouse(data);
    },
    [createWarehouse],
  );

  return {
    handleFormSubmit,
  };
};
