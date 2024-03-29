import { useCallback } from 'react';

import {
  WarehouseFormSubmitAction,
  WarehouseFormValues,
  WarehousePostData,
} from '../../common/types';
import { useCreateWarehouse } from './useCreateWarehouse';

type UseWarehouseFormSubmitReturn = {
  handleFormSubmit: WarehouseFormSubmitAction;
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
