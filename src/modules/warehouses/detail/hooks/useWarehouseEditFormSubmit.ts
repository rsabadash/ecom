import { useCallback } from 'react';

import {
  WarehouseFormSubmitAction,
  WarehouseFormValues,
  WarehousePatchData,
} from '../../common/types';
import { useUpdateWarehouse } from './useUpdateWarehouse';

type UseWarehouseFormSubmitProps = {
  id: string | undefined;
  onFormUpdated: () => void;
};

type UseWarehouseFormSubmitReturn = {
  handleFormSubmit: WarehouseFormSubmitAction;
};

export const useWarehouseEditFormSubmit = ({
  id,
  onFormUpdated,
}: UseWarehouseFormSubmitProps): UseWarehouseFormSubmitReturn => {
  const { updateWarehouse } = useUpdateWarehouse({ onSuccess: onFormUpdated });

  const handleFormSubmit = useCallback(
    async (values: WarehouseFormValues) => {
      if (id) {
        const data: WarehousePatchData = {
          id,
          ...values,
          type: values.type.id,
        };

        await updateWarehouse(data);
      }
    },
    [id, updateWarehouse],
  );

  return {
    handleFormSubmit,
  };
};
