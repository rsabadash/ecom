import { useCallback } from 'react';

import {
  WarehouseFormSubmitAction,
  WarehouseFormValues,
} from '../../common/types';
import { WarehousePatchData } from '../types';
import { useUpdateWarehouse } from './useUpdateWarehouse';

type UseWarehouseFormSubmitProps = {
  id?: string;
  onFormUpdated: () => void;
};

type UseWarehouseFormSubmitReturn = {
  handleFormSubmit: WarehouseFormSubmitAction;
};

export const useWarehouseEditFormSubmit = ({
  id,
  onFormUpdated,
}: UseWarehouseFormSubmitProps): UseWarehouseFormSubmitReturn => {
  const { updateWarehouse } = useUpdateWarehouse({ onFormUpdated });

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
