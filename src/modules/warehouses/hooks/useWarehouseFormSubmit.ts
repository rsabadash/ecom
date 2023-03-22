import { useCallback } from 'react';
import {
  WarehouseFormValues,
  WarehousePatchData,
  WarehousePostData,
} from '../types';
import { useCreateWarehouse } from './useCreateWarehouse';
import { useUpdateWarehouse } from './useUpdateWarehouse';

type UseWarehouseFormSubmitProps = {
  id?: string;
};

type UseWarehouseFormSubmitReturn = {
  handleFormSubmit: (values: WarehouseFormValues) => Promise<void>;
};

export const useWarehouseFormSubmit = ({
  id,
}: UseWarehouseFormSubmitProps): UseWarehouseFormSubmitReturn => {
  const { createWarehouse } = useCreateWarehouse();
  const { updateWarehouse } = useUpdateWarehouse();

  const handleFormSubmit = useCallback(
    async (values: WarehouseFormValues) => {
      const data: WarehousePostData | WarehousePatchData = {
        ...values,
        type: values.type.id,
      };

      if (id) {
        await updateWarehouse({ id, ...data });
      } else {
        await createWarehouse(data);
      }
    },
    [createWarehouse, id, updateWarehouse],
  );

  return {
    handleFormSubmit,
  };
};
